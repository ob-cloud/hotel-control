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
        rowKey="deviceId"
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
  import { getInfratedDeviceList } from '@/api/device'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'

  export default {
    name: 'RoomBindOboxModal',
    mixins: [ ProListMixin ],
    data () {
      return {
        drawerWidth: 700,
        title: '绑定红外',
        visible: false,
        model: {},
        hotelId: '',
        columns: [
          {
            title: '序列号',
            align: 'center',
            dataIndex: 'deviceId',
          },
          {
            title: '设备名称',
            align: 'center',
            dataIndex: 'name',
          },
          {
            title: '设备状态',
            align: 'center',
            dataIndex: 'online',
            customRender (status) {
              return status === 0 ? '在线' : '离线'
            }
          },
          {
            title: '设备版本',
            align: 'center',
            dataIndex: 'version'
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
        this.hotelId && this.getDataSourceList(arg)
      },
      getDataSourceList (arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        const params = {}
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getInfratedDeviceList(params).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total || 0
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      },
      show (record) {
        this.visible = true
        this.model = Object.assign({}, record)
        // if (record.hasOwnProperty('id')) {
        //   this.hotelId = record.id
        //   this.getDataSourceList()
        // }
        this.getDataSourceList()
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
