<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">
          <a-col :sm="12" :md="6" :lg="5">
            <a-form-item label="序列号">
              <a-input placeholder="请输入设备序列号" v-model="queryParam.serialId"></a-input>
            </a-form-item>
          </a-col>

          <a-col :sm="12" :md="6" :lg="5">
            <a-form-item label="网关">
              <a-select placeholder="请选择网关" v-model="queryParam.oboxSerialId" allowClear>
                <a-select-option v-for="item in oboxList" :key="item.oboxSerialId" :value="item.oboxSerialId">
                  {{ item.oboxName }}（{{ item.isOnline ? '在线' : '离线' }}）
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :sm="12" :md="6" :lg="5">
              <a-form-item label="设备名称">
                <a-input placeholder="请输入设备名称" v-model="queryParam.deviceName"></a-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :sm="12" :md="6" :lg="5">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button v-isPermitted="'device:add'" @click="handleScan" type="primary" icon="plus">添加设备</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div> -->

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
          <a v-isPermitted="'device:edit'" @click="handleEdit(record)">编辑</a>
          <a-divider v-isPermitted="'device:edit'" type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <!--  v-if="TypeHints.isXkeySocketSwitch(record.deviceChildType, record.deviceType)" -->
              <a-menu-item v-isPermitted="'device:control'" v-if="TypeHints.isXkeySocketSwitch(record.deviceChildType, record.deviceType)">
                <a @click="handleAction(0, record)">开关</a>
              </a-menu-item>

              <a-menu-item v-isPermitted="'device:control'" v-if="TypeHints.isHumidifierSensors(record.deviceChildType)">
                <a @click="handleAction(1, record)">温湿度</a>
              </a-menu-item>

              <a-menu-item v-isPermitted="'device:control'" v-if="TypeHints.isSettableSceneSocketSwitch(record.deviceChildType)">
                <a @click="handleAction(2, record)">设置</a>
              </a-menu-item>

              <a-menu-item v-isPermitted="'device:control'" v-if="TypeHints.isSimpleLed(record.deviceChildType, record.deviceType)">
                <a @click="handleAction(3, record)">灯控</a>
              </a-menu-item>

              <a-menu-item v-isPermitted="'device:control'" v-if="TypeHints.isXkeySocketSwitch(record.deviceChildType, record.deviceType)">
                <a @click="handleAction(4, record)">按键</a>
              </a-menu-item>

              <a-menu-item v-isPermitted="'device:control'" v-if="TypeHints.isPluginPowerSensors(record.deviceChildType)">
                <a-popconfirm :title="`确认${getCardActionStatus(record.deviceState) === 0 ? '停用' : '启用'}？请谨慎操作！`" @confirm="() => handleStopService(record)">
                  <a>{{ getCardActionStatus(record.deviceState) === 0 ? '停用' : '启用' }}</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-isPermitted="'device:del'">
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <normal-modal ref="modalForm" @ok="modalFormOk"></normal-modal>
    <normal-device-modal ref="modalDeviceForm" @ok="modalDeviceFormOk" @close="modalDeviceFormOk"></normal-device-modal>
    <humidity-action-modal ref="humidityModal" @close="actionModalClose"></humidity-action-modal>
    <lamp-action-modal ref="lampModal" @close="actionModalClose"></lamp-action-modal>
    <!-- <power-switch-modal ref="powerModal" @close="actionModalClose"></power-switch-modal> -->
    <panel-key-name-modal ref="panelKeyModal"></panel-key-name-modal>
    <panel-key-switch-modal ref="powerModal" @close="actionModalClose"></panel-key-switch-modal>
  </a-card>
</template>

<script>
  import NormalModal from './modules/NormalModal'
  import NormalDeviceModal from './modules/NormalDeviceModal'
  import LampActionModal from './modules/LampActionModal'
  import HumidityActionModal from './modules/HumidityActionModal'
  // import PowerSwitchModal from './modules/PowerSwitchModal'
  import PanelKeySwitchModal from './modules/PanelKeySwitchModal'
  import PanelKeyNameModal from './modules/PanelKeyNameModal'
  import { getHotelDeviceList, getAllHotelOboxList, delHotelDevice, stopHotelDevice } from '@/api/device'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import { Descriptor, TypeHints, CardPowerEquip } from 'hardware-suit'

  export default {
    name: 'UserList',
    mixins: [ ProListMixin ],
    components: {
      NormalModal,
      NormalDeviceModal,
      LampActionModal,
      HumidityActionModal,
      // PowerSwitchModal,
      PanelKeySwitchModal,
      PanelKeyNameModal
      // PasswordModal
    },
    data() {
      return {
        description: '这是用户管理页面',
        queryParam: {},
        columns: [
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
          // {
          //   title: '异常状态',
          //   align: 'center',
          //   customRender (row) {
          //     if (TypeHints.isSimpleLed(row.deviceChildType, row.deviceType)) {
          //       const ledLampEquip = new LedLampEquip(row.deviceState, row.deviceType, row.deviceChildType)
          //       return ledLampEquip.getLampExceptionStatus()
          //       // const exception = row.state.slice(14) || '00'
          //       // const bits = exception.split('')
          //       // if (!bits || !bits.length) return '无异常'
          //       // return bits[0] === '1' ? '开路' : bits[1] === '1' ? '短路' : '无异常'
          //     }
          //     return '-'
          //   }
          // },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
            width: 170
          }
        ],
        oboxList: [],
        TypeHints,
      }
    },
    mounted () {
      this.getOboxList()
      this.$bus.$on('state', () => this.loadData())
    },
    methods: {
      getCardActionStatus (status) {
        return new CardPowerEquip(status).getActionStatus()
      },
      loadData (arg) {
        this.getDeviceList(arg)
      },
      getDeviceList (arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        const params = {...this.queryParam}
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getHotelDeviceList({...params, hotelId: this.$store.getters.hotelId}).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => this.loading = false)
      },
      getOboxList () {
        getAllHotelOboxList(this.$store.getters.hotelId).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.oboxList = res.result
          }
        })
      },
      handleAction (type, record) {
        type === 0 && this.$refs.powerModal.show(record)
        type === 1 && this.$refs.humidityModal.show(record)
        type === 2 && this.$refs.keypanelModal.show(record)
        type === 3 && this.$refs.lampModal.show(record)
        type === 4 && this.$refs.panelKeyModal.show(record)
      },
      handleStopService (record) {
        this.loading = true
        const stopElectric = this.getCardActionStatus(record.deviceState) === 0
        stopHotelDevice(record.deviceSerialId, stopElectric).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.$message.success('操作成功')
          }else this.$message.error(res.message || '操作失败')
        }).catch(() => this.$message.error('服务异常')).finally(() => this.loading = false)
      },
      actionModalClose () {
        this.loadData()
      },
      handleDelete (record) {
        delHotelDevice(record.deviceSerialId).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.loadData(1)
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handleScan () {
        this.$refs.modalDeviceForm.edit({})
      },
      modalDeviceFormOk () {
        this.loadData()
      }
    }
  }
</script>
