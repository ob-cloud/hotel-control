<template>
  <div>
    <a-card title="异常报表" :class="{ 'anty-list-cust':true }" :bordered="false" :style="{ marginTop: '24px' }">
      <div class="extra-wrapper" slot="extra">
        <div class="extra-item">
          <a>今日</a>
          <a>本月</a>
          <a>本年</a>
          <a @click="handleToggleSearch" style="">
            <a-tag>
              {{ toggleSearchStatus ? '收起条件' : '更多条件' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
            </a-tag>
          </a>
        </div>
        <!-- <a-range-picker :style="{width: '256px'}" /> -->
      </div>
      <div class="content">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @submit.prevent="searchQuery" v-if="toggleSearchStatus">
            <a-row :gutter="24">

              <a-col :md="6" :sm="12">
                <a-form-item label="异常事件">
                  <a-input placeholder="请输入异常事件" v-model="queryParam.deviceId"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="12">
                <a-form-item label="事件类型">
                  <a-select v-model="queryParam.type" placeholder="请选择事件类型">
                    <a-select-option value="1">欠费</a-select-option>
                    <a-select-option value="2">掉线</a-select-option>
                    <a-select-option value="3">异常</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="8">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
          <a-table bordered :loading="loading" :dataSource="dataSource" size="small" rowKey="id" :columns="columns" :pagination="ipagination" @change="handleTableChange">
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import { getExceptionReportList } from '@/api/reports'
const columns = [{
  title: '营业日',
  align:"center",
  dataIndex: 'businessDay'
},{
  title: '异常事件',
  align:"center",
  dataIndex: 'events'
},{
  title: '事件类型',
  align:"center",
  dataIndex: 'eventType',
  customRender (type) {
    return type === 1 ? '酒店欠费' :  type === 2 ? '掉线' : '异常'
  }
},{
  title: '异常时间',
  align:"center",
  sorter: true,
  sortOrder: 'descend',
  dataIndex: 'abnormalTime'
},{
  title: '是否已处理',
  align:"center",
  dataIndex: 'hasHandle',
  customRender (hasHandle) {
    return hasHandle ? '是' : '否'
  },
  filters: [{
    text: '是',
    value: 1,
  }, {
    text: '否',
    value: 0,
  }],
  onFilter: (value, record) => record.hasHandle === value
},{
  title: '操作人',
  align:"center",
  dataIndex: 'operator'
}]
export default {
  mixins: [ ProListMixin ],
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
      getExceptionReportList(params).then((res) => {
        if (this.$isAjaxSuccess(res.code)) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total || 0
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
  },
}
</script>

<style lang="less" scoped>

</style>
