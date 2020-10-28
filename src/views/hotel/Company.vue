<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入企业名称" v-model="queryParam.companyName"></a-input>
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
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加企业</a-button>
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
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <company-modal ref="modalForm" @ok="modalFormOk"></company-modal>
  </a-card>
</template>

<script>
  import CompanyModal from './modules/CompanyModal'
  import { getCompanyList, delCompany } from '@/api/hotel'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import * as dayjs from 'dayjs'

  export default {
    name: '',
    mixins: [ ProListMixin ],
    components: { CompanyModal },
    data() {
      return {
        description: '这是用户管理页面',
        queryParam: {
          pageNo: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '企业名称',
            align: 'center',
            dataIndex: 'companyName',
          },
          {
            title: '地址',
            align: 'center',
            dataIndex: 'description',
          },
          {
            title: '添加时间',
            align: 'center',
            dataIndex: 'createTime',
            customRender (t) {
              return t ? dayjs(t).format('YYYY-MM-DD HH:mm:ss') : ''
            }
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
    },
    methods: {
      loadData (arg) {
        this.getDataList(arg)
      },
      getDataList (arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        const params = {...this.queryParam}
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getCompanyList(params).then((res) => {
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
        delCompany(id).then(res => {
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
