<template>
  <div class="view-group  three-material">
    <div class="view-group-title">
      <h3><span>material 材质</span></h3>
      <el-button @click="cleanMaterial">清除场景</el-button>
    </div>
    <div class="material">
      <el-color-picker
        @change="onMaterialColorChange"
        v-model="materialColor"
      />
    </div>
    <div class="material">
      <el-select v-model="currentMenu">
        <el-option v-for="menu in materialMenu" :key="menu" :value="menu">{{
          menu
        }}</el-option>
      </el-select>
      <el-select
        @change="onMaterialTypeChange"
        v-if="materialType"
        v-model="currentType"
      >
        <el-option :value="type" v-for="type in materialType" :key="type">{{
          type
        }}</el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { viewService } from "../service/viewService";
import {
  MaterialMenu,
  DEFAULT_MATERIAL_COLOR,
  MaterialType,
  DEFAULT_MATERIAL_MENU,
} from "../utils/material";

export default {
  data() {
    return {
      materialMenu: MaterialMenu,
      currentMenu: DEFAULT_MATERIAL_MENU,
      //materialType: Object.keys(MaterialType),
      currentType: "",
      materialColor: DEFAULT_MATERIAL_COLOR,
    };
  },
  computed: {
    materialType() {
      return MaterialType[this.currentMenu];
    },
  },
  methods: {
    onMaterialTypeChange() {
      if (this.currentType) {
        viewService.onMaterialChange(this.currentType);
      }
    },
    cleanMaterial() {
      this.currentMenu = "";
      viewService.cleanMaterial();
    },
    onMaterialColorChange() {
      viewService.onMaterialColorChange(this.materialColor);
    },
  },
};
</script>

<style scoped>
.material > span,
.geometry > span {
  margin-right: 10px;
}
.material,
.geometry {
  display: flex;
  padding: 4px 0;
  align-items: center;
}
</style>
