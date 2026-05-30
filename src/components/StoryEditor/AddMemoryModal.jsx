import React, { useState, useEffect } from 'react';
import './AddMemoryModal.css';

function AddMemoryModal({ categories, onClose, onSave }) {
const [isDragging, setIsDragging] = useState(false);
const [media, setMedia] = useState(null);

const [listId, setListId] = useState(categories.length > 0 ? categories[0].listId : 'NEW_LIST');
const [listName, setListName] = useState('');

const [storyId, setStoryId] = useState('NEW_STORY');
const [storyName, setStoryName] = useState('');

useEffect(() => {
if (listId === 'NEW_LIST') {
    setStoryId('NEW_STORY');
} else {
    const selectedCat = categories.find(c => c.listId === listId);
    if (selectedCat && selectedCat.stories.length > 0) {
    setStoryId(selectedCat.stories[0].id);
    } else {
    setStoryId('NEW_STORY');
    }
}
}, [listId, categories]);

useEffect(() => {
if (storyId !== 'NEW_STORY' && listId !== 'NEW_LIST') {
    const selectedCat = categories.find(c => c.listId === listId);
    const selectedStory = selectedCat?.stories.find(s => s.id === storyId);
    if (selectedStory) {
    setStoryName(selectedStory.title);
    }
} else {
    setStoryName('');
}
}, [storyId, listId, categories]);

const handleDragOver = (e) => {
e.preventDefault();
setIsDragging(true);
};

const handleDragLeave = () => {
setIsDragging(false);
};

const handleDrop = (e) => {
e.preventDefault();
setIsDragging(false);
const file = e.dataTransfer.files[0];
if (file) processFile(file);
};

const handleFileInput = (e) => {
const file = e.target.files[0];
if (file) processFile(file);
};

const processFile = (file) => {
const reader = new FileReader();
reader.onload = (e) => {
    setMedia({
    src: e.target.result,
    type: file.type
    });
};
reader.readAsDataURL(file);
};

const handleSubmit = (e) => {
e.preventDefault();
if (!media) {
    alert("Please upload an image or video first.");
    return;
}
onSave({ listId, listName, storyId, storyName, media });
};

const selectedCat = categories.find(c => c.listId === listId);
const availableStories = selectedCat ? selectedCat.stories : [];

return (
<div className="add-modal-overlay" onClick={onClose}>
    <div className="add-modal-content" onClick={e => e.stopPropagation()}>
    <h2>Add New Memory</h2>
    
    <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
    >
        {media ? (
        media.type.startsWith('video') ? (
            <video src={media.src} controls className="media-preview" />
        ) : (
            <img src={media.src} alt="Preview" className="media-preview" />
        )
        ) : (
        <div className="drop-placeholder">
            <p>Drag & Drop Image/Video here</p>
            <span>or</span>
            <input type="file" accept="image/*,video/*" onChange={handleFileInput} />
        </div>
        )}
    </div>

    <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Select List</label>
        <select value={listId} onChange={(e) => setListId(e.target.value)}>
            {categories.map(c => (
            <option key={c.listId} value={c.listId}>{c.title}</option>
            ))}
            <option value="NEW_LIST">-- Create New List --</option>
        </select>
        </div>

        {listId === 'NEW_LIST' && (
        <div className="form-group">
            <label>New List Name</label>
            <input type="text" value={listName} onChange={e => setListName(e.target.value)} required />
        </div>
        )}

        <div className="form-group">
        <label>Select Story</label>
        <select value={storyId} onChange={(e) => setStoryId(e.target.value)} disabled={listId === 'NEW_LIST'}>
            {availableStories.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
            ))}
            <option value="NEW_STORY">-- Create New Story --</option>
        </select>
        </div>

        <div className="form-group">
        <label>Story Name</label>
        <input type="text" value={storyName} onChange={e => setStoryName(e.target.value)} required />
        </div>

        <div className="form-actions">
        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        <button type="submit" className="save-btn">Save Memory</button>
        </div>
    </form>
    </div>
</div>
);
}

export default AddMemoryModal;