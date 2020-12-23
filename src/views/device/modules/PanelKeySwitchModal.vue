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
      <curtain v-if="isCurtain" ref="curtain" :dataSource="dataSource" :group="curtainGroup" @change="onCurtainKeyChange"></curtain>
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
      isCurtain: false,
      curtainGroup: 0
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
      let power = this.switchEquip.getPowerInt()
      const count = this.switchEquip.orderCount
      const keyTypes = this.switchEquip.keyTypes
      this.isCurtain = this.switchEquip.isCurtain

      this.$nextTick(() => {
        if (this.isCurtain) {
          power = this.switchEquip.getCurtainPowerInt()
          // 3个一组
          this.curtainGroup = count.length ? count[0] / 3 : 0
        }
        this.dataSource = power
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
    onCurtainKeyChange (status, oldStatus, record, row) {
      const setStatus = (list, record) => {
        // 重置
        new Array(this.switchEquip.orderCount[0]).fill(0).forEach((item, index) => this.switchEquip.setPower(item, index))
        // list.forEach((state, index) => {
        //   this.switchEquip.setPower(1, record[index])
        // })
        // list[row]
        // 各窗帘面板互不干扰， row为对应的行（或第几个面板）
        this.switchEquip.setPower(1, record[row])
      }
      console.log('-=== curtain  ', status.join(','), oldStatus.join(','), record)
      setStatus(status, record)
      const bytes = this.switchEquip.getBytes()
      if (!this.model.deviceSerialId) return
      this.confirmLoading = true
      controlHotelDevice(this.model.deviceSerialId, bytes).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.message || '操作失败')
          setStatus(oldStatus, record)
          this.$refs.curtain.reset(oldStatus)
        }
      })
      .catch(() => {
        this.$message.error('请求异常')
        setStatus(oldStatus, record)
        this.$refs.curtain.reset(oldStatus)
      })
      .finally(() => this.confirmLoading = false)
    },
    onKeyChange (state, oldStatus, record) {
      const setStatus = (status, record) => this.switchEquip.setPower(status[record.index], record.index, record.extra)
      // this.switchEquip.setPower(state[record.index], record.index, record.extra)
      setStatus(state, record)
      const status = this.switchEquip.getBytes()
      if (!this.model.deviceSerialId) return
      this.confirmLoading = true
      controlHotelDevice(this.model.deviceSerialId, status).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')

          // 重置情景，开关不用重置
          if (this.switchEquip.isScene || this.switchEquip.isSwitchScene || this.switchEquip.isInfraredScene || this.switchEquip.isRadarScene) {
            !record.extra && this.switchEquip.setPower(oldStatus[record.index], record.index, record.extra)
            setTimeout(() => { // 情景操作后，重置
              this.$refs.switch.resetScene(oldStatus)
            }, 1000);
          }
        } else {
          this.$message.error(res.message || '操作失败')
          // this.switchEquip.reset(oldStatus)
          setStatus(oldStatus, record)
          this.$refs.switch.reset(oldStatus)
        }
      })
      .catch(() => {
        this.$message.error('请求异常')
        // this.switchEquip.reset(oldStatus)
        setStatus(oldStatus, record)
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

