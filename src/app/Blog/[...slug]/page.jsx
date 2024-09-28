'use client';
import HomeMap from '@/Components/HomeMap';
import React, { useEffect, useState } from 'react';
import { FaMapPin } from "react-icons/fa";

const ArticlePage = ({ params }) => {
  const [data, setData] = useState([]); // To store the fetched data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from the API
  const fetchDATA = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();

      // Find the data with the matching id to params.slug
      const filteredData = result.find(item => item.id == params.slug);
      
      // Log the data with matching ID
      if (filteredData) {
        console.log("Matched Data:", filteredData);
        setData(filteredData); // Set matched data to the state
      } else {
        console.log("No data found with this id");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDATA();
  }, [params.slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full flex justify-center py-10 bg-gray-100">
      <div className="w-11/12 max-w-7xl bg-white shadow-lg rounded-lg p-6 gap-6">
        <div className="mb-4 border-b pb-2">
          <h1 className="text-3xl font-bold text-customBlue">{data.title}</h1>
          <p className="text-sm text-gray-500">By {data.author} | Vehicle: {data.vehicle}</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="text-gray-700 w-full lg:w-6/12" dangerouslySetInnerHTML={{ __html: data.content }} />
          
          <div className="mt-6 lg:mt-0 flex-grow lg:flex lg:flex-col justify-start w-full lg:w-4/12">
            <h2 className="text-2xl font-semibold mb-4 text-customBlue flex items-center">
              <FaMapPin className="mr-2" /> Map Route
            </h2>
            <div className="flex-grow  lg:h-full w-full" style={{ height: '500px' }}>
              <HomeMap page={'blog'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
