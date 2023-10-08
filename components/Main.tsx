"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TodoList from "./TodoList";
import { fetchView } from "@/lib/actions/view.actions";

const Main = () => {
  const [activeNav, setActiveNav] = useState("view 1");
  const [todoData, setTodoData] = useState<any>({});
  const [refresh, setRefresh] = useState(false);

  const handleNavItem = (item: string) => {
    setActiveNav(item);
  };

  const fetchData = async (name: string) => {
    const res = await fetchView(name);
    setTodoData(res);
  };

  useEffect(() => {
    if (activeNav) {
      fetchData(activeNav);
    }
  }, [activeNav, refresh]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Navbar activeNav={activeNav} setActiveNav={handleNavItem} onRefresh={handleRefresh} />
      <TodoList todoData={todoData} handleRefresh={handleRefresh} />
    </div>
  );
};

export default Main;
