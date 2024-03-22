import React from "react";

const GoalModal = ({ goal }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      id="readGoalModal"
      tabIndex="-1"
      aria-hidden="true"
      className="hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              {goal.name}
            </h3>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              data-modal-toggle="readGoalModal"
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
          <dl className="mt-4">
            <div className="mb-4">
              <dt className="text-lg font-semibold text-gray-900">
                Description
              </dt>
              <dd className="text-sm text-gray-700">{goal.description}</dd>
            </div>
            <div className="mb-4">
              <dt className="text-lg font-semibold text-gray-900">
                Saving Frequency
              </dt>
              <dd className="text-sm text-gray-700">{goal.saving_frequency}</dd>
            </div>
            <div className="flex justify-between text-center me-3 mb-4">
              <div>
                <dt className="text-lg font-semibold text-gray-900">
                  Targeted Amount
                </dt>
                <dd className="text-sm text-gray-700">${goal.targeted_amount}</dd>
              </div>
              <div>
                <dt className="text-lg font-semibold text-gray-900">
                  Current Amount
                </dt>
                <dd className="text-sm text-gray-700">${goal.current_amount}</dd>
              </div>
            </div>
            <div className="flex justify-between text-center me-3 mb-4">
              <div>
                <dt className="text-lg font-semibold text-gray-900">
                  Starting Date
                </dt>
                <dd className="text-sm text-gray-700">{new Date(goal.starting_date).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-lg font-semibold text-gray-900">
                  Targeted Date
                </dt>
                <dd className="text-sm text-gray-700">{new Date(goal.targeted_date).toLocaleDateString()}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default GoalModal;
