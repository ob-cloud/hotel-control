<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :height="drawerHeight"
    :width="drawerWidth"
    :placement="placement"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    :destroyOnClose="true"
    :bodyStyle="{height: 'calc(100% - 60px)'}"
  >
    <a-spin :spinning="confirmLoading">
      <bizz-lamp :siderWidth="150" :status="status" :deviceType="deviceType" :deviceChildType="deviceChildType" @change="handleLampChange"></bizz-lamp>
    </a-spin>
  </a-drawer>
</template>


<script>
import { controlHotelDevice } from '@/api/device'
import { LedLampEquip, Descriptor } from 'hardware-suit'
import BizzLamp from '@/components/Bizz/BizzLamp'
export default {
  components: { BizzLamp },
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    drawerWidth: {
      type: [String, Number],
      default: '100%'
    }
  },
  data () {
    return {
      drawerHeight: 500,
      title: "灯控",
      visible: false,
      disableSubmit: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

      confirmLoading: false,
      ledLampEquip: null,

      status: '',
      deviceType: '',
      deviceChildType: '',
      power: false,
      bright: 0,
      color: 0,
      lampColor: '#fff',
      exception: '',
      isColorLamp: false,
      exceptionText: ''
    }
  },
  watch: {
    power (power) {
      // #f4f980 f5ff07
      this.lampColor = power ? 'rgba(244, 255, 0, 0.6)' : '#666'
    },
    bright (bright) {
      const alpha = (bright / 100 * 0.4) + 0.6
      this.lampColor = this.power ? `rgba(244, 255, 0, ${alpha})` : this.lampColor
    },
    color (color) {
      console.log('color  ', color)
    }
  },
  computed: {
    isPowerOn () {
      return this.power
    }
  },
  mounted () {

  },
  methods: {
    add () {
      this.edit({})
    },
    show (record) {
      this.model = Object.assign({}, record)
      this.visible = true
      this.title = `灯控 - ${Descriptor.getTypeDescriptor(record.deviceType, record.deviceChildType)}(${record.deviceSerialId})`

      this.status = record.deviceState
      this.deviceType = record.deviceType
      this.deviceChildType = record.deviceChildType

      const ledLampEquip = this.ledLampEquip = new LedLampEquip(record.deviceState, record.deviceType, record.deviceChildType)
      this.isColorLamp = ledLampEquip.isBicolor()
      this.power = ledLampEquip.isPowerOn()
      this.bright = ledLampEquip.getBrightness()
      this.color = ledLampEquip.getColdColor()
      this.exceptionText = ledLampEquip.getLampExceptionStatus()
    },
    close () {
      this.$emit('close')
      this.disableSubmit = false
      this.visible = false
    },
    handleCancel () {
      this.close()
    },
    handleLampChange (status, lampStatusInfo) {
      console.log('lamp ', lampStatusInfo)
      this.confirmLoading = true
      controlHotelDevice(this.model.deviceSerialId, status).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('成功')
          this.confirmLoading = false
        } else {
          this.$message.error('失败')
        }
      }).finally(() => this.confirmLoading = false)
    }
  }
}
</script>


<style lang="less" scoped>
.box-card{
  margin: 10px;
}
.card-content__item{
  padding: 20px;
  // border-bottom: 1px solid #3A4257;

  > div{
    text-align: right;
    line-height: 38px;
  }
}
.toolbox{
  position: absolute;
  left: 212px;
  right: 0;
  bottom: 0;
  text-align: right;
  padding: 6px;
  padding-right: 30px;
  background: #2C3449;
}
</style>
