import { create } from 'zustand';

// Helper function to load from localStorage
const loadFromLocalStorage = () => {
    const storedWebinars = localStorage.getItem('webinars');
    return storedWebinars ? JSON.parse(storedWebinars) : [];
};

// Zustand store
const useStore = create((set, get) => ({
    webinars: loadFromLocalStorage(), // Initialize state from localStorage

    addWebinar: (webinar) =>
        set((state) => {
            const updatedWebinars = [...state.webinars, webinar];
            localStorage.setItem('webinars', JSON.stringify(updatedWebinars));
            return { webinars: updatedWebinars };
        }),

    deleteWebinar: (index) =>
        set((state) => {
            const updatedWebinars = state.webinars.filter((_, i) => i !== index);
            localStorage.setItem('webinars', JSON.stringify(updatedWebinars));
            return { webinars: updatedWebinars };
        }),
    updateWebinar: (index, updatedWebinar) =>
        set((state) => {
            const updatedWebinars = [...state.webinars];
            updatedWebinars[index] = { ...updatedWebinars[index], ...updatedWebinar }; // Merge updated data
            return { webinars: updatedWebinars };
        }),
    getTopics: () => {
        const webinars = get().webinars;
        console.log(webinars); // Get webinars from state
        const topics = webinars.flatMap((webinar) => webinar.topics);
        const uniqueTopics = [...new Set(topics)];
        console.log(uniqueTopics);
        return uniqueTopics;  // Return the unique topics as an array
    }
}));

export default useStore;
