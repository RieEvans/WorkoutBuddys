import React, {useState } from 'react'
import { WorkoutForm } from './WorkoutForm'
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

export const Navbar = () => {
  const {openForm, setOpenForm, } = useWorkoutsContext()

  return (
    <header className='bg-white w-full shadow-md z-50'>
        <div className='flex items-center justify-between py-5 m-auto w-[90%] md:w-[70%] '>
            <Link to={`/`}><h1 className='text-xl md:text-3xl font-bold'>Workout Buddy</h1></Link>
            <div onClick={() => {setOpenForm(!openForm)}} className='flex gap-2 items-center cursor-pointer font-semibold'>
              <i className="fa-solid fa-plus"></i> 
              Add Workout
            </div>
        </div>

        {openForm && <div><WorkoutForm /></div>}

    </header>
  )
}
