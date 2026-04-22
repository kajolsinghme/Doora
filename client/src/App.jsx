import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./features/tasks/taskSlice";

export default function App() {
  const [task, setTask] = useState({
    name: "",
    dueDate: "",
  });

  const tasks = useSelector((state) => state.tasks.items);

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

      {/* Add Task Form */}
      <section className="p-6 rounded-xl border border-gray-700 bg-gray-900/60 mb-6">
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

      {/* Task Board */}
      <section className="flex gap-6">
        {/* Todo */}
        <div className="flex-1 bg-yellow-500/20 border border-yellow-500 rounded-xl p-4">
          <h3 className="text-yellow-300 font-bold mb-4">Todo</h3>

          {tasks
            .filter((t) => t.status === "todo")
            .map((task) => (
              <div
                key={task.id}
                className="bg-yellow-600 p-3 rounded mb-2 text-white"
              >
                <h4>{task.name}</h4>
                <p className="text-sm text-gray-200">Due {task.dueDate}</p>
              </div>
            ))}
        </div>

        {/* In Progress */}
        <div className="flex-1 bg-blue-500/20 border border-blue-500 rounded-xl p-4">
          <h3 className="text-blue-300 font-bold mb-4">In Progress</h3>

          {tasks
            .filter((t) => t.status === "in-progress")
            .map((task) => (
              <div
                key={task.id}
                className="bg-blue-700 p-3 rounded mb-2 text-white"
              >
                <h4>{task.name}</h4>
                <p className="text-sm text-gray-200">Due {task.dueDate}</p>
              </div>
            ))}
        </div>

        {/* Done */}
        <div className="flex-1 bg-green-500/20 border border-green-500 rounded-xl p-4">
          <h3 className="text-green-300 font-bold mb-4">Done</h3>

          {tasks
            .filter((t) => t.status === "done")
            .map((task) => (
              <div
                key={task.id}
                className="bg-green-700 p-3 rounded mb-2 text-white"
              >
                <h4>{task.name}</h4>
                <p className="text-sm text-gray-200">Due {task.dueDate}</p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}