import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import podcastCover from "@/assets/podcast-cover.jpg";

const FeaturedPodcast = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <section className="py-14 lg:py-20 bg-surface-warm border-t border-gy-100">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="flex items-center gap-3.5 mb-8">
          <div className="w-8 h-0.5 bg-bx-700 flex-shrink-0" />
          <span className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-gy-900 font-semibold">
            Podcast em Destaque
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Cover */}
          <div className="w-full max-w-[280px] lg:max-w-[300px] flex-shrink-0 mx-auto lg:mx-0">
            <img
              src={podcastCover}
              alt="The Classical Way Podcast"
              className="w-full aspect-square object-cover shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              width={512}
              height={512}
              loading="lazy"
            />
          </div>

          {/* Info + Player */}
          <div className="flex-1 min-w-0">
            <span className="font-display text-[0.48rem] tracking-[0.18em] uppercase text-gy-400 block mb-2">
              Episódio mais recente
            </span>
            <h3 className="font-heading text-[clamp(1.3rem,3vw,1.8rem)] italic font-semibold text-gy-900 leading-[1.25] mb-3">
              Ep. 42 — Logos e Palavra: linguagem como dom divino na sala de aula clássica
            </h3>
            <p className="font-body text-[1rem] text-gy-500 leading-[1.7] mb-6 max-w-[540px]">
              Uma conversa sobre como a linguagem — dom de Deus ao homem — deve ser tratada no ensino clássico com reverência e rigor.
            </p>

            {/* Audio Player UI */}
            <div className="bg-background border border-gy-100 p-5 max-w-[560px]">
              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-[0.46rem] tracking-[0.08em] text-gy-400 w-10 text-right tabular-nums">
                  {Math.floor(progress * 45)}:{((progress * 45 * 60) % 60).toFixed(0).padStart(2, "0")}
                </span>
                <div className="flex-1 h-[3px] bg-gy-100 relative cursor-pointer group" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setProgress((e.clientX - rect.left) / rect.width);
                }}>
                  <div
                    className="absolute inset-y-0 left-0 bg-bx-700 transition-all"
                    style={{ width: `${progress * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-bx-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${progress * 100}%` }}
                  />
                </div>
                <span className="font-display text-[0.46rem] tracking-[0.08em] text-gy-400 w-10 tabular-nums">
                  45:00
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-5">
                <button className="text-gy-400 hover:text-gy-700 transition-colors" aria-label="Voltar 15s">
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-11 h-11 rounded-full bg-bx-700 text-white flex items-center justify-center hover:bg-bx-600 transition-colors"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-[2px]" />}
                </button>
                <button className="text-gy-400 hover:text-gy-700 transition-colors" aria-label="Avançar 30s">
                  <SkipForward size={18} />
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="mt-5 flex gap-5">
              <Link
                to="/podcasts"
                className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 hover:text-bx-600 transition-colors"
              >
                Ver todos os episódios →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPodcast;
