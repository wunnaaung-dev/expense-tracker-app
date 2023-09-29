import React from 'react'

export default function Action({children, color, type, disabled, pending = null}) {
  return (
    <button disabled={disabled} onClick={pending} type={type} className={`py-2 w-28 shadow-md rounded-md disabled:bg-zinc-500 ${color}`}>
        {children}
    </button>
  )
}
