import api from '@/utils/api';
import { useEffect, useState } from 'react';
import handleErrors from '@/utils/handleErrors';
import { useUser } from '@/context/UserContext';

const ResourcesCountByCategory = ({revenuesByCategory, expensesByCategory, dailyExpensesByCategory}) => {
  const { user } = useUser();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await api("GET", `api/category/user/${user.id}`);
        setCategories(fetchedCategories);
      } catch (error) {
        handleErrors(error);
      }
    }

    fetchCategories();
  },[])


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Revenues
            </th>
            <th scope="col" className="px-6 py-3">
              Expenses
            </th>
            <th scope="col" className="px-6 py-3">
              Daily Expenses
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span
                  style={{
                    backgroundColor: category.color,
                    color: "black",
                    borderRadius: "20px",
                    padding: "4px 10px",
                  }}
                >
                  {category.name}  
                </span>
              </td>
              <td className="px-6 py-4 font-semibold text-black">
                {((revenuesByCategory?.find(revenue => revenue.category === category.name) || {}).count) || 0} 
                &nbsp;({((revenuesByCategory?.find(revenue => revenue.category === category.name) || {}).total || 0).toFixed(2)}$)
              </td>
              <td className="px-6 py-4 font-semibold text-black">
                {((expensesByCategory?.find(expense => expense.category === category.name) || {}).count) || 0} 
                &nbsp;({((expensesByCategory?.find(expense => expense.category === category.name) || {}).total || 0).toFixed(2)}$)
              </td>
              <td className="px-6 py-4 font-semibold text-black">
                {((dailyExpensesByCategory?.find(dailyExpense => dailyExpense.category === category.name) || {}).count) || 0} 
                &nbsp;({((dailyExpensesByCategory?.find(dailyExpense => dailyExpense.category === category.name) || {}).total || 0).toFixed(2)}$)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesCountByCategory;
