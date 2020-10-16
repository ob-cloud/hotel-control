<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :height="drawerWidth"
    placement="bottom"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    :destroyOnClose="true"
    :bodyStyle="{height: 'calc(100% - 60px)'}"
  >
    <air-condition></air-condition>
  </a-drawer>
</template>

<script>
import { Descriptor } from 'hardware-suit'
import AirCondition from '@/components/IoT/AirCondition'
export default {
  components: { AirCondition },
  data () {
    return {
      drawerWidth: 600,
      title: "操作",
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      status: '',
      deviceType: '',
      deviceChildType: '',
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
      this.title = `红外控制 - ${Descriptor.getTypeDescriptor(record.type, record.device_child_type)}(${record.deviceId})`
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleCancel () {
      this.close()
    },
    handleOk () {
    },
  },
}
</script>

<style lang="less" scoped>
.box-card{
  margin: 10px;
}
.card-content__item{
  padding: 20px;
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
