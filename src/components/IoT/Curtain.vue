<template>
  <div class="container">
    <a-radio-group v-model="power" name="radioGroup" @change="handleChange">
      <a-radio :value="2">
        <i class="obicon obicon-power"></i>
      </a-radio>
      <a-radio :value="0">
        <a-icon type="border" style="font-size: 16px;" />
      </a-radio>
      <a-radio :value="1">
        <a-icon type="pause" />
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      power: 0,
      oldPower: undefined
    }
  },
  watch: {
    dataSource (val) {
      if (val && val.length) this.power = val[0]
    },
    power (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.oldPower = oldVal
    }
  },
  methods: {
    handleChange () {
      this.$emit('change', this.power, this.oldPower)
    }
  },
  destroyed () {
    this.power = 0
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 400px;
  margin: 20px auto;
  & /deep/ .ant-radio-group{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    background-color: #e7e7e7;

    padding: 20px 10px;
    border-radius: 4px;
  }
  & /deep/ .ant-radio-wrapper {

    width: 120px;
    height: 100px;
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;

    &  + .ant-radio-wrapper {
      margin-left: 0;
    }
    span{
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
    span.ant-radio {
      display: none;
    }
  }
  & /deep/ .ant-radio-wrapper-checked span{
    color: #dd0b0b;
    background-color: #fff;
    border-color: #d8d815;
  }
}
</style>
