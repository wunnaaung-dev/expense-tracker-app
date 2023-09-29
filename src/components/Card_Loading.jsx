import React from 'react'

export default function Card_Loading() {
  return (
    <div className='w-70 rounded-md shadow-md bg-slate-300 animate-pulse'>
        <p className='font-bold text-center'>Loading</p>
        <div className="animate-pulse w-44 rounded-full bg-slate-300"></div>
    </div>
  )
}
