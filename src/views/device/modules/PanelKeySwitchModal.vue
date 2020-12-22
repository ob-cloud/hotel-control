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
      <curtain v-if="isCurtain" :dataSource="dataSource" @change="onKeyChange"></curtain>
      <panel-key-switch v-else ref="switch" :dataSource="dataSource" :count="switchCount" :showTips="false" :keyTypes="keyTypes" @change="onKeyChange"></panel-key-switch>
    </a-spin>
  </a-drawer>
</template>
<script>
import PanelKeySwitch from '@/components/IoT/PanelKeySwitch'
import Curtain from '@/components/IoT/Curtain'
import ActionMixin from '@/utils/mixins/ActionMixin'
import { controlHotelDevice } from '@/api/device'
import { Descriptor, SwitchEquip } from 'hardware-suit'
export default {
  components: { PanelKeySwitch, Curtain },
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
      keyTypes: {},
      isCurtain: false
    }
  },
  watch: {
  },
  methods: {
    show (record) {
      this.model = Object.assign({}, record)
      this.visible = true
      this.title = `开关 - ${Descriptor.getTypeDescriptor(record.deviceType, record.deviceChildType)}(${record.deviceSerialId})`
      const factory = new SwitchEquip(record.deviceState, record.deviceType, record.deviceChildType)
      this.switchEquip = factory.create()
      const pow = this.switchEquip.getPowerInt()
      const count = this.switchEquip.orderCount
      const keyTypes = this.switchEquip.keyTypes
      this.isCurtain = this.switchEquip.isCurtain
      console.log('keyTypes    ', pow, count)
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
      const status = this.switchEquip.getBytes()
      if (!this.model.deviceSerialId) return
      this.confirmLoading = true
      controlHotelDevice(this.model.deviceSerialId, status).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
          if (this.switchEquip.isScene || this.switchEquip.isSwitchScene || this.switchEquip.isInfraredScene || this.switchEquip.isRadarScene) {
            // TODO 开关不用重置
            !record.extra && this.switchEquip.setPower(oldStatus[record.index], record.index, record.extra)
            setTimeout(() => { // 情景操作后，重置
              this.$refs.switch.resetScene(oldStatus)
            }, 1000);
          }
        } else {
          this.$message.error(res.message)
          // this.switchEquip.reset(oldStatus)
          this.$refs.switch.reset(oldStatus)
        }
      })
      .catch(() => {
        this.$message.error('请求异常')
        // this.switchEquip.reset(oldStatus)
        this.$refs.switch.reset(oldStatus)
      })
      .finally(() => this.confirmLoading = false)
    }
  },
  destroyed () {
    // this.dataSource = []
  }
}
</script>

