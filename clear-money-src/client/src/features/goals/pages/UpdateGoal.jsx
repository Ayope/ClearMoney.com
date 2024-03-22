import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useUser } from "@/context/UserContext";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import handleErrors from "@/utils/handleErrors";


const UpdateGoalForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();
  const [goal, setGoal] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoal() {
      try {
        const fetchedGoal = await api("GET", `api/goal/${id}`);
        setGoal(fetchedGoal);
        setLoading(false); 
      } catch (error) {
        handleErrors(error);
      }
    }
  
    fetchGoal();
  }, []);

  const initialValues = {
    name: goal.name || "",
    targeted_amount: goal.targeted_amount || "",
    description: goal.description || "",
    saving_frequency: goal.saving_frequency || "Select Frequency",
    targeted_date: goal.targeted_date ? new Date(goal.targeted_date).toISOString().split('T')[0] : '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await api("PUT", `api/goal/${id}`, {
        ...values,
        user_id: user.id,
        starting_date: new Date(),
      });

      toast.success("Goal updated successfully");
      navigate("/goals")
    } catch (error) {
      handleErrors(error);
    }
  };
  
  if(loading){
    return <p>Loading...</p>
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update goal
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
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    disabled
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
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  >
                    <option disabled>Select Frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Field>
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
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
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
                Update goal
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default UpdateGoalForm;
