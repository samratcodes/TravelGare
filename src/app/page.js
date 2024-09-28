'use client';
import BlogCard from "@/Components/BlogCard";
import BlogLists from "@/Components/BlogLists";
import HomeMap from "@/Components/HomeMap";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  const fetchData = async () => {
    const response = await fetch('/api/data');
    const result = await response.json();
    setData(result); // Store the data
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  // If loading, show a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // Pass the first blog from the fetched data to the BlogCard
  const firstBlog = data.length > 0 ? data[0] : null;

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="w-11/12 bg-white rounded-xl px-2 py-5">
        <div className="flex flex-col md:flex-row justify-around">
          <HomeMap page={'home'} />
          {firstBlog && <BlogCard blog={firstBlog} />}  {/* Pass fetched blog data */}
        </div>
      </div>

      {/* Pass the data to BlogLists */}
      <BlogLists blogs={data} />
    </div>
  );
}
