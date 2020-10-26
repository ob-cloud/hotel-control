<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入酒店名称" v-model="queryParam.name"></a-input>

            </a-form-item>
          </a-col>

          <!-- <a-col :md="6" :sm="8">
            <a-form-item label="连锁">
              <a-select placeholder="请选择连锁状态" v-model="queryParam.isChain" allowClear>
                <a-select-option :value="1">连锁</a-select-option>
                <a-select-option :value="0">非连锁</a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col :md="6" :sm="8">
            <a-form-item label="所属公司">
              <!-- <a-input placeholder="请输入所属公司名称" v-model="queryParam.company"></a-input> -->
              <a-select placeholder="请输入所属公司名称" v-model="queryParam.company" allowClear>
                <a-select-option v-for="(company, index) in companyList" :key="index" :value="company.id">{{ company.companyName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <template v-if="toggleSearchStatus">
            <!-- <a-col :md="6" :sm="8">
              <a-form-item label="所属公司">
                <a-input placeholder="请输入所属公司名称" v-model="queryParam.company"></a-input>
              </a-form-item>
            </a-col> -->
            <a-col :md="6" :sm="8">
              <a-form-item label="业务员">
                <a-input placeholder="请输入业务员" v-model="queryParam.salesman"></a-input>
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
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加酒店</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider v-isPermitted="'device:gateway:edit'" type="vertical" />

          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">查看详情</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleAccount(record)">绑定账户</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleSetting(record)">酒店设置</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="切换到当前酒店?" @confirm="() => handleSelect(record.id)">
                  <a tille="切换为当前系统酒店">切换酒店</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item v-isPermitted="'device:gateway:delete'">
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <hotel-modal ref="modalForm" @ok="modalFormOk"></hotel-modal>
    <hotel-user-modal ref="userModal" @close="userModalOk"></hotel-user-modal>
    <hotel-setting-modal ref="setModal" @ok="modalFormOk"></hotel-setting-modal>
  </a-card>
</template>

<script>
  import HotelModal from './modules/HotelModal'
  import HotelUserModal from './modules/HotelUserModal'
  import HotelSettingModal from './modules/HotelSettingModal'
  import { getHotelList, delHotel, getCompanyListAll } from '@/api/hotel'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import { mapActions } from 'vuex'

  export default {
    name: '',
    mixins: [ ProListMixin ],
    components: {
      HotelModal,
      HotelUserModal,
      HotelSettingModal
    },
    data() {
      return {
        description: '这是用户管理页面',
        companyList: [],
        queryParam: {
          pageNo: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '酒店名称',
            align: 'center',
            dataIndex: 'hotelName',
          },
          {
            title: '所属公司',
            align: 'center',
            dataIndex: 'companyName',
          },
          {
            title: '联系人',
            align: 'center',
            dataIndex: 'contact',
          },
          {
            title: '联系方式',
            align: 'center',
            dataIndex: 'contactPhone',
          },
          {
            title: '前台电话',
            align: 'center',
            dataIndex: 'telephone',
          },
          {
            title: '业务员',
            align: 'center',
            dataIndex: 'saleManName',
          },
          // {
          //   title: '是否连锁',
          //   align: 'center',
          //   dataIndex: 'isChain',
          //   customRender (status) {
          //     return status ? '是' : '否'
          //   }
          // },
          {
            title: '有效时间',
            align: 'center',
            dataIndex: 'createAt'
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
    mounted () {
      // this.$bus.$on('obox-state', () => this.loadData())
      this.getCompanyLis()
    },
    methods: {
      ...mapActions(['UpdateHotelId']),
      loadData (arg) {
        this.getDataList(arg)
      },
      getCompanyLis () {
        getCompanyListAll().then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.companyList = res.result
          }
        })
      },
      getDataList (arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        const params = {...this.queryParam}
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getHotelList(params).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total || 0
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      },
      handleDelete (id) {
        delHotel(id).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.loadData(1)
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handleSelect (hotelId) {
        this.UpdateHotelId(hotelId).then(() => this.pageReload())
      },
      handleAccount (record) {
        this.$refs.userModal.edit(record)
      },
      handleSetting (record) {
        this.$refs.setModal.edit(record)
      },
      userModalOk () {
        this.loadData()
      }
    }
  }
</script>
