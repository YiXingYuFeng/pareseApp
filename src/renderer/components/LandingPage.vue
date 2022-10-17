<template>
  <div id="wrapper">
    <el-form :inline="true" >
      <el-form-item label="文件名称">
        <el-input v-model="fileName" placeholder="请输入内容" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button @click='resolvingData' type="primary">开始解析</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <p>解析进度：</p>
      <el-progress :percentage="percentage"></el-progress>
    </el-row>
    <chart ref="chart" :volumeBrokenLineBos="volumeBrokenLineBos"/>
  </div>
</template>

<script>
import chart from './chart'
export default {
  name: 'landing-page',
  components: { chart },
  data () {
    return {
      tableData: [],
      volumeBrokenLineBos: [],
      fileName: '',
      percentage: 0
    }
  },
  methods: {
    resolvingData () {
      const fs = require('fs')
      const path = require('path')
      const xlsx = require('node-xlsx')
      const uploadDir = path.resolve(__dirname, '../../../', 'excelFile')
      const _this = this

      const filePath = path.resolve(uploadDir, _this.fileName)
      const workSheetsFromFile = xlsx.parse(fs.readFileSync(filePath))
      const JSONKey = ['index', 'referenceName', 'datetime', 'actualVolume', 'predictionVolume', 'predictionVolumeMin', 'predictionVolumeMax']
      const finalArr = []
      // 表内容
      const excelSheet = workSheetsFromFile[0].data
      const jsonData = excelSheet.slice(1)
      jsonData.forEach(lineItem => {
        const arrItem = {}
        lineItem.forEach((item, index) => {
          if (_this.percentage < 100) {
            _this.percentage += 1
          }
          Object.assign(arrItem, {
            [JSONKey[index]]: item || '-'
          })
        })
        finalArr.push(arrItem)
      })
      _this.volumeBrokenLineBos = finalArr
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
