import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-bg-secondary p-8 rounded-lg w-full max-w-[400px] border border-bg-hover">
                <h1 className="text-3xl font-bold mb-2 text-center text-text-primary">Create Account</h1>
                <p className="text-text-secondary text-center mb-8">Start your streaming journey</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />

                    {error && (
                        <div className="bg-danger/10 text-danger p-4 rounded-md mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" loading={loading} className="w-full mt-4">
                        Sign Up
                    </Button>
                </form>

                <p className="mt-6 text-center text-text-secondary">
                    Already have an account? <Link to="/login" className="text-brand font-medium hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
