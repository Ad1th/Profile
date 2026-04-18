"use client";

// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ASCIITextProps = {
  text?: string;
  enableWaves?: boolean;
  asciiFontSize?: number;
  textFontSize?: number;
  planeBaseHeight?: number;
  textColor?: string;
};

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;

    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;

const mapRange = (
  n: number,
  start: number,
  stop: number,
  start2: number,
  stop2: number,
) => ((n - start) / (stop - start)) * (stop2 - start2) + start2;

const getPxRatio = () =>
  typeof window !== "undefined" ? window.devicePixelRatio : 1;

class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  deg = 0;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  width = 0;
  height = 0;
  cols = 0;
  rows = 0;
  center = { x: 0, y: 0 };
  mouse = { x: 0, y: 0 };

  constructor(
    renderer: THREE.WebGLRenderer,
    {
      fontSize,
      fontFamily,
      charset,
      invert,
    }: {
      fontSize?: number;
      fontFamily?: string;
      charset?: string;
      invert?: boolean;
    } = {},
  ) {
    this.renderer = renderer;
    this.domElement = document.createElement("div");
    this.domElement.style.position = "absolute";
    this.domElement.style.top = "0";
    this.domElement.style.left = "0";
    this.domElement.style.width = "100%";
    this.domElement.style.height = "100%";
    this.domElement.style.pointerEvents = "none";

    this.pre = document.createElement("pre");
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("2D context could not be initialized for ASCII filter");
    }
    this.context = ctx;
    this.domElement.appendChild(this.canvas);

    this.invert = invert ?? true;
    this.fontSize = fontSize ?? 12;
    this.fontFamily = fontFamily ?? "'Courier New', monospace";
    this.charset =
      charset ??
      " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

    this.context.imageSmoothingEnabled = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    document.addEventListener("mousemove", this.onMouseMove, {
      passive: true,
    });
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();

    this.center = { x: width / 2, y: height / 2 };
    this.mouse = { x: this.center.x, y: this.center.y };
  }

  reset() {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    const charWidth = this.context.measureText("A").width;

    this.cols = Math.floor(
      this.width / (this.fontSize * (charWidth / this.fontSize)),
    );
    this.rows = Math.floor(this.height / this.fontSize);

    this.canvas.width = this.cols;
    this.canvas.height = this.rows;
    this.pre.style.fontFamily = this.fontFamily;
    this.pre.style.fontSize = `${this.fontSize}px`;
    this.pre.style.margin = "0";
    this.pre.style.padding = "0";
    this.pre.style.lineHeight = "1em";
    this.pre.style.position = "absolute";
    this.pre.style.left = "0";
    this.pre.style.top = "0";
    this.pre.style.zIndex = "9";
    this.pre.style.backgroundAttachment = "fixed";
    this.pre.style.mixBlendMode = "difference";
    this.pre.style.userSelect = "none";
  }

  render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.context.clearRect(0, 0, w, h);
    if (w && h) {
      this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
    }

    this.asciify(this.context, w, h);
    this.hue();
  }

  onMouseMove(e: MouseEvent) {
    const pxRatio = getPxRatio();
    this.mouse = { x: e.clientX * pxRatio, y: e.clientY * pxRatio };
  }

  get dx() {
    return this.mouse.x - this.center.x;
  }

  get dy() {
    return this.mouse.y - this.center.y;
  }

  hue() {
    const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;
    this.deg += (deg - this.deg) * 0.075;
    this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
  }

  asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {
    if (!w || !h) return;

    const imgData = ctx.getImageData(0, 0, w, h).data;
    let str = "";

    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        const i = x * 4 + y * 4 * w;
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const a = imgData[i + 3];

        if (a === 0) {
          str += " ";
          continue;
        }

        const gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
        let idx = Math.floor((1 - gray) * (this.charset.length - 1));
        if (this.invert) idx = this.charset.length - idx - 1;
        str += this.charset[idx];
      }
      str += "\n";
    }

    this.pre.innerHTML = str;
  }

  dispose() {
    document.removeEventListener("mousemove", this.onMouseMove);
  }
}

class CanvasTxt {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  txt: string;
  fontSize: number;
  fontFamily: string;
  color: string;

  constructor(
    txt: string,
    {
      fontSize = 200,
      fontFamily = "Arial",
      color = "#fdf9f3",
    }: { fontSize?: number; fontFamily?: string; color?: string } = {},
  ) {
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("2D context could not be initialized for text canvas");
    }
    this.context = ctx;
    this.txt = txt;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.color = color;
  }

  get font() {
    return `600 ${this.fontSize}px ${this.fontFamily}`;
  }

  resize() {
    this.context.font = this.font;
    const metrics = this.context.measureText(this.txt);

    const textWidth = Math.ceil(metrics.width) + 20;
    const textHeight =
      Math.ceil(
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
      ) + 20;

    this.canvas.width = textWidth;
    this.canvas.height = textHeight;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;

    const metrics = this.context.measureText(this.txt);
    const yPos = 10 + metrics.actualBoundingBoxAscent;

    this.context.fillText(this.txt, 10, yPos);
  }

  get texture() {
    return this.canvas;
  }
}

class CanvAscii {
  textString: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  planeBaseHeight: number;
  container: HTMLElement;
  width: number;
  height: number;
  enableWaves: boolean;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  mouse: { x: number; y: number };
  renderer?: THREE.WebGLRenderer;
  filter?: AsciiFilter;
  textCanvas?: CanvasTxt;
  texture?: THREE.CanvasTexture;
  geometry?: THREE.PlaneGeometry;
  material?: THREE.ShaderMaterial;
  mesh?: THREE.Mesh;
  animationFrameId = 0;

  constructor(
    {
      text,
      asciiFontSize,
      textFontSize,
      textColor,
      planeBaseHeight,
      enableWaves,
    }: {
      text: string;
      asciiFontSize: number;
      textFontSize: number;
      textColor: string;
      planeBaseHeight: number;
      enableWaves: boolean;
    },
    containerElem: HTMLElement,
    width: number,
    height: number,
  ) {
    this.textString = text;
    this.asciiFontSize = asciiFontSize;
    this.textFontSize = textFontSize;
    this.textColor = textColor;
    this.planeBaseHeight = planeBaseHeight;
    this.container = containerElem;
    this.width = width;
    this.height = height;
    this.enableWaves = enableWaves;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();
    this.mouse = { x: width / 2, y: height / 2 };

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  async init() {
    if ("fonts" in document) {
      try {
        await (
          document as Document & {
            fonts: FontFaceSet;
          }
        ).fonts.load('600 200px "IBM Plex Mono"');
        await (
          document as Document & {
            fonts: FontFaceSet;
          }
        ).fonts.load('500 12px "IBM Plex Mono"');
        await (
          document as Document & {
            fonts: FontFaceSet;
          }
        ).fonts.ready;
      } catch {
        // keep running with fallback fonts
      }
    }

    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasTxt(this.textString, {
      fontSize: this.textFontSize,
      fontFamily: "IBM Plex Mono",
      color: this.textColor,
    });
    this.textCanvas.resize();
    this.textCanvas.render();

    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);
    this.texture.minFilter = THREE.NearestFilter;

    const textAspect =
      this.textCanvas.canvas.width / this.textCanvas.canvas.height;
    const planeH = this.planeBaseHeight;
    const planeW = planeH * textAspect;

    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        mouse: { value: 1.0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: "IBM Plex Mono",
      fontSize: this.asciiFontSize,
      invert: true,
    });

    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);

    this.container.addEventListener("mousemove", this.onMouseMove, {
      passive: true,
    });
    this.container.addEventListener("touchmove", this.onMouseMove, {
      passive: true,
    });
  }

  setSize(w: number, h: number) {
    if (!this.filter) return;

    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.filter.setSize(w, h);
  }

  load() {
    this.animate();
  }

  onMouseMove(evt: MouseEvent | TouchEvent) {
    const touch = "touches" in evt ? evt.touches[0] : null;
    const source = touch ?? (evt as MouseEvent);

    const bounds = this.container.getBoundingClientRect();
    const x = source.clientX - bounds.left;
    const y = source.clientY - bounds.top;
    this.mouse = { x, y };
  }

  animate() {
    const frame = () => {
      this.animationFrameId = requestAnimationFrame(frame);
      this.render();
    };
    frame();
  }

  render() {
    if (
      !this.mesh ||
      !this.material ||
      !this.textCanvas ||
      !this.texture ||
      !this.filter
    ) {
      return;
    }

    const time = Date.now() * 0.001;

    this.textCanvas.render();
    this.texture.needsUpdate = true;

    this.material.uniforms.uTime.value = Math.sin(time);

    this.updateRotation();
    this.filter.render(this.scene, this.camera);
  }

  updateRotation() {
    if (!this.mesh) return;

    const x = mapRange(this.mouse.y, 0, this.height, 0.5, -0.5);
    const y = mapRange(this.mouse.x, 0, this.width, -0.5, 0.5);

    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
  }

  clear() {
    this.scene.traverse((obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose();
        }
        if (obj.geometry instanceof THREE.BufferGeometry) {
          obj.geometry.dispose();
        }
      }
    });
    this.scene.clear();
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);

    if (this.filter?.domElement.parentNode) {
      this.container.removeChild(this.filter.domElement);
    }
    this.filter?.dispose();

    this.container.removeEventListener("mousemove", this.onMouseMove);
    this.container.removeEventListener("touchmove", this.onMouseMove);

    this.clear();

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer.domElement.remove();
    }
  }
}

export default function ASCIIText({
  text = "Hello World!",
  enableWaves = true,
  asciiFontSize = 12,
  textFontSize = 200,
  textColor = "#fdf9f3",
  planeBaseHeight = 8,
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const asciiRef = useRef<CanvAscii | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const createAndInit = async (
      elem: HTMLDivElement,
      width: number,
      height: number,
    ) => {
      const instance = new CanvAscii(
        {
          text,
          asciiFontSize,
          textFontSize,
          textColor,
          planeBaseHeight,
          enableWaves,
        },
        elem,
        width,
        height,
      );
      await instance.init();
      return instance;
    };

    const setup = async () => {
      const { width, height } = container.getBoundingClientRect();

      if (width === 0 || height === 0) {
        observer = new IntersectionObserver(
          async ([entry]) => {
            if (!entry || cancelled) return;
            if (
              entry.isIntersecting &&
              entry.boundingClientRect.width > 0 &&
              entry.boundingClientRect.height > 0
            ) {
              observer?.disconnect();
              observer = null;

              if (cancelled) return;

              asciiRef.current = await createAndInit(
                container,
                entry.boundingClientRect.width,
                entry.boundingClientRect.height,
              );
              if (!cancelled) asciiRef.current.load();
            }
          },
          { threshold: 0.1 },
        );

        observer.observe(container);
        return;
      }

      asciiRef.current = await createAndInit(container, width, height);
      if (cancelled || !asciiRef.current) return;

      asciiRef.current.load();

      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || !asciiRef.current) return;
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) asciiRef.current.setSize(w, h);
      });
      resizeObserver.observe(container);
    };

    setup();

    return () => {
      cancelled = true;
      observer?.disconnect();
      resizeObserver?.disconnect();
      asciiRef.current?.dispose();
      asciiRef.current = null;
    };
  }, [
    text,
    asciiFontSize,
    textFontSize,
    textColor,
    planeBaseHeight,
    enableWaves,
  ]);

  return (
    <div
      ref={containerRef}
      className="ascii-text-container"
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <style>{`
        .ascii-text-container canvas {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }

        .ascii-text-container pre {
          margin: 0;
          user-select: none;
          padding: 0;
          line-height: 1em;
          text-align: left;
          position: absolute;
          left: 0;
          top: 0;
          background-image: radial-gradient(circle, #ff7a1f 0%, #e89a52 52%, #ffd2a7 100%);
          background-attachment: fixed;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          z-index: 9;
          mix-blend-mode: difference;
        }
      `}</style>
    </div>
  );
}
