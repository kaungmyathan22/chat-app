import { Outlet } from "react-router-dom";
import SocketProvider from "../context/SocketProvider";

const ProtectedRouteWrapper = () => {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export default ProtectedRouteWrapper;
