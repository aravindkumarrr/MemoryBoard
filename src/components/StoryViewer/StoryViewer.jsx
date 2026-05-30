import React, { useState, useEffect } from 'react';
import './StoryViewer.css';

function StoryViewer({ activeContext, categories, onClose, onNavigate }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index to 0 whenever we open a new story
    useEffect(() => {
    setCurrentIndex(0);
    }, [activeContext.story.id]);

    const { story, listId } = activeContext;

    // Find adjacent stories in the same list
    const currentList = categories.find(c => c.listId === listId);
    const storyIndexInList = currentList.stories.findIndex(s => s.id === story.id);

    const prevStory = storyIndexInList > 0 ? currentList.stories[storyIndexInList - 1] : null;
    const nextStory = storyIndexInList < currentList.stories.length - 1 ? currentList.stories[storyIndexInList + 1] : null;

    const currentMedia = story.items[currentIndex];

    const isFirstMedia = currentIndex === 0;
    const isLastMedia = currentIndex === story.items.length - 1;

    const handlePrev = (e) => {
    e.stopPropagation(); // Prevent closing overlay
    if (!isFirstMedia) {
        setCurrentIndex(prev => prev - 1);
    } else if (prevStory) {
        onNavigate(prevStory, listId);
    }
    };

    const handleNext = (e) => {
    e.stopPropagation(); 
    if (!isLastMedia) {
        setCurrentIndex(prev => prev + 1);
    } else if (nextStory) {
        onNavigate(nextStory, listId);
    } else {
        onClose(); // Close if no more stories
    }
    };

    // Safe fallback if story has no media
    if (!currentMedia) {
        return (
            <div className="story-viewer-overlay" onClick={onClose}>
                <button className="viewer-close-btn" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                <h2 style={{color: 'white'}}>Story is empty</h2>
            </div>
        );
    }

    // Get cover image (first item src) for previews
    const getCover = (st) => st?.items[0]?.src || '';

    return (
    <div className="story-viewer-overlay" onClick={onClose}>
        
        <button className="viewer-close-btn" onClick={onClose} title="Close">
        <i className="fa-solid fa-xmark"></i>
        </button>

        {/* LEFT NAVIGATION (Prev Media or Prev Story) */}
        {(!isFirstMedia || prevStory) && (
        <div className="nav-area left-nav" onClick={handlePrev}>
            {isFirstMedia && prevStory ? (
                <div className="story-transition-preview">
                    <div className="blur-bg" style={{backgroundImage: `url(${getCover(prevStory)})`}}></div>
                    <div className="preview-card">
                        <img src={getCover(prevStory)} alt="Previous Story" />
                        <span className="preview-label">Prev: {prevStory.title}</span>
                    </div>
                </div>
            ) : (
                <div className="floating-nav-btn">
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
            )}
        </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="viewer-content-wrapper" onClick={e => e.stopPropagation()}>
            <div className="media-container">
            {currentMedia.type === 'video' ? (
                <video src={currentMedia.src} autoPlay controls className="viewer-media" />
            ) : (
                <img src={currentMedia.src} alt="memory" className="viewer-media" />
            )}
            </div>
        </div>

        {/* RIGHT NAVIGATION (Next Media or Next Story) */}
        {(!isLastMedia || nextStory) && (
        <div className="nav-area right-nav" onClick={handleNext}>
            {isLastMedia && nextStory ? (
                <div className="story-transition-preview right-preview">
                    <div className="blur-bg" style={{backgroundImage: `url(${getCover(nextStory)})`}}></div>
                    <div className="preview-card">
                        <img src={getCover(nextStory)} alt="Next Story" />
                        <span className="preview-label">Next: {nextStory.title}</span>
                    </div>
                </div>
            ) : (
                <div className="floating-nav-btn">
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            )}
        </div>
        )}
        
    </div>
    );
}

export default StoryViewer;