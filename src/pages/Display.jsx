import React from 'react'

export const Display = () => {
  return (
    <section className='h-[50vh]  absolute top-40 inset-0 flex items-center justify-center z-0 '>
        <div className='md:flex items-center justify-between'>
            <div className=' '>
                <h1 className='font-semibold text-slate-900  tracking-wide text-2xl md:text-3xl text-slate-900 text-center leading-relaxed p-5'>Start listing up your Routine Exercise</h1>
            </div>
            <div className='flex items-center justify-center'>
                <div className='w-[200px] md:w-full'>
                    <img className='w-full h-full object-cover' src="/images/exercise.png" alt="" />
                </div>
            </div>
        </div>
        
    </section>
  )
}
