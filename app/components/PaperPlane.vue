<template>
  <TresMesh :geometry="geometry">
    <TresMeshStandardMaterial 
      color="#F4F1EA" 
      :roughness="0.7" 
      :metalness="0.1" 
      :side="2" 
      transparent 
      :opacity="0.85" 
    />
  </TresMesh>
</template>

<script setup>
import { BufferAttribute, BufferGeometry } from 'three'

// 2 in Three.js corresponds to THREE.DoubleSide
// We use a low-poly paper plane geometry pointing towards +Z axis
const vertices = new Float32Array([
  // left wing
  0, 0, 2,   -1, 0.4, -1,   0, 0, -0.5,
  // right wing
  0, 0, 2,   0, 0, -0.5,    1, 0.4, -1,
  // bottom fin
  0, 0, 2,   0, -0.6, -1,   0, 0, -0.5
])

const geometry = new BufferGeometry()
geometry.setAttribute('position', new BufferAttribute(vertices, 3))
geometry.computeVertexNormals()
</script>
