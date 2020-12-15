<template>
  <div class="building ui-container">
    <a-card>
      <div slot="title" class="table-page-search-wrapper">
        <a-form layout="inline" @submit.prevent="handleSearch">
          <a-row :gutter="24">
            <a-col :sm="12" :md="6" :lg="5">
              <a-form-item label="楼栋">
                <a-input allowClear @keyup.enter.native="handleSearch" v-model="queryParam.name" placeholder="请输入楼栋名称"></a-input>
              </a-form-item>
            </a-col>
            <a-col :sm="12" :md="6" :lg="5">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="handleSearch" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div slot="extra">
        <a-button-group>
          <a-button type="primary" icon="reload" title="刷新" @click="handleRefresh"></a-button>
          <a-button v-isPermitted="'building:add'" type="primary" icon="plus" title="添加" @click="handleAdd"></a-button>
        </a-button-group>
      </div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataList"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a v-isPermitted="'building:edit'" @click="handleEdit(record)">编辑</a>
          <a-divider v-isPermitted="'building:edit'" type="vertical" />
          <a v-isPermitted="'building:floor:add'" @click="handleAction(record)">添加楼层</a>
          <a-divider v-isPermitted="'building:floor:add'" type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleRemove(record.id)">
            <a v-isPermitted="'building:del'">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
      <!-- <div class="block-list" :style="{height: contentHeight + 'px', 'overflow-y': 'auto'}">
        <a-spin :spinning="loading">
          <div class="block-item" v-for="item in dataList" :key="item.id">
            <div class="toolbar">
              <a-icon v-isPermitted="'room:building:edit'" class="icon" type="edit" title="编辑" @click="handleEdit(item)" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleRemove(item.id)">
                <a-icon v-isPermitted="'room:building:delete'" class="icon" type="delete" />
              </a-popconfirm>
            </div>
            <div class="content">
              <i class="building-sign obicon obicon-building-o"></i>
              <p class="text">
                {{ item.name }}栋
              </p>
            </div>
          </div>
        </a-spin>
        <a-pagination style="position: fixed; right: 70px; bottom: 30px;" simple :current="queryParam.pageNo" :pageSize.sync="queryParam.pageSize" :total="total" @change="handlePageChange" />
      </div> -->
      <building-modal ref="modalForm" @ok="modalFormOk"></building-modal>
      <floor-modal :readonly="true" ref="floorForm" @ok="modalFormOk"></floor-modal>
    </a-card>
  </div>
</template>

<script>
import { getBuildingList, delBuilding } from '@/api/hotel'
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import BuildingModal from './modules/BuildingModal'
import FloorModal from './modules/FloorModal'
import * as dayjs from 'dayjs'
export default {
  components: { BuildingModal, FloorModal },
  mixins: [ProListMixin],
  data () {
    return {
      loading: false,
      containerHeight: 500,
      dataList: [],
      queryParam: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      columns: [{
        title: '#',
        dataIndex: '',
        key: 'rowIndex',
        width: 60,
        align: 'center',
        customRender (t, r, index) {
          return parseInt(index) + 1
        }
      }, {
        title: '楼栋名称',
        align: 'center',
        dataIndex: 'name',
      },
      // {
      //   title: '楼栋ID',
      //   align: 'center',
      //   dataIndex: 'id',
      // },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createTime',
        customRender (t) {
          return t ? dayjs(t).format('YYYY-MM-DD HH:mm:ss') : ''
        }
      },
      // {
      //   title: '创建人',
      //   align: 'center',
      //   dataIndex: 'createBy',
      // },
      {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'center',
        width: 170
      }]
    }
  },
  mounted () {
    this.calculateContentHeight()
  },
  methods: {
    searchReset () {
      this.queryParam = { pageNo: 1, pageSize: 10 }
      this.loadData(1)
    },
    loadData (arg) {
      this.getDataList(arg)
    },
    getDataList (arg) {
      if (arg === 1) {
        this.queryParam.pageNo = 1
      }
      this.loading = true
      getBuildingList({...this.queryParam, hotelId: this.$store.getters.hotelId}).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.dataList = res.result.records
          this.ipagination.total = res.result.total
        }
      }).finally(() => this.loading = false)
    },
    handleRefresh () {
      this.loadData()
    },
    handleSearch () {
      this.loadData(1)
    },
    handleRemove (id) {
      delBuilding(id).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('删除成功')
          this.loadData(1)
        } else this.$message.error(res.message)
      })
    },
    handlePageChange (pageNo, pageSize) {
      this.queryParam.pageNo = pageNo
      this.queryParam.pageSize = pageSize
      this.loadData()
    },
    handleAction (record) {
      this.$refs.floorForm.edit({buildId: record.id})
    }
  },
}
</script>

<style lang="less" scoped>
.search-bar{
  padding: 10px;
  .caption::before,
  .caption::after{
    content: " ";
    visibility: hidden;
    width: 1px;
    height: 1px;
    clear: both;
  }
  .caption.is-right{
    float: right;
  }
  .caption .el-button-group .el-button{
    padding: 3px 8px;
  }

  .caption-item{
    width: 200px;
    margin-right: 12px;
  }
}
.block-list{
  position: relative;
  // padding-right: 70px;
  overflow: auto;
  .pagination{
    display: inline-block;
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 6px;
    box-shadow: 0 0 1px 1px #f2f2f2;
    background: #fff;
    padding: 0;
    width: 60px;
  }
}
.block-item{
  position: relative;
  display: inline-block;
  padding: 20px;
  background: #fff;
  margin: 10px;
  width: 230px;
  height: 164px;
  border-radius: 4px;
  overflow: hidden;
  // box-shadow: 0px 0px 3px 1px #c0c4cc;
  box-shadow: 0px 0px 4px 0px #c0c4cc;

  &.active{
    background: #fff4d3;
    // box-shadow: 0px 0px 3px 1px #ebdbac;
    box-shadow: 0px 0px 4px 1px #ebdbac;

    .building-sign{
      color: #353535;
      text-shadow: 0 0 3px #626262;
    }
  }

  .toolbar{
    position: absolute;
    right: 5px;
    top: 5px;
    .icon{
      font-size: 14px;
      padding: 5px;
      cursor: pointer;
      color: #999;
      transition: all .3s;

      &:hover{
        color: #000;
        font-weight: 700;
      }
      & + .icon{
        right: 5px;
      }
      &.active{
        color: #0cadf8;
        font-weight: bolder;
      }
    }
  }
  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .building-sign{
    display: inline-block;
    color: #bdbdbd;
    font-size: 50px;
    padding: 5px;

    &.is-active{
      color: #d8d815;
    }
  }
  .text{
    font-size: 14px;
    display: inline-block;
    margin-left: 5px;
  }
}
.ob-form{
 width: 80%;
 margin: 0 auto;
 .el-select,
 .el-input{
   width: 300px;
 }
}
</style>
<style lang="less">
.block-list{
  .pagination > button{
    display: block;
    padding: 5px 10px;
    height: 40px;
    background-color: transparent;
    &:last-of-type{
      border-top: 1px solid #eee;
    }
  }
}
</style>
