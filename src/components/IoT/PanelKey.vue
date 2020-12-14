<template>
  <div class="container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <div class="keys-wrapper">
        <div class="keys-list">
          <div class="keys-row" v-for="(t, idex) in typeList" :key="idex">
            <div class="keys-line" v-for="(line, idx) in t.row" :key="line">
              <template v-if="t.last && t.row === idx + 1">
                <div class="keys-item" :class="{'active': item === selectedKey}" v-for="(item, index) in type.last" :key="index" @click="onClickKey(item)">
                  <span class="dot"></span>
                  <span class="label">{{ item }}</span>
                </div>
              </template>
              <template v-else>
                <div class="keys-item" :class="{'active': item === selectedKey}" v-for="(item, index) in rowCount" :key="index" @click="onClickKey(item)">
                  <span class="dot"></span>
                  <span class="label">{{ item }}</span>
                </div>
              </template>

            </div>
          </div>
          <!-- <div class="keys-item" :class="{'active': item === selectedKey}" v-for="(item, index) in keyNum" :key="index" @click="onClickKey(item)">
            <span class="dot"></span>
            <span class="label">{{ item }}</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyPanel',
  props: {
    type: {
      type: String,
      default: '' // scene | mixup
    },
    typeIndex: { // 类型索引 3|3， 6
      type: [String, Number],
      default: '3'
    },
    rowCount: {
      type: Number,
      default: 3
    },
    keyNum: {
      type: Number,
      default: 6
    },
    labels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedKey: ''
    }
  },
  computed: {
    typeList () {
      const typeIndex = typeof this.typeIndex === 'number' ? '' + this.typeIndex : this.typeIndex
      const types = typeIndex.split('|')
      const filterTypes = types.filter(type => type)
      // ['6', '4'] ==> [{row: 2, last: 0}, {row：2， last: 1}]
      return filterTypes.map(type => {
        const r = +type / this.rowCount
        const isInteger = r % 1 === 0
        const row = isInteger ? r : Math.ceil(r)
        const lastItem = isInteger ? 0 : ('' + r).split('.')[1].slice(0, 1)
        return {
          row,
          last: lastItem
        }
      })
    }
  },
  methods: {
    onClickKey (selectedKey) {
      this.selectedKey = selectedKey
      this.$emit('selected', selectedKey)
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .header {}
  .content {
    padding: 10px;
    text-align: center;

    .keys-wrapper{
      width: 200px;
      margin: 10px auto;
      padding: 10px;
      border: 1px solid #000;
      border-radius: 6px;

      .keys-list{

      }
      .keys-item{
        display: inline-block;
        position: relative;
        cursor: pointer;
        padding: 10px 0;
        & .dot{
          width: 20px;
          height: 20px;
          border: 1px solid #000;
          border-radius: 100%;
          margin: 12px 16px;
          display: inline-block;
          transition: all .3s;
        }
        & .label{
          color: #A2AAB5;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
        }
        &.active,
        &:hover{
          & .dot {
            border-color: #0185ED;
          }
        }
      }
    }
  }
}
</style>
