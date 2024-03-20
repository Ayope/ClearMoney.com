export default function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 pt-2">
        <ul class="space-y-2 font-medium">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                viewBox="0 0 22 21"
                fill="currentColor"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/revenues"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 7.5V16.5"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 3V7H21"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 2L17 7"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="ms-3">Revenues</span>
            </a>
          </li>
          <li>
            <a
              href="/expenses"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="0.5"
                    d="M7.24502 2H16.755C17.9139 2 18.4933 2 18.9606 2.16261C19.8468 2.47096 20.5425 3.18719 20.842 4.09946C21 4.58055 21 5.17705 21 6.37006V20.3742C21 21.2324 20.015 21.6878 19.3919 21.1176C19.0258 20.7826 18.4742 20.7826 18.1081 21.1176L17.625 21.5597C16.9834 22.1468 16.0166 22.1468 15.375 21.5597C14.7334 20.9726 13.7666 20.9726 13.125 21.5597C12.4834 22.1468 11.5166 22.1468 10.875 21.5597C10.2334 20.9726 9.26659 20.9726 8.625 21.5597C7.98341 22.1468 7.01659 22.1468 6.375 21.5597L5.8919 21.1176C5.52583 20.7826 4.97417 20.7826 4.6081 21.1176C3.985 21.6878 3 21.2324 3 20.3742V6.37006C3 5.17705 3 4.58055 3.15795 4.09946C3.45748 3.18719 4.15322 2.47096 5.03939 2.16261C5.50671 2 6.08614 2 7.24502 2Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M7 6.75C6.58579 6.75 6.25 7.08579 6.25 7.5C6.25 7.91421 6.58579 8.25 7 8.25H7.5C7.91421 8.25 8.25 7.91421 8.25 7.5C8.25 7.08579 7.91421 6.75 7.5 6.75H7Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M10.5 6.75C10.0858 6.75 9.75 7.08579 9.75 7.5C9.75 7.91421 10.0858 8.25 10.5 8.25H17C17.4142 8.25 17.75 7.91421 17.75 7.5C17.75 7.08579 17.4142 6.75 17 6.75H10.5Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M7 10.25C6.58579 10.25 6.25 10.5858 6.25 11C6.25 11.4142 6.58579 11.75 7 11.75H7.5C7.91421 11.75 8.25 11.4142 8.25 11C8.25 10.5858 7.91421 10.25 7.5 10.25H7Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M10.5 10.25C10.0858 10.25 9.75 10.5858 9.75 11C9.75 11.4142 10.0858 11.75 10.5 11.75H17C17.4142 11.75 17.75 11.4142 17.75 11C17.75 10.5858 17.4142 10.25 17 10.25H10.5Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M7 13.75C6.58579 13.75 6.25 14.0858 6.25 14.5C6.25 14.9142 6.58579 15.25 7 15.25H7.5C7.91421 15.25 8.25 14.9142 8.25 14.5C8.25 14.0858 7.91421 13.75 7.5 13.75H7Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M10.5 13.75C10.0858 13.75 9.75 14.0858 9.75 14.5C9.75 14.9142 10.0858 15.25 10.5 15.25H17C17.4142 15.25 17.75 14.9142 17.75 14.5C17.75 14.0858 17.4142 13.75 17 13.75H10.5Z"
                    fill="#1C274C"
                  ></path>{" "}
                </g>
              </svg>
              <span class="ms-3">Major Expenses</span>
            </a>
          </li>
          <li>
            <a
              href="/daily-expenses"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21"
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
              <span class="ms-3">Daily Expenses</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
