# MemoryBoard
MemoryBoard is a sleek, modern, and highly responsive single-page web application designed for collecting, organizing, and viewing personal memories through media streams. It features an aesthetic dark-mode layout inspired by modern social media feeds, tailored for deep personal curation.

## Motivation and Intention
Many people want to disconnect from toxic social media algorithms, but feel trapped because they rely on features like "Stories" and "Memories" to archive their lives. MemoryBoard was created to solve this problem. It extracts the best part of social media—beautiful, chronological media curation—into a private, standalone sanctuary, empowering users to finally delete their accounts without losing their digital scrapbooks.

## Features Completed So Far
- Navigation Header: Features a centered search bar framed by symmetrical side button groups—Lock and Profile icons on the left; Edit and Add Memory icons on the right. Out of these, only the Lock, Edit and Add functionalities are developed till now. 
- Privacy Lock: Functionality to block and unblock rendering behind an overlay prompt. Currently, the password is 4-digited and hardcoded (try to guess it). In the future, will need to implement JWT systems for better security.
- CRUD Features for Memories: Fully customizable story order, lists with support for mixed media (images and videos).
- Continuous Deployment Pipeline: Automated build configurations handle rendering and bundle minification directly to a live deployment script targeted at GitHub Pages hosting.

## Tech Stack
- Frontend: React.
- Styling: CSS.
- Deployment: Using Github Pages via the gh-pages toolkit.

## Pending Features
- Database Integration: A suitable database needs to be integrated to store and manage data from multiple users.
- A working backend system.
- Functional Search feature and Profile modification feature.
