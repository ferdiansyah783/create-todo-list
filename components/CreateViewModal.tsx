"use client";

import { createView } from "@/lib/actions/view.actions";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  onRefresh: () => void;
  isActive: boolean;
  onClose: () => void;
  setActiveNav: (item: string) => void;
}

const CreateViewModal = ({
  onRefresh,
  isActive,
  onClose,
  setActiveNav,
}: Props) => {
  const [viewName, setViewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<any>();

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
      setViewName("");
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

    await createView(viewName).then((view) => {
      if (view == 'error') return alert('view already exist!')
    });

    setIsLoading(false);

    setViewName("");
    onRefresh();
    onClose();
    setActiveNav(viewName);
  };

  const onCancel = () => {
    onClose();
    setViewName("");
  };

  return (
    <div
      ref={modalRef}
      className={`fixed z-50 top-28 right-8 md:right-[40%] transition-all duration-300 ease-in-out ${
        isActive ? "scale-100" : "scale-0"
      }`}
    >
      <div className="w-80 bg-secondary rounded-md border border-pink-500">
        <form onSubmit={onSubmit} className="p-3">
          <input
            name="view"
            type="text"
            className="w-full border border-pink-500 bg-secondary text-tertiary py-1 px-3 focus:outline-none rounded-md placeholder:text-sm mb-3"
            placeholder="input view name"
            onChange={(e) => setViewName(e.target.value)}
            value={viewName}
          />
          <div className="flex justify-end space-x-2 text-sm">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 border rounded-md text-pink-500 font-semibold border-pink-500"
            >
              cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 flex items-center bg-pink-500 rounded-md text-white"
            >
              {isLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                  />
                </svg>
              )}
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateViewModal;
