'use client'

import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, MeshReflectorMaterial, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing'
import { ACESFilmicToneMapping, type Vector3 } from 'three'
import { ObVanModel } from './ob-van-model'
import type { ObVanSystem } from './ob-van-preview.data'

interface ObVanCanvasProps {
  active: ObVanSystem | null
  isOpen: boolean
}

function Aim() {
  const camera = useThree(state => state.camera)
  const controls = useThree(state => state.controls) as { target: Vector3; update: () => void } | null

  useEffect(() => {
    camera.position.set(11.2, 2.35, 12.4)
    if (!controls) {
      camera.lookAt(0.3, 0.72, 0)
      return
    }
    controls.target.set(0.3, 0.72, 0)
    controls.update()
  }, [camera, controls])

  return null
}

export function ObVanCanvas({ active, isOpen }: ObVanCanvasProps) {
  return (
    <Canvas
      camera={{ position: [11.2, 2.35, 12.4], fov: 30, near: 0.1, far: 80 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.12 }}
    >
      <color attach="background" args={['#0c0e14']} />
      <Suspense fallback={null}>
        <Environment resolution={256} environmentIntensity={1}>
          <Lightformer form="rect" intensity={4} position={[0, 6, 5]} scale={[16, 7, 1]} color="#fffaf4" />
          <Lightformer form="rect" intensity={2.2} position={[-8, 4, 2]} rotation={[0, Math.PI / 2.4, 0]} scale={[10, 5, 1]} color="#d5def4" />
          <Lightformer form="rect" intensity={1.4} position={[7, 3, -5]} rotation={[0, -0.7, 0]} scale={[8, 4, 1]} color="#ffffff" />
          <Lightformer form="ring" intensity={1.4} position={[0, 5, 0]} scale={6} color="#9aa6d6" />
        </Environment>
        <directionalLight position={[7, 9, 6]} intensity={1.7} color="#fff6ee" />
        <directionalLight position={[-8, 5, -6]} intensity={0.85} color="#c9d6f5" />
        <ObVanModel active={active} isOpen={isOpen} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <circleGeometry args={[14, 64]} />
          <MeshReflectorMaterial
            blur={[300, 80]}
            resolution={1024}
            mixBlur={1}
            mixStrength={1.4}
            roughness={0.85}
            depthScale={1.1}
            minDepthThreshold={0.35}
            maxDepthThreshold={1.25}
            color="#14161c"
            metalness={0.55}
            mirror={0}
          />
        </mesh>
        <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={16} blur={2.4} far={4.5} color="#000000" />
        <EffectComposer multisampling={0}>
          <SMAA />
          <Bloom luminanceThreshold={1} mipmapBlur intensity={0.42} />
          <Vignette eskil={false} offset={0.18} darkness={0.62} />
        </EffectComposer>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate={false}
        minPolarAngle={0.45}
        maxPolarAngle={Math.PI / 2.12}
        minDistance={6}
        maxDistance={18}
        target={[0.3, 0.72, 0]}
      />
      <Aim />
    </Canvas>
  )
}
