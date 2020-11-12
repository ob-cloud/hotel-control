<template>
  <div>
    <a-card title="集团数据概览" v-isPermitted="'home:group'">
      <a-row :gutter="{ xs: 10, sm: 20, md: 20}">
        <a-col :xs="12" :sm="6" :md="6" :lg="5">
          <a-card class="box">
            <a-statistic :value="group.hotels">
              <span slot="title"><i class="obicon obicon-hotel" style="font-size: 20px; font-weight: 600;"></i> 酒店总数</span>
              <template #suffix>间</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :xs="12" :sm="6" :md="6" :lg="5">
          <a-card class="box">
            <a-statistic :value="group.devices">
              <span slot="title"><i class="obicon obicon-equip" style="font-size: 20px;font-weight: 600;"></i> 设备总数</span>
              <template #suffix>个</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :xs="12" :sm="6" :md="6" :lg="5">
          <a-card class="box">
            <a-statistic :value="group.aveRent">
              <span slot="title"><a-icon type="pay-circle" style="font-size: 20px;font-weight: 600;" /> 平均租金</span>
              <template #suffix>RMB</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :xs="12" :sm="6" :md="6" :lg="5">
          <a-card class="box">
            <a-statistic :value="group.rents">
              <span slot="title"><a-icon type="account-book" style="font-size: 20px;font-weight: 600;" /> 集团总收入</span>
              <template #suffix>RMB</template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="酒店数据概览" style="margin-top: 20px;" v-isPermitted="'home:hotel'">
      <a-row :gutter="{ xs: 10, sm: 20, md: 20}">
        <a-col :xs="12" :sm="6" :md="6" :lg="5">
          <a-card class="box">
            <a-statistic :value="hotel.rooms">
              <span slot="title"><i class="obicon obicon-hotel" style="font-size: 20px; font-weight: 600;"></i> 房间总数</span>
              <template #suffix>间</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :xs="12" :sm="6" :md="6" :lg="5">
          <a-card class="box">
            <a-statistic :value="hotel.devices">
              <span slot="title"><i class="obicon obicon-equip" style="font-size: 20px;font-weight: 600;"></i> 设备总数</span>
              <template #suffix>个</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :xs="12" :sm="6" :md="6" :lg="5">
          <a-card class="box">
            <a-statistic :value="hotel.rents">
              <span slot="title"><a-icon type="pay-circle" style="font-size: 20px;font-weight: 600;" /> 租金</span>
              <template #suffix>RMB</template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { getGroupStatistic, getHotelStatistic } from '@/api/system'
export default {
  data () {
    return {
      group: {},
      hotel: []
    }
  },
  mounted () {
    this.getGroupDataList()
    this.getHotelDataList()
  },
  methods: {
    getGroupDataList () {
      getGroupStatistic().then((res) => {
        if (this.$isAjaxSuccess(res.code)) this.group = res.result
      })
    },
    getHotelDataList () {
      getHotelStatistic(this.$store.getters.hotelId).then((res) => {
        if (this.$isAjaxSuccess(res.code)) this.hotel = res.result
      })
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  height: 118px;
  margin-top: 8px;
}
</style>
