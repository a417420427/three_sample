import * as THREE from "three";
import { generateGeometryBox } from "./LineDashedMaterial";
//import { generateDepthInfo } from "./MeshDepthMaterial";
import spritePng from "../../assets/sprite.png";
export const DEFAULT_MATERIAL_COLOR = "#6495ED";
export const MaterialMenu = {
  /** 点材质 */
  PointsMaterial: "PointsMaterial",
  /** 线材质 */
  LineMaterial: "LineMaterial",
  /** 网格材质 */
  MeshMaterial: "MeshMaterial",
  /** 精灵材质 */
  SpriteMaterial: "SpriteMaterial",
  /** 着色器材质 */
  ShaderMaterial: "ShaderMaterial",
};

export const DEFAULT_MATERIAL_MENU = MaterialMenu.MeshMaterial;
export const MaterialType = {
  /** 点材质 */
  [MaterialMenu.PointsMaterial]: { PointsMaterial: "PointsMaterial" },
  /** 线材质 */
  [MaterialMenu.LineMaterial]: {
    LineBasicMaterial: "LineBasicMaterial",
    LineDashedMaterial: "LineDashedMaterial",
  },
  /** 网格材质 */
  [MaterialMenu.MeshMaterial]: {
    MeshBasicMaterial: "MeshBasicMaterial",
    MeshLambertMaterial: "MeshLambertMaterial",
    MeshPhongMaterial: "MeshPhongMaterial",
    MeshStandardMaterial: "MeshStandardMaterial",
    MeshPhysicalMaterial: "MeshPhysicalMaterial",
    MeshDepthMaterial: "MeshDepthMaterial",
    MeshNormalMaterial: "MeshNormalMaterial",
  },
  /** 着色器材质 */
  [MaterialMenu.ShaderMaterial]: {
    RawShaderMaterial: "RawShaderMaterial",
    ShaderMaterial: "ShaderMaterial",
  },
  /** 精灵材质 */
  [MaterialMenu.SpriteMaterial]: { SpriteMaterial: "SpriteMaterial" },
};

export const getMaterialByType = (materialType, color = DEFAULT_MATERIAL_COLOR) => {
  console.log(color, materialType)
  const flattenedType = flattenMaterialType(MaterialType);
  const boxGeometry = new THREE.BoxGeometry(200, 200, 200);
  let material;
  switch (materialType) {
    case flattenedType.LineBasicMaterial:
      material = new THREE.LineBasicMaterial({
        color,
      });
      return new THREE.Line(boxGeometry, material);
    case flattenedType.PointsMaterial:
      material = new THREE.PointsMaterial({
        color,
        size: 5.0,
      });
      return new THREE.Points(boxGeometry, material);
    case flattenedType.LineDashedMaterial:
      material = new THREE.LineDashedMaterial({
        color,
        linewidth: 10,
        dashSize: 10,
        gapSize: 10,
      });

      const lineDashedGeometry = generateGeometryBox(200, 200, 200);
      const lineSegments = new THREE.LineSegments(lineDashedGeometry, material);
      lineSegments.computeLineDistances();
      return lineSegments;

    case flattenedType.MeshBasicMaterial:
      // 不受光照影响
      material = new THREE.MeshBasicMaterial({
        color,
      });
      return new THREE.Mesh(boxGeometry, material);
    /**
     * MeshLambertMaterial, MeshPhongMaterial 和 ShaderMaterial 的细节可见 {
     * @link https://www.hangge.com/blog/cache/detail_1819.html
     * }
     */
    case flattenedType.MeshLambertMaterial:
      // 这种材质可以用来创建暗淡的并不光亮的表面。该材质非常易用，而且会与场景中的光源产生反应。
      material = new THREE.MeshLambertMaterial({
        color,
      });
      return new THREE.Mesh(boxGeometry, material);
    case flattenedType.MeshPhongMaterial:
      material = new THREE.MeshPhongMaterial({ color , transparent: true, opacity: 0.5});
      const phongGeo = new THREE.SphereGeometry(100, 100, 100);
      return new THREE.Mesh(phongGeo, material);
    case flattenedType.MeshStandardMaterial:
      // 该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高。
      material = new THREE.MeshStandardMaterial({
        color,
        shadowSide: THREE.DoubleSide,
      });
      return new THREE.Mesh(boxGeometry, material);
    case flattenedType.MeshPhysicalMaterial:
      // MeshStandardMaterial的扩展，提供了更高级的基于物理的渲染属性
      material = new THREE.MeshPhysicalMaterial({
        color,
        shadowSide: THREE.DoubleSide,
      });
      return new THREE.Mesh(boxGeometry, material);
    case flattenedType.MeshDepthMaterial:
      // 一种按深度绘制几何体的材质。深度基于相机远近平面。白色最近，黑色最远。
      material = new THREE.MeshDepthMaterial({
        color,
      });
      return new THREE.Mesh(boxGeometry, material);
    case flattenedType.MeshNormalMaterial:
      /**
       * MeshNormalMaterial是一种不受渲染时使用的颜色影响的材质，它只与自己每一个面从内到外的法向量有关
       * {@link https://segmentfault.com/a/1190000018991174}
       */
      material = new THREE.MeshNormalMaterial();
      return new THREE.Mesh(boxGeometry, material);
    // case flattenedType.ShaderMaterial:
    // return //generateDepthInfo()

    case flattenedType.SpriteMaterial:
      var texture = new THREE.TextureLoader().load(spritePng);
      // 创建精灵材质对象SpriteMaterial
      var spriteMaterial = new THREE.SpriteMaterial({
        color: 0xff00ff, //设置精灵矩形区域颜色
        rotation: Math.PI / 4, //旋转精灵对象45度，弧度值
        map: texture, //设置精灵纹理贴图
      });
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite = new THREE.Sprite(spriteMaterial);
      console.log(sprite)
      return sprite
  }
};

const flattenMaterialType = () => {
  const flattenedType = {};
  Object.keys(MaterialMenu).forEach((menu) => {
    Object.keys(MaterialType[menu]).forEach((key) => {
      flattenedType[key] = key;
    });
  });
  return flattenedType;
};
