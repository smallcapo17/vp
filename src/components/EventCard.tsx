interface EventCardProps {
    title: string;
    date: string;
    image?: string; // optional thumbnail
  }
  
  export function EventCard({ title, date, image }: EventCardProps) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {image && <img src={image} alt={title} className="w-full h-40 object-cover" />}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500 dark:text-gray-300 mt-1">{date}</p>
        </div>
      </div>
    );
  }  