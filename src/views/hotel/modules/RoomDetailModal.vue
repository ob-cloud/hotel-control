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
      <a-descriptions-item label="室内温度"><i class="obicon obicon-temperature" style="color: #fa8c16;"></i>{{ model.temperature }}℃</a-descriptions-item>
      <a-descriptions-item label="插卡取电">
        <a-badge style="margin-left: 10px" :status="model.lightState ? 'processing' : 'default'" :text="`${model.lightState ? '取电中' : '未使用'}`" />
      </a-descriptions-item>
      <a-descriptions-item label="在住状态">
        <a-badge style="margin-left: 10px" :status="model.lightState ? 'success' : 'default'" :text="`${model.lightState ? '在住' : '空闲'}`" />
      </a-descriptions-item>
    </a-descriptions>

    <a-row :gutter="10" style="padding: 10px 24px;">
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">网关</span>
          <a slot="extra" href="#">
            <a-button style="font-size: 12px;" size="small" type="link" @click="handleBind(1)">
              <a-space><i class="obicon obicon-bangding"></i>绑定</a-space>
            </a-button>
          </a>
          <a-list item-layout="horizontal" :data-source="oboxList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">
                <a-popconfirm title="解绑网关，请谨慎操作！" @confirm="() => handleUnbind(1, item)">
                  <span>解绑</span>
                </a-popconfirm>
              </a>
              <a-list-item-meta :description="item.obox_serial_id">
                <span slot="title">
                  {{ item.obox_name }}
                </span>
                <i slot="avatar" style="color: #5b94f0; font-size: 30px;" class="obicon obicon-equip"></i>
              </a-list-item-meta>
              <a-badge style="margin-left: 10px;" :status="item.obox_status ? 'success' : 'default'" :text="`${item.obox_status ? '在线' : '离线'}`" />
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">红外</span>
          <a slot="extra" href="#">
            <a-button style="font-size: 12px;" size="small" type="link" @click="handleBind(2)">
              <a-space><i class="obicon obicon-bangding"></i>绑定</a-space>
            </a-button>
          </a>
          <a-list item-layout="horizontal" :data-source="oboxList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">
                <a-popconfirm title="解绑红外，请谨慎操作！" @confirm="() => handleUnbind(2, item)">
                  <span>解绑</span>
                </a-popconfirm>
              </a>
              <a-list-item-meta :description="item.obox_serial_id">
                <span slot="title">
                  {{ item.obox_name }}
                </span>
                <i slot="avatar" style="color: #5b94f0; font-size: 30px;" class="obicon obicon-infrared"></i>
              </a-list-item-meta>
              <a-badge style="margin-left: 10px;" :status="item.obox_status ? 'success' : 'default'" :text="`${item.obox_status ? '在线' : '离线'}`" />
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>

    <a-tabs default-active-key="1" style="padding: 10px 24px;" :animated="{tabPane: false}">
      <a-tab-pane key="1" tab="网关设备">
        <a-table bordered size="small" rowKey="serialId" :columns="deviceColumns" :dataSource="deviceList" :loading="loading" :pagination="ipagination" @change="handleTableChange">
          <span slot="action" slot-scope="text, record">
            <a v-if="TypeHints.isXkeySocketSwitch(record.device_child_type)" @click="handleAction(0, record)">开关</a>
            <a v-if="TypeHints.isSettableSceneSocketSwitch(record.device_child_type)" @click="handleAction(2, record)">设置</a>
            <a v-if="TypeHints.isHumidifierSensors(record.device_child_type)" @click="handleAction(1, record)">温湿度</a>
            <a v-if="TypeHints.isSimpleLed(record.device_child_type)" @click="handleAction(3, record)">灯控</a>
            <a v-if="TypeHints.isPluginPowerSensors(record.device_child_type)" @click="handleAction(3, record)">停用</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="红外设备" force-render>
        <a-table bordered size="small" rowKey="deviceId" :columns="infraredColumns" :dataSource="infraredList" :loading="loading">
          <span slot="action" slot-scope="text, record">
            <a v-if="TypeHints.isInfrared(record.type)" @click="handleAction(5, record)">控制</a>
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
import { getRoomDeviceList } from '@/api/hotel'
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
    dataIndex: 'serialId'
  },
  {
    title: '设备名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '设备状态',
    align: 'center',
    dataIndex: 'state',
    customRender (status, row) {
      return Descriptor.getStatusDescriptor(status, row.device_type, row.device_child_type)
    }
  },
  {
    title: '设备类型',
    align: 'center',
    dataIndex: 'device_type',
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
    dataIndex: 'serialId',
  },
  {
    title: '设备名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '设备状态',
    align: 'center',
    dataIndex: 'state',
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

const oboxList = [{
  obox_name: 'OBOXeca9',
  obox_serial_id: 'a9ec1ea281',
  obox_status: 1,
  obox_version: "0200020002020202"
}]
const infraredList = [{
  "userName": "",
  "name": "IR Transponder",
  "deviceId": "11e25c3a7d",
  "online": 0,
  "state": "[]",
  "type": "51",
  "version": '12900000000',
  "action": "[{\"functionId\":1,\"data\":[\"\"],\"functionName\":\"send\",\"function\":\"send\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"download\"]},{\"functionId\":2,\"data\":[\"\"],\"functionName\":\"receive learning\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":3,\"data\":[\"\"],\"functionName\":\"receive pairing\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":4,\"data\":[0],\"functionName\":\"learning\",\"function\":\"learning\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]},{\"functionId\":5,\"data\":[0],\"functionName\":\"pairing\",\"function\":\"pairing\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]}]",
  "userId": 0
}]
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
      deviceList: [],
      oboxList: oboxList,
      deviceColumns: deviceColumns,
      infraredColumns: infraredColumns,
      infraredList: infraredList,
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
    loadData (arg) {
      this.roomId && this.getDeviceList(arg)
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
      getRoomDeviceList(params).then(res => {
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
    handleBind (type) {
      type === 1 && this.$refs.bindModal.show({ roomId: this.roomId })
      type === 2 && this.$refs.bindInfraredModal.show({ roomId: this.roomId })
    },
    handleUnbind (type, record) {
      console.log(type, record)
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
      type === 0 && this.$refs.powerModal.show(record)
      type === 1 && this.$refs.humidityModal.show(record)
      type === 2 && this.$refs.keypanelModal.show(record)
      type === 3 && this.$refs.lampModal.show(record)
      type === 5 && this.$refs.airModal.show(record)
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
