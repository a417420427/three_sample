import * as THREE from "three";

import { LightService } from "./lightService";
import { MaterialService } from "./materialService";
import { GeometryService } from "./geometryService";
import { initShaderInfo } from "../utils/material/ShaderMaterial";
import { ControllService } from "./controllService";
import { ModelLoadService } from "./modelLoadService";

const services = {
  lightService: "lightService",
  materialService: "materialService",
  geometryService: "geometryService",
  modelLoadService: "modelLoadService",
};

export class ViewService {
  /** @type {THREE.Scene} */
  scene = new THREE.Scene();
  /**
   * @type {THREE.WebGLRenderer}
   */
  renderer = null;
  /**
   * @type {THREE.PerspectiveCamera}
   */
  camera = null;

  lightService = new LightService();
  materialService = new MaterialService();
  geometryService = new GeometryService();

  modelLoadService = new ModelLoadService();
  animationId = null;
  controlls = null;
  container = document.body;

  controllService = new ControllService();

  init(container) {
    this.materialService.initEnv(container);
    this.geometryService.initEnv(container);
    this.lightService.initEnv(container);

    this.modelLoadService.initEnv(container);
    this.initRenderer(container);
    this.container = container;
 
  }
  initRenderer(container) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    this.renderer = renderer;
  }
  render() {
    const activeService = this.getActiveService();
    if (activeService) {
      const { scene, camera } = activeService;
      this.renderer.render(scene, camera);
    }
  }
  getActiveService() {
    const serviceName = Object.keys(services).find((key) => this[key].isActive);
    if (serviceName) {
      return this[serviceName];
    }
  }
  /** 动画 */
  startAnimation() {
    const service = this.getActiveService();
    if (!service) {
      return;
    }
    const { scene, camera } = service;
    service.startAnimation(() => this.renderer.render(scene, camera));
  }
  stopAnimation() {
    const service = this.getActiveService();
    if (!service) {
      return;
    }
    service.stopAnimation();
  }
  /** 控制 */
  enableControll() {
    const service = this.getActiveService();
    if (!service) {
      return;
    }
    const { scene, camera } = service;
    service.enableControll({
      domElement: this.renderer.domElement,
      renderFn: () => this.renderer.render(scene, camera),
    });
  }
  disableControll() {
    service.disableControll && services.disableControll();
  }
  /** 材质变化 */
  onMaterialChange(type) {
    this.disableOtherService(services.materialService);
    if (type === "ShaderMaterial") {
      initShaderInfo(this.container, this.renderer);
      this.scene.background = "#ffffff";
      return;
    }
    this.camera = this.materialService.camera;
    this.materialService.onMaterialChange(type);
    const { scene, camera } = this.materialService;
    this.renderer.render(scene, camera);
  }
  onMaterialColorChange(color) {
    this.materialService.onMaterialColorChange(color);
    const { scene, camera, group } = this.materialService;
    if (group.children.length) {
      this.renderer.render(scene, camera);
    }
  }
  cleanMaterial() {
    if (!this.materialService.isActive) {
      return;
    }
    this.materialService.cleanMaterial();
    this.renderer.clear();
  }
  /** 几何体变化 */
  async onGeometryChange(type) {
    this.disableOtherService(services.geometryService);
    const { scene, camera } = this.geometryService;
    await this.geometryService.onGeometryChange(type);
    this.renderer.render(scene, camera);
  }
  async cleanGeometry() {
    if (!this.geometryService.isActive) {
      return;
    }
    this.geometryService.cleanGeometry();
    this.renderer.clear();
  }
  /** 光源变化 */
  onLightChange(options) {
    this.disableOtherService(services.lightService);
    this.lightService.onLightChange(options);
    const scene = this.lightService.scene;
    const camera = this.lightService.camera;
    this.renderer.render(scene, camera);
  }
  onPointerMatrialColorChange(color) {
    this.lightService.changeMaterialColor(color);
    if (this.lightService.isActive) {
      const scene = this.lightService.scene;
      const camera = this.lightService.camera;
      this.renderer.render(scene, camera);
    }
  }
  removeLight() {
    if (!this.lightService.isActive) {
      return;
    }
    this.lightService.removeLight();
    this.renderer.clear();
  }
  /** onInse */
  onInsertText(options){
    this.modelLoadService.onInsertText(options)
    this.render()
  }
  disableOtherService(currentService) {
    switch (currentService) {
      case services.lightService:
        this.cleanGeometry();
        this.cleanMaterial();
        break;
      case services.materialService:
        this.removeLight();
        this.cleanGeometry();
        break;
      case services.geometryService:
        this.removeLight();
        this.cleanMaterial();
        break;
    }
  }
}

export const initPointer = () => {
  var point = new THREE.PointLight(0xffffff);
  point.position.set(0, 0, 300); //点光源位置
  return point;
};

export const initAmbient = () => new THREE.AmbientLight(0x444444);

export const viewService = new ViewService();
