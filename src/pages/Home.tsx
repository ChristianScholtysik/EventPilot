import { useEffect, useState } from "react";
import { EventComplete } from "../types/supabase-types-own";
import supabaseClient from "../lib/supabaseClient";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const [events, setEvents] = useState<EventComplete[] | null>(null);

  const userContext = useUserContext();
  const user = userContext?.user;

  useEffect(() => {
    const fetchEvents = async () => {
      const eventData = await supabaseClient.from("events").select(`
          *,
          categories (category_name, created_at, id),
          locations (locationName, venue_id, id, created_at),
          favorites (created_at, event_id, id, user_id)
        `);
      console.log(eventData);

      if (eventData.error) {
        console.error("Error fetching event data:", eventData.error);
      } else if (eventData) {
        setEvents(eventData);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);

  if (!user) {
    return <p>No user found.</p>;
  }

  return (
    <div>
      {events && Array.isArray(events) ? ( // Ensure events is an array
        events.map((event) => (
          <p key={event.id}>{event.title}</p> // Display all events
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Home;
