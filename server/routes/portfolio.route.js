import express, { Router } from "express";
import {
    createProject,
    deleteProject,
    getProjects,
    updateProject,
} from "../controllers/portfolio.controllers.js";
import { createContact } from "../controllers/contactForm.controllers.js";

const router = express.Router();

//Project route
router.post("/project", createProject);
router.get("/project", getProjects);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

router.post("/contact", createContact);

export default router;