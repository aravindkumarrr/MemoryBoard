import React, { useState, useEffect } from 'react';
import './AddMemoryModal.css';

function AddMemoryModal({ categories, onClose, onSave }) {
    const [isDragging, setIsDragging] = useState(false);
    const [mediaList, setMediaList] = useState([]); // Now an array!

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
    }
    };

    const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
    }
    };

    // Uses Promise.all to ensure order is perfectly maintained
    const processFiles = async (files) => {
    const fileArray = Array.from(files);
    const newMediaPromises = fileArray.map(file => {
        return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve({
            src: e.target.result,
            type: file.type
            });
        };
        reader.readAsDataURL(file);
        });
    });

    const newMediaItems = await Promise.all(newMediaPromises);
    setMediaList(prev => [...prev, ...newMediaItems]);
    };

    const removeMedia = (indexToRemove) => {
    setMediaList(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (mediaList.length === 0) {
        alert("Please upload at least one image or video first.");
        return;
    }
    // Pass the entire list up
    onSave({ listId, listName, storyId, storyName, mediaList });
    };

    const selectedCat = categories.find(c => c.listId === listId);
    const availableStories = selectedCat ? selectedCat.stories : [];

    return (
    <div className="add-modal-overlay" onClick={onClose}>
        <div className="add-modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add New Memories</h2>
        
        <div
            className={`drop-zone ${isDragging ? 'dragging' : ''} ${mediaList.length > 0 ? 'has-media' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {mediaList.length > 0 ? (
            <div className="media-preview-grid">
                {mediaList.map((media, idx) => (
                <div key={idx} className="preview-item">
                    {media.type.startsWith('video') ? (
                    <video src={media.src} className="media-thumbnail" />
                    ) : (
                    <img src={media.src} alt={`Preview ${idx}`} className="media-thumbnail" />
                    )}
                    <button className="remove-media-btn" onClick={() => removeMedia(idx)}>
                    <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                ))}
                <div className="add-more-placeholder">
                    <input type="file" multiple accept="image/*,video/*" onChange={handleFileInput} title="Add more" />
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            ) : (
            <div className="drop-placeholder">
                <span>Drag and Drop Images / Videos Here</span>
                <span>or</span>
                <button id = "choose_files_button">
                    <input style={{color: "transparent"}} type="file" multiple accept="image/*,video/*" onChange={handleFileInput}/>
                </button>
                
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
            <button type="submit" className="save-btn">Save {mediaList.length > 0 ? mediaList.length : ''} Memories</button>
            </div>
        </form>
        </div>
    </div>
    );
}

export default AddMemoryModal;