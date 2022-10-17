<template>
  <div class="chart-wrap">
    <div class="timeDimensionBox_Content">
      <div class="cellTitle">
        声量折线图
        <div class="first_Box">
          <div class="first_box_div1" ></div>
          <div class="first_box_div2">实际值</div>

          <div class="first_box_div3" ></div>
          <div class="first_box_div2">预测值</div>

          <div class="first_box_div4">
            <div class="bodong" ></div>
          </div>
          <div class="first_box_div2">预测波动</div>
          <div style="clear: both"></div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="cellConter" style="">
        <div class="" style="" id="volumeLineDiv"></div>
      </div>
      <div class="clearBox" style=""></div>
    </div>
  </div>
</template>

<script>
import setColorFunction from '../utils/colorStyle.js'
export default {
  name: 'chart',
  props: ['volumeBrokenLineBos'],
  data () {
    return {
      checkAll: false,
      checkedVal: [1, 2, 3],
      isIndeterminate: true,
      options: [
        {
          name: '实际值',
          id: 1,
          color: '#FF9900'
        },
        {
          name: '预测值',
          id: 2,
          color: '#930cea'
        },
        {
          name: '预测波动',
          id: 3,
          color: '#FF9900'
        }
      ]
    }
  },
  watch: {
    volumeBrokenLineBos () {
      this.drawEcharts()
    }
  },
  methods: {
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    /**
     * 绘制图表
     */
    drawEcharts () {
      let dateArr = [] // xlabel
      let predictionVolume = [] // 预测值
      let actualVolume = [] // 实际值
      let predictionVolumeMax = [] // 最大值
      let predictionVolumeMin = [] // 最小值
      console.info('绘制图表', this.volumeBrokenLineBos)
      if (this.volumeBrokenLineBos.length > 0) {
        this.volumeBrokenLineBos.forEach((re, idx) => {
          // x轴
          dateArr.push(re.datetime)
          // 实际值
          actualVolume.push(re.actualVolume)
          // 预测值
          predictionVolume.push(re.predictionVolume)
          // 最大值
          if (re.predictionVolumeMax !== '-') {
            if (re.predictionVolumeMin !== '-') {
              predictionVolumeMax.push(
                Number(re.predictionVolumeMax) - Number(re.predictionVolumeMin)
              )
            } else {
              predictionVolumeMax.push(
                Number(re.predictionVolumeMax)
              )
            }
          } else {
            predictionVolumeMax.push('-')
          }
          // 最小值
          predictionVolumeMin.push(re.predictionVolumeMin)
        })
      }
      // console.info('实际值数据', actualVolume)
      // eslint-disable-next-line camelcase
      var option_forecast = {
        animation: false,
        toolbox: {
          show: true,
          feature: {
            // saveAsImage : {show: true},
          }
        },

        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let timeTitle = params[0].axisValue
            let textInfo = '<div>' + timeTitle + '</div>'
            params.forEach((re, index) => {
              // console.log(re)
              let _data
              if (re.data !== '-') {
                if (re.seriesName === '未来数据的波动值-高') {
                  predictionVolumeMin.forEach((r, idx) => {
                    if (re.dataIndex === idx && r !== '-') {
                      _data = Number(r) + Number(re.data)
                      // _data = 10
                    }
                  })
                } else {
                  _data = Number(re.data)
                }
              } else {
                _data = '-'
              }
              textInfo +=
                  "<div style='display:flex;flex-direction:row;align-items:center'> <i style='display:inline_block;width:12px;margin-right: 5px;height:12px;border-radius: 6px;background:" +
                  re.color +
                  "'></i>" +
                  "<p style='height:21px;line-height:21px;font-size:12px;font-weight: 300'>" +
                  re.seriesName +
                  ':  ' +
                  _data +
                  '</p> </div>'
            })
            return textInfo
          }
        },

        dataZoom: {
          show: true,
          realtime: true,
          start: 0,
          end: 100,
          x: '65',
          y: 'bottom',
          height: 39,
          backgroundColor: setColorFunction(['dataZoom']).backgroundColor,
          dataBackgroundColor: setColorFunction(['dataZoom']).dataBackgroundColor,
          fillerColor: setColorFunction(['dataZoom']).fillerColor,
          handleColor: setColorFunction(['dataZoom']).handleColor,
          textStyle: {
            color: setColorFunction(['dataZoom']).textcolor // 值域文字颜色
          }
        },
        grid: {
          left: 65,
          right: 65,

          bottom: 75,
          top: 12,
          containLabel: false
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: dateArr,
            // data :['2017-09','2017-10','2017-11','2017-12','2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09'],
            splitLine: {
              show: false
            },
            mmboundaryGap: [0, 0],
            axisLabel: {
              color: 'rgba(80,80,80,1)',
              interval: 5, // 间隔长度，可自定义（如果是时间格式，echarts会自动处理）
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: setColorFunction(['chartsColorfont']),
                xxfontWeight: 'bold',
                fontSize: '8'
              }
            },
            axisLine: {
              lineStyle: {
                color: setColorFunction(['chartsLineColor']),
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],

        yAxis: [
          {
            type: 'value',
            // max: maxvalue*1.2,
            splitLine: {
              show: true,
              lineStyle: {
                color: setColorFunction(['chartsLineColor'])
              }
            },
            axisLine: {
              show: false
            },
            // data:[400,800,1200,1600,2000],
            axisLabel: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: setColorFunction(['chartsColorfont']),
                vvfontWeight: 'bold',
                fontSize: '12'
              },
              show: true
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '过去数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                color: setColorFunction(['dataZoom']).dabolcharts
              }
            },
            data: actualVolume
          },
          {
            name: '预测值',
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: setColorFunction(['dataZoom']).chartsnormal,
                  type: 'dashed'
                }
              }
            },
            data: predictionVolume
          },

          {
            name: '未来数据的波动值-低',

            type: 'line',
            smooth: true,
            symbol: 'none',
            stack: '波动',
            z: 200,
            itemStyle: {
              normal: {
                color: setColorFunction(['dataZoom']).dabolcharts,
                lineStyle: {
                  color: setColorFunction(['dataZoom']).dabolcharts,
                  type: 'solid',
                  width: 0
                }
              }
            },
            data: predictionVolumeMin
          },
          {
            name: '未来数据的波动值-高',
            type: 'line',
            smooth: true,
            symbol: 'none',
            stack: '波动',
            z: 1,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  color: setColorFunction(['dataZoom']).dabolcharts
                },
                color: setColorFunction(['dataZoom']).dabolcharts,
                lineStyle: {
                  color: setColorFunction(['dataZoom']).dabolcharts,
                  type: 'solid',
                  width: 0
                }
              }
            },
            data: predictionVolumeMax
          }
        ]
      }
      let myChart = this.$echarts.init(document.getElementById('volumeLineDiv'))
      myChart.setOption(option_forecast, true)
    }
  }
}
</script>

<style scoped lang="scss">
  .chart-wrap{
    span{
      color: #333;
    }
  }
  .mark{
    display: inline-block;
  }
  .line{
    height: 2px;
    width: 20px;
    background-color: #FF9900;
  }
  .dashed{
    height: 0;
    width: 20px;
    border: 2px dashed #930cea;
  }
  .area{
    height: 12px;
    width: 20px;
    background-color: #FF9900;
  }
  .timeDimensionBox_Content {
    margin-top: 20px;
    padding: 0 15px;
    height: 530px;
    width: 100%;
    .cellTitle {
      text-align: start;
      height: 20px;
      font-size: 14px;
      margin-bottom: 15px;
      .first_Box {
        float: right;
        margin-right: 49px;
        .first_box_div1 {
          float: left;
          width: 15px;
          height: 0px;
          border-bottom: 2px solid #ea7e52;
          margin-top: 8px;
          margin-right: 5px;
        }
        .first_box_div2 {
          float: left;
          font-size: 12px;
          margin-top: 2px;
        }
        .first_box_div3 {
          margin-left: 18px;
          float: left;
          width: 15px;
          height: 0px;
          border-bottom: 2px dotted;
          margin-top: 8px;
          margin-right: 5px;
        }
        .first_box_div4 {
          margin: 0 5px 0 18px;
          float: left;
        }
      }
    }
    .cellConter {
      height: 530px;
      width: 100%;
      margin-bottom: 10px;
      border-radius: 3px;
      border: 1px solid rgba(147, 12, 234, 0.5);
      #volumeLineDiv {
        height: 100%;
        margin-top: 2px;
        border: none;
        position: relative;
        padding-bottom: 15px;
      }
    }
    .clearBox {
      clear: both;
    }
  }
  .bodong {
    display: block;
    width: 22px;
    height: 12px;
    margin-top: 5px;
    background-color: rgb(255, 153, 0);
  }
</style>
