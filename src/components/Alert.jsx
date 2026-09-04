import React from 'react';

/**
 * Floating success/error banner used by the contact form.
 *
 * @param {object} props
 * @param {'danger' | 'success'} props.type - Visual variant (failed vs success)
 * @param {string} props.text - Message body
 * @returns {JSX.Element}
 */
const Alert = ({ type, text }) => {
  return (
    <div className="absolute top-15 left-0 right-0 flex justify-center items-center">
      <div
        className={`${type === 'danger' ? 'bg-red-700' : 'bg-blue-400'} 
            p-2 text-indigo-100 leading-none lg:rounded-full flex lg:inline_flex items-center`}
        role="alert"
      >
        <p
          className={`${type === 'danger' ? 'bg-red-700' : 'bg-blue-400'} 
            flex rounded-full uppercase px-2 py-1 font-semibold ml-1`}
        >
          {type === 'danger' ? 'failed' : 'success'}
        </p>
        <p className="mr-2 text-left">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
