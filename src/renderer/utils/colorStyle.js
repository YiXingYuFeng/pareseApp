let setColorFunction = (key) => {
  let colorstyle = new Map()
  switch (key) {
    case '1':
      colorstyle.set('bkGround', 'background:#fff;') // 页面背景色
      colorstyle.set('fontcoLor', 'color:#000;') // 页面字体颜色
      colorstyle.set('borderColor', 'border-color:#BBBEC4;') // 页面边框颜色
      colorstyle.set('titleColor', 'background: #fff;border:1px solid #BBBEC4;color:#000;') // 头部样式
      colorstyle.set('buttonColor', 'background: #F8F8F9;border:1px solid #A634EF;color:#7909C1;') // 头部标签按钮
      colorstyle.set('uploadColor', 'color:#930cea;') // 导出字体颜色
      colorstyle.set('childColor', 'background:#930cea;color:#fff;') // 左侧模块颜色
      colorstyle.set('elmentBox', 'normal') // element组件色调
      colorstyle.set('chartsColorfont', '#495060') // 折线图字颜色
      colorstyle.set('chartsLineColor', '#DDDEE1') // 折线图线颜色
      colorstyle.set('chartsnormal', 'background:#930cea;') // 折线图常规色
      colorstyle.set('dabolcharts', 'background:#FF9900;') // 折线图特殊色
      colorstyle.set('boxTitle', 'border-color:#fff;') // 页面背景色
      colorstyle.set('Histogramfont', 'color:#fff;') // 柱状图字体颜色
      colorstyle.set('dataZoom', {
        backgroundColor: 'rgba(0,0,0,0.0)',
        dataBackgroundColor: 'rgba(166, 52, 239, 0.6)',
        fillerColor: 'rgba(166, 52, 239, 0.2)',
        handleColor: 'rgba(166, 52, 239, 1)',
        textcolor: '#495060',
        chartsnormal: '#930cea',
        dabolcharts: '#FF9900',
        fontColor: '#000',
        chartsbackground: '#fff',
        nextbackground: '#930cea',
        Dotbackground: '#930cea',
        topline: '#930cea',
        areabackground: '#fff'
      }) // 控制阀颜色集合
      break
    case '2':
      colorstyle.set('bkGround', 'background:#0A2757;') // 页面背景色
      colorstyle.set('fontcoLor', 'color:#fff;') // 页面字体颜色
      colorstyle.set('borderColor', 'border-color:rgba(187, 190, 196, 0.7);') // 页面边框颜色
      colorstyle.set('titleColor', 'background:#081f45;border:none;') // 头部样式
      colorstyle.set('buttonColor', 'background:rgba(245,49,127,0.3);border:1px solid #f5317f;color:#ffffff;') // 头部标签按钮
      colorstyle.set('uploadColor', 'color:#fff;') // 导出字体颜色
      colorstyle.set('childColor', 'background: rgba(147, 12, 234, 0.2);color:#fff;') // 左侧模块颜色
      colorstyle.set('elmentBox', 'darkblue') // element组件色调
      colorstyle.set('chartsColorfont', '#dde') // 折线图字颜色
      colorstyle.set('chartsLineColor', '#bbbbbb') // 折线图线颜色
      colorstyle.set('chartsnormal', 'background:#dde;') // 折线图常规色
      colorstyle.set('dabolcharts', 'background:#EA7E52;') // 折线图特殊色
      colorstyle.set('boxTitle', 'border-color:#930cea;') // 页面背景色
      colorstyle.set('Histogramfont', 'color:#fff;') // 柱状图字体颜色
      colorstyle.set('dataZoom', {
        backgroundColor: 'rgba(0,0,0,0.0)',
        dataBackgroundColor: 'rgba(240,230,240,0.6)',
        fillerColor: 'rgba(255,255,255,0.2)',
        handleColor: '#fff',
        textcolor: '#dde',
        chartsnormal: '#dde',
        dabolcharts: '#EA7E52',
        fontColor: '#fff',
        chartsbackground: '#930cea',
        nextbackground: '#0A2757',
        Dotbackground: '#930cea',
        topline: '#fff',
        areabackground: '#0A2757'
      }) // 控制阀颜色集合
      break
    default:
      colorstyle.set('bkGround', 'background:#fff;') // 页面背景色
      colorstyle.set('fontcoLor', 'color:#000;') // 页面字体颜色
      colorstyle.set('borderColor', 'border-color:#BBBEC4;') // 页面边框颜色
      colorstyle.set('titleColor', 'background: #fff;border:1px solid #BBBEC4;color:#000;') // 头部样式
      colorstyle.set('buttonColor', 'background: #F8F8F9;border:1px solid #A634EF;color:#7909C1;') // 头部标签按钮
      colorstyle.set('uploadColor', 'color:#930cea;') // 导出字体颜色
      colorstyle.set('childColor', 'background:#930cea;color:#fff;') // 左侧模块颜色
      colorstyle.set('elmentBox', 'normal') // element组件色调
      colorstyle.set('chartsColorfont', '#495060') // 折线图字颜色
      colorstyle.set('chartsLineColor', '#DDDEE1') // 折线图线颜色
      colorstyle.set('chartsnormal', 'background:#930cea;') // 折线图常规色
      colorstyle.set('dabolcharts', 'background:#FF9900;') // 折线图特殊色
      colorstyle.set('boxTitle', 'border-color:#fff;') // 页面背景色
      colorstyle.set('Histogramfont', 'color:#fff;') // 柱状图字体颜色
      colorstyle.set('dataZoom', {
        backgroundColor: 'rgba(0,0,0,0.0)',
        dataBackgroundColor: 'rgba(166, 52, 239, 0.6)',
        fillerColor: 'rgba(166, 52, 239, 0.2)',
        handleColor: 'rgba(166, 52, 239, 1)',
        textcolor: '#495060',
        chartsnormal: '#930cea',
        dabolcharts: '#FF9900',
        fontColor: '#000',
        chartsbackground: '#fff',
        nextbackground: '#930cea',
        Dotbackground: '#930cea',
        topline: '#930cea',
        areabackground: '#fff'
      }) // 控制阀颜色集合
      break
  }
  return colorstyle
}
export default function (list) {
  let newRadio = localStorage.getItem('defultRadio')
  let newString
  if (list && list.length > 0) {
    list.forEach(newitem => {
      if (newitem && setColorFunction(newRadio).get(newitem)) {
        if (typeof (newString) === 'string') {
          newString = newString
            ? setColorFunction(newRadio).get(newitem) + newString
            : setColorFunction(newRadio).get(newitem)
        } else {
          newString = setColorFunction(newRadio).get(newitem)
        }
      }
    })
  }
  return newString
}
