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
  >

    <a-spin :spinning="confirmLoading">
      <panel-switch v-model="powers" :serialId="serialId" :state="state" :count="switchCount"></panel-switch>
    </a-spin>
  </a-drawer>
</template>
<script>
import PanelSwitch from '@/components/IoT/PanelKeySwitch'
import ActionMixin from '@/utils/mixins/ActionMixin'
import { controlHotelDevice } from '@/api/device'
import { Descriptor, SwitchEquip } from 'hardware-suit'
export default {
  components: { PanelSwitch },
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
      powers: [],
      serialId: '',
      state: '',
      powerStatus: [0, 0, 0],
      switchEquip: null,
      switchCount: 3
    }
  },
  watch: {
    powers (val, old) {
      console.log('new ', val)
      console.log('old ', old)
      this.handlePower(val)
    }
  },
  methods: {
    show (record) {
      this.model = Object.assign({}, record)
      this.visible = true
      this.title = `开关 - ${Descriptor.getTypeDescriptor(record.deviceType, record.deviceChildType)}(${record.deviceSerialId})`
      this.serialId = this.model.deviceSerialId
      this.state = this.model.state
      this.switchEquip = new SwitchEquip('21000000', '04', '23')
      this.switchCount = this.switchEquip.keyCount
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
    handlePower (state) {
      state.forEach((ele, index) => {
        this.switchEquip.setPower(ele, index)
      });
      console.log('bytes --==== ', this.switchEquip.getBytes())
      const status = this.switchEquip.getBytes()
      if (!this.model.serialId) return
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
    this.powers = []
  }
}
</script>

