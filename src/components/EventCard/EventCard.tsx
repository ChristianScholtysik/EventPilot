// import "./EventCard.css";

// const EventCard = () => {
//   return (
//     <section className="bg-white rounded-lg w-64 shadow-lg p-2">
//       <div
//         className="eventImage relative rounded-lg h-36 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('src/assets/img/Image.png')`,
//         }}
//       >
//         {/* Date Overlay */}
//         <div className="absolute bottom-2 right-2 bg-white bg-opacity-70 text-primary rounded-lg h-12 w-12  flex flex-col items-center justify-center">
//           <span className="text-lg font-bold h-6 w-12 text-center">18</span>
//           <span className=" h-6 w-12 text-center ">July</span>
//         </div>
//       </div>
//       {/* Event Title */}
//       <h2 className="mt-4 text-xl font-semibold text-gray-800 px-4">
//         US Festival Night
//       </h2>
//       {/* Avatars */}
//       <section className="flex items-center ">
//         <div className="flex mt-2 px-4 pb-4 -space-x-1 overflow-hidden mr-0 ">
//           <img
//             className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
//             src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt="User 1"
//           />
//           <img
//             className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
//             src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt="User 2"
//           />
//           <img
//             className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
//             src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
//             alt="User 3"
//           />
//         </div>
//         <span className="text-primary text-sm mr-4">+ 99</span>
//         <span className="mr-2">
//           <img src="/src/assets/img/Map Pin.svg" alt="" />
//         </span>
//         <span className="text-sm text-location font-normal">
//           Miami
//           {/* {event.locations?.location_name} */}
//         </span>
//       </section>
//     </section>
//   );
// };

// export default EventCard;

import "./EventCard.css";

interface EventProps {
  event: {
    date: string;
    title: string;
    avatars: string[];
    location: string;
    image_url: string;
  };
}

const EventCard: React.FC<EventProps> = ({ event }) => {
  const { date, title, avatars, location, image_url } = event;

  const eventDay = new Date(date).getDate();
  const eventMonth = new Date(date).toLocaleString("default", {
    month: "short",
  });

  return (
    <section className="bg-white rounded-lg w-64 shadow-lg p-2">
      {/* Event Image */}
      <div
        className="eventImage relative rounded-lg h-36 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image_url})`,
        }}
      >
        {/* Date Overlay */}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-70 text-primary rounded-lg h-12 w-12 flex flex-col items-center justify-center">
          <span className="text-lg font-bold h-6 w-12 text-center">
            {eventDay}
          </span>
          <span className="h-6 w-12 text-center">{eventMonth}</span>
        </div>
      </div>

      {/* Event Title */}
      <h2 className="mt-4 text-xl font-semibold text-gray-800 px-4">{title}</h2>

      {/* Avatars and Location */}
      <section className="flex items-center">
        <div className="flex mt-2 px-4 pb-4 -space-x-1 overflow-hidden">
          {avatars.map((avatarUrl, index) => (
            <img
              key={index}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src={avatarUrl}
              alt={`User ${index + 1}`}
            />
          ))}
        </div>
        <span className="text-primary text-sm">+ {avatars.length}</span>

        {/* Location Info */}
        <span className="ml-auto flex items-center">
          <img
            className="h-4 w-4 mr-1"
            src={"src/assets/img/Map Pin.svg"}
            alt="Map Pin"
          />
          <span className="text-sm text-location font-normal">{location}</span>
        </span>
      </section>
    </section>
  );
};

export default EventCard;
