import * as THREE from "three";

export const initRenderer = () => {
  let renderer
  return (container) => {
    if(renderer){
      return renderer
    }
    if(!container){
      return null
    }
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    container.appendChild(renderer.domElement); //body元素中插入canvas对象
    return renderer
  }
  
};
