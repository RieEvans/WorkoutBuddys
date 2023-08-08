import React, { useEffect} from "react";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// Display
import { Display } from "./Display";

export const Home = () => {
   
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://backenddb-up9f.onrender.com/api/workouts");
        const json = await response.json();
        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS', payload: json})
        } else {
          console.log("Error status", json);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, [workouts]);

  return (
    <section className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {workouts.length > 0 ? workouts.map((workout) => (
            <WorkoutDetails key={workout._id} value={workout} />
          )):(
            <div className="">
              <Display />
            </div>
          )}
      </div>
         
    </section>
  );
};
