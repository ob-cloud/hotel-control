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
      <air-condition @change="handleChange" :equip="equip"></air-condition>
    </a-spin>
  </a-drawer>
</template>

<script>
import { Descriptor, AirConditionEquip } from 'hardware-suit'
import AirCondition from '@/components/IoT/AirCondition2'
import { controlHotelIrDevice } from '@/api/device'
export default {
  components: { AirCondition },
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
      drawerHeight: 600,
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
      this.equip = new AirConditionEquip('', record.deviceType, '', record)
      // if (record.serialId) {
      //   getHotelInfraredKeys(record.serialId, this.$store.getters.hotelId).then(res => {
      //     if (this.$isAjaxSuccess(res.code)) {
      //       const air = res.result.find(item => item.index === record.indexOsm)
      //       this.equip = new AirConditionEquip('', air.deviceType, '', air)
      //     }
      //   })
      // }
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
      console.log('-=-=-=-= ', status)
      this.model.indexOsm = this.model.indexOsm + ''
      this.model.key = status
      this.model.hotelId = this.$store.getters.hotelId
      this.loading = true
      controlHotelIrDevice(this.model).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
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
