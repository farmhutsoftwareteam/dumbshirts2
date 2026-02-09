import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, AccumulativeShadows, RandomizedLight, Decal, Environment, Center, OrbitControls } from '@react-three/drei';
import { easing } from 'maath';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { pageVariants, pageTransition } from '../utils/animations';
import Line from '../components/atoms/Line';
import StarkButton from '../components/atoms/StarkButton';
import styles from './TestShirt.module.css';

const COLORS = ['#121212', '#F5F5F5', '#2A2A2A', '#533483', '#1a1a2e', '#0f3460', '#EF674E', '#EFBD4E'];

function useTextTexture(text, { width, height, fontSize, align, multiline, mirror }) {
  const canvas = useMemo(() => document.createElement('canvas'), []);
  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.flipY = false;
    return tex;
  }, [canvas]);

  useEffect(() => {
    const dpr = 2;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    if (!text) {
      texture.needsUpdate = true;
      return;
    }

    if (mirror) {
      ctx.translate(width, height);
      ctx.scale(-1, -1);
    }

    ctx.fillStyle = '#F5F5F5';
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    ctx.textBaseline = 'top';

    if (multiline) {
      ctx.textAlign = 'center';
      const maxWidth = width * 0.85;
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (ctx.measureText(testLine).width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      const lineHeight = fontSize * 1.3;
      const totalHeight = lines.length * lineHeight;
      const startY = (height - totalHeight) / 2;

      lines.forEach((line, i) => {
        ctx.fillText(line, width / 2, startY + i * lineHeight);
      });
    } else {
      ctx.textAlign = align === 'center' ? 'center' : 'left';
      const x = align === 'center' ? width / 2 : width * 0.1;
      const y = (height - fontSize) / 2;
      ctx.fillText(text, x, y);
    }

    texture.needsUpdate = true;
  }, [text, canvas, texture, width, height, fontSize, align, multiline, mirror]);

  return texture;
}

function Backdrop() {
  const shadows = useRef();
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight amount={4} radius={9} intensity={0.55 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  );
}


function Shirt({ color, frontText, backText }) {
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb');
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, color, 0.25, delta));

  const frontTexture = useTextTexture(frontText, {
    width: 512,
    height: 256,
    fontSize: 40,
    align: 'left',
    multiline: false,
    mirror: false,
  });

  const backTexture = useTextTexture(backText, {
    width: 1024,
    height: 1024,
    fontSize: 80,
    align: 'center',
    multiline: true,
    mirror: true,
  });

  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} dispose={null}>
      {frontText && (
        <Decal
          position={[-0.15, 0.15, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.12}
          depthTest={false}
          depthWrite={true}
        >
          <meshBasicMaterial map={frontTexture} transparent polygonOffset polygonOffsetFactor={-1} />
        </Decal>
      )}
      {backText && (
        <Decal
          position={[0, 0.04, -0.15]}
          rotation={[0, Math.PI, 0]}
          scale={0.35}
          depthTest={false}
          depthWrite={true}
        >
          <meshBasicMaterial map={backTexture} transparent polygonOffset polygonOffsetFactor={-1} />
        </Decal>
      )}
    </mesh>
  );
}

useGLTF.preload('/shirt_baked_collapsed.glb');

export default function TestShirt() {
  const [color, setColor] = useState('#121212');
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  return (
    <motion.div
      className={styles.page}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <div className={styles.canvasWrap}>
        <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={0.5 * Math.PI} />
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={true}
            enableDamping={true}
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            minDistance={1.5}
            maxDistance={4}
            rotateSpeed={0.8}
          />
          <Backdrop />
          <Center>
            <Shirt color={color} frontText={frontText} backText={backText} />
          </Center>
        </Canvas>
      </div>

      <div className={styles.controls}>
        <div className={styles.panel}>
          <span className={styles.label}>Substrate color</span>
          <Line direction="horizontal" spacing="sm" />
          <div className={styles.colorOptions}>
            {COLORS.map((c) => (
              <button
                key={c}
                className={`${styles.colorSwatch} ${color === c ? styles.colorSwatchActive : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
                type="button"
              />
            ))}
          </div>

          <span className={styles.label}>Front pocket</span>
          <Line direction="horizontal" spacing="sm" />
          <input
            type="text"
            className={styles.textInput}
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            placeholder="Small chest text..."
            maxLength={30}
          />

          <span className={styles.label}>Back print</span>
          <Line direction="horizontal" spacing="sm" />
          <textarea
            className={styles.textArea}
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            placeholder="Large back text..."
            rows={3}
            maxLength={120}
          />

          <Line direction="horizontal" spacing="md" />

          <StarkButton
            variant="secondary"
            onClick={() => {
              const link = document.createElement('a');
              link.setAttribute('download', 'dumbshirts-artifact.png');
              link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'));
              link.click();
            }}
          >
            Export render
          </StarkButton>
        </div>
      </div>
    </motion.div>
  );
}
