import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";

const Home = async () => {
  return (
    <main className="flex flex-col h-screen max-h-screen">
      <Navbar />
      <TodoList />
    </main>
  );
};

export default Home;
