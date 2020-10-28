<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="序列号">
              <a-input placeholder="请输入设备序列号" v-model="queryParam.deviceId"></a-input>

            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-select placeholder="请选择状态" v-model="queryParam.online" allowClear>
                <a-select-option :value="0">在线</a-select-option>
                <a-select-option :value="1">离线</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="设备名称">
                <a-input placeholder="请输入设备名称" v-model="queryParam.name"></a-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
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
    <!-- <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加红外</a-button>
    </div> -->

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
        rowKey="deviceId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >

        <span slot="action" slot-scope="text, record">
          <a v-isPermitted="'infrared:edit'" @click="handleEdit(record)">编辑</a>
          <a-divider v-isPermitted="'infrared:edit'" type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <!--  v-if="TypeHints.isInfrared(record.type)"  -->
              <a-menu-item v-isPermitted="'infrared:control'">
                <a @click="handleControl(record)">控制</a>
              </a-menu-item>
              <a-menu-item v-isPermitted="'infrared:control'">
                <a-popconfirm title="确定停用吗?请谨慎操作" @confirm="() => handleStopService(record.deviceId)">
                  <a>停用</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-isPermitted="'infrared:del'">
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.deviceId)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <infrared-modal ref="modalForm" @ok="modalFormOk"></infrared-modal>
    <infrared-air-condition-modal ref="airModal" @ok="airModalOk"></infrared-air-condition-modal>
  </a-card>
</template>

<script>
  import InfraredModal from './modules/InfraredModal'
  import InfraredAirConditionModal from './modules/InfraredAirConditionModal'
  // import { getInfratedDeviceList, delInfratedDevice, stopInfrared } from '@/api/device'
  import { getHotelIrList, delInfratedDevice, stopInfrared } from '@/api/device'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import { TypeHints } from 'hardware-suit'

  export default {
    name: '',
    mixins: [ ProListMixin ],
    components: {
      InfraredModal,
      InfraredAirConditionModal
    },
    data() {
      return {
        description: '这是用户管理页面',
        queryParam: {
          pageNo: 1,
          pageSize: 10
        },
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
          // {
          //   title: '设备类型',
          //   align: 'center',
          //   dataIndex: 'type',
          //   customRender (t) {
          //     return Descriptor.getEquipTypeDescriptor(t)
          //   }
          // },
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
        oboxList: [],
        TypeHints,
      }
    },
    methods: {
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
        getHotelIrList({...params, hotelId: this.$store.getters.hotelId}).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total || 0
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => this.loading = false)
      },
      handleControl (record) {
        this.$refs.airModal.show(record)
      },
      handleStopService (id) {
        this.loading = true
        stopInfrared(id).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.$message.success('操作成功')
          }else this.$message.error(res.message || '操作失败')
        }).catch(() => this.$message.error('服务异常')).finally(() => this.loading = false)
      },
      airModalOk () {
      },
      actionModalClose () {
        this.loadData()
      },
      handleDelete (id) {
        delInfratedDevice(id).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.loadData(1)
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }

  }
</script>
