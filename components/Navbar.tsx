"use client";

import { fetchViews } from "@/lib/actions/view.actions";
import { Key, useEffect, useState } from "react";
import CreateViewModal from "./CreateViewModal";
import { resetDatabase } from "@/lib/actions/db.actions";

interface Props {
  activeNav: string;
  setActiveNav: (item: string) => void;
  onRefresh: () => void;
}

const Navbar = ({ activeNav, setActiveNav, onRefresh }: Props) => {
  const [views, setViews] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const views = await fetchViews();
      setViews(views);
    };
    

    fetchData();
  }, [refresh]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const onReset = async () => {
    setIsLoading(true);
    await resetDatabase();
    handleRefresh();
    onRefresh()
    setActiveNav('view 1')
    setIsLoading(false);
  };

  return (
    <nav className="flex flex-col px-5 md:px-10 pt-4 md:pt-3 bg-primary border-b border-pink-500">
      <div className="flex items-center justify-between mb-2 md:mb-0">
        <h1 className="font-bold text-lg md:text-base text-tertiary mb-2">Github Todo-List</h1>
        <button
          onClick={onReset}
          type="button"
          className="px-3 py-1 flex items-center gap-x-1 text-tertiary bg-pink-500 rounded-md text-sm"
        >
          <p>reset</p>
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          )}
        </button>
      </div>
      <ul className="flex space-x-2 -mb-[1px] overflow-x-auto">
        {views.map((view: { name: string }, i: Key) => (
          <li
            key={i}
            onClick={() => setActiveNav(view.name)}
            className={`${
              activeNav === view.name
                ? "bg-secondary border-t border-x border-pink-500 text-pink-500 rounded-t-md font-semibold"
                : "text-tertiary"
            } px-5 py-1.5 cursor-pointer md:text-sm flex items-center gap-x-3 shrink-0`}
          >
            {view.name}
            {activeNav === view.name && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
        <li className="relative shrink-0">
          <div
            onClick={handleOpenModal}
            className="flex items-center p-1.5 cursor-pointer text-tertiary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            <p className="text-sm">New View</p>
          </div>

          <CreateViewModal
            onRefresh={handleRefresh}
            isActive={isOpenModal}
            onClose={handleCloseModal}
            setActiveNav={setActiveNav}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
