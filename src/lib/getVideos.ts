import { client } from "./sanity";

export interface Video {
  title: string;
  url: string;
  thumbnail?: string;
}

export async function getVideos(): Promise<Video[]> {
  const query = `*[_type == "video"]{
    title,
    videoUrl,
    orderNumber,
    "thumbnail": thumbnail.asset->url
  }`;

  const items: any[] = await client.fetch(query);

  // Sort: videos with orderNumber first (asc), then videos without (appended at end)
  const sorted = [...items].sort((a, b) => {
    const aHas = a.orderNumber != null;
    const bHas = b.orderNumber != null;
    if (aHas && bHas) return a.orderNumber - b.orderNumber;
    if (aHas) return -1;
    if (bHas) return 1;
    return 0;
  });

  return sorted
    .map((item) => {
      const videoIdOrUrl = (item.videoUrl || "").trim();
      if (!videoIdOrUrl) return null;

      const videoUrl = videoIdOrUrl.startsWith("http")
        ? videoIdOrUrl
        : `https://www.youtube.com/watch?v=${videoIdOrUrl}`;

      return {
        title: item.title,
        url: videoUrl,
        thumbnail: item.thumbnail
          ? item.thumbnail
          : `https://img.youtube.com/vi/${videoIdOrUrl}/hqdefault.jpg`,
      };
    })
    .filter(Boolean) as Video[];
}