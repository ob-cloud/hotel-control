<template>
  <a-modal :title="title" :width="600" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel" cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="楼栋">
          <a-select placeholder="请选择楼栋" v-decorator="[ 'buildId', validatorRules.buildId]" @change="handleBuildingChange" :disabled="readonly">
            <a-select-option v-for="item in buildingList" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="楼层">
          <a-select placeholder="请选择楼层" v-decorator="[ 'floorId', validatorRules.floorId]" :disabled="readonly">
            <a-select-option v-for="item in layerList" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="房间">
          <a-input placeholder="请输入房间" v-decorator="[ 'name', validatorRules.roomName]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getBuildingListWithoutPage, getFloorByBuildingId, addRoom, editRoom } from '@/api/hotel'
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: '操作',
      visible: false,
      model: {},
      buildingList: [],
      layerList: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        buildId: { rules: [{ required: true, message: '请选择楼栋!' }] },
        floorId: { rules: [{ required: true, message: '请选择楼层!' }] },
        roomName: { rules: [{ required: true, message: '请输入房间!' }] },
      }
    }
  },
  methods: {
    add () {
      this.edit({})
    },
    edit (record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.getBuildingList()
      if (record.buildId) this.getLayerList(record.buildId)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'buildId', 'floorId', 'name'))
      })
    },
    getBuildingList () {
      getBuildingListWithoutPage(this.$store.getters.hotelId).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.buildingList = res.result
        }
      })
    },
    getLayerList (buildId) {
      getFloorByBuildingId(buildId).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.layerList = res.result
        }
      })
    },
    handleBuildingChange (buildId) {
      this.form.setFieldsValue({'floorId': ''})
      this.getLayerList(buildId)
    },
    // 确定
    handleOk () {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          values.roomName = (values.roomName || '').trim()
          let formData = Object.assign(that.model, values)
          let obj = !that.model.id ? addRoom(formData) : editRoom(formData)
          obj.then((res) => {
            if (that.$isAjaxSuccess(res.code)) {
              that.$message.success(res.message)
              that.$emit('ok')
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
            that.confirmLoading = false
            that.close()
          })
        }
      })
    },
    // 关闭
    handleCancel () {
      this.close()
    },
    close () {
      this.$emit('close')
      this.visible = false
      this.confirmLoading = false
    }
  },
}
</script>

<style lang="less" scoped>

</style>
