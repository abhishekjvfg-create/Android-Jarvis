import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ExternalLink, X, Music, Radio, Loader2 } from 'lucide-react';

interface MusicPlayerCardProps {
  songName: string;
  artist?: string;
  onClose?: () => void;
}

export const MusicPlayerCard: React.FC<MusicPlayerCardProps> = ({
  songName,
  artist = '',
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Clean song and artist parameters so extra JARVIS tags never contaminate search
  const cleanSong = (songName || '')
    .replace(/JARVIS\s*Audio\s*Stream/gi, '')
    .replace(/JARVIS\s*stream/gi, '')
    .replace(/JARVIS/gi, '')
    .replace(/stream/gi, '')
    .trim() || 'Song';

  const cleanArtist = (artist || '')
    .replace(/JARVIS\s*Audio\s*Stream/gi, '')
    .replace(/JARVIS\s*stream/gi, '')
    .replace(/JARVIS/gi, '')
    .replace(/stream/gi, '')
    .trim();

  const searchQuery = cleanArtist ? `${cleanSong} ${cleanArtist}` : cleanSong;
  const encodedQuery = encodeURIComponent(searchQuery);

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;
  const spotifySearchUrl = `https://open.spotify.com/search/${encodedQuery}`;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch(`/api/music/search?q=${encodedQuery}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          if (data?.videoId) {
            setVideoId(data.videoId);
            if (data.title) setVideoTitle(data.title);
          }
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.warn('Music search error:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [encodedQuery]);

  const togglePlayPause = () => {
    setIsPlaying(prev => {
      const nextState = !prev;
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const func = nextState ? 'playVideo' : 'pauseVideo';
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args: [] }),
          '*'
        );
      }
      return nextState;
    });
  };

  const directWatchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : youtubeSearchUrl;
  const youtubeEmbedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`
    : `https://www.youtube.com/embed?listType=search&list=${encodedQuery}&enablejsapi=1&autoplay=1`;

  return (
    <div className="w-full max-w-md my-3 border border-cyan-500/40 bg-[#080d14]/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_0_25px_rgba(0,242,255,0.2)] font-mono relative overflow-hidden select-none">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f2ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
            JARVIS SOUND SYSTEM
          </span>
          <span className={`px-2 py-0.5 text-[9px] rounded-full border ${isPlaying ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-300 animate-pulse' : 'border-zinc-600 bg-zinc-800 text-zinc-400'}`}>
            {isPlaying ? 'PLAYING' : 'PAUSED'}
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-300 rounded transition-colors"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Section: Vinyl CD & Song Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 mb-3">
        {/* Vinyl CD Disk 💿 Container */}
        <div className="relative group shrink-0">
          {/* Cyan Glow Halo when spinning */}
          <div className={`absolute -inset-1 rounded-full blur-md transition-opacity duration-300 ${isPlaying ? 'bg-cyan-500/40 opacity-100' : 'opacity-0'}`} />

          {/* Realistic Vinyl CD */}
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full relative flex items-center justify-center border-2 border-cyan-500/40 bg-[#0d0d0d] shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-transform duration-500 ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, 
                  #1a1a1a 0%, 
                  #0a0a0a 20%, 
                  #222 25%, 
                  #0f0f0f 30%, 
                  #1f1f1f 45%, 
                  #000 55%, 
                  #2a2a2a 70%, 
                  #000 100%
                )
              `,
            }}
          >
            {/* Vinyl Circular Grooves Sheen */}
            <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-cyan-400/10 pointer-events-none" />
            <div className="absolute inset-7 rounded-full border border-white/5 pointer-events-none" />

            {/* Inner Center Label Ring */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center relative shadow-inner">
              {/* Central Hole with Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlayPause}
                title={isPlaying ? "Pause Music" : "Play Music"}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-400 text-black hover:bg-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_10px_#00f2ff] cursor-pointer z-20"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-black text-black" />
                ) : (
                  <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Song Info & Quick Controls */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <h4 className="text-sm font-bold text-white truncate drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]">
            {videoTitle || cleanSong}
          </h4>
          <p className="text-xs text-cyan-300/80 truncate mt-0.5">
            {cleanArtist || 'YouTube Music Track'}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Play
                </>
              )}
            </button>

            {/* Toggle Embedded Video */}
            <button
              onClick={() => setShowVideo(prev => !prev)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center gap-1"
            >
              <Radio className="w-3.5 h-3.5" />
              {showVideo ? 'Hide Video' : 'Show Video'}
            </button>
          </div>

          {/* External Links */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5 text-xs font-bold">
            <a
              href={directWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition-colors flex items-center gap-1"
            >
              YouTube <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={spotifySearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
            >
              Spotify <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Embedded YouTube Player Container */}
      {isLoading ? (
        <div className="mt-3 h-48 rounded-xl border border-cyan-500/30 bg-black/80 flex flex-col items-center justify-center gap-2 text-cyan-300 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          <span>Searching YouTube core for "{cleanSong}"...</span>
        </div>
      ) : (
        <div
          className={
            showVideo
              ? 'mt-3 rounded-xl overflow-hidden border border-cyan-500/30 bg-black transition-all h-56 shadow-[0_0_15px_rgba(0,0,0,0.8)]'
              : 'w-0 h-0 opacity-0 pointer-events-none absolute overflow-hidden'
          }
        >
          <iframe
            ref={iframeRef}
            src={youtubeEmbedUrl}
            title={`Playing ${cleanSong}`}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayerCard;
