import React from 'react';
import './StoryBar.css';

function StoryCircle({ story, onClick }) {
// We expect story to have: { id, title, cover, isSeen }

return (
<button className="story-circle-container" onClick={() => onClick(story)}>
    {/* The outer ring handles the gradient/color */}
    <div className={`story-ring ${story.isSeen ? 'seen' : 'unseen'}`}>
    {/* The image itself has a border to create the "gap" between the photo and the ring */}
    <img 
        src={story.cover} 
        alt={`${story.title} cover`} 
        className="story-cover-image" 
    />
    </div>
    <span className="story-title">{story.title}</span>
</button>
);
}

export default StoryCircle;