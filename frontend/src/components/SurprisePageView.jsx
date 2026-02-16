import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Volume2, VolumeX, Gift, Music } from 'lucide-react';

const SurprisePageView = () => {
    const { slug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const audioRef = useRef(null);

    const handleReveal = () => {
        setIsRevealed(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
    };

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await axios.get(`/api/pages/${slug}`);
                setPageData(response.data);
            } catch (err) {
                console.error("Failed to fetch page", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f0c29' }}>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <Heart size={80} color="#e94057" fill="#e94057" />
            </motion.div>
        </div>
    );

    if (!pageData) return (
        <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>
            <h1 style={{ fontSize: '3rem' }}>Oops! Surprise not found.</h1>
            <p style={{ opacity: 0.7 }}>Maybe the link is expired or incorrect?</p>
        </div>
    );

    const getMusicUrl = (choice) => {
        const musicMap = {
            'romantic-piano': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            'acoustic-guitar': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            'violin-serenade': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        };
        return musicMap[choice] || musicMap['romantic-piano'];
    };

    return (
        <div data-theme={pageData.theme} className="surprise-container" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <audio
                ref={audioRef}
                src={getMusicUrl(pageData.musicChoice)}
                loop
                muted={isMuted}
            />

            {/* Mute Control */}
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100 }}>
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="btn-secondary"
                    style={{ padding: '10px', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
            </div>

            {/* Floating Hearts Background */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0, scale: 0.5 }}
                        animate={{ y: '-10vh', opacity: [0, 0.4, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 15 }}
                        style={{ position: 'absolute' }}
                    >
                        <Heart size={20 + Math.random() * 40} color="var(--accent-color)" fill="var(--accent-color)" />
                    </motion.div>
                ))}
            </div>

            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 10 }}>
                <AnimatePresence mode="wait">
                    {!isRevealed ? (
                        <motion.div
                            key="unrevealed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                            className="glass-morphism"
                            style={{ padding: '60px', textAlign: 'center', maxWidth: '500px' }}
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ marginBottom: '30px' }}
                            >
                                <Gift size={100} color="var(--accent-color)" />
                            </motion.div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>You have a surprise!</h2>
                            <p style={{ opacity: 0.8, marginBottom: '40px' }}>From {pageData.creatorName}, sent with love.</p>
                            <button
                                className="btn-primary"
                                onClick={handleReveal}
                                style={{ fontSize: '1.25rem', padding: '16px 40px' }}
                            >
                                Open Surprise 💖
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="revealed"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <p style={{ fontSize: '1.2rem', fontWeight: 300, marginBottom: '10px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>From {pageData.creatorName}</p>
                                <h1 style={{ fontSize: 'calc(2.5rem + 3vw)', fontWeight: 700, marginBottom: '30px', background: 'linear-gradient(to right, white, var(--accent-color), white)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Hey {pageData.recipientName},
                                </h1>
                            </motion.div>

                            {pageData.photoUrls && pageData.photoUrls.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    style={{ display: 'flex', overflowX: 'auto', gap: '30px', padding: '40px 0', justifyContent: 'center', scrollbarWidth: 'none' }}
                                >
                                    {pageData.photoUrls.map((url, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ rotate: Math.random() * 10 - 5, scale: 0.8 }}
                                            animate={{ rotate: 0, scale: 1 }}
                                            whileHover={{ scale: 1.05, zIndex: 20 }}
                                            style={{ flexShrink: 0 }}
                                        >
                                            <img
                                                src={url}
                                                alt="Memory"
                                                style={{ height: '350px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '8px solid white', objectFit: 'cover' }}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2, duration: 1.5 }}
                                className="glass-morphism fade-in"
                                style={{ maxWidth: '800px', margin: '60px auto', padding: '60px', fontSize: '1.5rem', lineHeight: '2', fontStyle: 'italic', position: 'relative' }}
                            >
                                <Sparkles size={32} style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.3 }} />
                                <p style={{ fontWeight: 400 }}>"{pageData.message}"</p>
                                <Sparkles size={32} style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.3 }} />

                                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Heart size={32} fill="var(--accent-color)" color="var(--accent-color)" /></motion.div>
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}><Heart size={32} fill="var(--accent-color)" color="var(--accent-color)" /></motion.div>
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }}><Heart size={32} fill="var(--accent-color)" color="var(--accent-color)" /></motion.div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 4 }}
                                style={{ marginTop: '60px' }}
                            >
                                <p style={{ opacity: 0.4, letterSpacing: '1px' }}>Made with ❤️ by {pageData.creatorName}</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        .surprise-container {
          background: linear-gradient(135deg, var(--bg-color) 0%, #000 100%);
        }
        h1, h2 { color: white; font-family: var(--font-main); }
        p { font-family: var(--font-body); }
      `}} />
        </div>
    );
};

export default SurprisePageView;
