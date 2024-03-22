import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import RevenueModal from "./Revenue";
import DeleteModal from "./DeleteRevenue";
import handleErrors from "@/utils/handleErrors";
import * as flowbite from "flowbite";

export default function Revenues() {
  const { user } = useUser();
  const [revenues, setRevenues] = useState([]);
  const [filteredRevenues, setFilteredRevenues] = useState([]);
  const [modalRevenue, setModalRevenue] = useState({});
  
  flowbite.initDropdowns();
  flowbite.initModals();

  useEffect(() => {
    async function fetchRevenues() {
      try {
        const fetchedRevenues = await api(
          "GET",
          `api/financialTransaction/user/${user.id}`
        );
        setRevenues(
          fetchedRevenues.filter((revenue) => revenue.type === "revenue")
        );
        setFilteredRevenues(
          fetchedRevenues.filter((revenue) => revenue.type === "revenue")
        );

      } catch (error) {
        handleErrors(error);
      }
    }

    fetchRevenues();
  }, []);

  const handlePreviewClick = (revenue) => {
    setModalRevenue(revenue);
  };

  const handleDeleteClick = (revenue) => {
    setModalRevenue(revenue);
  };

  const handleDelete = (modalRevenue) => {
    const newFilteredRevenues = filteredRevenues.filter(
      (revenue) => revenue.id !== modalRevenue.id
    );    
    setFilteredRevenues(newFilteredRevenues);
    
    const newRevenues = revenues.filter(
      (revenue) => revenue.id !== modalRevenue.id
    );
    setRevenues(newRevenues);
    
  };

  const searchRevenues = (revenueName) => {
    const filtered = revenues.filter((revenue) => {
      return revenue.name.toLowerCase().includes(revenueName.toLowerCase());
    });
    setFilteredRevenues(filtered);
  };
  
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="me-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 512 512"
            fill="none"
          >
            <path
              fill="currentColor"
              d="M258 21.89c-.5 0-1.2 0-1.8.12c-4.6.85-10.1 5.1-13.7 14.81c-3.8 9.7-4.6 23.53-1.3 38.34c3.4 14.63 10.4 27.24 18.2 34.94c7.6 7.7 14.5 9.8 19.1 9c4.8-.7 10.1-5.1 13.7-14.7c3.8-9.64 4.8-23.66 1.4-38.35c-3.5-14.8-10.4-27.29-18.2-34.94c-6.6-6.8-12.7-9.22-17.4-9.22M373.4 151.4c-11 .3-24.9 3.2-38.4 8.9c-15.6 6.8-27.6 15.9-34.2 24.5c-6.6 8.3-7.2 14.6-5.1 18.3c2.2 3.7 8.3 7.2 20 7.7c11.7.7 27.5-2.2 43-8.8c15.5-6.7 27.7-15.9 34.3-24.3c6.6-8.3 7.1-14.8 5-18.5c-2.1-3.8-8.3-7.1-20-7.5c-1.6-.3-3-.3-4.6-.3m-136.3 92.9c-6.6.1-12.6.9-18 2.3c-11.8 3-18.6 8.4-20.8 14.9c-2.5 6.5 0 14.3 7.8 22.7c8.2 8.2 21.7 16.1 38.5 20.5c16.7 4.4 32.8 4.3 44.8 1.1c12.1-3.1 18.9-8.6 21.1-15c2.3-6.5 0-14.2-8.1-22.7c-7.9-8.2-21.4-16.1-38.2-20.4c-9.5-2.5-18.8-3.5-27.1-3.4m160.7 58.1L336 331.7c4.2.2 14.7.5 14.7.5l6.6 8.7l54.7-28.5zm-54.5.1l-57.4 27.2c5.5.3 18.5.5 23.7.8l49.8-23.6zm92.6 10.8l-70.5 37.4l14.5 18.7l74.5-44.6zm-278.8 9.1a40.33 40.33 0 0 0-9 1c-71.5 16.5-113.7 17.9-126.2 17.9H18v107.5s11.6-1.7 30.9-1.8c37.3 0 103 6.4 167 43.8c3.4 2.1 10.7 2.9 19.8 2.9c24.3 0 61.2-5.8 69.7-9C391 452.6 494 364.5 494 364.5l-32.5-28.4s-79.8 50.9-89.9 55.8c-91.1 44.7-164.9 16.8-164.9 16.8s119.9 3 158.4-27.3l-22.6-34s-82.8-2.3-112.3-6.2c-15.4-2-48.7-18.8-73.1-18.8"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center mt-6 mb-4 mr-2">
          Manage Revenues
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
                      placeholder="Search by revenue name"
                      onChange={(e) => {
                        searchRevenues(e.target.value);
                      }}
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <a
                  type="button"
                  href="/add-revenue"
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
                  Add revenue
                </a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Revenue
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
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
                  {filteredRevenues.map((revenue) => (
                    <tr
                      key={revenue.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {revenue.name.split(" ").length > 2
                          ? revenue.name.split(" ").slice(0, 2).join(" ") +
                            "..."
                          : revenue.name}
                      </td>
                      <td className="px-4 py-3">
                      <span
                          style={{
                            backgroundColor: revenue.category.color,
                            color: "black",
                            borderRadius: "20px",
                            padding: "4px 10px",
                          }}
                        >
                          {revenue.category.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-[12rem] truncate">
                        {revenue.description}
                      </td>
                      <td className="px-4 py-3">
                        ${revenue.amount.toFixed(2)}
                      </td>

                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id={`dropdown-button-${revenue.id}`}
                          data-dropdown-toggle={`dropdown-${revenue.id}`}
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
                          id={`dropdown-${revenue.id}`}
                          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-sm"
                            aria-labelledby={`dropdown-button-${revenue.id}`}
                          >
                            <li>
                              <a
                                type="button"
                                href={`/update-revenue/${revenue.id}`}
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
                                data-modal-target="readRevenueModal"
                                data-modal-toggle="readRevenueModal"
                                onClick={() => handlePreviewClick(revenue)}
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
                                data-modal-target="deleteRevenueModal"
                                data-modal-toggle="deleteRevenueModal"
                                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                                onClick={() => handleDeleteClick(revenue)}
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

      <RevenueModal revenue={modalRevenue} />
      <DeleteModal revenue={modalRevenue} onDelete={handleDelete} />
    </div>
  );
}
