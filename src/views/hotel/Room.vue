<template>
  <div class="building ui-container">
    <a-card>
      <div slot="title" class="search-bar">
        <div class="caption">
          <a-input allowClear class="caption-item" @keyup.enter.native="handleSearch" v-model="queryParam.name" placeholder="请输入楼栋名称"></a-input>
          <a-input allowClear class="caption-item" @keyup.enter.native="handleSearch" v-model="queryParam.floorName" placeholder="请输入楼层名称"></a-input>
          <a-input allowClear class="caption-item" @keyup.enter.native="handleSearch" v-model="queryParam.roomName" placeholder="请输入房间名称"></a-input>
          <a-button type="primary" @click="handleSearch" icon="search">查询</a-button>
          <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </div>
      </div>
      <div slot="extra">
        <a-button-group>
          <a-button type="primary" icon="reload" title="刷新" @click="handleRefresh"></a-button>
          <a-button v-isPermitted="'room:classroom:add'" type="primary" icon="plus" title="添加" @click="handleAdd"></a-button>
        </a-button-group>
      </div>
      <div class="block-list" :style="{height: contentHeight + 'px', 'overflow-y': 'auto'}">
        <a-spin :spinning="loading">
          <div class="block-item" :class="{'active': item.lightState}" v-for="item in roomList" :key="item.id">
            <div class="toolbar left">
              <span title="温度"><i class="obicon obicon-temperature" style="color: #f66c32;"></i>{{ item.temperature }}℃</span>
            </div>
            <div class="toolbar">
              <!-- <i v-isPermitted="'room:classroom:device:view'" class="icon obicon obicon-infrared" title="绑定OBOX" @click="handleDeviceModal(item)"></i> -->
              <!-- <i v-isPermitted="'room:classroom:device:view'" class="icon obicon obicon-equip" title="关联设备" @click="(e) => handleDeviceModal(item, e)"></i> -->
              <a-popconfirm :title="`${item.lightState ? '停' : '启'}用插卡取电?`" @confirm="(e) => handleLamp(item, e)">
                <i class="icon obicon obicon-room-card" :class="{active: item.lightState}" style="font-weight: 600;" @click="(e) => e.stopPropagation()" v-isPermitted="'room:classroom:lamp'" title="插卡取电"></i>
              </a-popconfirm>
              <a-icon v-isPermitted="'room:classroom:edit'" class="icon" type="edit" title="编辑" @click="(e) => { e.stopPropagation(); handleEdit(item) }" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleRemove(item.id)">
                <a-icon v-isPermitted="'room:classroom:delete'" class="icon" type="delete" @click="(e) => e.stopPropagation()" />
              </a-popconfirm>
            </div>
            <div class="content">
              <i class="building-sign obicon obicon-room-o"></i>
              <p class="text" @click="handleDetail(item)">
                {{ item.buildingName }}栋{{ item.floorName }}层{{ item.roomName }}房
              </p>
            </div>
          </div>
        </a-spin>
        <a-pagination simple style="position: fixed; right: 70px; bottom: 30px;" :current="queryParam.pageNo" :pageSize.sync="queryParam.pageSize" :total="total" :showSizeChanger="true" @change="handlePageChange" />
      </div>
      <room-modal ref="modalForm" @ok="modalFormOk"></room-modal>
      <room-detail-modal ref="detailModal"></room-detail-modal>
      <room-obox-modal ref="deviceModal"></room-obox-modal>
    </a-card>
  </div>
</template>

<script>
import { getRoomList, delRoom, handleLampPower } from '@/api/hotel'
import { ProListMixin } from '@/utils/mixins/ProListMixin'

import RoomModal from './modules/RoomModal'
import RoomDetailModal from './modules/RoomDetailModal'
import RoomOboxModal from './modules/RoomOboxModal'

export default {
  components: { RoomModal, RoomDetailModal, RoomOboxModal },
  mixins: [ProListMixin],
  data () {
    return {
      loading: false,
      containerHeight: 500,
      roomList: [],
      queryParam: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  mounted () {
    this.calculateContentHeight()
    this.$bus.$on('state', () => this.loadData())
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
      getRoomList(this.queryParam).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.roomList = res.result.records
          this.total = res.result.total
        }
      }).finally(() => this.loading = false)
    },
    handleDeviceModal (item, e) {
      e.stopPropagation()
      this.$refs.deviceModal.show(item)
    },
    handleDetail (record) {
      this.$refs.detailModal.show(record)
    },
    handleRefresh () {
      this.loadData()
    },
    handleSearch () {
      this.loadData(1)
    },
    handleLamp (item, e) {
      e.stopPropagation()
      const params = {
        roomId: item.id,
        deviceType: item.lightState ? 2 : 1
      }
      handleLampPower(params).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$message.success('操作成功')
        } else this.$message.error(res.message)
      })
    },
    handleRemove (id) {
      delRoom(id).then(res => {
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
    width: 150px;
    margin-right: 12px;
  }
}
.block-list{
  position: relative;
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
  box-shadow: 0px 0px 4px 0px #c0c4cc;
  &.active{
    background: #fff4d3;
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
  .toolbar.left{
    left: 10px;
    top: 8px;
    font-size: 12px;
    span {
      font-family: Consola;
      color: #999;
    }
    i{
      font-size: 14px;
      margin-right: 2px;
      margin-bottom: 2px;
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
    .text{
      cursor: pointer;
      color: #1890ff;
    }
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
