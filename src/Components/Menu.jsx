/** @format */

import React from "react";
import { NavLink, useParams } from "react-router-dom";

import "../Pages/profile.css";

function Menu() {
    const param = useParams();
  return (
    <>
      <div>
        <NavLink to={`/profile/${param.memberId}/viewBills`} className="link">
          View Bill Status
        </NavLink>
      </div>
      <div button>
        <NavLink
          to={`/profile/${param.memberId}/getClaimStatus`}
          className="link">
          View Claim Status
        </NavLink>
      </div>
      <div button>
        <NavLink to={`/profile/${param.memberId}/submitClaim`} className="link">
          Submit a Claim
        </NavLink>
      </div>
    </>
  );
}

export default Menu;
