// src/components/StoryBar/StoryBar.jsx
import React from 'react';
import StoryCircle from './StoryCircle.jsx';
import './StoryBar.css';

// Changed props to accept specific functions for up/down/delete
function StoryBar({ listId, title, stories, isEditMode, onSelectStory, onDeleteList, onMoveListUp, onMoveListDown, isFirst, isLast }) {
    const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to completely delete the "${title}" list and all its memories?`)) {
        onDeleteList();
    }
    };

    return (
    <section className="story-bar-section">
        <div className="story-bar-header">
        <h3 className="category-title">{title}</h3>
        
        {isEditMode && (
            <div className="list-edit-controls">
            {/* Disabled states added if it's the very top or very bottom list */}
            <button className="icon-btn-small" onClick={onMoveListUp} disabled={isFirst} title="Move List Up">
                <i className="fa-solid fa-chevron-up"></i>
            </button>
            <button className="icon-btn-small" onClick={onMoveListDown} disabled={isLast} title="Move List Down">
                <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button className="icon-btn-small delete-btn" onClick={handleDeleteClick} title="Delete Entire List">
                <i className="fa-solid fa-trash"></i>
            </button>
            </div>
        )}
        </div>

        {(!stories || stories.length === 0) ? (
        <div className="empty-category-message">
            <i className="fa-solid fa-folder-open empty-icon"></i>
            <span>No active memories here.</span>
        </div>
        ) : (
        <div className="story-scroll-container">
            {stories.map((story) => (
            <StoryCircle 
                key={story.id} 
                story={story} 
                onClick={() => onSelectStory(story, listId)} 
            />
            ))}
        </div>
        )}
    </section>
    );
}

export default StoryBar;