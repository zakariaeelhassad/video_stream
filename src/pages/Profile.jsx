import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-[600px] mx-auto pt-8">
            <div className="flex flex-col items-center mb-8 text-center">
                <div className="w-24 h-24 bg-bg-hover rounded-full flex items-center justify-center mb-4 text-brand">
                    <User size={48} />
                </div>
                <h1 className="text-3xl font-bold mb-1 text-text-primary">{user.username}</h1>
                <p className="text-text-secondary mb-2">{user.email}</p>
                <p className="text-sm text-text-muted">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="grid gap-4">
                <div className="bg-bg-secondary p-6 rounded-md border border-bg-hover">
                    <h3 className="text-lg font-semibold mb-2 text-text-primary">Plan</h3>
                    <p className="text-text-secondary">Free Tier</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
