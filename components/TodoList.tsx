import React from "react";

const TodoList = () => {
  return (
    <section className="flex px-10 py-5 flex-1 bg-[#1b263b]">
      <div className="w-[370px] h-full flex flex-col border border-pink-500 rounded-lg bg-[#0d1b2a] overflow-hidden">
        <div className="flex justify-between items-center px-3 pt-3">
          <div className="flex items-center space-x-1">
            <span className="w-4 h-4 rounded-full bg-pink-300 border-2 border-pink-500"></span>
            <h1 className="text-[#e0e1dd]">Todo</h1>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-[#e0e1dd]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>

        <p className="text-[#e0e1dd] text-sm font-light px-3 mb-3">
          This item hasn't been started
        </p>

        <div className="flex-1 px-3 space-y-2">
          <div className="bg-[#1b263b] h-[70px] flex justify-between items-center p-3 rounded-md border border-pink-500 group">
            <p className="text-pink-500 font-semibold">
              create todo list with next
            </p>
            <button className="w-8 h-8 flex justify-center items-center rounded-md hover:bg-[#0d1b2a] group-hover:visible invisible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-6 h-6 text-pink-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>
          <div className="bg-[#1b263b] h-[70px] flex justify-between items-center p-3 rounded-md border border-pink-500 group">
            <p className="text-pink-500 font-semibold">
              create todo list with next
            </p>
            <button className="w-8 h-8 flex justify-center items-center rounded-md hover:bg-[#0d1b2a] group-hover:visible invisible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-6 h-6 text-pink-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>
          <div className="bg-[#1b263b] h-[70px] flex justify-between items-center p-3 rounded-md border border-pink-500 group">
            <p className="text-pink-500 font-semibold">
              create todo list with next
            </p>
            <button className="w-8 h-8 flex justify-center items-center rounded-md hover:bg-[#0d1b2a] group-hover:visible invisible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-6 h-6 text-pink-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button className="flex items-center p-3 hover:bg-[#1b263b] hover:bg-opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-5 h-5 text-[#e0e1dd]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          <p className="text-[#e0e1dd]">Add Item</p>
        </button>
      </div>
    </section>
  );
};

export default TodoList;
