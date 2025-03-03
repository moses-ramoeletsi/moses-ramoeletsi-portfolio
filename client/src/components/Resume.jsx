import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './Resume.css';

const ResumeButton = () => {
  const handleDownload = () => {
    // Replace 'your-resume.pdf' with your actual resume file name
    const resumeUrl = '/assets/Ramoeletsi-cv.pdf';
    
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Reanetse Rameoeletsi.pdf'; // Replace with your name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} className="resume-button">
      <FontAwesomeIcon icon={faDownload} className="download-icon" />
      Download Resume
    </button>
  );
};

export default ResumeButton;