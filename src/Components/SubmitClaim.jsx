/** @format */

import React, { useState } from "react";
import Nav from "./Nav";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import "../Pages/profile.css";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const policy = [
  {
    value: "P1001",
    label: "Health Plus Classic",
  },
  {
    value: "P1002",
    label: "Health Plus Enhanced",
  },
  {
    value: "P1003",
    label: "Health Plus Premium",
  },
];

const hospital = [
  {
    value: "H1",
    label: "Apollo Hospital",
  },
  {
    value: "H2",
    label: "Artemis Hospital",
  },
  {
    value: "H3",
    label: "Fortis Escorts Heart Institute",
  },
  {
    value: "H4",
    label: "BLK Super Speciality Hospital",
  },
  {
    value: "H5",
    label: "Max Superspecialty Hospital, Saket",
  },
  {
    value: "H6",
    label: "Fortis Memorial Research Institute",
  },
];

const Benefits = [
  {
    value: "B101",
    label: "Coverage for COVID-19",
  },
  {
    value: "B102",
    label: "Coverage for hospitalization at home",
  },
  {
    value: "B103",
    label: "Ambulance charges upto 2000 covered",
  },
  {
    value: "B104",
    label: "Ambulance charges upto 3000 covered",
  },
  {
    value: "B105",
    label: "Ambulance charges upto 4000 covered",
  },
  {
    value: "B106",
    label: "Hospitalization charges for Premium Twin Sharing room covered",
  },
  {
    value: "B107",
    label: "Hospitalization charges for Deluxe room covered",
  },
  {
    value: "B108",
    label: "Hospitalization charges for Premium Deluxe room covered",
  },
];

function SubmitClaim() {
  const [claimData, setClaimData] = useState({
    remarks: "Nice",
    memberId: localStorage.getItem("id"),
    policyId: "",
    hospitalId: "",
    benefitId: "",
    claimAmount: 0.0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClaimData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const accessToken = JSON.parse(JSON.stringify(localStorage.getItem("token")));

  const submitClaim = async () => {
    const response = await fetch("http://35.166.51.142:8099/memberModule/submitClaim", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(claimData),
    });
    const claimDataRes = await response.json();
    console.log(claimDataRes)
  };

  const navigate = useNavigate();

  const handleClaim = () => {
    submitClaim();
    navigate(`/profile/${localStorage.getItem("id")}/getClaimStatus`)
  };

  return (
    <>
      <Nav />
      <div className="profile_section">
        <div className="profile_sideBar">
          <Menu />
        </div>
        <div className="mainBody">
          <TextField
            sx={{ width: 400 }}
            id="outlined-select-policy"
            select
            label="Policies"
            value={policy.value}
            name="policyId"
            onChange={handleChange}
            helperText="Please select your policy">
            {policy.map((policy) => (
              <MenuItem key={policy.value} value={policy.value}>
                {policy.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ width: 400 }}
            id="outlined-select-hospital"
            select
            label="Hospitals"
            value={hospital.value}
            name="hospitalId"
            onChange={handleChange}
            helperText="Please select your hospital">
            {hospital.map((hospital) => (
              <MenuItem key={hospital.value} value={hospital.value}>
                {hospital.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ width: 400 }}
            id="outlined-select-Benefit"
            select
            label="Benefits"
            value={Benefits.value}
            name="benefitId"
            onChange={handleChange}
            helperText="Please select your Benefits">
            {Benefits.map((Benefits) => (
              <MenuItem key={Benefits.value} value={Benefits.value}>
                {Benefits.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ width: 400 }}
            id="outlined-number"
            label="Claimed Amount"
            type="number"
            name="claimAmount"
            placeholder="Enter Claimed Amount"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />

          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            sx={{
              width: 120,
              border: "1px solid #0D1219",
              color: "#0D1219",
              ":hover": {
                background: "#0D1219",
                color: "white",
              },
            }}
            disabled={false}
            onClick={handleClaim}>
            Claim
          </Button>
        </div>
      </div>
    </>
  );
}

export default SubmitClaim;
