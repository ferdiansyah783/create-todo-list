"use client";

import { useState } from "react";
import CreateBoardModal from "./CreateBoardModal";
import CreateTaskModal from "./CreateTaskModal";

interface Props {
  todoData: any;
  handleRefresh: () => void;
}

const TodoList = ({ todoData, handleRefresh }: Props) => {
  const [isBoardModalActive, setIsBoardModalActive] = useState(false);
  const [isTaskModalActive, setIsTaskModalActive] = useState(false);
  const [boardId, setBoardId] = useState("");

  const handleOpenBoardModal = () => {
    setIsBoardModalActive(true);
  };

  const handleCloseBoardModal = () => {
    setIsBoardModalActive(false);
  };

  const handleOpenTaskModal = (boardId: string) => {
    setIsTaskModalActive(true);
    setBoardId(boardId);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalActive(false);
  };

  return (
    <section className="flex gap-x-3 px-5 md:px-10 py-5 flex-1 bg-[#1b263b] w-full overflow-x-auto">
      {todoData?.boards?.map((board: any) => (
        <div
          key={board.id}
          className="w-[360px] 2xl:w-[370px] h-full flex flex-col shrink-0 border border-pink-500 rounded-lg bg-[#0d1b2a] overflow-hidden"
        >
          <div className="flex justify-between items-center px-3 pt-3">
            <div className="flex items-center space-x-1">
              <span className="w-3 2xl:w-4 h-3 2xl:h-4 rounded-full bg-pink-300 border-2 border-pink-500"></span>
              <h1 className="text-[#e0e1dd] font-semibold text-base md:text-sm 2xl:text-base">
                {board.name}
              </h1>
            </div>
            <button className="w-7 2xl:w-8 h-7 2xl:h-8 hover:bg-[#1b263b] rounded-md flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 2xl:w-6 h-5 2xl:h-6 text-[#e0e1dd]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>

          <p className="text-[#e0e1dd] text-sm md:text-xs 2xl:text-base font-light px-3 mb-3">
            {board.description}
          </p>

          <div className="flex-1 px-3 space-y-2 overflow-y-auto">
            {board.tasks.map((task: any) => (
              <div
                key={task.id}
                className="bg-[#1b263b] h-[70px] flex justify-between items-center p-3 rounded-md border border-pink-500 group"
              >
                <p className="text-pink-500 font-semibold text-sm">
                  {task.name}
                </p>
                <button className="w-7 2xl:w-8 h-7 2xl:h-8 flex justify-center items-center rounded-md hover:bg-[#0d1b2a] group-hover:visible invisible">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="w-5 2xl:w-6 h-5 2xl:h-6 text-pink-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleOpenTaskModal(board.id)}
            type="button"
            className="flex items-center p-3 hover:bg-[#1b263b] hover:bg-opacity-100"
          >
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
            <p className="text-[#e0e1dd] text-sm 2xl:text-base">Add Item</p>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleOpenBoardModal}
        className="w-10 h-10 bg-[#0d1b2a] border border-pink-500 rounded-md shrink-0 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-pink-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </button>

      <CreateBoardModal
        isActive={isBoardModalActive}
        handleCloseBoardModal={handleCloseBoardModal}
        viewId={todoData.id}
        handleRefresh={handleRefresh}
      />

      <CreateTaskModal
        isTaskModalActive={isTaskModalActive}
        handleCloseTaskModal={handleCloseTaskModal}
        boardId={boardId}
        handleRefresh={handleRefresh}
      />
    </section>
  );
};

export default TodoList;
