import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './About.css';

const About = () => {
  const username = useSelector((state) => state.auth.me.username);

  useEffect(() => {
    const headerElement = document.querySelector('.aboutHeader');
    const backgroundElement = document.querySelector('.header-background');

    if (headerElement && backgroundElement) {
      headerElement.style.opacity = 1;
      backgroundElement.style.opacity = 1;
    }
  }, []);

  return (
    <div className="about-container">
      <div className="about-header">
        <div className="header-background" />
        <div className="about-text">
          <h3 className="aboutHeader">Our Mission</h3>
          <div>
            <p>
              At Sinew Strength, our mission is to empower individuals on their strength training journey by providing them with a comprehensive web application that combines expert guidance, innovative tools, and a supportive community.
            </p>
            <p>
              We believe that strength training has the power to transform lives, and our goal is to make it accessible, effective, and enjoyable for people of all fitness levels.
            </p>
            <p>
              Through our web application, we aim to educate and inspire users, helping them build strength, increase muscle mass, and improve overall health and well-being. We strive to deliver evidence-based training programs, personalized workout routines.
            </p>
            <p>
              We are committed to creating a user-friendly platform that seamlessly integrates with users' lifestyles, Our web application offers a range of features such as exercise libraries, progress tracking, goal setting, and performance analytics to keep users motivated, engaged, and accountable.
            </p>
          </div>
        </div>
      </div>
      <div className="about-image-container">
        <img
          className="AIfrontImage"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mh-trainer-2-1533576998.png"
          alt="About Image"
        />
        <img
          className="AIbackImage"
          src="https://athleticsweekly.com/wp-content/uploads/2020/11/PT-image-via-OriGym.jpg"
          alt="About Image"
        />
        <img
          className="AIrowImage"
          src="https://www.ed2go.com/common/images/2/21017/personal-trainer-group-fitness-935x572/jpg.jpg"
          alt="About Image"
        />
      </div>
    </div>
  );
};

export default About;
