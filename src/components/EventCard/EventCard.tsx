import "./EventCard.css";

const EventCard = () => {
  return (
    <section className="bg-white rounded-lg w-64 shadow-lg p-2">
      <div
        className="eventImage relative rounded-lg h-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(src/assets/img/Image.png)`,
        }}
      >
        {/* Date Overlay */}
        <div className="absolute bottom-2 right-2 bg-white text-primary rounded-lg px-3 py-1  flex flex-col">
          <span className="text-lg font-bold">18</span>
          <span className="ml-1">July</span>
        </div>
      </div>

      {/* Event Title */}
      <h2 className="mt-4 text-xl font-semibold text-gray-800 px-4">
        US Festival Night
      </h2>

      {/* User Avatars */}
      <div className="flex mt-2 px-4 pb-4 -space-x-1 overflow-hidden">
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User 1"
        />
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User 2"
        />
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt="User 3"
        />
      </div>
    </section>
  );
};

export default EventCard;
