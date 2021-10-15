<template>
  <div ref="app" class="home">
    <div class="content">
      <ul class="controlls">
        <li>
          <controll />
        </li>
        <li>
          <material />
        </li>
        <li>
          <geometry />
        </li>
        <li>
          <light />
        </li>
      </ul>
      <div
        :style="{
          width: '600px',
          height: '600px',
        }"
        ref="container"
        class="container"
      ></div>
    </div>
  </div>
</template>
<script>
import Geometry from "../components/Geometry.vue";
import Material from "../components/Material.vue";
import Light from "../components/Light.vue";
import Controll from "../components/Controll.vue";

import { viewService } from "../service/viewService.js";
import { LightType, changeLight } from "../service/lightService";

export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  components: {
    Geometry,
    Material,
    Light,
    Controll,
  },
  methods: {
    init() {

      const canvas = document.createElement('canvas')

      canvas.getContext('2d')
      const container = this.$refs.container;
      viewService.init(container);
      this.width = container.clientWidth;
      this.height = container.clientHeight;
    },
    /**
     * 动画
     */
    toggleAnimation() {
      if (viewService.animationId) {
        viewService.stopAnimation();
      } else {
        viewService.startAnimation();
      }
    },
    /**
     * 控制
     */
    toggleControll() {
      if (viewService.controlls) {
        viewService.disableControll();
      } else {
        viewService.enableControll();
      }
    },
    /** 光源设置 */
    changePointerPosition(position) {
      let light = viewService.lightService.lights[LightType.PointLight];
      changeLight({
        visible: true,
        light,
        position,
      });
      viewService.render();
    },
    changePointerColor(color) {
      let light = viewService.lightService.lights[LightType.PointLight];
      changeLight({ color, light });
    },
    toggleAmbient() {
      let light = viewService.lightService.lights[LightType.AmbientLight];
      changeLight({
        visible: !light.visible,
        light,
      });
      viewService.render();
    },
    toggleDirection() {
      let light = viewService.lightService.lights[LightType.DirectionalLight];
      changeLight({
        visible: !light.visible,
        light,
      });
      viewService.render();
    },
    changeAmbientColor(color) {
      let light = viewService.lightService.lights[LightType.AmbientLight];
      changeLight({
        color,
        light,
      });
    },
    changeDirectionColor(color) {
      let light = viewService.lightService.lights[LightType.DirectionalLight];
      changeLight({
        color,
        light,
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
body, html , .home {
  width: 100%;
  overflow: hidden;
}
h4 {
  margin: 0;
  box-sizing: border-box;
}
.content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.container {
  margin-top: 20px;
  margin-left: 30px;
}
body {
  margin: 0;
}
li {
  list-style: none;
}
ul {
  padding: 0;
  margin: 0;
}
h4 {
  line-height: 40px;
  padding: 0 20px;
  text-align: center;
}
ul.controlls {
  max-width: 500px;
}
ul.controlls > li {
  width: 400px;
  padding: 4px 0;
}
.view-group {
  padding: 4px;
  margin: 4px;
}
.view-group-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.switch-to-model {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
