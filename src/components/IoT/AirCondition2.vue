<template>
  <div class="air panel">
    <div class="templure">
      <p>{{ tempValue }}<span>℃</span></p>
      <p>温度</p>
    </div>
    <div class="mode">
      <div class="fans"><span>{{ speedValue }}</span> 风速</div>
      <div class="imode"><span>{{ modeValue }}</span> 模式</div>
    </div>
    <div class="toolbar">
      <div class="key" :class="{disabled: !isSpeedSettable}">
        <i class="obicon obicon-wing-o" @click="handleFan()"></i>
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
    <div class="toolbar temp" :class="{disabled: !isTempSettable}">
      <i class="obicon obicon-minus" @click="hadnleTemp(-1)"></i>
      <p>温度</p>
      <i class="obicon obicon-plus" @click="hadnleTemp(1)"></i>
    </div>
  </div>
</template>

<script>
import { AirConditionEquip } from 'hardware-suit'
export default {
  data () {
    return {
      templure: 26,
      speed: 0,
      mode: 0,
      power: 0,
      airConditionEquip: null
    }
  },
  computed: {
    isPowerOn () {
      return this.airConditionEquip.isPowerOn()
    },
    tempValue () {
      return this.airConditionEquip.getTemperatureText()
    },
    speedValue () {
      return this.airConditionEquip.getSpeedText()
    },
    modeValue () {
      return this.airConditionEquip.getSpeedText()
    },
    isTempSettable () {
      return this.airConditionEquip.isTemperatureValid()
    },
    isSpeedSettable () {
      return this.airConditionEquip.isFanSpeedValid()
    },
  },
  mounted () {
    this.airConditionEquip = new AirConditionEquip()
  },
  methods: {
    handlePower () {
      // this.isPowerOn = !this.isPowerOn
      // this.power = +this.isPowerOn
      this.airConditionEquip.setPowerOn()
      // { powerOnly: true, status: this.airConditionEquip.getPowerBytes() }
      this.emitEvent()
    },
    handleFan () {
      if (!this.isPowerOn) return
      // this.speed += 1
      // this.speed > 3 && (this.speed = 0)
      this.airConditionEquip.setSpeed(this.airConditionEquip.getSpeedValue() + 1)
      this.emitEvent()
    },
    handleMode () {
      if (!this.isPowerOn) return
      // this.mode += 1
      // this.mode > 4 && (this.mode = 0)
      // if ([2, 3].includes(this.mode)) this.speed = 1
      // this.templure = 26
      const mode = this.airConditionEquip.getModeValue()
      this.airConditionEquip.setMode(mode + 1)
      this.emitEvent()
    },
    hadnleTemp (val) {
      if (!this.isPowerOn) return
      // this.templure += val
      // this.templure < 16 && (this.templure += 1)
      // this.templure > 30 && (this.templure -= 1)
      const temperature = this.airConditionEquip.getTemperature()
      this.airConditionEquip.setTemperature(temperature + val)
      this.emitEvent()
    },
    emitEvent (extra = { powerOnly: false }) {
      const air = {
        power: this.power,
        speed: this.speed,
        temperature: this.templure,
        mode: this.mode
      }
      this.$emit('change', { ...air, ...extra})
    }
  },
  destroyed () {
    this.isPowerOn = false
    this.templure = 26
    this.speed = 0
    this.mode = 0
    this.power = 0
  },
}
</script>

<style lang="less" scoped>
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
      width: 50%;
      padding: 30px;
    }
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
      margin-top: 14px !important;
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
