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
  >

    <a-spin :spinning="confirmLoading">
      <panel-key-switch :dataSource="dataSource" :count="switchCount" @change="onKeyChange"></panel-key-switch>
    </a-spin>
  </a-drawer>
</template>
<script>
import PanelKeySwitch from '@/components/IoT/PanelKeySwitch'
import { controlHotelDevice } from '@/api/device'
import { Descriptor, CurtainEquip } from 'hardware-suit'
export default {
  components: { PanelKeySwitch },
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
      title: "总开关",
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
      dataSource: [],
      curtainEquip: null,
      switchCount: 3
    }
  },
  watch: {
  },
  methods: {
    show (record) {
      this.model = Object.assign({}, record)
      this.visible = true
      this.title = `智能开关 - ${Descriptor.getTypeDescriptor(record.deviceType, record.deviceChildType)}(${record.deviceSerialId})`
      this.curtainEquip = new CurtainEquip(record.deviceState, record.deviceType, record.deviceChildType)
      const pow = this.curtainEquip.getPower()
      console.log('-=-===- ', pow, this.curtainEquip.getStatusDescriptor())
      this.$nextTick(() => {
        this.dataSource = pow
        this.switchCount = [3]
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleCancel () {
      this.close()
    },
    handleOk () {
      this.$emit('ok')
      this.handleCancel()
    },
    onKeyChange (status, oldStatus, record) {
      this.handlePower(status, oldStatus)
    },
    onKeyChange (state, oldStatus, record) {
      this.curtainEquip.setStatus(state[record.index])
      console.log('bytes --==== ', this.curtainEquip.getBytes())
      const status = this.curtainEquip.getBytes()
      if (!this.model.deviceSerialId) return
      this.confirmLoading = true
      controlHotelDevice(this.model.deviceSerialId, status).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => this.confirmLoading = false)
    }
  },
  destroyed () {
    // this.dataSource = []
  }
}
</script>

