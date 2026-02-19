import { client } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { Cormorant_Garamond, Raleway } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const builder = createImageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

async function getEvent(slug: string) {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
      title,
      date,
      description,
      videoUrl,
      poster,
      ticketLink
    }`,
    { slug }
  );
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || slug === "null") {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className={`${raleway.className} text-sm tracking-[0.3em] uppercase`} style={{ color: '#6b3f00' }}>
          Event not found
        </p>
      </section>
    );
  }

  const event = await getEvent(slug);

  if (!event) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className={`${raleway.className} text-sm tracking-[0.3em] uppercase`} style={{ color: '#6b3f00' }}>
          Event not found
        </p>
      </section>
    );
  }

  const { title, date, description, videoUrl, poster, ticketLink } = event;
  const posterUrl = poster ? urlFor(poster) : null;

  return (
    <div className="w-full min-h-screen">

      {/* CINEMATIC HERO */}
      <section className="relative w-full h-[60vh] min-h-[480px] flex items-end overflow-hidden">

        {/* Banner */}
        <img
          src="/event-banner.jpg"
          alt="Event banner"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.55) saturate(0.85)' }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,4,0,0.92) 0%, rgba(10,4,0,0.4) 50%, transparent 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(139,101,8,0.15) 0%, transparent 60%)'
        }} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-8 pb-16 w-full">

          {/* Back link */}
          <a
            href="/#events"
            className={`${raleway.className} back-link text-xs font-semibold tracking-[0.3em] uppercase mb-8 inline-flex items-center gap-2`}
          >
            <span className="back-arrow">←</span>
            Back to Events
          </a>

          {/* Date */}
          <p className={`${raleway.className} text-sm font-semibold tracking-[0.35em] uppercase mb-4`}
            style={{ color: '#f5c842', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Title */}
          <h1 className={`${cormorant.className} text-5xl md:text-7xl font-semibold italic leading-tight`}
            style={{
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,1)',
            }}>
            {title}
          </h1>

          {/* Gold divider */}
          <div className="mt-6 w-24 h-px" style={{ background: 'linear-gradient(90deg, #f5c842, transparent)' }} />
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-8 py-20">

        {/* Two-column layout for poster + description */}
        {posterUrl ? (
          <div className="flex flex-col md:flex-row gap-12 mb-16">

            {/* Poster */}
            <div className="md:w-72 shrink-0">
              <img
                src={posterUrl}
                alt={`${title} poster`}
                className="w-full h-auto rounded-sm"
                style={{
                  boxShadow: '0 8px 40px rgba(100,70,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </div>

            {/* Description */}
            {description && (
              <div className="flex-1">
                <p className={`${raleway.className} text-xs font-semibold tracking-[0.35em] uppercase mb-4`}
                  style={{ color: '#6b3f00' }}>
                  About This Event
                </p>
                <div className="w-8 h-px mb-6" style={{ background: 'rgba(80,45,0,0.5)' }} />
                <p className={`${cormorant.className} text-2xl font-light leading-relaxed`}
                  style={{ color: '#1a0a00' }}>
                  {description}
                </p>

                {ticketLink && (
                  <a
                    href={ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${raleway.className} ticket-btn text-xs font-semibold tracking-[0.3em] uppercase inline-flex items-center gap-2 px-6 py-3 mt-8`}
                    style={{
                      border: '1px solid rgba(107,63,0,0.5)',
                      color: '#6b3f00',
                    }}
                  >
                    Get Tickets <span className="ticket-arrow">→</span>
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          description && (
            <div className="mb-16">
              <p className={`${raleway.className} text-xs font-semibold tracking-[0.35em] uppercase mb-4`}
                style={{ color: '#6b3f00' }}>
                About This Event
              </p>
              <div className="w-8 h-px mb-6" style={{ background: 'rgba(80,45,0,0.5)' }} />
              <p className={`${cormorant.className} text-2xl font-light leading-relaxed max-w-2xl`}
                style={{ color: '#1a0a00' }}>
                {description}
              </p>

              {ticketLink && (
                <a
                  href={ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${raleway.className} ticket-btn text-xs font-semibold tracking-[0.3em] uppercase inline-flex items-center gap-2 px-6 py-3 mt-8`}
                  style={{
                    border: '1px solid rgba(107,63,0,0.5)',
                    color: '#6b3f00',
                  }}
                >
                  Get Tickets <span className="ticket-arrow">→</span>
                </a>
              )}
            </div>
          )
        )}

        {/* Video Section */}
        {videoUrl && (
          <div className="mt-4">
            <p className={`${raleway.className} text-xs font-semibold tracking-[0.35em] uppercase mb-4`}
              style={{ color: '#6b3f00' }}>
              Preview
            </p>
            <div className="w-8 h-px mb-8" style={{ background: 'rgba(80,45,0,0.5)' }} />

            <div
              className="aspect-video w-full overflow-hidden rounded-sm"
              style={{ boxShadow: '0 8px 40px rgba(100,70,0,0.12), 0 2px 12px rgba(0,0,0,0.08)' }}
            >
              <iframe
                src={getYouTubeEmbedUrl(videoUrl)}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

      </section>
    </div>
  );
}