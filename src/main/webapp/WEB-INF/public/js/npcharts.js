/**
 * 生成各图表的方法
 */
// 网点经纬度
var geoCoordMap = {
        "孝感市人社局社保大厅1楼":[113.587723,30.947669],
        "云梦县人社局社保大厅1楼":[113.748365,31.030219],
        "大悟县人社局三楼":[114.133352,31.567279],
        "孝南区人社局社保大厅1楼":[114.107637,31.031219],
        "孝昌县人社局社保大厅1楼":[114.069469,31.343746],
        "安陆县人社局社保大厅1楼":[113.710178,31.259925],
        "汉川县人社局社保大厅1楼":[113.838694,30.655972]       
};
var geoCoordData;    

var option;
var years = [];

var convertData = function (data) {
    var res = [];
    for(var idx = 0;idx < geoCoordData.length; idx++){
        console.log(geoCoordData[idx]);
    }
    for (var i = 0; i < data.length; i++) {        
        // console.log(geoCoordData);
        // var geoCoord = geoCoordData[i].data;
        // console.log(geoCoord);
        // var temp = geoCoordData.pop();
        // console.log(temp);
        // var geoCoord = temp.data;
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
        console.log(geoCoord);
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

//根据地址查找经纬度
function getCoorByAddress(address) {　　    
    var token = "clR7lmWlaguV9WUYKM7OGMbj";     //密钥
    var url = 'http://api.map.baidu.com/geocoder/v2/?output=json&ak='+token+'&address='; //请求URL，返回json
    if(address){
        $.getJSON(url+address+'&callback=?',function(res){
            if(res.status === 0){       //正常获取了数据
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
    // 年份        
    years = data.years;     
    for(var i=0;i<years.length;i++)	{        
        var categoryData = [];
        var barData = [];                
        var dataItem = data[years[i]];        
        geoCoordData = new Array();        
        for(var j=dataItem.length-1;j>=0;j--){   //获取某一年的网点所对应的终端数，年份应该升序排好序        
            var name = dataItem[j].address;
            categoryData.push(j+1+": "+dataItem[j].name);
            barData.push(dataItem[j].value);                   
            getCoorByAddress(dataItem[j].address);
            console.log(geoCoordData.length);
        }            
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
                        fontSize:20
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
            /*brush: {
                outOfBrush: {
                    color: '#abc'
                },
                brushStyle: {
                    borderWidth: 2,
                    color: 'rgba(0,0,0,0.2)',
                    borderColor: 'rgba(0,0,0,0.5)',
                },
                seriesIndex: [0, 1],
                throttleType: 'debounce',
                throttleDelay: 300,
                geoIndex: 0
            },*/
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
        return option;
}

function getBar(data){    
    var timeLineOptions = [];    
    // 年份        
    years = data.years;     
    for(var i=0;i<years.length;i++) {        
        var dataItem = data[years[i]];          
        dataItem = dataItem.sort(function(a,b){
            return a.work - b.work;
        });        
        var categoryData = [];
        var barWorkData = [];
        var barNotWorkData = [];
        for(var j=0;j<dataItem.length;j++){
            categoryData.push(dataItem[j].name);      //获取网点名称
            barWorkData.push(dataItem[j].work);       //获取正常工作天数
            barNotWorkData.push(dataItem[j].notWork);    //获取非正常工作天数
        }                
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
    return option;     
}

function getLine(data){
    var timeLineOptions = [];
     // 年份        
    years = data.years;     
    for(var i=0;i<years.length;i++){        
        var dataItem = data[years[i]];
        // dataItem = dataItem.sort(function(a,b){
        //     return b.value - a.value;
        // });        
        var categoryData = [];
        var operationData = [];
        for(var j=0;j<dataItem.length;j++){
            categoryData.push(dataItem[j].name);      //获取网点名称
            operationData.push(dataItem[j].value);      //获取业务量
        }                        
        timeLineOptions.push({
            title:{
                text:years[i]+"年孝感市社保网点业务量Top10",                
            },
            xAxis:{
                data:categoryData
            },
            tooltip : [{
                trigger:'axis',                                  
                formatter:function(params){                
                    return '网点名称：'+dataItem[i].name+'<br/>网点地址：'+dataItem[i].name
                            +'<br/>业务量：'+dataItem[i].value;                             //对该点进行个性化设置  
                }
            }],
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
    return option;        
}

function getTotal(data){
    var timeLineOptions = [];
     // 年份        
    years = data.years;     
    for(var i=0;i<years.length;i++){        
        var dataItem = data[years[i]];
        // dataItem = dataItem.sort(function(a,b){
        //     return b.value - a.value;
        // });        
        var categoryData = [];                           //获取网点名称
        var operationData = [];                         //获取业务量
        var barWorkData = [];
        var barNotWorkData = [];
        for(var j=0;j<dataItem.length;j++){
            categoryData.push(dataItem[j].name);     
            operationData.push(dataItem[j].value);      
        }                        
        timeLineOptions.push({
            title:{
                text:years[i]+"年孝感市社保网点分布情况",                
            },
            xAxis:{
                data:categoryData
            },
            tooltip : [{
                trigger:'axis',                                  
                formatter:function(params){                
                    return '网点名称：'+dataItem[i].name+'<br/>网点地址：'+dataItem[i].name
                            +'<br/>业务量：'+dataItem[i].value;                             //对该点进行个性化设置  
                }
            }],
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
    return option;
}