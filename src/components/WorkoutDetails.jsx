import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { WorkoutEdit } from "./WorkoutEdit";

export const WorkoutDetails = ({ value }) => {
  const { dispatch, editForm ,setEditForm, notifyDeleteItem } = useWorkoutsContext();

  const handleDelete = async () => {
    const response = await fetch(
      "https://backenddb-up9f.onrender.com/api/workouts/" + value._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      notifyDeleteItem()
    }
  };
  
  return (
    <section className="bg-white p-2 rounded-md shadow-md relative overflow-hidden">
      <div className="w-[300px]">
        <h1>
          {" "}
          <span className="font-semibold">Title: </span>
          {value.title}
        </h1>
        <div className="my-2">
          <p className="fonts">{`Load (kg): ${value.load}`}</p>
          <p className="font-semibold tracking-wide text-sm">{`Reps: ${value.reps}`}</p>
        </div>
        <div>
          <p>{value.createdAt}</p>   
        </div>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 items-center ">
      <div
          onClick={() => setEditForm(true)}
          className=" bottom-2 cursor-pointer text-red-300 right-5">
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
        <div
          onClick={handleDelete}
          className=" top-2 cursor-pointer text-black right-5">
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>

      {editForm && <WorkoutEdit />}  
    </section>
  );
};
