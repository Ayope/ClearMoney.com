import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registerSchema from "../schemas/RegisterSchema";
import api from "@/utils/api";
import WithDocumentTitle from "@/HOCs/WithDocumentTitle";
import handleAuthData from "../helpers/handleAuthData";
import handleAuthErrors from "../helpers/handleAuthErrors";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  const handleRegister = async (values) => {
    try {
      const data = await api("POST", "api/auth/signup", values);
      handleAuthData(data, setUser, navigate);
    } catch (error) {
      handleAuthErrors(error);
    }
  };

  return (
    <section className="px-6 py-10">
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full flex justify-center pt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6em"
              height="6em"
              viewBox="0 0 64 64"
            >
              <path
                fill="#dbb471"
                d="M54 46.9C54 59 44.2 59 32 59s-22 0-22-12.1S19.9 15 32 15s22 19.7 22 31.9"
              />
              <g fill="#89664c">
                <path
                  d="M54 46.9c0-4.1-1.1-9.1-3.1-13.9c.4 3.1-.4 8.6-9.9 10.7c-13.5 2.9-6.5 6.7-11.8 7.2c-4.5.4-16.5-1.4-18.9-8.2c-.2 1.5-.4 2.9-.4 4.3c.1 12 10 12 22.1 12s22 0 22-12.1"
                  opacity="0.5"
                />
                <path d="M37.9 41.1c-.4-2-2.1-2.6-3.9-2.7v-2.8c.5.2 1.1.5 1.5.8c.8.5 1.6-.8.8-1.3c-.7-.4-1.5-.8-2.3-1.1v-3.3c0-1-1.5-1-1.5 0v2.9c-.8-.1-1.6-.1-2.4 0c-.1-.7-.3-1.4-.5-2.1c-.2-1-1.7-.6-1.4.4c.2.7.3 1.4.5 2.1c-.1 0-.1 0-.2.1c-2 .8-3.3 2.8-1.8 4.7c.7.9 1.6 1.2 2.6 1.4c.1 1.3.1 2.6.1 3.9c-.7-.4-1.3-1-1.8-1.5c-.7-.7-1.7.4-1.1 1.1c.9 1 1.9 1.7 2.9 2.2c0 1.1.1 2.2.2 3.3c.1 1 1.6 1 1.5 0c-.1-1-.2-1.9-.2-2.9c.6.1 1.2.1 1.8.1c.1 1 .2 2 .3 3.1c.1 1 1.6 1 1.5 0c-.1-1.1-.2-2.2-.3-3.4c2.2-.8 4.2-2.5 3.7-5m-5.4-6v3.3c-.5 0-.9.1-1.3.1h-.5l-.3-3.6c.7 0 1.4.1 2.1.2m-3.6 3.2c-.4-.1-.8-.4-1.2-.7c-.9-.9.4-1.7 1.2-2.1c.1 1 .2 1.9.3 2.9c-.1 0-.2 0-.3-.1m3.3 6.4c-.5.1-.9 0-1.3-.1c-.1-1.5-.1-3-.1-4.6c.6 0 1.2-.1 1.8-.1c0 1.6.1 3.1.1 4.7c-.2.1-.3.1-.5.1m3.3-1.1c-.4.3-.9.5-1.3.7c-.1-1.5-.1-2.9-.1-4.4h.5c1.9.4 2.4 2.5.9 3.7" />
              </g>
              <path fill="#699635" d="M34 55h-2.3v4l9.3 5l21-6.5V54l-7.7-4.5z" />
              <path
                fill="#83bf4f"
                d="M32 52.7s2.4 3.9 9.2 7.3c0 0 10.6-.5 20.8-7.3c0 0-5.9-2.9-7.6-6.7c0 0-4 5.6-22.4 6.7"
              />
              <path
                fill="#699635"
                d="m27.5 54.9l2.2-.1l.3 3.7l-8.7 5.5L.4 59.5l-.3-3.3l7.1-4.9z"
              />
              <path
                fill="#83bf4f"
                d="M29.2 52.6s-2.1 3.9-8.4 7.6c0 0-10.3.3-20.8-5.2c0 0 5.6-3.2 6.9-7c0 0 4.4 5 22.3 4.6"
              />
              <path
                fill="none"
                stroke="#699635"
                stroke-miterlimit="10"
                d="M24.2 53.7s-.3.8 1.1.9l-3.7 3.1s-2.2-.2-2.7 1.3c0 0-9-1-14.8-3.6c0 0 1.2-.9-.3-1.5c0 0 1.7-1.2 2.1-2.3c0 0 1.6.2 2.1-1c.2-.1 6.2 3.5 16.2 3.1z"
              />
              <ellipse cx="8.8" cy="53.8" fill="#699635" rx="1.9" ry="1.3" />
              <path
                fill="#f9f3d9"
                d="M19 52.2s-2.3 3-7.3 7.1L12 62l-3.5-.8l-.2-2.9s5.1-4.7 6.2-7c-.1 0 1.7.6 4.5.9m23.1-.7s.9 2.4 7.7 6.8v2.9l3.9-1.2v-3s-4.7-3.3-7.5-6.6z"
              />
              <path
                fill="#699635"
                d="m36.4 48.3l-2.2-.1l-.2 4.1l8.9 5.7l20.9-5.7l.1-3.6l-7.3-5.1z"
              />
              <path
                fill="#83bf4f"
                d="M34.6 45.8s2.2 4.2 8.7 8c0 0 10.4 0 20.7-6.4c0 0-5.7-3.3-7.1-7.4c0 0-4.3 5.6-22.3 5.8"
              />
              <path
                fill="none"
                stroke="#699635"
                stroke-miterlimit="10"
                d="M39.1 46.9s.5.8-1.1 1.1l4.2 3.3s2.4-.6 3.2.8c0 0 10-1.8 14.6-4.2c0 0-1.5-.7 0-1.6c0 0-1.8-1.5-2.5-2.5c0 0-1.7.5-2.6-.7c0 .1-3.6 3.3-15.8 3.8z"
              />
              <path
                fill="#699635"
                d="M46.8 49.4c-.4.5-1.7.7-2.8.4c-1.1-.3-1.6-1-1.2-1.5c.4-.5 1.7-.7 2.8-.4c1.1.3 1.6.9 1.2 1.5"
              />
              <path
                fill="#f9f3d9"
                d="M44.8 45s2.4 3.2 7.5 7.5l-.1 3l3.5-1l.1-3.2s-5.2-5-6.5-7.4c.1 0-1.6.7-4.5 1.1"
              />
              <path
                fill="#dbb471"
                d="M46 2c0 6.1-7.9 16-14 16S18 9.1 18 3s.9 0 7 0c.9 0 5.1-3 7-3c1.3 0 5 3 7 3c5.3 0 7-5.6 7-1"
              />
              <path
                fill="#89664c"
                d="M30.2 13.3c-.6.4-3.5.1-4.4.8c-1.2.9.5 3-.7 4.3c-2.4 2.4-4.3 5.1-3.7 6.6c1 2.6 2.9-4.8 4.6-2s1.4-1.9 4 .5s.4-4.3 2.9-1.4s2.6 6.2 4.4 6.2c2.1 0-2.2-7.9.6-6s5.9 1.2 3.1-1.7c-.9-.9-2.1-2.5-3.5-3.9c-.5-.5-.1-3.1-.6-3.5c-.6-.5-2.1 1.1-2.7.8c-1.2-.6-.8.5-2.6.8c-1.2.4-.2-2.3-1.4-1.5"
              />
              <path
                fill="#e8e8e8"
                d="M18.7 19.2c3.9-3.7 11-1.6 15.2.2c4.1 1.8 6.6-3.9 4-6.8c-1.5-1.7-3.9.3-4.8 1.5c-1 1.2-1.8 2.5-2.9 3.7c-1.6 1.8-5.5.3-4.3-2.2c1.3-2.6 6.8.4 8.6.9c3.5 1 7.2 1.4 10.7.1c1.2-.4.7-2.4-.5-1.9c-3.9 1.4-7.8.5-11.5-.7c-1.9-.6-4.9-2.2-6.9-1.3c-5.7 2.7-.4 10.4 4.4 7.4c1.1-.7 1.8-1.8 2.6-2.8c.5-.6 3-4.4 3.6-2.5c.3 1 0 2.8-1.1 3.1c-.7.3-2.1-.7-2.8-.9c-1.3-.5-2.6-.9-4-1.2c-3.7-.8-8.7-.6-11.6 2.1c-1 .8.4 2.2 1.3 1.3"
              />
              <path
                fill="#89664c"
                d="M44.8.5C43.8 1.3 42 3 39 3c-2 0-5.7-3-7-3c-1.9 0-6.1 3-7 3c-3.3 0-5.1-1.7-6-2.4c0 0 1.1 4.5 4.5 6.8C26 9 25.7 7.1 27 5.3s2.2-2.7 4.5 1.8c1.2 2.5 3.5-6.8 5.3-3.8c3.3 5.5 4.5 2.5 8-2.8"
              />
              <path
                fill="#dbb471"
                d="m52.4 52.4l-.1 3l3.5-1l.1-3.2c0 .1-2.1.9-3.5 1.2m-2.6 6v2.9l3.9-1.2v-3c-.1-.1-1.1.5-3.9 1.3m-38.1.8L12 62l-3.5-.8l-.2-2.9c-.1 0 1.3.5 3.4.9"
              />
            </svg>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
              }}
              validationSchema={registerSchema}
              onSubmit={handleRegister}
            >
              {() => (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                        {showPassword ? (
                          <FaEyeSlash
                            className="h-5 w-5 text-gray-500"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <FaEye
                            className="h-5 w-5 text-gray-500"
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WithDocumentTitle(Register, "Register");
