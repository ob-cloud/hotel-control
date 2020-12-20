<template>
  <div class="container">
    <a-checkbox-group v-model="powers">
      <template v-for="(item, index) in keyTotalCount" :value="index">
        <a-checkbox v-if="countList[0] >= index + 1" :value="index" :key="index" @change="(e) => handleChange(e, {index, extra: 0})">
          <i class="obicon obicon-power" :title="getKeyTips()"></i>
        </a-checkbox>
        <a-checkbox v-else :value="index" :key="index" @change="(e) => handleChange(e, {index, extra: 1})">
          <i class="obicon obicon-power" :title="getKeyTips(1)"></i>
        </a-checkbox>
      </template>
      <!-- <a-checkbox v-for="(item, index) in keyTotalCount" :value="index" :key="index" @change="(e) => handleChange(e, {index})">
        <i class="obicon obicon-power"></i>
      </a-checkbox> -->
    </a-checkbox-group>
  </div>
</template>

<script>
const KeyTypeEnum = {
  SWITCH: 'switch',
  SCENE: 'scene',
  LINE: 'line',
  SOCKET: 'socket',
  RADAR: 'radar',
}
const KeyTypeDescriptor = {
  [KeyTypeEnum.SWITCH]: '触摸开关',
  [KeyTypeEnum.SCENE]: '情景开关',
  [KeyTypeEnum.LINE]: '单线开关',
  [KeyTypeEnum.SOCKET]: '插座开关',
  [KeyTypeEnum.RADAR]: '雷达开关'
}
export default {
  props: {
    keyTypes: { // 按键类型
      type: Object,
      default: () => {}
    },
    count: { // 按键数
      type: [Number, Array],
      default: 6
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      powers: []
    }
  },
  computed: {
    status () {
      return this.dataSource && this.dataSource.length ? this.dataSource : new Array(this.count).fill(0)
    },
    keyTotalCount () {
      if (!this.count) return 0
      if (typeof this.count === 'number') return this.count
      else if (this.count.length) return this.count.reduce((a, b) => +a + (+b))
    },
    countList () {
      if (typeof this.count === 'number') return [this.count]
      return this.count
    },
    validTypes () { //eg: ['switch', 'scene']
      if (!this.keyTypes) return []
      return Object.keys(this.keyTypes).filter(k => this.keyTypes[k])
    }
  },
  mounted () {
  },
  watch: {
    dataSource (val) {
      console.log(val)
      this.initPowers(val)
    }
  },
  methods: {
    initPowers (val) { // [0, 1, 0] => [1], [1, 1, 0] => [0, 1], [0, 1, 1] => [1, 2]
      if (!val) return
      let curValue = val
      if (val.length > this.count) {
        curValue = val.slice(0, this.count)
      }
      const powers = []
      curValue.forEach((item, index) => {
        if (item) powers.push(index)
      })
      if (powers.length) this.powers = powers
      // console.log('value +++ === ', val, this.powers)
    },
    getKeyTips (extra) { // 获取按键提示
      if (!this.validTypes || !this.validTypes.length) return ''
      if (this.validTypes.length === 1) return KeyTypeDescriptor[this.validTypes[0]]
      if (this.validTypes.length === 2) {
        // 情景混合开关
        const sceneIndex = this.validTypes.indexOf(KeyTypeEnum.SCENE)
        if (sceneIndex !== -1) {
          const unSceneIndex = 1 - sceneIndex
          return !extra ? KeyTypeDescriptor[KeyTypeEnum.SCENE] : KeyTypeDescriptor[this.validTypes[unSceneIndex]]
        }
        return ''
      }
    },
    handleChange (e, record) {
      const item = e.target.checked
      const index = record.index
      const oldStatus = [...this.status]
      this.$set(this.status, index, +item)
      this.$emit('change', this.status, oldStatus, record)
    }
  },
  destroyed () {
    this.powers = []
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 400px;
  margin: 20px auto;
  & /deep/ .ant-checkbox-group{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    background-color: #e7e7e7;

    padding: 20px 10px;
    border-radius: 4px;
  }
  & /deep/ .ant-checkbox-wrapper {

    width: 120px;
    height: 100px;
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;

    &  + .ant-checkbox-wrapper {
      margin-left: 0;
    }
    span{
      // display: inline-block;
      transition: all .3s;

      border: 1px solid #cfcbcb;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      vertical-align: middle;
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 4px;
      background-color: #e7e7e7;
      object-fit: contain;
      box-shadow: inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7, inset -5px 0 #d7d7d7;

      > i{
        font-size: 30px;
      }
    }
    span.ant-checkbox {
      display: none;
    }
  }
  & /deep/ .ant-checkbox-wrapper-checked span{
    color: #dd0b0b;
    background-color: #fff;
    border-color: #d8d815;
    // box-shadow: inset 0 5px white, inset 0 -3px #fbfb1c, inset 1px 0 #fbfb1c, inset -1px 0 #fbfb1c;
  }
}
</style>
