import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function IsAuth({ component: Component }) { //  it took the components that renders when user is not authenticated
  const token = Cookies.get('accessToken');

  if (token) {
    return <Navigate to="/" />;
  } else {
    return <Component />;
  }
}

export default IsAuth;