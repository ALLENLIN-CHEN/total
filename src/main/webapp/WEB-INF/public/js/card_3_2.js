/**
 * 用于处理不同类型的图表
 */
function getCharts(data) {
	if(data.type === 'card_3_2_1') {
		return getCard_3_2_1(data);
	}else if(data.type === 'card_3_2_2') {
		return getCard_3_2_2(data);
	}else if(data.type === 'card_3_3') {
		return getCard_3_3(data);
	}
}
/***********************************/

/**
 * 生成各图表的方法
 */
// 以X轴为值轴
function getCard_3_2_1(data) {
    var times = data.yearlist;
    var timeLineOptions = [];
    for(var index in data.model) {
        var piedata = [];
        var axislabel=[];
        var rate=[];
        for(var i=0;i<data.model[index].type.length;i++){
            rate.push((data.model[index].person_num[i]/data.model[index].sum).toFixed(2));
            piedata.push({
                value: data.model[index].person_num[i],
                name: data.model[index].type[i]
            });
            if(data.model[index].type[i].length>4){
                axislabel.push(data.model[index].type[i].substr(0,4)+"\n"+data.model[index].type[i].substr(4,data.model[index].type[i].length));
            }else{
                axislabel.push(data.model[index].type[i]);
            }
        }
        timeLineOptions.push({
            title : [{text: index+'年全市社保卡应用情况分析'},
                {
                text: '最高社保卡应用情况：',
                    backgroundColor:'rgba(255,255,0, 0.5)',
                x: '5%',
                y: '72%'
                },
                {
                    text: '最低社保卡应用情况：',
                    backgroundColor:'rgba(255,255,0, 0.5)',
                    x: '47%',
                    y: '72%'
                },
                {
                    text: axislabel[0],
                    x: '5%',
                    y: '76%'
                },
                {
                    text: axislabel[data.model[index].type.length-1],
                    x: '47%',
                    y: '76%'
                },{
                    text: '数量：\n'+data.model[index].person_num[0],
                    x: '17%',
                    y: '83%'
                },
                {
                    text: '占比：\n'+rate[0]+'%',
                    x: '35%',
                    y: '83%'
                },{
                    text: '数量：\n'+data.model[index].person_num[data.model[index].type.length-1],
                    x: '62%',
                    y: '83%'
                },
                {
                    text: '占比：\n'+rate[data.model[index].type.length-1]+'%',
                    x: '80%',
                    y: '83%'
                },],
            xAxis : [
                {
                    type : 'category',
                    //inverse: true,
                    axisTick : {show: false},
                    data : axislabel
                }
            ],
            series: [
                {
                    data: data.model[index].person_num
                },
                {
                    data: piedata
                }
            ]
        });
    }

    var option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 3000,
                    orient: 'vertical',
                    inverse: true,
                    right: '0.5%',
                    top: "5%",
                    bottom: '5%',
                    width: 60,
                    data: times
                },
                title: [{
                    text: '全市社保卡应用情况分析'
                },{
                    text: '',
                    x:'77%',
                    y:'28%'
                }],
                tooltip: {
                    trigger: 'item',
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            optionToContent: function (opt) {
                                var current_time = opt.timeline[0].currentIndex;

                                //var hospital_num = opt.series[2].data;
                                var person_num = data.model[current_time].person_num;
                                var type=data.model[current_time].type;
                                var sum=data.model[current_time].sum;
                                var alltables = '';
                                alltables += '<div style="overflow-y: auto; height: 600px; float:left;margin-left:50px;">';
                                alltables += '<table border="1" ><tbody>'
                                    +'<caption>全市社保卡应用情况分析</caption>'
                                    +'<tr>'
                                    +'<td>排名</td><td>应用情况</td><td>数量</td><td>比例</td>'
                                    +'</tr>';
                                for(var i=0;i<person_num.length;i++){
                                    alltables+='<tr>'
                                        +'<td>  '+'TOP'+(i+1)+'  </td><td>  '+type[i]+'  </td><td>  '+person_num[i]+'  </td><td>  '+Math.round(1000*person_num[i]/sum)/10+'%  </td>'
                                        +'</tr>';
                                }
                                alltables += '</tbody></table>';
                                alltables += '</div>';

                                return alltables;
                            }
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                grid: [{
                    left: '3%',
                    right: '10%',
                    bottom: '30%',
                    // top: '20%',
                    containLabel: true
                },{
                    show:true,
                    borderColor: '#FF0000',
                    left: '3%',
                    right: '8%',
                    bottom: '1%',
                    top: '71%',
                    containLabel: true
                },],
                xAxis : [
                    {
                        type : 'category',
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        // formatter: '{c}'
                    }
                },

                series : [
                    {
                        name:'柱状图',
                        type:'bar',
                        barWidth: '40%',
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c}次"
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(17, 168,171, 1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(17, 168,171, 0.1)'
                                }]),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        }
                    },
                    {
                        hoverAnimation: false, //设置饼图默认的展开样式
                        radius: [50, 100],
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}: {c}次 ({d}%)"
                        },
                        center: ['70%','30%'],
                        name: 'pie',
                        type: 'pie',
                        selectedMode: 'single',
                        label:{
                            normal:{
                                formatter:'{b}'
                            }
                        }
                    },
                    {
                        type:'pie',
                        center:['20%','87%'],
                        radius: ['15%', '20%'],
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data:[
                            {value:100, name:'最高'}
                        ]
                    },
                    {
                        type:'pie',
                        center:['38%','87%'],
                        radius: ['15%', '20%'],
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data:[
                            {value:100, name:'最高'}
                        ]
                    },
                    {
                        type:'pie',
                        center:['65%','87%'],
                        radius: ['15%', '20%'],
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data:[
                            {value:100, name:'最低'}
                        ]
                    },
                    {
                        type:'pie',
                        center:['83%','87%'],
                        radius: ['15%', '20%'],
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data:[
                            {value:100, name:'最低'}
                        ]
                    }
                ],
            },
        options: timeLineOptions
        }
	return option;
}

function getCard_3_2_2(data) {
    var times = ['2010年','2011年','2012年','2013年','2014年','2015年'];
    // var axis=['TOP1','TOP2','TOP3','TOP4','TOP5','TOP6','TOP7','TOP8','TOP9','TOP10'];
    var timeLineOptions = [];
    for(var index in data.model) {
        var barData=[];
        var axis=[];
        var barRate=[];
        for(var i=0;i<10;i++){
            barData.push(data.model[index].person_num[i]);
            axis.push(data.model[index].type[i]);
            barRate.push(data.model[index].ratelist[i]);
        }
        timeLineOptions.push({
            title : [{text: index+'年102项应用情况分析TOP10'},
                {
                    text: '102项最高应用情况：',
                    backgroundColor:'rgba(0,255,255, 0.5)',
                    x: '5%',
                    y: '62%'
                },
                {
                    text: '102项最低应用情况：',
                    backgroundColor:'rgba(0,255,255, 0.5)',
                    x: '47%',
                    y: '62%'
                },
                {
                    text: data.model[index].type[0],
                    x: '5%',
                    y: '66%'
                },
                {
                    text: data.model[index].type[data.model[index].type.length-1],
                    x: '47%',
                    y: '66%'
                },{
                    text: '数量：\n'+data.model[index].person_num[0]+'次',
                    x: '17%',
                    y: '76%'
                },
                {
                    text: '占比：\n'+data.model[index].ratelist[0]+'%',
                    x: '35%',
                    y: '76%'
                },{
                    text: '数量：\n'+data.model[index].person_num[data.model[index].type.length-1]+'次',
                    x: '62%',
                    y: '76%'
                },
                {
                    text: '占比：\n'+data.model[index].ratelist[data.model[index].type.length-1]+'%',
                    x: '80%',
                    y: '76%'
                },],
            xAxis:
                [
                    {
                        min: Math.min.apply(null,data.model[index].person_num),
                    },
                    {
                    },
                    {
                        min: Math.min.apply(null,barRate)-0.2,
                    },
                ],
            yAxis:
                [
                    {
                        data: axis,
                    },
                    {
                        data:axis.map(function(value){
                            return {
                                value:value,
                                textStyle:{
                                    align:'center',
                                }
                            }
                        }),
                    },
                    {
                        data:axis,
                    },
                ],
            series: [
                {
                    data: barData
                },{
                    data: [0,0,0,0,0,0,0,0,0,0]
                },{
                    data: barRate
                }
            ]
        });
    }

    var option = {
        baseOption: {
            backgroundColor:'#000',
            timeline: {
                show: true,
                axisType: 'category',
                autoPlay:true,
                currentIndex: 0,
                playInterval: 2000,
                label: {
                    normal: {
                        show: true,
                        interval: 'auto',
                    },
                },
                data:times,
            },
            title:[{
                textStyle:{
                    color:'#fff',
                    fontSize:16,
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },{
                textStyle:{
                    color:'#fff',
                },
            },],
            legend:{
                data:['数量','比例'],
                top:4,
                right:'10%',
                textStyle:{
                    color:'#fff',
                },
            },
            tooltip: {
                show:true,
                trigger:'axis',
                axisPointer: {
                    type:'shadow',
                }
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false,
                        optionToContent: function (opt) {
                            var current_time = opt.timeline[0].currentIndex;

                            //var hospital_num = opt.series[2].data;
                            var person_num = data.model[current_time].person_num;
                            var type=data.model[current_time].type;
                            var ratelist=data.model[current_time].ratelist;
                            var alltables = '';
                            alltables += '<div style="overflow-y: auto; height: 450px; float:left;margin-left:50px;">';
                            alltables += '<table border="1" ><tbody>'
                                +'<caption>社保102项应用情况分析</caption>'
                                +'<tr>'
                                +'<td>排名</td><td>应用情况</td><td> 数量 </td><td>比例</td>'
                                +'</tr>';
                            for(var i=0;i<person_num.length;i++){
                                alltables+='<tr>'
                                    +'<td>  '+'TOP'+(i+1)+'  </td><td>  '+type[i]+'  </td><td>  '+person_num[i]+'  </td><td>  '+ratelist[i]/100+'%  </td>'
                                    +'</tr>';
                            }
                            alltables += '</tbody></table>';
                            alltables += '</div>';

                            return alltables;
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            grid:[{
                show:false,
                left:'4%',
                top:60,
                bottom:'40%',
                containLabel: true,
                width:'50%',
            },
                {
                    show:false,
                    left:'50.5%',
                    top:80,
                    bottom:'40%',
                    width:'0%',
                },
                {
                    show:false,
                    right:'4%',
                    top:60,
                    bottom:'40%',
                    containLabel: true,
                    width:'50%',
                },
               {
                   show:true,
                   borderColor: '#3CB371',
                   left: '3%',
                    right: '3%',
                    bottom: '8%',
                    top: '62%',
                    containLabel: true
    },
            ],
            xAxis:[{
                type: 'value',
                inverse:true,
                axisLine: {show:false,},
                axisTick: {show:false,},
                position:'top',
                axisLabel: {
                    show:true,
                    textStyle: {color:'#B2B2B2',fontSize:12,},
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        color:'#1F2022',width: 1,
                        type: 'solid',
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
                        textStyle: {color:'#B2B2B2',fontSize:12,},
                        formatter: '{value}%'
                    },
                    splitLine: {
                        show:true,
                        lineStyle:{
                            color:'#1F2022',width: 1,
                            type: 'solid',
                        },
                    },
                },
            ],
            yAxis:
                [
                    {
                        type: 'category',
                        inverse:true,
                        position:'right',
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:false,
                            margin:8,
                            textStyle: {
                                color:'#9D9EA0',fontSize: 12,
                            },
                        },
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
                                color:'#9D9EA0',fontSize: 12,
                            },
                        },
                    },
                    {
                        gridIndex: 2,
                        type: 'category',
                        inverse:true,
                        position:'left',
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:false,
                            textStyle: {
                                color:'#9D9EA0',fontSize: 12,
                            },

                        },
                    },
                ],
            series:[
                {
                    name:'数量',
                    type: 'bar',
                    barGap: 20,
                    barWidth: 20,
                    label: {
                        normal: {
                            show:true,
                            position: 'left'
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
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                },
                {
                    name:'比例',
                    type: 'bar',
                    barGap: 20,
                    barWidth:20,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    label: {
                        normal: {
                            show:true,
                            position: 'right',
                            formatter: '{c}%',
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
                {
                    type:'pie',
                    center:['20%','80%'],
                    radius: ['15%', '20%'],
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data:[
                        {value:100, name:'最高'}
                    ]
                },
                {
                    type:'pie',
                    center:['38%','80%'],
                    radius: ['15%', '20%'],
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data:[
                        {value:100, name:'最高'}
                    ]
                },
                {
                    type:'pie',
                    center:['65%','80%'],
                    radius: ['15%', '20%'],
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data:[
                        {value:100, name:'最低'}
                    ]
                },
                {
                    type:'pie',
                    center:['83%','80%'],
                    radius: ['15%', '20%'],
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data:[
                        {value:100, name:'最低'}
                    ]
                }
            ]
        },

        options: timeLineOptions,
    };
	return option;
}

function getCard_3_3(data) {
	var timeLineOptions = [];
	var times = ['2010年','2011年','2012年','2013年','2014年','2015年'];
	for(var index in data.model) {
        var pieData=[];
        var a=0;
        var b=0;
        var c=0;
        var d=0;
        var series=[];
        var sum=0;
        var max=0;
        var maxrate=0;
        var maxname;
        var min=0;
        var minrate=0;
        var minname;
        for(var i in data.model[index].age){
            sum+=data.model[index].person_num[i];
            if(data.model[index].age[i]=="18岁以下"){
                a=data.model[index].person_num[i];
            }else if(data.model[index].age[i]=='19岁--40岁'){
                b=data.model[index].person_num[i];
            }else if(data.model[index].age[i]=='41岁--65岁'){
                c=data.model[index].person_num[i];
            }else if(data.model[index].age[i]=='66岁以上'){
                d=data.model[index].person_num[i];
            }
        }
        pieData.push({
            value: a,
            name: "18岁以下"
        },{
            value: b,
            name: "19岁--40岁"
        },{
            value: d,
            name: "66岁以上"
        },{
            value: c,
            name: "41岁--65岁"
        });
        max=Math.max(a,b,c,d);
        min=Math.min(a,b,c,d);
        if(max==a){
            maxname='18岁以下';
        }else if(max==b){
            maxname='19岁--40岁';
        }else if(max==c){
            maxname='41岁--65岁';
        }else if(max==d){
            maxname='66岁以上';
        }
        if(min==a){
            minname='18岁以下';
        }else if(min==b){
            minname='19岁--40岁';
        }else if(min==c){
            minname='41岁--65岁';
        }else if(min==d){
            minname='66岁以上';
        }
        a=(100*a/sum).toFixed(2);
        b=(100*b/sum).toFixed(2);
        c=(100*c/sum).toFixed(2);
        d=(100*d/sum).toFixed(2);
        maxrate=Math.max(a,b,c,d);
        minrate=Math.min(a,b,c,d);
        series.push({data: pieData},
            {data: pieData},
            {
                axisLine: {
                    lineStyle: {
                        color: [
                            [a/100, "#86D560"],
                            [1, "#e9ecf3"]
                        ],
                        width: 20
                    }
                },
                data:[{
                    name: '18岁以下',
                    value: a
                }]
            },
            {
                axisLine: {
                    lineStyle: {
                        color: [
                            [b/100, "#AF89D6"],
                            [1, "#e9ecf3"]
                        ],
                        width: 20
                    }
                },
                data:[{
                    name: '19岁--40岁',
                    value: b
                }]
            },
            {
                axisLine: {
                    lineStyle: {
                        color: [
                            [d/100, "#FF999A"],
                            [1, "#e9ecf3"]
                        ],
                        width: 20
                    }
                },
                data:[{
                    name: '66岁以上',
                    value: d
                }]
            },
            {
                axisLine: {
                    lineStyle: {
                        color: [
                            [c/100, "#59ADF3"],
                            [1, "#e9ecf3"]
                        ],
                        width: 20
                    }
                },
                data:[{
                    name: '41岁--65岁',
                    value: c
                }]
            });
		timeLineOptions.push({
			title : [{text: index+'各年龄段用卡次数情况分析'},
                {
                    text: '用卡最多年龄段：',
                    backgroundColor:'rgba(255,255,0, 0.5)',
                    x: '5%',
                    y: '75%'
                },
                {
                    text: '用卡最少年龄段：',
                    backgroundColor:'rgba(255,255,0, 0.5)',
                    x: '47%',
                    y: '75%'
                },
                {
                    text: maxname,
                    x: '5%',
                    y: '79%'
                },
                {
                    text: minname,
                    x: '47%',
                    y: '79%'
                },{
                    text: '数量\n'+max+'次',
                    x: '21%',
                    y: '82%'
                },
                {
                    text: '占比\n'+maxrate+'%',
                    x: '35%',
                    y: '82%'
                },{
                    text: '数量\n'+min+'次',
                    x: '65%',
                    y: '82%'
                },
                {
                    text: '占比\n'+minrate+'%',
                    x: '80%',
                    y: '82%'
                },
            ],
			series: series
		});
	}

	var option = {
		baseOption: {
			title: [],
            timeline: {
                show: true,
                axisType: 'category',
                autoPlay:true,
                currentIndex: 0,
                playInterval: 2000,
                label: {
                    normal: {
                        show: true,
                        interval: 'auto',
                    },
                },
                data:times,
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
			toolbox: {
				show : true,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					magicType : {show: true, type: ['line', 'bar']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
            grid: {
                show:true,
                borderColor: '#3CB371',
                left: '3%',
                right: '3%',
                bottom: '8%',
                top: '74%',
                containLabel: true
            },
            legend: {
                orient: 'horizontal',
                data: ['18岁以下', '19岁--40岁', '41岁--65岁', '66岁以上'],
            },
            series: [{
                type: 'pie',
                selectedMode: 'single',
                center:['50%','40%'],
                radius: ['23%', '50%'],
                color: ['#86D560', '#AF89D6',  '#FF999A','#59ADF3'],

                label: {
                    normal: {
                        position: 'inner',
                        formatter: '{d}%',

                        textStyle: {
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 14
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
            }, {
                type: 'pie',
                center:['50%','40%'],
                radius: ['50%', '68%'],
                itemStyle: {
                    normal: {
                        color: '#F2F2F2'
                    },
                    emphasis: {
                        color: '#ADADAD'
                    }
                },
                label: {
                    normal: {
                        position: 'inner',
                        formatter: '{c}次',
                        textStyle: {
                            color: '#777777',
                            fontWeight: 'bold',
                            fontSize: 14
                        }
                    }
                },
            },{
                center: ['15%', '20%'],
                radius:'25%',
                type: "gauge",
                splitNumber: 5,
                axisTick: {
                    lineStyle: {
                        color: "#3bb4f2",
                        width: 3
                    },
                    length: -10,
                    splitNumber: 1
                },
                axisLabel: {
                    distance: -58,
                    textStyle: {
                        color: "#000"
                    }
                },
                splitLine: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: "#494f50"
                    }
                },
                detail: {
                    formatter: "{value}%",
                    offsetCenter: [0, "60%"],
                    textStyle: {
                        fontSize: 15,
                        color: "#F37B1D"
                    }
                },
                title: {
                    offsetCenter: [0, "100%"]
                }},{
                center: ['85%', '20%'],
                radius:'25%',
                type: "gauge",
                splitNumber: 5,
                axisTick: {
                    lineStyle: {
                        color: "#3bb4f2",
                        width: 3
                    },
                    length: -10,
                    splitNumber: 1
                },
                axisLabel: {
                    distance: -58,
                    textStyle: {
                        color: "#000"
                    }
                },
                splitLine: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: "#494f50"
                    }
                },
                detail: {
                    formatter: "{value}%",
                    offsetCenter: [0, "60%"],
                    textStyle: {
                        fontSize: 15,
                        color: "#F37B1D"
                    }
                },
                title: {
                    offsetCenter: [0, "100%"]
                }},{
                center: ['85%', '60%'],
                radius:'25%',
                type: "gauge",
                splitNumber: 5,
                axisTick: {
                    lineStyle: {
                        color: "#3bb4f2",
                        width: 3
                    },
                    length: -10,
                    splitNumber: 1
                },
                axisLabel: {
                    distance: -58,
                    textStyle: {
                        color: "#000"
                    }
                },
                splitLine: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: "#494f50"
                    }
                },
                detail: {
                    formatter: "{value}%",
                    offsetCenter: [0, "60%"],
                    textStyle: {
                        fontSize: 15,
                        color: "#F37B1D"
                    }
                },
                title: {
                    offsetCenter: [0, "100%"]
                }},{
                center: ['15%', '60%'],
                radius:'25%',
                type: "gauge",
                splitNumber: 5,
                axisTick: {
                    lineStyle: {
                        color: "#3bb4f2",
                        width: 3
                    },
                    length: -10,
                    splitNumber: 1
                },
                axisLabel: {
                    distance: -58,
                    textStyle: {
                        color: "#000"
                    }
                },
                splitLine: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: "#494f50"
                    }
                },
                detail: {
                    formatter: "{value}%",
                    offsetCenter: [0, "60%"],
                    textStyle: {
                        fontSize: 15,
                        color: "#F37B1D"
                    }
                },
                title: {
                    offsetCenter: [0, "100%"]
                }},
                {
                    "name": ' ',
                    "type": 'pie',
                    "radius": ['11%', '15%'],
                    center:['24%','85%'],
                    "avoidLabelOverlap": false,
                    "startAngle": 225,
                    "color": ["#9f8fc1", "transparent"],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "label": {
                        "normal": {
                            "show": false,
                            "position": 'center'
                        },
                        "emphasis": {
                            "show": true,
                            "textStyle": {
                                "fontSize": '30',
                                "fontWeight": 'bold'
                            }
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 75,
                        "name": '1'
                    }, {
                        "value": 25,
                        "name": '2'
                    }]
                },{
                    "name": ' ',
                    "type": 'pie',
                    "radius": ['11%', '15%'],
                    center:['38.5%','85%'],
                    "avoidLabelOverlap": false,
                    "startAngle": 225,
                    "color": ["#9f8fc1", "transparent"],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "label": {
                        "normal": {
                            "show": false,
                            "position": 'center'
                        },
                        "emphasis": {
                            "show": true,
                            "textStyle": {
                                "fontSize": '30',
                                "fontWeight": 'bold'
                            }
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 75,
                        "name": '1'
                    }, {
                        "value": 25,
                        "name": '2'
                    }]
                },{
                    "name": ' ',
                    "type": 'pie',
                    "radius": ['11%', '15%'],
                    center:['68%','85%'],
                    "avoidLabelOverlap": false,
                    "startAngle": 225,
                    "color": ["#9f8fc1", "transparent"],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "label": {
                        "normal": {
                            "show": false,
                            "position": 'center'
                        },
                        "emphasis": {
                            "show": true,
                            "textStyle": {
                                "fontSize": '30',
                                "fontWeight": 'bold'
                            }
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 75,
                        "name": '1'
                    }, {
                        "value": 25,
                        "name": '2'
                    }]
                },{
                    "name": ' ',
                    "type": 'pie',
                    "radius": ['11%', '15%'],
                    center:['83.5%','85%'],
                    "avoidLabelOverlap": false,
                    "startAngle": 225,
                    "color": ["#9f8fc1", "transparent"],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "label": {
                        "normal": {
                            "show": false,
                            "position": 'center'
                        },
                        "emphasis": {
                            "show": true,
                            "textStyle": {
                                "fontSize": '30',
                                "fontWeight": 'bold'
                            }
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 75,
                        "name": '1'
                    }, {
                        "value": 25,
                        "name": '2'
                    }]
                }
            ]
		},
		options: timeLineOptions
	};
	return option;
}