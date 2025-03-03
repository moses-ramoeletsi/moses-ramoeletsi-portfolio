import ContactForm from "../model/contact.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // "gmail"
    auth: {
      user: process.env.EMAIL_USER,     // your full email
      pass: process.env.EMAIL_PASS      // your app password
    }
});

export const createContact = async (req, res) => {
  const user = req.body;
  if (!user.name || !user.email || !user.subject || !user.message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  
  const newContactForm = new ContactForm({
    name: user.name,
    email: user.email,
    subject: user.subject,
    message: user.message,
  });

  try {
    // Save to database
    await newContactForm.save();
    
    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.YOUR_EMAIL, // Your personal email
      subject: `Portfolio Contact: ${user.subject}`,
      html: `
        <h3>New Contact from Portfolio</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Subject:</strong> ${user.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${user.message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(201).json({
      success: true,
      message: "Form submitted successfully and email sent",
      data: newContactForm,
    });
  } catch (error) {
    console.error("Error in contact submission", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};