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
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >

        <span slot="action" slot-scope="text, record">
          <a @click="handleBind(record.id)">绑定</a>
        </span>
      </a-table>
    </a-card>
  </a-drawer>
</template>

<script>
  import { bindHotelUser } from '@/api/hotel'
  import { getUserList } from '@/api/system'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'

  export default {
    name: 'HotelUserModal',
    mixins: [ ProListMixin ],
    components: {
    },
    data () {
      return {
        modalWidth: 800,
        drawerWidth: 700,
        modaltoggleFlag: true,
        title: '绑定酒店用户',
        visible: false,
        model: {},
        hotelId: '',
        columns: [
          {
            title: '用户名',
            align: 'center',
            dataIndex: 'username',
            width: 120
          },
          {
            title: '账户名',
            align: 'center',
            dataIndex: 'account',
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
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getUserList(params).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
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
      },
      handleCancel () {
        this.close()
      },
      handleBind (userId) {
        this.loading = true
        bindHotelUser(this.hotelId, userId).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.loading = false
            this.$emit('ok', userId)
            this.$message.success('绑定成功')
          }else this.$message.error(res.message)
        }).finally(() => this.handleCancel())
      }
    }
  }
</script>

<style scoped>
  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }
</style>
