import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useUserContext } from "../context/UserContext";
import supabaseClient from "../lib/supabaseClient";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [events, setEvents] = useState<EventComplete[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    "2b94371d-9329-4182-9c83-1ac18ea36f20"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const userContext = useUserContext();
  const user = userContext?.user;

  if (!user) {
    return;
  }
  if (!categories) {
    return;
  }

  useEffect(() => {
    const fetchEvents = async () => {
      let selectQuery = supabaseClient
        .from("events")
        .select("*, categories(*), locations(*), venues(*), favorites(*)")
        .eq("favorites.user_id", user.id);

      if (searchTerm) {
        selectQuery = selectQuery.ilike("event_title", `%${searchTerm}%`);
      }
      if (selectedLocation) {
        selectQuery = selectQuery.eq("location_id", selectedLocation);
      }
      if (selectedCategory) {
        selectQuery = selectQuery.eq("category_id", selectedCategory);
      }

      const result = await selectQuery;
      if (result.error) {
        setEvents([]);
      } else {
        setEvents(result.data);
      }
    };
    fetchEvents();
  }, [searchTerm, selectedLocation, selectedCategory]);

  useEffect(() => {
    const fetchLocations = async () => {
      let locationsQuery = supabaseClient.from("locations").select("*");

      const result = await locationsQuery;

      if (result.error) {
        setLocations([]);
      } else {
        setLocations(result.data);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      let categoriesQuery = supabaseClient.from("categories").select("*");

      const result = await categoriesQuery;

      if (result.error) {
        setCategories([]);
      } else {
        setCategories(result.data);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
  };
  const addFavorite = async (eventId: string) => {
    const favoritesInsertResponse = await supabaseClient
      .from("favorites")
      .insert({ user_id: user.id, event_id: eventId });

    if (favoritesInsertResponse.error) {
      console.error(
        "Error setting favorite",
        favoritesInsertResponse.error.message
      );
      return;
    } else {
      setEvents(
        events.map((event) => {
          if (event.id === eventId) {
            const updatedFavorites = [
              ...(event.favorites ?? []),
              { event_id: eventId, user_id: user.id, id: "", created_at: "" },
            ];
            return { ...event, favorites: updatedFavorites };
          }
          return event;
        })
      );
    }
  };
  const deleteFavorite = async (eventId: string) => {
    const favoritesDeleteResponse = await supabaseClient
      .from("favorites")
      .delete()
      .eq("event_id", eventId)
      .eq("user_id", user.id);

    if (favoritesDeleteResponse.error) {
      console.error("Error deleting favorite", favoritesDeleteResponse.error);
    } else {
      setEvents(
        events.map((event) => {
          const newFavoritesWithoutEvent = (event.favorites ?? []).filter(
            (fav) => fav.event_id !== eventId
          );
          return event.id === eventId
            ? { ...event, favorites: newFavoritesWithoutEvent }
            : event;
        })
      );
    }
  };

  console.log(selectedCategory);
  return (
    <>
      <header className="bg-primary flex flex-col justify-center items-center">
        <h2 className="text-stone-100 font-InterThin">Current Location</h2>
        <select
          className="text-white bg-primary"
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
        <div className="flex bg-primary gap-2 mt-2 mb-2 items-center text-stone-100">
          <FaSearch className="h-4 w-4 " />
          <input
            className="bg-primary font-InterThin text-lg"
            id="title-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="| Search..."
          />
        </div>
        <section>
          <button className="bg-secondary">Music</button>
          <button className="bg-lila-500">Art</button>
          <button className="">Sport</button>
        </section>
      </header>
      <Navbar />
    </>
  );
};

export default Search;
