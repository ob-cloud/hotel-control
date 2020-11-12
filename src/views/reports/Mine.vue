<template>
  <div>
    <a-card title="我的酒店经营报表" class="ant-card-slim" :class="{ 'anty-list-cust':true }" :bordered="false" :style="{ marginTop: '24px' }">
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
          <!-- <a @click="handleToggleSearch" style="">
            <a-tag>
              {{ toggleSearchStatus ? '收起条件' : '更多条件' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
            </a-tag>
          </a> -->
        </div>
        <!-- <a-range-picker :style="{width: '256px'}" /> -->
      </div>
      <div class="content">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @submit.prevent="searchQuery" v-if="toggleSearchStatus">
            <a-row :gutter="24">

              <a-col :md="6" :sm="12">
                <a-form-item label="序列号">
                  <a-input placeholder="请输入设备序列号" v-model="queryParam.deviceId"></a-input>

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
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <a-row :gutter="{ xs: 10, sm: 16, md: 24}">
              <a-col :xs="12" :sm="6" :md="6" :lg="6">
                <a-statistic title="租金总额" :value="1128" style="margin-top: 10px"><template #suffix>RMB</template></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="6" :md="6" :lg="6">
                <a-statistic title="使用率" :value="93" style="margin-top: 10px"><template #suffix>%</template></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="6" :md="6" :lg="6">
                <a-statistic title="平均租金" :value="1128" style="margin-top: 10px"><template #suffix>RMB</template></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="6" :md="6" :lg="6">
                <a-statistic title="欠费总额" :value="93" style="margin-top: 10px"><template #suffix>RMB</template></a-statistic>
              </a-col>
            </a-row>
          </div>
          <a-table bordered :loading="loading" :dataSource="dataSource" size="small" rowKey="id" :columns="columns" :pagination="ipagination" @change="handleTableChange">
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ProListMixin } from '@/utils/mixins/ProListMixin'
// import { getMineReportList } from '@/api/reports'
import { getMineReportList, getMineReportStatistic } from '@/api/reports'
const columns = [{
  title: '营业日',
  align:"center",
  dataIndex: 'time'
},{
  title: '酒店总数',
  align:"center",
  dataIndex: 'hotels'
},{
  title: '房间总数',
  align:"center",
  dataIndex: 'totalBuilding'
},{
  title: '在用数',
  align:"center",
  dataIndex: 'totalUseRoom'
},{
  title: '在用使用率',
  align:"center",
  dataIndex: 'utilizationRate'
},{
  title: '租金',
  align:"center",
  sorter: true,
  sortOrder: 'descend',
  dataIndex: 'price'
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
    loadStatistic () {
      getMineReportStatistic(this.queryParam.type).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.statistic = res.result || {}
        }
      })
    },
    loadData (arg) {
      this.loadDataSource(arg)
      this.loadStatistic()
    },
    loadDataSource(arg){
      if (arg === 1) {
        this.ipagination.current = 1
      }
      const params = {...this.queryParam}
      params.pageNo = this.ipagination.current
      params.pageSize = this.ipagination.pageSize
      this.loading = true
      getMineReportList(params).then((res) => {
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
