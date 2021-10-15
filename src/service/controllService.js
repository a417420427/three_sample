export class ControllService {
  animationId = null;
  renderFn = null;
  /** 动画 */
  startAnimation() {
    const mesh = this.materialService.targetObject;
    this.disableControll && this.disableControll();
    const render = () => {
      this.render();
      mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      this.animationId = requestAnimationFrame(render); //请求再次执行渲染函数render
    };
    render();
  }
  stopAnimation() {
    if (!this.animationId) return;
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }
  /** 控制 */
  enableControll({ camera, domElement, renderFn }) {
    var controlls = new OrbitControls(camera, domElement);
    // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数
    this.stopAnimation();
    this.renderFn = renderFn;
    controlls.addEventListener("change", this.renderFn);
    this.controlls = controlls;
  }
  disableControll() {
    if (!this.controlls) {
      return;
    }
    this.controlls.enableZoom = false;
    this.controlls.enableRotate = false;
    this.controlls.enablePan = false;
    this.controlls.removeEventListener("change", this.renderFn);
    this.controlls = null;
  }
}
