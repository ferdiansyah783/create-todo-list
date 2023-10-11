"use client";

import { createTask } from "@/lib/actions/task.actions";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  isTaskModalActive: boolean;
  handleCloseTaskModal: () => void;
  boardId: string;
  handleRefresh: () => void;
}

const CreateTaskModal = ({
  isTaskModalActive,
  handleCloseTaskModal,
  boardId,
  handleRefresh,
}: Props) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const modalRef = useRef<any>();

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseTaskModal();
      setFormData({ name: "" });
    }
  };

  useEffect(() => {
    if (isTaskModalActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isTaskModalActive]);

  const onSubmit = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();

      await createTask(boardId, formData.name);

      handleCloseTaskModal();
      setFormData({ name: "" });
      handleRefresh();
    }
  };

  return (
    <div
      ref={modalRef}
      className={`fixed ${
        isTaskModalActive ? "scale-y-100" : "scale-y-0"
      } transition-all ease-in-out bottom-5 w-[98%] left-[1%]`}
    >
      <form className="flex w-full h-12 border-2 border-pink-500 rounded-md bg-primary">
        <div className="flex justify-center items-center w-8 border-r border-pink-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-tertiary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </div>
        <input
          name="name"
          type="text"
          className="flex-1 focus:outline-none bg-transparent px-3 text-tertiary placeholder:text-sm"
          placeholder="start typing to create a draft"
          onChange={(e) => setFormData({ name: e.target.value })}
          value={formData.name}
          onKeyDown={onSubmit}
        />
      </form>
    </div>
  );
};

export default CreateTaskModal;
