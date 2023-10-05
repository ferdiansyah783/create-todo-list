"use client";

import { createView, fetchViews } from "@/lib/actions/view.actions";
import View from "@/lib/models/view.model";
import { useEffect, useState } from "react";
import CreateViewModal from "./CreateViewModal";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("view 1");
  const [views, setViews] = useState<(typeof View)[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleNavItem = (item: string) => {
    setActiveNav(item);
  };

  const handleAdd = async () => {
    let viewNmae = "view " + (views.length + 1);
    await createView(viewNmae);
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
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <nav className="flex flex-col px-10 pt-3 bg-[#0d1b2a] border-b border-pink-500">
      <h1 className="font-bold text-[#e0e1dd] mb-2">Github Todo-List</h1>
      <ul className="flex space-x-2 -mb-[1px]">
        {views.map((view, i) => (
          <li
            key={i}
            onClick={() => handleNavItem(view.name)}
            className={`${
              activeNav === view.name
                ? "bg-[#1b263b] border-t border-x border-pink-500 text-pink-500 rounded-t-md font-semibold"
                : "text-[#e0e1dd]"
            } px-5 py-1 cursor-pointer text-sm`}
          >
            {view.name}
          </li>
        ))}
        <li
          onClick={handleOpenModal}
          className="flex items-center p-1 cursor-pointer text-[#e0e1dd] relative"
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

          <CreateViewModal isActive={isOpenModal} onClose={handleCloseModal} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
