import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { useAuth } from '../hooks/useAuth';
import VideoCard from '../components/VideoCard';
import Button from '../components/Button';
import { Play, Plus, Check, Clock, ThumbsUp, Calendar, Loader2 } from 'lucide-react';

const VideoDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [video, setVideo] = useState(null);
    const [similarVideos, setSimilarVideos] = useState([]);
    const [inWatchlist, setInWatchlist] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const vid = await db.getVideoById(id);
                setVideo(vid);

                // Load similar videos (same category)
                const allVideos = await db.getVideos();
                setSimilarVideos(
                    allVideos.filter(v => v.category === vid.category && v.id !== vid.id).slice(0, 4)
                );

                // Check watchlist
                if (user) {
                    setInWatchlist(db.isInWatchlist(user.id, vid.id));

                    db.addToHistory(user.id, vid.id);
                }
            } catch (error) {
                console.error('Error loading video', error);
            } finally {
                setLoading(false);
            }
        };

        // Scroll to top when id changes
        window.scrollTo(0, 0);
        loadData();
    }, [id, user]);

    const toggleWatchlist = async () => {
        if (!user || !video) return;

        if (inWatchlist) {
            await db.removeFromWatchlist(user.id, video.id);
            setInWatchlist(false);
        } else {
            await db.addToWatchlist(user.id, video.id);
            setInWatchlist(true);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand" /></div>;
    if (!video) return <div className="p-8 text-center text-danger">Video not found</div>;

    return (
        <div className="max-w-[1200px] mx-auto pb-8">

            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg bg-black mb-6 shadow-2xl shadow-black/50">
                <iframe
                    src={`${video.trailerUrl}?autoplay=1&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
            </div>

            <div className="mb-8">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight text-text-primary">{video.title}</h1>
                        <div className="flex items-center gap-4 text-text-secondary text-sm md:text-base">
                            <span className="text-success font-semibold">{video.rating.toFixed(1)} Rating</span>
                            <span>{video.releaseYear}</span>
                            <span>{video.duration}</span>
                            <span className="bg-bg-hover px-2 py-0.5 rounded text-xs">{video.type}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant={inWatchlist ? "secondary" : "primary"}
                            onClick={toggleWatchlist}
                            className="flex items-center gap-2"
                        >
                            {inWatchlist ? <><Check size={18} /> In Watchlist</> : <><Plus size={18} /> Add to Watchlist</>}
                        </Button>
                    </div>
                </div>

                <p className="text-lg leading-relaxed text-text-secondary mb-6 max-w-[800px]">{video.description}</p>

                <div className="text-sm text-text-muted space-y-1">
                    <p><strong className="text-text-secondary">Director:</strong> {video.director}</p>
                    <p><strong className="text-text-secondary">Cast:</strong> {video.cast.join(', ')}</p>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-6 text-text-primary">You May Also Like</h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
                    {similarVideos.map(v => (
                        <VideoCard key={v.id} video={v} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;
