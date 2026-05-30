import React from 'react';
import StoryCircle from './StoryCircle.jsx';
import './StoryBar.css';

// Add onUpdateTitle to the props list
function StoryBar({ listId, title, stories, isEditMode, onSelectStory, onDeleteList, onMoveListUp, onMoveListDown, isFirst, isLast, onUpdateTitle, onUpdateStoryTitle }) {
    const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to completely delete the "${title}" list and all its memories?`)) {
        onDeleteList();
    }
    };

    return (
    <section className="story-bar-section">
        <div className="story-bar-header">
        
        {/* CONDITIONAL TITLE RENDERING */}
        {isEditMode ? (
            <input 
            type="text"
            className="category-title-input"
            value={title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            placeholder="Enter list name..."
            />
        ) : (
            <h3 className="category-title">{title}</h3>
        )}
        
        {isEditMode && (
            <div className="list-edit-controls">
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
                isEditMode={isEditMode}
                onUpdateTitle={(newTitle) => onUpdateStoryTitle(story.id, newTitle)}
            />
            ))}
        </div>
        )}
    </section>
    );
    }

export default StoryBar;