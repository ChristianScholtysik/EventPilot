// import { useEffect, useState } from "react";
// import { EventComplete } from "../types/supabase-types-own";
// import supabaseClient from "../lib/supabaseClient";
// import { useUserContext } from "../context/UserContext";
// import EventCard from "../components/EventCard/EventCard";

// const Home = () => {
//   const [events, setEvents] = useState<EventComplete[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const userContext = useUserContext();
//   const user = userContext?.user;

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setLoading(true); // Set loading to true before fetching
//       const { data: eventData, error } = await supabaseClient.from("events")
//         .select(`
//           *,
//           categories (category_name, created_at, id),
//           locations (locationName, venue_id, id, created_at),
//           favorites (created_at, event_id, id, user_id)
//         `);

//       console.log(eventData);

//       if (error) {
//         console.error("Error fetching event data:", error);
//       } else if (eventData) {
//         setEvents(eventData); // Set events to the fetched data
//       }
//       setLoading(false); // Set loading to false after fetching
//     };

//     if (user) {
//       fetchEvents();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   if (!user) {
//     return <p>No user found.</p>;
//   }

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       {/* {events.length > 0 ? (
//         events.map((event) => (
//           <p key={event.id}>
//             {event.title} {event.info}
//           </p>
//         )) */}
//       {events.length > 0 ? (
//         events.map((event) => (
//           <EventCard
//             key={event.id}
//             event={{
//               date: event.date,
//               title: event.title,
//               avatars: event.favorites?.map((fav) => fav.user_id) || [],
//               location: event.locations?.locationName || "Unknown Location",
//               image_url: event.image_url || "src/assets/img/Image.png",
//             }}
//           />
//         ))
//       ) : (
//         <p>No events available.</p>
//       )}
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { EventComplete } from "../types/supabase-types-own";
import supabaseClient from "../lib/supabaseClient";
import { useUserContext } from "../context/UserContext";
import EventCard from "../components/EventCard/EventCard";

import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  const [events, setEvents] = useState<EventComplete[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userContext = useUserContext();
  const user = userContext?.user;
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    "2b94371d-9329-4182-9c83-1ac18ea36f20"
  );

  // Array of avatar URLs
  const avatarUrls: string[] = [
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1683121771856-3c3964975777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data: eventData, error } = await supabaseClient.from("events")
        .select(`
          *,
          categories (category_name, created_at, id),
          locations (locationName, venue_id, id, created_at),
          favorites (created_at, event_id, id, user_id)
        `);

      console.log(eventData);

      if (error) {
        console.error("Error fetching event data:", error);
      } else if (eventData) {
        setEvents(eventData);
      }
      setLoading(false);
    };

    if (user) {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationsQuery = supabaseClient.from("locations").select("*");

      const result = await locationsQuery;

      if (result.error) {
        setLocations([]);
      } else {
        setLocations(result.data);
      }
    };

    fetchLocations();
  }, [selectedLocation]);

  useEffect(() => {
    const fetchEvents = async () => {
      const selectQuery = supabaseClient
        .from("events")
        .select("*, categories(*), locations(*), venues(*), favorites(*)")
        .eq("favorites.user_id", user.id);

      const result = await selectQuery;
      if (result.error) {
        setEvents([]);
      } else {
        setEvents(result.data);
      }
    };
    fetchEvents();
  }, []);

  if (!user) {
    return <p>No user found.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="h-full flex items-center justify-center flex flex-col shadow-2xl bg-gray-50">
      <header className="flex gap-12 justify-start w-full max-w-sm px-4">
        <img src="/src/assets/img/Logo.png" alt="" className="" />
        <div className="flex flex-col">
          <h2 className="text-stone-500">Current Location</h2>
          <select
            className="text-primary"
            name="location"
            id="location-select"
            value={selectedLocation || "current Location"}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.locationName}
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="flex justify-start">
        <h2 className="text-xl text-gray font-bold ">Upcoming Events</h2>
      </div>
      <div className="p-4 w-full max-w-sm">
        {events && events.length > 0 ? (
          <div className="overflow-hidden overflow-auto md:overflow-scroll  relative">
            <div className="flex space-x-4">
              {events.map((event) => {
                // Randomly select 3 avatars from the avatarUrls array
                const selectedAvatars: string[] = [];
                const numberOfAvatars = 3; // Number of avatars to select

                while (selectedAvatars.length < numberOfAvatars) {
                  const randomIndex = Math.floor(
                    Math.random() * avatarUrls.length
                  );
                  const selectedAvatar = avatarUrls[randomIndex];

                  // Avoid duplicates
                  if (!selectedAvatars.includes(selectedAvatar)) {
                    selectedAvatars.push(selectedAvatar);
                  }
                }

                return (
                  <div className="inline-block w-64 snap-start" key={event.id}>
                    <EventCard
                      event={{
                        date: event.date,
                        title: event.title,
                        avatars: selectedAvatars,
                        location:
                          event.locations?.locationName || "Unknown Location",
                        image_url:
                          event.image_url || "src/assets/img/Image.png",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>No events available.</p>
        )}
      </div>
      <h2 className="text-xl text-gray font-bold text-left justify-start">
        Nearby you
      </h2>
      <div className="p-4 w-full max-w-sm">
        {events && events.length > 0 ? (
          <div className="overflow-hidden overflow-auto md:overflow-scroll  relative">
            <div className="flex space-x-4">
              {events.map((event) => {
                // Randomly select 3 avatars from the avatarUrls array
                const selectedAvatars: string[] = [];
                const numberOfAvatars = 3; // Number of avatars to select

                while (selectedAvatars.length < numberOfAvatars) {
                  const randomIndex = Math.floor(
                    Math.random() * avatarUrls.length
                  );
                  const selectedAvatar = avatarUrls[randomIndex];

                  // Avoid duplicates
                  if (!selectedAvatars.includes(selectedAvatar)) {
                    selectedAvatars.push(selectedAvatar);
                  }
                }

                return (
                  <div className="inline-block w-64 snap-start" key={event.id}>
                    <EventCard
                      event={{
                        date: event.date,
                        title: event.title,
                        avatars: selectedAvatars,
                        location:
                          event.locations?.locationName || "Unknown Location",
                        image_url:
                          event.image_url || "src/assets/img/Image.png",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>No events available.</p>
        )}
      </div>
      <Navbar />
    </section>
  );
};

export default Home;
