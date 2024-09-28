'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { MdFileUpload } from "react-icons/md";
import MapInput from '@/Components/MapInput'; // Ensure this imports your MapInput component

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; 

const Create = () => {
  const [LoggedIn, setLoggedIn] = useState(true);
  const [editorContent, setEditorContent] = useState(''); 
  const [title, setTitle] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const [vehicle, setVehicle] = useState('');
  const [routePositions, setRoutePositions] = useState(null); // State for route positions
  const [isSubmitted, setIsSubmitted] = useState(false);  // State for showing 'Submitted' message
  
  const router = useRouter();

  if (LoggedIn == false) {
    router.push('/login');
  }

  // Load saved drafts from cookies
  useEffect(() => {
    const savedTitle = Cookies.get('draftTitle');
    const savedAuthor = Cookies.get('draftAuthor');
    const savedVehicle = Cookies.get('draftVehicle');
    const savedContent = Cookies.get('draftContent');

    if (savedTitle) setTitle(savedTitle);
    if (savedAuthor) setAuthor(savedAuthor);
    if (savedVehicle) setVehicle(savedVehicle);
    if (savedContent) setEditorContent(savedContent);
  }, []);

  // Save draft to cookies on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!editorContent) {
        Cookies.set('draftTitle', title, { expires: 1 });
        Cookies.set('draftAuthor', author, { expires: 1 });
        Cookies.set('draftVehicle', vehicle, { expires: 1 });
        Cookies.set('draftContent', editorContent, { expires: 1 });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [title, author, vehicle, editorContent]);

  // Hide 'Submitted!' message after 10 seconds
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 10000);  // 10 seconds

      return () => clearTimeout(timer);  // Clear timeout when component unmounts or isSubmitted changes
    }
  }, [isSubmitted]);

  // Submit form data to mock API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !author || !vehicle || !editorContent) {
      alert('Please fill out all fields!');
      return;
    }

    // Check if route positions are empty
    if (!routePositions || routePositions.length === 0) {
      alert('Please provide route positions!');
      return;
    }
console.log(routePositions);
    // Construct the data to be sent
    const submissionData = {
      title,
      author,
      vehicle,
      content: editorContent,
      routePositions, // Include the route positions in the submission data
    };

    try {
      // Send a POST request to your API
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Submitted Data:", JSON.stringify(result));

        // Mark as submitted
        setIsSubmitted(true);

        // Clear the form fields
        setEditorContent('');
        setTitle('');
        setAuthor('');
        setVehicle('');
        setRoutePositions(null);

        // Clear cookies
        Cookies.remove('draftTitle');
        Cookies.remove('draftAuthor');
        Cookies.remove('draftVehicle');
        Cookies.remove('draftContent');
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  // Callback to handle positions from MapInput
  const handlePositionsChange = (positions) => {
    // Check if positions have changed before updating state and logging
    if (JSON.stringify(positions) !== JSON.stringify(routePositions)) {
      setRoutePositions(positions);
      console.log("Route Positions Updated:", positions); // Log positions when updated
    }
  };

  return (
    <div className='w-full'>
      <div className="w-11/12 bg-white mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-customBlue flex items-center">
          Create 
          <MdFileUpload className='ml-4'/>
        </h1>

        <form onSubmit={handleSubmit} className="mb-6 w-full">
          <div>
            <label className="block text-md mt-8 font-bold text-gray-700 mb-2" htmlFor="title">
              Blog Title :
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the blog title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Author Name Input */}
          <div className='mt-6 flex w-10/12 justify-between'>
            <div className='w-1/2'>
              <label className="block text-md font-bold text-gray-700 mb-2" htmlFor="author">
                Author Name :
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter the author name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Vehicle Options */}
            <div className='w-1/3'>
              <label className="block text-md font-bold text-gray-700 mb-2" htmlFor="vehicle">
                Select Vehicle :
              </label>
              <select
                id="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a vehicle</option>
                <option value="Bike">Bike</option>
                <option value="Car">Car</option>
                <option value="Trek">Trek</option>
                <option value="Bus">Bus</option>
                <option value="Plane">Plane</option>
              </select>
            </div>
          </div>

          {/* Blog Content Editor */}
          <div className='mt-6'>
            <label className="block text-md font-bold text-gray-700 mb-2">Blog Content</label>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              theme="snow"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  ['link', 'image'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                ],
              }}
              placeholder="Write your blog post here..."
              className="custom-editor bg-white rounded-lg shadow-lg"
              style={{ height: '10rem' }}
            />
          </div>

          <MapInput onPositionsChange={handlePositionsChange} /> {/* Pass the callback to MapInput */}
          
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 mt-8 rounded-lg hover:bg-blue-500 transition-all"
          >
            Submit
          </button>
        </form>

        {isSubmitted && (
          <p className="text-green-600 mt-4 text-lg font-semibold">Submitted!</p>
        )}
      </div>
    </div>
  );
};

export default Create;
