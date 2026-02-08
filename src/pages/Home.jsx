import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import VideoCard from '../components/VideoCard';
import { Loader2 } from 'lucide-react';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...db.getCategories().map(c => c.name)];

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await db.getVideos();
                setVideos(data);
            } catch (error) {
                console.error('Failed to fetch videos', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const filteredVideos = selectedCategory === 'All'
        ? videos
        : videos.filter(v => {
            const catId = db.getCategories().find(c => c.name === selectedCategory)?.id;
            return v.category === catId;
        });

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="animate-spin text-brand" size={40} />
            </div>
        );
    }

    return (
        <div className="pb-8">
            <div className="mb-8 py-8 pl-6 bg-gradient-to-r from-bg-hover to-transparent rounded-lg">
                <h1 className="text-4xl md:text-[2.5rem] mb-2 font-bold bg-gradient-to-r from-white to-[#aaa] bg-clip-text text-transparent">
                    Discover Endless Entertainment
                </h1>
                <p className="text-text-secondary">Thousands of movies and series at your fingertips.</p>
            </div>

            <div className="flex gap-3 overflow-x-auto mb-8 pb-2 scrollbar-thin">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${selectedCategory === cat
                                ? 'bg-text-primary text-bg-primary'
                                : 'bg-bg-hover text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                            }`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold text-text-primary">{selectedCategory === 'All' ? 'Trending Now' : selectedCategory}</h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] max-sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6">
                {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
                {filteredVideos.length === 0 && (
                    <p className="col-span-full text-center p-8 text-text-muted">No videos found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
