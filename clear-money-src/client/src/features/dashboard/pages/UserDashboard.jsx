import WithDocumentTitle from "@/HOCs/WithDocumentTitle";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import handleWelcomeBack from "@/features/dashboard/helpers/handleWelcomeBack";	

function UserDashboard() {
    const { user } = useContext(UserContext);
    console.log(user);
    const location = useLocation();
    const navigate = useNavigate();
    const [showWelcomeBack, setShowWelcomeBack] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        handleWelcomeBack(queryParams, navigate, setShowWelcomeBack);
    }, [location.search, navigate]);

    useEffect(() => {
        if (showWelcomeBack) {
            toast.success(`Welcome Back ${user.first_name} ${user.last_name}`);
        }
    }, [showWelcomeBack, user]);

    return (
        <div>
            <h1>Hello, {user.first_name} {user.last_name}</h1>
        </div>
    );
};

export default WithDocumentTitle(UserDashboard, "Dashboard");
