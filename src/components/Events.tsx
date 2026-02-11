import { EventCard } from "./EventCard";

export function Events() {
  const events = [
    { title: "Live Concert: Victorious Band", date: "Feb 20, 2026", image: "/file.svg" },
    { title: "Art & Culture Expo", date: "Mar 5, 2026", image: "/globe.svg" },
    { title: "Film Screening Night", date: "Apr 1, 2026", image: "/window.svg" },
    { title: "Workshop: Filmmaking", date: "Apr 15, 2026", image: "/next.svg" },
  ];

  return (
    <section className="events-section px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}