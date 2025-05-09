'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CosmicSphere() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const width = 800;
    const height = 600;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;


    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        float noise = sin(8.0 * vPosition.x + time) * sin(8.0 * vPosition.y + time) * sin(8.0 * vPosition.z + time);
        noise = 0.5 + 0.5 * noise;
        vec3 color = mix(color1, color2, noise);
        color = mix(color, color3, length(vPosition) / 2.0);
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        color = mix(color, vec3(1.0), fresnel * 0.7);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const sphereGeometry = new THREE.SphereGeometry(1.5, 128, 128);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x3366ff) },
        color2: { value: new THREE.Color(0x00ffcc) },
        color3: { value: new THREE.Color(0x9900ff) }
      },
      vertexShader,
      fragmentShader,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const glowGeometry = new THREE.SphereGeometry(1.65, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.15,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    const particleCount = 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI;
      const radius = 1.7 + Math.random() * 0.8;
      particlePositions.set([
        radius * Math.sin(angle2) * Math.cos(angle1),
        radius * Math.sin(angle2) * Math.sin(angle1),
        radius * Math.cos(angle2)
      ], i * 3);
      particleSizes[i] = Math.random() * 0.05 + 0.01;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    const addRing = (radius: number, color: number, thickness: number, segments = 128, rotationSpeed = 0.0005) => {
      const ringGeometry = new THREE.TorusGeometry(radius, thickness, 2, segments);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + Math.random() * 0.5;
      ring.rotation.y = Math.random() * Math.PI;
      ring.userData = {
        rotationSpeedX: rotationSpeed * (Math.random() * 0.5 + 0.5),
        rotationSpeedY: rotationSpeed * (Math.random() * 0.5 + 0.5),
        rotationSpeedZ: rotationSpeed * (Math.random() * 0.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1)
      };
      scene.add(ring);
      return ring;
    };

    const ring1 = addRing(2.2, 0x00ffff, 0.02, 128, 0.0003);
    const ring2 = addRing(2.5, 0x9900ff, 0.01, 128, 0.0002);
    const ring3 = addRing(1.9, 0x0088ff, 0.015, 128, 0.0004);

    scene.add(new THREE.AmbientLight(0x404040));

    const light1 = new THREE.PointLight(0x0088ff, 1, 10);
    light1.position.set(2, 2, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x9900ff, 0.5, 10);
    light2.position.set(-2, -2, -2);
    scene.add(light2);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;
      setMousePosition({ x, y });
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      sphereMaterial.uniforms.time.value = time;

      [ring1, ring2, ring3].forEach((ring) => {
        ring.rotation.x += ring.userData.rotationSpeedX;
        ring.rotation.y += ring.userData.rotationSpeedY;
        ring.rotation.z += ring.userData.rotationSpeedZ;
      });

      sphere.rotation.y += 0.0008;
      sphere.rotation.x += 0.0004;

      const pos = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pos[idx] += Math.sin(time * 0.3 + i * 0.1) * 0.001;
        pos[idx + 1] += Math.cos(time * 0.2 + i * 0.05) * 0.001;
        pos[idx + 2] += Math.sin(time * 0.15 + i * 0.2) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      const pulse = Math.sin(time * 0.3) * 0.5 + 0.5;
      sphereMaterial.uniforms.color2.value.setRGB(0, 0.8 + pulse * 0.15, 0.8 + pulse * 0.15);
      glowSphere.material.opacity = 0.2 + pulse * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      sphereGeometry.dispose();
      particlesGeometry.dispose();
      glowGeometry.dispose();
      sphereMaterial.dispose();
      particleMaterial.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div ref={containerRef} className="w-full h-full" />
      <div className="mt-4 text-center">
        <p className="text-xl font-bold text-blue-500 mb-2">Cosmic Sphere</p>
        <p className="text-gray-600">A mesmerizing sphere with slowly orbiting rings</p>
      </div>
    </div>
  );
}
