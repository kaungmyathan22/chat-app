import { useRoutes } from "react-router-dom";
import ProtectedRouteWrapper from "./container/ProtectedRoute";
import Chat from "./pages/chat/page";
import Login from "./pages/login/page";
import Register from "./pages/register/page";

function App() {
  const router = useRoutes([
    {
      path: "/authentication",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/protected",
      element: <ProtectedRouteWrapper />,
      children: [
        {
          path: "chat",
          element: <Chat />,
        },
      ],
    },
  ]);
  return router;
}

export default App;
