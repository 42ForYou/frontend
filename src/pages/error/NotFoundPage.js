import React from "react";
import { Link } from "react-router-dom";
import withAuthProtection from "../../withAuthProtection";

// 존재하지 않는 페이지 접근시 정책에 대해 차후 논의
// 현재 아이디어: 일정 시간이 지나고 홈으로 리다이렉트
const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      유효하지 않은 경로입니다.
      <br />
      <button>
        <Link to={""}>홈으로 가기</Link>
      </button>
    </div>
  );
};

export default withAuthProtection(NotFoundPage);
