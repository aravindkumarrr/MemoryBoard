// This structure mimics what a real backend API will eventually send
export const demoCategories = {
    favorites: [
    {
        id: "fav-1",
        title: "My Concert",
        cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=150&auto=format&fit=crop&q=80",
        isSeen: false,
        items: [
        { id: 101, type: "image", src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80", duration: 4000 }
        ]
    },
    {
        id: "fav-2",
        title: "Cozy Café",
        cover: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&auto=format&fit=crop&q=80",
        isSeen: true,
        items: [
        { id: 102, type: "image", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80", duration: 5000 }
        ]
    }
    ],
    people: [
    {
        id: "ppl-1",
        title: "Sarah M.",
        cover: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        isSeen: false,
        items: [
        { id: 201, type: "image", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80", duration: 4000 }
        ]
    },
    {
        id: "ppl-2",
        title: "Alex Wander",
        cover: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        isSeen: false,
        items: [
        { id: 202, type: "image", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80", duration: 4000 }
        ]
    }
    ],
    trips: [] // Kept empty to trigger the fallback UI
};