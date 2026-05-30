import React, { useState } from 'react';
import './CSS/App.css';
import Header from './Header.jsx';
import StoryBar from './components/StoryBar/StoryBar.jsx';
import StoryEditModal from './components/StoryEditor/StoryEditModal.jsx';
import AddMemoryModal from './components/StoryEditor/AddMemoryModal.jsx';
import { demoCategoriesArray } from './data/demoStories.js';
import StoryViewer from './components/StoryViewer/StoryViewer.jsx';

function App() {
  const [categories, setCategories] = useState(demoCategoriesArray);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeStoryViewer, setActiveStoryViewer] = useState(null);
  const [editingStoryContext, setEditingStoryContext] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalStoriesCount = categories.reduce((acc, curr) => acc + curr.stories.length, 0);

  const handleStorySelect = (story, listId) => {
    if (isEditMode) {
      setEditingStoryContext({ story, listId });
    } else {
      setActiveStoryViewer({ story, listId });
      console.log("Viewing story:", story.title);
    }
  };
  const handleNavigateStory = (newStory, listId) => {
    setActiveStoryViewer({ story: newStory, listId });
  };

  const handleCreateNewList = () => {
    const newList = {
      listId: `list-${Date.now()}`,
      title: "New Memory List",
      stories: []
    };
    setCategories([...categories, newList]);
    setIsEditMode(true);
  };

  const handleDeleteList = (listIdToRemove) => {
    setCategories(prev => prev.filter(cat => cat.listId !== listIdToRemove));
  };

  const handleUpdateListTitle = (listId, newTitle) => {
    setCategories(prev => prev.map(cat => 
      cat.listId === listId ? { ...cat, title: newTitle } : cat
    ));
  };

  const handleMoveListUp = (index) => {
    if (index === 0) return;
    setCategories(prev => {
      const arrCopy = [...prev];
      [arrCopy[index - 1], arrCopy[index]] = [arrCopy[index], arrCopy[index - 1]];
      return arrCopy;
    });
  };

  const handleMoveListDown = (index) => {
    if (index === categories.length - 1) return;
    setCategories(prev => {
      const arrCopy = [...prev];
      [arrCopy[index + 1], arrCopy[index]] = [arrCopy[index], arrCopy[index + 1]];
      return arrCopy;
    });
  };

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

  const handleUpdateStoryTitle = (listId, storyId, newTitle) => {
    setCategories(prev => prev.map(cat => {
      if (cat.listId === listId) {
        return {
          ...cat,
          stories: cat.stories.map(s => 
            s.id === storyId ? { ...s, title: newTitle } : s
          )
        };
      }
      return cat;
    }));
  };

  const handleSaveNewMemory = ({ listId, listName, storyId, storyName, mediaList }) => {
    // Generate an array of strictly ordered items
    const newItems = mediaList.map((media, index) => ({
      id: `media-${Date.now()}-${index}`, // unique ID per item
      type: media.type.startsWith('video') ? 'video' : 'image',
      src: media.src,
      music: ""
    }));

    if (listId === 'NEW_LIST') {
      const newList = {
        listId: `list-${Date.now()}`,
        title: listName || "Untitled List",
        stories: [
          {
            id: `story-${Date.now()}`,
            title: storyName || "Untitled Story",
            cover: newItems[0]?.src,
            items: newItems
          }
        ]
      };
      setCategories([...categories, newList]);
    } else {
      setCategories(prev => prev.map(cat => {
        if (cat.listId === listId) {
          if (storyId === 'NEW_STORY') {
            const newStory = {
              id: `story-${Date.now()}`,
              title: storyName || "Untitled Story",
              cover: newItems[0]?.src,
              items: newItems
            };
            return { ...cat, stories: [...cat.stories, newStory] };
          } else {
            return {
              ...cat,
              stories: cat.stories.map(s =>
                s.id === storyId
                  ? { ...s, title: storyName, items: [...s.items, newItems], cover: s.cover || newItems[0]?.src }
                  : s
              )
            };
          }
        }
        return cat;
      }));
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="App">
      <Header 
        isEditMode={isEditMode} 
        toggleEditMode={() => setIsEditMode(!isEditMode)}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <main className="main-content-canvas">
        {categories.length === 0 ? (
          <div className="global-empty-state-container">
            <div className="empty-state-card">
              <i className="fa-solid fa-photo-film global-empty-icon"></i>
              <h2>No Lists Remaining</h2>
              <p>You have deleted all your memory collections.</p>
              <button className="primary-action-btn" onClick={handleCreateNewList}>
                <i className="fa-solid fa-plus"></i> Create New List
              </button>
            </div>
          </div>
        ) : (
          <div className="dashboard-stories-feed">
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
                onUpdateTitle={(newTitle) => handleUpdateListTitle(category.listId, newTitle)}
                onUpdateStoryTitle={(storyId, newTitle) => handleUpdateStoryTitle(category.listId, storyId, newTitle)}
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

      {isAddModalOpen && (
        <AddMemoryModal
          categories={categories}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewMemory}
        />
      )
      }
      {activeStoryViewer && (
        <StoryViewer 
          activeContext={activeStoryViewer}
          categories={categories}
          onClose={() => setActiveStoryViewer(null)}
          onNavigate={handleNavigateStory}
          
        />)
      }
    </div>
  );
}

export default App;