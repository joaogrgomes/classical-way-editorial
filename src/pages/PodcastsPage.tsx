import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import podcastCover from "@/assets/podcast-cover.jpg";

const podcasts = [
  {
    slug: "classical-founders",
    title: "Classical Founders",
    desc: "Conversas semanais sobre educação clássica, artes liberais e formação cristã. Porque ensinar é uma vocação que exige sabedoria.",
    image: podcastCover,
  },
];

const PodcastsPage = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(2.16rem,4.8vw,3.36rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Podcasts
          </h1>
          <p className="font-body text-[1.26rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Conversas, aulas e entrevistas sobre educação clássica e formação cristã.
          </p>
        </div>
      </div>

      {/* Podcasts grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((pod) => (
              <article key={pod.slug} className="group reveal">
                <Link to={`/podcasts/${pod.slug}`} className="block">
                  <div className="aspect-square overflow-hidden mb-4">
                    <img
                      src={pod.image}
                      alt={pod.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="font-heading text-[1.2rem] font-semibold italic text-gy-900 leading-[1.3] mb-2 group-hover:text-bx-700 transition-colors">
                    {pod.title}
                  </h2>
                  <p className="font-body text-[0.9rem] text-gy-500 leading-[1.6] mb-4 line-clamp-3">
                    {pod.desc}
                  </p>
                  <span className="font-display text-[0.6rem] tracking-[0.16em] uppercase text-bx-700 hover:text-bx-600 transition-colors">
                    Ver episódios →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default PodcastsPage;
