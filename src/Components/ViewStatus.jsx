/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

import "../Pages/profile.css";
import Menu from "./Menu";

import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ViewStatus() {
  const [claims, setClaims] = useState([]);

  const accessToken = JSON.parse(JSON.stringify(localStorage.getItem("token")));

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const getClaimStatus = async () => {
    const claimStatus = await axios
      .get(
        `http://localhost:8099/memberModule/getAllClaims/${localStorage.getItem(
          "id"
        )}`,
        {
          headers,
        }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
    console.log(claimStatus);
    setClaims(claimStatus);
  };

  useEffect(() => {
    getClaimStatus();
  }, [claims]);

  return (
    <>
      <Nav />
      <div className="profile_section">
        <div className="profile_sideBar">
          <Menu />
        </div>
        <div className="mainBody">
          {claims.length == 0 ? (
            <Stack sx={{ width: "50%" }} spacing={2}>
              <Alert severity="info">
                You Have Not Claimed Anything Yet...!!!
              </Alert>
            </Stack>
          ) : (
            <TableContainer component={Paper} sx={{ width: 800 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Claim ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Claim Status
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Claim Description
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claims.map((claim) => (
                    <StyledTableRow key={claim.claimId}>
                      <StyledTableCell component="th" scope="row">
                        {claim.claimId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {claim.status}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {claim.description}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewStatus;
