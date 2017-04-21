function handleCharts(data) {

    var subchartwidth=div.offsetWidth*0.251;
    var subchartdivheight=div.offsetHeight*0.32;
    var piePatternSrc = 'images/border.png'

    var piePatternImg = new Image();
    piePatternImg.src = piePatternSrc;
    piePatternImg.height=subchartdivheight;
    piePatternImg.width=subchartwidth;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(piePatternImg, 0, 0, subchartwidth, subchartdivheight);

    var options = [];
    var baseOption = {};
    for (var index = 0; index < data.yearList.length; index++) {

        i = data.yearList[index];
        var cardTypeshort=[];
        var agePie=[];
        var detailPie=[];
        var a=0;
        var b=0;
        var c=0;
        var d=0;
        for(var t=0;t<data.yearMap[i].ageTypeName.length;t++){
            if(data.yearMap[i].ageTypeName[t]=="18岁以下"){
                a=data.yearMap[i].ageTypeData[t];
            }else if(data.yearMap[i].ageTypeName[t]=='19岁--40岁'){
                b=data.yearMap[i].ageTypeData[t];
            }else if(data.yearMap[i].ageTypeName[t]=='41岁--65岁'){
                c=data.yearMap[i].ageTypeData[t];
            }else if(data.yearMap[i].ageTypeName[t]=='66岁以上'){
                d=data.yearMap[i].ageTypeData[t];
            }
        }
        var max=Math.max(a,b,c,d);
        var maxname;
        if(max==a){
            maxname='18岁以下';
        }else if(max==b){
            maxname='19岁--40岁';
        }else if(max==c){
            maxname='41岁--65岁';
        }else if(max==d){
            maxname='66岁以上';
        }
        for(var t=0;t<data.yearMap[i].cardTypeName.length;t++){
            cardTypeshort.push(data.yearMap[i].cardTypeName[t].substr(0,2));
        }
        for(var t=0;t<data.yearMap[i].ageTypeName.length;t++){
            agePie.push({
                name:data.yearMap[i].ageTypeName[t],
                value:data.yearMap[i].ageTypeData[t]
            });
        }
        for(var t=0;t<40;t++){
            detailPie.push({
                name:data.yearMap[i].detailTypeName[t],
                value:data.yearMap[i].detailTypeData[t]
            })
        }
        var yearOption = {
            textStyle: {
                // color: 'rgba(248, 188, 56,1)',
                fontSize: '13',
                // fontStyle:'oblique',
                fontWeight:'bold'

            },
            color: ['#1790CF','#1C7099',  '#1BB2D8', '#99D2DD', '#88B0BB', '#038CC4','#1E90FF','#00688B', '#45a7ca', '#98d5ef','#507B90'],
            title: [
                {
                    text: i + "年",
                    textStyle: {
                        color: 'rgba(255, 255, 255,0.8)',
                        fontSize: '35'
                    },
                    x: '62%',
                    y: '10%'
                },
                {
                    text: '用户常用卡功能分析',
                    textStyle: {
                        color: 'rgba(248, 188, 56,1)',
                        fontSize: '50',
                        fontWeight:'bold'

                    },
                    x: 'center',
                    y: '2%'
                },
                {
                    text: '用卡男女分布变化',
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                    x: 'center',
                    y: '31%'
                },
                {
                    text: "社保卡应用情况比例",
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                    x: '1.5%',
                    y: '2%',
                }, {
                    text: '102项应用情况比例',
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                    x: '2%',
                    y: '35.5%'
                }, {
                    text: '年龄段分布',
                    x: '2%',
                    y: '69%',
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                }, {
                    text: '社保卡应用情况TOP10(人次)',
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                    x2: '2%',
                    y: '2%'
                }, {
                    text: "102项应用情况TOP10(人次)",
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                    x2: '2%',
                    y: '35.5%'
                }, {
                    text: "各年龄段用卡次数情况(人次)",
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                    x2: '2%',
                    y: '69%'
                }, {
                    text: "社保卡应用情况分布",
                    textStyle: {
                        color: 'rgb(248, 188, 56)',
                    },
                    x: '27%',
                    y: '18%'
                },{
                    text: "社保卡应用总次数为：\n\n" +
                    "社保卡应用的男女比例为：\n\n\n社保卡应用最多的类型为：\n\n社保卡使用最多年龄段为：",
                    textStyle: {
                        color: '#FFF',
                    },
                    x: '38.5%',
                    y: '58%'
                },{
                    text: data.total[index]+"人次\n\n" +
                    "男："+data.maleRate[index]+"%\n女："+data.femaleRate[index]+"%\n\n"+
                    data.yearMap[i].detailTypeName[0]+"\n\n"+maxname,
                    textStyle: {
                        color: '#FF3030	',
                    },
                    x: '53%',
                    y: '58%'
                },],
            legend:{
                top:'80%',
                formatter: function (name) {
                    if(name==='男性')return '男';
                    if(name==='女性')return '女';
                    return name;
                },
                textStyle:{
                    color:"white"
                },
                icon:"circle",
                data:['人数','男性','女性']

            },
            grid: [
                {
                    x: '1%',
                    y: '6%',
                    width: '24%',
                    height: '22%',
                    borderWidth: 2,
                    borderColor:
                        'rgba(111, 194, 218, 0.8)',

                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
                {
                    x: '4%',
                    y: '39%',
                    width: '11%',
                    height: '25%',
                    borderWidth: 2,
                    borderColor: 'rgba(111, 194, 218, 0.8)',
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
                {
                    x: '1%',
                    y: '68%',
                    width: '24%',
                    height: '30%',
                    borderWidth: 2,
                    borderColor: 'rgba(111, 194, 218, 0.8)',
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
                {
                    x2: '1.5%',
                    y: '6%',
                    width: '23%',
                    height: '27%',
                    containLabel: true,
                    borderWidth: 2,
                    borderColor: 'rgba(111, 194, 218, 0.8)',
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
                {
                    x2: '3%',
                    y: '39%',
                    width: '22%',
                    height: '27%',
                    containLabel: true,
                    borderWidth: 2,
                    borderColor: 'rgba(111, 194, 218, 0.8)',
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
                {
                    x2: '5%',
                    y: '73%',
                    width: '19%',
                    height: '27%',
                    containLabel: true,
                    borderWidth: 2,
                    borderColor: 'rgba(111, 194, 218, 0.8)',
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
                {
                    x: '38%',
                    y: '40%',
                    width: '25%',
                    height: '17%',
                    containLabel: true,
                    borderWidth: 2,
                    borderColor: 'rgba(111, 194, 218, 0.8)',
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
                {
                    x: '38%',
                    y: '59%',
                    width: '24%',
                    height: '17%',
                    containLabel: true,
                    borderWidth: 2,
                    borderColor: 'rgba(111, 194, 218, 0.8)',
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                },
            ],
            tooltip: {
                trigger: 'item',
            },
            xAxis: [
                {
                    gridIndex: 0,
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    data: cardTypeshort
                },
                {
                    gridIndex: 1,
                    type: 'value',
                    max:"dataMax",
                    inverse: true,
                    scale: true,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    gridIndex: 2,
                    show: false,
                },
                {
                    gridIndex: 3,
                    type: 'value',
                    scale: true,
                    show:false,
                    max:"dataMax"
                },
                {
                    gridIndex: 4,
                    type: 'value',
                    max:"dataMax",
                    scale: true,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }

                },
                {
                    gridIndex: 5,
                    type: 'value',
                    scale: true,
                    max:"dataMax",
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }

                },
                {
                    gridIndex: 6,
                    type: 'category',
                    show:false,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisTick: {
                        show: false
                    },

                    data: data.yearList,
                },
                {
                    gridIndex: 7,
                    show:false,
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisTick: {
                        show: false
                    },

                    data: data.yearList,
                },],
            yAxis: [
                {
                    gridIndex: 0,
                    show:false
                }, {
                    gridIndex: 1,
                    type: 'category',
                    inverse: "true",
                    position: "right",
                    data: data.yearMap[i].detailTypeName.slice(0,10),
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgb(191, 201, 206)",
                        }
                    }
                }, {
                    gridIndex: 2,
                    show: false,
                }, {
                    gridIndex: 3,
                    type: 'category',
                    inverse: "true",
                    data: data.yearMap[i].cardTypeName,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgb(191, 201, 206)",
                        }
                    }
                }, {
                    gridIndex: 4,
                    type: 'category',
                    inverse: "true",
                    data: data.yearMap[i].detailTypeName.slice(0,10),
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgb(191, 201, 206)",
                        }
                    }
                }, {
                    gridIndex: 5,
                    type: 'category',
                    inverse: "true",
                    data: data.yearMap[i].ageTypeName,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgb(191, 201, 206)",
                        }
                    }

                }, {
                    gridIndex: 6,
                    show:false,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                }, {
                    gridIndex: 7,
                    show:false,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                },],
            series: [
                {
                    type: 'bar',
                    name:'用卡比例',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    tooltip:{
                        show:false
                    },
                    animation:false,
                    barWidth:1.4,
                    hoverAnimation:false,
                    data:data.yearMap[i].cardTypeRate,
                    itemStyle:{
                        normal:{
                            color:'#f17a52',
                            opacity:0.6,
                            label:{
                                show:false
                            }
                        }
                    }
                },
                {
                    type: 'line',
                    name:'用卡比例',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    smooth:true,
                    symbolSize:10,
                    animation:false,
                    lineWidth:1.2,
                    hoverAnimation:false,
                    data:data.yearMap[i].cardTypeRate,
                    symbol:'circle',
                    itemStyle:{
                        normal:{
                            color:'#f17a52',
                            shadowBlur: 40,
                            label:{
                                show:true,
                                position:'top',
                                formatter:'{c}%',
                                textStyle:{
                                    color:'#f17a52',

                                }
                            }
                        }
                    },
                    areaStyle:{
                        normal:{
                            color:'#f17a52',
                            opacity:0.08
                        }
                    }

                },
                //仪表盘
                {
                    name: '总参保率',
                    type: 'gauge',
                    min: 0,
                    max: 100,
                    splitNumber: 10,
                    radius: '18.5%',
                    center: ['50%', '47%'],
                    tooltip: {
                        trigger: 'item',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{b}: {c}%'
                    },
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.2, 'lime'],
                                [0.8, '#1e90ff'],
                                [1, '#ff4500']
                            ],
                            width: 3,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: { // 坐标轴小标记
                        textStyle: { // 属性lineStyle控制线条样式
                            fontWeight: 'normal',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        // length :13,        // 属性length控制线长
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: { // 分隔线
                        length: 15, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            width: 1,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: { // 分隔线
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        width: '6%',
                        length: '50%'
                    },
                    title: {
                        offsetCenter: [0, '95%'],
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail: {
                        borderColor: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        offsetCenter: [0, '55%'], // x, y，单位px
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            fontSize: 15,
                        },
                        formatter: "{value}%",
                    },
                    data: [{
                        value: data.maleRate[index],
                        name: '男/女占比'
                    }]
                },
                {
                    name: '男参保率',
                    type: 'gauge',
                    center: ['42.5%', '47%'], // 默认全局居中
                    radius: '15%',
                    min: 0,
                    max: data.total[index],
                    endAngle: 45,
                    splitNumber: 1,
                    tooltip: {
                        // show:false,
                        trigger: 'item',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{b}: {c}%'
                    },
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.29, 'lime'],
                                [0.86, '#1e90ff'],
                                [1, '#ff4500']
                            ],
                            width: 2,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: { // 坐标轴小标记
                        textStyle: { // 属性lineStyle控制线条样式
                            fontWeight: 'normal',
                            // color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        // length :12,        // 属性length控制线长
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: { // 分隔线
                        length: 10, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            // width:3,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: '6%',
                        length: '50%',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5
                    },
                    title: {
                        offsetCenter: [0, '95%'], // x, y，单位px
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail: {
                        borderColor: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        width: 80,
                        height: 30,
                        offsetCenter: [0, '55%'], // x, y，单位px
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            // fontWeight: 'bolder',
                            color: '#fff',
                            fontSize: '15'

                        },
                        formatter: "{value}次",
                    },
                    data: [{
                        value: data.male[index],
                        name: '男'
                    }]
                },
                {
                    name: '女参保率',
                    type: 'gauge',
                    center: ['57.5%', '47%'], // 默认全局居中
                    radius: '15%',
                    min: 0,
                    max: data.total[index],
                    startAngle: 135,
                    splitNumber: 1,
                    tooltip: {
                        // show:false,
                        trigger: 'item',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{b}: {c}%'
                    },
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.29, 'lime'],
                                [0.86, '#1e90ff'],
                                [1, '#ff4500']
                            ],
                            width: 2,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: { // 坐标轴小标记
                        textStyle: { // 属性lineStyle控制线条样式
                            fontWeight: 'normal',
                            // color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        // length :12,        // 属性length控制线长
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: { // 分隔线
                        length: 10, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            // width:3,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: '6%',
                        length: '50%',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5
                    },
                    title: {
                        offsetCenter: [0, '95%'], // x, y，单位px
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail: {
                        borderColor: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        width: 80,
                        height: 30,
                        offsetCenter: [0, '55%'], // x, y，单位px
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            fontSize: '15'

                        },
                        formatter: "{value}次",
                    },
                    data: [{
                        value: data.female[index],
                        name: '女'
                    }]
                },
                //年龄段分布饼图
                {
                    center: ['13%', '84%'],
                    name: '年龄段分布',
                    type: 'pie',
                    radius: ['5%', '19.5%'],
                    minAngle: 90,
                    roseType: "radius",
                    data: agePie,
                    tooltip: {
                        // show:false,
                        trigger: 'item',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{b}: {c}人({d}%)'
                    },
                    label: {
                        normal: {
                            // show: false,
                            // position: 'center',
                            formatter: '{b}\n{d}%',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                // fontSize: '20',
                                fontWeight: 'bold'
                            },
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            formatter: '{b}\n{c}人\n{d}%',
                        }
                    },
                    labelLine: {
                        normal: {
                            // show: false,
                            // position: 'center',
                            length:5,
                            length2:7
                        }
                    }
                },

                //top10
                {
                    xAxisIndex: 3,
                    yAxisIndex: 3,
                    // 辅助系列
                    name: 'TOP1',
                    type: 'bar',
                    silent: true,
                    barGap: '-85%',
                    barCategoryGap: '10%',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: 'rgba(0,0,0, .0)',
                            borderWidth: 1,
                            borderColor: "#ddd",
                        }
                    },
                    barWidth: '60%',
                    data: data.yearMap[i].cardTypeData.map(function (d) {
                        return data.yearMap[i].cardTypeData[0]
                    }),
                },
                {
                    xAxisIndex: 3,
                    yAxisIndex: 3,
                    name: '社保卡应用情况',
                    type: 'bar',
                    barWidth: '55%',
                    data: data.yearMap[i].cardTypeData,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: 'rgb(111, 194, 218)',
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowBlur: 20
                        }
                    },
                    label: {
                        normal: {
                            // show: true,
                            // position: 'right',
                            textStyle: {
                                color: '#3398DB',
                                // 		fontSize: 10
                            }
                        },
                        emphasis: {
                            // show: true,
                            // position: 'right',
                            textStyle: {
                                color: '#3398DB',
                                fontSize: 30
                            }
                        }
                    }
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    name: '102项比例',
                    type: 'bar',
                    barWidth: '55%',
                    data: data.yearMap[i].detailTypeRate.slice(0,10),
                    label: {
                        normal: {
                            show:true,
                            position: 'left',
                            formatter: '{c}%',
                        },
                        emphasis: {
                            show:true,
                            position:'left',
                            offset:[0,0],
                            textStyle: {color: '#fff',fontSize: 14,},
                        },
                    },
                    itemStyle: {
                        normal: {
                            color:'#659F83',
                        },
                        emphasis: {
                            color:'#08C7AE',
                        },
                    },
                },
                {
                    xAxisIndex: 4,
                    yAxisIndex: 4,
                    name: '102项数量',
                    type: 'bar',
                    barWidth: '55%',
                    data: data.yearMap[i].detailTypeData.slice(0,10),
                    label: {
                        normal: {
                            show:true,
                            position: 'right',
                        },
                        emphasis: {
                            show:true,
                            position:'right',
                            offset:[0,0],
                            textStyle: {color: '#fff',fontSize: 14,},
                        },
                    },
                    itemStyle: {
                        normal: {
                            color:'#F68989',
                        },
                        emphasis: {
                            color:'#F94646',
                        },
                    },
                },
                // {
                //     xAxisIndex: 5,
                //     yAxisIndex: 5,
                //     // 辅助系列
                //     name: 'TOP1',
                //     type: 'bar',
                //     silent: true,
                //     barGap: '-85%',
                //     barCategoryGap: '10%',
                //     itemStyle: {
                //         normal: {
                //             barBorderRadius: 20,
                //             color: 'rgba(0,0,0, .0)',
                //             borderWidth: 1,
                //             borderColor: "#ddd",
                //         }
                //     },
                //     barWidth: '60%',
                //     data: data.yearMap[i].ageTypeData.map(function (d) {
                //         return data.yearMap[i].ageTypeData[0];
                //     }),
                // },
                {
                    xAxisIndex: 5,
                    yAxisIndex: 5,
                    name: '年龄段分别',
                    type: 'line',
                    barWidth: '55%',
                    data: data.yearMap[i].ageTypeData,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: 'rgb(111, 194, 218)',
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowBlur: 20
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#EE8262',
                                // 		fontSize: 10
                            }
                        }
                    }
                },

                //参保人数变化
                // {
                //     name: '人数',
                //     type: 'line',
                //     xAxisIndex: 6,
                //     yAxisIndex: 6,
                //     lineStyle: {
                //         normal: {
                //             // color:'rgba(65,105,225,1)',
                //             // width: 2,
                //             shadowColor: 'rgba(112, 155, 233, 0.5)',
                //             shadowBlur: 4,
                //             shadowOffsetY: 4
                //         }
                //     },
                //     areaStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                //                 offset: 0,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 0.2,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 1,
                //                 color: 'rgba(65,105,225, 0.4)'
                //             }])
                //         }
                //     },
                //     smooth: true,
                //     data: data.yearMap[i].yearTotalData
                // },
                // {
                //     name: '男性',
                //     type: 'line',
                //     xAxisIndex: 6,
                //     yAxisIndex: 6,
                //     lineStyle: {
                //         normal: {
                //             // width: 2,
                //             // color:'rgba(173,216,230,1)',
                //             shadowColor: 'rgba(112, 155, 233, 0.5)',
                //             shadowBlur: 4,
                //             shadowOffsetY: 4
                //         }
                //     },
                //     areaStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                //                 offset: 0,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 0.2,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 1,
                //                 color: 'rgba(112, 155, 233, 0.4)'
                //             }])
                //         }
                //     },
                //     smooth: true,
                //     data: data.yearMap[i].yearMaleData
                // },
                // {
                //     name: '女性',
                //     type: 'line',
                //     xAxisIndex: 6,
                //     yAxisIndex: 6,
                //     lineStyle: {
                //         normal: {
                //             // width: 2,
                //             // color:'rgba(0,191,250,1)',
                //             shadowColor: 'rgba(112, 155, 233, 0.5)',
                //             shadowBlur: 4,
                //             shadowOffsetY: 4
                //         }
                //     },
                //     areaStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                //                 offset: 0,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 0.2,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 1,
                //                 color: 'rgba(112, 155, 233, 0.4)'
                //             }])
                //         }
                //     },
                //     smooth: true,
                //     data: data.yearMap[i].yearFemaleData
                // },
                // {
                //     name: '人数',
                //     type: 'bar',
                //     xAxisIndex: 7,
                //     yAxisIndex: 7,
                //
                //     lineStyle: {
                //         normal: {
                //             // width: 2,
                //             shadowColor: 'rgba(112, 155, 233, 0.5)',
                //             shadowBlur: 4,
                //             shadowOffsetY: 4
                //         }
                //     },
                //     areaStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                //                 offset: 0,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 0.2,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 1,
                //                 color: 'rgba(112, 155, 233, 0.4)'
                //             }])
                //         }
                //     },
                //     smooth: true,
                //     data: data.total
                // },
                // {
                //     name: '男性',
                //     type: 'bar',
                //     xAxisIndex: 7,
                //     yAxisIndex: 7,
                //     lineStyle: {
                //         normal: {
                //             // width: 2,
                //             shadowColor: 'rgba(112, 155, 233, 0.5)',
                //             shadowBlur: 4,
                //             shadowOffsetY: 4
                //         }
                //     },
                //     areaStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                //                 offset: 0,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 0.2,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 1,
                //                 color: 'rgba(112, 155, 233, 0.4)'
                //             }])
                //         }
                //     },
                //     smooth: true,
                //     data: data.male
                // },
                // {
                //     name: '女性',
                //     type: 'bar',
                //     xAxisIndex: 7,
                //     yAxisIndex: 7,
                //     lineStyle: {
                //         normal: {
                //             // width: 2,
                //             shadowColor: 'rgba(112, 155, 233, 0.5)',
                //             shadowBlur: 4,
                //             shadowOffsetY: 4
                //         }
                //     },
                //     areaStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                //                 offset: 0,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 0.2,
                //                 color: 'transparent'
                //             }, {
                //                 offset: 1,
                //                 color: 'rgba(112, 155, 233, 0.4)'
                //             }])
                //         }
                //     },
                //     smooth: true,
                //     data: data.female
                // },
                {
                    name: '102项比例饼图',
                    type: 'pie',
                    center: ['50%', '56%'],
                    radius: ['58%', '67%'],
                    avoidLabelOverlap: false,
                    tooltip: {
                        // show:false,
                        trigger: 'item',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{b}: {c}人({d}%)'
                    },
                    label: {
                        normal: {
                            formatter: function (params) {
                                if(params.name.length>3){
                                    return params.name.substr(0,3)+"…\n"+params.percent+"%";
                                }else
                                    return params.name+"\n"+params.percent+"%";
                            },
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                            length:12,
                            length2:4

                        }
                    },
                    data: detailPie
                }]
        };
        options.push(yearOption);
        if (index === 0)baseOption = yearOption;
    }

    baseOption.timeline = {
        axisType: 'category',
        data: data.yearList.map(function (v) {
            return v + '年'
        }),

        // orient: 'vertical',
        autoPlay: true,
        // inverse: true,
        playInterval: 5000,
        left: 'center',
        // right: 5,
        top: '92%',
        // bottom: 20,
        width: '40%',
        // height: null,
        label: {
            normal: {
                textStyle: {
                    color: '#ddd'
                }
            },
            emphasis: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        // symbol: 'circle',
        lineStyle: {
            color: '#555'
        },
        itemStyle: {
            normal: {
                color: '#bbb',
                borderColor: '#777',
                borderWidth: 3,
                opacity: '0.7'
            }
        },
        checkpointStyle: {
            color: '#bbb',
            borderColor: '#777',
            borderWidth: 3
        },
        controlStyle: {
            // showNextBtn: false,
            // showPrevBtn: false,
            normal: {
                color: '#666',
                borderColor: '#666'
            },
            emphasis: {
                color: '#aaa',
                borderColor: '#aaa'
            }
        },


    };
    option =
    {
        baseOption: baseOption,
        options: options

    }

    return option;
}