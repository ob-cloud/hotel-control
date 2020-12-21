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
      <curtain :dataSource="dataSource" @change="onKeyChange"></curtain>
    </a-spin>
  </a-drawer>
</template>
<script>
import Curtain from '@/components/IoT/Curtain'
import { controlHotelDevice } from '@/api/device'
import { Descriptor, CurtainEquip } from 'hardware-suit'
export default {
  components: { Curtain },
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
      const pow = this.curtainEquip.curStatusInt
      this.$nextTick(() => {
        this.dataSource = [pow]
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
    onKeyChange (state, oldState) {
      this.curtainEquip.setStatus(state)
      const status = this.curtainEquip.getBytes()
      if (!this.model.deviceSerialId) return
      this.confirmLoading = true
      controlHotelDevice(this.model.deviceSerialId, status).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
        } else {
          this.curtainEquip.setStatus(oldState)
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

