import React, { FC, useRef } from "react"

import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"


export const MeshView: FC = () => {
  const { scene } = useGLTF("/models/gun.glb")

  const meshRef = useRef<Mesh>(null)

  return (
    <>
      <mesh scale={0.2} ref={meshRef}>
        <primitive object={scene} />
      </mesh>
    </>
  )
}
