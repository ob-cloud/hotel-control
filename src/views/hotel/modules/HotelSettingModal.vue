<template>
  <a-modal :title="title" :width="700" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel" cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营业时间">
          <a-range-picker
            v-decorator="[ 'operTime', {rules: [{ required: true, message: '请选择营业时间!' }]} ]"
            format="h:mm"
            :showTime="true"
            :mode="['time', 'time']"
            valueFormat="h:mm"
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="签约时间">
          <a-range-picker
            v-decorator="[ 'signTime', {rules: [{ required: true, message: '请选择签约时间!' }]} ]"
            format="YYYY-MM-DD hh:mm:ss"
            valueFormat="YYYY-MM-DD hh:mm:ss"
            :placeholder="['入驻时间', '失效时间']"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收费设置">
          超过 <a-input-number v-decorator="[ 'fee.overTime', {rules: [{ required: true, message: '请填写收费时间!' }]}]" controls-position="right" :min="1"></a-input-number> 小时，收取租金
          <a-input-number v-decorator="[ 'fee.price', {rules: [{ required: true, message: '请填写租金!' }]} ]" controls-position="right" :min="1"></a-input-number> 元
        </a-form-item>

        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="租金">
          <a-input-number v-decorator="[ 'rent', {rules: [{ required: true, message: '请填写租金!' }]} ]" controls-position="right" :min="1"></a-input-number>
        </a-form-item> -->


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { getHotelSetting, addHotelSetting, editHotelSetting } from '@/api/hotel'
export default {
  data () {
    return {
      title: '酒店设置',
      visible: false,
      dateFormat: 'HH:mm',
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      moment,
      hotelId: ''
    }
  },
  methods: {
    add () {
      this.edit({})
    },
    edit (record) {
      this.form.resetFields()
      this.hotelId = record.id
      // this.model = Object.assign({}, record)
      this.visible = true
      // this.$nextTick(() => {
      //   this.form.setFieldsValue(pick(this.model, 'buildName'))
      // })
      this.initHotelSetting()
    },
    initHotelSetting () {
      getHotelSetting(this.hotelId).then(res => {
        if(this.$isAjaxSuccess(res.code)) {
          this.model = Object.assign({}, res.result || {})
          this.$nextTick(() => {
            const signTime = [this.model.checkTime, this.model.exitTime]
            const operTime = [this.model.startTime, this.model.endTime]
            const fee = {overTime: this.model.overTime, price: this.model.price}
            this.form.setFieldsValue({signTime, operTime, fee})
          })
        }
      })
    },
    // 确定
    handleOk () {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const model = Object.assign(this.model, values)
          let formData = {}
          formData.hotelId = this.$store.getters.hotelId
          formData.checkTime = model.signTime[0]
          formData.exitTime = model.signTime[1]
          formData.startTime = model.operTime[0]
          formData.endTime = model.operTime[1]
          formData.overTime = model.fee.overTime
          formData.price = model.fee.price
          console.log(model, formData)
          if (model.id) formData.id = model.id
          let obj = !this.model.id ? addHotelSetting(formData) : editHotelSetting(formData)
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
    }
  },
}
</script>

<style lang="less" scoped>

</style>
