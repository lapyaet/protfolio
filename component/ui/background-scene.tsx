"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Where the 3D "hero object" sits for each route. x is a fraction of the
 * visible half-width, so layouts stay balanced on any screen size.
 */
const POSES: Record<string, { x: number; y: number; z: number; s: number; ry: number }> = {
  "/": { x: 0.55, y: 0, z: 0, s: 1, ry: 0 },
  "/about": { x: -0.55, y: 0, z: -0.5, s: 0.95, ry: 1.2 },
  "/projects": { x: 0, y: 0, z: -6, s: 1, ry: 2.4 },
  "/services": { x: 0.6, y: 0.1, z: -1.5, s: 0.9, ry: 3.6 },
  "/contact": { x: -0.5, y: 0, z: -0.5, s: 1, ry: 4.8 },
};

const orbVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;
  void main() {
    float n = sin(position.x * 2.1 + uTime * 0.9)
            * sin(position.y * 2.3 + uTime * 0.7)
            * sin(position.z * 2.5 + uTime * 0.8);
    vNoise = n;
    vec3 p = position + normal * n * 0.28;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const orbFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;
  void main() {
    float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.2);
    vec3 deep = vec3(0.08, 0.05, 0.28);
    vec3 violet = vec3(0.55, 0.36, 0.96);
    vec3 cyan = vec3(0.25, 0.8, 1.0);
    vec3 col = mix(deep, violet, 0.5 + vNoise * 0.9);
    col = mix(col, cyan, fres * 0.8);
    col += fres * 0.35;
    gl_FragColor = vec4(col, 0.92);
  }
`;

function Orb() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh>
      <icosahedronGeometry args={[1.35, 12]} />
      <shaderMaterial
        ref={mat}
        vertexShader={orbVertex}
        fragmentShader={orbFragment}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

const SYMBOLS = ["</>", "{ }", "( )", "[ ]", "=>", "#", ";", "&&", "/*", "<div>", "$", "01"];
const COLORS = ["#8b5cf6", "#6366f1", "#a855f7", "#0891b2", "#22d3ee"];

/** Draws a glowing code symbol to a canvas and returns it as a texture. */
function makeSymbolTexture(text: string, color: string) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.font = `700 ${text.length > 3 ? 39 : 55}px ui-monospace, Menlo, Consolas, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillText(text, size / 2, size / 2);
  ctx.fillText(text, size / 2, size / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function useSymbolTextures() {
  const textures = useMemo(
    () =>
      SYMBOLS.map((sym, i) => makeSymbolTexture(sym, COLORS[i % COLORS.length])),
    []
  );
  return textures;
}

/** Soft dot particles drifting in space. */
function Particles({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

/** Larger code symbols orbiting the orb. */
function Floaters() {
  const textures = useSymbolTextures();
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  const items = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        r: 2.3 + (i % 3) * 0.5,
        speed: 0.22 + i * 0.04,
        phase: (i / 8) * Math.PI * 2,
        tilt: (i - 4) * 0.18,
        tex: i % textures.length,
      })),
    [textures.length]
  );
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    items.forEach((it, i) => {
      const m = refs.current[i];
      if (!m) return;
      const a = t * it.speed + it.phase;
      m.position.set(
        Math.cos(a) * it.r,
        Math.sin(a * 1.3) * 0.9 + it.tilt,
        Math.sin(a) * it.r
      );
    });
  });
  return (
    <>
      {items.map((it, i) => (
        <sprite
          key={i}
          ref={(el) => void (refs.current[i] = el)}
          scale={[0.9, 0.9, 1]}
        >
          <spriteMaterial map={textures[it.tex]} transparent depthWrite={false} />
        </sprite>
      ))}
    </>
  );
}

function Rig() {
  const pathname = usePathname();
  const group = useRef<THREE.Group>(null);
  const world = useRef<THREE.Group>(null);
  const dots = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // How far the page is scrolled, 0 to 1 (target, then smoothed value).
  const scrollTarget = useRef(0);
  const scroll = useRef(0);

  useEffect(() => {
    scrollTarget.current = 0;
    // Pages scroll inside their own element, so listen during capture.
    const onScroll = (e: Event) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      const range = el.scrollHeight - el.clientHeight;
      if (range > 0) scrollTarget.current = el.scrollTop / range;
    };
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () =>
      window.removeEventListener("scroll", onScroll, { capture: true });
  }, [pathname]);

  useFrame(({ pointer, clock }, delta) => {
    const pose = POSES[pathname] ?? POSES["/"];
    const mobile = viewport.width < 6;
    const tx = mobile ? 0 : pose.x * (viewport.width / 2);
    const ty = mobile ? -1.4 : pose.y;
    scroll.current = THREE.MathUtils.damp(scroll.current, scrollTarget.current, 4, delta);
    const p = scroll.current;
    // The orb sweeps across and recedes; the dots rise slower behind it.
    const sweepX = Math.sin(p * Math.PI * 2) * viewport.width * 0.12;
    const sweepY = Math.sin(p * Math.PI) * 1.2;
    const ts = mobile ? pose.s * 0.65 : pose.s;
    const g = group.current;
    if (g) {
      g.position.x = THREE.MathUtils.damp(g.position.x, tx + sweepX, 2.5, delta);
      g.position.y = THREE.MathUtils.damp(g.position.y, ty + sweepY + Math.sin(clock.elapsedTime * 0.8) * 0.12, 2.5, delta);
      g.position.z = THREE.MathUtils.damp(g.position.z, pose.z - p * 2.5, 2.5, delta);
      const s = THREE.MathUtils.damp(g.scale.x, ts, 2.5, delta);
      g.scale.setScalar(s);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pose.ry + p * Math.PI * 2 + pointer.x * 0.5, 3, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.3, 3, delta);
    }
    if (dots.current) dots.current.position.y = p * 4;
    // Subtle camera parallax for the whole world
    if (world.current) {
      world.current.position.x = THREE.MathUtils.damp(world.current.position.x, -pointer.x * 0.4, 2, delta);
      world.current.position.y = THREE.MathUtils.damp(world.current.position.y, -pointer.y * 0.25, 2, delta);
    }
  });

  return (
    <group ref={world}>
      <group ref={group}>
        <Orb />
        <Floaters />
      </group>
      <group ref={dots}>
        <Particles />
      </group>
    </group>
  );
}

/** Draws the scene on every other display frame, leaving room for page scrolling. */
function FrameDriver() {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    let id = 0;
    let draw = true;
    const tick = () => {
      if (draw) invalidate();
      draw = !draw;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [invalidate]);
  return null;
}

/** Fixed full-screen 3D backdrop that travels between pages. */
export const BackgroundScene = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={1}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <FrameDriver />
      <Rig />
    </Canvas>
  </div>
);

export default BackgroundScene;
