import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";

const ChatPage = () => {
  return (
    <div className="ChatPage">
      <PageContainer hasNavigationBar={true}>This is ChatPage</PageContainer>
    </div>
  );
};

export default withAuthProtection(ChatPage);
