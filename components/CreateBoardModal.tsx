"use client";

import { createBoard } from "@/lib/actions/boards.actions";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  isActive: boolean;
  handleCloseBoardModal: () => void;
  viewId: string;
  handleRefresh: () => void;
}

const CreateBoardModal = ({
  isActive,
  handleCloseBoardModal,
  viewId,
  handleRefresh,
}: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<any>();

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseBoardModal();
      setFormData({ name: "", description: "" });
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isActive]);

  const onSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    await createBoard(viewId, formData.name, formData.description);

    setFormData({ name: "", description: "" });
    setIsLoading(false);

    handleCloseBoardModal();
    handleRefresh();
  };

  const onCancel = () => {
    handleCloseBoardModal();
    setFormData({ name: "", description: "" });
  };

  return (
    <div
      className={`w-full h-screen ${
        isActive ? "scale-100" : "scale-0"
      } fixed flex justify-center items-center bg-black bg-opacity-70 top-0 left-0`}
    >
      <form
        ref={modalRef}
        className={`w-80 ${
          isActive ? "scale-100" : "scale-0"
        } transition-all duration-300 ease-in-out bg-[#0d1b2a] border border-pink-500 rounded-xl`}
        onSubmit={onSubmit}
      >
        <header className="flex justify-between items-center px-3 py-5 border-b border-pink-500">
          <h1 className="text-[#e0e1dd] font-bold text-sm">New option</h1>
          <button
            onClick={onCancel}
            type="button"
            className="w-7 h-7 flex justify-center items-center hover:bg-black hover:bg-opacity-50 rounded-md"
          >
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold">
              Description
            </label>
            <textarea
              name="description"
              className="w-full text-sm p-2 text-white rounded-md h-20 border border-pink-500 bg-black bg-opacity-30 focus:outline-none"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />
          </div>
        </section>
        <footer className="flex justify-end items-center gap-x-2 px-3 py-5 border-t border-pink-500">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 rounded-md border border-pink-500 text-pink-500"
          >
            cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 flex items-center gap-x-1 bg-pink-500 text-white rounded-md"
          >
            <p>save</p>
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                />
              </svg>
            )}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default CreateBoardModal;
