import React, { useState, useEffect, useContext } from "react";
import ToggleButton from "../common/ToggleButton";
import usePatchProfile from "../../hooks/usePatchProfile";

const ProfileSecurity = ({ initIs2FA }) => {
  const [is2FA, setIs2FA] = useState(initIs2FA);
  const [loading, setLoading] = useState(false);
  const { patchProfileInfo } = usePatchProfile();

  useEffect(() => {
    setIs2FA(initIs2FA);
  }, [initIs2FA]);

  const handleClick2FAToggle = async () => {
    if (!window.confirm("2차 인증 설정을 변경하시겠습니까?")) return;

    setLoading(true);
    const newIs2FA = !is2FA;

    const res = await patchProfileInfo({ two_factor_auth: newIs2FA });
    if (res.success) {
      setIs2FA(newIs2FA);
    } else {
      alert("2FA 설정 변경 실패:", res.message);
    }
    setLoading(false);
  };

  return <ToggleButton title="2FA" isToggled={is2FA} onToggle={handleClick2FAToggle} loading={loading} />;
};

export default ProfileSecurity;
