import * as THREE from "three";



export const initTextGeometryData = async () => {
  const data = {
    text: "TextGeometry",
    size: 5,
    height: 2,
    curveSegments: 12,
    font: "helvetiker",
    weight: "regular",
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelOffset: 0.0,
    bevelSegments: 3,
  };

  return new Promise((resolve) => {
    const loader = new THREE.FontLoader();
    loader.load(
      'http://10.71.8.80:8081/assets/helvetiker_regular.typeface.json',
      function(font) {
        resolve({
          text: data.text,
          options: {
            font: font,
            size: data.size,
            height: data.height,
            curveSegments: data.curveSegments,
            bevelEnabled: data.bevelEnabled,
            bevelThickness: data.bevelThickness,
            bevelSize: data.bevelSize,
            bevelOffset: data.bevelOffset,
            bevelSegments: data.bevelSegments,
          },
        });
      }
    );
  });

};
