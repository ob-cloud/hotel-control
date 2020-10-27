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
    <a-card :bordered="false">
      <div class="table-operator" style="border-top: 5px">
        <a-button @click="handleBind" type="primary" icon="plus">绑定</a-button>
        <a-button @click="handleUnbindBatch" v-if="selectedRowKeys.length > 0" ghost type="primary" icon="delete">批量解绑</a-button>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >

        <span slot="action" slot-scope="text, record">
          <a-popconfirm title="解绑账户? 谨慎操作！" @confirm="() => handleUnbind(record.id)">
            <a>解绑</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
    <add-sys-user-to-Hotel-modal ref="modalForm" @ok="modalFormOk"></add-sys-user-to-Hotel-modal>
  </a-drawer>
</template>

<script>
  import { getUserListByHotel, unbindHotelUser } from '@/api/hotel'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import AddSysUserToHotelModal from './HotelAddUserFromSysModal.vue'
  export default {
    name: 'HotelUserModal',
    mixins: [ ProListMixin ],
    components: {
      AddSysUserToHotelModal
    },
    data () {
      return {
        modalWidth: 800,
        drawerWidth: 700,
        modaltoggleFlag: true,
        title: '酒店账户',
        visible: false,
        model: {},
        confirmLoading: false,
        hotelId: '',
        columns: [
          {
            title: '用户名',
            align: 'center',
            dataIndex: 'username',
            width: 120
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
            width: 170
          }
        ],
      }
    },
    methods: {
      loadData (arg) {
        this.hotelId && this.getUserList(arg)
      },
      getUserList (arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        const params = {}
        params.id = this.hotelId
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getUserListByHotel(params).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result
            this.ipagination.total = res.result.total || 0
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      },
      add () {
        this.edit({})
      },
      edit (record) {
        this.visible = true
        this.model = Object.assign({}, record)
        if (record.hasOwnProperty('id')) {
          this.hotelId = record.id
          this.getUserList()
        }
      },
      close () {
        this.$emit('close')
        this.visible = false
        this.onClearSelected()
      },
      handleCancel () {
        this.close()
      },
      handleBind () {
        this.$refs.modalForm.edit({id: this.hotelId})
      },
      handleUnbind (userId) {
        this.loading = true
        unbindHotelUser(this.hotelId, userId).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.getUserList()
            this.$message.success('解绑成功')
          }else this.$message.error(res.message)
        }).catch(this.$message.error('服务异常')).finally(() => this.loading = false)
      },
      handleUnbindBatch () {}
    }
  }
</script>

<style scoped>
  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }
</style>
