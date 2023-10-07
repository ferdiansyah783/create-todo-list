"use client";

import { createBoard } from "@/lib/actions/boards.actions";
import React, { useState } from "react";

interface Props {
  isActive: boolean;
  handleCloseBoardModal: () => void;
  viewId: string;
  handleRefresh: () => void;
}

const CreateBoardModal = ({ isActive, handleCloseBoardModal, viewId, handleRefresh }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });


  const onSubmit = async (e: any) => {
    e.preventDefault()

    await createBoard(viewId, formData.name, formData.description)

    handleCloseBoardModal()
    handleRefresh()
  }

  return (
    <div
      className={`w-full h-screen ${
        isActive ? "scale-100" : "scale-0"
      } fixed flex justify-center items-center bg-black bg-opacity-70 top-0 left-0`}
    >
      <form
        className={`w-80 ${
          isActive ? "scale-100" : "scale-0"
        } transition-all duration-300 ease-in-out bg-[#0d1b2a] border border-pink-500 rounded-xl`}
        onSubmit={onSubmit}
      >
        <header className="flex justify-between items-center px-3 py-5 border-b border-pink-500">
          <h1 className="text-[#e0e1dd] font-bold text-sm">New option</h1>
          <button className="w-7 h-7 flex justify-center items-center hover:bg-black hover:bg-opacity-50 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-[#e0e1dd]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        <section className="px-3 py-5">
          <div className="mb-2">
            <label className="text-white text-sm font-semibold">
              Label text*
            </label>
            <input
              name="name"
              type="text"
              className="w-full text-white text-sm p-2 rounded-md h-8 border focus:outline-none border-pink-500 bg-black bg-opacity-30"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold">
              Description
            </label>
            <textarea
              name="description"
              className="w-full text-sm p-2 text-white rounded-md h-20 border border-pink-500 bg-black bg-opacity-30 focus:outline-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </section>
        <footer className="flex justify-end items-center gap-x-2 px-3 py-5 border-t border-pink-500">
          <button
            type="button"
            onClick={handleCloseBoardModal}
            className="px-3 py-1 rounded-md border border-pink-500 text-pink-500"
          >
            cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-pink-500 text-white rounded-md"
          >
            save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default CreateBoardModal;
