import React from 'react';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

const InformationBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium text-center sm:text-xl">{text}</p>
    <Link to={link} style={{
        background: '#ccf4fb',
        border: '#00aacc',
        boxShadow: '0.6vmin 0.6vmin #fff, 1vmin 1vmin #d2e4ff, 1vmin 1vmin #d2e4ff 0.65vmin 1vmin #d2e4ff, 1vmin 0.65vmin #d2e4ff',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.375rem',
        color: '#3b82f6',
        textAlign: 'center',
        fontWeight: '600',
        width: '90%',
        position: 'absolute',
        bottom: '-1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
      {btnText}
      <img src={arrow} className='object-contain w-4 h-4'/>
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1
      className="px-8 py-4 mx-5 text-center text-black sm:text-xl sm:leading-snug"
      style={{
        background: '#e6e6fa',
        position: 'relative',
        borderRadius: '10px',
        border: '#2b77e7',
        boxShadow: '0.6vmin 0.6vmin #336cc1, 1vmin 1vmin #0092db, 1vmin 1vmin #0092db, 0.65vmin 1vmin #0092db, 1vmin 0.65vmin #0092db'
      }}
    >
      Welcome to my Portfolio! I am Ritika. 
      <br/> (you can move the cursor around to navigate through the island!)
    </h1>
  ),
  2: (
    <InformationBox
      text="this section includes the skills I learned and experiences I have gathered working in various places." //text for stage 2
      link="/about"
      btnText="click here for more "
    />
  ),
  3: (
    <InformationBox
      text="I have done many projects and some influential researches in my college life. more here⬇" //text for stage 2
      link="/projects"
      btnText="more "
    />
  ),
  4: (
     <InformationBox
        text="if you liked this portfolio, feel free to leave me a message!" //text for stage 2
        link="/contact"
        btnText="here. "
    />
  )
};

const Information = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default Information;