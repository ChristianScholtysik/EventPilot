import { useEffect, useState } from "react";
import EventCard from "../components/EventCard/EventCard";
import supabaseClient from "../lib/supabaseClient";
import { EventComplete, Location } from "../types/supabase-types-own";

const Home = () => {
  const [eventData, setEventData] = useState<EventComplete[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventComplete[]>([]);
  // const [nearbyEvents, setNearbyEvents] = useState<EventComplete[]>([]);
  // const [locations, setLocations] = useState<Location[]>([]);
  // const [selectedLocation, setSelectedLocation] = useState<number | null>(null); // Assuming you're selecting a location by ID

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Fetching all events
        const eventResponse = await supabaseClient
          .from("events")
          .select("*, categories(*), locations(*), venues(*), favorites(*)")
          .order("event_date", { ascending: true });

        if (eventResponse.error) {
          console.error("Error fetching event data:", eventResponse.error);
          setEventData([]); // Set to empty if there’s an error
        } else {
          const eventData = eventResponse.data;
          setEventData(eventData); // Store event data in state
        }
      } catch (error) {
        console.error("Unexpected error fetching event data:", error);
        setEventData([]); // Handle unexpected errors
      }
    };

    fetchEventData();
  }, []); // Empty dependency array means this runs once when the component mounts

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        // Fetching upcoming events
        const result = await supabaseClient
          .from("events")
          .select("*, categories(*), locations(*), venues(*), favorites(*)")
          .gte("event_date", new Date().toISOString()) // Only future events
          .order("event_date", { ascending: true });

        if (result.error) {
          console.error("Error fetching upcoming events:", result.error);
          setUpcomingEvents([]); // Set to empty on error
        } else {
          setUpcomingEvents(result.data); // Set upcoming events data
        }
      } catch (error) {
        console.error("Unexpected error fetching upcoming events:", error);
        setUpcomingEvents([]); // Handle unexpected errors
      }
    };

  //   const fetchNearbyEvents = async () => {
  //     try {
  //       // Fetching nearby events (filtered by selected location if available)
  //       let nearbyQuery = supabaseClient
  //         .from("events")
  //         .select("*, categories(*), locations(*), venues(*), favorites(*)");

  //       if (selectedLocation) {
  //         nearbyQuery = nearbyQuery.eq("location_id", selectedLocation); // Filter by selected location
  //       }

  //       const resultNearby = await nearbyQuery;
  //       if (resultNearby.error) {
  //         console.error("Error fetching nearby events:", resultNearby.error);
  //         setNearbyEvents([]); // Set to empty on error
  //       } else {
  //         setNearbyEvents(resultNearby.data); // Set nearby events data
  //       }
  //     } catch (error) {
  //       console.error("Unexpected error fetching nearby events:", error);
  //       setNearbyEvents([]); // Handle unexpected errors
  //     }
  //   };

  //   fetchUpcomingEvents();
  //   fetchNearbyEvents();
  // }, [selectedLocation]); // Re-fetch when selectedLocation changes

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const result = await supabaseClient.from("locations").select("*");

        if (result.error) {
          console.error("Error fetching locations:", result.error);
          setLocations([]); // Set to empty on error
        } else {
          setLocations(result.data); // Set locations data
        }
      } catch (error) {
        console.error("Unexpected error fetching locations:", error);
        setLocations([]); // Handle unexpected errors
      }
    };

    fetchLocations();
  }, []); // Fetch locations once on mount

  return (
    <div className="event-grid">
      {upcomingEvents.map((event) => (
        <EventCard
          key={event.id}
          event={{
            image_url: event.image_url,
            date: event.date,
            title: event.title,
            avatars: [
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
            ], // Example avatars; replace with actual data from Supabase if available
            location: event.locations?.locationName || "Unknown", // Replace with actual location data
          }}
        />
      ))}
    </div>
  );
};

export default Home;
