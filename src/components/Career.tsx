import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Scientist</h4>
                <h5>Whilter AI</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Dec 2024 – Present. Building an AI voice assistant for flight
              booking and customer support with LiveKit: agent workflows, tool
              integrations, API orchestration and conversational flow. Deployed
              cargo pricing models with XGBoost and Prophet, built time series
              forecasting solutions, and contributed to face swap, text-to-speech
              and voice cloning pipelines.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern</h4>
                <h5>Whilter AI</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Sep 2024 – Dec 2024. Built automation scripts that cut manual
              processing effort by 60%, implemented predictive models with
              Scikit-learn, and created API and BeautifulSoup scraping pipelines
              to collect and preprocess training data.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech, CSE</h4>
                <h5>KIET Group of Institutions</h5>
              </div>
              <h3>2020–24</h3>
            </div>
            <p>
              Bachelor of Technology in Computer Science, Ghaziabad (CGPA 7.65).
              Senior Secondary at Delhi Public School, Bulandshahr (93%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
