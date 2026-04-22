import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateStatus } from "./features/tasks/taskSlice";
import { SegmentedControl } from "@mantine/core";
import classes from "./GradientSegmentedControl.module.css";

export default function App() {
  const [task, setTask] = useState({
    name: "",
    dueDate: "",
  });

  const [theme, setTheme] = useState("dark");

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
      }),
    );

    setTask({ name: "", dueDate: "" });
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateStatus({ id, status }));
  };

  return (
    <main
      className={`max-w-full min-h-screen px-8 py-2 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0f2c] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between  mb-6 px-4">
        <div className="flex  items-center">
          <img
            src="/doora.png"
            alt="Doora Logo"
            className="w-32 h-32 object-contain"
          />
          <h1 className="text-3xl text-lime-400 font-bold">TaskBoard</h1>{" "}
        </div>

        <SegmentedControl
          value={theme}
          onChange={setTheme}
          data={[
            { label: "🌙 Dark", value: "dark" },
            { label: "☀️ Light", value: "light" },
          ]}
          radius="xl"
          size="md"
          classNames={classes}
        />
      </div>

      <section
        className={`p-6 w-full rounded-2xl  transition-all duration-300 border-2 ${
          theme === "dark"
            ? "bg-linear-to-r from-gray-800/70 to-gray-900/60  border-indigo-500 backdrop-blur-md shadow-indigo-900/20"
            : "bg-linear-to-r from-white to-indigo-50 border-indigo-200 shadow-md"
        }
`}
      >
        <h1
          className={`text-xl mb-5 font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Add New Task
        </h1>

        <div className="flex items-end gap-5 flex-wrap">
          <div className="flex flex-col flex-1 min-w-60">
            <label
              className={`text-sm mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Task Name
            </label>

            <input
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              placeholder="Enter task name..."
              className={`px-4 py-2 rounded-lg border transition-all outline-none ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
                  : "bg-white border-gray-300 text-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col flex-1 min-w-60">
            <label
              className={`text-sm mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className={`px-4 py-2 rounded-lg border transition-all outline-none ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
                  : "bg-white border-gray-300 text-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            />
          </div>

          <button
            onClick={handleAddTask}
            className={`px-5 py-2 h-11 rounded-lg 
              bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/30 hover:shadow-indigo-500/30"
              cursor-pointer`}
          >
            + Add Task
          </button>
        </div>
      </section>

      <section className="mt-6 w-full">
        <h1
          className={`text-3xl mb-6 font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          My Tasks
        </h1>

        <div className="flex gap-6">
          <div
            className={`flex-1 rounded-2xl p-5 border ${
              theme === "dark"
                ? "bg-yellow-500/10 border-yellow-500/30"
                : "bg-yellow-100 border-yellow-300"
            }`}
          >
            <h3 className="text-xl mb-4 text-yellow-500 font-bold">Todo</h3>

            {tasks
              .filter((t) => t.status === "todo")
              .map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl mb-3 transition hover:scale-[1.02] ${
                    theme === "dark"
                      ? "bg-yellow-600 text-white shadow-md"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <h3 className="text-lg font-semibold">{task.name}</h3>
                  <p className="text-sm opacity-70 mb-3 ">Due {task.dueDate}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusChange(task.id, "in-progress")}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-400 text-white rounded-md text-xs"
                    >
                      Move to Progress
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded-md text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div
            className={`flex-1 rounded-2xl p-5 border ${
              theme === "dark"
                ? "bg-blue-500/10 border-blue-500/30"
                : "bg-blue-100 border-blue-300"
            }`}
          >
            <h3
              className={`text-xl mb-4 ${theme === "dark" ? "text-blue-300" : "text-blue-500"} font-bold`}
            >
              In Progress
            </h3>

            {tasks
              .filter((t) => t.status === "in-progress")
              .map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl mb-3 transition hover:scale-[1.02] ${
                    theme === "dark"
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <h3 className="font-semibold">{task.name}</h3>
                  <p className="text-sm opacity-70 mb-3">Due {task.dueDate}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(task.id, "done")}
                      className="px-3 py-1 bg-green-500 hover:bg-green-400 text-white rounded-md text-xs"
                    >
                      Done
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded-md text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div
            className={`flex-1 rounded-2xl p-5 border ${
              theme === "dark"
                ? "bg-green-500/10 border-green-500/30"
                : "bg-green-100 border-green-300"
            }`}
          >
            <h3
              className={`text-xl mb-4 ${theme === "dark" ? "text-green-300" : "text-green-600"} font-bold`}
            >
              Done
            </h3>

            {tasks
              .filter((t) => t.status === "done")
              .map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl mb-3 transition hover:scale-[1.02] ${
                    theme === "dark"
                      ? "bg-green-800 text-white shadow-md"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <h3 className="text-lg font-semibold">{task.name}</h3>
                  <p className="text-sm opacity-70 mb-3">Due {task.dueDate}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusChange(task.id, "todo")}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md text-xs"
                    >
                      Back
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded-md text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
