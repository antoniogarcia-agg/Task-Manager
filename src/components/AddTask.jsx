import { useState } from "react";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  return (
    <div className="w-full bg-emerald-100 rounded-3xl shadow">
      <h2 className="pt-2 text-center font-bold text-4xl text-slate-950">
        New Task
      </h2>
      <div className="p-4 space-y-4 bg-emerald-100 rounded-3xl shadow w-full">
        <input
          className="outline-slate-950 w-full bg-slate-700 text-left text-slate-200 p-2 rounded-2xl"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
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
          onClick={() => {
            if (!title.trim() || !description.trim() || !deadline.trim()) {
              setTitle("");
              setDescription("");
              setDeadline("");
              return alert(
                "Preencha o título, a descrição e o prazo da tarefa."
              );
            }
            props.onSubmitTaskClick(title, description, deadline);
            setTitle("");
            setDescription("");
            setDeadline("");
          }}
          className="hover:bg-slate-700 hover:text-slate-200 cursor-pointer w-full text-2xl text-center bg-slate-800 text-slate-300 p-2 rounded-2xl"
        >
          Submit...
        </button>
      </div>
    </div>
  );
}

export default AddTask;
