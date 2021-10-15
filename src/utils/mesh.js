import * as THREE from "three";

export function initMesh() {
  let mesh;
  return {
    /**
     * @returns {THREE.Mesh}
     */
    getMesh(geometry, material) {
      if (mesh) {
        return mesh;
      }
       geometry = geometry || new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
       material = material || new THREE.MeshLambertMaterial({
        color: 0x0000ff,
      }); //材质对象Material
      mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      return mesh;
    },
    removeMesh(scene) {
      if (!mesh) {
        return;
      }
      removeMesh(scene, mesh.uuid);
    },
    refreshMesh(newMesh, scene){
      removeMesh(scene, mesh.uuid)
      mesh = newMesh
    }
  };
}

export function removeMesh(scene, uuid) {
  scene.getObjectByProperty("uuid", uuid).geometry.dispose();
  scene.getObjectByProperty("uuid", uuid).material.dispose();
  scene.remove(scene.getObjectByProperty("uuid", uuid));
}
