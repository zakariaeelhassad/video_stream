import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';

const VideoCard = ({ video }) => {

  const rating = video.rating ? video.rating.toFixed(1) : 'N/A';

  return (
    <Link to={`/video/${video.id}`} className="block group transition-all rounded-md overflow-hidden bg-transparent hover:-translate-y-1">
      <div className="relative aspect-video rounded-md overflow-hidden bg-bg-hover">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
            <Play fill="white" size={24} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="py-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="text-base font-semibold text-text-primary leading-tight line-clamp-2">{video.title}</h3>
          <span className="text-xs text-text-secondary flex items-center gap-0.5 shrink-0">
            <Star size={12} fill="#6366f1" color="#6366f1" /> {rating}
          </span>
        </div>
        <div className="text-xs text-text-muted flex gap-3">
          <span>{video.releaseYear}</span>
          <span className="bg-bg-hover px-1 rounded-[2px] text-[11px]">
            {video.type === 'SERIE' ? 'Series' : video.type === 'DOCUMENTAIRE' ? 'Doc' : 'Movie'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
