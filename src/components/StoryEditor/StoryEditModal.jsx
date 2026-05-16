// src/components/StoryEditor/StoryEditModal.jsx
import React from 'react';
import './StoryEditModal.css';

function StoryEditModal({ story, categoryKey, onClose, onUpdateStory, onDeleteStory }) {
    if (!story) return null;

    const handleDeleteEntireStory = () => {
    if (window.confirm(`Delete the entire story "${story.title}"?`)) {
        onDeleteStory(categoryKey, story.id);
        onClose();
    }
    };

    const handleDeleteMedia = (mediaId) => {
    if (window.confirm("Delete this media item?")) {
        const updatedItems = story.items.filter(item => item.id !== mediaId);
        onUpdateStory(categoryKey, { ...story, items: updatedItems });
    }
    };

    const handleEditMusic = (mediaId) => {
    const newMusicUrl = window.prompt("Enter new music URL or leave blank to remove:");
    if (newMusicUrl !== null) { // if not cancelled
        const updatedItems = story.items.map(item => 
        item.id === mediaId ? { ...item, music: newMusicUrl } : item
        );
        onUpdateStory(categoryKey, { ...story, items: updatedItems });
    }
    };

    const handleMoveMedia = (index, direction) => {
    if (direction === -1 && index === 0) return; // Can't move up if first
    if (direction === 1 && index === story.items.length - 1) return; // Can't move down if last

    const itemsCopy = [...story.items];
    const temp = itemsCopy[index];
    itemsCopy[index] = itemsCopy[index + direction];
    itemsCopy[index + direction] = temp;

    onUpdateStory(categoryKey, { ...story, items: itemsCopy });
    };

    return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content vertical-modal" onClick={e => e.stopPropagation()}>
        
        <div className="modal-header">
            <h2>Editing: {story.title}</h2>
            <button className="close-btn" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="modal-body">
            <div className="media-list">
            {story.items.map((item, index) => (
                <div key={item.id} className="media-edit-row">
                <img src={item.src} alt="media thumbnail" className="media-thumb" />
                
                <div className="media-info">
                    <span className="media-type">{item.type.toUpperCase()}</span>
                    <span className="media-music">{item.music ? "🎵 Audio Attached" : "🔇 No Audio"}</span>
                </div>

                <div className="media-actions">
                    <button onClick={() => handleEditMusic(item.id)} title="Edit Music"><i className="fa-solid fa-music"></i></button>
                    <div className="reorder-stack">
                    <button onClick={() => handleMoveMedia(index, -1)} disabled={index === 0}><i className="fa-solid fa-caret-up"></i></button>
                    <button onClick={() => handleMoveMedia(index, 1)} disabled={index === story.items.length - 1}><i className="fa-solid fa-caret-down"></i></button>
                    </div>
                    <button className="delete-text-btn" onClick={() => handleDeleteMedia(item.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
                </div>
            ))}
            </div>
        </div>

        <div className="modal-footer">
            <button className="danger-btn full-width" onClick={handleDeleteEntireStory}>
            Delete Entire Story
            </button>
        </div>

        </div>
    </div>
    );
}

export default StoryEditModal;