/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

const useContainer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //#region handler functions
  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }
  function handleUsernameChange(e: any) {
    setUsername(e.target.value);
  }
  async function handleSubmit() {
    try {
      const res = await AuthService.login({ username, password });
      localStorage.setItem("token", res.token);
      navigate("/protected/chat");
    } catch (error) {
      alert(error);
    }
  }
  //#endregion
  return {
    username,
    password,
    handlePasswordChange,
    handleUsernameChange,
    handleSubmit,
  };
};

export default useContainer;
