<template>
  <div class="air panel">
    <div class="templure">
      <p>{{ tempValue }}<span>℃</span></p>
      <p>温度</p>
    </div>
    <div class="mode">
      <div :class="`${hasWing ? 'col-3' : 'col-5'}`"><span>{{ speedValue }}</span> 风速</div>
      <div :class="`${hasWing ? 'col-3' : 'col-5'}`"><span>{{ modeValue }}</span> 模式</div>
      <div :class="`${hasWing ? 'col-3' : 'col-5'}`" v-if="hasWing"><span>{{ wingValue }}</span> 风向</div>
    </div>
    <div class="toolbar">
      <div class="key" :class="{disabled: !speedEnable}">
        <i class="obicon obicon-wing-o" @click="handleFan(!speedEnable)"></i>
        <p>风扇</p>
      </div>
      <div class="key" :class="{on: isPowerOn, off: !isPowerOn}">
        <i class="obicon obicon-power" @click="handlePower()"></i>
        <p>开关</p>
      </div>
      <div class="key" :class="{disabled: !isPowerOn}">
        <i class="obicon obicon-mode-o" @click="handleMode()"></i>
        <p>模式</p>
      </div>
    </div>
    <!-- <div class="toolbar" style="margin-top: 0;">
      <div class="key pad0" :class="{disabled: !wingEanble}" v-if="vWingEnable">
        <i class="sm obicon obicon-swing-v" @click="handleSwingV(!wingEanble)"></i>
        <p>上下摆风</p>
      </div>
      <div class="key pad0" :class="{disabled: !wingEanble}" v-if="hWingEnable">
        <i class="sm obicon obicon-swing-h" @click="handleSwingH(!wingEanble)"></i>
        <p>左右摆风</p>
      </div>
    </div> -->
    <div class="toolbar temp" :class="{disabled: !tempEnable}">
      <i class="obicon obicon-minus" @click="hadnleTemp(-1, !tempEnable)"></i>
      <p>温度</p>
      <i class="obicon obicon-plus" @click="hadnleTemp(1, !tempEnable)"></i>
    </div>
  </div>
</template>

<script>
import { AirConditionEquip } from 'hardware-suit'
export default {
  props: {
    equip: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      templure: 26,
      speed: 0,
      mode: 0,
      power: 0,
      // airEquip: {}
    }
  },
  computed: {
    airEquip () {
      return this.equip && Object.keys(this.equip).length ? this.equip : new AirConditionEquip()
    },
    isPowerOn () {
      return this.airEquip.isPowerOn()
    },
    tempValue () {
      return this.airEquip.getTemperatureText()
    },
    speedValue () {
      return this.airEquip.getSpeedText()
    },
    modeValue () {
      return this.airEquip.getModeText()
    },
    wingValue () {
      return this.airEquip.getWingText()
    },
    tempEnable () {
      return this.airEquip.isTemperatureValid()
    },
    speedEnable () {
      return this.airEquip.isFanSpeedValid()
    },
    hWingEnable () {
      return this.airEquip.hasHorizontalSwing()
    },
    vWingEnable () {
      return this.airEquip.hasVerticalSwing()
    },
    hasWing () {
      return false // this.hWingEnable && this.vWingEnable
    },
    wingEanble () {
      return this.airEquip.isWingValid()
    }
  },
  mounted () {
  },
  created () {
    // this.airEquip = this.equip && Object.keys(this.equip).length ? this.equip : new AirConditionEquip()
  },
  methods: {
    handlePower () {
      this.airEquip.setPower(!this.airEquip.getPowerStatus())
      this.emitEvent(true)
    },
    handleFan (unclickable) {
      if (!this.isPowerOn || unclickable) return
      const fan = this.airEquip.getSpeed()
      this.airEquip.setSpeed(1 + +fan)
      this.emitEvent()
    },
    handleMode () {
      if (!this.isPowerOn) return
      const mode = this.airEquip.getMode()
      this.airEquip.setMode(1 + +mode)
      this.emitEvent()
    },
    handleSwingV (unclickable) {
      if (!this.isPowerOn || unclickable) return
      const v = this.airEquip.getVerticalWing()
      this.airEquip.setVerticalWing(1 + +v)
      this.emitEvent()
    },
    handleSwingH (unclickable) {
      if (!this.isPowerOn || unclickable) return
      const v = this.airEquip.getHorizontalWing()
      this.airEquip.setHorizontalWing(1 + +v)
      this.emitEvent()
    },
    hadnleTemp (val, unclickable) {
      if (!this.isPowerOn || unclickable) return
      const temperature = +this.airEquip.getTemperature() || AirConditionEquip.defaultTemp
      this.airEquip.setTemperature(val + +temperature)
      this.emitEvent()
    },
    emitEvent (powerOnly = false) {
      // TODO
      // if (this.hasWing) {
      //   this.airEquip.setVerticalWing(0).setHorizontalWing(0)
      // }
      const status = powerOnly ? this.airEquip.getPowerBytes() : this.airEquip.getBytes()
      this.$emit('change', status)
    }
  },
  destroyed () {
    // this.isPowerOn = false
    this.templure = 26
    this.speed = 0
    this.mode = 0
    this.power = 0
  },
}
</script>

<style lang="less" scoped>
.pad0{
  padding: 0!important;
}
.obicon.sm{
  font-size: 20px!important;
  color: #666!important;
}
p{
  margin-bottom: 0;
}
.air.panel {
  width: 380px;
  text-align: center;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 14px;
  background: #f3f3f3;
  overflow: hidden;
  padding-bottom: 30px;
  box-shadow: 1px 1px 2px 1px #f2f2f2;
  user-select: none;

  .templure {
    padding: 30px 0 20px;
    background: #fff;

    > p {
      font-size: 26px;
      span {
        color: #999;
        font-size: 14px;
        margin-left: 4px;
      }
    }
    > p + p{
      font-size: 16px;
    }
  }

  .mode {
    background: #fff;

    span{

    }

    div {
      display: inline-block;
      // width: 50%;
      padding: 30px;
    }
  }
  .col-3 {
    width: 33%;
  }
  .col-5 {
    width: 50%;
  }

  .toolbar {
    margin-top: 30px;
    padding: 10px;

    &.temp {
      background: transparent;
      width: 50%;
      margin: 0 auto;
      background: #fff;
      border-radius: 40px;
      margin-top: 30px;
      padding: 16px 0;

      i,
      p {
        display: inline-block;
        width: 30%;
        font-size: 16px;
      }

      i {
        color: #3e3b3b;
        cursor: pointer;
      }
    }

    &.temp.disabled i,
    & .btn.disabled i {
      color: #eee;
    }

    .key {
      display: inline-block;
      width: 30%;
      padding: 10px;
    }
  }

  .toolbar .key.disabled i,
  .toolbar.temp.disabled i {
    cursor: no-drop;
  }
  .key {
    i {
      font-size: 26px;
      padding: 6px;
      background: #fff;
      border-radius: 100%;
      border: 1px solid #eee;
      cursor: pointer;
      transition: all .3s;
      color: #3e3b3b;
    }

    p {
      margin-top: 14px;
    }

    &.off i {
      color: #999;
    }

    &.on i {
      color: rgb(241, 102, 102);
    }
  }
}
</style>
