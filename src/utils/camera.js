import * as THREE from "three";

export function initCamera(width, height) {

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1,2000);
  camera.position.set(200,200,200)
  return camera;
}
