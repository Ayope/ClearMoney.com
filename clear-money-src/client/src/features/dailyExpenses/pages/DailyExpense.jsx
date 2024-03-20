import React from "react";

const DailyExpenseModal = ({ dailyExpense }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      id="readDailyExpenseModal"
      tabIndex="-1"
      aria-hidden="true"
      className="hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {dailyExpense.name}
            </h3>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              data-modal-toggle="readDailyExpenseModal"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <p className="text-lg font-bold text-gray-900">${dailyExpense.amount}</p>
          <dl className="mt-4">
            <div className="mb-4">
              <dt className="text-lg font-semibold text-gray-900">
                Details
              </dt>
              <dd className="text-sm text-gray-700">{dailyExpense.description}</dd>
            </div>
            <div className="mb-4">
              <dt className="text-lg font-semibold text-gray-900">
                Category
              </dt>
              <dd className="text-sm text-gray-700">
                {dailyExpense.category?.name || 'no category'} 
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900">
                Date
              </dt>
              <dd className="text-sm text-gray-700">
                {new Date(dailyExpense.date).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default DailyExpenseModal;
