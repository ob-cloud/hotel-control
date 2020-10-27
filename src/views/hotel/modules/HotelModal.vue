<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
  >

    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>

    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="酒店名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入酒店名称" v-decorator="[ 'hotelName', validatorRules.name]" :readOnly="!!model.id" />
        </a-form-item>

        <a-form-item label="所属公司" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <a-input type="company" placeholder="请输入所属公司" v-decorator="[ 'company', validatorRules.normal]" /> -->
          <a-select
            style="width: 100%"
            placeholder="请选择所属公司"
            :disabled="disableSubmit"
            v-decorator="[ 'companyId', { initialValue: undefined, rules: [{required: true, message: '请选择所属公司!'}]}]"
          >
            <a-select-option v-for="(company, companyIndex) in companyList" :key="companyIndex.toString()" :value="company.id">
              {{ company.companyName }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系人" :disabled="disableSubmit" v-decorator="[ 'contact', validatorRules.normal]" />
        </a-form-item>

        <a-form-item label="联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系方式" :disabled="disableSubmit" v-decorator="[ 'contactPhone', validatorRules.normal]" />
        </a-form-item>

        <a-form-item label="前台电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入前台电话" :disabled="disableSubmit" v-decorator="[ 'telephone', validatorRules.normal]" />
        </a-form-item>

        <a-form-item label="业务员" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            style="width: 100%"
            placeholder="请选择绑定业务员"
            optionFilterProp="children"
            v-decorator="[ 'saleManId', validatorRules.normal]"
            v-model="selectedUser"
            :disabled="disableSubmit"
          >
            <a-select-option v-for="(user, userIndex) in userList" :key="userIndex.toString()" :value="user.id">
              {{ user.realname }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="公司地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入公司地址" v-decorator="[ 'address', validatorRules.normal ]" :disabled="disableSubmit" />
        </a-form-item>

        <!-- <a-form-item label="是否连锁" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'isChain', {}]" placeholder="请选择连锁状态">
            <a-select-option :value="1">连锁酒店</a-select-option>
            <a-select-option :value="0">非连锁酒店</a-select-option>
          </a-select>
        </a-form-item> -->
      </a-form>

      <a-form v-if="showMoreDetail">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营业时间">
          <a-range-picker
            :disabled="disableSubmit"
            v-decorator="[ 'operTime', {rules: [{ required: true, message: '请选择营业时间!' }]} ]"
            format="h:mm"
            :showTime="true"
            :mode="['time', 'time']"
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="签约时间">
          <a-range-picker
            :disabled="disableSubmit"
            v-decorator="[ 'signTime', {rules: [{ required: true, message: '请选择签约时间!' }]} ]"
            format="YYYY-MM-DD"
            :placeholder="['入驻时间', '失效时间']"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收费设置">
          超过 <a-input-number :disabled="disableSubmit" v-decorator="[ 'fee.charge', {rules: [{ required: true, message: '请填写收费时间!' }]}]" controls-position="right" :min="1"></a-input-number> 小时，收取租金
          <a-input-number :disabled="disableSubmit" v-decorator="[ 'rent', {rules: [{ required: true, message: '请填写租金!' }]} ]" controls-position="right" :min="1"></a-input-number> 元
        </a-form-item>
      </a-form>
    </a-spin>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import pick from 'lodash.pick'
  import { addHotel, editHotel, getCompanyListAll } from '@/api/hotel'
  import { getUserListByType } from '@/api/system'

  export default {
    name: 'HotelModal',
    components: {
    },
    data () {
      return {
        modalWidth: 800,
        drawerWidth: 700,
        modaltoggleFlag: true,
        confirmDirty: false,
        hotelId: '', //保存酒店id
        disableSubmit: false,
        validatorRules: {
          name: {
            rules: [{
              required: true, message: '请输入酒店名称!'
            }]
          },
          normal: { rules: [{required: true, message: '不能为空!'}]},
          realname: {rules: [{ required: true, message: '请输入用户名称!' }]},
          phone: {rules: [{validator: this.validatePhone}]}
        },
        title: '操作',
        visible: false,
        model: {},
        userList: [],
        companyList: [],
        selectedUser: undefined,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
      }
    },
    computed: {
      showMoreDetail () {
        return this.title === '详情'
      }
    },
    methods: {
      //窗口最大化切换
      toggleScreen () {
        this.modalWidth = this.modaltoggleFlag ? window.innerWidth : 800
        this.modaltoggleFlag = !this.modaltoggleFlag;
      },
      initialUserList () {
        getUserListByType(0).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.userList = res.result
          } else {
            console.log(res.message)
          }
        })
      },
      initialCompanyList () {
        getCompanyListAll().then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.companyList = res.result
          } else {
            console.log(res.message)
          }
        })
      },
      refresh () {
        this.userId = ''
      },
      add () {
        this.refresh()
        this.edit({})
      },
      edit (record) {
        this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.initialUserList()
        this.initialCompanyList()
        this.form.resetFields()
        this.hotelId = record.id
        this.visible = true
        this.model = Object.assign({}, record)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'hotelName', 'companyId', 'contact', 'contactPhone', 'telephone', 'salemanId', 'address'))
        })
      },
      close () {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
        this.selectedUser = ''
      },
      handleSubmit () {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let formData = Object.assign(this.model, values)
            formData.salesmanId = this.selectedUser || ''

            if (!this.model.id) {
              formData.id = this.hotelId
            }
            let obj = !this.model.id ? addHotel(formData) : editHotel(formData)
            obj.then((res) => {
              if (this.$isAjaxSuccess(res.code)) {
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
      handleCancel () {
        this.close()
      },
      validatePhone(rule, value, callback) {
        if (!value) {
          callback()
        } else {
          if (new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/).test(value)) {
            callback()
          } else {
            callback('请输入正确格式的手机号码!')
          }
        }
      },
      handleConfirmBlur (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },

      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize() {
        let screenWidth = document.body.clientWidth
        this.drawerWidth = screenWidth < 500 ? screenWidth : 700
      },
    }
  }
</script>

<style scoped>
  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }

  .drawer-bootom-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>
