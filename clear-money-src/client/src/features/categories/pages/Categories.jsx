import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import DeleteModal from "./DeleteCategory";
import handleErrors from "@/utils/handleErrors";
import * as flowbite from "flowbite";
import { toast } from "react-toastify";
import CreateCategoryModal from "./AddCategory";

export default function Categories() {
  flowbite.initModals();
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalCategory, setModalCategory] = useState({});
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState({});

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("");
  const [onColorChange, setOnColorChange] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await api(
          "GET",
          `api/category/user/${user.id}`
        );
        setCategories(fetchedCategories);
        setFilteredCategories(fetchedCategories);

      } catch (error) {
        handleErrors(error);
      }
    }
    
    toast.info("Double tap a category name to edit.", {
      autoClose : 4000
    })
    
    fetchCategories();
  }, []);

  const handleDeleteClick = (category) => {
    setModalCategory(category);
  };

  const handleAddNewCategory = (category) => {
    setCategories([...categories, category]);
    setFilteredCategories([...categories, category]);
  }

  const handleDelete = (modalCategory) => {
    const newFilteredCategories = filteredCategories.filter(
      (category) => category.id !== modalCategory.id
    );
    setFilteredCategories(newFilteredCategories);

    const newCategories = categories.filter(
      (category) => category.id !== modalCategory.id
    );
    setCategories(newCategories);
  };

  const searchCategories = (expenseName) => {
    const filtered = categories.filter((category) => {
      return category.name.toLowerCase().includes(expenseName.toLowerCase());
    });
    setFilteredCategories(filtered);
  };

  const handleCategoryInputChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleCategoryInputKeyDown = async (e) => {
    if(e.key === "Escape"){
      setShowCategoryInput(false);
      setOnColorChange(false);
      setCategoryToUpdate({});
      setNewCategoryName("");
      setNewCategoryColor("");
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (newCategoryName.trim() !== "" || onColorChange === true) {
        if (
          categories.every(
            (category) =>
              category.name !== newCategoryName ||
              category.id !== categoryToUpdate.id ||
              onColorChange
          )
        ) {
          try {
            const category = await api(
              "PUT",
              `api/category/${categoryToUpdate.id}`,
              {
                name: newCategoryName === "" ? categoryToUpdate.name : newCategoryName,
                color: onColorChange
                  ? newCategoryColor
                  : categoryToUpdate.color,
                user_id: user.id,
              }
            );
            
            const newCategories = categories.map((category) => {
              if (category.id === categoryToUpdate.id) {
                return {
                  ...category,
                  name: newCategoryName === "" ? categoryToUpdate.name : newCategoryName,
                  color: onColorChange ? newCategoryColor : categoryToUpdate.color,
                };
              }
              return category; 
            });
            setCategories(newCategories);
            setFilteredCategories(newCategories);

            setNewCategoryName("");
            setShowCategoryInput(false);
            setOnColorChange(false);
            setCategoryToUpdate({});
            setNewCategoryColor("");
            toast.success("Category updated successfully");
          } catch (error) {
            handleErrors(error);
          }
        } else {
          setShowCategoryInput(false);
          setOnColorChange(false);
          setCategoryToUpdate({});
          setNewCategoryName("");
          setNewCategoryColor("");
        }
      } else {
        setShowCategoryInput(false);
        setCategoryToUpdate({});
      }
    }
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
              fill="#6B7280"
              d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m7 0a4 4 0 1 1-3.995 4.2L13 17l.005-.2A4 4 0 0 1 17 13"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center mt-6 mb-4 mr-2">
          Manage Categories
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
                        searchCategories(e.target.value);
                      }}
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  data-modal-target="createCategoryModal"
                  data-modal-toggle="createCategoryModal"
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
                  Add category
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {showCategoryInput &&
                        categoryToUpdate.id === category.id ? (
                          <div className="flex gap-3">
                            <input
                              type="text"
                              value={newCategoryName}
                              onChange={handleCategoryInputChange}
                              onKeyDown={handleCategoryInputKeyDown}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Enter new category name and press Enter"
                            ></input>
                            <input
                              type="color"
                              value={newCategoryColor}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                              style={{ height: "40px" }}
                              onChange={(event) => {
                                setNewCategoryColor(event.target.value);
                                setOnColorChange(true);
                              }}
                              title="Choose a color for you a category"
                            />
                          </div>
                        ) : (
                          <span
                            style={{
                              backgroundColor: category.color,
                              color: "black",
                              borderRadius: "20px",
                              padding: "4px 10px",
                              cursor: "pointer",
                            }}
                            onDoubleClick={() => {
                              setCategoryToUpdate(category);
                              setNewCategoryName(category.name);
                              setNewCategoryColor(category.color);
                              setShowCategoryInput(true);
                            }}
                          >
                            {category.name.split(" ").length > 2
                              ? category.name.split(" ").slice(0, 2).join(" ") +
                                "..."
                              : category.name}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          type="button"
                          data-modal-target="deleteCategoryModal"
                          data-modal-toggle="deleteCategoryModal"
                          className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                          onClick={() => handleDeleteClick(category)}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <DeleteModal category={modalCategory} onDelete={handleDelete} />
      <CreateCategoryModal onSubmit={handleAddNewCategory}/>
    </div>
  );
}
