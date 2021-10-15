<template>
  <div class="view-group">
    <div class="view-group-title">
      <h3>geometry 几何体</h3>
      <el-button @click="cleanGeometry">清除场景</el-button>
    </div>
    <div class="three-geometry">
      <el-select v-model="selectValue" @change="onGeometryChange">
        <el-option
          :value="geometry"
          v-for="geometry in geometryList"
          :key="geometry"
        >
          {{ geometry }}
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { DEFAULT_GEOMERTY } from "../service/geometryService";
import { viewService } from "../service/viewService";
import { GeometryTypes } from "../utils/geometry";

export default {
  data() {
    return {
      geometryList: Object.keys(GeometryTypes),
      selectValue: DEFAULT_GEOMERTY,
    };
  },
  methods: {
    onGeometryChange() {
      viewService.onGeometryChange(this.selectValue);
    },
    cleanGeometry() {
      viewService.cleanGeometry();
      this.selectValue = "";
    },
  },
};
</script>
