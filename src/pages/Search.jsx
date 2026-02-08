import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import VideoCard from '../components/VideoCard';
import Input from '../components/Input';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [allVideos, setAllVideos] = useState([]);


    useEffect(() => {
        db.getVideos().then(setAllVideos);
    }, []);

    const results = React.useMemo(() => {
        if (!query.trim()) return [];
        const lowerQ = query.toLowerCase();
        return allVideos.filter(v =>
            v.title.toLowerCase().includes(lowerQ) ||
            v.description.toLowerCase().includes(lowerQ)
        );
    }, [query, allVideos]);

    return (
        <div className="max-w-[800px] mx-auto pb-8">
            <div className="mb-8">
                <Input
                    autoFocus
                    placeholder="Search movies, series, genres..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input-lg"
                />
            </div>

            <div>
                {query && (
                    <h2 className="mb-4 text-xl text-text-secondary">{results.length} Results for "{query}"</h2>
                )}

                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
                    {results.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>

                {query && results.length === 0 && (
                    <div className="text-center text-text-muted mt-8">No results found.</div>
                )}
            </div>
        </div>
    );
};

export default Search;
