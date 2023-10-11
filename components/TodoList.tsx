"use client";

import { useEffect, useState } from "react";
import CreateBoardModal from "./CreateBoardModal";
import CreateTaskModal from "./CreateTaskModal";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { updateDragAndDropBoard } from "@/lib/actions/boards.actions";
import { deleteTaskAndReferences } from "@/lib/actions/task.actions";

interface Props {
  todoData: any;
  handleRefresh: () => void;
}

const TodoList = ({ todoData, handleRefresh }: Props) => {
  const [isBoardModalActive, setIsBoardModalActive] = useState(false);
  const [isTaskModalActive, setIsTaskModalActive] = useState(false);
  const [boardId, setBoardId] = useState("");
  const [boards, setBoards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBoards(todoData?.boards);
  }, [todoData]);

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

  const handleDeleteTask = async (taskId: string) => {
    setIsLoading(true);
    await deleteTaskAndReferences(taskId);
    setIsLoading(false);
    handleRefresh();
  };

  const handleDbDragAndDrop = async (source: any, destination: any) => {
    await updateDragAndDropBoard(source, destination);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log({ source, destination });
    if (!destination) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const tsakSourceIndex = source.index;
    const tsakDestinationIndex = destination.index;

    const boardSourceIndex = boards.findIndex(
      (board: any) => board.id === source.droppableId
    );

    const boardDestinationIndex = boards.findIndex(
      (board: any) => board.id === destination.droppableId
    );

    const newSourceTask = [...boards[boardSourceIndex].tasks];
    const newDestinationTask =
      source.droppableId !== destination.droppableId
        ? [...boards[boardDestinationIndex].tasks]
        : newSourceTask;

    const [deletedTask] = newSourceTask.splice(tsakSourceIndex, 1);
    newDestinationTask.splice(tsakDestinationIndex, 0, deletedTask);

    const newBoards = [...boards];

    newBoards[boardSourceIndex] = {
      ...boards[boardSourceIndex],
      tasks: newSourceTask,
    };

    newBoards[boardDestinationIndex] = {
      ...boards[boardDestinationIndex],
      tasks: newDestinationTask,
    };

    handleDbDragAndDrop(source, destination);

    setBoards(newBoards);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="flex gap-x-3 px-5 md:px-10 py-5 flex-1 bg-[#1b263b] w-full overflow-x-auto">
        {boards?.map((board: any) => (
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
              {board.description || <span className="invisible">h</span>}
            </p>

            <Droppable droppableId={board.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 px-3 space-y-2 overflow-y-auto"
                >
                  {board.tasks.map((task: any, index: any) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className="bg-[#1b263b] h-[70px] flex justify-between items-center p-3 rounded-md border border-pink-500 group"
                        >
                          <p className="text-pink-500 font-semibold text-sm">
                            {task.name}
                          </p>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            type="button"
                            className="w-7 2xl:w-8 h-7 2xl:h-8 flex justify-center items-center rounded-md hover:bg-red-500 group-hover:visible invisible"
                          >
                            {isLoading ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 text-[#e0e1dd] animate-spin"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 text-[#e0e1dd]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

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
    </DragDropContext>
  );
};

export default TodoList;
