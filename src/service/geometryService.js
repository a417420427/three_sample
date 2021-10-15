import * as THREE from "three";
import { GeometryTypes, getGeometryByType } from "../utils/geometry";
import { BaseScene } from "./baseService";

export const DEFAULT_GEOMERTY_COLOR = "#ff00ff";

export const DEFAULT_GEOMERTY = "";

export class GeometryService extends BaseScene {
  Mesh = null;
  LineSegments = null;

  async onGeometryChange(geometryType) {
    const geometry = await getGeometryByType(geometryType);
    this.deleteGroupChildren(this.group);
    const { Mesh, LineSegments } = initBaseObject(geometry);
    this.group.add(Mesh);
    this.group.add(LineSegments);
    this.enableScene()
  }

  cleanGeometry() {
    this.disableScene()
  }

  initEnv(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.initBaseScene({width, height});
    this.camera.position.set(20, 20, 20);
  }
}

function initBaseObject(activeGeometry) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([], 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
  });
  const meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const Mesh = new THREE.Mesh(geometry, meshMaterial);
  const LineSegments = new THREE.LineSegments(geometry, lineMaterial);

  LineSegments.geometry = new THREE.WireframeGeometry(activeGeometry);
  Mesh.geometry = activeGeometry;
  return { Mesh, LineSegments };
}
