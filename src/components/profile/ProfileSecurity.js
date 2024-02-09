import React, { useState, useEffect, useContext } from "react";
import ToggleButton from "../common/ToggleButton";
import useProfileData from "../../hooks/useProfileData";
import AuthContext from "../../context/AuthContext";

const ProfileSecurity = ({ initialIs2FA }) => {
  const [is2FA, setIs2FA] = useState(initialIs2FA);
  const [loading, setLoading] = useState(false);
  const { patchProfileInfo } = useProfileData();

  useEffect(() => {
    setIs2FA(initialIs2FA);
  }, [initialIs2FA]);

  const handleClick2FAToggle = async () => {
    if (!window.confirm("2차 인증 설정을 변경하시겠습니까?")) return;

    setLoading(true);
    const newIs2FA = !is2FA;
    const res = await patchProfileInfo({ two_factor_auth: newIs2FA }, () => {});
    setLoading(false);

    if (res.success) {
      setIs2FA(newIs2FA);
    } else {
      alert("2FA 설정 변경 실패:", res.message);
    }
  };

  return <ToggleButton title="2FA" initIsToggled={is2FA} toggleEvent={handleClick2FAToggle} disabled={loading} />;
};

export default ProfileSecurity;
