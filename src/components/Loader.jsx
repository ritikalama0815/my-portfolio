import React from 'react';
import { Html } from '@react-three/drei';

/**
 * Spinner shown inside a React Three Fiber `<Suspense>` fallback (HTML overlay in the canvas).
 *
 * @returns {JSX.Element}
 */
const Loader = () => {
  return (
    <Html>
      <div className="flex justify-center items-center">
        <div
          className="w-20 h-20 border-2 border-opacity-20
            border-blue-500 border-t-blue-500 rounded-full animate-spin"
        />
      </div>
    </Html>
  );
};

export default Loader;
