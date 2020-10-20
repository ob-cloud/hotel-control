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

    <a-page-header
      :title="`${model.roomName}房`"
      :breadcrumb="{ props: { routes } }"
      :sub-title="`${model.buildingName}栋${model.floorName}层`"
    />
    <a-descriptions style="padding: 10px 24px;">
      <a-descriptions-item label="室内温度">{{ model.temperature }}℃</a-descriptions-item>
      <a-descriptions-item label="插卡取电">
        <a-badge style="margin-left: 10px" :status="model.lightState ? 'processing' : 'default'" />
        {{ `${model.lightState ? '取电中' : '未使用'}` }}
      </a-descriptions-item>
      <a-descriptions-item label="在住状态">
        <a-badge style="margin-left: 10px" :status="model.lightState ? 'success' : 'default'" />
        {{ `${model.lightState ? '在住' : '空闲'}` }}
      </a-descriptions-item>
    </a-descriptions>

    <a-tabs default-active-key="1" style="padding: 10px 24px;" :animated="{tabPane: false}">
      <a-tab-pane key="1" tab="设备">
        <a-table bordered size="small" rowKey="deviceSerialId" :columns="deviceColumns" :dataSource="deviceList" :loading="loading"></a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="红外" force-render>
        <a-table bordered size="small" rowKey="deviceSerialId" :columns="infraredColumns" :dataSource="deviceList" :loading="loading"></a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="网关">
        <a-table bordered size="small" rowKey="deviceSerialId" :columns="oboxColumns" :dataSource="deviceList" :loading="loading"></a-table>
      </a-tab-pane>
    </a-tabs>

    <bind-obox-modal ref="bindModal" @ok="bindModalOk"></bind-obox-modal>
  </a-drawer>
</template>

<script>
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import { getRoomDeviceList } from '@/api/hotel'

import { Descriptor } from 'hardware-suit'
import BindOboxModal from './BindOboxModal'

const deviceColumns = [
  {
    title: '序列号',
    align: 'center',
    dataIndex: 'deviceSerialId'
  },
  {
    title: '设备名称',
    align: 'center',
    dataIndex: 'deviceName'
  },
  {
    title: '设备状态',
    align: 'center',
    dataIndex: 'deviceState',
    customRender (status, row) {
      return Descriptor.getStatusDescriptor(status, row.deviceType, row.deviceChildType)
    }
  },
  {
    title: '设备类型',
    align: 'center',
    dataIndex: 'deviceType',
    customRender (t) {
      return Descriptor.getTypeDescriptor(t)
    }
  },
  {
    title: '设备子类型',
    align: 'center',
    dataIndex: 'device_child_type',
    customRender (t, row) {
      return Descriptor.getTypeDescriptor(row.device_type, t)
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
const infraredColumns = [
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
]
const oboxColumns = [
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
]
export default {
  mixins: [ProListMixin],
  components: { BindOboxModal },
  data() {
    return {
      title: '房间详情',
      drawerWidth: '60%',
      visible: false,
      loading: false,
      roomId: '',
      model: {},
      deviceList: [],
      deviceColumns: deviceColumns,
      infraredColumns: infraredColumns,
      oboxColumns: oboxColumns,
    }
  },
  computed: {
    routes () {
      return this.$route.matched.concat().map(route => {
        return {
          path: route.path,
          breadcrumbName: route.meta.title,
        }
      })
    }
  },
  watch: {
    oboxList (list) {
      if (!list || !list.length) {
        this.deviceList = []
        return
      }
      this.getDeviceList()
    }
  },
  methods: {
    loadData () {
    },
    getDeviceList () {
      this.loading = true
      getRoomDeviceList({ roomId: this.roomId }).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.deviceList = res.result.records
        }
      }).finally(() => this.loading = false)
    },
    show (record) {
      this.visible = true
      console.log('---- ', record)
      this.roomId = record.id
      this.model = { ...record }
      this.loadData(record.id)
    },
    handleBind () {
      this.$refs.bindModal.show({ roomId: this.roomId })
    },
    bindModalOk (selection) {
      console.log(selection)
      this.oboxList = selection
    },
    handleOk () {
      this.$emit('ok')
      this.handleCancel()
    },
    // 关闭
    handleCancel () {
      this.close()
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleTabChange (key) {
      console.log('')
      this.tabActiveKey = key
    }
  },
}
</script>

<style lang="less" scoped>
.tag{
  position: relative;
  padding: 28px 50px;
}
.close{
  float: right;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>
