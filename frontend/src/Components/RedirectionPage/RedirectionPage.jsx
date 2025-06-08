import { Navigate } from "react-router-dom";

function RedirectionPage() {
  return <Navigate to="/app" replace />; // Redirects to the main app route
}

export default RedirectionPage;
