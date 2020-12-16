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
              <a-form-item label="楼层">
                <a-input allowClear @keyup.enter.native="handleSearch" v-model="queryParam.floorName" placeholder="请输入楼层名称"></a-input>
              </a-form-item>
            </a-col>
            <!-- <a-col :md="6" :sm="12">
              <a-form-item label="房间">
                <a-input allowClear @keyup.enter.native="handleSearch" v-model="queryParam.roomName" placeholder="请输入房间名称"></a-input>
              </a-form-item>
            </a-col> -->
            <template v-if="toggleSearchStatus">
              <a-col :sm="12" :md="6" :lg="5">
                <a-form-item label="房间">
                  <a-input allowClear @keyup.enter.native="handleSearch" v-model="queryParam.roomName" placeholder="请输入房间名称"></a-input>
                </a-form-item>
              </a-col>
            </template>
            <a-col :sm="12" :md="6" :lg="5">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="handleSearch" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                <a @click="handleToggleSearch" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div slot="extra">
        <a-button-group>
          <a-button type="primary" icon="reload" title="刷新" @click="handleRefresh"></a-button>
          <a-button v-isPermitted="'room:add'" type="primary" icon="plus" title="添加" @click="handleAdd"></a-button>
        </a-button-group>
      </div>
      <div class="block-list" :style="{height: contentHeight + 'px', 'overflow-y': 'auto'}">
        <a-spin :spinning="loading">
          <template v-if="roomList.length">
            <div class="block-item" :class="{'active': item.elec}" v-for="item in roomList" :key="item.id">
              <div class="toolbar left">
                <!-- <i class="obicon obicon-temperature" style="color: #f66c32;"></i> -->
                <span title="温度"><a-icon :component="iconTemperature" style="font-size: 20px; color: #f66c32;" />{{ item.temperature ? item.temperature + '℃' : '--' }}</span>
              </div>
              <div class="toolbar">
                <!-- <i v-isPermitted="'room:classroom:device:view'" class="icon obicon obicon-infrared" title="绑定OBOX" @click="handleDeviceModal(item)"></i> -->
                <!-- <i v-isPermitted="'room:classroom:device:view'" class="icon obicon obicon-equip" title="关联设备" @click="(e) => handleDeviceModal(item, e)"></i> -->
                <!-- <a-popconfirm :title="`${item.elec ? '停' : '启'}用插卡取电?`" @confirm="(e) => handleControl(item, e)">
                  <i v-isPermitted="'room:control'" class="icon obicon obicon-room-card" :class="{active: item.elec}" style="font-weight: 600;" title="插卡取电"></i>
                </a-popconfirm> -->
                <i v-isPermitted="'room:control'" class="icon obicon obicon-equip" :class="{active: item.isOnline}" style="font-weight: 600; cursor: default;" title="obox"></i>
                <a-icon v-isPermitted="'room:edit'" class="icon" type="edit" title="编辑" @click="(e) => { handleEdit(item) }" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleRemove(item.id)">
                  <a-icon v-isPermitted="'room:del'" class="icon" type="delete" />
                </a-popconfirm>
              </div>
              <div class="content">
                <i class="building-sign obicon obicon-room-o"></i>
                <p class="text" @click="handleDetail(item)">
                  {{ item.buildName }}{{ item.floorName }}{{ item.name }}
                </p>
              </div>
            </div>
          </template>
          <a-empty :image="simpleImage" v-else />
        </a-spin>
        <a-pagination v-if="roomList.length" simple style="position: fixed; right: 70px; bottom: 30px;" :current="queryParam.pageNo" :pageSize.sync="queryParam.pageSize" :total="total" :showSizeChanger="true" @change="handlePageChange" />
      </div>
      <room-modal ref="modalForm" @ok="modalFormOk"></room-modal>
      <room-detail-modal ref="detailModal"></room-detail-modal>
      <!-- <room-obox-modal ref="deviceModal"></room-obox-modal> -->
    </a-card>
  </div>
</template>

<script>
import { getRoomList, delRoom } from '@/api/hotel'
import { stopHotelDevice } from '@/api/device'
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import { Empty } from 'ant-design-vue'
import RoomModal from './modules/RoomModal'
import RoomDetailModal from './modules/RoomDetailModal'
// import RoomOboxModal from './modules/RoomOboxModal'
import { iconTemperature } from '@/core/icons'

export default {
  components: { RoomModal, RoomDetailModal },
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
      total: 0,
      iconTemperature
    }
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
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
      getRoomList({...this.queryParam, hotelId: this.$store.getters.hotelId}).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.roomList = res.result.records
          this.total = res.result.total
        }
      }).finally(() => this.loading = false)
    },
    handleDeviceModal (item) {
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
    handleControl (item) {
      stopHotelDevice(item.deviceSerialId, item.elec).then(res => {
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
      transition: all .3s;
      &:hover{
        text-decoration: underline;
      }
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
