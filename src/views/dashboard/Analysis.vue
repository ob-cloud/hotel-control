<template>
  <div>
    <a-card title="集团数据概览">
      <a-row :gutter="20">
        <a-col :span="6">
          <a-card style="height: 118px;">
            <a-statistic :value="1128">
              <span slot="title"><i class="obicon obicon-hotel" style="font-size: 20px; font-weight: 600;"></i> 酒店总数</span>
              <template #suffix>间</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card style="height: 118px;">
            <a-statistic :value="1128">
              <span slot="title"><i class="obicon obicon-equip" style="font-size: 20px;font-weight: 600;"></i> 设备总数</span>
              <template #suffix>个</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card style="height: 118px;">
            <a-statistic :value="1128">
              <span slot="title"><a-icon type="pay-circle" style="font-size: 20px;font-weight: 600;" /> 平均租金</span>
              <template #suffix>RMB</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card style="height: 118px;">
            <a-statistic :value="1128">
              <span slot="title"><a-icon type="account-book" style="font-size: 20px;font-weight: 600;" /> 集团总收入</span>
              <template #suffix>RMB</template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="酒店数据概览" style="margin-top: 20px;">
      <a-row :gutter="20">
        <a-col :span="8">
          <a-card style="height: 118px;">
            <a-statistic :value="1128">
              <span slot="title"><i class="obicon obicon-hotel" style="font-size: 20px; font-weight: 600;"></i> 房间总数</span>
              <template #suffix>间</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card style="height: 118px;">
            <a-statistic :value="1128">
              <span slot="title"><i class="obicon obicon-equip" style="font-size: 20px;font-weight: 600;"></i> 设备总数</span>
              <template #suffix>个</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card style="height: 118px;">
            <a-statistic :value="1128">
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
export default {

}
</script>

<style lang="less" scoped>

</style>
