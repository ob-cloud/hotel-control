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
    <a-spin :spinning="loading">
      <wire-condition @change="handleChange" :equip="equip"></wire-condition>
    </a-spin>
  </a-drawer>
</template>

<script>
import { Descriptor, WireConditionEquip } from 'hardware-suit'
import WireCondition from '@/components/IoT/WireCondition'
import { controlHotelDevice, getHotelDeviceList } from '@/api/device'
export default {
  components: { WireCondition },
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
      drawerHeight: 650,
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
      equip: {},
      loading: false
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
      this.title = `红外控制 - ${Descriptor.getTypeDescriptor(record.deviceType, record.deviceChildType) || record.name}(${record.deviceSerialId})`
      this.equip = new WireConditionEquip(record.deviceState, record.deviceType, record.deviceChildType)
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
    handleChange (status) {
      this.loading = true
      controlHotelDevice(this.model.deviceSerialId, status).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
          if (status.slice(0, 2) === '01') {
            setTimeout(() => {
              this.loading = true
              getHotelDeviceList({pageNo: 1, pageSize: 10, deviceSerialId: this.model.deviceSerialId, hotelId: this.$store.getters.hotelId}).then(res => {
                if (this.$isAjaxSuccess(res.code)) {
                  const record = res.result.records[0]
                  if (record) this.equip = new WireConditionEquip(record.deviceState, record.deviceType, record.deviceChildType)
                }
              }).finally(() => this.loading = false)
            }, 1000)
          }
        } else this.$message.error(res.message || '操作失败')
      }).catch(() => this.$message.error('服务异常')).finally(() => this.loading = false)
    }
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
