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
            <Link to={"/profile/users/pikachu"}>PROFILE (pikachu)</Link>
          </li>
          <li>
            <Link to={"/profile/users/jgo"}>PROFILE (jgo)</Link>
          </li>
          <li>
            <Link to={"/profile/users/someone"}>PROFILE (someone)</Link>
          </li>
        </ul>
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(TestPage);
