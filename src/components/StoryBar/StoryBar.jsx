// src/components/StoryBar/StoryBar.jsx
import React from 'react';
import StoryCircle from './StoryCircle.jsx';
import './StoryBar.css';

function StoryBar({ categoryKey, title, stories, isEditMode, onSelectStory, onDeleteList, onMoveListUp, onMoveListDown }) {

    const handleDeleteClick = () => {
    // Native browser confirmation dialogue
    if (window.confirm(`Are you sure you want to completely delete the "${title}" list and all its memories?`)) {
        onDeleteList(categoryKey);
    }
    };

    return (
    <section className="story-bar-section">
        <div className="story-bar-header">
        <h3 className="category-title">{title}</h3>
        
        {/* Render Edit Controls ONLY when isEditMode is true */}
        {isEditMode && (
            <div className="list-edit-controls">
            <button className="icon-btn-small" onClick={() => onMoveListUp(categoryKey)} title="Move List Up">
                <i className="fa-solid fa-chevron-up"></i>
            </button>
            <button className="icon-btn-small" onClick={() => onMoveListDown(categoryKey)} title="Move List Down">
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
                onClick={() => onSelectStory(story, categoryKey)} 
            />
            ))}
        </div>
        )}
    </section>
    );
}

export default StoryBar;