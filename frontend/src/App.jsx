import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CreatorForm from './components/CreatorForm';
import SurprisePageView from './components/SurprisePageView';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent = () => {
    const navigate = useNavigate();
    const [generatedLink, setGeneratedLink] = useState(null);

    const handlePageCreated = (pageData) => {
        setGeneratedLink(`${window.location.origin}/surprise/${pageData.slug}`);
    };

    return (
        <div className="app-wrapper">
            <Routes>
                <Route path="/" element={
                    <div style={{ padding: '20px' }}>
                        {!generatedLink ? (
                            <CreatorForm onPageCreated={handlePageCreated} />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-morphism"
                                style={{ maxWidth: '600px', margin: '100px auto', padding: '40px', textAlign: 'center' }}
                            >
                                <h2 style={{ marginBottom: '20px' }}>Your Surprise is Ready! 💖</h2>
                                <p style={{ marginBottom: '20px', opacity: 0.8 }}>Share this link with your sweetheart:</p>
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', wordBreak: 'break-all', marginBottom: '20px' }}>
                                    {generatedLink}
                                </div>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        navigator.clipboard.writeText(generatedLink);
                                        alert("Link copied!");
                                    }}
                                    style={{ marginRight: '10px' }}
                                >
                                    Copy Link
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => navigate(`/surprise/${generatedLink.split('/').pop()}`)}
                                    style={{ padding: '12px 24px', borderRadius: '30px', border: '1px solid white', color: 'white', background: 'transparent', cursor: 'pointer' }}
                                >
                                    Preview Page
                                </button>
                            </motion.div>
                        )}
                    </div>
                } />
                <Route path="/surprise/:slug" element={<SurprisePageView />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
