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
      <div className="flex gap-2 text-2xl">
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
          href="www.linkedin.com/in/ritikalama0815"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-colors duration-300 hover:text-blue-300"
        >
          linkedIn 
        </a>

      </div>
    </section>
  );
};

export default IC;