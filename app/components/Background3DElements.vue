<template>
  <!-- Pyramids -->
  <TresMesh v-for="(p, index) in pyramids" :key="'pyr'+index" :ref="el => setPyramidRef(el, index)" :position="p.anchor" :rotation="[0,0,0]">
    <TresConeGeometry :args="[p.radius, p.height, 4]" />
    <TresMeshStandardMaterial color="#C5A059" :roughness="0.4" :metalness="0.7" />
  </TresMesh>

  <!-- Cubes -->
  <TresMesh v-for="(c, index) in cubes" :key="'cube'+index" :ref="el => setCubeRef(el, index)" :position="c.anchor" :rotation="[0,0,0]">
    <TresBoxGeometry :args="[c.size, c.size, c.size]" />
    <TresMeshStandardMaterial color="#D4AF37" :roughness="0.2" :metalness="0.9" />
  </TresMesh>

  <!-- Paper Planes -->
  <TresGroup v-for="(plane, index) in planes" :key="'plane'+index" :ref="el => setPlaneRef(el, index)" :visible="false">
    <PaperPlane :scale="[1.2, 1.2, 1.2]" /> <!-- Significantly scaled up -->
  </TresGroup>

  <!-- Dotted Trails -->
  <TresMesh v-for="(dot, index) in trailDots" :key="'dot'+index" :ref="el => setDotRef(el, index)" :visible="false">
    <TresSphereGeometry :args="[0.1, 4, 4]" />
    <TresMeshBasicMaterial color="#ffffff" :transparent="true" :opacity="0.8" />
  </TresMesh>
</template>

<script setup>
import { useLoop } from '@tresjs/core'
import { Vector3 } from 'three'

const pyramids = [
  { anchor: [4, -2, -2], radius: 0.8, height: 1.5, speed: 0.4, phase: 0 },
  { anchor: [-5, 3, -4], radius: 1.2, height: 2, speed: 0.25, phase: Math.PI / 2 },
  { anchor: [2, 5, -6], radius: 0.6, height: 1.2, speed: 0.6, phase: Math.PI },
  { anchor: [-7, -3, -5], radius: 1.5, height: 2.5, speed: 0.15, phase: Math.PI / 1.5 }
]

const cubes = [
  { anchor: [-3, -4, -3], size: 1.2, speed: 0.35, phase: Math.PI / 3 },
  { anchor: [6, 4, -5], size: 1.8, speed: 0.2, phase: Math.PI / 1.5 },
  { anchor: [-1, 1, -1], size: 0.6, speed: 0.5, phase: Math.PI * 1.5 }
]

// Pool of planes for occasional spawning
const planes = [
  { active: false, velocity: new Vector3(), life: 0, lastDotTime: 0 },
  { active: false, velocity: new Vector3(), life: 0, lastDotTime: 0 },
  { active: false, velocity: new Vector3(), life: 0, lastDotTime: 0 }
]

// Pool of 150 trail dots
const trailDots = new Array(150).fill(null).map(() => ({ active: false, life: 0 }))

const pyramidRefs = []
const setPyramidRef = (el, index) => {
  if (el) pyramidRefs[index] = el
}

const cubeRefs = []
const setCubeRef = (el, index) => {
  if (el) cubeRefs[index] = el
}

const planeRefs = []
const setPlaneRef = (el, index) => {
  if (el) planeRefs[index] = el
}

const dotRefs = []
const setDotRef = (el, index) => {
  if (el) dotRefs[index] = el
}

let lastSpawnTime = 0
const spawnInterval = 3 // seconds between spawn attempts

const spawnPlane = (elapsed, mesh, planeData) => {
  planeData.active = true
  planeData.life = 0
  planeData.lastDotTime = elapsed
  mesh.visible = true
  
  // Random start position (deep in background, top left or right)
  const startX = (Math.random() > 0.5 ? -15 : 15) + (Math.random() * 5 - 2.5)
  const startY = 10 + Math.random() * 5
  const startZ = -20 - Math.random() * 10
  
  mesh.position.set(startX, startY, startZ)
  
  // Target position (foreground, opposite side, bottom)
  const targetX = -startX * 0.8 + (Math.random() * 10 - 5)
  const targetY = -10 - Math.random() * 5
  const targetZ = 5 + Math.random() * 5 // Brings it close to camera!
  
  const targetPos = new Vector3(targetX, targetY, targetZ)
  
  // Calculate velocity vector
  planeData.velocity.subVectors(targetPos, mesh.position).normalize().multiplyScalar(4 + Math.random() * 3)
  
  // Orient plane towards target
  mesh.lookAt(targetPos)
  // Give it a slight playful bank angle
  mesh.rotateZ(Math.random() * 0.5 - 0.25)
}

const spawnDot = (pos) => {
  const inactiveIndex = trailDots.findIndex(d => !d.active)
  if (inactiveIndex !== -1 && dotRefs[inactiveIndex]) {
    const dotData = trailDots[inactiveIndex]
    const mesh = dotRefs[inactiveIndex]
    
    dotData.active = true
    dotData.life = 0
    mesh.visible = true
    mesh.position.copy(pos)
    mesh.scale.set(1, 1, 1)
    if (mesh.material) mesh.material.opacity = 0.8
  }
}

const { onRender } = useLoop()

onRender(({ delta, elapsed }) => {
  // Animate Pyramids
  pyramidRefs.forEach((mesh, i) => {
    if (!mesh) return
    const p = pyramids[i]
    mesh.rotation.x += delta * p.speed
    mesh.rotation.y += delta * p.speed * 1.5
    
    mesh.position.x = p.anchor[0] + Math.sin(elapsed * p.speed + p.phase) * 3
    mesh.position.y = p.anchor[1] + Math.cos(elapsed * p.speed * 0.8 + p.phase) * 2.5
    mesh.position.z = p.anchor[2] + Math.sin(elapsed * p.speed * 0.5 + p.phase) * 2
  })
  
  // Animate Cubes
  cubeRefs.forEach((mesh, i) => {
    if (!mesh) return
    const c = cubes[i]
    mesh.rotation.y += delta * c.speed
    mesh.rotation.z += delta * c.speed * 1.2
    
    mesh.position.x = c.anchor[0] + Math.cos(elapsed * c.speed + c.phase) * 4
    mesh.position.y = c.anchor[1] + Math.sin(elapsed * c.speed * 0.9 + c.phase) * 3
    mesh.position.z = c.anchor[2] + Math.cos(elapsed * c.speed * 0.4 + c.phase) * 1.5
  })
  
  // Spawn and Animate Paper Planes
  if (elapsed - lastSpawnTime > spawnInterval) {
    if (Math.random() > 0.5) { // 50% chance to spawn when interval hits
      const inactiveIndex = planes.findIndex(p => !p.active)
      if (inactiveIndex !== -1 && planeRefs[inactiveIndex]) {
        spawnPlane(elapsed, planeRefs[inactiveIndex], planes[inactiveIndex])
      }
    }
    lastSpawnTime = elapsed
  }
  
  planeRefs.forEach((mesh, i) => {
    if (!mesh) return
    const p = planes[i]
    if (p.active) {
      // Move along velocity vector
      mesh.position.x += p.velocity.x * delta
      mesh.position.y += p.velocity.y * delta
      mesh.position.z += p.velocity.z * delta
      
      // Add a slight swoop/wobble over time
      mesh.position.y += Math.sin(elapsed * 2) * delta * 0.5
      mesh.rotation.z += Math.cos(elapsed * 3) * delta * 0.2
      
      // Spawn trail dots every 0.1 seconds
      if (elapsed - p.lastDotTime > 0.1) {
        spawnDot(mesh.position)
        p.lastDotTime = elapsed
      }
      
      p.life += delta
      if (p.life > 10) { // Despawn after 10 seconds of flight
        p.active = false
        mesh.visible = false
      }
    }
  })
  
  // Animate Trail Dots
  dotRefs.forEach((mesh, i) => {
    if (!mesh) return
    const d = trailDots[i]
    if (d.active) {
      d.life += delta
      if (d.life > 3) { // Despawn dot after 3 seconds
        d.active = false
        mesh.visible = false
      } else {
        // Shrink and fade out over 3 seconds
        const scale = Math.max(0.01, 1 - (d.life / 3))
        mesh.scale.set(scale, scale, scale)
        if (mesh.material) mesh.material.opacity = 0.8 * scale
      }
    }
  })
})
</script>
