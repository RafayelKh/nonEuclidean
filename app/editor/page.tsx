"use client"
import { RefObject, useRef } from "react"

import { CameraControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import { MeshView } from "@/app/meshes/mesh"

export default function App() {
  const cameraControlRef = useRef<CameraControls | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>()

  return (
    <div>
      <div
        ref={(sceneRef as RefObject<HTMLDivElement>) || null}
        style={{ width: "100%", height: "100vh" }}
      >
        <Canvas
          style={{ backgroundColor: "#757575", transition: "background-color 0.5s ease" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.7} color="white" position={[0, 0, 5]} />
          <directionalLight intensity={0.7} color="white" position={[0, 0, -5]} />
          <directionalLight intensity={0.7} color="white" position={[5, 0, 0]} />
          <directionalLight intensity={0.7} color="white" position={[-5, 0, 0]} />

          <MeshView />
        </Canvas>
      </div>
    </div>
  )
}
