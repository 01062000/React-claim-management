/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

import "../Pages/profile.css";
import Menu from "./Menu";

import { styled } from "@mui/material/styles";
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

function ViewBills() {
  const [bill, setBill] = useState({});
  const accessToken = JSON.parse(JSON.stringify(localStorage.getItem("token")));

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const getBills = async () => {
    const bill = await axios
      .get(
        `http://35.166.51.142:8099/memberModule/viewBills/${localStorage.getItem(
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
    setBill(bill);
  };

  useEffect(() => {
    getBills();
    console.log(bill);
  }, []);

  return (
    <>
      <Nav />
      <div className="profile_section">
        <div className="profile_sideBar">
          <Menu />
        </div>
        <div className="mainBody">
          <TableContainer component={Paper} sx={{ width: 700 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Member ID</StyledTableCell>
                  <StyledTableCell align="right">Policy Id</StyledTableCell>
                  <StyledTableCell align="right">
                    Last Paid Date
                  </StyledTableCell>
                  <StyledTableCell align="right">Due Amount</StyledTableCell>
                  <StyledTableCell align="right">Late Charge</StyledTableCell>
                  <StyledTableCell align="right">Due Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(
                  <StyledTableRow key={bill.memberId}>
                    <StyledTableCell component="th" scope="row">
                      {bill.memberId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {bill.policyId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {bill.lastPaidDate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {bill.dueAmount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {bill.lateCharge}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {bill.dueDate}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default ViewBills;
