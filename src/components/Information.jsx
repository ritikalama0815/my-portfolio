import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Callout box with CTA link shown for island stages 2–4.
 *
 * @param {object} props
 * @param {string} props.text - Main message
 * @param {string} props.link - React Router path
 * @param {string} props.btnText - Button label
 * @returns {JSX.Element}
 */
const InformationBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium text-center sm:text-xl">{text}</p>
    <Link
      to={link}
      style={{
        background: '#ccf4fb',
        border: '#00aacc',
        boxShadow:
          '0.6vmin 0.6vmin #fff, 1vmin 1vmin #d2e4ff, 1vmin 1vmin #d2e4ff 0.65vmin 1vmin #d2e4ff, 1vmin 0.65vmin #d2e4ff',
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
        gap: '0.75rem',
      }}
    >
      {btnText}
    </Link>
  </div>
);

/**
 * Content keyed by island rotation stage (1–4).
 * Stage 1: welcome; 2: About; 3: Projects; 4: Contact.
 */
const renderContent = {
  1: (
    <h1
      className="px-8 py-4 mx-5 text-center text-black sm:text-xl sm:leading-snug"
      style={{
        background: '#e6e6fa',
        position: 'relative',
        borderRadius: '10px',
        border: '#2b77e7',
        boxShadow:
          '0.6vmin 0.6vmin #336cc1, 1vmin 1vmin #0092db, 1vmin 1vmin #0092db, 0.65vmin 1vmin #0092db, 1vmin 0.65vmin #0092db',
      }}
    >
      Welcome to my Portfolio! I am Ritika.
      <br /> (you can move the cursor around to navigate through the island!)
    </h1>
  ),
  2: (
    <InformationBox
      text="This section is all about me"
      link="/about"
      btnText="click here for more "
    />
  ),
  3: (
    <InformationBox
      text="This section is about my projects."
      link="/projects"
      btnText="more "
    />
  ),
  4: (
    <InformationBox
      text="if you liked this portfolio, feel free to leave me a message!"
      link="/contact"
      btnText="here. "
    />
  ),
};

/**
 * Overlay UI for the Home island, driven by `currentStage` from Island rotation.
 *
 * @param {object} props
 * @param {1 | 2 | 3 | 4 | null | undefined} props.currentStage
 * @returns {JSX.Element | null}
 */
const Information = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default Information;
