import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useUser } from "@/context/UserContext";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import handleErrors from "@/utils/handleErrors";
import { useParams } from "react-router-dom";

const UpdateDailyExpenseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [showInlineInputs, setShowInlineInputs] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [dailyExpense, setDailyExpense] = useState({});

  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      const fetchedDailyExpense = await api("GET", `api/dailyExpense/${id}`);
      setDailyExpense(fetchedDailyExpense);
      const fetchedCategories = await api("GET", `api/category/user/${user.id}`);
      setCategories(fetchedCategories);
      setLoading(false); 
    } catch (error) {
      handleErrors(error);
    }
  }

  fetchData();
}, []);


  const initialValues = {
    name: dailyExpense.name || "",
    amount: dailyExpense.amount || "",
    description: dailyExpense.description || "",
    date : dailyExpense.date ? new Date(dailyExpense.date).toISOString().split('T')[0] : '',
    category: dailyExpense.category?.id || "Select category",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    description: Yup.string(),
    date : Yup.date().required("Date is required"),
    category: Yup.string().notOneOf(
      ["Select category"],
      "Category is required"
    ),
  });

  const handleCreateNewCategory = () => {
    setShowInlineInputs(true);
  };

  const handleCategoryInputChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleCategoryInputKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (newCategoryName.trim() !== "") {
        if (categories.every((category) => category.name !== newCategoryName)) {
          try {
            const category = await api("POST", `api/category`, {
              name: newCategoryName,
              user_id: user.id,
            });
            setCategories([...categories, category]);
            setNewCategoryName("");
            setShowInlineInputs(false);
            toast.success(
              "Category created successfully, you can now select it from the dropdown."
            );
          } catch (error) {
            handleErrors(error);
          }
        } else {
          toast.error("Category already exists");
          setShowInlineInputs(false);
          setNewCategoryName("");
        }
      } else {
        setShowInlineInputs(false);
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      await api("PUT", `api/dailyExpense/${id}`, {
        name: values.name,
        amount: values.amount,
        description: values.description,
        date : new Date(values.date).toISOString(),
        category_id: values.category,
        user_id: user.id,
      });
      toast.success("Daily expense updated successfully");
        navigate("/daily-expenses");
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
          Update daily expense
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
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
                    placeholder="Type daily expense name"
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
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount
                  </label>
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  {showInlineInputs ? (
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={handleCategoryInputChange}
                      onKeyDown={handleCategoryInputKeyDown}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter new category and press Enter"
                    ></input>
                  ) : (
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      onChange={(e) => {
                        if (e.target.value === "create_new") {
                          setShowInlineInputs(true);
                        } else {
                          setShowInlineInputs(false);
                          setFieldValue("category", e.target.value);
                        }
                      }}
                    >
                      <option disabled>Select category</option>
                      {categories &&
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      <option value="create_new">Create new</option>
                    </Field>
                  )}
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                  <ErrorMessage
                    name="date"
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
                    placeholder="Write daily expense description here"
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
                Update daily expense
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default UpdateDailyExpenseForm;
