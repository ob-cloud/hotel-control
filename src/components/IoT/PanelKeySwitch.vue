<template>
  <div class="container">
    <a-checkbox-group v-model="powers">
      <a-checkbox v-for="(item, index) in count" :value="index" :key="index" @change="(e) => handleChange(e, {index})">
        <i class="obicon obicon-power"></i>
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    serialId: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      powers: []
    }
  },
  computed: {
    status () {
      return new Array(this.count).fill(0)
    }
  },
  mounted () {
    // if (this.isLightActive(this.state)) {
    //   this.powers = [1]
    // }
  },
  watch: {
    value () {
      // console.log('value ', val)
    }
  },
  methods: {
    isLightActive (status) {
      if (!status) return false
      const state = status.slice(0, 2)
      return state !== '00'
    },
    handleChange (e, record) {
      const item = e.target.checked
      const index = record.index
      const oldStatus = [...this.status]
      this.$set(this.status, index, +item)
      this.$emit('input', this.status, oldStatus)
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
