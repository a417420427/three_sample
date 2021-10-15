import * as THREE from "three";
import { initExtrudeGeometry } from "./ExtrudeGeometry";
import { initShapeGeometry } from "./ShapeGeometry";
import { initTextGeometryData } from "./TextGeometry";
const twoPi = Math.PI * 2;
export const GeometryTypes = {
  BoxBufferGeometry: "BoxBufferGeometry",
  BoxGeometry: "BoxGeometry",
  CylinderBufferGeometry: "CylinderBufferGeometry",
  CylinderGeometry: "CylinderGeometry",
  ConeBufferGeometry: "ConeBufferGeometry",
  ConeGeometry: "ConeGeometry",
  CircleBufferGeometry: "CircleBufferGeometry",
  CircleGeometry: "CircleGeometry",
  DodecahedronGeometry: "DodecahedronGeometry",
  DodecahedronBufferGeometry: "DodecahedronBufferGeometry",
  IcosahedronGeometry: "IcosahedronGeometry",
  IcosahedronBufferGeometry: "IcosahedronBufferGeometry",
  LatheBufferGeometry: "LatheBufferGeometry",
  LatheGeometry: "LatheGeometry",
  OctahedronGeometry: "OctahedronGeometry",
  OctahedronBufferGeometry: "OctahedronBufferGeometry",
  PlaneBufferGeometry: "PlaneBufferGeometry",
  PlaneGeometry: "PlaneGeometry",
  RingBufferGeometry: "RingBufferGeometry",
  RingGeometry: "RingGeometry",
  SphereBufferGeometry: "SphereBufferGeometry",
  SphereGeometry: "SphereGeometry",
  TetrahedronGeometry: "TetrahedronGeometry",
  TetrahedronBufferGeometry: "TetrahedronBufferGeometry",
  TextGeometry: "TextGeometry",
  TextBufferGeometry: "TextBufferGeometry",
  TorusBufferGeometry: "TorusBufferGeometry",
  TorusGeometry: "TorusGeometry",
  TorusKnotBufferGeometry: "TorusKnotBufferGeometry",
  TorusKnotGeometry: "TorusKnotGeometry",
  ParametricBufferGeometry: "ParametricBufferGeometry",
  ParametricGeometry: "ParametricGeometry",
  TubeGeometry: "TubeGeometry",
  TubeBufferGeometry: "TubeBufferGeometry",
  ShapeGeometry: "ShapeGeometry",
  ShapeBufferGeometry: "ShapeBufferGeometry",
  ExtrudeGeometry: "ExtrudeGeometry",
  ExtrudeBufferGeometry: "ExtrudeBufferGeometry",
};

export const GeometryOptions = {
  [GeometryTypes.BoxBufferGeometry]: async () => ({
    width: 15,
    height: 15,
    depth: 15,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  }),
  [GeometryTypes.BoxGeometry]: async () => ({
    width: 15,
    height: 15,
    depth: 15,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  }),
  [GeometryTypes.CylinderBufferGeometry]: async () => ({
    radiusTop: 5,
    radiusBottom: 5,
    height: 10,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: twoPi,
  }),
  [GeometryTypes.CylinderGeometry]: async () => ({
    radiusTop: 5,
    radiusBottom: 5,
    height: 10,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: twoPi,
  }),
  [GeometryTypes.CircleBufferGeometry]: async () => ({
    radius: 10,
    segments: 32,
    thetaStart: 0,
    thetaLength: twoPi,
  }),
  [GeometryTypes.CircleGeometry]: async () => ({
    radius: 10,
    segments: 32,
    thetaStart: 0,
    thetaLength: twoPi,
  }),

  [GeometryTypes.ConeBufferGeometry]: async () => ({
    radius: 5,
    height: 10,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: twoPi,
  }),
  [GeometryTypes.ConeGeometry]: async () => ({
    radius: 5,
    height: 10,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: twoPi,
  }),
  [GeometryTypes.DodecahedronGeometry]: async () => ({ radius: 10, detail: 0 }),
  [GeometryTypes.DodecahedronBufferGeometry]: async () => ({
    radius: 10,
    detail: 0,
  }),
  [GeometryTypes.IcosahedronGeometry]: async () => ({
    radius: 10,
    detail: 0,
  }),
  [GeometryTypes.IcosahedronBufferGeometry]: async () => ({
    radius: 10,
    detail: 0,
  }),
  [GeometryTypes.LatheBufferGeometry]: async () => ({
    points: new Array(10)
      .fill("")
      .map(
        (_, i) => new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2)
      ),
    segments: 12,
    phiStart: 0,
    phiLength: twoPi,
  }),
  [GeometryTypes.LatheGeometry]: async () => ({
    points: new Array(10)
      .fill("")
      .map(
        (_, i) => new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2)
      ),
    segments: 12,
    phiStart: 0,
    phiLength: twoPi,
  }),
  [GeometryTypes.OctahedronGeometry]: async () => ({
    radius: 10,
    detail: 0,
  }),
  [GeometryTypes.OctahedronBufferGeometry]: async () => ({
    radius: 10,
    detail: 0,
  }),
  [GeometryTypes.PlaneBufferGeometry]: async () => ({
    width: 10,
    height: 10,
    widthSegments: 1,
    heightSegments: 1,
  }),
  [GeometryTypes.PlaneGeometry]: async () => ({
    width: 10,
    height: 10,
    widthSegments: 1,
    heightSegments: 1,
  }),
  [GeometryTypes.RingBufferGeometry]: async () => ({
    innerRadius: 5,
    outerRadius: 10,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: twoPi,
  }),
  [GeometryTypes.RingGeometry]: async () => ({
    innerRadius: 5,
    outerRadius: 10,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: twoPi,
  }),
  [GeometryTypes.SphereBufferGeometry]: async () => ({
    radius: 15,
    widthSegments: 8,
    heightSegments: 6,
    phiStart: 0,
    phiLength: twoPi,
    thetaStart: 0,
    thetaLength: Math.PI,
  }),
  [GeometryTypes.SphereGeometry]: async () => ({
    radius: 15,
    widthSegments: 8,
    heightSegments: 6,
    phiStart: 0,
    phiLength: twoPi,
    thetaStart: 0,
    thetaLength: Math.PI,
  }),
  [GeometryTypes.TetrahedronGeometry]: async () => ({
    radius: 10,
    detail: 0,
  }),
  [GeometryTypes.TetrahedronBufferGeometry]: async () => ({
    radius: 10,
    detail: 0,
  }),
  [GeometryTypes.TextGeometry]: async () => {
    return await initTextGeometryData();
  },
  [GeometryTypes.TextBufferGeometry]: async () => {
    return await initTextGeometryData();
  },
  [GeometryTypes.TorusBufferGeometry]: async () => ({
    radius: 10,
    tube: 3,
    radialSegments: 16,
    tubularSegments: 100,
    arc: twoPi,
  }),
  [GeometryTypes.TorusGeometry]: async () => ({
    radius: 10,
    tube: 3,
    radialSegments: 16,
    tubularSegments: 100,
    arc: twoPi,
  }),
  [GeometryTypes.TorusKnotBufferGeometry]: async () => ({
    radius: 10,
    tube: 3,
    tubularSegments: 64,
    radialSegments: 8,
    p: 2,
    q: 3,
  }),
  [GeometryTypes.TorusKnotGeometry]: async () => ({
    radius: 10,
    tube: 3,
    tubularSegments: 64,
    radialSegments: 8,
    p: 2,
    q: 3,
  }),
  [GeometryTypes.ParametricBufferGeometry]: async () => ({
    slices: 25,
    stacks: 25,
  }),
  [GeometryTypes.ParametricGeometry]: async () => ({
    slices: 25,
    stacks: 25,
  }),
  [GeometryTypes.TubeGeometry]: async () => ({
    path: new CustomSinCurve(10),
    segments: 20,
    radius: 2,
    radialSegments: 8,
    closed: false
  }),
  [GeometryTypes.TubeBufferGeometry]: async () => ({
    path: new CustomSinCurve(10),
    segments: 20,
    radius: 2,
    radialSegments: 8,
    closed: false
  }),
  [GeometryTypes.ShapeGeometry]: async () => initShapeGeometry(),
  [GeometryTypes.ShapeBufferGeometry]:  async () => initShapeGeometry(),
  [GeometryTypes.ExtrudeGeometry]: async () => initExtrudeGeometry(),
  [GeometryTypes.ExtrudeBufferGeometry]:async () =>  initExtrudeGeometry(),
};

export const getGeometryByType = async (type) => {
  const option = await GeometryOptions[type]()
  return new THREE[type](...Object.keys(option).map((k) => option[k]));
};

function CustomSinCurve(scale) {
  THREE.Curve.call(this);

  this.scale = scale === undefined ? 1 : scale;
}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function(t) {
  var tx = t * 3 - 1.5;
  var ty = Math.sin(2 * Math.PI * t);
  var tz = 0;

  return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
};



export const getShapHeart = () => {
  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
  return heartShape
};
