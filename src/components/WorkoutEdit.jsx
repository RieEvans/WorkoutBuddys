import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

export const WorkoutEdit = ({value}) => {
    const {dispatch, setEditForm} = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleEdit = async () => {
        e.preventDefault()
        const workout = {title, load, reps}
        const response = await fetch('https://backenddb-up9f.onrender.com/api/workouts/' + value._id, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
              "Content-Type": "application/json",
            },
        })    
        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            dispatch({type: 'UPDATE_WORKOUT', payload: json})
            console.log('Form has been Edited')
        }else {
            console.log('Please complete the form');
        }
    }

    return (
        <section className={`fixed duration-300 inset-0 flex items-center justify-center z-10`}>
          <form
          
            className=" relative overflow-hidden bg-white w-full md:w-[60%] flex flex-col shadow-md mt-5 p-5 gap-2 ">
            <h3 className="font-semibold text-xl md:text-2xl mb-1">
              Edit Form
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
            <button onClick={handleEdit} className="bg-yellow-200 font-semibold text-slate-900 p-1 w-[150px] rounded-md shadow-md">
              Update
            </button>
            {error && (
              <div className="bg-red-200 p-2 rounded-md text-red-900">
                Please Fill Out All the Fields
              </div>
            )}
    
            {/* Exit Button */}
            <div onClick={() => setEditForm(false)} className="absolute top-5 right-5 text-2xl cursor-pointer">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
          </form>
        </section>
      );
    };