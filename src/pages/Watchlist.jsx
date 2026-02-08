import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { useAuth } from '../hooks/useAuth';
import VideoCard from '../components/VideoCard';
import { Loader2 } from 'lucide-react';

const Watchlist = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            Promise.resolve().then(() => {
                const list = db.getWatchlist(user.id);
                const videoList = list.map(item => item.video);
                setVideos(videoList);
                setLoading(false);
            });
        }
    }, [user]);

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand" /></div>;

    return (
        <div className="pb-8">
            <h1 className="text-3xl font-bold mb-6 text-text-primary">My Learning List</h1>
            {videos.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
                    {videos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 text-text-secondary">
                    <p>Your list is empty. Start adding videos you want to watch!</p>
                </div>
            )}
        </div>
    );
};

export default Watchlist;
