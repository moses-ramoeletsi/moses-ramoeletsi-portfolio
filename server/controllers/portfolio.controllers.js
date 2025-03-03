import mongoose from "mongoose";
import Project from "../model/project.model.js";

export const createProject = async (req, res) => {
  const project = req.body;
  
  req.on('timeout', () => {
    return res.status(408).json({
      success: false,
      message: "Request timeout - please try again"
    });
  });

  try {
    if (!project.projectName || !project.projectType || 
        !project.projectDescription || !project.projectTech) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const validProjectType = [
      "Website",
      "WebApp",
      "Mobile Application",
      "Desktop Application",
    ];
    
    if (!validProjectType.includes(project.projectType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Project type",
      });
    }
    const newProject = new Project({
      projectName: project.projectName,
      projectType: project.projectType,
      projectDescription: project.projectDescription,
      projectTech: project.projectTech,
      projectLink: project.projectLink,
      projectImage: project.projectImage,
      otherImages: project.otherImages,
    });

    const savedProject = await Promise.race([
      newProject.save(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 20000)
      )
    ]);

    return res.status(201).json({
      success: true,
      message: "Project added",
      data: savedProject,
    });

  } catch (error) {
    console.error("Error in adding new project:", error.message);
    
    if (error.message === 'Database timeout') {
      return res.status(504).json({
        success: false,
        message: "Database operation timed out - please try again"
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Invalid project data",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error - please try again"
    });
  }
};
  export const getProjects = async (req, res) => {
    try {
      const projects = await Project.find({});
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      console.log("Error in getting project", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  export const updateProject = async (req, res) => {
    const { id } = req.params;
    const project = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid project Id" });
    }
  
    if (project.projectType) {
      const validProjectType = [
        "Website",
        "WebApp",
        "Mobile Application",
        "Desktop Application",
      ];
      if (!validProjectType.includes(project.projectType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project type",
        });
      }
    }
  
    try {
      const updatedProject = await Project.findByIdAndUpdate(id, project, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Project updated",
        data: updatedProject,
      });
    } catch (error) {
      console.log("Error in updating project", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  export const deleteProject = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid project Id" });
    }
    try {
      await Project.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error) {
      console.log("Error in deleting project", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  