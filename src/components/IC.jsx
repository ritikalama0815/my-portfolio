import React from 'react';

const IC = () => {
  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '8px',
        gap: '7px',
      }}
    >
      <div className="flex gap-2">
        <a
          href="https://github.com/ritikalama0815"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-colors duration-300 hover:text-white"
        >
          github |
        </a>

        <a
          href="https://www.instagram.com/ritika.t.lama"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-colors duration-300 hover:text-red-500"
        >
          instagram |
        </a>

        <a
          href="https://www.linkedin.com/in/ritika-lama-b2605b2a4/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-colors duration-300 hover:text-blue-500"
        >
          linkedIn |
        </a>
        <a
          href="https://drive.google.com/file/d/1VngkQw0ru6U7RXauTR1y5gkzQY-iGo4i/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-colors duration-300 hover:text-purple-500"
        >
          resume link
        </a>
      </div>
    </section>
  );
};

export default IC;