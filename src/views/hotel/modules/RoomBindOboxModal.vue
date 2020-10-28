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
          <a @click="handleBind(record)">绑定</a>
        </span>
      </a-table>
    </a-card>
  </a-drawer>
</template>

<script>
  import { getRoomUnbindGatewayList, bindRoomGateway } from '@/api/hotel'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'

  export default {
    name: 'RoomBindOboxModal',
    mixins: [ ProListMixin ],
    data () {
      return {
        drawerWidth: 700,
        title: '绑定OBOX',
        visible: false,
        model: {},
        roomId: '',
        columns: [
          {
            title: '序列号',
            align: 'center',
            dataIndex: 'oboxSerialId',
          },
          {
            title: '设备名称',
            align: 'center',
            dataIndex: 'oboxName',
          },
          {
            title: '设备状态',
            align: 'center',
            dataIndex: 'isOnline',
            customRender (status) {
              return status ? '在线' : '离线'
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
            width: 170
          }
        ]
      }
    },
    methods: {
      loadData (arg) {
        this.roomId && this.getDataSourceList(arg)
      },
      getDataSourceList (arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        const params = {}
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getRoomUnbindGatewayList({...params, hotelId: this.$store.getters.hotelId}).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total || 0
          } else {
            this.$message.warning(res.message)
          }
        }).catch(() => this.$message.error('服务异常')).finally(() => this.loading = false)
      },
      show (record) {
        this.visible = true
        this.model = Object.assign({}, record)
        this.roomId = record.roomId
        this.getDataSourceList()
      },
      close () {
        this.$emit('close')
        this.visible = false
      },
      handleCancel () {
        this.close()
      },
      handleBind (record) {
        this.loading = true
        const params = {id: record.id, deviceSerialId: record.oboxSerialId}
        bindRoomGateway({...params, roomId: this.roomId}).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.loading = false
            this.$emit('ok', record.id, record.oboxSerialId)
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
