<template>
  <a-modal :title="title" :width="400" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel" cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序列号">
          <a-input placeholder="请输入序列号" :disabled="!!model.id" v-decorator="[ 'serialId', { rules: [{ required: true, message: '请输入序列号!' }] }]" />
        </a-form-item>
      </a-form>
    </a-spin>

    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-popconfirm title="确认解绑？请谨慎操作！" @confirm="() => handleOk()">
        <a-button key="unbind" type="danger" :loading="confirmLoading">
          解绑
        </a-button>
      </a-popconfirm>
      <a-button key="bind" type="primary" :loading="confirmLoading" @click="handleOk">
        绑定
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { bindRoomVoiceDevice, unbindRoomVoiceDevice } from '@/api/hotel'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      title: '语音助手操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapGetters(['hotelId'])
  },
  methods: {
    add () {
      this.edit({})
    },
    edit (record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'serialId'))
      })
    },
    // 确定
    handleOk () {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let formData = Object.assign(this.model, values)
          formData = {...formData, hotelId: this.hotelId}
          let obj = !this.model.id ? bindRoomVoiceDevice(formData) : unbindRoomVoiceDevice(formData)
          obj.then((res) => {
            if (that.$isAjaxSuccess(res.code)) {
              that.$message.success(res.message)
              that.$emit('ok', { id: that.model.id || res.result.id, serialId: formData.serialId })
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
    }
  },
}
</script>

<style lang="less" scoped>

</style>
