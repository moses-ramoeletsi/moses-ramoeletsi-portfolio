import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./AddProject.css";
import { projectFunctionStore } from "../store/project.store";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import ProjectImageGallery from "../components/ProjectImageGallery";

const AddProject = () => {
  const initialFormState = {
    projectName: "",
    projectType: "",
    projectDescription: "",
    projectTech: "",
    projectLink: "",
    projectImage: "",
    otherImages: [],
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const { addProject, fetchProjects, updateProject, deleteProject, projects } =
    projectFunctionStore();
  const [projectData, setProjectData] = useState({
    initialFormState,
  });

  useEffect(() => {
    fetchProjects();
  }, []);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    projectId: null,
  });

  const projectTypes = [
    "Website",
    "WebApp",
    "Mobile Application",
    "Desktop Application",
  ];

  const resetForm = () => {
    setProjectData(initialFormState);
    setIsEditMode(false);
    setCurrentProjectId(null);
    setError("");
  };

  const handleEditClick = (project) => {
    setCurrentProjectId(project._id);
    setProjectData({
      projectName: project.projectName,
      projectType: project.projectType,
      projectDescription: project.projectDescription,
      projectTech: Array.isArray(project.projectTech)
        ? project.projectTech.join(", ")
        : project.projectTech,
      projectLink: project.projectLink || "",
      projectImage: project.projectImage,
      otherImages: project.otherImages || [],
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (projectId) => {
    setDeleteConfirmation({ show: true, projectId });
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      const { success, message } = await deleteProject(
        deleteConfirmation.projectId
      );
      if (success) {
        alert("Project deleted successfully");
      } else {
        setError(message || "Failed to delete project");
      }
    } catch (error) {
      setError("Error deleting project");
      console.error(error);
    } finally {
      setIsLoading(false);
      setDeleteConfirmation({ show: false, projectId: null });
    }
  };

  const handleModalOpen = () => {
    resetForm();
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          const MAX_SIZE = 800;

          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError("");

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB");
        return;
      }

      const compressedImage = await compressImage(file);
      setProjectData((prev) => ({ ...prev, projectImage: compressedImage }));
    } catch (err) {
      setError("Error processing image");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


const handleAdditionalImages = async (e) => {
  const files = Array.from(e.target.files);
  const processedImages = await Promise.all(
    files.map(file => compressImage(file))
  );
  
  setProjectData(prev => ({
    ...prev,
    otherImages: [...prev.otherImages, ...processedImages]
  }));
};
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (
        !projectData.projectName ||
        !projectData.projectType ||
        !projectData.projectDescription ||
        !projectData.projectTech
      ) {
        setError("Please fill in all required fields");
        return;
      }

      const projectToSubmit = {
        ...projectData,
        projectTech: projectData.projectTech
          .split(",")
          .map((tech) => tech.trim()),
      };

      let result;
      if (isEditMode) {
        result = await updateProject(currentProjectId, projectToSubmit);
      } else {
        result = await addProject(projectToSubmit);
      }

      if (result.success) {
        alert(result.message);
        handleModalClose();
      } else {
        setError(
          result.message || `Failed to ${isEditMode ? "update" : "add"} project`
        );
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="projects-container">
        <button className="add-project-btn" onClick={handleModalOpen}>
          <FontAwesomeIcon icon={faPlus} /> Add New Project
        </button>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <div className="project-image">
              <ProjectImageGallery
                mainImage={project.projectImage}
                otherImages={project.otherImages || []}
                // onAddImages={isEditMode ? () => document.getElementById('otherImages').click() : undefined}
              />
              
                  <span>{project.projectName}</span>
                
                <div className="project-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(project)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(project._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              <div className="project-content">
                <h3>{project.projectName}</h3>
                <h4>{project.projectType}</h4>
                <p>{project.projectDescription}</p>

                <div className="project-tech">
                  {project.projectTech.map((projectTech, index) => (
                    <span key={index}>{projectTech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-link"
                  >
                    <FontAwesomeIcon icon={faChrome} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {deleteConfirmation.show && (
          <div className="modal-overlay">
            <div className="modal-content delete-confirmation">
              <h2>Confirm Delete</h2>
              <p>
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="button-group">
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setDeleteConfirmation({ show: false, projectId: null })
                  }
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className="delete-project-btn"
                  onClick={confirmDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <h2>{isEditMode ? "Edit Project" : "Add New Project"}</h2>

              {error && <div className="error-message">{error}</div>}

              <form className="add-project-form" onSubmit={handleSubmitProject}>
                <div className="form-group">
                  <label htmlFor="projectName">Project Title</label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectData.projectName}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    value={projectData.projectType}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectType: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="projectDescription">Description</label>
                  <textarea
                    id="projectDescription"
                    value={projectData.projectDescription}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectDescription: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectTech">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="projectTech"
                    value={projectData.projectTech}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectTech: e.target.value,
                      })
                    }
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectLink">Live Demo Link (optional)</label>
                  <input
                    type="url"
                    id="projectLink"
                    value={projectData.projectLink}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectLink: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectImage">Project Image (required)</label>
                  <input
                    type="file"
                    id="projectImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  <small className="help-text">Maximum file size: 5MB</small>
                  {isLoading && (
                    <small className="help-text">Processing image...</small>
                  )}
                  {projectData.projectImage && (
                    <div className="image-preview">
                      <img
                        src={projectData.projectImage}
                        alt="Project"
                        style={{ maxWidth: "200px", marginTop: "10px" }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="otherImages">Additional Images (optional)</label>
                  <input
                    type="file"
                    id="otherImages"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImages} />
                  <small className="help-text">Maximum file size: 5MB</small>
                  {isLoading && (
                    <small className="help-text">Processing images...</small>
                  )}
                  {projectData.otherImages.length > 0 && (
                    <small className="help-text">
                      {projectData.otherImages.length}Additional image selected
                    </small>
                  )}

                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn"
                >
                  {isLoading
                    ? "Processing..."
                    : isEditMode
                    ? "Update Project"
                    : "Add Project"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddProject;
