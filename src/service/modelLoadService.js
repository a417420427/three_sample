import { BaseScene } from "./baseService";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { CubeTextureLoader } from "three";


export class ModelLoadService extends BaseScene {
  mixer = null;
  canvasText = null;
  resSence = null
  container = null
  initEnv(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.initBaseScene({ width, height, hideLight: true });
    this.initModalCamera({ width, height });
    this.initLights();
    this.container = container
    this.createWorkshopLight()
    this.createSceneLight()
  }
  initModalCamera({ width, height }) {
    this.camera = new THREE["PerspectiveCamera"](45, width / height, 0.01, 5000); 
   
    this.camera.position.y = 350;
    this.camera.position.z = 800;
    this.camera.near = 0.1;
    this.camera.far = 3000;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  async loadModel() {
    this.initGround();
    const manager = new THREE.LoadingManager();
    manager.onProgress = (item, loaded, total) => {
      console.log(loaded, total);
    };

    const loader = new GLTFLoader(manager);
    let dracoLoader = new DRACOLoader();
    this.isActive = true;
    loader.setDRACOLoader(dracoLoader);
    return new Promise((resolve) => {
      loader.load("http://127.0.0.1:8080/jbc-line4.glb", (geometry) => {
        let resSence = geometry.scene;
        resSence.scale.multiplyScalar(1);

        this.group.add(resSence);
      
        const mixer = new THREE.AnimationMixer(resSence);
        this.resSence = resSence
        mixer.timeScale = 0.5;
        geometry.animations.forEach((aniItem) => {
          mixer.clipAction(aniItem).play();
        });
        this.mixer = mixer;
        this.initGround()
        resolve(mixer);
      });
    });
  }

  enableModelAnimation() {}

  initSkyBox(manager) {
    let cubeMaps = [
      "http://127.0.0.1:8080/skybox/px.jpg",
      "http://127.0.0.1:8081/skybox/nx.jpg",
      "http://127.0.0.1:8081/skybox/py.jpg",
      "http://127.0.0.1:8081/skybox/ny.jpg",
      "http://127.0.0.1:8081/skybox/pz.jpg",
      "http://127.0.0.1:8081/skybox/nz.jpg",
    ];

    const loader = new CubeTextureLoader(manager);

    loader.load(cubeMaps, function(res) {});
  }
  startAnimation(renderFn) {
    var clock = new THREE.Clock();

    const animationRender = () => {
      renderFn();
      var time = clock.getDelta();
      if (this.mixer) {
        this.mixer.update(time);
      }
      this.animationId = requestAnimationFrame(animationRender); //请求再次执行渲染函数render
    };
    animationRender();
  }
  initLights() {
    const amLight = new THREE.AmbientLight(0xffffff, 0.7);
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
    frontLight.position.set(-100, 1, 300);
    const pointerLight = new THREE.PointLight(0xfffff, 0.8, 600);
    pointerLight.position.set(0, 300, 0);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-40, 120, -150);

    const flashLight = new THREE.DirectionalLight(0x86a3b6, 0.4);
    flashLight.position.set(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z
    );

    this.group.add(amLight, frontLight, pointerLight, backLight, flashLight);
  }
  onInsertText(options) {
    if (this.canvasText) {
      this.group.remove(this.canvasText);
    }

    const canvasText = this.generateCanvasText(options);
 
    this.scene.add(canvasText);
    this.canvasText = canvasText
    
  }
  generateCanvasText(options) {
    //贴图绑定到精灵元素
    function showSprite() {
      const canvas = generateCanvas(options);
      const canvasTexture = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(212, 83),
        new THREE["MeshBasicMaterial"]({
          map: canvasTexture,
          transparent: true,
          side: THREE["DoubleSide"],
          depthTest: false,
          opacity: 0.5,
          
        })
      );
      canvasTexture.needsUpdate = true;
      sprite.position.set(0, 100, 0);

   
      //this.rootGroup.add(sprite);
      sprite.receiveShadow = true;
      return sprite;
    }

    return showSprite();
  }

  initGround() {
    const loader = new THREE.TextureLoader();

    loader.load("http://127.0.0.1:8080/ground.png", (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(200, 200);
      texture.center = new THREE.Vector2(0.5, 0.5);

      const geometry = new THREE.PlaneGeometry(1, 1);
      geometry.scale(5000, 5000, 1);
      const material = new THREE.MeshPhongMaterial({
        //color: 0x222f22,
        transparent: true,
        opacity: 0.8,
        reflectivity: 0.1,
        shininess: 30,
        side: 0,
        map: texture,
        fog: true, //envMap: this.options.envMap
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 2;
      mesh.receiveShadow = true

      this.group.add(mesh);
    });
  }

  createSceneLight() {
    let w = this.container.clientWidth;
    let h = this.container.clientHeight; // 0x70818e

    let light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(300, 400, -350);
    light.castShadow = true;
    light.shadow.bias = 0.00001;
    light.shadow.bias = 0.01;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);
    light.shadow.camera.left = -w / 2;
    light.shadow.camera.right = w / 2;
    light.shadow.camera.top = h;
    light.shadow.camera.bottom = -h;
    light.shadow.camera.near = 0.001;
    light.shadow.camera.far = 1000;
    light.shadow.camera.updateProjectionMatrix();
    this.sceneLight = light;
  }
  createWorkshopLight() {
    let light = new THREE.DirectionalLight(0xffffff, 0.7);
    let w = this.container.clientWidth;
    let h = this.container.clientHeight; 
    light.castShadow = true;
    light.shadow.bias = 0.00001;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light); //

    let targetObject = new THREE.Object3D();
    this.scene.add(targetObject);
    light.target = targetObject;
    light.position.set(250, 60, 240);
    light.target.position.set(240, 0, 240); //

    light.shadow.camera.left = -200;
    light.shadow.camera.right = 200;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.near = 0.001;
    light.shadow.camera.far = 100;
    light.shadow.camera.updateProjectionMatrix();
    this.workshopLight = light; // var helper = new THREE.DirectionalLightHelper(light, 5);
    // this.scene.add(helper);
    // var helper2 = new THREE.CameraHelper(light.shadow.camera);
    // this.scene.add(helper2);
    //
  }
}

function generateCanvas({
  text,
  theoryTitle,
  actualTitle,
  theoryNum,
  actualNum,
}) {
  var canvas = document.createElement("canvas");

  canvas.width = 425;
  canvas.height = 166;
  var c = canvas.getContext("2d");
  // 矩形区域填充背景
  c.fillStyle = "#ffffff";
  c.fillRect(0, 0, 425, 166);
  c.beginPath();
  // 文字
  c.beginPath();
  c.fillStyle = "#000000"; //文本填充颜色
  c.font = "bold 48px 宋体"; //字体样式设置

  c.fillText(text, 40, 60);
  c.font = "bold 24px 宋体";
  c.fillText(theoryTitle, 40, 100);
  c.fillText(actualTitle, 240, 100);
  c.fillStyle = "#00dcff";
  c.font = "24px 宋体";
  c.fillText(`${theoryNum} min`, 80, 140);
  c.fillText(`${actualNum} min`, 280, 140);
  return canvas;
}
