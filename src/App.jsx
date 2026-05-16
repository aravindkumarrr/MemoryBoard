// src/App.jsx
import React, { useState } from 'react';
import './CSS/App.css';
import Header from './Header.jsx';
import StoryBar from './components/StoryBar/StoryBar.jsx';
import StoryEditModal from './components/StoryEditor/StoryEditModal.jsx';
import { demoCategoriesArray } from './data/demoStories.js';

function App() {
  const [categories, setCategories] = useState(demoCategoriesArray);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeStoryViewer, setActiveStoryViewer] = useState(null);
  const [editingStoryContext, setEditingStoryContext] = useState(null); // { story, listId }

  // Calculates total across all arrays to check if entire app is empty
  const totalStoriesCount = categories.reduce((acc, curr) => acc + curr.stories.length, 0);

  const handleStorySelect = (story, listId) => {
    if (isEditMode) {
      setEditingStoryContext({ story, listId });
    } else {
      setActiveStoryViewer(story);
      console.log("Viewing story:", story.title);
    }
  };

  // --- LIST LEVEL CRUD (Fixed) ---
  const handleDeleteList = (listIdToRemove) => {
    // This literally removes the object from the array, unmounting the UI row completely
    setCategories(prev => prev.filter(cat => cat.listId !== listIdToRemove));
  };

  const handleMoveListUp = (index) => {
    if (index === 0) return;
    setCategories(prev => {
      const arrCopy = [...prev];
      // Classic JS Array element swap
      [arrCopy[index - 1], arrCopy[index]] = [arrCopy[index], arrCopy[index - 1]];
      return arrCopy;
    });
  };

  const handleMoveListDown = (index) => {
    if (index === categories.length - 1) return;
    setCategories(prev => {
      const arrCopy = [...prev];
      // Classic JS Array element swap
      [arrCopy[index + 1], arrCopy[index]] = [arrCopy[index], arrCopy[index + 1]];
      return arrCopy;
    });
  };

  // --- STORY LEVEL CRUD (Refactored for Array) ---
  const handleUpdateStory = (listId, updatedStory) => {
    setCategories(prev => prev.map(cat => {
      if (cat.listId === listId) {
        return {
          ...cat, 
          stories: cat.stories.map(s => s.id === updatedStory.id ? updatedStory : s)
        };
      }
      return cat;
    }));
    setEditingStoryContext({ story: updatedStory, listId });
  };

  const handleDeleteStory = (listId, storyId) => {
    setCategories(prev => prev.map(cat => {
      if (cat.listId === listId) {
        return {
          ...cat,
          stories: cat.stories.filter(s => s.id !== storyId)
        };
      }
      return cat;
    }));
  };

  return (
    <div className="App">
      <Header 
        isEditMode={isEditMode} 
        toggleEditMode={() => setIsEditMode(!isEditMode)} 
      />

      <main className="main-content-canvas">
        {categories.length === 0 ? (
          <div className="global-empty-state-container">
            <div className="empty-state-card">
              <i className="fa-solid fa-photo-film global-empty-icon"></i>
              <h2>No Lists Remaining</h2>
              <p>You have deleted all your memory collections.</p>
              <button className="primary-action-btn">
                <i className="fa-solid fa-plus"></i> Create New List
              </button>
            </div>
          </div>
        ) : (
          <div className="dashboard-stories-feed">
            {/* We map directly over state now, no hardcoded configurations! */}
            {categories.map((category, index) => (
              <StoryBar 
                key={category.listId}
                listId={category.listId}
                title={category.title} 
                stories={category.stories} 
                isEditMode={isEditMode}
                isFirst={index === 0}
                isLast={index === categories.length - 1}
                onSelectStory={handleStorySelect}
                onDeleteList={() => handleDeleteList(category.listId)}
                onMoveListUp={() => handleMoveListUp(index)}
                onMoveListDown={() => handleMoveListDown(index)}
              />
            ))}
          </div>
        )}
      </main>

      {editingStoryContext && (
        <StoryEditModal 
          story={editingStoryContext.story}
          categoryKey={editingStoryContext.listId}
          onClose={() => setEditingStoryContext(null)}
          onUpdateStory={handleUpdateStory}
          onDeleteStory={handleDeleteStory}
        />
      )}
    </div>
  );
}

export default App;