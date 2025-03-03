import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: true
        },
        projectType: {
            type: String,
            required: true,
            enum: [
                "Website",
                "WebApp",
                "Mobile Application",
                "Desktop Application",
            ]
        },
        projectDescription: {
            type: String,
            required: true
        },
        projectTech: {
            type: [String],
            required: true
        },
        projectLink: {
            type: String,
        },
        projectImage: {
            type: String,
            required: true
        },
        otherImages: {
            type: [String],
        },
    },{
        timestamps: true
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;