import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

 
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default Protected;