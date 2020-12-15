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
    <a-descriptions style="padding: 10px 24px;" :column="4">
      <a-descriptions-item label="室内温度"><i v-if="model.temperature" class="obicon obicon-temperature" style="color: #fa8c16;"></i>{{ model.temperature ? `${model.temperature}℃` : '--' }}</a-descriptions-item>
      <a-descriptions-item label="插卡取电">
        <a-badge style="margin-left: 10px" :status="model.elec ? 'processing' : 'default'" :text="`${model.elec ? '取电中' : '未使用'}`" />
      </a-descriptions-item>
      <a-descriptions-item label="在住状态">
        <a-badge style="margin-left: 10px" :status="model.elec ? 'success' : 'default'" :text="`${model.elec ? '在住' : '空闲'}`" />
      </a-descriptions-item>
      <a-descriptions-item label="语音控制">
        <a-space>
          <a-badge dot><a-icon type="notification" /></a-badge>
          <a style="font-size: 12px; text-decoration: underline;" @click="handleBindVoice">绑定</a>
        </a-space>
        <!-- <a-popconfirm ok-text="绑定" cancel-text="解绑" @confirm="handleVoiceOk" @cancel="handleVoiceOk" :visible="confirmVisible">
          <span slot="icon"></span>
          <div slot="title">
            <a-form :form="form" layout="inline">
              <a-form-item label="序列号">
                <a-input placeholder="请输入序列号" v-decorator="[ 'serialId', { rules: [{ required: true, message: '请输入序列号!' }] }]" />
              </a-form-item>
            </a-form>
          </div>
          <a style="font-size: 12px; text-decoration: underline;">绑定</a>
        </a-popconfirm> -->
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
            <a v-if="TypeHints.isPluginPowerSensors(record.deviceChildType, record.deviceType)" @click="handleAction(4, record)">{{ getCardActionStatus(record.deviceState) === 0 ? '停用' : '启用' }}</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="红外设备" force-render>
        <a-table bordered size="small" rowKey="indexOsm" :columns="infraredColumns" :dataSource="irDeviceList" :loading="loading">
          <span slot="action" slot-scope="text, record">
            <!--  v-if="TypeHints.isInfrared(record.deviceType)" -->
            <a @click="handleAction(5, record)">控制</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>

    <!-- 绑定红外网关 -->
    <room-bind-obox-modal ref="bindModal" @ok="bindGatewayModalOk"></room-bind-obox-modal>
    <room-bind-infrared-modal ref="bindInfraredModal" @ok="bindIrModalOk"></room-bind-infrared-modal>
    <room-bind-voice-modal ref="bindVoiceModal" @ok="bindVoiceModalOk"></room-bind-voice-modal>

    <!-- 设备操作 -->
    <humidity-action-modal placement="right" :drawerWidth="600" ref="humidityModal"></humidity-action-modal>
    <lamp-action-modal placement="right" :drawerWidth="600" ref="lampModal"></lamp-action-modal>
    <power-switch-modal placement="right" :drawerWidth="600" ref="powerModal"></power-switch-modal>

    <infrared-air-condition-modal placement="right" :drawerWidth="600" ref="airModal" @close="getIrdDeviceList()"></infrared-air-condition-modal>
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
import RoomBindVoiceModal from './RoomBindVoiceModal'
import LampActionModal from '@views/device/modules/LampActionModal'
import HumidityActionModal from '@views/device/modules/HumidityActionModal'
import PowerSwitchModal from '@views/device/modules/PowerSwitchModal'
import InfraredAirConditionModal from '@views/device/modules/InfraredAirConditionModal'

import { Descriptor, TypeHints, CardPowerEquip } from 'hardware-suit'

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
    title: '使能状态',
    align: 'center',
    dataIndex: '',
    customRender (status, row) {
      return new CardPowerEquip(row.deviceState).getActionStatus() === 0 ? '启用' : '停用'
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
    RoomBindVoiceModal,
    LampActionModal,
    HumidityActionModal,
    PowerSwitchModal,
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
      queryirParam: {pageNo: 1, pageSize: 10},
      TypeHints,

      form: this.$form.createForm(this),
      confirmVisible: false
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
    handleBindVoice () {
      this.$refs.bindVoiceModal.edit({ roomId: this.roomId, serialId: 'sssss', id: '1111' })
    },
    bindVoiceModalOk (voice) {
      const {id, serialId} = voice
      console.log(id, serialId)
    },
    handleVoiceOk () {
      // const that = this
      // // 触发表单验证
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     // that.confirmLoading = true
      //     // let formData = Object.assign(this.model, values)
      //     // formData = {...formData, hotelId: this.hotelId}
      //     // let obj = !this.model.id ? bindRoomVoiceDevice(formData) : unbindRoomVoiceDevice(formData)
      //     // obj.then((res) => {
      //     //   if (that.$isAjaxSuccess(res.code)) {
      //     //     that.$message.success(res.message)
      //     //     that.$emit('ok', { id: that.model.id || res.result.id, serialId: formData.serialId })
      //     //   } else {
      //     //     that.$message.warning(res.message)
      //     //   }
      //     // }).finally(() => {
      //     //   that.confirmLoading = false
      //     //   that.close()
      //     // })
      //   }
      // })
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
        '5': 'airModal'
      }
      !record.deviceSerialId && (record.deviceSerialId = record.serialId)
      const ref = ActoinMap[type]
      if (ref) this.$refs[ref].show(record)
      if (type === 4) this.handleStopCardPower(record)
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
