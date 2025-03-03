import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faServer, faDatabase, faMobile, faCloud } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Home.css';
import ResumeButton from '../components/Resume';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Full-Stack Developer</h1>
            <h2>Building Scalable Web Solutions</h2>
            <p>
              I specialize in creating interactive web applications with modern 
              technologies and best practices. Let's bring your ideas to life!
            </p>
            <div className="hero-buttons">
              <a href="#skills" className="btn primary-btn">My Skills</a>
              <a href="/projects" className="btn secondary-btn">View Projects</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-image">
            <img 
                src='./MyProfile.jpg' 
                alt="Profile"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="placeholder-profile" style={{ display: 'none' }}>
                <span>Your Photo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about section" id="about">
        <div className="container">
          <h2 className="section-title">About <span>Me</span></h2>
          <div className="about-content">
            <p>
              I'm a passionate Full-Stack Developer with experience building scalable web and mobile 
              applications. I enjoy solving complex technical challenges and creating seamless user experiences.
              My approach combines technical expertise with creative problem-solving to deliver 
              high-quality solutions that meet business objectives.
            </p>
            <div className='action-buttons'>
                <ResumeButton />
              <div className="social-links">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills section" id="skills">
        <div className="container">
          <h2 className="section-title">My <span>Skills</span></h2>
          <div className="skills-container">
            <div className="skill-card">
              <FontAwesomeIcon icon={faCode} className="skill-icon" />
              <h3>Frontend Development</h3>
              <p>Creating interactive, responsive, and user-friendly interfaces.</p>
              <div className="technologies">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>React</span>
                <span>Angular</span>
              </div>
            </div>
            
            <div className="skill-card">
              <FontAwesomeIcon icon={faServer} className="skill-icon" />
              <h3>Backend Development</h3>
              <p>Building secure, high-performance APIs and server-side logic.</p>
              <div className="technologies">
                <span>Node.js</span>
                <span>Express</span>
                <span>PHP</span>
                <span>Laravel</span>
                <span>Django</span>
              </div>
            </div>
            
            <div className="skill-card">
              <FontAwesomeIcon icon={faDatabase} className="skill-icon" />
              <h3>Database Management</h3>
              <p>Designing and optimizing databases for efficiency.</p>
              <div className="technologies">
                <span>MySQL</span>
                <span>PostgreSQL</span>
                <span>MongoDB</span>
                <span>Firebase</span>
              </div>
            </div>
            
            <div className="skill-card">
              <FontAwesomeIcon icon={faMobile} className="skill-icon" />
              <h3>Full-Stack Projects</h3>
              <p>Developing end-to-end solutions from concept to deployment.</p>
              <div className="technologies">
                <span>RESTful APIs</span>
                <span>GraphQL</span>
                <span>WebSockets</span>
                <span>Authentication</span>
              </div>
            </div>
            
            <div className="skill-card">
              <FontAwesomeIcon icon={faCloud} className="skill-icon" />
              <h3>Cloud & DevOps</h3>
              <p>Integrating cloud services, CI/CD pipelines, and deployment strategies.</p>
              <div className="technologies">
                <span>Git</span>
                <span>Docker</span>
                <span>AWS</span>
                <span>Firebase</span>
                <span>Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;