import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./features/tasks/taskSlice";

export default function App() {
  const [task, setTask] = useState({
    name: "",
    dueDate: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if (!task.name || !task.dueDate) return;

    dispatch(
      addTask({
        id: crypto.randomUUID(),
        ...task,
        status: "todo",
      })
    );

    setTask({ name: "", dueDate: "" });
  };

  return (
    <main className="bg-[#0a0f2c] min-h-screen px-8 py-6">
      <h1 className="text-white text-3xl mb-6 font-bold">TaskBoard</h1>

      <section className="p-6 rounded-xl border border-gray-700 bg-gray-900/60">
        <h2 className="text-lg mb-4 text-white font-semibold">
          Add New Task
        </h2>

        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            placeholder="Task name"
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />

          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />

          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add Task
          </button>
        </div>
      </section>
    </main>
  );
}