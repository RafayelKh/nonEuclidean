// "use client"
import { useGLTF } from "@react-three/drei"

export default function Primitive({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}
