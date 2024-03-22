import WithDocumentTitle from "@/HOCs/WithDocumentTitle";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import handleWelcomeBack from "@/features/dashboard/helpers/handleWelcomeBack";	
import api from "@/utils/api";
import handleErrors from "@/utils/handleErrors";
import UserStats from "../components/userStats";

function UserDashboard() {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showWelcomeBack, setShowWelcomeBack] = useState(false);
    const [userStats, setUserStats] = useState({});

    useEffect(() => {
        async function fetchReports() {
            try {
                const reports = await api("GET", `api/reports/${user.id}`);
                console.log(reports);
                setUserStats(reports.userStats);
            }catch(error){
                handleErrors(error);
            }
        }

        fetchReports();
    }, []);

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
            <h1 className="text-5xl mt-6 mb-10">Hello, {user.first_name} {user.last_name}</h1>
            <UserStats stats={userStats} />
        </div>
    );
};

export default WithDocumentTitle(UserDashboard, "Dashboard");
