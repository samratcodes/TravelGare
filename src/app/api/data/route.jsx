// app/api/data/route.js

let dataStore = [
  {
    id: 1,
    title: "Exploring the Alps",
    author: "John Doe",
    date: "2023-09-15",
    vehicle: "Car",
    content: `<p>The Alps are one of the most iconic mountain ranges in the world, offering unparalleled views, breathtaking landscapes, and an incredible sense of adventure. From Switzerland to Austria, there’s always something new to explore. In this journey, we’ll take you through scenic routes, pristine lakes, and charming alpine villages, all while uncovering hidden gems.</p>
              <p>Along the way, we’ll stop at famous landmarks such as the Matterhorn and Mont Blanc, all while taking in the natural beauty that the Alps have to offer. Whether you’re a nature lover or simply seeking a peaceful retreat, this adventure is sure to rejuvenate your spirit. Join us for an unforgettable experience!</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [46.8182, 8.2275],
      clickedPosition: [46.819, 8.230]
    }
  },
  {
    id: 2,
    title: "Cycling Through Amsterdam",
    author: "Jane Smith",
    date: "2023-08-12",
    vehicle: "Bicycle",
    content: `<p>Amsterdam is known as the city of bikes, and there’s no better way to explore its picturesque streets, stunning canals, and historic landmarks than by cycling. In this adventure, we’ll take you on a cycling tour of the city, visiting famous sites like the Anne Frank House, the Van Gogh Museum, and the bustling Dam Square.</p>
              <p>As you pedal through the narrow streets and over the charming bridges, you’ll get a true sense of the Dutch lifestyle. We’ll stop at local cafes, sample delicious stroopwafels, and even venture into the nearby countryside to see traditional windmills. Get ready for an authentic Dutch experience!</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [52.3676, 4.9041],
      clickedPosition: [52.368, 4.905]
    }
  },
  {
    id: 3,
    title: "Backpacking in Southeast Asia",
    author: "Alex Johnson",
    date: "2023-06-20",
    vehicle: "Backpack",
    content: `<p>Southeast Asia is a backpacker’s paradise, offering a perfect blend of cultural experiences, natural beauty, and affordability. From the bustling streets of Bangkok to the serene landscapes of Halong Bay, this region has it all. In this journey, we’ll take you through Thailand, Cambodia, and Vietnam, immersing you in the rich history and vibrant cultures.</p>
              <p>As we make our way through ancient temples, lush jungles, and pristine beaches, you’ll encounter the warm hospitality of the locals, taste delicious street food, and discover hidden treasures along the way. Whether you’re a seasoned traveler or a first-time backpacker, this trip is designed to leave you with lasting memories.</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [15.8700, 100.9925],
      clickedPosition: [16.000, 101.000]
    }
  },
  {
    id: 4,
    title: "Road Trip Across the USA",
    author: "Emily White",
    date: "2023-07-05",
    vehicle: "Motorcycle",
    content: `<p>A cross-country road trip through the USA is the quintessential American experience. From the rolling hills of the Midwest to the towering peaks of the Rockies, the journey is as diverse as the country itself. In this adventure, we’ll start on the East Coast and make our way west, passing through major cities, national parks, and remote towns.</p>
              <p>Highlights include stops in Chicago, Denver, and the Grand Canyon. Along the way, we’ll enjoy iconic American road food, visit historical landmarks, and soak in the unique regional cultures. Whether you’re riding solo or with friends, this road trip promises to be the adventure of a lifetime!</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [39.8283, -98.5795],
      clickedPosition: [39.829, -98.580]
    }
  },
  {
    id: 5,
    title: "Sailing the Caribbean",
    author: "Michael Brown",
    date: "2023-04-10",
    vehicle: "Boat",
    content: `<p>The Caribbean is known for its crystal-clear waters, tropical beaches, and laid-back lifestyle. In this sailing adventure, we’ll explore some of the most beautiful islands in the region, including the Bahamas, Puerto Rico, and the Virgin Islands. From snorkeling in coral reefs to relaxing on white-sand beaches, this trip offers the perfect blend of adventure and relaxation.</p>
              <p>We’ll also stop at local villages, sample Caribbean cuisine, and learn about the region’s fascinating history. Whether you’re an experienced sailor or a first-timer, this trip is sure to leave you with unforgettable memories of sun, sea, and sand.</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [18.2208, -66.5901],
      clickedPosition: [18.221, -66.591]
    }
  },
  {
    id: 6,
    title: "Exploring Tokyo on Foot",
    author: "Sophie Green",
    date: "2023-09-01",
    vehicle: "Walking",
    content: `<p>Tokyo is a city of contrasts, where ancient traditions meet cutting-edge technology. The best way to experience the heart of this vibrant city is by walking through its neighborhoods, each with its own unique charm. In this journey, we’ll take you through iconic districts like Shibuya, Asakusa, and Harajuku, giving you a taste of both the old and new Tokyo.</p>
              <p>From visiting ancient temples to trying the latest street fashion, Tokyo offers something for everyone. We’ll also stop by local eateries to sample delicious sushi, ramen, and tempura, giving you a true taste of Japanese cuisine. This walking tour is perfect for those who want to immerse themselves in the culture and energy of one of the world’s greatest cities.</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [35.6762, 139.6503],
      clickedPosition: [35.677, 139.651]
    }
  },
  {
    id: 7,
    title: "Safari in Africa",
    author: "David Black",
    date: "2023-05-23",
    vehicle: "Jeep",
    content: `<p>African safaris are an adventure like no other, offering the chance to see some of the world’s most incredible wildlife up close. In this safari, we’ll travel through the savannas of Kenya and Tanzania, home to lions, elephants, zebras, and more. Our experienced guides will take us to the best spots for viewing wildlife, all while sharing their deep knowledge of the region’s ecosystems.</p>
              <p>Beyond the wildlife, we’ll also visit local Maasai villages to learn about the culture and traditions of the people who have lived in harmony with nature for centuries. This safari promises to be an unforgettable experience for nature lovers and adventure seekers alike.</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [-1.2921, 36.8219],
      clickedPosition: [-1.293, 36.822]
    }
  },
  {
    id: 8,
    title: "Exploring the Great Barrier Reef",
    author: "Laura Adams",
    date: "2023-03-19",
    vehicle: "Scuba Diving",
    content: `<p>The Great Barrier Reef is one of the natural wonders of the world, home to a vast array of marine life and stunning coral formations. In this diving adventure, we’ll take you to some of the best dive spots in the reef, where you’ll encounter colorful fish, sea turtles, and even sharks.</p>
              <p>Whether you’re a seasoned diver or a beginner, this trip offers a unique opportunity to explore the underwater beauty of the world’s largest coral reef system. We’ll also learn about the efforts to protect this fragile ecosystem, ensuring that it remains vibrant for future generations.</p>`,
    image: "https://images.pexels.com/photos/19880213/pexels-photo-19880213/free-photo-of-sea-and-mountain-view-in-kotor-bay-in-montenegro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    routePositions: {
      currentPosition: [-18.2871, 147.6992],
      clickedPosition: [-18.288, 147.700]
    }
  }
];


// Handle the API route
export async function GET(request) {
  return new Response(JSON.stringify(dataStore), {
      status: 200,
      headers: {
          'Content-Type': 'application/json',
      },
  });
}

// Handle POST request to add new data
export async function POST(request) {
  const newData = await request.json();
  newData.id = Date.now(); // Use timestamp as ID
  const { routePositions } = newData;

  // Ensure routePositions is included or set default
  dataStore.push({
      ...newData,
      routePositions: routePositions || { currentPosition: [0, 0], clickedPosition: [0, 0] } // Default if not provided
  });

  return new Response(JSON.stringify(newData), {
      status: 201,
      headers: {
          'Content-Type': 'application/json',
      },
  });
}

// Handle PUT request to update existing data
export async function PUT(request) {
  const updateData = await request.json();
  const { id, routePositions } = updateData;

  const index = dataStore.findIndex(item => item.id === id);

  if (index !== -1) {
      // Update the existing entry while retaining the existing routePositions if not provided
      dataStore[index] = {
          ...dataStore[index],
          ...updateData,
          routePositions: routePositions || dataStore[index].routePositions
      };
      return new Response(JSON.stringify(dataStore[index]), {
          status: 200,
          headers: {
              'Content-Type': 'application/json',
          },
      });
  } else {
      return new Response(JSON.stringify({ message: 'Item not found' }), {
          status: 404,
          headers: {
              'Content-Type': 'application/json',
          },
      });
  }
}

// Handle DELETE request to remove data
export async function DELETE(request) {
  const { id } = await request.json();
  dataStore = dataStore.filter(item => item.id !== id);

  return new Response(null, { status: 204 }); // No content
}
