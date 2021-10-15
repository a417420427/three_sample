<template>
  <div class="view-group">
    <div class="view-group-title">
      <h3>动画和控制</h3>
    </div>
    <div class="three-controll">
      <div class="animation">
        <label>动画</label>
        <el-switch
          v-model="isAnimationOn"
          @change="toggleAnimation"
        ></el-switch>
      </div>
      <div class="controll">
        <label>控制</label>
        <el-switch v-model="isControllOn" @change="toggleControll">
          允许/禁止控制
        </el-switch>
      </div>
    </div>
  </div>
</template>
<script>
import { viewService } from "../service/viewService";

export default {
  data() {
    return {
      isAnimationOn: false,
      isControllOn: false,
    };
  },
  methods: {
    toggleAnimation() {
      if (this.isAnimationOn) {
        viewService.startAnimation();
      } else {
        viewService.stopAnimation()
      }
    },
    toggleControll() {
      if (this.isControllOn) {
        viewService.enableControll();
      } else {
        viewService.disableControll()
      }
    },
  },
};
</script>
<style scoped>
.three-controll {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 100px;
}
</style>
