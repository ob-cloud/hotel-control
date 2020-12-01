import moment from 'moment'
export const ReportMixin =  {
  data () {
    return {
    }
  },
  methods: {
    reset () {
      this.queryParam.type = undefined
      this.queryParam.date = null
      this.searchReset()
    },
    query (type) {
      this.setParamDateString(!!type)
      this.searchQuery()
    },
    setParamDateString (bool) {
      let startTime, endTime
      if (bool && this.queryParam.type) {
        const type = this.queryParam.type
        const typeMap = {
          3: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
          2: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
          1: [moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD')]
        }
        startTime = typeMap[type][0]
        endTime = typeMap[type][1]
        this.queryParam.date && (this.queryParam.date = null)
      } else if (this.queryParam.date) {
        startTime = this.queryParam.date[0]
        endTime = this.queryParam.date[1]
        this.queryParam.type && (this.queryParam.type = undefined)
      }
      this.queryParam.startTime = startTime
      this.queryParam.endTime = endTime
    }
  }
}
