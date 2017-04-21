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
var years = [];
var geoCoordData;
var npOptions = [];    

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

var convertData2 = function(data){
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];        
        if (geoCoord) {
            res.push({
                name: '网点名称：'+data[i].name,                
                value: geoCoord.concat(data[i].work),
                tooltip:{
                    trigger:'item',
                    formatter:'网点名称：'+data[i].name+'<br/>网点地址：'+data[i].address
                             +'<br/>正常工作天数：'+data[i].work                             //对该点进行个性化设置
                             +'<br/>异常工作天数：'+data[i].notWork
                }
            });
        }
    }
    return res;
}

 /**
 * 渲染各图表
 * 
 * @returns
 */
function showChart1(res) {
    myChart = echarts.init(document.getElementById('chartMain'));
    option = getMap(res); // 获取option
    myChart.setOption(option);
}

function showChart2(res) {
    myChart = echarts.init(document.getElementById('chartMain'));
    option = getBar(res); // 获取option
    myChart.setOption(option);
}

function showChart3(res) {
    myChart = echarts.init(document.getElementById('chartMain'));
    option = getLine(res); // 获取option
    myChart.setOption(option);
}

// 地址解析，返回经纬度
function getCoorByAddress(address) {　　    
    var token = "clR7lmWlaguV9WUYKM7OGMbj";     //密钥
    var url = 'http://api.map.baidu.com/geocoder/v2/?output=json&ak='+token+'&address='; //请求URL，返回json
    if(address){
        $.getJSON(url+address+'&callback=?',function(res){
            if(res.status == 0){       //正常获取了数据
                var loc = res.result.location;
                geoCoordData.push({
                    name:address,
                    data:[loc.lng,loc.lat]
                });                            
            }else{
                alert('no place')
            }
        });      
        
    }       
}

function getMap(data){                              //data有年份，网点名称，网点地址，终端数量
    var timeLineOptions = [];
    npOptions = [];
    // 年份        
    years = data.years;     
    for(var i=0;i<years.length;i++)	{        
        var categoryData = [];
        var barData = [];                
        var dataItem = data[years[i]];   
        // 结论框统计信息
        var netpointNum = 0;            //网点数
        var terminalNum = 0;            //终端数    
        var list = [];                  //排行榜
        geoCoordData = [];              
        $.ajaxSettings.async = false;
        
        for(var j=dataItem.length-1;j>=0;j--){   //获取某一年的网点所对应的终端数，年份应该升序排好序        
            var name = dataItem[j].address;            
            getCoorByAddress(dataItem[j].address);            
            categoryData.push(j+1+": "+dataItem[j].name);
            barData.push(dataItem[j].value);                   
            terminalNum += dataItem[j].value;
            list.push({name:dataItem[dataItem.length-j-1].name,value:dataItem[dataItem.length-j-1].value});    
        }  
        npOptions.push({'netpointNum':dataItem.length,'terminalNum':terminalNum,'rank':list})                                  
        timeLineOptions.push({
            title:{
                text:years[i]+'年孝感市社保网点分布'
            },               
            yAxis:{
                data: categoryData
            },
            series :[{
                id:'map',
                data: convertData(dataItem)
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
                axisType: 'category',
                orient: 'horizontal',
                autoPlay: true,
                inverse: false,
                playInterval: 3000,     
                left:'center',
                bottom:'1%',
                width:'50%',
                label: {
                    position:'bottom',
                    normal: {
                        textStyle: {
                            color: '#666'
                        }                    
                    },
                    emphasis: {
                        textStyle: {
                            color: 'red'
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#666'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data:years
            },                            
            title: [
                {                    
                    left: 'center',
                    textStyle: {
                        color: '#000000',
                        fontSize:22
                    }
                },
                {
                    id: 'statistic',
                    text:'网点终端数量Top10',               
                    top:'11%',
                    right:'10%',
                    textStyle: {
                        color: '#000000',
                        fontSize: 15
                    }
                }
            ],
            toolbox: {
                show:false,
                iconStyle: {
                    normal: {
                        borderColor: 'black'
                    },
                    emphasis: {
                        borderColor: 'black'
                    }
                }
            },
            // brush: {
            //     outOfBrush: {
            //         color: '#abc'
            //     },
            //     brushStyle: {
            //         borderWidth: 2,
            //         color: 'rgba(0,0,0,0.2)',
            //         borderColor: 'rgba(0,0,0,0.5)',
            //     },
            //     seriesIndex: [0, 1],
            //     throttleType: 'debounce',
            //     throttleDelay: 300,
            //     geoIndex: 0
            // },
            geo: {
                map: 'xiaogan',
                top:'70%',
                left: '32.8%',
                right: '78%',        
                center: [114.11,31.031219],
                zoom: 3.2,
                animation: true,
                animationDuration: 2000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 2000,
                animationEasingUpdate: 'cubicInOut',
                label: {
                    normal:{
                        show:true
                    },
                    emphasis: {
                        show: true
                    }
                },
                roam: true,
                itemStyle: {                    
                    normal: {
                        //areaColor: '#323c48',
                        borderColor: '#696969',
                        show:true
                    },
                    emphasis: {
                        // areaColor: '#2a333d'
                    }
                }
            },
            tooltip : {
                trigger: 'item'
            },
            grid: {
                top:'20%',
                left:'65%',
                bottom:'12%',
                width: '30%'                
            },
            xAxis: {
                type: 'value',        
                position: 'top',
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {show:true,margin: 2, textStyle: {color: 'black'}}               
            },
            yAxis: {
                type: 'category',
                axisLine: {show: false, lineStyle: {color: ''}},
                axisTick: {show: false, lineStyle: {color: ''}},
                axisLabel: {interval: 0, textStyle: {color: ''}}                
            },
            series : [               
                {
                    id:'map',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',                    
                    symbolSize: function (val) {
                        return Math.max(val[2] * 3, 6);             
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    /*tooltip:{
                        trigger:'item',
                        formatter:'{b}<br/>{c}'
                    },*/
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false              //显示地点名称
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'red',                    
                            shadowColor: 'red'
                        },
                        emphasis:{
                            color:'red',
                            shadowColor:'red'
                        }
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    zlevel: 1
                },
                {
                    id: 'bar',
                    zlevel: 2,
                    type: 'bar',
                    symbol: 'none',                                
                    itemStyle: {
                        "normal": {
                            "color": "red",
                            "barBorderRadius": 4,
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#fff"
                                },
                                "position": "insideRight",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    }                                           
                }
            ]
        },  
        options:timeLineOptions
        };
    setNpConclusion1(0);
    return option;
}

function getBar(data){   
    var timeLineOptions = []; 
    npOptions = [];
    // 年份        
    years = data.years;     
    for(var i=0;i<years.length;i++) {        
        var dataItem = data[years[i]];          
        dataItem = dataItem.sort(function(a,b){
            return a.work - b.work;
        });        
        // 结论框统计信息
        var netpointNum = 0;            //网点数   
        var top1 = [];          //Top1网点信息
        var low1 = [];          //Low1网点信息

        var categoryData = [];
        var barWorkData = [];
        var barNotWorkData = [];
        for(var j=0;j<dataItem.length && j<10;j++){
            categoryData.push(dataItem[j].name);      //获取网点名称
            barWorkData.push(dataItem[j].work);       //获取正常工作天数
            barNotWorkData.push(dataItem[j].notWork);    //获取非正常工作天数
        }                
        console.log(dataItem);
        npOptions.push({"netpointNum":dataItem.length,"top1":{"name":dataItem[dataItem.length-1].name,"value":dataItem[dataItem.length-1].work},
            "low1":{"name":dataItem[0].name,"value":dataItem[0].notWork}});
        timeLineOptions.push({
            title:{
                text:years[i]+"年孝感市社保网点工作状态",                
            },
            yAxis:{
                data:categoryData
            },
            series:[{
                id:'map',
                data: convertData2(dataItem)
            },{
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
                axisType: 'category',
                orient: 'horizontal',
                autoPlay: true,
                inverse: false,
                playInterval: 3000,     
                left:'center',
                bottom:'1%',
                width:'50%',
                label: {
                    position:'bottom',
                    normal: {
                        textStyle: {
                            color: '#666'
                        }                    
                    },
                    emphasis: {
                        textStyle: {
                            color: 'red'
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#666'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data:years
            }, 
            title:{                
                left:'center',
                textStyle: {
                    color: 'black',
                    fontSize: '22'                    
                }                
            },      
            legend:{
                top:'8%',
                left:'68%',
                textStyle:{
                    color:'#90979c'
                },
                data:['正常工作天数','异常工作天数']
            },
            grid: {
                top:'20%',
                left:'65%',
                bottom:'12%',
                width: '30%', 
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
            xAxis: [{
                type: 'value',
                name: '天数',
                position:'top',
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {show:true,margin: 2, textStyle: {color: 'black'}} 
            }],
            yAxis:[{
                type:'category',               
                axisLine: {show: false, lineStyle: {color: ''}},
                axisTick: {show: false, lineStyle: {color: ''}},
                axisLabel: {interval: 0, textStyle: {color: ''}}              
            }],
            tooltip:{
                type:'axis',
                axisPointer: {
                    type: "shadow",
                    textStyle: {
                        color: "black"
                    }
                }
            },
            geo: {
                map: 'xiaogan',
                top:'70%',
                left: '32.8%',
                right: '78%',        
                center: [114.11,31.031219],
                zoom: 3.2,
                animation: true,
                animationDuration: 2000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 2000,
                animationEasingUpdate: 'cubicInOut',
                label: {
                    normal:{
                        show:true
                    },
                    emphasis: {
                        show: true
                    }
                },
                roam: true,
                itemStyle: {                    
                    normal: {
                        //areaColor: '#323c48',
                        borderColor: '#696969',
                        show:false
                    },
                    emphasis: {
                        // areaColor: '#2a333d'
                    }
                }
            },
            series:[{
                    id:'map',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',                    
                    symbolSize: function (val) {
                        return Math.max(val[2] / 30, 8);             
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    // tooltip:{
                    //     trigger:'item',
                    //     formatter:'{b}<br/>{c}'
                    // },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false              //显示地点名称
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'red',                    
                            shadowColor: 'red'
                        },
                        emphasis:{
                            color:'red',
                            shadowColor:'red'
                        }
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    zlevel: 1
                },{
                    name:'正常工作天数',
                    type:'bar',
                    stack:'总量',                 //数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
                    // barMaxWidth:'35',
                    bargap:'10%',
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
                    "name": "异常工作天数",
                    "type": "bar",
                    "stack": "总量",
                    // barMaxWidth:'35',
                    bargap:'10%',
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(255,144,128,1)",
                            "barBorderRadius": 2,
                            "label": {
                                "show": true,
                                "position": "right",
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
    setNpConclusion2(0);
    return option;     
}

function getLine(data){
    var timeLineOptions = [];
    npOptions = [];    
    // 年份        
    years = data.years;     
    for(var i=0;i<years.length;i++){        
        var dataItem = data[years[i]];
        dataItem = dataItem.sort(function(a,b){
            return b.value - a.value;
        });        
        var categoryData = [];
        var operationData = [];
        var addressData = [];
        var tipData = [];

        // 结论框统计信息
        var sum = 0;            //总业务量   
        var average;       //平均业务量
        
        for(var j=0;j<dataItem.length;j++){
            categoryData.push(dataItem[j].name);      //获取网点名称
            addressData.push(dataItem[j].address);      //获取网点地址
            operationData.push(dataItem[j].value); 
            sum += dataItem[j].value;       
        }                        
        average = (sum/dataItem.length).toFixed(0);
        npOptions.push({sum:sum,average:average,top1:dataItem[0],low1:dataItem[dataItem.length-1]});
        timeLineOptions.push({
            title:{
                text:years[i]+"年孝感市社保网点业务量Top10",                
            },
            xAxis:{
                data:categoryData
            },
            tooltip : [{
                    trigger:'axis',                                  
                    formatter: '网点名称：{b0}<br/>业务量：{c0}'
                }                
            ],                    
            series:[{
                id: 'line',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },                  
                data: operationData
            },{                   
                label: {
                    normal: {
                        show: true,
                        position:'outside',
                        formatter:function(params){
                            return "Top"+(params.dataIndex+1)+" "+params.percent+'%';
                        }                      
                    }
                },             
                data:dataItem           
            }
            ]
        });
    }    
    option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'horizontal',
                autoPlay: true,
                inverse: false,
                playInterval: 3000,     
                left:'center',
                bottom:'1%',
                width:'50%',
                label: {
                    position:'bottom',
                    normal: {
                        textStyle: {
                            color: '#666'
                        }                    
                    },
                    emphasis: {
                        textStyle: {
                            color: 'red'
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#666'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data:years
            },
            title:[{                
                left:'left',
                textStyle: {
                    color: 'black',
                    fontSize: '22'                    
                }                
            },{
                id:'pie',
                text: '网点业务量占全市比重',
                left:'61%',                
                top: '7%',
                textStyle: {
                    color: 'black',
                    fontSize:'15'
                }
            }],                            
            calculable : true,
            grid: {
                top: 80,
                bottom: 100
            },
            xAxis: [
                {
                    'type':'category',
                    'axisLabel':{
                        'interval':0,
                        'rotate':10
                    },                    
                    splitLine: {show: false}
                }
            ],
            yAxis: [
                {
                    name:'业务量',
                    type: 'value',                                    
                    //max: 3000                                
                }
            ],
            series: [                
                {id:'line', type: 'line'},
                {
                    id:'pie',                                    
                    type: 'pie',
                    radius : '30%',
                    center: ['70%', '30%'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }                                   
                }
            ]
        },
        options:timeLineOptions
    };
    setNpConclusion3(0);
    return option;        
}

// 设置结论
function setNpConclusion1(index){
    var data=npOptions[index];
    var netpointNum = data.netpointNum;
    var terminalNum = data.terminalNum;
    var rank = data.rank;
    var content='<ul>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>全市网点数：<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="itemlist">'+
        '<div class="itemlist-item">'+
        '<p class="item-top"><span></span></p>'+
        '<p class="item-bottom">'+netpointNum+'个</p>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '<div class="clear"></div>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>全市终端数量共有：<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="itemlist">'+
        '<div class="itemlist-item">'+
        '<p class="item-top"><span></span></p>'+
        '<p class="item-bottom">'+terminalNum+'台</p>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '<div class="clear"></div>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>网点终端数量排行榜<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="content">'+
        '<ul>';
        for(var i=0; i< rank.length;i++)
        {
          content+='<li>' +
           '<div class="label-name">'+(i+1)+'.'+rank[i].name+':</div>' +
           '<div class="counter">'+rank[i].value+'台</div>' +
           '</li>' ;
        }
        content+='</li>'+
        '</ul>'
    $("#conclusion").empty();
    $("#conclusion").append(content);
}

function setNpConclusion2(index){
    var data=npOptions[index];
    var netpointNum = data.netpointNum;
    var top1 = data.top1;
    var low1 = data.low1;
    var content='<ul>'+    
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>全市网点数<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="itemlist">'+
        '<div class="itemlist-item">'+
        '<p class="item-top"><span></span></p>'+
        '<p class="item-bottom">'+netpointNum+'个</p>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>正常工作网点TOP1<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="itemlist">'+
        '<div class="itemlist-item">'+
        '<p class="item-top"><span></span></p>'+
        '<p class="item-bottom">'+top1.value+'天</p>'+
        '</div>'+
        '</div>'+
        '</li>'+      
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>异常工作网点TOP1<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="itemlist">'+
        '<div class="itemlist-item">'+
        '<p class="item-top"><span></span></p>'+
        '<p class="item-bottom">'+low1.value+'天</p>'+
        '</div>'+
        '</div>'+
        '</li>'+      
    $("#conclusion").empty();
    $("#conclusion").append(content);
}

function setNpConclusion3(index){
    var data=npOptions[index];
    var businessSum=data.sum;
    var businessAvg=data.average;
    var top1 = data.top1;
    var low1 = data.low1;
    var content='<ul>'+        
        '<div class="clear"></div>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>全市网点总业务量：<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="itemlist">'+
        '<div class="itemlist-item">'+
        '<p class="item-top"><span></span></p>'+
        '<p class="item-bottom">'+businessSum+'</p>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '<div class="clear"></div>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>网点平均业务量：<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="itemlist">'+
        '<div class="itemlist-item">'+
        '<p class="item-top"><span></span></p>'+
        '<p class="item-bottom">'+businessAvg+'</p>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '<div class="clear"></div>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>最高业务量网点<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="content">'+
        '<ul>'+
        '<li>' +
        '<div class="label-name">'+'名称:'+'</div>' +
        '<div class="counter">'+top1.name+'</div>' +
        '</li>'+
        '<li>' +
        '<div class="label-name">'+'地点:'+'</div>' +
        '<div class="counter">'+top1.address+'</div>' +
        '</li>'+
        '<li>' +
        '<div class="label-name">'+'业务量：'+'</div>' +
        '<div class="counter">'+top1.value+'</div>' +
        '<div class="clear"></div>'+
        '<li class="row">'+
        '<div class="title"><h3><span class="top-left-arrow"></span>最低业务量网点<span class="bottom-right-arrow"></span></h3></div>'+
        '<div class="content">'+
        '<ul>'+
        '<li>' +
        '<div class="label-name">'+'名称:'+'</div>' +
        '<div class="counter">'+low1.name+'</div>' +
        '</li>'+
        '<li>' +
        '<div class="label-name">'+'地点:'+'</div>' +
        '<div class="counter">'+low1.address+'</div>' +
        '</li>'+
        '<li>' +
        '<div class="label-name">'+'业务量：'+'</div>' +
        '<div class="counter">'+low1.value+'</div>';

    content+='</li>'+
        '</ul>'
    $("#conclusion").empty();
    $("#conclusion").append(content);
}
