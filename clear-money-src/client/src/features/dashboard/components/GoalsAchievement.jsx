import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const GoalsAchievement = ({ goals }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Goal
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Progress
            </th>
          </tr>
        </thead>
        <tbody>
          {goals?.map((goal) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {goal.goal}
              </td>
              <td className="px-6 py-4">
                <ProgressBar
                  completed={goal.achievement}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsAchievement;
