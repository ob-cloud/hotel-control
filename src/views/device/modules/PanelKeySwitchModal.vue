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
      <panel-key-switch :dataSource="dataSource" :count="switchCount" :keyTypes="keyTypes" @change="onKeyChange"></panel-key-switch>
    </a-spin>
  </a-drawer>
</template>
<script>
import PanelKeySwitch from '@/components/IoT/PanelKeySwitch'
import ActionMixin from '@/utils/mixins/ActionMixin'
import { controlHotelDevice } from '@/api/device'
import { Descriptor, SwitchEquip } from 'hardware-suit'
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
  mixins: [ ActionMixin ],
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
      switchEquip: null,
      switchCount: 3,
      keyTypes: {}
    }
  },
  watch: {
  },
  methods: {
    show (record) {
      this.model = Object.assign({}, record)
      this.visible = true
      this.title = `开关 - ${Descriptor.getTypeDescriptor(record.deviceType, record.deviceChildType)}(${record.deviceSerialId})`
      // this.switchEquip = new SwitchMixEquip(record.deviceState, record.deviceType, record.deviceChildType)
      const factory = new SwitchEquip(record.deviceState, record.deviceType, record.deviceChildType)
      this.switchEquip = factory.create()
      const pow = this.switchEquip.getPowerInt()
      const count = this.switchEquip.orderCount
      const keyTypes = this.switchEquip.keyTypes
      this.$nextTick(() => {
        this.dataSource = pow
        this.switchCount = count
        this.keyTypes = keyTypes
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
    // onKeyChange (status, oldStatus, record) {
    //   this.handlePower(status, oldStatus)
    // },
    onKeyChange (state, oldStatus, record) {
      this.switchEquip.setPower(state[record.index], record.index, record.extra)
      console.log('bytes --==== ', this.switchEquip.getBytes())
      const status = this.switchEquip.getBytes()
      console.log('record ===== ', state, oldStatus)
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

