import React from "react";

const FooterBar = ({ leftChild, rightChild }) => {
  return (
    <footer>
      <div className="footer-left">{leftChild}</div>
      <div className="footer-right">{rightChild}</div>
    </footer>
  );
};

export default FooterBar;
