import { WorkoutContext } from "../components/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("useWorkoutsContext must be inside an WorkoutsContextProvider");
  }

  return context;
};
