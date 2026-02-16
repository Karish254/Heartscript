import React, { useState } from 'react';
import axios from 'axios';
import { Heart, Sparkles, Image as ImageIcon, Plus, X, ArrowRight, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreatorForm = ({ onPageCreated }) => {
    const [formData, setFormData] = useState({
        creatorName: '',
        recipientName: '',
        occasion: '',
        relationship: '',
        theme: 'eternal-rose',
        photoUrls: [],
        musicChoice: 'romantic-piano'
    });
    const [photoInput, setPhotoInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddPhoto = () => {
        if (photoInput && photoInput.startsWith('http')) {
            setFormData(prev => ({ ...prev, photoUrls: [...prev.photoUrls, photoInput] }));
            setPhotoInput('');
        }
    };

    const removePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            photoUrls: prev.photoUrls.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.creatorName || !formData.recipientName) {
            setError("Names are required to create the magic!");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/pages', formData);
            onPageCreated(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create the surprise. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-morphism"
            style={{ padding: '40px', maxWidth: '700px', margin: '40px auto' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ display: 'inline-block' }}
                >
                    <Heart size={48} color="var(--accent-color)" fill="var(--accent-color)" />
                </motion.div>
                <h1 style={{ marginTop: '16px', fontSize: '2.5rem', fontWeight: 700 }}>Craft Your Surprise</h1>
                <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>Create a personalized romantic experience for your special someone.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, opacity: 0.9 }}>Your Name</label>
                        <input
                            type="text"
                            name="creatorName"
                            required
                            placeholder="e.g. Karish"
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, opacity: 0.9 }}>Their Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            required
                            placeholder="e.g. My Love"
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, opacity: 0.9 }}>Occasions</label>
                        <input
                            type="text"
                            name="occasion"
                            placeholder="e.g. Anniversary"
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, opacity: 0.9 }}>Relationship</label>
                        <input
                            type="text"
                            name="relationship"
                            placeholder="e.g. Girlfriend"
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, opacity: 0.9 }}>Choose Theme</label>
                        <select
                            name="theme"
                            onChange={handleChange}
                            className="input-field"
                            style={{ appearance: 'none' }}
                        >
                            <option value="eternal-rose">Eternal Rose (Red & Gold)</option>
                            <option value="midnight-moonlight">Midnight Moonlight (Blue & Silver)</option>
                            <option value="sunset-serenade">Sunset Serenade (Warm Sunset)</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, opacity: 0.9 }}>Background Music</label>
                        <select
                            name="musicChoice"
                            onChange={handleChange}
                            className="input-field"
                            style={{ appearance: 'none' }}
                        >
                            <option value="romantic-piano">Romantic Piano</option>
                            <option value="acoustic-guitar">Acoustic Guitar Soft</option>
                            <option value="violin-serenade">Violin Serenade</option>
                        </select>
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, opacity: 0.9 }}>Add Photos (URLs)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={photoInput}
                            onChange={(e) => setPhotoInput(e.target.value)}
                            placeholder="Paste image URL here..."
                            className="input-field"
                        />
                        <button
                            type="button"
                            onClick={handleAddPhoto}
                            className="btn-secondary"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '50px' }}
                        >
                            <Plus size={24} />
                        </button>
                    </div>
                    <AnimatePresence>
                        {formData.photoUrls.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px', marginTop: '16px', overflow: 'hidden' }}
                            >
                                {formData.photoUrls.map((url, index) => (
                                    <motion.div
                                        key={index}
                                        layout
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        style={{ position: 'relative', height: '80px', borderRadius: '8px', overflow: 'hidden' }}
                                    >
                                        <img src={url} alt="Added" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => removePhoto(index)}
                                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', padding: '2px' }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ff4d4d', textAlign: 'center', fontSize: '0.9rem' }}>{error}</motion.p>}

                <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    {loading ? (
                        <>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Sparkles size={20} /></motion.div>
                            Generating Magic...
                        </>
                    ) : (
                        <>
                            Create Miracle Link <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div style={{ marginTop: '30px', padding: '20px', borderRadius: '16px', border: '1px dashed var(--glass-border)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Sparkles size={14} /> Previewing: {formData.theme.split('-').join(' ')} theme <Sparkles size={14} />
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-color)', border: '1px solid var(--glass-border)' }}></div>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--secondary-color)' }}></div>
                </div>
            </div>
        </motion.div>
    );
};

export default CreatorForm;
