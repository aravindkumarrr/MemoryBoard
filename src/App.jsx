// src/App.jsx
import React, { useState } from 'react';
import './CSS/App.css';
import Header from './Header.jsx';
import StoryBar from './components/StoryBar/StoryBar.jsx';
import StoryEditModal from './components/StoryEditor/StoryEditModal.jsx';
import { demoCategories } from './data/demoStories.js';

function App() {
  // Global State Configuration
  const [categories, setCategories] = useState(demoCategories);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Viewing/Editing States
  const [activeStoryViewer, setActiveStoryViewer] = useState(null); // For fullscreen viewing later
  const [editingStoryContext, setEditingStoryContext] = useState(null); // { story, categoryKey }

  // Check if everything is empty
  const totalStoriesCount = Object.values(categories).reduce((acc, curr) => acc + curr.length, 0);

  // --- INTERACTION ROUTER ---
  const handleStorySelect = (story, categoryKey) => {
    if (isEditMode) {
      // If editing, open the vertical edit modal
      setEditingStoryContext({ story, categoryKey });
    } else {
      // If not editing, open the fullscreen viewer (Stage 3 roadmap)
      setActiveStoryViewer(story);
      console.log("Viewing story:", story.title);
    }
  };

  // --- LIST LEVEL CRUD OPERATIONS ---
  const handleDeleteList = (categoryKey) => {
    setCategories(prev => {
      const newCats = { ...prev };
      newCats[categoryKey] = []; // Empties the array entirely
      return newCats;
    });
  };

  const handleMoveListUp = (categoryKey) => {
    // Reordering object keys in JS is tricky, usually requires array restructuring.
    // For now, we will log it. To implement fully, we'd need to convert 'categories' 
    // from an Object of Arrays into an Array of Objects. 
    console.log(`Move ${categoryKey} up logic triggered. Note: requires data structure refactor to an Array.`);
    alert("List reordering requires changing `demoCategories` to an Array structure. Let's do that next!");
  };

  const handleMoveListDown = (categoryKey) => {
    console.log(`Move ${categoryKey} down logic triggered.`);
  };

  // --- STORY LEVEL CRUD OPERATIONS ---
  const handleUpdateStory = (categoryKey, updatedStory) => {
    setCategories(prev => ({
      ...prev,
      [categoryKey]: prev[categoryKey].map(s => s.id === updatedStory.id ? updatedStory : s)
    }));
    // Keep modal state in sync
    setEditingStoryContext({ story: updatedStory, categoryKey });
  };

  const handleDeleteStory = (categoryKey, storyId) => {
    setCategories(prev => ({
      ...prev,
      [categoryKey]: prev[categoryKey].filter(s => s.id !== storyId)
    }));
  };

  // Map configuration for dynamic rendering
  const listConfigs = [
    { key: 'favorites', title: '⭐️ Favorites' },
    { key: 'people', title: '👥 Close Friends' },
    { key: 'trips', title: '✈️ Wanderlust Trips' }
  ];

  return (
    <div className="App">
      <Header 
        isEditMode={isEditMode} 
        toggleEditMode={() => setIsEditMode(!isEditMode)} 
      />

      <main className="main-content-canvas">
        {totalStoriesCount === 0 ? (
          <div className="global-empty-state-container">
             {/* ... empty state UI from earlier ... */}
             <h2>Your Memory Board is Empty</h2>
          </div>
        ) : (
          <div className="dashboard-stories-feed">
            {listConfigs.map(config => (
              <StoryBar 
                key={config.key}
                categoryKey={config.key}
                title={config.title} 
                stories={categories[config.key]} 
                isEditMode={isEditMode}
                onSelectStory={handleStorySelect}
                onDeleteList={handleDeleteList}
                onMoveListUp={handleMoveListUp}
                onMoveListDown={handleMoveListDown}
              />
            ))}
          </div>
        )}
      </main>

      {/* Render the Vertical Edit Modal if active */}
      {editingStoryContext && (
        <StoryEditModal 
          story={editingStoryContext.story}
          categoryKey={editingStoryContext.categoryKey}
          onClose={() => setEditingStoryContext(null)}
          onUpdateStory={handleUpdateStory}
          onDeleteStory={handleDeleteStory}
        />
      )}
    </div>
  );
}

export default App;