<template>
  <div class="view-group three-light">
    <div class="view-group-title">
      <h3>Light 光源</h3>
      <div class="view-controll">
        物体颜色
        <el-color-picker
          @change="onPointerMatrialColorChange"
          v-model="colors.MATERIAL_COLOR"
        />
        <el-button @click="removeLight">清除场景</el-button>
      </div>
    </div>
    <div class="three-pointer">
      <label>点光源</label>
      <el-select
        @change="
          onLightChange({
            type: LightType.PointLight,
            position: pointPositions[pointPosition],
            color: colors.POINTER_COLOR,
          })
        "
        v-model="pointPosition"
      >
        <el-option
          :value="k"
          :key="k"
          v-for="k in Object.keys(pointPositions)"
          >{{ pointPositionText[k] }}</el-option
        >
      </el-select>
      <el-color-picker
        @change="
          () =>
            onLightChange({
              type: LightType.PointLight,
              color: colors.POINTER_COLOR,
            })
        "
        v-model="colors.POINTER_COLOR"
      />
    </div>
    <div class="three-ambient">
      <label>环境光</label>
      <el-switch
        @change="
          () =>
            onLightChange({
              type: LightType.AmbientLight,
              visible: ambientVisible,
            })
        "
        v-model="ambientVisible"
      />
      <el-color-picker
        @change="
          () =>
            onLightChange({
              type: LightType.AmbientLight,
              color: colors.AMBIENT_COLOR,
              viewService: ambientVisible,
            })
        "
        v-model="colors.AMBIENT_COLOR"
      />
    </div>
    <div class="three-direction">
      <label>平行光</label>
      <el-switch
        @change="
          () =>
            onLightChange({
              type: LightType.DirectionalLight,
              visible: directionVisible,
            })
        "
        v-model="directionVisible"
      />
      <el-color-picker
        @change="
          () =>
            onLightChange({
              type: LightType.DirectionalLight,
              color: colors.DIRECTION_COLOR,
              visible: directionVisible,
            })
        "
        v-model="colors.DIRECTION_COLOR"
      />
    </div>
    <div class="three-direction">
      <label>聚光源</label>
      <el-switch
        @change="
          () =>
            onLightChange({
              type: LightType.SpotLight,
              visible: spotVisible,
            })
        "
        v-model="spotVisible"
      />
      <el-color-picker
        @change="
          () =>
            onLightChange({
              type: LightType.SpotLight,
              color: colors.SPOT_COLOR,
              visible: spotVisible,
            })
        "
        v-model="colors.SPOT_COLOR"
      />
    </div>
  </div>
</template>
<script>
import {
  LightType,
  POINTER_COLOR,
  AMBIENT_COLOR,
  DIRECTION_COLOR,
  SPOT_COLOR,
  MATERIAL_COLOR,
  pointPositions,
  pointPositionText,
} from "../service/lightService";
import { viewService } from "../service/viewService";

export default {
  data() {
    return {
      colors: {
        SPOT_COLOR,
        POINTER_COLOR,
        DIRECTION_COLOR,
        AMBIENT_COLOR,
        MATERIAL_COLOR,
      },
      ambientVisible: false,
      directionVisible: false,
      spotVisible: false,

      pointPositions,
      pointPositionText,

      LightType,
      pointPosition: "",
    };
  },
  methods: {
    onLightChange(options) {
      viewService.onLightChange(options);
    },
    removeLight() {
      viewService.removeLight();
      this.initEnv();
    },
    onPointerMatrialColorChange() {
      viewService.onPointerMatrialColorChange(this.colors.MATERIAL_COLOR);
    },
    initEnv() {
      Object.keys(this.colors).forEach((key) => {
        this.colors[key] = MATERIAL_COLOR;
      });
      this.pointPosition = "";
    },
  },
};
</script>

<style scoped>
.three-pointer {
  display: flex;
  flex-wrap: wrap;
}
.three-pointer > label {
  line-height: 48px;
  margin-right: 10px;
}
.three-pointer > button {
  margin: 4px;
}
.three-ambient,
.three-direction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40px;
  padding: 4px 100px 4px 0;
}
.three-ambient > label,
.three-direction > label {
  margin-right: 10px;
}
.view-controll {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
