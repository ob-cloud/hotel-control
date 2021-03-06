<template>
  <a-drawer
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
        <span style="display:inline-block;width:calc(100% - 90px); padding-right: 10px; text-align: right">
          <a-button @click="toggleScreen" :icon="modaltoggleFlag ? 'fullscreen' : 'fullscreen-exit'" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>
    </template>

    <a-page-header
      :title="`${model.name}`"
      :breadcrumb="{ props: { routes } }"
      :sub-title="`${model.buildName}${model.floorName}`"
    />
    <a-descriptions style="padding: 10px 24px;" :column="3">
      <a-descriptions-item label="室内温度"><a-icon :component="iconTemperature" style="font-size: 20px; color: #f66c32; padding-right: 4px;" />{{ model.temperature ? `${model.temperature}℃` : '--' }}</a-descriptions-item>
      <a-descriptions-item label="插卡取电">
        <a-badge style="margin-left: 10px" :status="model.elec ? 'processing' : 'default'" :text="`${model.elec ? '取电中' : '未使用'}`" />
      </a-descriptions-item>
      <a-descriptions-item label="在住状态">
        <a-badge style="margin-left: 10px" :status="model.elec ? 'success' : 'default'" :text="`${model.elec ? '在住' : '空闲'}`" />
      </a-descriptions-item>
      <!-- <a-descriptions-item label="语音控制">
        <a-space v-if="!audioEditable">
          <a-badge dot><a-icon :component="intelAudio" /></a-badge>
          <a style="font-size: 12px; text-decoration: underline;" @click="audioEditable = true">绑定</a>
        </a-space>
        <a-space v-else style="display: inline-block;">
          <a-input style="width: 100px; " size="small" placeholder="请输入序列号" :value="audioSerialId" />
          <a-icon class="icon" type="check" title="确认" @click="handleBindVoice()"></a-icon>
          <a-icon class="icon" type="delete" title="取消"></a-icon>
        </a-space>
      </a-descriptions-item> -->
    </a-descriptions>

    <a-descriptions style="padding: 10px 24px;" :column="3">
      <a-descriptions-item label="语音控制">
        <a-space v-if="!audioEditable">
          <a-badge dot><a-icon :component="intelAudio" /></a-badge>
          <a style="font-size: 12px; text-decoration: underline;" v-if="!audioSerialId" @click="audioEditable = true">绑定</a>
          <div v-else>
            {{ audioSerialId }}
            <a-popconfirm title="确定解绑吗?" @confirm="() => handleAudioUnbind()">
              <a style="font-size: 12px; text-decoration: underline;">解绑</a>
            </a-popconfirm>
          </div>

        </a-space>
        <a-space v-else>
          <a-input style="width: 140px; " size="small" placeholder="请输入序列号" v-model="audioSerialId" />
          <a-icon class="icon" type="check" title="确认" @click="handleAudioBind()"></a-icon>
          <a-icon class="icon" type="delete" title="取消" @click="handleAudioCancel()"></a-icon>
        </a-space>
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
            <a v-if="TypeHints.isHumidifierSensors(record.deviceChildType, record.deviceType)" @click="handleAction(1, record)">温湿度</a>
            <a v-if="TypeHints.isSettableSceneSocketSwitch(record.deviceChildType, record.deviceType)" @click="handleAction(2, record)">设置</a>
            <a v-if="TypeHints.isSimpleLed(record.deviceChildType, record.deviceType)" @click="handleAction(3, record)">灯控</a>
            <a v-if="TypeHints.isCurtainSmartSwitch(record.deviceChildType, record.deviceType)" @click="handleAction(4, record)">窗帘</a>
            <a v-if="TypeHints.isAcWireControl(record.deviceChildType, record.deviceType)" @click="handleAction(5, record)">空调</a>
            <a v-if="TypeHints.isPluginPowerSensors(record.deviceChildType, record.deviceType)" @click="handleStopCardPower(record)">{{ getCardActionStatus(record.deviceState) === 0 ? '停用' : '启用' }}</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="红外设备" force-render>
        <a-table bordered size="small" rowKey="indexOsm" :columns="infraredColumns" :dataSource="irDeviceList" :pagination="pagination" :loading="loading" @change="handleIrTableChange">
          <span slot="action" slot-scope="text, record">
            <!--  v-if="TypeHints.isInfrared(record.deviceType)" -->
            <a @click="handleAction(50, record)">控制</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>

    <!-- 绑定红外网关 -->
    <room-bind-obox-modal ref="bindModal" @ok="bindGatewayModalOk"></room-bind-obox-modal>
    <room-bind-infrared-modal ref="bindInfraredModal" @ok="bindIrModalOk"></room-bind-infrared-modal>
    <!-- <room-bind-audio-modal ref="bindVoiceModal" @ok="bindVoiceModalOk"></room-bind-audio-modal> -->

    <!-- 设备操作 -->
    <humidity-action-modal placement="right" :drawerWidth="600" ref="humidityModal"></humidity-action-modal>
    <lamp-action-modal placement="right" :drawerWidth="600" ref="lampModal" @close="getDeviceList()"></lamp-action-modal>
    <!-- <power-switch-modal placement="right" :drawerWidth="600" ref="powerModal"></power-switch-modal> -->
    <panel-key-switch-modal placement="right" :drawerWidth="600" ref="powerModal" @close="getDeviceList()"></panel-key-switch-modal>
    <curtain-modal placement="right" :drawerWidth="600" ref="curtainModal" @close="getDeviceList()"></curtain-modal>
    <wire-condition-modal placement="right" :drawerWidth="600" ref="wireAcModal" @close="getDeviceList()"></wire-condition-modal>

    <infrared-air-condition-modal placement="right" :drawerWidth="600" ref="acModal" @close="getIrdDeviceList()"></infrared-air-condition-modal>
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
  unbindRoomInfrared,
  bindRoomVoiceDevice,
  unbindRoomVoiceDevice
} from '@/api/hotel'
import { stopHotelDevice } from '@/api/device'
import RoomBindOboxModal from './RoomBindOboxModal'
import RoomBindInfraredModal from './RoomBindInfraredModal'
// import RoomBindAudioModal from './RoomBindAudioModal'
import LampActionModal from '@views/device/modules/LampActionModal'
import HumidityActionModal from '@views/device/modules/HumidityActionModal'
// import PowerSwitchModal from '@views/device/modules/PowerSwitchModal'
import PanelKeySwitchModal from '@views/device/modules/PanelKeySwitchModal'
import CurtainModal from '@views/device/modules/CurtainModal'
import WireConditionModal from '@views/device/modules/WireConditionModal'

import InfraredAirConditionModal from '@views/device/modules/InfraredAirConditionModal'

import { Descriptor, TypeHints, CardPowerEquip } from 'hardware-suit'
import { intelAudio, iconTemperature } from '@/core/icons'

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
  // {
  //   title: '使能状态',
  //   align: 'center',
  //   dataIndex: '',
  //   customRender (status, row) {
  //     return new CardPowerEquip(row.deviceState).getActionStatus() === 0 ? '启用' : '停用'
  //   }
  // },
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
    dataIndex: 'serialId',
  },
  {
    title: '设备名称',
    align: 'center',
    dataIndex: 'name',
  },
  // {
  //   title: '设备状态',
  //   align: 'center',
  //   dataIndex: 'deviceState',
  //   customRender (status) {
  //     return status === 0 ? '在线' : '离线'
  //   }
  // },
  {
    title: '键值',
    align: 'center',
    dataIndex: 'keyValue'
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
    width: 100
  }
]

export default {
  mixins: [ProListMixin],
  components: {
    RoomBindOboxModal,
    RoomBindInfraredModal,
    // RoomBindAudioModal,
    LampActionModal,
    HumidityActionModal,
    // PowerSwitchModal,
    PanelKeySwitchModal,
    CurtainModal,
    WireConditionModal,

    InfraredAirConditionModal
  },
  data() {
    return {
      title: '房间详情',
      modaltoggleFlag: true,
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
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showSizeChanger: true,
        total: 0
      },
      queryirParam: {pageNo: 1, pageSize: 10},
      TypeHints,

      form: this.$form.createForm(this),
      confirmVisible: false,

      intelAudio,
      iconTemperature,
      audioSerialId: '',
      oldAudioSerialId: '',
      audioEditable: false
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
    },
    infraredList (list) {
      if (!list || !list.length) {
        this.irDeviceList = []
        return
      }
      this.getIrdDeviceList()
    },
    audioSerialId (newVal, oldVal) {
      this.oldAudioSerialId = oldVal
    }
  },
  methods: {
    getCardActionStatus (status) {
      return new CardPowerEquip(status).getActionStatus()
    },
    getGatewayList () {
      this.loadingGateway = true
      getRoomGatewayList({...this.oboxListParams, roomId: this.roomId}).then(res => {
        if (this.$isAjaxSuccess(res.code)) this.oboxList = res.result.records
        else this.oboxList = []
      }).finally(() => this.loadingGateway = false)
    },
    getInfraredList () {
      this.loadingInfrared = true
      getRoomInfraredList({...this.irListParams, roomId: this.roomId}).then(res => {
        if (this.$isAjaxSuccess(res.code)) this.infraredList = res.result.records
        else this.infraredList = []
      }).finally(() => this.loadingInfrared = false)
    },
    loadData () {
      this.roomId && this.getDeviceList()
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
          this.ipagination.total = res.result.total
        }
      }).finally(() => this.loading = false)
    },
    getIrdDeviceList (arg) {
      if (arg === 1) {
        this.pagination.current = 1
      }
      this.loading = true
      const params = {...this.queryParam}
      params.pageNo = this.pagination.current
      params.pageSize = this.pagination.pageSize
      params.roomId = this.roomId
      getRoomInfraredDeviceList(params).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.irDeviceList = res.result.records
          this.pagination.total = res.result.total
        }
      }).finally(() => this.loading = false)
    },
    handleIrTableChange (pagination) {
      this.pagination = pagination
      this.getIrdDeviceList()
    },
    show (record) {
      this.visible = true
      this.roomId = record.id
      this.audioSerialId = record.duerSerialId
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
      let params = type === 1 ? {deviceSerialId: record.oboxSerialId} : {deviceSerialId: record.deviceSerialId}
      params = {...params, id: record.id, roomId: this.roomId}
      const obj = type === 1 ? unbindRoomGateway(params) : unbindRoomInfrared(params)
      obj.then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('解绑成功')
          type === 1 ? this.getGatewayList() : this.getInfraredList()
        } else this.$message.error(res.message)
      }).catch(() => this.$message.error('服务异常'))
    },
    bindGatewayModalOk () {
      this.getGatewayList()
    },
    bindIrModalOk () {
      this.getInfraredList()
    },
    handleAudioBind () {
      bindRoomVoiceDevice({deviceSerialId: this.audioSerialId.trim(), roomId: this.roomId})
      .then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('绑定成功')
          // this.audioEditable = false
        } else {
          this.$message.error(res.message || '绑定失败')
          this.audioSerialId = ''
        }
      })
      .catch((err) => this.$message.error(err.message || '服务异常'))
      .finally(() => this.audioEditable = false)
    },
    handleAudioUnbind () {
      unbindRoomVoiceDevice({deviceSerialId: this.audioSerialId.trim(), roomId: this.roomId})
      .then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('解绑成功')
          this.audioSerialId = ''
        } else this.$message.error(res.message || '解绑失败')
      })
    },
    handleAudioCancel () {
      this.audioEditable = false
      this.audioSerialId = this.model.duerSerialId
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
      this.oboxList = []
      this.deviceList = []
      this.infraredList = []
      this.irDeviceList = []
    },
    handleTabChange (key) {
      this.tabActiveKey = key
    },
    handleAction (type, record) {
      const ActoinMap = {
        '0': 'powerModal',
        '1': 'humidityModal',
        '3': 'lampModal',
        '4': 'curtainModal',
        '5': 'wireAcModal',
        '50': 'acModal',
      }
      !record.deviceSerialId && (record.deviceSerialId = record.serialId)
      const ref = ActoinMap[type]
      if (ref) this.$refs[ref].show(record)
    },
    handleStopCardPower (item) {
      this.loading = true
      // item.elec
      stopHotelDevice(item.deviceSerialId, this.getCardActionStatus(item.deviceState) === 0).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
          this.getDeviceList()
        } else this.$message.error(res.message)
      }).finally(() => this.loading = false)
    },
    toggleScreen () {
      this.drawerWidth = this.modaltoggleFlag ? window.innerWidth : '60%'
      this.modaltoggleFlag = !this.modaltoggleFlag
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
