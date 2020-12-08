<template>
  <div>
    <a-card title="酒店经营报表" class="ant-card-slim" :class="{ 'anty-list-cust':true }" :bordered="false" :style="{ marginTop: '24px' }">
      <div class="extra-wrapper" slot="extra">
        <div class="extra-item">
          <!-- <a>今日</a>
          <a>本月</a>
          <a>本年</a> -->
          <a-radio-group :defaultValue="undefined" v-model="queryParam.type" @change="query">
            <a-radio-button :value="3">今日</a-radio-button>
            <a-radio-button :value="2">本月</a-radio-button>
            <a-radio-button :value="1">本年</a-radio-button>
            <a-radio-button :value="undefined">全部</a-radio-button>
          </a-radio-group>
          <a @click="handleToggleSearch" style="">
            {{ toggleSearchStatus ? '收起' : '更多' }}
            <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
          </a>
        </div>
      </div>
      <div class="content">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @submit.prevent="query()" v-if="toggleSearchStatus">
            <a-row :gutter="24">

              <a-col :md="6" :sm="12">
                <a-form-item label="序列号">
                  <a-input placeholder="请输入设备序列号" v-model="queryParam.deviceId"></a-input>
                </a-form-item>

              </a-col>
              <a-col :md="6" :sm="12">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="日期">
                  <a-range-picker
                    v-model="queryParam.date"
                    format="YYYY-MM-DD"
                    valueFormat="YYYY-MM-DD"
                    :placeholder="['开始日期', '结束日期']"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="8">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="query()" icon="search">查询</a-button>
                  <a-button type="primary" @click="reset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <a-row :gutter="{ xs: 10, sm: 16, md: 24}">
              <a-col :xs="12" :sm="8" :md="8" :lg="8">
                <a-statistic title="租金总额" :value="statistic.totalPrice" style="margin-top: 10px"><template #suffix>RMB</template></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="8" :md="8" :lg="8">
                <a-statistic title="使用率" :value="statistic.utilizationRate" style="margin-top: 10px"><template #suffix>%</template></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="8" :md="8" :lg="8">
                <a-statistic title="平均租金" :value="statistic.averPrice" style="margin-top: 10px"><template #suffix>RMB</template></a-statistic>
              </a-col>
              <!-- <a-col :span="8">
                <a-statistic title="欠费总额" :value="93"><template #suffix>RMB</template></a-statistic>
              </a-col> -->
            </a-row>
          </div>
          <a-table bordered :loading="loading" :dataSource="dataSource" size="small" rowKey="time" :columns="columns" :pagination="ipagination" @change="handleTableChange">
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import { getHotelReportList, getHotelReportStatistic } from '@/api/reports'
import { ReportMixin } from './ReportMixin'
const columns = [{
  title: '营业日',
  align:"center",
  dataIndex: 'time'
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
  dataIndex: 'utilizationRate',
  customRender (rate) {
    return rate ? `${rate}%` : 0
  }
},{
  title: '租金',
  align:"center",
  sorter: true,
  sortOrder: 'descend',
  dataIndex: 'totalPrice'
}]
export default {
  mixins: [ ProListMixin, ReportMixin ],
  data () {
    return {
      queryParam: {
        pageNo: 1,
        pageSize: 10
      },
      statistic: {},
      dataSource: [],
      columns: columns,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
  },
  mounted () {
    // this.loadStatistic()
  },
  methods: {
    loadStatistic () {
      getHotelReportStatistic(this.$store.getters.hotelId, this.queryParam.startTime, this.queryParam.endTime).then(res => {
        if (this.$isAjaxSuccess(res.code)) this.statistic = res.result || {}
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
      getHotelReportList({...params, hotelId: this.$store.getters.hotelId}).then((res) => {
        if (this.$isAjaxSuccess(res.code)) {
          this.dataSource = res.result.tableHotelResponseList
          this.ipagination.total = res.result.total || 0
        } else {
          this.$message.warning(res.message)
        }
      }).finally(() => this.loading = false)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
