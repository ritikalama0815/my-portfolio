import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';
import Information from '../components/Information.jsx';

import sakura from '../assets/sakura.mp3'
import {soundoff, soundon} from '../assets/icons'

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = .4;
  audioRef.current.loop = true;


  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const[isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() =>{
    if(isPlayingMusic)
      audioRef.current.play();
    return() =>{
      audioRef.current.pause();
    }
  }, [isPlayingMusic])

  const adjustIsland = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlane = () => {
    let screenScale;
    let screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIsland();
  const [planeScale, planePosition] = adjustPlane();

  return (
    <section className="relative w-full h-screen">
      <div className='absolute left-0 right-0 z-10 flex items-center justify-center top-28'>
        {currentStage && < Information currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={-0.5} />
          <ambientLight intensity={0.4} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Sky 
            isRotating={isRotating}
          />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage} 
          />
          <Plane
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20, 0]}
            isRotating={isRotating}
          />
        </Suspense>
      </Canvas>
      <div className='absolute bottom-2 left -2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='sound'
          className='object-contain w-20 h-20 cursor-pointer'
          onClick={()=> setIsPlayingMusic(!isPlayingMusic)}
          />
      </div>
    </section>
  );
};

export default Home;