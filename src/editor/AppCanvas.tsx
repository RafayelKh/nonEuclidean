import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EditablePlane } from './plane';


function AppCanvas() {
  return (
    <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [0, 3.5, 2], fov: 50 }} onCreated={({ gl }) => gl.setClearColor('white')}>
      <ambientLight intensity={10} />
      <EditablePlane />
      <OrbitControls
        enableRotate={false}
        enableZoom={false}
      />
    </Canvas>
  );
}

export default AppCanvas;
