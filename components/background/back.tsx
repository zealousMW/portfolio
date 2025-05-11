"use client"
import { useState, useRef, Suspense } from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { div, p } from "framer-motion/client";


const Starbackground = () => {
     const ref: any = useRef(null);
     const [sphere] = useState(() =>
        new Float32Array(
            Array.from({ length: 1000 * 3 }, () => Math.random() * 2 - 1)
        )
     );
     useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
     });
    return(
        <group rotation={[0, 0, Math.PI / 4]} >
            <Points ref={ref} positions={sphere} stride={3} frustumCulled >
                <PointMaterial transparent color="#f272c8" size={0.005} sizeAttenuation depthWrite={false} />
            </Points>
        </group>
    );
}

const StarCanvas = () => {
    return(
        <div className="w-full h-auto fixed inset-0 z-[20]">
        <Canvas camera={{position: [0, 0, 1]}}>
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Preload all />}>
                <Starbackground />
            </Suspense>
        </Canvas>
    </div>
    )
        
    
}

export default StarCanvas;