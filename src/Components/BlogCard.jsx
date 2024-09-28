import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const BlogCard = ({ blog }) => {
    const getFirst20Letters = (content) => {
        const strippedContent = content.replace(/<[^>]*>/g, '');
        return strippedContent.substring(0, 20);
      };
    return (
        <div className="w-80 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden flex flex-col justify-between p-4" style={{ height: '26rem' }}>
            <div className="w-full h-36 bg-blue-400 rounded-lg flex items-center justify-center relative">
                <IoLocationOutline size={48} className="text-white absolute top-2 right-2" />
                <img
                    src={blog.image}
                    alt="Travel"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <span className="font-bold text-blue-900 text-center text-xl mt-4">{blog.title}</span>
            <p className="text-blue-700 text-center font-normal text-sm my-1">{blog.author} | {new Date(blog.date).toLocaleDateString()}</p>
            <p className="text-gray-800 text-center font-normal text-sm mb-4"> {getFirst20Letters(blog.content)} ....</p>

            {/* Adding vehicle/transportation */}
            <div className="bg-yellow-100 text-yellow-800 text-center py-1 px-2 rounded-full text-xs font-semibold mb-4">
                {blog.vehicle}
            </div>

            <div className="flex justify-center space-x-4 mb-4">
                <Link href="#" className="text-blue-600 hover:text-blue-400 transition duration-400">
                    <FaTwitter size={16} />
                </Link>
                <Link href="#" className="text-blue-600 hover:text-blue-400 transition duration-400">
                    <FaInstagram size={16} />
                </Link>
                <Link href="#" className="text-blue-600 hover:text-blue-400 transition duration-400">
                    <FaYoutube size={16} />
                </Link>
            </div>

            <button className="py-2 px-6 mx-auto rounded-full border-none font-bold bg-blue-500 text-white transition duration-400 hover:bg-blue-700 cursor-pointer">
                Read More
            </button>
        </div>
    );
};

export default BlogCard;
