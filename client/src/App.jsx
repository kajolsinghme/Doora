import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateStatus } from "./features/tasks/taskSlice";

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
    <main className="bg-[#0a0f2c] max-w-full min-h-screen px-8 py-2">
      <div className="flex items-center gap-3 mb-6">
        <img
          src="/doora.png"
          alt="Doora Logo"
          className="w-32 h-32 object-contain"
        />

        <h1 className="text-pink-50 text-4xl font-bold">TaskBoard</h1>
      </div>

      <section
        className="p-6 w-full rounded-2xl border border-indigo-500/40 
bg-linear-to-r froDatem-gray-800/60 to-gray-900/60 backdrop-blur-md shadow-lg"
      >
        <h1 className="text-xl mb-5 text-white font-semibold">Add New Task</h1>

        <div className="flex items-end gap-5 flex-wrap">
          <div className="flex flex-col flex-1 min-w-60">
            <label className="text-sm text-gray-300 mb-2">Task Name</label>
            <input
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              placeholder="Enter task name..."
              className="px-4 py-2 rounded-lg 
        bg-gray-900/70 border border-gray-700 
        text-white focus:outline-none focus:border-indigo-400
        focus:ring-2 focus:ring-indigo-500/30 transition"
            />
          </div>

          <div className="flex flex-col flex-1 min-w-60">
            <label className="text-sm text-gray-300 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg 
        bg-gray-900/70 border border-gray-700 
        text-white focus:outline-none focus:border-indigo-400
        focus:ring-2 focus:ring-indigo-500/30 transition"
            />
          </div>

          <button
            onClick={handleAddTask}
            className="px-5 py-2 h-11 rounded-lg 
      bg-indigo-600 hover:bg-indigo-500 
      text-white font-medium transition 
      shadow-md hover:shadow-indigo-500/30 cursor-pointer"
          >
            + Add Task
          </button>
        </div>
      </section>

      <section className="mt-6 w-full">
        <h1 className="text-white text-3xl mb-4 font-semibold">My Tasks</h1>

        <div className="flex gap-6">
          <div className="flex-1 bg-yellow-500/20 border border-yellow-500 rounded-xl p-4">
            <h3 className="text-xl mb-4 text-yellow-300 font-bold">Todo</h3>

            {tasks
              .filter((t) => t.status === "todo")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-yellow-600 p-4 rounded-lg mb-3 text-white"
                >
                  <h3 className="text-lg font-semibold">{task.name}</h3>
                  <p className="text-sm text-gray-300">Due {task.dueDate}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusChange(task.id, "in-progress")}
                      className="px-2 py-1 bg-blue-600 rounded text-sm cursor-pointer"
                    >
                      Move to Progress
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-2 py-1 bg-red-600 rounded text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex-1 bg-blue-500/20 border border-blue-500 rounded-xl p-4">
            <h3 className="text-xl mb-4 text-blue-300 font-bold">
              In Progress
            </h3>

            {tasks
              .filter((t) => t.status === "in-progress")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-blue-800 p-4 rounded-lg mb-3 text-white"
                >
                  <h3 className="text-lg font-semibold">{task.name}</h3>
                  <p className="text-sm text-gray-300">Due {task.dueDate}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusChange(task.id, "done")}
                      className="px-2 py-1 bg-green-600 rounded text-sm cursor-pointer"
                    >
                      Mark Done
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-2 py-1 bg-red-600 rounded text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex-1 bg-green-500/20 border border-green-500 rounded-xl p-4">
            <h3 className="text-xl mb-4 text-green-300 font-bold">Done</h3>

            {tasks
              .filter((t) => t.status === "done")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-green-800 p-4 rounded-lg mb-3 text-white"
                >
                  <h3 className="text-lg font-semibold">{task.name}</h3>
                  <p className="text-sm text-gray-300">Due {task.dueDate}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusChange(task.id, "todo")}
                      className="px-2 py-1 bg-yellow-600 rounded text-sm"
                    >
                      Move Back
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-2 py-1 bg-red-600 rounded text-sm"
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
