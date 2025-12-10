import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

function EditTask() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [description, setDescription] = useState(
    searchParams.get("description") || ""
  );
  const [deadline, setDeadline] = useState(searchParams.get("deadline") || "");

  useEffect(() => {
    const ta = document.querySelector("textarea[name=description]");
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }, []);

  function onSave() {
    if (!title.trim()) {
      return alert("Title is required.");
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const idx = tasks.findIndex((t) => String(t.id) === String(id));
    if (idx === -1) {
      alert("Task not found.");
      navigate(-1);
      return;
    }

    tasks[idx] = { ...tasks[idx], title, description, deadline };
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const query = new URLSearchParams();
    query.set("title", title || "");
    query.set("description", description || "");
    query.set("deadline", deadline || "");
    query.set("id", id || "");
    // Navigate to the task details page with updated params so the user
    // returns to the previous details view showing the saved changes.
    navigate(`/task?${query.toString()}`);
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 flex justify-center p-7">
      <div className="w-[700px] space-y-4">
        <div className="pb-8 flex w-full justify-center items-center relative">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer text-slate-200 text-center bg-slate-700 p-2 rounded-2xl hover:bg-slate-400 hover:text-slate-700 absolute left-0 bottom-8.5"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-6xl text-slate-400 font-bold text-center">
            Edit Task
          </h1>
        </div>
        <div className="w-full bg-emerald-100 rounded-3xl shadow">
          <div className="p-4 space-y-4 bg-emerald-100 rounded-3xl shadow w-full">
            <input
              className="outline-slate-950 w-full bg-slate-700 text-left text-slate-200 p-2 rounded-2xl"
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="description"
              className="outline-slate-950 w-full bg-slate-700 text-left text-slate-200 p-2 rounded-2xl resize-none"
              placeholder="Description..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              rows="1"
              style={{ overflow: "hidden" }}
            />
            <input
              className="outline-slate-950 w-full bg-slate-700 text-left text-slate-200 p-2 rounded-2xl"
              type="date"
              placeholder="Deadline..."
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <button
              onClick={() => onSave()}
              className="hover:bg-slate-700 hover:text-slate-200 cursor-pointer w-full text-2xl text-center bg-slate-800 text-slate-300 p-2 rounded-2xl"
            >
              Save changes...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
