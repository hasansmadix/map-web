'use client'

import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import {
  CanvasTexture,
  Color,
  DoubleSide,
  LatheGeometry,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector2,
  type Group,
  type Material,
} from 'three'
import type { ObVanSystem } from './ob-van-preview.data'

const BLUE = '#2b38d1'

const paint = new MeshPhysicalMaterial({
  color: '#e7e9ee',
  metalness: 0.18,
  roughness: 0.28,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.15,
})

const cladding = new MeshPhysicalMaterial({
  color: '#23262e',
  metalness: 0.55,
  roughness: 0.34,
  clearcoat: 0.35,
  clearcoatRoughness: 0.25,
})

const glass = new MeshPhysicalMaterial({
  color: '#1a2436',
  metalness: 0.92,
  roughness: 0.04,
  clearcoat: 1,
  clearcoatRoughness: 0.03,
  envMapIntensity: 1.8,
})

const metal = new MeshStandardMaterial({ color: '#c5c9d2', metalness: 1, roughness: 0.22 })
const rubber = new MeshStandardMaterial({ color: '#14161c', roughness: 0.94, metalness: 0 })
const ink = new MeshStandardMaterial({ color: '#12141a', metalness: 0.4, roughness: 0.55 })
const stripeMat = new MeshStandardMaterial({ color: BLUE, metalness: 0.2, roughness: 0.4 })
const lamp = new MeshStandardMaterial({
  color: '#fff6e8',
  emissive: new Color('#fff4d2'),
  emissiveIntensity: 2.4,
  toneMapped: false,
})
const amber = new MeshStandardMaterial({
  color: '#ffb020',
  emissive: new Color('#ff9a00'),
  emissiveIntensity: 1.8,
  toneMapped: false,
})
const tail = new MeshStandardMaterial({
  color: '#ff2a2a',
  emissive: new Color('#ff1a1a'),
  emissiveIntensity: 1.6,
  toneMapped: false,
})
const dishPaint = new MeshStandardMaterial({ color: '#d5d8e0', metalness: 0.95, roughness: 0.18 })
const dishLive = new MeshStandardMaterial({
  color: '#d5d8e0',
  metalness: 0.9,
  roughness: 0.16,
  emissive: new Color(BLUE),
  emissiveIntensity: 0.45,
})

const X0 = -4.22
const X1 = 1.98
const Y0 = 1.08
const Y1 = 2.96
const Z0 = -1.22
const Z1 = 1.22
const SKIN = 0.05
const DOOR_X0 = -2.18
const DOOR_X1 = 0.1
const DOOR_Y0 = 1.26
const DOOR_Y1 = 2.7

function dishGeometry() {
  const points: Vector2[] = []
  for (let step = 0; step <= 24; step += 1) {
    const t = step / 24
    const radius = Math.sin(t * Math.PI * 0.5) * 0.58
    const y = (1 - Math.cos(t * Math.PI * 0.5)) * 0.2
    points.push(new Vector2(radius, y))
  }
  return new LatheGeometry(points, 48)
}

function liveryTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 160
  const context = canvas.getContext('2d')
  if (!context) return null
  context.clearRect(0, 0, 640, 160)
  context.fillStyle = BLUE
  context.font = '700 92px ui-sans-serif, system-ui, sans-serif'
  context.textBaseline = 'middle'
  context.fillText('MAP', 20, 84)
  context.fillStyle = '#2c3038'
  context.font = '600 26px ui-sans-serif, system-ui, sans-serif'
  context.fillText('OB VAN', 268, 78)
  context.fillStyle = BLUE
  context.font = '600 40px ui-sans-serif, system-ui, sans-serif'
  context.fillText('01', 470, 80)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

interface ObVanModelProps {
  active: ObVanSystem | null
  isOpen: boolean
}

export function ObVanModel({ active, isOpen }: ObVanModelProps) {
  const door = useRef<Group>(null)
  const dish = useRef<Group>(null)
  const field = useRef<Group>(null)
  const dishGeo = useMemo(() => dishGeometry(), [])
  const livery = useMemo(() => liveryTexture(), [])
  const reveal = isOpen || active?.zone === 'rack'

  useFrame(({ clock }, delta) => {
    const step = Math.min(1, delta * 2.4)
    if (door.current) door.current.rotation.y += ((reveal ? -1.42 : 0) - door.current.rotation.y) * step
    if (dish.current) dish.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.22
    if (field.current) {
      const target = active?.zone === 'field' ? 1 : 0
      field.current.scale.y += (target - field.current.scale.y) * step
    }
  })

  return (
    <group scale={0.92} position={[0.35, 0, 0]}>
      <Body livery={livery} />
      <Cab />
      <Chassis />
      <Wheels />
      <Roof dish={dish} dishGeo={dishGeo} hot={active?.id === 'rf'} />
      <Rear power={active?.id === 'power'} cable={active?.id === 'cabling'} />
      <SideDoor hinge={door} />
      <Gallery
        open={reveal}
        screensHot={active?.id === 'vision' || active?.id === 'monitoring'}
        audioHot={active?.id === 'audio'}
        replayHot={active?.id === 'replay'}
      />
      <group ref={field} scale={[1, 0.001, 1]}>
        {Array.from({ length: 12 }).map((_, index) => (
          <BroadcastCamera key={index} index={index} />
        ))}
      </group>
      {active ? <SystemCallout system={active} /> : null}
    </group>
  )
}

function Panel({
  bounds,
  material,
}: {
  bounds: [number, number, number, number, number, number]
  material: Material
}) {
  const [x0, x1, y0, y1, z0, z1] = bounds
  return (
    <mesh position={[(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2]} material={material}>
      <boxGeometry args={[x1 - x0, y1 - y0, z1 - z0]} />
    </mesh>
  )
}

function Stripe({ x0, x1, z, y = 2.18 }: { x0: number; x1: number; z: number; y?: number }) {
  return (
    <mesh position={[(x0 + x1) / 2, y, z]} material={stripeMat}>
      <boxGeometry args={[x1 - x0, 0.07, 0.012]} />
    </mesh>
  )
}

function Body({ livery }: { livery: CanvasTexture | null }) {
  return (
    <group>
      <Panel bounds={[X0, X1, Y0, Y0 + SKIN, Z0, Z1]} material={cladding} />
      <RoundedBox args={[X1 - X0 + 0.08, 0.12, Z1 - Z0 + 0.1]} radius={0.045} smoothness={3} position={[(X0 + X1) / 2, Y1 + 0.02, 0]} material={paint} />
      <Panel bounds={[X0, X1, Y0, Y1, Z0, Z0 + SKIN]} material={paint} />
      <Panel bounds={[X1 - SKIN, X1, Y0, Y1, Z0, Z1]} material={paint} />
      <Panel bounds={[X0, X0 + SKIN, Y0, Y1, Z0, Z1]} material={paint} />

      <Panel bounds={[X0, DOOR_X0, Y0, Y1, Z1 - SKIN, Z1]} material={paint} />
      <Panel bounds={[DOOR_X1, X1, Y0, Y1, Z1 - SKIN, Z1]} material={paint} />
      <Panel bounds={[DOOR_X0, DOOR_X1, DOOR_Y1, Y1, Z1 - SKIN, Z1]} material={paint} />
      <Panel bounds={[DOOR_X0, DOOR_X1, Y0, DOOR_Y0, Z1 - SKIN, Z1]} material={paint} />

      <Panel bounds={[X0, X1, Y0, 1.4, Z1 - 0.02, Z1 + 0.02]} material={cladding} />
      <Panel bounds={[X0, X1, Y0, 1.4, Z0 - 0.02, Z0 + 0.02]} material={cladding} />
      <mesh position={[(X0 + X1) / 2, 1.4, Z1 + 0.01]} material={metal}>
        <boxGeometry args={[X1 - X0, 0.025, 0.02]} />
      </mesh>
      <mesh position={[(X0 + X1) / 2, 1.4, Z0 - 0.01]} material={metal}>
        <boxGeometry args={[X1 - X0, 0.025, 0.02]} />
      </mesh>

      <Stripe x0={X0} x1={DOOR_X0} z={Z1 + 0.012} />
      <Stripe x0={DOOR_X1} x1={X1} z={Z1 + 0.012} />
      <Stripe x0={X0} x1={X1} z={Z0 - 0.012} />

      <SideWindows />
      <Louvers />
      {livery ? (
        <>
          <mesh position={[-3.15, 2.48, Z1 + 0.02]}>
            <planeGeometry args={[1.28, 0.32]} />
            <meshStandardMaterial map={livery} transparent roughness={0.4} metalness={0.04} />
          </mesh>
          <mesh position={[-1.1, 2.48, Z0 - 0.02]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.28, 0.32]} />
            <meshStandardMaterial map={livery} transparent roughness={0.4} metalness={0.04} />
          </mesh>
        </>
      ) : null}

      {[-3.55, -2.7, 0.7, 1.45].map(x => (
        <mesh key={x} position={[x, 2.02, Z1 + 0.008]}>
          <boxGeometry args={[0.008, 1.15, 0.008]} />
          <meshStandardMaterial color="#b7bcc6" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function SideWindows() {
  const panes = [
    { x: 0.55, z: Z1 + 0.02, ry: 0 },
    { x: 1.35, z: Z1 + 0.02, ry: 0 },
    { x: 0.55, z: Z0 - 0.02, ry: Math.PI },
    { x: 1.35, z: Z0 - 0.02, ry: Math.PI },
  ]
  return (
    <>
      {panes.map(pane => (
        <group key={`${pane.x}-${pane.z}`} position={[pane.x, 2.05, pane.z]} rotation={[0, pane.ry, 0]}>
          <mesh material={ink}>
            <boxGeometry args={[0.62, 0.42, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0.012]} material={glass}>
            <planeGeometry args={[0.54, 0.34]} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Louvers() {
  return (
    <group position={[-3.45, 1.78, Z1 + 0.02]}>
      <mesh material={ink}>
        <boxGeometry args={[0.62, 0.52, 0.02]} />
      </mesh>
      {Array.from({ length: 6 }).map((_, index) => (
        <mesh key={index} position={[0, -0.2 + index * 0.075, 0.012]} material={metal}>
          <boxGeometry args={[0.5, 0.012, 0.008]} />
        </mesh>
      ))}
    </group>
  )
}

function SideDoor({ hinge }: { hinge: RefObject<Group | null> }) {
  const width = DOOR_X1 - DOOR_X0
  const height = DOOR_Y1 - DOOR_Y0
  return (
    <group ref={hinge} position={[DOOR_X0, (DOOR_Y0 + DOOR_Y1) / 2, Z1]}>
      {[0.52, 0, -0.52].map(y => (
        <mesh key={y} position={[0, y, 0]} material={metal}>
          <cylinderGeometry args={[0.022, 0.022, 0.1, 10]} />
        </mesh>
      ))}
      <group position={[width / 2, 0, 0.03]}>
        <RoundedBox args={[width - 0.02, height - 0.02, 0.045]} radius={0.02} smoothness={2} material={paint} />
        <mesh position={[0, 0.28, 0.028]} material={ink}>
          <boxGeometry args={[1.35, 0.48, 0.012]} />
        </mesh>
        <mesh position={[0, 0.28, 0.036]} material={glass}>
          <planeGeometry args={[1.24, 0.38]} />
        </mesh>
        <mesh position={[0, 2.18 - (DOOR_Y0 + DOOR_Y1) / 2, 0.03]} material={stripeMat}>
          <boxGeometry args={[width - 0.04, 0.07, 0.01]} />
        </mesh>
        <mesh position={[width / 2 - 0.12, -0.05, 0.04]} material={metal}>
          <boxGeometry args={[0.025, 0.22, 0.03]} />
        </mesh>
      </group>
    </group>
  )
}

function Cab() {
  return (
    <group>
      <RoundedBox args={[1.95, 1.32, 2.16]} radius={0.09} smoothness={5} position={[2.58, 1.78, 0]} material={paint} />
      <RoundedBox args={[0.62, 0.38, 2.02]} radius={0.04} smoothness={2} position={[3.62, 1.22, 0]} material={paint} />
      <mesh position={[3.42, 2.08, 0]} rotation={[0, 0, -0.48]} material={ink}>
        <boxGeometry args={[0.86, 0.05, 1.92]} />
      </mesh>
      <mesh position={[3.4, 2.1, 0]} rotation={[0, 0, -0.48]} material={glass}>
        <boxGeometry args={[0.74, 0.02, 1.78]} />
      </mesh>
      {[-0.22, 0.22].map(offset => (
        <mesh key={offset} position={[3.28, 2.02, offset]} rotation={[0, 0, -0.48]} material={ink}>
          <boxGeometry args={[0.62, 0.012, 0.012]} />
        </mesh>
      ))}
      <mesh position={[2.55, 1.95, 1.09]} material={ink}>
        <boxGeometry args={[1.05, 0.52, 0.03]} />
      </mesh>
      <mesh position={[2.55, 1.95, 1.1]} material={glass}>
        <planeGeometry args={[0.92, 0.4]} />
      </mesh>
      <mesh position={[2.55, 1.95, -1.09]} rotation={[0, Math.PI, 0]} material={ink}>
        <boxGeometry args={[1.05, 0.52, 0.03]} />
      </mesh>
      <mesh position={[2.55, 1.95, -1.1]} rotation={[0, Math.PI, 0]} material={glass}>
        <planeGeometry args={[0.92, 0.4]} />
      </mesh>
      <mesh position={[3.72, 1.22, 0]} material={ink}>
        <boxGeometry args={[0.04, 0.22, 1.15]} />
      </mesh>
      {[-0.08, 0, 0.08].map(y => (
        <mesh key={y} position={[3.75, 1.22 + y, 0]} material={metal}>
          <boxGeometry args={[0.012, 0.018, 1.05]} />
        </mesh>
      ))}
      <Headlamp z={0.62} />
      <Headlamp z={-0.62} />
      <mesh position={[3.78, 0.98, 0]} material={cladding}>
        <boxGeometry args={[0.14, 0.16, 2.16]} />
      </mesh>
      <mesh position={[3.86, 0.98, 0]} material={ink}>
        <boxGeometry args={[0.01, 0.1, 0.42]} />
      </mesh>
      <Mirror z={1.16} />
      <Mirror z={-1.16} />
      <mesh position={[2.5, 1.32, 1.1]}>
        <boxGeometry args={[0.95, 0.38, 0.04]} />
        <meshStandardMaterial color="#0e1014" />
      </mesh>
    </group>
  )
}

function Headlamp({ z }: { z: number }) {
  return (
    <group position={[3.9, 1.32, z]}>
      <mesh rotation={[0, Math.PI / 2, 0]} material={metal}>
        <torusGeometry args={[0.085, 0.012, 8, 20]} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0.01, 0, 0]} material={lamp}>
        <circleGeometry args={[0.07, 20]} />
      </mesh>
      <mesh position={[0.01, -0.12, 0]} material={amber}>
        <boxGeometry args={[0.02, 0.045, 0.11]} />
      </mesh>
    </group>
  )
}

function Mirror({ z }: { z: number }) {
  const sign = Math.sign(z)
  return (
    <group position={[2.15, 2.15, z]}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={ink}>
        <cylinderGeometry args={[0.018, 0.018, 0.34, 8]} />
      </mesh>
      <mesh position={[0.04, 0.02, sign * 0.16]} material={ink}>
        <boxGeometry args={[0.08, 0.2, 0.28]} />
      </mesh>
      <mesh position={[0.07, 0.02, sign * 0.16]} material={glass}>
        <planeGeometry args={[0.02, 0.14]} />
      </mesh>
    </group>
  )
}

function Chassis() {
  return (
    <group>
      {[-0.62, 0.62].map(z => (
        <mesh key={z} position={[-0.35, 0.74, z]} material={ink}>
          <boxGeometry args={[7.7, 0.1, 0.07]} />
        </mesh>
      ))}
      {[-3.2, -1.6, 0.2, 2.2].map(x => (
        <mesh key={x} position={[x, 0.74, 0]} material={ink}>
          <boxGeometry args={[0.08, 0.08, 1.2]} />
        </mesh>
      ))}
      <mesh position={[-0.4, 0.62, 0]} rotation={[0, 0, Math.PI / 2]} material={cladding}>
        <cylinderGeometry args={[0.16, 0.16, 1.1, 20]} />
      </mesh>
      <mesh position={[-1.02, 0.88, 1.48]} material={metal}>
        <boxGeometry args={[0.9, 0.045, 0.32]} />
      </mesh>
      <mesh position={[-1.02, 0.64, 1.58]} material={metal}>
        <boxGeometry args={[0.9, 0.04, 0.2]} />
      </mesh>
    </group>
  )
}

function Wheels() {
  const axles = [2.48, -1.35, -2.62]
  return (
    <>
      {axles.map(x => (
        <mesh key={x} position={[x, 0.46, 0]} rotation={[Math.PI / 2, 0, 0]} material={ink}>
          <cylinderGeometry args={[0.035, 0.035, x > 0 ? 2.45 : 2.7, 10]} />
        </mesh>
      ))}
      <Wheel x={2.48} z={1.18} />
      <Wheel x={2.48} z={-1.18} />
      <Wheel x={-1.35} z={1.24} dual />
      <Wheel x={-1.35} z={-1.24} dual />
      <Wheel x={-2.62} z={1.24} dual />
      <Wheel x={-2.62} z={-1.24} dual />
      {[-1.35, -2.62].flatMap(x =>
        [Z1 + 0.045, Z0 - 0.045].map(z => (
          <mesh key={`arch-${x}-${z}`} position={[x, 1.24, z]}>
            <boxGeometry args={[1.2, 0.34, 0.02]} />
            <meshStandardMaterial color="#0e1014" />
          </mesh>
        )),
      )}
    </>
  )
}

function Wheel({ x, z, dual = false }: { x: number; z: number; dual?: boolean }) {
  const side = Math.sign(z) || 1
  return (
    <group position={[x, 0.46, 0]}>
      <Tire z={z} />
      {dual ? <Tire z={z - side * 0.28} /> : null}
    </group>
  )
}

function Tire({ z }: { z: number }) {
  const face = Math.sign(z) || 1
  return (
    <group position={[0, 0, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={rubber}>
        <cylinderGeometry args={[0.45, 0.45, 0.23, 32]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.475, 0.475, 0.15, 32]} />
        <meshStandardMaterial color="#0c0e12" roughness={1} />
      </mesh>
      <mesh position={[0, 0, face * 0.09]} material={rubber}>
        <torusGeometry args={[0.39, 0.05, 8, 24]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, face * 0.09]} material={metal}>
        <cylinderGeometry args={[0.24, 0.24, 0.035, 24]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, face * 0.1]} material={ink}>
        <cylinderGeometry args={[0.07, 0.07, 0.028, 16]} />
      </mesh>
      {Array.from({ length: 5 }).map((_, index) => {
        const angle = (index / 5) * Math.PI * 2
        return (
          <mesh
            key={index}
            position={[Math.sin(angle) * 0.1, Math.cos(angle) * 0.1, face * 0.1]}
            rotation={[0, 0, -angle]}
            material={metal}
          >
            <boxGeometry args={[0.025, 0.16, 0.01]} />
          </mesh>
        )
      })}
    </group>
  )
}

function Roof({
  dish,
  dishGeo,
  hot,
}: {
  dish: RefObject<Group | null>
  dishGeo: LatheGeometry
  hot: boolean
}) {
  return (
    <group>
      <Hvac position={[-2.85, 3.12, 0.48]} />
      <Hvac position={[-2.85, 3.12, -0.48]} />
      <group ref={dish} position={[-0.85, 3.16, 0]}>
        <mesh material={ink}>
          <boxGeometry args={[0.28, 0.1, 0.28]} />
        </mesh>
        <mesh position={[0, 0.16, 0]} material={metal}>
          <cylinderGeometry args={[0.035, 0.05, 0.28, 12]} />
        </mesh>
        <mesh geometry={dishGeo} material={hot ? dishLive : dishPaint} position={[0, 0.28, 0]} rotation={[0.42, 0, 0]} />
        <mesh position={[0, 0.4, 0]} rotation={[0.42, 0, 0]} material={metal}>
          <torusGeometry args={[0.57, 0.012, 8, 32]} />
        </mesh>
        <mesh position={[0, 0.46, 0.28]} material={ink}>
          <boxGeometry args={[0.015, 0.015, 0.32]} />
        </mesh>
        <mesh position={[0, 0.5, 0.42]} material={metal}>
          <boxGeometry args={[0.06, 0.05, 0.08]} />
        </mesh>
      </group>
      <mesh position={[0.85, 3.18, 0]} material={cladding}>
        <sphereGeometry args={[0.11, 20, 12]} />
      </mesh>
      {[0.35, 1.35].map(x => (
        <mesh key={x} position={[x, 3.22, -0.95]} material={metal}>
          <cylinderGeometry args={[0.01, 0.01, 0.48, 8]} />
        </mesh>
      ))}
      {[-3.4, -1.8, -0.2, 1.4].map(x => (
        <mesh key={x} position={[x, 3.08, 1.28]} material={amber}>
          <boxGeometry args={[0.08, 0.035, 0.05]} />
        </mesh>
      ))}
    </group>
  )
}

function Hvac({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.78, 0.24, 0.58]} radius={0.03} smoothness={2} material={cladding} />
      <mesh position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]} material={ink}>
        <circleGeometry args={[0.16, 20]} />
      </mesh>
      <mesh position={[0, 0.135, 0]} rotation={[-Math.PI / 2, 0, 0]} material={metal}>
        <torusGeometry args={[0.1, 0.008, 6, 16]} />
      </mesh>
    </group>
  )
}

function Rear({ power, cable }: { power: boolean; cable: boolean }) {
  return (
    <group position={[X0 - 0.02, 0, 0]}>
      {[-0.72, 0.72].map(z => (
        <group key={z} position={[0, 1.55, z]}>
          <mesh position={[0, 0.08, 0]} material={tail}>
            <boxGeometry args={[0.025, 0.1, 0.22]} />
          </mesh>
          <mesh position={[0, -0.06, 0]} material={amber}>
            <boxGeometry args={[0.02, 0.05, 0.16]} />
          </mesh>
        </group>
      ))}
      <mesh position={[-0.04, 1.05, 0]} material={cladding}>
        <boxGeometry args={[0.08, 0.18, 2.2]} />
      </mesh>
      <mesh position={[-0.2, 1.35, 0.85]}>
        <boxGeometry args={[0.36, 0.62, 0.42]} />
        <meshStandardMaterial
          color="#2a2e36"
          metalness={0.4}
          roughness={0.4}
          emissive={BLUE}
          emissiveIntensity={power ? 0.7 : 0.04}
        />
      </mesh>
      {[-0.15, 0.22, 0.58].map(z => (
        <group key={z} position={[-0.16, 1.05, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 24]} />
            <meshStandardMaterial color="#3a404c" metalness={0.45} roughness={0.4} emissive={BLUE} emissiveIntensity={cable ? 0.4 : 0} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.26, 0.26, 0.03, 24]} />
            <meshStandardMaterial color={cable ? BLUE : '#2a2e36'} metalness={0.3} roughness={0.45} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Gallery({
  open,
  screensHot,
  audioHot,
  replayHot,
}: {
  open: boolean
  screensHot: boolean
  audioHot: boolean
  replayHot: boolean
}) {
  const screen = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#07101f',
        emissive: new Color(BLUE),
        emissiveIntensity: 0.35,
        toneMapped: false,
      }),
    [],
  )
  const ceiling = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#fff4e0',
        emissive: new Color('#fff1d4'),
        emissiveIntensity: 0.2,
        toneMapped: false,
        side: DoubleSide,
      }),
    [],
  )

  useFrame(() => {
    screen.emissiveIntensity += ((screensHot ? 2.2 : 0.45) - screen.emissiveIntensity) * 0.08
    ceiling.emissiveIntensity += ((open ? 1.7 : 0.15) - ceiling.emissiveIntensity) * 0.08
  })

  return (
    <group>
      <mesh position={[-1.05, 2.84, 0]} rotation={[Math.PI / 2, 0, 0]} material={ceiling}>
        <planeGeometry args={[2.4, 0.16]} />
      </mesh>
      {[-1.7, -1.05, -0.4, 0.25].map(x =>
        [0.42, -0.08].map(y => (
          <group key={`${x}-${y}`} position={[x, 1.95 + y, -0.72]}>
            <mesh>
              <boxGeometry args={[0.52, 0.32, 0.04]} />
              <meshStandardMaterial color="#0c0e12" metalness={0.6} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0, 0.024]} material={screen}>
              <planeGeometry args={[0.44, 0.24]} />
            </mesh>
          </group>
        )),
      )}
      <mesh position={[-0.7, 1.48, 0.15]}>
        <boxGeometry args={[1.15, 0.06, 0.42]} />
        <meshStandardMaterial color="#2a2e36" metalness={0.55} roughness={0.32} emissive={BLUE} emissiveIntensity={audioHot ? 0.65 : 0.03} />
      </mesh>
      {Array.from({ length: 8 }).map((_, index) => (
        <mesh key={index} position={[-0.25 + index * 0.07, 1.52, 0.32]} material={ink}>
          <boxGeometry args={[0.012, 0.1, 0.02]} />
        </mesh>
      ))}
      {[0, 1, 2, 3, 4].map(index => (
        <mesh key={index} position={[-1.85, 1.42 + index * 0.16, 0.35]}>
          <boxGeometry args={[0.34, 0.1, 0.28]} />
          <meshStandardMaterial
            color="#1c2028"
            metalness={0.4}
            roughness={0.4}
            emissive={replayHot ? '#ff3b30' : BLUE}
            emissiveIntensity={replayHot ? 0.85 : 0.08}
          />
        </mesh>
      ))}
    </group>
  )
}

function BroadcastCamera({ index }: { index: number }) {
  const x = -2.2 + (index % 6) * 0.72
  const z = 2.35 + Math.floor(index / 6) * 0.7
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.62, 0]} material={ink}>
        <cylinderGeometry args={[0.018, 0.026, 1.2, 8]} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]} material={ink}>
        <cylinderGeometry args={[0.012, 0.012, 0.48, 8]} />
      </mesh>
      <mesh position={[0.2, 1.18, 0]} rotation={[0, 0, 0.4]} material={ink}>
        <cylinderGeometry args={[0.008, 0.008, 0.28, 6]} />
      </mesh>
      <mesh position={[0, 1.28, 0]} material={paint}>
        <boxGeometry args={[0.18, 0.14, 0.26]} />
      </mesh>
      <mesh position={[0, 1.28, 0.22]} rotation={[Math.PI / 2, 0, 0]} material={ink}>
        <cylinderGeometry args={[0.05, 0.07, 0.22, 16]} />
      </mesh>
      <mesh position={[0, 1.28, 0.34]} rotation={[Math.PI / 2, 0, 0]} material={rubber}>
        <torusGeometry args={[0.055, 0.012, 6, 12]} />
      </mesh>
      <mesh position={[0.08, 1.4, -0.06]} material={stripeMat}>
        <boxGeometry args={[0.07, 0.05, 0.08]} />
      </mesh>
    </group>
  )
}

function SystemCallout({ system }: { system: ObVanSystem }) {
  const place: Record<string, [number, number, number]> = {
    vision: [-1, 2.85, 1.85],
    cameras: [0.4, 1.85, 3.3],
    lenses: [0.4, 1.85, 3.3],
    support: [0.4, 1.85, 3.3],
    replay: [-1.7, 2.35, 1.7],
    monitoring: [-1, 2.85, 1.85],
    intercom: [-0.8, 2.4, 1.7],
    sync: [-0.8, 2.4, 1.7],
    audio: [-0.6, 1.95, 1.75],
    rf: [-0.85, 4.05, 0],
    power: [-4.7, 2.15, 0.9],
    cabling: [-4.7, 1.45, 0.4],
  }
  const position = place[system.id] ?? [0, 2.4, 2]
  const lead = system.items[0]

  return (
    <Html position={position} center distanceFactor={9} zIndexRange={[30, 0]} wrapperClass="pointer-events-none">
      <div className="w-52 border border-white/15 bg-[#0c0e14]/85 px-3 py-2.5 backdrop-blur-md">
        <p className="text-[10px] font-medium tracking-[0.16em] text-white/50 uppercase">{system.label}</p>
        <p className="mt-1 text-[12px] leading-snug font-light text-white">{lead?.title}</p>
      </div>
    </Html>
  )
}
