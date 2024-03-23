import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function IsNotAuth({ component: Component }) { // it took the components that renders when user is authenticated
  const token = Cookies.get('accessToken');

  if (token) {
    return <Component/>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default IsNotAuth;