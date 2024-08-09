"use client"
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";

import * as THREE from 'three';

export const EditablePlane = () => {
  const planeRef = useRef();
  const texture = useLoader(THREE.TextureLoader, '/images/planeTexture.png');
  const gridSize = 100;
  const [heightMap, setHeightMap] = useState(Array(gridSize * gridSize).fill(0));
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!planeRef.current) return;

    const { uv } = e;
    if (uv) {
      const x = Math.floor(uv.x * gridSize);
      const y = Math.floor((1 - uv.y) * gridSize);
      const i = y * gridSize + x;

      if (isDragging) {
        updateHeight(i);
      }
    }
  };


  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const getNeighboringIndices = (index: number) => {
    const neighbors = [];
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
          neighbors.push(ny * gridSize + nx);
        }
      }
    }

    return neighbors;
  };

  const updateHeight = (index: number) => {
    if (!planeRef.current) return

    const newHeightMap = [...heightMap];
    const indicesToUpdate = [index, ...getNeighboringIndices(index)];


    indicesToUpdate.forEach((i) => {
      if (newHeightMap[i] < 0.5) {
        newHeightMap[i] += 0.04;
      }
      //@ts-expect-error planref stuff
      const vertices = planeRef.current.geometry.attributes.position.array;
      vertices[i * 3 + 2] = newHeightMap[i];
    });

    //@ts-expect-error planref stuff
    indicesToUpdate.forEach(({ index: i, distance }) => {
      const influence = Math.max(0, 1 - distance / 100);

      if (newHeightMap[i] < 0.5) {
        newHeightMap[i] += influence * 0.1;
      }
      //@ts-expect-error planref stuff
      const vertices = planeRef.current.geometry.attributes.position.array;
      vertices[i * 3 + 2] = newHeightMap[i];
    });

    setHeightMap(newHeightMap);

    //@ts-expect-error planref stuff
    planeRef.current.geometry.computeVertexNormals();
    //@ts-expect-error planref stuff
    planeRef.current.geometry.attributes.position.needsUpdate = true;
  };

  return (
    <mesh
      //@ts-expect-error planref stuff
      ref={planeRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <planeGeometry args={[10, 10, gridSize - 1, gridSize - 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}