/**
 * 生成各图表的方法
 */
// 网点经纬度
var geoCoordMap = {
        "孝感市人社局社保大厅1楼":[113.93573439207124,30.927954784200963],
        "云梦县人社局社保大厅1楼":[113.77818589474496,31.004978516712914],
        "大悟县人社局三楼":[114.31029950548893,31.578255248409686],
        "孝南区人社局社保大厅1楼":[114.01614199012896,30.94461670229972],
        "孝昌县人社局社保大厅1楼":[114.03487209445768,31.239758867241427],
        "安陆县人社局社保大厅1楼":[113.63338728418579,31.304354863066973],
        "汉川县人社局社保大厅1楼":[113.68167835943063,30.622039213975643]       
};

var option;
var geoCoordData;

var convertData = function (data) {
    var res = [];            
    // console.log(geoCoordData);
    for (var i = 0; i < data.length; i++) {                
        //var geoCoord = geoCoordData[data[i].name];                  
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: '网点名称：'+data[i].name,                
                value: geoCoord.concat(data[i].value),
                tooltip:{
                    trigger:'item',
                    formatter:'网点名称：'+data[i].name+'<br/>网点地址：'+data[i].address
                             +'<br/>终端数量：'+data[i].value                             //对该点进行个性化设置
                }
            });
        }
    }
    return res;
};

// 业务量top10
function getChart1(data){
    var timeLineOptions = [];
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++) {        
        var categoryData = [];
        var barData = [];                
        // var dataItem = data[years[i]];        
        var dataItem = data[i].sort(function(a,b){
            return a.value - b.value;
        });
        
        for(var j=dataItem.length-1;j>=0;j--){   //获取某一年的网点所对应的终端数，年份应该升序排好序                                             
            categoryData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].name
            });
            barData.push({
                textStyle: {
                    fontSize: 10,
                    color: '#fff'
                },
                value:dataItem[j].value
            });                       
        }                            
        timeLineOptions.push({  
            xAxis:{
                data:categoryData
            },                                   
            series :[{       
                label:{
                    normal:{
                        show:true,
                        position:'top',
                        textStyle:{
                            color:'#ADFF2F',
                            fontSize:1
                        }                       
                    },
                    emphasis:{
                        show:true,
                        position:'top',
                        textStyle:{
                            color:'#ADFF2F',
                            fontSize:1
                        }               
                    }
                },      
                data: barData
            }]
        });
    }    
   	
    option = {
        //加入时间轴
        baseOption:{            
            timeline: {
                show:false,                
                data:years
            },      
            grid:{
                top:'15%',
                left:"12%",
                width:'90%',
                height:'60%'
            },
            xAxis:{
                type:'category',                
                axisTick:{
                    show:false
                },
                //设置坐标轴字体颜色和宽度  
                axisLine:{  
                    lineStyle:{  
                        color:'#5F9EA0',  
                        width:2  
                    }  
                },
                axisLabel:{
                    interval:0,
                    rotate:20
                }        
            },           
            yAxis:{
                type:'value',               
                position:'top',           
                splitLine:{
                    show:false
                },
                axisLabel:{
                    show:true
                },
                //设置坐标轴字体颜色和宽度  
                axisLine:{  
                    show:false,
                    lineStyle:{  
                        color:'#fff',  
                        width:2  
                    }  
                },
                axisTick:{
                    show:false
                }                   
            },
            series:[{
                type:'line'
            }]                     
        },  
        options:timeLineOptions
    };    
    return option;
}

// 网点工作状态top10
function getChart2(data){
    var timeLineOptions = [];    
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++) {        
        // var dataItem = data[years[i]];          
        var dataItem = data[i];
        dataItem = dataItem.sort(function(a,b){
            return b.work - a.work;
        });        
        var categoryData = [];
        var barWorkData = [];
        var barNotWorkData = [];
        for(var j=0;j<dataItem.length;j++){
            categoryData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].name
            });      //获取网点名称
            barWorkData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].work
            });       //获取正常工作天数
            barNotWorkData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].notWork
            });    //获取非正常工作天数
        }                
        timeLineOptions.push({           
            xAxis:{
                data:categoryData
            },
            series:[{
                data:barWorkData        
            },{
                data:barNotWorkData
            }
            ]
        });
    }    
    option = {
        baseOption:{
            timeline: {
                show:false,                
                data:years
            },             
            legend:{
                top:'30%',
                left:'0%',
                orient:'vertical',
                itemGap:20,

                textStyle:{
                    color:'#fff',
                    fontSize:14
                },
                data:['正常','异常']
            },
            grid: {                
                top:'20%',
                left:"15%",
                width:'85%',
                height:'55%',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true,
                            formatter: function (params) {
                                return params.value.replace('\n', '');
                            }
                        }
                    }
                }
            },
            xAxis:[{
                type:'category',               
                axisLine: {show: false, lineStyle: {color: ''}},
                axisTick: {show: false, lineStyle: {color: ''}},                
                axisLabel:{
                    interval:0,
                    rotate:20
                }                
            }],
            yAxis: [{
                type: 'value',
                name: '天数',
                position:'top',
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {show:true,margin: 2, textStyle: {color: 'white'}} 
            }],                        
            series:[{
                    name:'正常',
                    type:'bar',
                    stack:'总量',                 //数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。                    
                    // bargap:'20%',       
                    // barMaxWidth:'35',            
                    itemStyle: {
                        "normal": {
                            "color": "rgba(0,191,183,1)",
                            "barBorderRadius": 2,
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#fff"
                                },
                                "position": "insideTop",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    }             
            },{
                    "name": "异常",
                    "type": "bar",
                    "stack": "总量",
                    // barMaxWidth:'35',
                    // bargap:'20%',
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(255,144,128,1)",
                            "barBorderRadius": 2,
                            "label": {
                                "show": true,
                                "position": "top",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    }                
            }]                
        },
        options:timeLineOptions
    };    
    return option;     
}

// 业务量占比
function getChart3(data){
	var timeLineOptions = [];
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++)	{        
        var categoryData = [];
        var barData = [];                
        // var dataItem = data[years[i]];        
        var dataItem = data[i].sort(function(a,b){
        	return b.value - a.value;
        });
       	
        for(var j=0;j<dataItem.length;j++){   
            categoryData.push(dataItem[j].name);
            barData.push(dataItem[j].value);                       
        }                            
        timeLineOptions.push({          	                               
            series :[{                   	               
                label: {
                    normal: {
                        show: true,
                        position:'inside',
                        formatter:function(params){
                            return "Top"+(params.dataIndex+1)+" "+params.percent+'%';
                        }                      
                    }
                },                             
                data: barData
            }]
        });
    }    
   
    option = {
        //加入时间轴
        baseOption:{        	
            timeline: {
            	show:false,                
                data:years
            },      
            grid:{
            	top:'1%',
            	left:'55%',  
            	right:'30%',
            	width:'100%',
            	height:'90%'
            },           
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            
            series: [
                {
                    name:'业务量',
                    type:'pie',
                    center:['50%','60%'],
                    radius: ['50%', '85%'],
                    avoidLabelOverlap: false                    
                }
            ]        
        },  
        options:timeLineOptions
        };    
	return option;
}

// 网点终端数占比
function getChart4(data){
    var timeLineOptions = [];
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++) {        
        var categoryData = [];
        var barData = [];                
        // var dataItem = data[years[i]];        
        var dataItem = data[i].sort(function(a,b){
            return b.value - a.value;
        });
        
        for(var j=0;j<dataItem.length;j++){   //获取某一年的网点所对应的终端数，年份应该升序排好序                                             
            categoryData.push(dataItem[j].name);
            barData.push(dataItem[j].value);                       
        }                            
        timeLineOptions.push({                                             
            series :[{                                     
                label: {
                    normal: {
                        show: true,
                        position:'inside',
                        formatter:function(params){
                            return "Top"+(params.dataIndex+1)+" "+params.percent+'%';
                        }                      
                    }
                },                             
                data: barData
            }]
        });
    }    
   
    option = {
        //加入时间轴
        baseOption:{            
            timeline: {
                show:false,                
                data:years
            },      
            grid:{
                top:'1%',
                left:'55%',  
                right:'30%',
                width:'100%',
                height:'90%'
            },           
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            
            series: [
                {
                    name:'终端数量',
                    type:'pie',
                    center:['50%','65%'],
                    radius: ['50%', '85%'],
                    avoidLabelOverlap: true                    
                }
            ]        
        },  
        options:timeLineOptions
        };    
    return option;
}

// 地图
function getChart5(data){                              //data有年份，网点名称，网点地址，终端数量
    var timeLineOptions = [];
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++)	{        
        var categoryData = [];
        var barData = [];                
        // var dataItem = data[years[i]];        
        var dataItem = data[i];
        geoCoordData = [];
        
        for(var j=dataItem.length-1;j>=0;j--){   //获取某一年的网点所对应的终端数，年份应该升序排好序        
            var name = dataItem[j].address;                               
            categoryData.push(j+1+": "+dataItem[j].name);
            barData.push(dataItem[j].value);                       
        }                            
        timeLineOptions.push({                                     
            series :[{
                id:'map',
                data: convertData(dataItem)
            }]
        });
    }    
   
    option = {
        //加入时间轴
        baseOption:{
            timeline: {
            	show:true,
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: false,
                playInterval: 3000,     
                right:'0%',
                bottom:'5%',                
                height:'90%',
                width:'10%',
                label: {
                    position:'left',
                    normal: {
                        textStyle: {
                            color: '#EEE8AA',
                            fontSize:20                        
                        }                    
                    },
                    emphasis: {
                        textStyle: {
                            color: "blue"
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#fff'
                },
                checkpointStyle: {
                    color: '#fff',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#fff',
                        borderColor: '#fff'
                    },
                    emphasis: {
                        color: 'red',
                        borderColor: 'red'
                    }
                },
                data:years
            },                                                                       
            geo: {
                map: 'xiaogan',
                top:'15%',                    
                left:'30%',
                center: [114.11,31.031219],
                roam: false,
                zoom: 1.2,
                animation: true,
                animationDuration: 2000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 2000,
                animationEasingUpdate: 'cubicInOut',
                label: {
                    normal:{
                        show:true,                        
                        textStyle:{
                            color:'#98FB98',
                            fontSize:14
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle:{
                            color:'#98FB98',
                            fontSize:14
                        }
                    }
                },                        
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#87CEEB'
                    },
                    emphasis: {
                        areaColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#87CEEB'
                    }
                }
            },
            tooltip : {
                trigger: 'item'
            },            
            series : [               
                {
                    id:'map',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',                    
                    symbolSize: function (val) {
                        return Math.max(val[2] * 4, 12);             
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,                    
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false              //显示地点名称
                        }
                    },                    
                    itemStyle: {
                        normal: {
                            // color: 'red',                    
                            // shadowColor: 'red'
                            color: '#7FFF00',
                            shadowBlur: 10,
                            shadowColor: '#7FFF00'
                        },
                        emphasis:{
                            color: '#7FFF00',
                            shadowColor: '#7FFF00'
                        }
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    zlevel: 1
                }
            ]
        },  
        options:timeLineOptions
        };    
	return option;
}

// 终端业务量top10
function getChart6(data){
    var timeLineOptions = [];
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++) {        
        var categoryData = [];
        var lineData = [];                
        // var dataItem = data[years[i]];        
        var dataItem = data[i].sort(function(a,b){
            return a.value - b.value;
        });
        
        for(var j=dataItem.length-1;j>=0;j--){  
            categoryData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].name
            });
            // lineData.push(dataItem[j].value);
            lineData.push({
                textStyle: {
                    fontSize: 10,
                    color: '#fff'
                },
                value:dataItem[j].value
            });                       
        }                            
        timeLineOptions.push({  
            xAxis:{
                data:categoryData
            },                                   
            series: [{
                name: '数量',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 10,
                label:{
                    normal:{
                        show:true,
                        position:'top',
                        textStyle:{
                            color:' #ADFF2F',
                            fontSize:1
                        }                       
                    },
                    emphasis:{
                        show:true,
                        position:'top',
                        textStyle:{
                            color:' #ADFF2F',
                            fontSize:1
                        }               
                    }
                },      
                data: lineData
            },{                
                type: 'bar',
                barGap: '-100%',
                barWidth: 10,                
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: 'rgba(20,200,212,0.5)'},
                                {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                                {offset: 1, color: 'rgba(20,200,212,0)'}
                            ]
                        )
                    }
                },
                z: -12,
                data: lineData
            }]
        });
    }    
    
    option = {
        //加入时间轴
        baseOption:{            
            timeline: {
                show:false,                
                data:years
            },      
            grid:{                
                top:'15%',
                left:"12%",
                width:'90%',
                height:'65%'
            },
            xAxis:{
                type:'category',                
                axisTick:{
                    show:false
                },
                //设置坐标轴字体颜色和宽度  
                axisLine:{  
                    lineStyle:{  
                        color:'#87CEEB',  
                        width:2  
                    }  
                },
                axisLabel:{
                    interval:0,
                    rotate:20
                }        
            },           
            yAxis:{
                type:'value',               
                position:'top',           
                splitLine:{
                    show:false
                },
                axisLabel:{
                    show:true
                },
                //设置坐标轴字体颜色和宽度  
                axisLine:{  
                    show:false,
                    lineStyle:{  
                        color:'#fff',  
                        width:2  
                    }  
                },
                axisTick:{
                    show:false
                }                   
            },            
            tooltip: {
                show:false
            },
            series:[]                     
        },  
        options:timeLineOptions
        };    
    return option;
}

// 终端类型数量top10
function getChart7(data){
    var timeLineOptions = [];
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++) {        
        var categoryData = [];
        var barData = [];                
        var bar2Data = [];
        var dataItem = data[i].sort(function(a,b){
            return b.value - a.value;
        });
        for(var j=dataItem.length-1;j>=0;j--){   //获取某一年的网点所对应的终端数，年份应该升序排好序        
            categoryData.push(dataItem[j].name);
            barData.push(dataItem[j].value);   
            bar2Data.push(dataItem[0].value);
        }                    
                
        timeLineOptions.push({                        
            yAxis:[{               
                data: categoryData
            }],
            series :[{
                id:'barshadow',                
                data:bar2Data                
            },{
                id: 'bar',                                    
                data:barData
            }]
        });
    }    
   
    option = {
        //加入时间轴
        baseOption:{
            timeline: {
                show:false,
                data:years
            },
            grid: {
                top:'15%',
                left:'15%',                
                width: '75%',
                height:'85%'                
            },
            xAxis: [{
                type: 'value',        
                position: 'top',
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {show:false,margin: 2, textStyle: {color: 'black'}}               
            }],
            yAxis: [{
                id:'y1',
                type: 'category',
                axisLine: {show: false, lineStyle: {color: ''}},
                axisTick: {show: false, lineStyle: {color: ''}},
                axisLabel: {interval: 0, textStyle: {color: '#fff'}}                
            },{
                // 辅助 y 轴
                id:'y2',
                type: 'category',
                yAxisIndex:1,
                show: false                
            }],            
            series : [                         
                {
                    id: 'bar',
                    zlevel: 2,
                    type: 'bar',   
                    barWidth: 14,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: '#F08080',
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowBlur: 20,
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#fff"
                                },
                                "position": "right",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    }                                                                             
                },{
                    // 辅助系列
                    id:'barshadow',                                    
                    type: 'bar',
                    silent: true,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            borderColor:'#fff',
                            borderWidth:2,
                            color: '#3ea0be'
                        }
                    },
                    barWidth: 24                   
                }
            ]
        },  
        options:timeLineOptions
    };
    return option;
}

/**
 * 全市社保终端工作状态统计:混搭
 */
function getChart8(data) {
    // var data=res.data;
    // var timeLineOptions = [];
    // var yearlist=[];
    // for(var index in data.yearlist) {
    //     var terminalModellist=data.datamap[data.yearlist[index]];
    //     var categorylist=[],datalist=[];
    //     for(var i = 0; i < terminalModellist.length; i++) {
    //         if(i<10) {
    //             categorylist.push(terminalModellist[i].category);
    //             datalist.push(terminalModellist[i]);
    //         }else break;
    //     }
    var timeLineOptions = [];    
    // 年份        
    // years = data.years;     
    for(var i=0;i<years.length;i++) {        
        // var dataItem = data[years[i]];          
        var dataItem = data[i];
        dataItem = dataItem.sort(function(a,b){
            return b.work - a.work;
        });        
        var categoryData = [];
        var barWorkData = [];
        var barNotWorkData = [];
        for(var j=0;j<dataItem.length;j++){
            categoryData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].name
            });      //获取网点名称
            barWorkData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].work
            });       //获取正常工作天数
            barNotWorkData.push({
                textStyle: {
                    fontSize: 1,
                    color: '#fff'
                },
                value:dataItem[j].notWork
            });    //获取非正常工作天数
        }                               
        timeLineOptions.push({
            legend: [
                {
                    left: 'center',
                    top:'10%',
                    data: ['正常', '异常'],
                }
            ],
            // tooltip : {
            //     trigger: 'axis',
            //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            //     },
            //     // formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}'
            //     formatter: function (params, ticket, callback) {
            //         return  "网点名称："+params[0].data.branch_name +"<br>"
            //             +"终端类型："+params[0].data.device_type+"<br>"
            //             +"终端编号："+params[0].data.category+"<br>"
            //             +params[0].seriesName+"天数:"+params[0].data.value;

            //     }
            // },
            xAxis:[
                {
                type: 'value',
                inverse:true,
                axisLine: {show:false,},
                axisTick: {show:false,},
                position:'top',
                axisLabel: {
                    show:true,
                    textStyle: {color:'#fff',fontSize:12,},
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        // color:'#1F2022',
                        width: 1,
                        // type: 'solid',
                        type: 'dashed'
                    },
                },
            },
                {
                    gridIndex: 1,
                    show:false,
                },
                {
                    gridIndex: 2,
                    type: 'value',
                    axisLine: {show:false,},
                    axisTick: {show:false,},
                    position:'top',
                    axisLabel: {
                        show:true,
                        textStyle: {
                            color:'#fff',
                            fontSize:12,},              },
                    splitLine: {
                        show:true,
                        lineStyle:{
                            // color:'#1F2022',
                            width: 1,
                            type: 'dashed'
                        },
                    },
                },
            ],
            yAxis: [
                    {
                        type: 'category',
                        inverse:true,
                        position:'right',
                        // axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:false,
                            margin:8,
                            textStyle: {
                                color:'#ffffff',fontSize: 12,
                            },

                        },
                        data: categoryData,
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        inverse:true,
                        position:'left',
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:true,
                            textStyle: {
                                color:'#ffffff',
                                fontSize: 10,
                                align:'center',
                            },

                        },
                        data:categoryData
                    },
                    {
                        gridIndex: 2,
                        type: 'category',
                        inverse:true,
                        position:'left',
                        // axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:false,
                            textStyle: {
                                color:'#ffffff',fontSize: 12,
                            },

                        },
                        data:categoryData,
                    },
                ],
            grid:[
                {
                show:false,
                left:'4%',
                top:30,
                bottom:30,
                width:'49%',
                height:'89%'
            },
                {
                    show:false,
                    left:'60%',
                    top:50,
                    bottom:30,
                    width:'4%',
                    height:'82%'
                },
                {
                    show:false,
                    right:'4%',
                    top:30,
                    bottom:30,
                    containLabel: true,
                    width:'49%',
                    height:'89%'
                },
            ],
            series: [
                {
                    name:'正常',
                    type: 'bar',
                    barGap: 40,
                    barWidth:15,
                    label: {
                        normal: {
                            show: true
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
                    data: barWorkData,
                },
                {
                    name:'异常',
                    type: 'bar',
                    barGap: 40,
                    barWidth:15,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    label: {
                        normal: {
                            show:true,
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
                    data:barNotWorkData
                },
            ]
        });
    }


    var option = {
        baseOption: {
            timeline: {
                show:false,              
                data:years
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                // formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}元'
            },
            yAxis : [
                {
                    type : 'category',

                    axisTick : {show: false},
                    inverse:true
                    // axisLabel:{
                    //   interval:0,
                    //    rotate:30
                    // }
                }
            ],
            xAxis : [
                {
                    type : 'value',
                    position: 'top',
                    // scale: true,
                    splitLine: {show: false},
                }
            ],
            grid: {
                left: '2%',
                right: '7%',
                // width:'60%',
                containLabel: true
            },
            calculable: true,
            series: [
                {
                    type: 'bar'
                }
            ]
        },
        options: timeLineOptions
    };

    return option;
}


// function getChart8(data){
    
//     var timeLineOptions = [];
//     // 年份        
//     // years = data.years;     
//     // for(var i=0;i<years.length;i++) {        
//     //     // var dataItem = data[years[i]];          
//     //     var dataItem = data[i];
//     //     dataItem = dataItem.sort(function(a,b){
//     //         return b.work - a.work;
//     //     });        
//     //     var categoryData = [];
//     //     var barWorkData = [];
//     //     var barNotWorkData = [];
//     //     for(var j=0;j<dataItem.length;j++){
//     //         categoryData.push({
//     //             textStyle: {
//     //                 fontSize: 1,
//     //                 color: '#fff'
//     //             },
//     //             value:dataItem[j].name
//     //         });      //获取网点名称
//     //         barWorkData.push({
//     //             textStyle: {
//     //                 fontSize: 1,
//     //                 color: '#fff'
//     //             },
//     //             value:dataItem[j].work
//     //         });       //获取正常工作天数
//     //         barNotWorkData.push({
//     //             textStyle: {
//     //                 fontSize: 1,
//     //                 color: '#fff'
//     //             },
//     //             value:dataItem[j].notWork
//     //         });    //获取非正常工作天数
//     //     }                
//     //     timeLineOptions.push({                       
//     //         series:{
//     //             data:getData()
//     //         }
//     //     });
//     // }    
    
//     function data(){
//         var d = [];
//         for (var i = 0; i < 10; i++) {
//             d.push({name:i+'~'+(i+1),value:Math.random()*100});
//         }
//         d = d.sort(function(a,b){
//             return b.value - a.value;
//         })
//         return d;
//     }

//     option = {
//         tooltip: {
//             trigger: 'item',
//             position: ['48.5%', '49.2%'],
//             backgroundColor: 'rgba(50,50,50,0)',
//             textStyle : {
//                 color: 'yellow',
//                 fontWeight: 'bold'
//             },
//             formatter: "{d}%"
//         },
//         series : [
//             {
//                 name: '上网时间',
//                 type: 'pie',
//                 radius : ['5%', '70%'],
//                 roseType: 'area',
//                 color:['#3fa7dc'],
//                 data:data(),
//                 labelLine: {
//                     normal: {
//                         show: false
//                     }
//                 },
//                 label: {
//                     normal: {
//                         show: false
//                     }
//                 },
//                 itemStyle: {
//                     normal: {
//                         shadowBlur: 10,
//                         shadowOffsetX: 0,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     },
//                     emphasis: {
//                         shadowBlur: 10,
//                         shadowOffsetX: 0,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     }
//                 }
//             },
//             {
//                 name: '',
//                 type: 'gauge',
//                 min: 1,
//                 max: 10,
//                 startAngle: 90,
//                 endAngle: 449.9,
//                 radius: '82%',
//                 splitNumber: 10,
//                 clockwise: false,
//                 animation: false,
//                 detail: {
//                     formatter: '{value}',
//                     textStyle: {
//                         color: '#63869e'
//                     }
//                 },
//                 detail:{
//                     show: false
//                 },
//                 axisTick: {
//                     show: false
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         color: [
//                             [0.25, '#63869e'],
//                             [0.75, '#ffffff'],
//                             [1, '#63869e']
//                         ],
//                         width: '40%',
//                         shadowColor: '#0d4b81', //默认透明
//                         shadowBlur: 40,
//                         opacity: 1
//                     }
//                 },
//                 splitLine: {
//                     length: 5,
//                     lineStyle: {
//                         color: '#ffffff',
//                         width: 2
//                     }
//                 },
//                 axisLabel: {
//                     formatter: function(v){
//                         return v?v:'';
//                     },
//                     textStyle: {
//                         color: "red",
//                         fontWeight: 700
//                     }
//                 },
//                 itemStyle: {
//                     normal: {
//                         color: 'green',
//                         width: 2
//                     }
//                 }
//             },
//             {
//                 name: '',
//                 type: 'gauge',
//                 min: 1,
//                 max: 10,
//                 startAngle: 90,
//                 endAngle: 449.9,
//                 radius: '72%',
//                 splitNumber: 10,
//                 clockwise: false,
//                 animation: false,
//                 detail: {
//                     formatter: '{value}',
//                     textStyle: {
//                         color: '#63869e'
//                     }
//                 },
//                 detail:{
//                     show: false
//                 },
//                 axisTick: {
//                     show: false
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         color: [
//                             [1, '#E8E8E8']
//                         ],
//                         width: '10%',
//                         opacity:0.8
//                     }
//                 },
//                 splitLine: {
//                     show:true,
//                     length: '92%',
//                     lineStyle: {
//                         color: 'grey',
//                         width: '1'
//                     }
//                 },
//                 axisLabel: {
//                     show:false,
//                     formatter: function(v){
//                         return v?v:'';
//                     },
//                     textStyle: {
//                         color: "#fb5310",
//                         fontWeight: 700
//                     }
//                 },
//                 itemStyle: {
//                     normal: {
//                         color: 'green',
//                         width: 2,
//                         borderWidth: 3,
//                     }
//                 }
//             }
//         ]
//     };
//     return option;
// }