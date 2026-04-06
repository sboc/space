import * as THREE from 'three';

export type RGB = [number, number, number];

export function hash2(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  return (
    hash2(ix, iy)     * (1 - ux) * (1 - uy) +
    hash2(ix + 1, iy) * ux       * (1 - uy) +
    hash2(ix, iy + 1) * (1 - ux) * uy       +
    hash2(ix + 1, iy + 1) * ux   * uy
  );
}

export function fbm(x: number, y: number, octaves = 4): number {
  let v = 0;
  let a = 0.5;
  for (let i = 0; i < octaves; i++) {
    v += a * valueNoise(x * Math.pow(2, i), y * Math.pow(2, i));
    a *= 0.5;
  }
  return v;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export function lerpColor(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Write a W×H canvas texture using a per-pixel colour function. */
export function createTexture(
  width: number,
  height: number,
  fn: (nx: number, ny: number) => RGB,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = fn(x / width, y / height);
      const i = (y * width + x) * 4;
      data[i]     = Math.floor(clamp(r, 0, 255));
      data[i + 1] = Math.floor(clamp(g, 0, 255));
      data[i + 2] = Math.floor(clamp(b, 0, 255));
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}
