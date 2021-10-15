import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class BaseScene {
  scene = new THREE.Scene();
  camera = initCamera();
  axisHelper = new THREE.AxesHelper(1000);
  group = new THREE.Group();
  isActive = false;
  animationId = null;
  //light = new THREE.PointLight('#ffffff', 1)
  deleteGroupChildren = deleteGroupChildren;
  generateCamera(width, height) {
    this.camera = initCamera(width, height);
  }
  initBaseScene({ width, height, hideLight }) {
    this.generateCamera(width, height);
    this.scene.add(this.axisHelper);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.group);
    if (!hideLight) {
      const light = initLights();
      this.scene.add(light);
    }
  }
  disableScene() {
    this.deleteGroupChildren(this.group);
    this.isActive = false;
  }
  enableScene() {
    this.isActive = true;
  }
  startAnimation(render) {
    const group = this.group;

    const animationRender = () => {
      render();
      group.rotateY(0.01); //每次绕y轴旋转0.01弧度
      this.animationId = requestAnimationFrame(animationRender); //请求再次执行渲染函数render
    };
    animationRender();
  }
  stopAnimation() {
    if (!this.animationId) return;
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }
  /** 控制 */
  enableControll({ domElement, renderFn }) {
    if (!this.camera) {
      return;
    }
    var controlls = new OrbitControls(this.camera, domElement);
    // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数

    controlls.addEventListener("change", renderFn);

    this.disableControll = () => {
      if (!controlls) {
        return;
      }
      controlls.enableZoom = false;
      controlls.enableRotate = false;
      controlls.enablePan = false;
      controlls.removeEventListener("change", renderFn);
      this.disableControll = null;
    };
  }
  disableControll = null;
}

function deleteGroupChildren(group) {
  if (!group) return;
  const children = group.children;
  children.forEach((child) => {
    child.geometry.dispose && child.geometry.dispose();
    child.material.dispose && child.material.dispose();
    group.remove(child);
  });
  group.children = [];
}

function initCamera(width = 1, height = 1) {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
  camera.position.set(200, 200, 200);
  return camera;
}

export const initLights = (scene) => {
  const light = new THREE.PointLight(0xffffff, 1, 0);

  light.position.set(100, 100, 200);
  // lights[2].position.set(0, 0, 400);

  return light;
};
