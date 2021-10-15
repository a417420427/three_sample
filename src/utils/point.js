
import * as THREE from "three";


export const initPointer = () => {
  var point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300); //点光源位置
  return point;
}