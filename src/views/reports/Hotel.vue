<template>
  <div>
    <a-card title="酒店经营报表" :class="{ 'anty-list-cust':true }" :bordered="false" :style="{ marginTop: '24px' }">
      <div class="extra-wrapper" slot="extra">
        <div class="extra-item">
          <a>今日</a>
          <a>本月</a>
          <a>本年</a>
          <!-- <a @click="handleToggleSearch" style="">
            <a-tag>
              {{ toggleSearchStatus ? '收起条件' : '更多条件' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
            </a-tag>
          </a> -->
        </div>
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
            <a-row :gutter="16">
              <a-col :span="8">
                <a-statistic title="租金总额" :value="1128" style="margin-right: 50px"><template #suffix>RMB</template></a-statistic>
              </a-col>
              <a-col :span="8">
                <a-statistic title="使用率" :value="93"><template #suffix>%</template></a-statistic>
              </a-col>
              <!-- <a-col :span="6">
                <a-statistic title="平均租金" :value="1128" style="margin-right: 50px"><template #suffix>RMB</template></a-statistic>
              </a-col> -->
              <a-col :span="8">
                <a-statistic title="欠费总额" :value="93"><template #suffix>RMB</template></a-statistic>
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
import { getHotelReportList } from '@/api/reports'
const columns = [{
  title: '营业日',
  align:"center",
  dataIndex: 'businessDay'
},{
  title: '房间总数',
  align:"center",
  dataIndex: 'roomAccount'
},{
  title: '在用数',
  align:"center",
  dataIndex: 'usageAccount'
},{
  title: '在用使用率',
  align:"center",
  dataIndex: 'usageRate'
},{
  title: '租金',
  align:"center",
  sorter: true,
  sortOrder: 'descend',
  dataIndex: 'rent'
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
      getHotelReportList(params).then((res) => {
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
