import { useEffect, useRef } from "react";

interface Props {
  glitchColors: string[];
  glitchSpeed: number;
  centerVignette: boolean;
  outerVignette: boolean;
  smooth: boolean;
  variant?: "panel" | "ambient";
}

// The original letter grid, with falling highlights inspired by Matrix code.
export default function LetterGlitch({
  glitchColors = ["#1a6739", "#71f6a2", "#b4ffd0"],
  glitchSpeed = 70,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  variant = "panel",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const palette = glitchColors.join(",");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let colors = palette.split(",");
    const glyphs = Array.from(
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789<>/:{}[]",
    );
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ambient = variant === "ambient";
    const cellWidth = ambient ? 28 : 15;
    const cellHeight = ambient ? 26 : 20;
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let cells: { char: string; color: string }[] = [];
    let streams: { offset: number; speed: number; length: number }[] = [];
    let animation = 0;
    let lastFrame = -Infinity;
    let lastGlitch = -Infinity;
    let visible = true;
    const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

    function draw(time: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      context.font = '14px "Courier New", monospace';
      context.textBaseline = "top";
      for (let column = 0; column < columns; column++) {
        const stream = streams[column];
        const head =
          (stream.offset + time * stream.speed) % (rows + stream.length);
        for (let row = 0; row < rows; row++) {
          const cell = cells[row * columns + column];
          const distance = head - row;
          const inTrail = distance >= 0 && distance < stream.length;
          const glow = inTrail ? 1 - distance / stream.length : 0;
          context.globalAlpha = inTrail
            ? 0.25 + glow * 0.7
            : ambient
              ? 0.2
              : 0.14;
          if (!smooth)
            context.globalAlpha = Math.round(context.globalAlpha * 4) / 4;
          context.fillStyle = glow > 0.87 && !ambient ? "#d9ffe6" : cell.color;
          context.fillText(cell.char, column * cellWidth, row * cellHeight);
        }
      }
      context.globalAlpha = 1;
    }

    function resize() {
      if (!canvas || !context) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, ambient ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / cellWidth);
      rows = Math.ceil(height / cellHeight);
      cells = Array.from({ length: columns * rows }, () => ({
        char: randomGlyph(),
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      streams = Array.from({ length: columns }, () => ({
        offset: Math.random() * (rows + 12),
        speed: ambient
          ? 0.002 + Math.random() * 0.002
          : 0.003 + Math.random() * 0.005,
        length: 6 + Math.random() * 12,
      }));
      draw(0);
    }

    function tick(time: number) {
      if (time - lastFrame >= (ambient ? 90 : 40)) {
        if (time - lastGlitch >= glitchSpeed) {
          for (let i = 0; i < cells.length * 0.035; i++) {
            cells[Math.floor(Math.random() * cells.length)].char =
              randomGlyph();
          }
          lastGlitch = time;
        }
        draw(time);
        lastFrame = time;
      }
      animation = requestAnimationFrame(tick);
    }

    function syncAnimation() {
      cancelAnimationFrame(animation);
      if (visible && !document.hidden && !motion.matches) {
        animation = requestAnimationFrame(tick);
      } else if (motion.matches) {
        draw(0);
      }
    }

    function updatePalette() {
      if (ambient) {
        const styles = getComputedStyle(document.documentElement);
        colors = [1, 2, 3].map(
          (index) =>
            styles.getPropertyValue(`--matrix-color-${index}`).trim() ||
            palette.split(",")[index - 1],
        );
        cells.forEach((cell, index) => {
          cell.color = colors[index % colors.length];
        });
        draw(motion.matches ? 0 : performance.now());
      }
    }

    updatePalette();
    resize();
    const themeObserver = new MutationObserver(updatePalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    intersectionObserver.observe(canvas);
    motion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
    syncAnimation();

    return () => {
      cancelAnimationFrame(animation);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
    };
  }, [palette, glitchSpeed, smooth, variant]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      {(outerVignette || centerVignette) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: outerVignette
              ? "radial-gradient(ellipse, transparent 30%, #080c09 100%)"
              : "radial-gradient(ellipse, #080c09a0, transparent 65%)",
          }}
        />
      )}
    </div>
  );
}
