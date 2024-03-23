import WithDocumentTitle from "@/HOCs/WithDocumentTitle";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import handleWelcomeBack from "@/features/dashboard/helpers/handleWelcomeBack";	
import api from "@/utils/api";
import handleErrors from "@/utils/handleErrors";
import UserStats from "../components/userStats";
import DailyExpensesByMonthGraph from "../components/DailyExpensesByMonthGraph";
import ResourcesCountByCategory from "../components/ResourcesCountByCategory";
import GoalsAchievement from "../components/GoalsAchievement";

function UserDashboard() {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showWelcomeBack, setShowWelcomeBack] = useState(false);
    const [reports, setReports] = useState({});

    useEffect(() => {
        async function fetchReports() {
            try {
                const reports = await api("GET", `api/reports/${user.id}`);
                setReports(reports);
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
            toast.success(`Welcome ${user.first_name} ${user.last_name}`);
        }
    }, [showWelcomeBack, user]);

    return (
        <div>
            <h1 className="text-5xl mt-6 mb-10">Hello, {user.first_name} {user.last_name}</h1>
            <UserStats stats={reports.userStats} />
            <DailyExpensesByMonthGraph dailyExpensesByMonth={reports.totalDailyExpensesByMonth} />
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/2 pr-2">
                    <ResourcesCountByCategory revenuesByCategory={reports.RevenuesByCategory} expensesByCategory={reports.ExpensesByCategory} dailyExpensesByCategory={reports.DailyExpensesByCategory}/>
                </div>
                <div className="w-full md:w-1/2 pl-2">
                    <GoalsAchievement goals={reports.goalsAchievement}/>
                </div>
            </div>
        </div>
    );
};

export default WithDocumentTitle(UserDashboard, "Dashboard");
