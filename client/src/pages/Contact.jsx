import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';
import useContactStore from '../store/contactForm.store.js';

const Contact = () => {
  const { 
    formData, 
    status, 
    updateFormData, 
    submitForm 
  } = useContactStore();
  
  const handleChange = (e) => {
    updateFormData(e.target.name, e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="section-title">Get In <span>Touch</span></h1>
        
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Feel free to reach out to me for any questions or opportunities.</p>
            
            <div className="info-items">
              <div className="info-item">
                <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>reanetseramoeletsi14@gmail.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <FontAwesomeIcon icon={faPhone} className="info-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>+266 58411896 / 68244070</p>
                </div>
              </div>
              
              <div className="info-item">
                <FontAwesomeIcon icon={faLocationDot} className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Qoaling Maseru Lesotho</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Me a Message</h3>
              
              {status.error && (
                <div className="error-message">
                  <p>{status.message}</p>
                </div>
              )}
              
              {status.submitted && (
                <div className="success-message">
                  <p>{status.message}</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" disabled={status.submitting}>
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;