<template>
  <div id="wrapper">
    <el-input v-model="filePath"  placeholder="请输入访问文件夹绝对路径"/>
    <el-button @click="inputChange">查找文件</el-button>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column label="文件名" prop="name"/>
      <el-table-column label="处理进度" prop="progress"/>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="analysisFile(scope.row, scope.$index)" type="text" size="small">解析</el-button>
        </template>
      </el-table-column>
    </el-table>
    <chart ref="chart" :volumeBrokenLineBos="volumeBrokenLineBos"/>
  </div>
</template>

<script>
import chart from './chart'
const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')

export default {
  name: 'landing-page',
  components: { chart },
  data () {
    return {
      tableData: [],
      volumeBrokenLineBos: [],
      fileName: '',
      percentage: 0,
      dirPath: '',
      num: 0,
      filePath: '' // 文件路径
    }
  },
  mounted () {},
  methods: {
    inputChange () {
      this.$message('开始查找')
      this.dirPath = path.resolve(__dirname, this.filePath)
      this.$message('当前解析读取文件地址:', this.dirPath)
      this.readDir()
    },
    resolvingData (index) {
      const _this = this
      const filePath = path.resolve(_this.dirPath, _this.fileName)
      const workSheetsFromFile = xlsx.parse(fs.readFileSync(filePath))
      const JSONKey = ['index', 'referenceName', 'datetime', 'actualVolume', 'predictionVolume', 'predictionVolumeMin', 'predictionVolumeMax']
      const finalArr = []
      // 表内容
      const excelSheet = workSheetsFromFile[0].data
      const jsonData = excelSheet.slice(1)
      console.info('当前解析文件的进度', _this.tableData[index]['progress'])
      let progress = _this.tableData[index]['progress']
      jsonData.forEach(lineItem => {
        const arrItem = {}
        lineItem.forEach((item, index) => {
          if (progress < 100) {
            progress += 1
          }
          Object.assign(arrItem, {
            [JSONKey[index]]: item || '-'
          })
        })
        finalArr.push(arrItem)
      })
      _this.$set(_this.tableData[index], 'progress', progress)
      _this.volumeBrokenLineBos = finalArr
    },
    // 读取文件夹中文件名
    readDir () {
      this.tableData = []
      fs.readdir(this.dirPath, (err, files) => {
        if (err) {
          console.log(err)
        } else {
          files.map(item => {
            this.tableData.push({
              name: item,
              progress: 0
            })
          })
        }
      })
    },
    // 开始解析文件
    analysisFile (row, index) {
      console.info('开始解析文件', row, index)
      this.fileName = row.name
      this.$set(this.tableData[index], 'progress', 0)
      this.resolvingData(index)
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
