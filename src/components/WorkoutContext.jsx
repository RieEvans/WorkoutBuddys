import { createContext, useReducer, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.filter((u) => u._id === action.payload._id),
      };
    default:
      return state;
  }
};

const notify = () =>
  // Notification //Pass this function into the Context Provider
  toast("New Item Has Been Added ✔️", {
    style: {
      borderRadius: "10px",
      background: "#0F172A",
      color: "#EEE",
      fontSize: "18px",
    },
  });
const notifyDeleteItem = () =>
  toast(
    // Notification //Pass this function into the Context Provider
    "🗑️ Item has been removed ",
    {
      style: {
        borderRadius: "10px",
        background: "#0F172A",
        color: "#EEE",
        fontSize: "18px",
      },
    }
  );

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: "",
  });
  const [openForm, setOpenForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  return (
    <WorkoutContext.Provider
      value={{
        ...state,
        dispatch,
        openForm,   
        setOpenForm,
        editForm,
        setEditForm,
        notify, 
        notifyDeleteItem,
      }}>
      {children}
    </WorkoutContext.Provider>
  );
};
