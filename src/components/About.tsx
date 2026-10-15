import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm a Data Scientist at Whilter AI, where I build AI voice agents,
          forecasting models and generative pipelines that run in production.
          My work spans LiveKit-powered voice assistants for flight booking and
          support, cargo pricing models trained on 2+ years of historical data,
          and face swap and voice cloning systems. I hold a B.Tech in Computer
          Science from KIET Group of Institutions.
        </p>
      </div>
    </div>
  );
};

export default About;
