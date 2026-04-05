import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, ChevronDown, ExternalLink } from "lucide-react";
import podcastCover from "@/assets/podcast-cover.jpg";

const FeaturedPodcast = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subOpen, setSubOpen] = useState(false);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (subRef.current && !subRef.current.contains(e.target as Node)) setSubOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section className="py-14 lg:py-20 bg-surface-warm relative">
      <div className="triple-rule absolute top-0 left-0 right-0"><span className="r1" /><span className="r2" /><span className="r3" /></div>
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
            <div className="p-5 max-w-[560px]">
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
            <div className="mt-5 flex items-center gap-5">
              <div className="relative" ref={subRef}>
                <button
                  onClick={() => setSubOpen(!subOpen)}
                  className="bg-gy-900 text-white font-display text-[0.5rem] tracking-[0.16em] uppercase px-4 py-2 flex items-center gap-2 transition-colors hover:bg-gy-700"
                >
                  Inscrever-se <ChevronDown size={12} />
                </button>
                {subOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-gy-900 text-white z-20 min-w-[180px]">
                    {["Apple Podcasts", "Spotify", "RSS"].map((p) => (
                      <a key={p} href="#" className="flex items-center gap-2 py-2 px-4 font-display text-[0.5rem] tracking-[0.14em] uppercase hover:bg-gy-700 cursor-pointer transition-colors">
                        <ExternalLink size={12} /> {p}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-gy-600 hover:text-gy-900 transition-colors flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
                Assistir no YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="triple-rule absolute bottom-0 left-0 right-0"><span className="r1" /><span className="r2" /><span className="r3" /></div>
    </section>
  );
};

export default FeaturedPodcast;
