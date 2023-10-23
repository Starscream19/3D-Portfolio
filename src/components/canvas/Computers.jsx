import {Suspense, useEffect, useState} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';
const ComputerModel = ({ isMobile }) => {
  const { scene } = useGLTF('./desktop_pc/scene.gltf');

  return (
    <primitive object={scene} scale={isMobile? 0.7 : 0.75} position={isMobile? [0,-3, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} />
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

const handleMediaQueryChange = (event) => {
  setIsMobile(event.matches);
}

mediaQuery.addEventListener('change', handleMediaQueryChange);

return() =>{
  mediaQuery.removeEventListener('change', handleMediaQueryChange);
}
  }, []);


  return(
    <Canvas
     frameloop="demand"
    shadows
    camera={{ position: [20,2,5], fov: 25}}
    gl={{ preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader/>}>
         <OrbitControls 
        enableZoom={false}
       maxPolarAngle={Math.PI / 2}
       minPolarAngle={Math.PI / 2}
        />
    </Suspense>
      <ambientLight intensity={5} />
      <pointLight 
      intensity={3} />
      <ComputerModel isMobile={isMobile}/>
    </Canvas>
  )
}
export default ComputersCanvas;