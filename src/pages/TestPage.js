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
            <Link to={"/profile/users/james"}>PROFILE (james)</Link>
          </li>
          <li>
            <Link to={"/profile/users/invalid"}>PROFILE (invalid)</Link>
          </li>
          <li>
            <Link to={"/game/waiting/1"}>게임 대기 방</Link>
          </li>
        </ul>
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(TestPage);
