import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useUser } from "@/context/UserContext";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import handleErrors from "@/utils/handleErrors";
import swal from "sweetalert";

const CreateGoalForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const initialValues = {
    name: "",
    targeted_amount: "",
    description: "",
    saving_frequency: "Select Frequency",
    targeted_date: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    targeted_amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    description: Yup.string().required("Description is required"),
    saving_frequency: Yup.string(),
    targeted_date: Yup.date()
      .required("Targeted date is required")
      .min(new Date(), "Targeted date must be in the future"),
  });

  const handleSubmit = async (values) => {
    try {
      const createdGoal = await api("POST", "api/goal", {
        ...values,
        user_id: user.id,
        starting_date: new Date(),
      });

      swal({
        icon: "success",
        content: {
          element: "div",
          attributes: {
            innerHTML: `You should save <strong>${
              createdGoal.saving_amount
            }$</strong> <strong>${
              createdGoal.saving_frequency
            }</strong> to reach your goal by <strong>${new Date(
              createdGoal.targeted_date
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}</strong> starting from <strong>this ${createdGoal.saving_frequency === "yearly" ? "year" : "month"}</strong>`,
            style: "text-align: center; margin-top: 30px;",
          },
        },
        button: "close",
      }).then(() => {
        navigate("/goals");
      });

      console.log(createdGoal);
      // navigate("/revenues")
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new goal
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type goal name"
                    required
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="targeted_amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount
                  </label>
                  <Field
                    type="number"
                    id="targeted_amount"
                    name="targeted_amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                  <ErrorMessage
                    name="targeted_amount"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="saving_frequency"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Saving Frequency
                  </label>
                  <Field
                    as="select"
                    id="saving_frequency"
                    name="saving_frequency"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option disabled>Select Frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Field>
                  <ErrorMessage
                    name="saving_frequency"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="targeted_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Targeted Date
                  </label>
                  <Field
                    type="date"
                    id="targeted_date"
                    name="targeted_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                  <ErrorMessage
                    name="targeted_date"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write goal description here"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isSubmitting}
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add new goal
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default CreateGoalForm;
