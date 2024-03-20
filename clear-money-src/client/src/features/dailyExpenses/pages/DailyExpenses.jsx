import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import ExpenseModal from "./DailyExpense";
import DeleteModal from "./DeleteDailyExpense";
import handleErrors from "@/utils/handleErrors";
import * as flowbite from "flowbite";

export default function DailyExpenses() {
  const { user } = useUser();
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [filteredDailyExpenses, setFilteredDailyExpenses] = useState([]);
  const [modalExpense, setModalExpense] = useState({});

  flowbite.initDropdowns();
  flowbite.initModals();

  useEffect(() => {
    async function fetchDailyExpenses() {
      try {
        const fetchedDailyExpenses = await api(
          "GET",
          `api/dailyExpense/user/${user.id}`
        );
        setDailyExpenses(
          fetchedDailyExpenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )
        );
        setFilteredDailyExpenses(
          fetchedDailyExpenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )
        );
      } catch (error) {
        handleErrors(error);
      }
    }

    fetchDailyExpenses();
  }, []);

  const handlePreviewClick = (dailyExpense) => {
    setModalExpense(dailyExpense);
  };

  const handleDeleteClick = (dailyExpense) => {
    setModalExpense(dailyExpense);
  };

  const handleDelete = (modalExpense) => {
    const newFilteredDailyExpenses = filteredDailyExpenses.filter(
      (dailyExpense) => dailyExpense.id !== modalExpense.id
    );
    setFilteredDailyExpenses(newFilteredDailyExpenses);
  
    const newDailyExpenses = dailyExpenses.filter(
      (dailyExpense) => dailyExpense.id !== modalExpense.id
    );
    setDailyExpenses(newDailyExpenses);
  };

  const searchDailyExpenses = (expenseName) => {
    const filtered = dailyExpenses.filter((dailyExpense) => {
      return dailyExpense.name
        .toLowerCase()
        .includes(expenseName.toLowerCase());
    });
    setFilteredDailyExpenses(filtered);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="mt-2 me-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="currentColor"
              d="M6.94 2c.416 0 .753.324.753.724v1.46c.668-.012 1.417-.012 2.26-.012h4.015c.842 0 1.591 0 2.259.013v-1.46c0-.4.337-.725.753-.725s.753.324.753.724V4.25c1.445.111 2.394.384 3.09 1.055c.698.67.982 1.582 1.097 2.972L22 9H2v-.724c.116-1.39.4-2.302 1.097-2.972c.697-.67 1.645-.944 3.09-1.055V2.724c0-.4.337-.724.753-.724"
            />
            <path
              fill="currentColor"
              d="M22 14v-2c0-.839-.004-2.335-.017-3H2.01c-.013.665-.01 2.161-.01 3v2c0 3.771 0 5.657 1.172 6.828C4.343 22 6.228 22 10 22h4c3.77 0 5.656 0 6.828-1.172C22 19.658 22 17.772 22 14"
              opacity="0.5"
            />
            <path
              fill="currentColor"
              d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center mt-6 mb-4 mr-2">
          Manage Daily Expenses
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
                      placeholder="Search by daily expense name"
                      onChange={(e) => {
                        searchDailyExpenses(e.target.value);
                      }}
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <a
                  type="button"
                  href="/add-daily-expense"
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
                  Add daily expense
                </a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Daily Expense
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDailyExpenses.map((dailyExpense) => (
                    <tr
                      key={dailyExpense.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {dailyExpense.name.split(" ").length > 2
                          ? dailyExpense.name.split(" ").slice(0, 2).join(" ") +
                            "..."
                          : dailyExpense.name}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          style={{
                            backgroundColor: dailyExpense.category.color,
                            color: "black",
                            borderRadius: "20px",
                            padding: "7px",
                          }}
                        >
                          {dailyExpense.category.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(dailyExpense.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-3 max-w-[12rem] truncate">
                        {dailyExpense.description}
                      </td>
                      <td className="px-4 py-3">
                        ${dailyExpense.amount.toFixed(2)}
                      </td>

                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id={`dropdown-button-${dailyExpense.id}`}
                          data-dropdown-toggle={`dropdown-${dailyExpense.id}`}
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
                          id={`dropdown-${dailyExpense.id}`}
                          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-sm"
                            aria-labelledby={`dropdown-button-${dailyExpense.id}`}
                          >
                            <li>
                              <a
                                type="button"
                                href={`/update-daily-expense/${dailyExpense.id}`}
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
                                data-modal-target="readDailyExpenseModal"
                                data-modal-toggle="readDailyExpenseModal"
                                onClick={() => handlePreviewClick(dailyExpense)}
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
                                data-modal-target="deleteDailyExpenseModal"
                                data-modal-toggle="deleteDailyExpenseModal"
                                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                                onClick={() => handleDeleteClick(dailyExpense)}
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

      <ExpenseModal dailyExpense={modalExpense} />
      <DeleteModal dailyExpense={modalExpense} onDelete={handleDelete} />
    </div>
  );
}
