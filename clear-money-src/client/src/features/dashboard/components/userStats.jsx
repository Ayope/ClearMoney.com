import React from 'react';

const UserStats = ({ stats }) => {
  return (
    <div className="border mt-4 p-4 bg-white rounded-lg text-center md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
      <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-4 dark:text-white sm:p-8">
        <div  className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-3xl font-extrabold">{stats.revenuesCount}</dt>
          <a href='/revenues' className="text-gray-500 dark:text-gray-400 hover:underline">Revenues</a>
        </div>
        <div  className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-3xl font-extrabold">{stats.expensesCount}</dt>
          <a href='/expenses' className="text-gray-500 dark:text-gray-400 hover:underline">Major Expenses</a>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-3xl font-extrabold">{stats.dailyExpensesCount}</dt>
          <a href='/daily-expenses' className="text-gray-500 dark:text-gray-400 hover:underline">Daily Expenses</a>
        </div>
        <div  className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-3xl font-extrabold">{stats.categoriesCount}</dt>
          <a href='/categories' className="text-gray-500 dark:text-gray-400 hover:underline">Categories</a>
        </div>
      </dl>
    </div>
  );
};

export default UserStats;
