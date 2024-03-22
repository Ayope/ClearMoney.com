import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import GoalModal from "./Goal";
import DeleteModal from "./DeleteGoal";
import handleErrors from "@/utils/handleErrors";
import * as flowbite from "flowbite";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Goals() {
  const { user } = useUser();
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [modalGoal, setModalGoal] = useState({});

  flowbite.initDropdowns();
  flowbite.initModals();

  useEffect(() => {
    async function fetchGoals() {
      try {
        const fetchedGoals = await api("GET", `api/goal/user/${user.id}`);
        console.log(fetchedGoals);
        setGoals(fetchedGoals);
        setFilteredGoals(fetchedGoals);
      } catch (error) {
        handleErrors(error);
      }
    }

    fetchGoals();
  }, []);

  const handlePreviewClick = (goal) => {
    setModalGoal(goal);
  };

  const handleDeleteClick = (goal) => {
    setModalGoal(goal);
  };

  const handleDelete = (modalGoal) => {
    const newFilteredGoals = filteredGoals.filter(
      (goal) => goal.id !== modalGoal.id
    );
    setFilteredGoals(newFilteredGoals);

    const newGoals = goals.filter((goal) => goal.id !== modalGoal.id);
    setGoals(newGoals);
  };

  const searchGoals = (goalName) => {
    const filtered = goals.filter((goal) => {
      return goal.name.toLowerCase().includes(goalName.toLowerCase());
    });
    setFilteredGoals(filtered);
  };

  const checkIfUserSavedForCurrentMonthOrYear = (goal) => {
    
    const starting_date = new Date(goal.starting_date);
    let current_date = new Date();

    const saving_amount = goal.saving_amount;
    const saving_frequency = goal.saving_frequency;
    const current_amount = goal.current_amount;

    if(saving_frequency === "yearly") {
      const years = current_date.getFullYear() - starting_date.getFullYear() + 1;
      return years * saving_amount > current_amount;
    }else {
      const years = current_date.getFullYear() - starting_date.getFullYear();
      const months = current_date.getMonth() - starting_date.getMonth() + 1;
      return (months + (years * 12)) * saving_amount > current_amount;
    }
    /*
      (saving amount = 12) * (starting_date - current date = 10 ) = 120 <= the amount that should be saved 
      => (current amount < the amount that should be saved ? you should save for the current month or year : you saved you're ok)      
    */
  }

  const saveForTheCurrentPeriod = (goal) => {
    try{
      const newCurrentAmount = goal.current_amount + goal.saving_amount;
      api("PUT", `api/goal/${goal.id}`, {
        ...goal,
        current_amount: newCurrentAmount,
        user_id : user.id
      });
      const newGoals = goals.map((g) => {
        if(g.id === goal.id) {
          g.current_amount = newCurrentAmount;
        }
        return g;
      });
      setGoals(newGoals);
      setFilteredGoals(newGoals);
    }catch(error){
      handleErrors(error);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="me-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 20 20"
            fill="none"
            style={{ transform: "translateY(10px)" }}
          >
            <path
              fill="#6B7280"
              d="m13.637 2.363l1.676.335c.09.018.164.084.19.173a.25.25 0 0 1-.062.249l-1.373 1.374a.876.876 0 0 1-.619.256H12.31L9.45 7.611A1.5 1.5 0 1 1 6.5 8a1.501 1.501 0 0 1 1.889-1.449l2.861-2.862V2.552c0-.232.092-.455.256-.619L12.88.559a.25.25 0 0 1 .249-.062c.089.026.155.1.173.19Z"
            />
            <path
              fill="#6B7280"
              d="M2 8a6 6 0 1 0 11.769-1.656a.751.751 0 1 1 1.442-.413a7.502 7.502 0 0 1-12.513 7.371A7.501 7.501 0 0 1 10.069.789a.75.75 0 0 1-.413 1.442A6.001 6.001 0 0 0 2 8"
            />
            <path
              fill="#6B7280"
              d="M5 8a3.002 3.002 0 0 0 4.699 2.476a3 3 0 0 0 1.28-2.827a.748.748 0 0 1 1.045-.782a.75.75 0 0 1 .445.61A4.5 4.5 0 1 1 8.516 3.53a.75.75 0 1 1-.17 1.49A3 3 0 0 0 5 8"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center mt-6 mb-4 mr-2">
          Manage Goals
        </h1>
      </div>
      <section className="sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search by goal name"
                      onChange={(e) => {
                        searchGoals(e.target.value);
                      }}
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <a
                  type="button"
                  href="/add-goal"
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add goal
                </a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Goal
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Target date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      To Save
                    </th>
                    <th scope="col" className="px-16 py-3">
                      Progress
                    </th>
                    <th scope="col" className="px-16 py-3">
                      Save 
                    </th>
                    <th scope="col" className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGoals.map((goal) => (
                    <tr key={goal.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {goal.name.split(" ").length > 2
                          ? goal.name.split(" ").slice(0, 2).join(" ") + "..."
                          : goal.name}
                      </td>
                      <td className="px-4 py-3">
                        {goal.description.split(" ").length > 5
                          ? goal.description.split(" ").slice(0, 5).join(" ") +
                            "..."
                          : goal.description}
                      </td>
                      <td className="px-4 py-3">{new Date(goal.targeted_date).toLocaleDateString("en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        ${goal.saving_amount.toFixed(2) + " every " + (goal.saving_frequency === "yearly" ? "year" : "month")}
                      </td>
                      <td className="px-4 py-3">
                        <ProgressBar 
                          completed={goal.targeted_amount === 0 ? 0 : Math.round((goal.current_amount / goal.targeted_amount) * 100)}
                          bgColor="#6d28d9"
                          height="15px"
                          width="100%"
                          borderRadius="30px"
                          labelAlignment="outside"
                          baseBgColor="#dedddd"
                          labelColor="#000000"
                          transitionDuration=""
                          animateOnRender
                          maxCompleted={100}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {Math.round((goal.current_amount / goal.targeted_amount) * 100) === 100 
                          ? <strong>Goal completed successfully 🎉</strong> 
                          : checkIfUserSavedForCurrentMonthOrYear(goal) === true 
                            ? <button onClick={() => saveForTheCurrentPeriod(goal)} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">{"save for this " + (goal.saving_frequency === "yearly" ? "year" : "month")}</button> 
                            : <strong>{"You saved for this " + (goal.saving_frequency === "yearly" ? "year ✔" : "month ✔")}</strong>
                        }
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id={`dropdown-button-${goal.id}`}
                          data-dropdown-toggle={`dropdown-${goal.id}`}
                          className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          id={`dropdown-${goal.id}`}
                          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-sm"
                            aria-labelledby={`dropdown-button-${goal.id}`}
                          >
                            <li>
                              <a
                                type="button"
                                href={`/update-goal/${goal.id}`}
                                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                              >
                                <svg
                                  className="w-4 h-4 mr-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  />
                                </svg>
                                Edit
                              </a>
                            </li>
                            <li>
                              <button
                                type="button"
                                data-modal-target="readGoalModal"
                                data-modal-toggle="readGoalModal"
                                onClick={() => handlePreviewClick(goal)}
                                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                              >
                                <svg
                                  className="w-4 h-4 mr-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </svg>
                                Preview
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                data-modal-target="deleteGoalModal"
                                data-modal-toggle="deleteGoalModal"
                                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                                onClick={() => handleDeleteClick(goal)}
                              >
                                <svg
                                  className="w-4 h-4 mr-2"
                                  viewBox="0 0 14 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    fill="currentColor"
                                    d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                                  />
                                </svg>
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <GoalModal goal={modalGoal} />
      <DeleteModal goal={modalGoal} onDelete={handleDelete} />
    </div>
  );
}
