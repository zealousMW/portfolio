"use client";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, TrackballControls } from "@react-three/drei";
import { generate } from "random-words";

type WordProps = {
  encrypted: string;
  original: string;
  position: THREE.Vector3;
};

function Word({ encrypted, original, position }: WordProps) {
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 4,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  // Animation: store a local position and a random phase for each word
  const meshRef = useRef<any>();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  const over = (e: any) => {
    e.stopPropagation();
    setHovered(true);
  };
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.color.lerp(
        color.set(hovered ? "#fa2720" : "white"),
        0.1
      );
    }
    // Animate position with a floating effect
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.x = position.x + Math.sin(t + phase) * 0.7;
      meshRef.current.position.y = position.y + Math.cos(t + phase) * 0.7;
      meshRef.current.position.z = position.z + Math.sin(t * 0.7 + phase) * 0.7;
    }
  });

  return (
    <Billboard ref={meshRef} position={position}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => setShowOriginal((v) => !v)}
        {...fontProps}
      >
        {showOriginal ? original : encrypted}
      </Text>
    </Billboard>
  );
}

type CloudProps = {
  count?: number;
  radius?: number;
};

function caesarEncrypt(str: string, shift: number = 3) {
  return str.replace(/[a-z]/gi, (c) => {
    const base = c >= "a" && c <= "z" ? 97 : 65;
    return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
  });
}

function Cloud({ count = 4, radius = 20 }: CloudProps) {
  const words = useMemo(() => {
    const temp: { position: THREE.Vector3; original: string; encrypted: string }[] = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    const randomWords: string[] = generate(count * count) as string[];
    let wordIndex = 0;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++) {
        const original = randomWords[wordIndex % randomWords.length];
        const encrypted = caesarEncrypt(original);
        temp.push({
          position: new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          original,
          encrypted,
        });
        wordIndex++;
      }
    return temp;
  }, [count, radius]);
  return (
    <>
      {words.map((w, index) => (
        <Word key={index} position={w.position} encrypted={w.encrypted} original={w.original} />
      ))}
    </>
  );
}

export default function Page() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        zIndex: 20,
        background: "transparent",
      }}
    >
      <Canvas
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          background: "transparent",
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 60], fov: 90 }}
      >
        <fog attach="fog" args={["#202025", 0, 120]} />
        <Suspense fallback={null}>
          <group rotation={[10, 10.5, 10]}>
            <Cloud count={10} radius={20} />
          </group>
        </Suspense>
        <TrackballControls />
      </Canvas>
    </div>
  );
}
