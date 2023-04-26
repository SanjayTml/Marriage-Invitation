import React from "react";

function CodeInput(setShowCard) {

  return (
    <div>
      <p className="mb-2">
        Please enter your phone number where you received the sms.
      </p>
      <div className="px-20 mx-auto">
        <form onSubmit={handleSubmit} className="rounded-lg p-4 shadow-md">
          <div className="flex mb-1 items-center">
            <input
              type="text"
              className="w-full rounded-lg border border-violet-400 p-2 focus:outline-violet-600"
              placeholder="98XXXXXXXX"
              name="filter"
            />
            <button
              type="button"
              className="ml-2 mt-0 rounded-lg border border-violet-600 p-2 px-4 hover:text-white hover:bg-violet-600"
              onClick={() => setShowCard(true)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CodeInput;
