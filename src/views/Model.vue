<template>
  <div class="model">
    <div class="model-controll">
      <div class="text-input">
        <el-input v-model="text" type="text" placeholder="插入文本"/>
        <el-input v-model="theoryNum" placeholder="理论生产节拍"/>
        <el-input v-model="actualNum" placeholder="实际生产节拍"/>
        <el-button @click="onInsertText">确定</el-button>
      </div>

    </div>  
    <div ref="container" class="model-container"></div>
  </div>
</template>
<script>
import { viewService } from "../service/viewService";

export default {
  data(){
    return {
      text: '',
      theoryNum: '8',
      actualNum: '7'
    }
  },
  mounted() {
    const container = this.$refs.container
    viewService.init(container)

    viewService.modelLoadService.loadModel().then((mixer) => {
      viewService.render();
      viewService.enableControll()
     // viewService.modelLoadService.startAnimation(() => viewService.render());
    });
  },
  methods: {
    onInsertText(){
       viewService.onInsertText({
        text: this.text,
        theoryTitle: '理论生产节拍',
        actualTitle: '实际生产节拍',
        theoryNum: this.theoryNum,
        actualNum: this.actualNum
      })
    }
  }
};
</script>
<style scoped>
.model-container {
  width: 800px;
  height: 800px;
  margin: 0 auto;
}
.text-input {
  width: 600px;
  display: flex;
  margin: 0 auto;
}
</style>
