import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EditablePlane } from './plane';


function App() {
  return (
    <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [0, 3.5, 2], fov: 40 }} onCreated={({ gl }) => gl.setClearColor('white')}>
      <ambientLight intensity={10} />
      <EditablePlane />
      <OrbitControls
        enableRotate={false}
      />
    </Canvas>
  );
}

export default App;
