<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题" v-model="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="消息类型">
              <a-select v-model="queryParam.type" placeholder="请选择消息类型">
                <a-select-option value="1">欠费</a-select-option>
                <a-select-option value="2">离线</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >

        <span slot="action" slot-scope="text, record">
          <a @click="showAnnouncement(record)">查看</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <show-announcement ref="ShowAnnouncement"></show-announcement>
  </a-card>
</template>

<script>
  import ShowAnnouncement from '@/components/tools/ShowAnnouncement'
  import { getAnnouncementList, editAnnouncementStatus } from '@/api/system'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'

  export default {
    name: 'SysAnnouncementList',
    mixins: [ ProListMixin ],
    components: {
      ShowAnnouncement
    },
    data() {
      return {
        description: '系统通告表管理页面',
        // 查询条件
        queryParam: {},
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender (t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '标题',
            align: 'center',
            dataIndex: 'title'
          },
          {
            title: '消息对象',
            align: 'center',
            dataIndex: 'target'
          },
          {
            title: '消息类型',
            align: 'center',
            dataIndex: 'type',
            customRender (text) {
              return ['', '酒店欠费', '设备离线'][text] || text
            }
          },
          {
            title: '上报时间',
            align: 'center',
            dataIndex: 'createAt'
          },
          {
            title: '阅读状态',
            align: 'center',
            dataIndex: 'status',
            customRender(t) {
              return t ? '已读' : '未读'
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          }
        ],
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
        getAnnouncementList(params).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total || 0
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      },
      showAnnouncement (record){
        editAnnouncementStatus({anntId: record.anntId}).then((res)=>{
          if(this.$isAjaxSuccess(res.code)){
            this.loadData()
          }
        })
        this.$refs.ShowAnnouncement.detail(record)
      },
    }
  }
</script>
