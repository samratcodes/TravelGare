'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPaperPlane, FaBars, FaTimes } from 'react-icons/fa';
import { MdFileUpload } from "react-icons/md";

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [{
        name: "Home",
        href: "/",
    }, {
        name: "About Us",
        href: "/About",
    }];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const HandleClick = () => {
        router.push('/');
    };

    return (
        <div className='w-full border-b border-b-slate-200 font-bold p-4 flex flex-col md:flex-row justify-between items-center text-customBlue bg-white' >
            
            {/* Brand and logo */}
            <div className='flex justify-between items-center w-full md:w-auto'>
                <div className='font-bold text-2xl flex items-center cursor-pointer' onClick={HandleClick}>
                    Travel Gara <FaPaperPlane className='ml-2 text-xl' />
                </div>
                
                {/* Hamburger menu for mobile view */}
                <button onClick={toggleMenu} className='md:hidden p-2 hover:text-gray-700'>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Navigation links */}
            <div className={`md:flex items-end space-x-4 text-sm ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row w-full md:w-auto`}>
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className='p-2 hover:bg-gray-100 rounded-md transition-colors duration-200'>
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Login button */}
            <div className={`md:flex ${isOpen ? 'flex' : 'hidden'} md:flex items-center w-full mx-12 md:w-auto justify-end mt-4 md:mt-0`}>
            <Link href='/Create'  >
            <div className=' p-2 border-2  flex items-center mr-2 rounded-md text-blue-700 transition-colors duration-200'>
            <MdFileUpload />   Create
            </div>
            
                </Link>
                <Link href='/login' >
                <div className='text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200' style={{ backgroundColor: "rgb(54,110,254)" }}>
                Login
                </div>
                  
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
