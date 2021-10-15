import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function initShaderInfo(container, renderer) {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const PLANE_WIDTH = 2.5;
  const PLANE_HEIGHT = 2.5;
  const CAMERA_HEIGHT = 0.3;
  const state = {
    shadow: {
      blur: 3.5,
      darkness: 1,
      opacity: 1,
    },
    plane: {
      color: "#ffffff",
      opacity: 1,
    },
    showWireframe: false,
  };
  const camera = initCamera();
  const scene = initScene();
  const meshes = initMeshes();
  const shadowGroup = new THREE.Group();
  shadowGroup.position.y = -0.3;
  const { plane, renderTarget } = initPlane();
  const shadowCamera = initShadowCamera();
  const depthMaterial = initDepthMaterial();

  // 阴影内容
  shadowGroup.add(plane);
  shadowGroup.add(shadowCamera);
  scene.add(shadowGroup);

  // 实体
  scene.add(...meshes);
  new OrbitControls(camera, renderer.domElement);

  function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    return scene;
  }
  function initCamera() {
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0.5, 1, 2);
    return camera;
  }
  function initPlane() {
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    renderTarget.texture.generateMipmaps = false;

    const planeGeometry = new THREE.PlaneGeometry(
      PLANE_WIDTH,
      PLANE_HEIGHT
    ).rotateX(Math.PI / 2);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: renderTarget.texture,
      opacity: state.shadow.opacity,
      transparent: true,
      depthWrite: false,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // make sure it's rendered after the fillPlane
    plane.renderOrder = 1;
    plane.scale.y = -1;

    return { plane, renderTarget };
  }
  function initMeshes() {
    const meshes = [];
    const geometries = [
      new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.IcosahedronGeometry(0.3),
      new THREE.TorusKnotGeometry(0.4, 0.05, 256, 24, 1, 3),
    ];

    const material = new THREE.MeshNormalMaterial();

    for (let i = 0, l = geometries.length; i < l; i++) {
      const angle = (i / l) * Math.PI * 2;

      const geometry = geometries[i];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 0.1;
      mesh.position.x = Math.cos(angle) / 2.0;
      mesh.position.z = Math.sin(angle) / 2.0;

      meshes.push(mesh);
    }
    return meshes;
  }
  function initShadowCamera() {
    const shadowCamera = new THREE.OrthographicCamera(
      -PLANE_WIDTH / 2,
      PLANE_WIDTH / 2,
      PLANE_HEIGHT / 2,
      -PLANE_HEIGHT / 2,
      0,
      CAMERA_HEIGHT
    );
    shadowCamera.rotation.x = Math.PI / 2; // get the camera to look up

    return shadowCamera;
  }
  function initDepthMaterial() {
    const depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.userData.darkness = { value: state.shadow.darkness };
    depthMaterial.onBeforeCompile = function(shader) {
      shader.uniforms.darkness = depthMaterial.userData.darkness;
      shader.fragmentShader = /* glsl */ `
    uniform float darkness;
    ${shader.fragmentShader.replace(
      "gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );",
      "gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );"
    )}
  `;
    };

    depthMaterial.depthTest = false;
    depthMaterial.depthWrite = false;
    return depthMaterial;
  }

  function render() {
    const initialBackground = scene.background;
    scene.background = null;
    scene.overrideMaterial = depthMaterial;
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, shadowCamera);
    scene.overrideMaterial = null;
    renderer.setRenderTarget(null);
    scene.background = initialBackground;
    renderer.render(scene, camera);
  }

  render();
}

// renderTarget --> blurPlane (horizontalBlur) --> renderTargetBlur --> blurPlane (verticalBlur) --> renderTarget
