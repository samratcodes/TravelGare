import React, { useState } from 'react';
import BlogCard from './BlogCard';
import { MdArticle } from "react-icons/md";
import { TbFilterSearch } from "react-icons/tb";

const BlogLists = ({ blogs }) => {
    const [selectedTransportation, setSelectedTransportation] = useState('All');
    const [selectedDate, setSelectedDate] = useState('All');
    const [selectedAuthor, setSelectedAuthor] = useState('All');

    const uniqueTransportations = [...new Set(blogs.map(blog => blog.vehicle || blog.transportation)), 'All'];
    const uniqueAuthors = [...new Set(blogs.map(blog => blog.author)), 'All'];
    const dateOptions = ['All', 'Latest', 'Oldest'];

    const handleTransportationChange = (e) => {
        setSelectedTransportation(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setSelectedAuthor(e.target.value);
    };

    const filteredBlogs = blogs.filter(blog =>
        (selectedTransportation === 'All' || blog.vehicle === selectedTransportation) &&
        (selectedAuthor === 'All' || blog.author === selectedAuthor)
    );

    const sortedBlogs = filteredBlogs.sort((a, b) => {
        if (selectedDate === 'Latest') {
            return new Date(b.date) - new Date(a.date); // Sort descending
        } else if (selectedDate === 'Oldest') {
            return new Date(a.date) - new Date(b.date); // Sort ascending
        }
        return 0; // No sorting if "All" is selected
    });

    return (
        <div className='flex flex-col w-11/12 mt-4 items-start'>
            <div className='flex mb-4 w-full'>
                <div className='w-full gap-4 p-4 flex flex-col md:flex-row md:justify-between bg-white shadow-md rounded-lg overflow-hidden'>
                    <h1 className='flex my-4 items-center font-bold text-2xl' style={{ color: "rgb(54,110,254)" }}>
                        <MdArticle className='mr-4 text-4xl' />Blogs
                    </h1>

                    <div className='flex gap-4 flex-col md:flex-row text-zinc-600 font-light'>
                        <h2 className='text-xl font-semibold mb-2 flex items-center mr-4' style={{ color: "rgb(54,110,254)" }}>
                            <TbFilterSearch className='text-3xl mr-3' />
                            Filters
                        </h2>

                        <div className='flex items-center space-x-2'>
                            <label htmlFor="transportation">Transportation:</label>
                            <select
                                id="transportation"
                                value={selectedTransportation}
                                onChange={handleTransportationChange}
                                className='border border-gray-300 p-2 rounded-md bg-white shadow-sm'
                            >
                                {uniqueTransportations.map((transportation, index) => (
                                    <option key={index} value={transportation}>
                                        {transportation}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <label htmlFor="date">Date:</label>
                            <select
                                id="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className='border border-gray-300 p-2 rounded-md bg-white shadow-sm'
                            >
                                {dateOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <label htmlFor="author" className='font-semibold'>Author:</label>
                            <select
                                id="author"
                                value={selectedAuthor}
                                onChange={handleAuthorChange}
                                className='border border-gray-300 p-2 rounded-md bg-white shadow-sm'
                            >
                                {uniqueAuthors.map((author, index) => (
                                    <option key={index} value={author}>
                                        {author}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center flex-wrap gap-4'>
                {sortedBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogLists;
