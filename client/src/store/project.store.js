import { create } from "zustand";

// Use this for production deployment
const API_BASE_URL = import.meta.env.PROD ? 
  "https://moses-ramoeletsi-portfolio-server.vercel.app" : "";

export const projectFunctionStore = create((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  
  setProjects: (projects) => set({ projects }),
  
  addProject: async (newProject) => {
    try {
      // Validate input first
      if (!newProject.projectName || !newProject.projectType ||
          !newProject.projectDescription || !newProject.projectTech ||
          !newProject.projectImage) {
        return { success: false, message: "Please fill all required fields" };
      }
      
      set({ isLoading: true, error: null });
      
      // Add retry logic
      const maxRetries = 3;
      let retryCount = 0;
      let lastError = null;
      
      while (retryCount < maxRetries) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/project`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProject),
            // Add timeout
            signal: AbortSignal.timeout(30000) // 30 second timeout
          });
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          
          const data = await res.json();
          set((state) => ({ 
            projects: [...state.projects, data.data],
            isLoading: false 
          }));
          
          return { success: true, message: "Project added successfully" };
        } catch (error) {
          lastError = error;
          retryCount++;
         
          // If it's not the last retry, wait before trying again
          if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      }
      
      // If we got here, all retries failed
      console.error("Failed to add project after retries:", lastError);
      set({ isLoading: false, error: "Connection error" });
      
      return {
        success: false,
        message: "Connection error. Please try again or contact support if the problem persists."
      };
    } catch (error) {
      console.error("Error in addProject:", error);
      set({ isLoading: false, error: error.message });
      
      return {
        success: false,
        message: "An unexpected error occurred. Please try again."
      };
    }
  },
  
  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const res = await fetch(`${API_BASE_URL}/api/project`, {
        signal: AbortSignal.timeout(30000)
      });
     
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      set({ projects: data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false, error: error.message });
    }
  },
  
  updateProject: async (uid, updatedProject) => {
    try {
      set({ isLoading: true, error: null });
      
      const res = await fetch(`${API_BASE_URL}/api/project/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
        signal: AbortSignal.timeout(30000)
      });
      
      const data = await res.json();
      
      if (!data.success) {
        set({ isLoading: false });
        return { success: false, message: data.message };
      }
      
      set((state) => ({
        projects: state.projects.map((project) => 
          (project._id === uid ? data.data : project)
        ),
        isLoading: false
      }));
      
      return { success: true, message: "Project updated successfully" };
    } catch (error) {
      console.error("Error updating project:", error);
      set({ isLoading: false, error: error.message });
      
      return {
        success: false,
        message: "An unexpected error occurred. Please try again."
      };
    }
  },
  
  deleteProject: async (uid) => {
    try {
      set({ isLoading: true, error: null });
      
      const res = await fetch(`${API_BASE_URL}/api/project/${uid}`, {
        method: "DELETE",
        signal: AbortSignal.timeout(30000)
      });
      
      const data = await res.json();
      
      if (!data.success) {
        set({ isLoading: false });
        return { success: false, message: data.message };
      }
      
      set((state) => ({ 
        projects: state.projects.filter((project) => project._id !== uid),
        isLoading: false
      }));
      
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting project:", error);
      set({ isLoading: false, error: error.message });
      
      return {
        success: false,
        message: "An unexpected error occurred. Please try again."
      };
    }
  },
}));