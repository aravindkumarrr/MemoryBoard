
import React from 'react';
import './StoryBar.css';

function StoryCircle({ story, onClick, isEditMode, onUpdateTitle }) {
    return (
    <div className="story-circle-container">
        {/* Clicking the ring ALWAYS triggers the main onClick (opens modal in edit mode, or viewer in normal mode) */}
        <div 
        className={`story-ring ${story.isSeen ? 'seen' : 'unseen'}`} 
        onClick={() => onClick(story)}
        >
        <img 
            src={story.cover} 
            alt={`${story.title} cover`} 
            className="story-cover-image" 
        />
        </div>
        
        {/* CONDITIONAL RENDERING FOR TITLE */}
        {isEditMode ? (
        <input 
            type="text"
            className="story-title-input"
            value={story.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            // CRITICAL: Prevents clicking the input from opening the modal!
            onClick={(e) => e.stopPropagation()} 
        />
        ) : (
        <span className="story-title" onClick={() => onClick(story)}>
            {story.title}
        </span>
        )}
    </div>
    );
}

export default StoryCircle;