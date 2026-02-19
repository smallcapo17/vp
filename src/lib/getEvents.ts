import { client } from "./sanity";

export interface Event {
  title: string;
  date: string;
  description: string;
  slug: string;
  poster?: string;
  videoUrl?: string;
}

export async function getEvents(): Promise<Event[]> {
  const query = `*[_type == "event"] | order(date asc){
    title,
    date,
    description,
    "slug": slug.current,
    "poster": poster.asset->url,
    videoUrl
  }`;

  const items: any[] = await client.fetch(query);

  return items.map((item) => ({
    title: item.title,
    date: item.date,
    description: item.description,
    slug: item.slug,
    poster: item.poster ?? undefined,
    videoUrl: item.videoUrl ?? undefined,
  }));
}