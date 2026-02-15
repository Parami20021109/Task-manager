import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function NeonDust(props) {
    const ref = useRef();
    const [sphere] = random.inSphere(new Float32Array(3000), { radius: 1.2 });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#bc13fe" // Neon Purple
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

function GridFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[20, 20, 20, 20]} />
            <meshBasicMaterial color="#00f3ff" wireframe transparent opacity={0.1} />
        </mesh>
    );
}

const Background3D = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#1a0b2e]/30" />

            <Canvas camera={{ position: [0, 0, 2] }}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <NeonDust />
                </Float>
                <GridFloor />
            </Canvas>
        </div>
    );
};

export default Background3D;
