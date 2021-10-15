import * as THREE from "three";
import { DEFAULT_MATERIAL_COLOR, getMaterialByType, MaterialType, MATERIAL_COLOR } from "../utils/material";
import { BaseScene } from "./baseService";

export const MaterialBaseType = {
  /** 点材质 */
  PointsMaterial: "PointsMaterial",
  /** 线材质 */
  LineMaterial: "LineMaterial",
  /** 网格材质 */
  MeshMaterial: "MeshMaterial",
  /** 精灵材质 */
  SpriteMaterial: "SpriteMaterial",
  /** 自定义材质 */
  CustomizeMaterial: "CustomizeMaterial",
};

export const DEFAULT_BASE_MATERIAL = MaterialBaseType.MeshMaterial;
export const DEFAULT_MATERIAL = Object.keys(
  MaterialType[MaterialBaseType.MeshMaterial]
)[0];


export class MaterialService extends BaseScene {
  object3D = null;
  color = DEFAULT_MATERIAL_COLOR
  currentMaterialType = ''
  initEnv(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.initBaseScene({width, height})
  }
  onMaterialChange(type) {
    const object3D = getMaterialByType(type, this.color);
    this.object3D = object3D;
    object3D.material.needsUpdate = true;
    this.group.add(this.object3D);
    this.group.add(new THREE.DirectionalLight( 0xffffff, 1.5 ))
    this.currentMaterialType = type
    this.enableScene()
  }
  cleanMaterial(){
    this.currentMaterialType = ''
    this.disableScene()
  }
  onMaterialColorChange(color){
    this.color = color
    if(this.currentMaterialType){
      this.onMaterialChange(this.currentMaterialType)
    }
  }
}



