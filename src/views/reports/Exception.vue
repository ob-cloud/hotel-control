<template>
  <div>
    <a-card title="异常记录" class="ant-card-slim" :class="{ 'anty-list-cust':true }" :bordered="false" :style="{ marginTop: '24px' }">
      <div class="extra-wrapper" slot="extra">
        <div class="extra-item">
          <!-- <a>今日</a>
          <a>本月</a>
          <a>本年</a> -->
          <a-radio-group :defaultValue="3" v-model="queryParam.type" @change="searchQuery">
            <a-radio-button :value="3">今日</a-radio-button>
            <a-radio-button :value="2">本月</a-radio-button>
            <a-radio-button :value="1">本年</a-radio-button>
          </a-radio-group>
          <a @click="handleToggleSearch" style="">
            <!-- <a-tag>
            </a-tag> -->
            {{ toggleSearchStatus ? '收起' : '更多' }}
            <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
          </a>
        </div>
        <!-- <a-range-picker :style="{width: '256px'}" /> -->
      </div>
      <div class="content">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @submit.prevent="searchQuery" v-if="toggleSearchStatus">
            <a-row :gutter="24">

              <a-col :sm="12" :md="5" :lg="5">
                <a-form-item label="异常事件">
                  <a-input placeholder="请输入异常事件" v-model="queryParam.deviceId"></a-input>
                </a-form-item>
              </a-col>
              <a-col :sm="12" :md="5" :lg="5">
                <a-form-item label="事件类型">
                  <a-select v-model="queryParam.type" placeholder="请选择事件类型">
                    <a-select-option value="0">欠费</a-select-option>
                    <a-select-option value="1">掉线</a-select-option>
                    <a-select-option value="2">异常</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :sm="12" :md="5" :lg="5">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
          <a-table bordered :loading="loading" :dataSource="dataSource" size="small" rowKey="id" :columns="columns" :pagination="ipagination" @change="handleTableChange">
            <span slot="action" slot-scope="text, record">
              <!-- <a @click="handleEdit(record)">操作</a> -->
              <a style="font-size: 12px;" :style="`color: ${record.isOper ? '#1890ff' : '#f5222d'}`" @click="handleAction(record)">
                {{ record.isOper ? '标记为未处理' : '标记为已处理' }}
              </a>
            </span>
          </a-table>
        </div>
      </div>
    </a-card>
    <!-- <exception-modal ref="modalForm" @ok="modalFormOk"></exception-modal> -->
  </div>
</template>

<script>
// import ExceptionModal from './modules/ExceptionModal'
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import { getExceptionReportList, handleException } from '@/api/reports'
const columns = [{
  title: '异常事件',
  align:"center",
  dataIndex: 'title'
}, {
  title: '事件类型',
  align:"center",
  dataIndex: 'type',
  customRender (type) {
    return type === 0 ? '酒店欠费' :  type === 1 ? '掉线' : '异常'
  }
}, {
  title: '异常时间',
  align:"center",
  sorter: true,
  sortOrder: 'descend',
  dataIndex: 'createTime'
}, {
  title: '是否已处理',
  align:"center",
  dataIndex: 'isOper',
  customRender (status) {
    return status ? '是' : '否'
  },
  filters: [{
    text: '是',
    value: 1,
  }, {
    text: '否',
    value: 0,
  }],
  onFilter: (value, record) => record.isOper === value
}, {
  title: '操作人',
  align:"center",
  dataIndex: 'operUser'
}, {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    width: 170
  }]
export default {
  mixins: [ ProListMixin ],
  // components: { ExceptionModal },
  data () {
    return {
      queryParam: {
        pageNo: 1,
        pageSize: 10
      },
      dataSource: [],
      columns: columns,
    }
  },
  methods: {
    loadData (arg) {
      this.loadDataSource(arg)
    },
    loadDataSource(arg){
      if (arg === 1) {
        this.ipagination.current = 1
      }
      const params = {...this.queryParam}
      params.pageNo = this.ipagination.current
      params.pageSize = this.ipagination.pageSize
      this.loading = true
      getExceptionReportList({...params, hotelId: this.$store.getters.hotelId}).then((res) => {
        if (this.$isAjaxSuccess(res.code)) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total || 0
        } else {
          this.$message.warning(res.message)
        }
      }).finally(() => this.loading = false)
    },
    handleAction (record) {
      this.loading = true
      handleException(record).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
          this.loadData()
        } else this.$message.error(res.message)
      }).catch(() => this.$message.error('服务异常')).finally(() => this.loading = false)
    }
  },
}
</script>

<style lang="less" scoped>

</style>
