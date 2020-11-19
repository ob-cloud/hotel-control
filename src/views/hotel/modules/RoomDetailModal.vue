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
      :title="`${model.name}`"
      :breadcrumb="{ props: { routes } }"
      :sub-title="`${model.buildName}${model.floorName}`"
    />
    <a-descriptions style="padding: 10px 24px;">
      <a-descriptions-item label="室内温度"><i v-if="model.temperature" class="obicon obicon-temperature" style="color: #fa8c16;"></i>{{ model.temperature ? `${model.temperature}℃` : '--' }}</a-descriptions-item>
      <a-descriptions-item label="插卡取电">
        <a-badge style="margin-left: 10px" :status="model.elec ? 'processing' : 'default'" :text="`${model.elec ? '取电中' : '未使用'}`" />
      </a-descriptions-item>
      <a-descriptions-item label="在住状态">
        <a-badge style="margin-left: 10px" :status="model.elec ? 'success' : 'default'" :text="`${model.elec ? '在住' : '空闲'}`" />
      </a-descriptions-item>
    </a-descriptions>

    <a-row :gutter="10" style="padding: 10px 24px;">
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">网关</span>
          <a slot="extra" href="#">
            <a-button v-isPermitted="'room:gateway:bind'" style="font-size: 12px;" size="small" type="link" @click="handleBind(1)">
              <a-space><i class="obicon obicon-bangding"></i>绑定</a-space>
            </a-button>
          </a>
          <a-list item-layout="horizontal" :data-source="oboxList" :loading="loadingGateway" :pagination="{pageSize: 10, size: 'small'}">
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">
                <a-popconfirm title="解绑网关，请谨慎操作！" @confirm="() => handleUnbind(1, item)">
                  <span v-isPermitted="'room:gateway:unbind'">解绑</span>
                </a-popconfirm>
              </a>
              <a-list-item-meta :description="item.oboxSerialId">
                <span slot="title">
                  {{ item.oboxName }}
                </span>
                <i slot="avatar" style="color: #5b94f0; font-size: 30px;" class="obicon obicon-equip"></i>
              </a-list-item-meta>
              <a-badge style="margin-left: 10px;" :status="item.isOnline ? 'success' : 'default'" :text="`${item.isOnline ? '在线' : '离线'}`" />
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">红外</span>
          <a slot="extra" href="#">
            <a-button v-isPermitted="'room:ir:bind'" style="font-size: 12px;" size="small" type="link" @click="handleBind(2)">
              <a-space><i class="obicon obicon-bangding"></i>绑定</a-space>
            </a-button>
          </a>
          <a-list item-layout="horizontal" :data-source="infraredList" :loading="loadingInfrared" :pagination="{pageSize: 10, size: 'small'}">
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">
                <a-popconfirm title="解绑红外，请谨慎操作！" @confirm="() => handleUnbind(2, item)">
                  <span v-isPermitted="'room:ir:unbind'">解绑</span>
                </a-popconfirm>
              </a>
              <a-list-item-meta :description="item.deviceSerialId">
                <span slot="title">
                  {{ item.deviceName }}
                </span>
                <i slot="avatar" style="color: #5b94f0; font-size: 30px;" class="obicon obicon-infrared"></i>
              </a-list-item-meta>
              <a-badge style="margin-left: 10px;" :status="item.isOnline ? 'success' : 'default'" :text="`${item.isOnline ? '在线' : '离线'}`" />
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>

    <a-tabs default-active-key="1" style="padding: 10px 24px;" :animated="{tabPane: false}">
      <a-tab-pane key="1" tab="网关设备">
        <a-table bordered size="small" rowKey="id" :columns="deviceColumns" :dataSource="deviceList" :loading="loading" :pagination="ipagination" @change="handleTableChange">
          <span slot="action" slot-scope="text, record">
            <a v-if="TypeHints.isXkeySocketSwitch(record.deviceChildType, record.deviceType)" @click="handleAction(0, record)">开关</a>
            <a v-if="TypeHints.isSettableSceneSocketSwitch(record.deviceChildType)" @click="handleAction(2, record)">设置</a>
            <a v-if="TypeHints.isHumidifierSensors(record.deviceChildType)" @click="handleAction(1, record)">温湿度</a>
            <a v-if="TypeHints.isSimpleLed(record.deviceChildType)" @click="handleAction(3, record)">灯控</a>
            <a v-if="TypeHints.isPluginPowerSensors(record.deviceChildType, record.deviceType)" @click="handleAction(4, record)">停用</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="红外设备" force-render>
        <a-table bordered size="small" rowKey="deviceSerialId" :columns="infraredColumns" :dataSource="irDeviceList" :loading="loading">
          <span slot="action" slot-scope="text, record">
            <a v-if="TypeHints.isInfrared(record.deviceType)" @click="handleAction(5, record)">控制</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>

    <!-- 绑定红外网关 -->
    <room-bind-obox-modal ref="bindModal" @ok="bindModalOk"></room-bind-obox-modal>
    <room-bind-infrared-modal ref="bindInfraredModal" @ok="bindModalOk"></room-bind-infrared-modal>

    <!-- 设备操作 -->
    <humidity-action-modal placement="right" :drawerWidth="600" ref="humidityModal"></humidity-action-modal>
    <lamp-action-modal placement="right" :drawerWidth="600" ref="lampModal"></lamp-action-modal>
    <keypanel-action-modal placement="right" drawerWidth="60%" ref="keypanelModal"></keypanel-action-modal>
    <power-switch-modal placement="right" :drawerWidth="600" ref="powerModal"></power-switch-modal>

    <infrared-air-condition-modal placement="right" :drawerWidth="600" ref="airModal"></infrared-air-condition-modal>
  </a-drawer>
</template>

<script>
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import {
  getRoomGatewayList,
  getRoomInfraredList,
  getRoomGatewayDeviceList,
  getRoomInfraredDeviceList,
  unbindRoomGateway,
  unbindRoomInfrared
} from '@/api/hotel'
import { stopHotelDevice } from '@/api/device'
import RoomBindOboxModal from './RoomBindOboxModal'
import RoomBindInfraredModal from './RoomBindInfraredModal'
import LampActionModal from '@views/device/modules/LampActionModal'
import KeypanelActionModal from '@views/device/modules/KeyPanelActionModal'
import HumidityActionModal from '@views/device/modules/HumidityActionModal'
import PowerSwitchModal from '@views/device/modules/PowerSwitchModal'
import InfraredAirConditionModal from '@views/device/modules/InfraredAirConditionModal'

import { Descriptor, TypeHints } from 'hardware-suit'

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
    dataIndex: 'deviceChildType',
    customRender (t, row) {
      return Descriptor.getTypeDescriptor(row.deviceType, t)
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    width: 100
  }
]
const infraredColumns = [
  {
    title: '序列号',
    align: 'center',
    dataIndex: 'deviceSerialId',
  },
  {
    title: '设备名称',
    align: 'center',
    dataIndex: 'deviceName',
  },
  {
    title: '设备状态',
    align: 'center',
    dataIndex: 'deviceState',
    customRender (status) {
      return status === 0 ? '在线' : '离线'
    }
  },
  {
    title: '设备版本',
    align: 'center',
    dataIndex: 'deviceVersion'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    width: 100
  }
]

export default {
  mixins: [ProListMixin],
  components: {
    RoomBindOboxModal,
    RoomBindInfraredModal,
    LampActionModal,
    KeypanelActionModal,
    HumidityActionModal,
    PowerSwitchModal,
    InfraredAirConditionModal
  },
  data() {
    return {
      title: '房间详情',
      drawerWidth: '60%',
      visible: false,
      loading: false,
      roomId: '',
      model: {},
      oboxListParams: {pageNo: 1, pageSize: 10},
      loadingGateway: false,
      oboxList: [],
      deviceColumns: deviceColumns,
      deviceList: [],
      queryParam: {pageNo: 1, pageSize: 10},

      irListParams: {pageNo: 1, pageSize: 10},
      loadingInfrared: false,
      infraredColumns: infraredColumns,
      infraredList: [],
      irDeviceList: [],
      queryirParam: {pageNo: 1, pageSize: 10},
      TypeHints
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
    getGatewayList () {
      this.loadingGateway = true
      getRoomGatewayList({...this.oboxListParams, roomId: this.roomId}).then(res => {
        if (this.$isAjaxSuccess(res.code)) this.oboxList = res.result.records
      }).finally(() => this.loadingGateway = false)
    },
    getInfraredList () {
      this.loadingInfrared = true
      getRoomInfraredList({...this.irListParams, roomId: this.roomId}).then(res => {
        if (this.$isAjaxSuccess(res.code)) this.infraredList = res.result.records
      }).finally(() => this.loadingInfrared = false)
    },
    loadData () {
      // this.roomId && this.getDeviceList(arg)
    },
    getDeviceList (arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      this.loading = true
      const params = {...this.queryParam}
      params.pageNo = this.ipagination.current
      params.pageSize = this.ipagination.pageSize
      params.roomId = this.roomId
      getRoomGatewayDeviceList(params).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.deviceList = res.result.records
        }
      }).finally(() => this.loading = false)
    },
    getIrdDeviceList (arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      this.loading = true
      const params = {...this.queryParam}
      params.pageNo = this.ipagination.current
      params.pageSize = this.ipagination.pageSize
      params.roomId = this.roomId
      getRoomInfraredDeviceList(params).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.irDeviceList = res.result.records
        }
      }).finally(() => this.loading = false)
    },
    show (record) {
      this.visible = true
      this.roomId = record.id
      this.model = { ...record }
      this.getGatewayList()
      this.getInfraredList()
      // this.loadData(record.id)
    },
    handleBind (type) {
      type === 1 && this.$refs.bindModal.show({ roomId: this.roomId })
      type === 2 && this.$refs.bindInfraredModal.show({ roomId: this.roomId })
    },
    handleUnbind (type, record) {
      console.log(type, record)
      let params = type === 1 ? {deviceSerialId: record.oboxSerialId} : {deviceSerialId: record.serialId}
      params = {...params, id: record.id, roomId: this.roomId}
      const obj = type === 1 ? unbindRoomGateway(params) : unbindRoomInfrared(params)
      obj.then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('解绑成功')
          this.getRoomGatewayList()
        } else this.$message.error(res.message)
      }).catch(() => this.$message.error('服务异常'))
    },
    bindModalOk () {
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
      this.tabActiveKey = key
    },
    handleAction (type, record) {
      const ActoinMap = {
        '0': 'powerModal',
        '1': 'humidityModal',
        '2': 'keypanelModal',
        '3': 'lampModal',
        '5': 'airModal'
      }
      const ref = ActoinMap[type]
      if (ref) this.$refs[ref].show(record)
      if (type === 4) this.handleStopCardPower(record)
    },
    handleStopCardPower (item) {
      this.loading = true
      stopHotelDevice(item.deviceSerialId, !item.elec).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
          this.getDeviceList()
        } else this.$message.error(res.message)
      }).finally(() => this.loading = false)
    },
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
