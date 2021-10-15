import * as THREE from "three";

export const initExtrudeGeometry = () => {
  var data = {
    steps: 2,
    depth: 16,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  var length = 12,
    width = 8;

  var shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);

  return { shape, data };
};
