import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between'>
        <div>
            <h1>Dashboard</h1>
        </div>
        <div>
            <Link href="#">Inicio</Link>
        </div>
    </div>
  )
}

export default Navbar