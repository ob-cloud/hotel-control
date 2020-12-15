<template>
  <div class="container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <div class="keys-wrapper" :style="`${typeof width === 'number' ? 'width: ' + width + 'px' : 'width: ' + width}`">
        <div class="keys-list">
          <div class="keys-row" v-for="(t, idex) in typeList" :key="idex">
            <!-- <div class="keys-line" v-for="(line, idx) in t.row" :key="line">
              <template v-if="t.last && t.row === idx + 1">
                <div class="keys-item" :class="{'active': item === selectedKey}" v-for="(item, index) in t.last" :key="index" @click="onClickKey(t.row + item + 1)">
                  <span class="dot"></span>
                  <div class="label" @click="handleLabel(t.row + item + 1)">
                    <a-input
                      v-if="record.editable"
                      style="margin: -5px 0"
                      :value="text"
                      @change="e => handleChange(e.target.value, record.key, col)"
                    />
                    <template v-else>
                      {{ t.row + item + 1 }}
                    </template>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="keys-item" :class="{'active': item === selectedKey}" v-for="(item, index) in rowCount" :key="index" @click="onClickKey(item)">
                  <span class="dot"></span>
                  <span class="label">{{ item }}</span>
                </div>
              </template>
            </div> -->

            <div class="keys-item" v-for="(item, index) in typeObj" :key="index">
              <span class="dot" @click="handleClick(item, index)"></span>
              <!-- <span class="label">{{ `按键 - ${item}` }}</span> -->
              <div class="label" style="width: 110px;" :style="`${item.editable ? 'transform: translateX(-40%)' : 'transform: translateX(-50%)'}`">
                <div v-if="item.editable">
                  <a-input
                    :value="item.v"
                    size="small"
                    style="width: 60px"
                    @change="e => handleChange(e.target.value, item)"
                  />
                  <a-icon class="icon" type="check" title="确认" @click="hanleCheck(item, index)"></a-icon>
                  <a-icon class="icon" type="delete" title="取消" @click="handleCancel(item, index)"></a-icon>
                </div>
                <template v-else>
                  {{ item.v }}
                </template>
              </div>
            </div>
          </div>
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
    width: {
      type: [String, Number],
      default: 400
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedKey: '',
      list: []
    }
  },
  computed: {
    typeObj () {
      return this.dataSource && this.dataSource.length ? this.list : this.initList()
    },
    typeList () {
      const typeIndex = typeof this.typeIndex === 'number' ? '' + this.typeIndex : this.typeIndex
      const types = typeIndex.split('|')
      const filterTypes = types.filter(type => type)
      // ['6', '4'] ==> [{row: 2, last: 0}, {row：2， last: 1}]
      const list = filterTypes.map(type => {
        const r = +type / this.rowCount
        const isInteger = r % 1 === 0
        const row = isInteger ? r : Math.ceil(r)
        const p = +('' + r).split('.')[0]
        const lastItem = isInteger ? 0 : type - p * this.rowCount
        return {
          row,
          last: lastItem
        }
      })
      return list
    }
  },
  watch: {
    dataSource (v) {
      if (v) {
        this.list = v.map(item => {
          return {
            id: item.childId,
            pid: item.deviceSerialId,
            v: item.name,
            editable: false
          }
        })
      }
    }
  },
  methods: {
    initList () {
      for (let index = 0; index < this.keyNum; index++) {
        this.list.push({
          v: index + 1,
          editable: false
        })
      }
      console.log('tyoeList ', this.list)
      return this.list
    },
    onClickKey (selectedKey) {
      this.selectedKey = selectedKey
      this.$emit('selected', selectedKey)
    },
    handleClick (item, index) {
      item.editable = true
      console.log('---- ', item, index + 1)
    },
    handleChange (value, item, index) {
      console.log('----++ ', value, item, index)
      item.v = value
      this.$emit('change', value, item, index + 1)
    },
    hanleCheck (item, index) {
      this.$emit('check', item, index + 1)
      // item.editable = false
      console.log('check ', item, index)
    },
    handleCancel (item, index) {
      item.editable = false
      this.$emit('cancel', item, index + 1)
      console.log('---- ', item, index)
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
      // width: 400px;
      margin: 10px auto;
      padding: 20px 10px;
      // padding: 10px;
      border: 1px solid #c2c2c2;
      box-shadow: 0 0 2px 1px #eee;
      border-radius: 6px;

      .keys-list{

      }
      .keys-line{
        padding: 10px 0;
      }
      .keys-item{
        display: inline-block;
        position: relative;
        // cursor: pointer;
        padding: 10px 0;
        margin: 8px 0;
        width: 33%;

        & .dot{
          width: 20px;
          height: 20px;
          border: 1px solid #afacac;
          border-radius: 100%;
          margin: 12px 16px;
          display: inline-block;
          transition: all .3s;
          cursor: pointer;
        }
        & .label{
          color: #A2AAB5;
          position: absolute;
          // bottom: 0;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          transition: all .3s;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .icon {
            // vertical-align: middle;
            padding: 3px;
            cursor: pointer;
          }
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
