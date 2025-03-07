import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Torus, Cylinder, Cone } from "@react-three/drei";
import * as THREE from "three";

// Componente para una figura individual con movimiento, rotación y tamaño personalizados
const Figure = ({ type, color, position, rotationSpeed = 0, moveSpeed = 0, scale = [1, 1, 1], rotationAxis = "all" }) => {
  const ref = useRef();
  const direction = useRef(1); // Para cambiar la dirección del movimiento

  useFrame(() => {
    if (ref.current) {
      // Rotación personalizada según el eje especificado
      if (rotationAxis === "x" || rotationAxis === "all") {
        ref.current.rotation.x += rotationSpeed;
      }
      if (rotationAxis === "y" || rotationAxis === "all") {
        ref.current.rotation.y += rotationSpeed;
      }
      if (rotationAxis === "z" || rotationAxis === "all") {
        ref.current.rotation.z += rotationSpeed * 0.5;
      }

      // Movimiento de lado a lado
      if (moveSpeed) {
        ref.current.position.x += moveSpeed * direction.current;
        if (Math.abs(ref.current.position.x - position[0]) > 1.5) {
          direction.current *= -1; // Cambia la dirección al llegar al límite
        }
      }
    }
  });

  let geometry;
  switch (type) {
    case "TorusKnot":
      geometry = <torusKnotGeometry args={[0.7, 0.2, 128, 32]} />;
      break;
    case "Octahedron":
      geometry = <octahedronGeometry args={[1]} />;
      break;
    case "Dodecahedron":
      geometry = <dodecahedronGeometry args={[1]} />;
      break;
    case "Icosahedron":
      geometry = <icosahedronGeometry args={[1]} />;
      break;
    default:
      geometry = <sphereGeometry args={[1, 32, 32]} />;
  }

  return (
    <mesh ref={ref} position={position} scale={scale} castShadow receiveShadow>
      {geometry}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Componente para la mesa con barreras
const Plane = () => {
  return (
    <>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
      {/* Barreras alrededor */}
      {[
        { pos: [0, 1, 10], size: [22, 2, 1] },
        { pos: [0, 1, -10], size: [22, 2, 1] },
        { pos: [-10, 1, 0], size: [20, 2, 1], rot: [0, Math.PI / 2, 0] },
        { pos: [10, 1, 0], size: [20, 2, 1], rot: [0, Math.PI / 2, 0] },
      ].map((b, i) => (
        <mesh key={i} position={b.pos} rotation={b.rot || [0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color="gray" />
        </mesh>
      ))}
    </>
  );
};

// Componente principal
const Lab_3 = () => {
  const groups = [
    {
      position: [-6.0, 0, -6.5],
      figures: [
        { type: "TorusKnot", color: 0xff0000, position: [0, 1, 0], rotationSpeed: 0.1, moveSpeed: 0.02, scale: [0.8, 0.8, 0.8], rotationAxis: "all" },
        { type: "Icosahedron", color: 0x0000ff, position: [2, 1, 0], rotationSpeed: 0.05, scale: [1, 1, 1], rotationAxis: "y" },
        { type: "Dodecahedron", color: 0x800080, position: [-2, 1, 0], rotationSpeed: 0.2, scale: [1, 1, 1], rotationAxis: "z" },
      ],
    },
    {
      position: [-3, 0, 0.2],
      figures: [
        { type: "Octahedron", color: 0xffff00, position: [0, 1, 0], rotationSpeed: 0.15, scale: [1.2, 1.2, 1.2], rotationAxis: "x" },
        { type: "TorusKnot", color: 0x008000, position: [2, 1, 2], moveSpeed: 0.03, scale: [0.7, 0.7, 0.7] },
        { type: "Icosahedron", color: 0xffa500, position: [-2, 1, -2], rotationSpeed: 0.1, scale: [0.8, 0.8, 0.8], rotationAxis: "all" },
      ],
    },
    {
      position: [5.5, 0, -5.5],
      figures: [
        { type: "Dodecahedron", color: 0xff69b4, position: [0, 1, 0], rotationSpeed: 0.25, scale: [1, 1, 1], rotationAxis: "all" },
        { type: "Octahedron", color: 0x00ffff, position: [2, 1, 2], moveSpeed: 0.05, scale: [1.2, 1.2, 1.2] },
        { type: "TorusKnot", color: 0xff00ff, position: [-2, 1, -2], rotationSpeed: 0.08, scale: [0.7, 0.7, 0.7], rotationAxis: "y" },
      ],
    },
    {
      position: [-6.5, 0, 5.5],
      figures: [
        { type: "Icosahedron", color: 0x00ff00, position: [0, 1, 0], moveSpeed: 0.04, scale: [1.1, 1.1, 1.1] },
        { type: "Dodecahedron", color: 0xff4500, position: [2, 1, 2], rotationSpeed: 0.12, scale: [1, 1, 1], rotationAxis: "z" },
        { type: "Octahedron", color: 0x8a2be2, position: [-2, 1, -2], rotationSpeed: 0.2, scale: [1.2, 1.2, 1.2], rotationAxis: "all" },
      ],
    },
    {
      position: [5.0, 0, 5.0],
      figures: [
        { type: "TorusKnot", color: 0x4b0082, position: [0, 1, 0], rotationSpeed: 0.07, scale: [0.8, 0.8, 0.8], rotationAxis: "x" },
        { type: "Icosahedron", color: 0xff1493, position: [2, 1, 2], moveSpeed: 0.02, scale: [1, 1, 1] },
        { type: "Dodecahedron", color: 0x1e90ff, position: [-2, 1, -2], rotationSpeed: 0.15, scale: [1, 1, 1], rotationAxis: "y" },
      ],
    },
  ];

  return (
    <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <Plane />
      {groups.map((group, groupIndex) => (
        <group key={groupIndex} position={group.position}>
          {group.figures.map((figure, figureIndex) => (
            <Figure key={figureIndex} {...figure} />
          ))}
        </group>
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default Lab_3;