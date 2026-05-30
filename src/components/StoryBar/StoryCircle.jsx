import React from 'react';
import './StoryCircle.css';

function StoryCircle({ story, onClick, isEditMode, onUpdateTitle }) {
  // Grab the cover source
    const coverSrc = story.cover || (story.items && story.items.length > 0 ? story.items[0].src : null);

    // Check if the source is a video by inspecting the Base64 data string
    const isVideo = coverSrc && coverSrc.startsWith('data:video');

    return (
    <div className="story-circle-wrapper">
        <div 
        className={`story-circle ${isEditMode ? 'edit-mode' : ''}`} 
        onClick={onClick}
        >
        {coverSrc ? (
            isVideo ? (
                /* Adding #t=0.1 forces some browsers (like Safari) to seek to the 
                first millisecond and paint the frame instead of staying blank */
            <video 
                src={`${coverSrc}#t=0.1`} 
                className="story-cover-img" 
                muted 
                playsInline 
                preload="metadata"
            />
            ) : (
            <img src={coverSrc} alt={story.title} className="story-cover-img" />
            )
        ) : (
            <div className="story-cover-placeholder">
                <i className="fa-solid fa-image"></i>
            </div>
        )}
        </div>

        {isEditMode ? (
        <input 
            type="text"
            className="story-title-input"
            value={story.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            placeholder="Story Name..."
        />
        ) : (
        <span className="story-title">{story.title}</span>
        )}
    </div>
    );
}

export default StoryCircle;