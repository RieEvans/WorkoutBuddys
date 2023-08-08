import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export const WorkoutForm = () => {
  const { dispatch, setOpenForm, notify } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("https://backenddb-up9f.onrender.com/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      notify()
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("New Workout Added", json);
      setOpenForm(false)
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    } else {
      console.log("Please Complete the form");
    }
  };

  return (
    <section className={`backgroundForm fixed duration-300 inset-0 flex items-center justify-center z-10`}>
      <form
        onSubmit={handleSubmit}
        className="dropTop relative overflow-hidden bg-white w-full md:w-[60%] flex flex-col shadow-xl mt-5 p-5 gap-2 ">
        <h3 className="font-semibold text-xl md:text-2xl mb-1">
          Add a New Workout
        </h3>
        <label className="text-slate-900 font-semibold">Exercise Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          type="text"
          className={`${
            emptyFields.includes("title") ? "border border-red-600" : ""
          } p-2 border shadow-md`}
        />

        <label className="text-slate-900 font-semibold">Load (in kg):</label>
        <input
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          placeholder="Number"
          type="text"
          className={`${
            emptyFields.includes("load") ? "border border-red-600" : ""
          } p-2 border shadow-md`}
        />

        <label className="text-slate-900 font-semibold">Reps:</label>
        <input
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          placeholder="Number"
          type="text"
          className={`${
            emptyFields.includes("reps") ? "border border-red-600" : ""
          } p-2 border shadow-md`}
        />

        <button className="bg-yellow-200 font-semibold text-slate-900 p-1 w-[150px] rounded-md shadow-md">
          Add Workout
        </button>
        {error && (
          <div className="bg-red-200 p-2 rounded-md text-red-900">
            Please Fill Out All the Fields
          </div>
        )}

        {/* Exit Button */}
        <div onClick={() => setOpenForm(false)} className="absolute top-5 right-5 text-2xl cursor-pointer">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
      </form>
    </section>
  );
};
