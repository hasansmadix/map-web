'use client'

import { Suspense, useEffect, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing'
import { ACESFilmicToneMapping, Vector3, type Vector3 as Vector3Type } from 'three'
import { StudioModel } from './studio-model'
import { studioCamera, type StudioZone } from './studio-preview.data'

interface StudioCanvasProps {
  activeId: string | null
  zone: StudioZone
}

function StudioRig({ zone, fly }: { zone: StudioZone; fly: MutableRefObject<boolean> }) {
  const camera = useThree(state => state.camera)
  const controls = useThree(state => state.controls) as { target: Vector3Type; update: () => void } | null
  const position = useRef(new Vector3(studioCamera.stage.position[0], studioCamera.stage.position[1], studioCamera.stage.position[2]))
  const target = useRef(new Vector3(studioCamera.stage.target[0], studioCamera.stage.target[1], studioCamera.stage.target[2]))

  useEffect(() => {
    const preset = studioCamera[zone]
    position.current.set(preset.position[0], preset.position[1], preset.position[2])
    target.current.set(preset.target[0], preset.target[1], preset.target[2])
    fly.current = true
  }, [zone, fly])

  useFrame(() => {
    if (!fly.current || !controls) return
    camera.position.lerp(position.current, 0.08)
    controls.target.lerp(target.current, 0.08)
    controls.update()
    if (camera.position.distanceTo(position.current) < 0.08) fly.current = false
  })

  return null
}

export function StudioCanvas({ activeId, zone }: StudioCanvasProps) {
  const fly = useRef(true)

  return (
    <Canvas
      camera={{ position: [28, 20, 32], fov: 32, near: 0.1, far: 180 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.08 }}
    >
      <color attach="background" args={['#0c0e14']} />
      <Suspense fallback={null}>
        <Environment resolution={256} environmentIntensity={0.85}>
          <Lightformer form="rect" intensity={3.2} position={[0, 16, 6]} scale={[40, 10, 1]} color="#fff8ee" />
          <Lightformer form="rect" intensity={1.6} position={[-22, 8, 4]} rotation={[0, Math.PI / 2, 0]} scale={[24, 8, 1]} color="#d5def4" />
        </Environment>
        <hemisphereLight args={['#f7f1e6', '#16181f', 0.42]} />
        <directionalLight position={[18, 22, 14]} intensity={0.85} color="#fff6ee" />
        <directionalLight position={[-14, 10, -6]} intensity={0.28} color="#c9d6f5" />
        <StudioModel activeId={activeId} />
        <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={50} blur={2.4} far={14} color="#000000" />
        <EffectComposer multisampling={0}>
          <SMAA />
          <Bloom luminanceThreshold={0.92} mipmapBlur intensity={0.45} />
          <Vignette eskil={false} offset={0.15} darkness={0.32} />
        </EffectComposer>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={16}
        maxDistance={70}
        target={[0, 2, -1]}
        onStart={() => {
          fly.current = false
        }}
      />
      <StudioRig zone={zone} fly={fly} />
    </Canvas>
  )
}
