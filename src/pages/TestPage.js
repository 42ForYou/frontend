import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import { Link, useNavigate } from "react-router-dom";

const TestPage = () => {
  return (
    <div className="TestPage">
      <PageContainer hasNavigationBar={true}>
        <ul>
          <li>
            <Link to={"/profile/users/pikachu"}>PROFILE (Valid 1)</Link>
          </li>
          <li>
            <Link to={"/profile/users/jgo"}>PROFILE (Valid 2)</Link>
          </li>
          <li>
            <Link to={"/profile/users/someone"}>PROFILE (Invalid)</Link>
          </li>
        </ul>
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(TestPage);
