<template>
  <div>
    <a-card title="网关红外设备报表" class="ant-card-slim" :class="{ 'anty-list-cust':true }" :bordered="false" :style="{ marginTop: '24px' }">
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

              <a-col :md="6" :sm="12">
                <a-form-item label="酒店名称">
                  <a-input placeholder="请输入酒店名称" v-model="queryParam.hotelName"></a-input>

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
                <a-statistic title="设备总数" :value="statistic.deviceTotal" style="margin-top: 10px"></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="6" :md="6" :lg="6">
                <a-statistic title="离线总数" :value="`${(statistic.oboxLine || 0) + (statistic.irLine || 0)}`" style="margin-top: 10px"></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="6" :md="6" :lg="6">
                <a-statistic title="网关离线率" :value="statistic.oboxRate" style="margin-top: 10px"><template #suffix>%</template></a-statistic>
              </a-col>
              <a-col :xs="12" :sm="6" :md="6" :lg="6">
                <a-statistic title="红外离线率" :value="statistic.irRate" style="margin-top: 10px"><template #suffix>%</template></a-statistic>
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
import { getEquipsReportList, getEquipsReportStatistic } from '@/api/reports'
const columns = [{
  title: '营业日',
  align:"center",
  dataIndex: 'time'
},{
  title: '酒店名字',
  align:"center",
  dataIndex: 'hotelName'
},{
  title: '设备总数',
  align:"center",
  dataIndex: 'deviceTotal'
},{
  title: '离线设备',
  align:"center",
  // dataIndex: 'offlineDevice'
  children: [{
    title: '网关',
    align: 'center',
    dataIndex: 'oboxline'
  }, {
    title: '红外',
    align: 'center',
    dataIndex: 'irLiner'
  }]
},{
  title: '离线率',
  align:"center",
  // dataIndex: 'offlineRate'
  children: [{
    title: '网关',
    align: 'center',
    dataIndex: 'oboxRate',
    customRender (rate) {
      return rate ? `${rate}%` : ''
    }
  }, {
    title: '红外',
    align: 'center',
    dataIndex: 'irRate',
    customRender (rate) {
      return rate ? `${rate}%` : ''
    }
  }]
}]
export default {
  mixins: [ ProListMixin ],
  data () {
    return {
      queryParam: {
        pageNo: 1,
        pageSize: 10
      },
      statistic: {},
      dataSource: [],
      columns: columns,
    }
  },
  mounted () {
    // this.loadStatistic()
  },
  methods: {
    loadStatistic () {
      getEquipsReportStatistic(this.$store.getters.hotelId, this.queryParam.type).then(res => {
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
      getEquipsReportList({...params, hotelId: this.$store.getters.hotelId}).then((res) => {
        if (this.$isAjaxSuccess(res.code)) {
          this.dataSource = res.result.tableDeviceResponse
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
