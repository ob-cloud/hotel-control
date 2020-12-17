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
      <panel-key ref="panelKey" :serialId="deviceSerialId" :dataSource="dataSource" typeIndex="4" :keyNum="3" @check="handleCheck" @cancel="handleDelete"></panel-key>
    </a-spin>
  </a-drawer>
</template>


<script>
import { editPanelKeyName, getPanelKeysList } from '@/api/device'
import { Descriptor } from 'hardware-suit'
import PanelKey from '@/components/IoT/PanelKey'
export default {
  components: { PanelKey },
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
      title: "面板按键",
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
      loading: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      deviceSerialId: '',
      dataSource: []
    }
  },
  mounted () {

  },
  methods: {
    loadData () {
      this.loading = true
      getPanelKeysList(this.deviceSerialId).then(res => {
        if (this.$isAjaxSuccess(res.code)) this.dataSource = res.result || []
      }).finally(() => this.loading = false)
    },
    add () {
      this.edit({})
    },
    show (record) {
      this.model = Object.assign({}, record)
      this.visible = true
      this.title = `开关按键 - ${Descriptor.getTypeDescriptor(record.deviceType, record.deviceChildType)}(${record.deviceSerialId})`
      if (record.deviceSerialId) {
        this.deviceSerialId = record.deviceSerialId
        this.loadData()
      }
    },
    close () {
      this.$emit('close')
      this.disableSubmit = false
      this.visible = false
    },
    handleCheck (item, index) {
      const id = item.id || index
      const name = item.v
      const deviceSerialId = item.pid
      this.loading = true
      editPanelKeyName(id, deviceSerialId, name).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
          // item.editable = false
          this.$refs.panelKey.displayEditable(item, false)
          // this.loadData()
        } else this.$message.error(res.message || '操作失败')
      }).finally(() => this.loading = false)
    },
    handleDelete () {

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
