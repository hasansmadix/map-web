'use client'

import { useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Color, DoubleSide, MeshPhysicalMaterial, MeshStandardMaterial, type SpotLight } from 'three'

const BLUE = '#2b38d1'

const cyc = new MeshStandardMaterial({
  color: '#f6f2ea',
  roughness: 0.88,
  metalness: 0,
  side: DoubleSide,
  emissive: new Color('#efe6d6'),
  emissiveIntensity: 0.42,
})
const floorMat = new MeshPhysicalMaterial({
  color: '#c9c2b4',
  roughness: 0.38,
  metalness: 0.06,
  clearcoat: 0.7,
  clearcoatRoughness: 0.32,
  envMapIntensity: 0.7,
})
const shell = new MeshPhysicalMaterial({
  color: '#1a1d24',
  metalness: 0.42,
  roughness: 0.38,
  clearcoat: 0.25,
  clearcoatRoughness: 0.4,
})
const trussMat = new MeshStandardMaterial({ color: '#b7bdc8', metalness: 1, roughness: 0.22 })
const ink = new MeshStandardMaterial({ color: '#12141a', metalness: 0.55, roughness: 0.38 })
const rubber = new MeshStandardMaterial({ color: '#1a1c22', roughness: 0.92, metalness: 0 })
const glassMat = new MeshPhysicalMaterial({
  color: '#d5e0ee',
  metalness: 0.2,
  roughness: 0.06,
  transparent: true,
  opacity: 0.28,
  envMapIntensity: 1.5,
  side: DoubleSide,
})
const seamMat = new MeshStandardMaterial({ color: '#b3aa9c', roughness: 0.9, metalness: 0 })
const lensMat = new MeshStandardMaterial({ color: '#d7dbe3', metalness: 0.85, roughness: 0.22 })
const tallyMat = new MeshStandardMaterial({
  color: '#ff3b3b',
  emissive: new Color('#ff2424'),
  emissiveIntensity: 1.6,
  toneMapped: false,
})
const lampMat = new MeshStandardMaterial({
  color: '#fff8ef',
  emissive: new Color('#fff3dc'),
  emissiveIntensity: 1.4,
  toneMapped: false,
})
const screenMat = new MeshStandardMaterial({
  color: '#0c1830',
  emissive: new Color('#7f92ff'),
  emissiveIntensity: 0.85,
  toneMapped: false,
})
const roomMat = new MeshStandardMaterial({ color: '#2a2e38', roughness: 0.72, metalness: 0.12 })

const FLOOR_W = 30
const FLOOR_D = 20

const ROOMS = [
  { id: 'makeup', label: 'Makeup', z: 6.9 },
  { id: 'changing', label: 'Changing', z: 2.3 },
  { id: 'guest', label: 'Guest', z: -2.3 },
  { id: 'edit', label: 'Edit', z: -6.9 },
]

const CAMERAS: Array<[number, number]> = [
  [-12, 3.4],
  [-7.2, 5.4],
  [-2.4, 6.5],
  [2.4, 6.5],
  [7.2, 5.4],
  [12, 3.4],
]

const LAMPS: Array<[number, number]> = []
for (let x = -10; x <= 10; x += 5) {
  for (let z = -4; z <= 6; z += 5) LAMPS.push([x, z])
}

interface StudioModelProps {
  activeId: string | null
}

export function StudioModel({ activeId }: StudioModelProps) {
  const gridHot = activeId === 'grid' || activeId === 'lighting'
  const galleryHot = activeId === 'vision' || activeId === 'monitors' || activeId === 'servers' || activeId === 'record' || activeId === 'intercom' || activeId === 'audio'
  const stageHot = activeId === 'cameras' || activeId === 'lenses' || activeId === 'support'
  const spots = useRef<Array<SpotLight | null>>([])

  useFrame(() => {
    lampMat.emissiveIntensity += ((gridHot ? 3.4 : 1.35) - lampMat.emissiveIntensity) * 0.08
    screenMat.emissiveIntensity += ((galleryHot ? 2.4 : 0.8) - screenMat.emissiveIntensity) * 0.08
    const next = gridHot ? 70 : 26
    spots.current.forEach(light => {
      if (light) light.intensity += (next - light.intensity) * 0.08
    })
  })

  return (
    <group>
      <Stage />
      <LightingGrid />
      <Practicals spots={spots} />
      <Gallery />
      <Rooms activeId={activeId} />
      {CAMERAS.map(([x, z]) => (
        <Pedestal key={`${x}-${z}`} position={[x, z]} hot={stageHot} />
      ))}
      <Prompt hot={activeId === 'prompt'} />
      <Crane hot={activeId === 'support'} />
    </group>
  )
}

function Stage() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <circleGeometry args={[52, 72]} />
        <meshStandardMaterial color="#0c0e14" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0.6]} material={floorMat}>
        <planeGeometry args={[FLOOR_W, FLOOR_D - 1.2]} />
      </mesh>
      <FloorSeams />
      <mesh position={[0, 5.1, -10]} material={cyc}>
        <boxGeometry args={[FLOOR_W, 5.8, 0.16]} />
      </mesh>
      <mesh position={[0, 2.15, -7.85]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[2.15, 2.15, FLOOR_W, 28, 1, true, Math.PI, Math.PI / 2]} />
        <primitive object={cyc} attach="material" />
      </mesh>
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 14.92, 3.4, -8.5]} material={cyc}>
          <boxGeometry args={[0.12, 6.6, 3]} />
        </mesh>
      ))}
      {[-12, -4, 4, 12].map(x => (
        <spotLight key={x} position={[x, 5.2, -1.5]} angle={0.5} penumbra={0.85} intensity={22} distance={20} decay={2} color="#fffaf3">
          <object3D attach="target" position={[x, 1.4, -9.4]} />
        </spotLight>
      ))}
      {[-6, 0, 6].map(x => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 3.2]}>
          <planeGeometry args={[0.035, 5]} />
          <meshStandardMaterial color="#2c3038" />
        </mesh>
      ))}
    </group>
  )
}

function FloorSeams() {
  const vertical = [-12, -8, -4, 0, 4, 8, 12]
  const horizontal = [-6, -2, 2, 6]
  return (
    <group>
      {vertical.map(x => (
        <mesh key={`v-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.018, 0.6]} material={seamMat}>
          <planeGeometry args={[0.018, 18.4]} />
        </mesh>
      ))}
      {horizontal.map(z => (
        <mesh key={`h-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, z]} material={seamMat}>
          <planeGeometry args={[29.4, 0.018]} />
        </mesh>
      ))}
    </group>
  )
}

function LightingGrid() {
  return (
    <group position={[0, 7.35, 1]}>
      {[-12, -6, 0, 6, 12].map(x => (
        <group key={`x-${x}`}>
          <mesh position={[x, 0.08, 0]} material={trussMat}>
            <boxGeometry args={[0.05, 0.05, 16]} />
          </mesh>
          <mesh position={[x, -0.08, 0]} material={trussMat}>
            <boxGeometry args={[0.05, 0.05, 16]} />
          </mesh>
        </group>
      ))}
      {[-6, -2, 2, 6].map(z => (
        <group key={`z-${z}`}>
          <mesh position={[0, 0.08, z]} material={trussMat}>
            <boxGeometry args={[26, 0.05, 0.05]} />
          </mesh>
          <mesh position={[0, -0.08, z]} material={trussMat}>
            <boxGeometry args={[26, 0.05, 0.05]} />
          </mesh>
        </group>
      ))}
      {LAMPS.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, -0.55, z]}>
          <mesh position={[0, 0.28, 0]} material={ink}>
            <cylinderGeometry args={[0.012, 0.012, 0.5, 6]} />
          </mesh>
          <mesh material={ink}>
            <boxGeometry args={[1.15, 0.22, 0.72]} />
          </mesh>
          <mesh position={[0, -0.1, 0]} material={lampMat}>
            <boxGeometry args={[0.96, 0.03, 0.54]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Practicals({ spots }: { spots: MutableRefObject<Array<SpotLight | null>> }) {
  const aims: Array<[number, number, number]> = [
    [-8, 6.6, 2],
    [0, 6.8, 1],
    [8, 6.6, 2],
  ]
  return (
    <group>
      {aims.map((position, index) => (
        <spotLight
          key={position.join(',')}
          ref={light => {
            spots.current[index] = light
          }}
          position={position}
          angle={0.7}
          penumbra={0.92}
          intensity={26}
          distance={24}
          decay={2}
          color="#fff6ea"
        >
          <object3D attach="target" position={[position[0] * 0.25, 2.2, -8]} />
        </spotLight>
      ))}
    </group>
  )
}

function Gallery() {
  return (
    <group position={[-17.15, 0, 0]}>
      <mesh position={[0, 0.05, 0]} material={shell}>
        <boxGeometry args={[4, 0.1, 14]} />
      </mesh>
      <mesh position={[-1.95, 1.7, 0]} material={roomMat}>
        <boxGeometry args={[0.1, 3.4, 14]} />
      </mesh>
      <mesh position={[0, 1.7, -6.95]} material={shell}>
        <boxGeometry args={[4, 3.4, 0.1]} />
      </mesh>
      <mesh position={[0, 1.7, 6.95]} material={shell}>
        <boxGeometry args={[4, 3.4, 0.1]} />
      </mesh>
      <mesh position={[0, 3.35, 0]} material={shell}>
        <boxGeometry args={[4, 0.08, 14]} />
      </mesh>
      <mesh position={[1.96, 1.85, 0]} material={glassMat}>
        <boxGeometry args={[0.04, 2.5, 12.4]} />
      </mesh>
      {[-5.2, -2.6, 0, 2.6, 5.2].map(z => (
        <mesh key={`mullion-${z}`} position={[1.99, 1.85, z]} material={trussMat}>
          <boxGeometry args={[0.045, 2.55, 0.035]} />
        </mesh>
      ))}
      <mesh position={[1.15, 2.85, 0]} material={lampMat}>
        <boxGeometry args={[0.12, 0.04, 10]} />
      </mesh>
      <mesh position={[0.7, 0.96, 0]} material={ink}>
        <boxGeometry args={[0.85, 0.06, 11.2]} />
      </mesh>
      {[-4.6, -2.8, -1, 0.8, 2.6, 4.4].map(z => (
        <group key={z} position={[1.55, 1.72, z]} rotation={[0, Math.PI / 2, 0]}>
          <mesh material={ink}>
            <boxGeometry args={[1.25, 0.74, 0.06]} />
          </mesh>
          <mesh position={[0, 0, 0.04]} material={screenMat}>
            <planeGeometry args={[1.08, 0.58]} />
          </mesh>
        </group>
      ))}
      {[-1, 0, 1].map(index => (
        <mesh key={index} position={[-1.15, 0.55 + index * 0.55, -4.2]} material={ink}>
          <boxGeometry args={[0.55, 0.42, 0.7]} />
        </mesh>
      ))}
      <Html position={[0, 3.9, 0]} center distanceFactor={30} zIndexRange={[0, 0]}>
        <span className="pointer-events-none text-[10px] font-medium tracking-[0.18em] text-white/80 uppercase">Gallery</span>
      </Html>
    </group>
  )
}

function Rooms({ activeId }: { activeId: string | null }) {
  return (
    <group>
      {ROOMS.map(room => {
        const roomHot = activeId === room.id
        return (
          <group key={room.id} position={[17.35, 0, room.z]}>
            <mesh position={[0, 1.6, 0]} material={roomMat}>
              <boxGeometry args={[4.2, 3.2, 3.4]} />
            </mesh>
            <mesh position={[-2.11, 1.35, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[1.15, 2.15]} />
              <meshStandardMaterial
                color={roomHot ? '#ffd7a4' : '#3a2a22'}
                emissive={roomHot ? '#ff9a3c' : '#5a341c'}
                emissiveIntensity={roomHot ? 1.1 : 0.28}
              />
            </mesh>
            <mesh position={[-2.08, 2.55, 0]} material={ink}>
              <boxGeometry args={[0.06, 0.08, 1.4]} />
            </mesh>
            <Html position={[0, 3.5, 0]} center distanceFactor={30} zIndexRange={[0, 0]}>
              <span className="pointer-events-none text-[10px] font-medium tracking-[0.16em] text-white/75 uppercase">{room.label}</span>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

function Pedestal({ position, hot }: { position: [number, number]; hot: boolean }) {
  const reach = 0.58
  const rise = 1.18
  const tilt = Math.atan2(reach, rise)
  const length = Math.hypot(reach, rise)

  return (
    <group position={[position[0], 0, position[1]]} rotation={[0, Math.PI, 0]}>
      {[0, 1, 2].map(index => {
        const angle = (index / 3) * Math.PI * 2 + 0.6
        return (
          <mesh
            key={index}
            position={[(Math.sin(angle) * reach) / 2, rise / 2, (Math.cos(angle) * reach) / 2]}
            rotation={[Math.cos(angle) * tilt, 0, -Math.sin(angle) * tilt]}
            material={ink}
          >
            <cylinderGeometry args={[0.016, 0.022, length, 6]} />
          </mesh>
        )
      })}
      <mesh position={[0, 1.22, 0]} material={ink}>
        <cylinderGeometry args={[0.06, 0.07, 0.08, 12]} />
      </mesh>
      <mesh position={[0, 1.4, 0.02]}>
        <boxGeometry args={[0.22, 0.16, 0.32]} />
        <meshStandardMaterial color={hot ? '#2430b8' : '#2a3140'} metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.4, 0.28]} rotation={[Math.PI / 2, 0, 0]} material={lensMat}>
        <cylinderGeometry args={[0.055, 0.07, 0.34, 16]} />
      </mesh>
      <mesh position={[0, 1.4, 0.46]} material={ink}>
        <boxGeometry args={[0.14, 0.14, 0.04]} />
      </mesh>
      <mesh position={[0.08, 1.54, -0.06]} material={ink}>
        <boxGeometry args={[0.09, 0.07, 0.1]} />
      </mesh>
      <mesh position={[0, 1.5, 0.18]} material={tallyMat}>
        <boxGeometry args={[0.04, 0.025, 0.02]} />
      </mesh>
    </group>
  )
}

function Prompt({ hot }: { hot: boolean }) {
  return (
    <group>
      {[-2.4, 2.4].map(x => (
        <group key={x} position={[x, 0, 4.6]}>
          <mesh position={[0, 0.7, 0]} material={ink}>
            <cylinderGeometry args={[0.02, 0.025, 1.4, 8]} />
          </mesh>
          <mesh position={[0, 1.45, 0.04]} rotation={[-0.42, 0, 0]}>
            <boxGeometry args={[0.42, 0.28, 0.025]} />
            <meshPhysicalMaterial
              color="#d5deea"
              roughness={0.08}
              metalness={0.1}
              transparent
              opacity={0.55}
              emissive={hot ? BLUE : '#000000'}
              emissiveIntensity={hot ? 0.6 : 0}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Crane({ hot }: { hot: boolean }) {
  return (
    <group position={[10.5, 0, -2]}>
      <mesh position={[0, 0.15, 0]} material={rubber}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 16]} />
      </mesh>
      <mesh position={[0.45, 0.45, 0]} material={ink}>
        <boxGeometry args={[0.5, 0.35, 0.4]} />
      </mesh>
      <mesh position={[0, 2.3, 0]} material={trussMat}>
        <cylinderGeometry args={[0.1, 0.14, 4, 12]} />
      </mesh>
      {[-0.12, 0.12].map(offset => (
        <mesh key={offset} position={[-6.3, 4.35 + offset, offset]} material={trussMat}>
          <boxGeometry args={[13, 0.06, 0.06]} />
        </mesh>
      ))}
      <mesh position={[-6.3, 4.35, 0]} material={trussMat}>
        <boxGeometry args={[13, 0.06, 0.06]} />
      </mesh>
      <mesh position={[-12.6, 3.7, 0]}>
        <boxGeometry args={[0.32, 0.22, 0.4]} />
        <meshStandardMaterial color={hot ? '#2430b8' : '#1c212b'} metalness={0.4} roughness={0.35} />
      </mesh>
    </group>
  )
}
