import React, { useRef, useEffect, memo } from 'react';

interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = memo(function Noise({
  patternRefreshInterval = 2,
  patternAlpha = 15
}) {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Reduced from 1024 to 256 for much better performance (16x less pixels)
    const canvasSize = 256;

    // Pre-generate multiple noise frames to avoid runtime random generation
    const noiseFrames: ImageData[] = [];
    const numFrames = 4; // Pre-generate 4 frames to cycle through

    const generateNoiseFrames = () => {
      for (let f = 0; f < numFrames; f++) {
        const imageData = ctx.createImageData(canvasSize, canvasSize);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255;
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
          data[i + 3] = patternAlpha;
        }
        noiseFrames.push(imageData);
      }
    };

    let frame = 0;
    let animationId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };

    const loop = () => {
      // Only update every patternRefreshInterval frames, cycle through pre-generated frames
      if (frame % patternRefreshInterval === 0 && noiseFrames.length > 0) {
        const frameIndex = Math.floor(frame / patternRefreshInterval) % numFrames;
        ctx.putImageData(noiseFrames[frameIndex], 0, 0);
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    resize();
    generateNoiseFrames();
    loop();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="pointer-events-none absolute top-0 left-0 h-screen w-screen"
      ref={grainRef}
      style={{
        imageRendering: 'pixelated'
      }}
    />
  );
});

export default Noise;
