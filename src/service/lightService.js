import * as THREE from "three";
import { BaseScene } from "./baseService";

export const LightType = {
  /** @desc 聚光源 */
  SpotLight: "SpotLight",
  /** @desc 平行光 */
  DirectionalLight: "DirectionalLight",
  /** @desc 点光源 */
  PointLight: "PointLight",
  /** @desc 环境光 */
  AmbientLight: "AmbientLight",
};

export const POINTER_COLOR = "#ffffff";
export const AMBIENT_COLOR = "#ffffff";
export const SPOT_COLOR = "#ffffff";
export const DIRECTION_COLOR = "#ffffff";
export const MATERIAL_COLOR = "#ffffff";

export class LightService extends BaseScene {
  lights = {};
  lightGroup = new THREE.Group();
  /** @type {THREE.Mesh} */
  mesh = null;
  /** @type {THREE.AmbientLight|THREE.PointLight|THREE.SpotLight|THREE.DirectionalLight}*/
  addLight(lightType) {
    const light = generateLightByType(lightType);
    this.lights[lightType] = light;
    this.group.add(light);
    light.visible = false;
    return light;
  }
  changeMaterialColor(color) {
    if (this.mesh) {
      this.mesh.material.dispose();
      this.mesh.remove(this.mesh.material);
      this.mesh.material = (
        new THREE.MeshLambertMaterial({
          color,
        })
      );
    }
  }
  generateLightByType = generateLightByType;

  initEnv(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.initBaseScene({ width, height, hideLight: true });
    this.camera.position.set(100, 100, 100);

    const geometry = new THREE.BoxBufferGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial({
      color: MATERIAL_COLOR,
    });

    const mesh = new THREE.Mesh(geometry, material);
    Object.keys(LightType).forEach((lightType) => this.addLight(lightType));

    this.mesh = mesh;
    this.scene.add(mesh);
    this.scene.add(this.group);
  }
  onLightChange({ color, type, position, visible }) {
    const light = this.lights[type];
    switch (type) {
      case LightType.DirectionalLight:
      case LightType.AmbientLight:
      case LightType.SpotLight:
        changeLight({
          light,
          color,
          visible,
        });
        break;
      case LightType.PointLight:
        changePointerLight({
          color,
          light,
          position,
        });
        break;
    }
    this.enableScene();
  }
  removeLight() {
    this.isActive = false;
    // this.disableScene();
  }
}

export const generateLightByType = (lightType, color) => {
  switch (lightType) {
    // 环境光
    case LightType.AmbientLight:
      return new THREE.AmbientLight(color || AMBIENT_COLOR);
    // 点光源
    case LightType.PointLight:
      const point = new THREE.PointLight(color || POINTER_COLOR);
      point.position.set(400, 200, 300);
      return point;
    // 聚光光源 手电筒
    case LightType.SpotLight:
      const spotLight = new THREE.SpotLight(color || SPOT_COLOR);
      // 设置聚光光源位置
      spotLight.position.set(200, 200, 200);
      spotLight.angle = Math.PI / 6;
      return spotLight;
    // 平行光
    case LightType.DirectionalLight:
      var directionalLight = new THREE.DirectionalLight(
        color || DIRECTION_COLOR,
        1
      );
      // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
      directionalLight.position.set(80, 100, 50);
      // 设置指向对象 默认的位置是0,0,0
      // directionalLight.target = mesh2;
      return directionalLight;
  }
};

export function changeLight({ light, color, visible }) {
  if (!light) return;
  light.visible = !!visible;
  if (color) {
    light.color.set(color);
  }
  light.updateMatrix();
  light.updateMatrixWorld();
}

export function changePointerLight({ position, light, color }){
  if (position) {
    light.position.set(...position);
    light.visible = true;
  }
  if (color) {
    light.color.set(color);
  }
  light.updateMatrix();
  light.updateMatrixWorld();
}

export const pointPositions = {
  front: [300, 300, 300],
  x: [300, 0, 0],
  y: [0, 0, 300],
  z: [0, 300, 0],
  random: [Math.random() * 300, Math.random() * 300, Math.random() * 300],
};

export const pointPositionText = {
  x: "仅x方向",
  y: "仅y方向",
  z: "仅z方向",
  random: "随机",
  front: "正面",
};
