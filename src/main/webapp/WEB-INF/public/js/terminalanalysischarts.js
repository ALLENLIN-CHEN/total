/**
 * 用于处理不同类型的图表
 */
function getCharts(data) {
	var result=[];
	if(data.type === 'terminal') {
		result.push(getTerminalMix(data));
	} else if(data.type === 'terminaltype') {
		result.push(getTerminalTypeMix(data));
	} else if(data.type === 'terminalbusiness') {
		result.push(getTerminalBusinessNumMix(data));
	} else if(data.type === 'terminalstatus') {
		result.push(getTerminalStatusMix(data));
	}
	
	    // result.push(getTerminalTypeMix(data));
        // result.push(getTerminalMix(data));
		return result;
	// }
}
/***********************************/

/**
 * 全市社保用卡终端分析:混搭
 */
function getTerminalMix(res) {
	var typedata=res.typedata;
	var statusdata=res.statusdata;
	var businessdata=res.businessdata;
	var timeLineOptions = [];
	var yearlist=[];
	// data.yearlist=[2010,2011,2012,2013,2014,2015];
	// console.log(data);
	// var typelist=['自助终端','德生宝','M13','M4','M24D','M21DK','TSW-F4 M46DK','M32DK','M32D','M21'];
	// var fakenos=['055214DF000005B0','055214DF000005B1','055214DF000005B2','055214DF000005B3','055214DF000005B4',
	// 	'055214DF000005B5','055214DF000005B6','055214DF000005B7','055214DF000005B8','055214DF000005B9'];
	// console.log(data);
	for(var index in typedata.yearlist) {
		var typelist=typedata.datamap[typedata.yearlist[index]];
		var statuslist=statusdata.datamap[statusdata.yearlist[index]];
		var businesslist=businessdata.datamap[businessdata.yearlist[index]];
		var businesscategory=[],statuscategory=[], typecategory=[],typevalue=[],statusvalue=[],businessvalue=[];
		for(var i = 0; i < typelist.length; i++) {
			if(i<10) {
				typecategory.push(typelist[i].category);
				typevalue.push(typelist[i].value);
				// typevalue.push(typelist[i].value);
			}else break;
		}
		for(var i = 0; i < statuslist.length; i++) {
			if(i<10) {
				statuscategory.push(statuslist[i].category);
				statusvalue.push(statuslist[i]);
			}else break;
		}
		for(var i = 0; i < businesslist.length; i++) {
			if(i<10) {
				businesscategory.push(businesslist[i].category);
				businessvalue.push(businesslist[i]);
			}else break;
		}
		// console.log(businessvalue);
		yearlist.push(typedata.yearlist[index]+"年");
		timeLineOptions.push({
			title : {text: yearlist[index]},
			legend: [
					{
						right: '35%',
						top:'middle',
						data: ['正常', '异常'],
					},
					// {
					// right: '35%',
					// top:'5%',
					// data: ['业务量'],
					// }
			],

			yAxis : [
				{
					gridIndex:0,
					type : 'category',
					data : typecategory,
				},
				{
					gridIndex:1,
					type : 'value',
					scale:true,
					splitLine: {
						lineStyle: {
						type: 'dashed'
						}
					}
				},
				{
					gridIndex:2,
					type : 'value',
					splitLine: {
						lineStyle: {
							type: 'dashed'
						}
					}
				}
				
			],
			xAxis : [
				{
					gridIndex:0,
					type : 'value',
					position: 'top',
					// scale: true,
					splitLine: {
						lineStyle: {
							type: 'dashed'
						}
					}
				},
				{
					type : 'category',
					data : businesscategory,
					axisLabel: {
						interval: 0,
						rotate: 30
					},
					gridIndex:1,

				},
				{
					type : 'category',
					data : statuscategory,
					axisLabel: {
						interval: 0,
						rotate: 30
					},
					gridIndex:2,
				}
			],
			series: [
				{
					name: "终端类型数量",
					xAxisIndex:0,
					yAxisIndex:0,
					label: {
						normal: {
							show: true,
							position:"right"
						}
					},
					barWidth: 35,
					itemStyle: {
						normal: {
							barBorderRadius: 10,
							color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
								offset: 0,
								color: 'lightBlue' // 0% 处的颜色
							}, {
								offset: 1,
								color: '#3398DB' // 100% 处的颜色
							}], false)
						}

					},
					data: typevalue
				},
				{
					name: '业务量',
					xAxisIndex:1,
					yAxisIndex:1,
					type: 'line',
					smooth: true,
					showAllSymbol: true,
					symbol: 'emptyCircle',
					symbolSize: 5,
					label: {
						normal: {
							show: true,
							textStyle: {
								color: "gray"
							},
							// position: "insideTop",
						}
					},
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						// formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}'
						formatter: function (params, ticket, callback) {
							return  "网点名称："+params.data.branch_name +"<br>"
								+"终端类型："+params.data.device_type+"<br>"
								+"终端编号："+params.data.category+"<br>"
								+"业务数量:"+params.data.value;

						}
					},
					data: businessvalue
				},
				{
					name: '业务量',
					xAxisIndex:1,
					yAxisIndex:1,
					tooltip:{
						show:false
					},
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
					data: businessvalue
				},
				{
					name: '正常',
					xAxisIndex:2,
					yAxisIndex:2,
					type: 'bar',
					"stack": "总量",
					"barMaxWidth": 35,
					"barGap": "10%",
					"itemStyle": {
						"normal": {
							"color": "rgba(0,191,183,1)",
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
					},
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						// formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}'
						formatter: function (params, ticket, callback) {
							return  "网点名称："+params.data.branch_name +"<br>"
								+"终端类型："+params.data.device_type+"<br>"
								+"终端编号："+params.data.category+"<br>"
								+params.seriesName+"天数:"+params.data.value;

						}
					},
					data: statusvalue
				},
				{
					name: '异常',
					xAxisIndex:2,
					yAxisIndex:2,
					type: 'bar',
					"stack": "总量",
					"itemStyle": {
						"normal": {
							"color": "rgba(255,144,128,1)",
							"barBorderRadius": 0,
							"label": {
								"show": true,
								"position": "top",
								formatter: function(p) {
									return p.value > 0 ? (p.value) : '';
								}
							}
						}
					},
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						// formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}'
						formatter: function (params, ticket, callback) {
							return  "网点名称："+params.data.branch_name +"<br>"
								+"终端类型："+params.data.device_type+"<br>"
								+"终端编号："+params.data.category+"<br>"
								+params.seriesName+"天数:"+params.data.value;

						}
					},
					data: statusvalue.map(function (item) {
						var days;//某年(year)的天数
						if(item.year % 4 == 0 && item.year % 100 != 0 || item.year % 400 == 0){//闰年的判断规则
							days=366;
						}else {
							days = 365;
						}
						var result={};
						for (var key in item) {
							result[key] = item[key];
						}
						result.value = days-item.value;
						return result;
					}),
				}
			]
		});
	}


	var option = {
		baseOption: {
			timeline: {
				// show:false,
				axisType: 'category',
				autoPlay: true,
				playInterval: 3000,
				// orient: 'vertical',
				// inverse: true,
				left: 'center',
				top: 'bottom',
				width: '60%',
				data:yearlist
			},
			title: [
					{
						text: '用卡终端分析',
						top:'90%',
						left:'right',
						textStyle: {
							fontSize: 30,
							color: 'gray'
						}
					},
					{
						text: '终端类型数量分布',
						top:'top',
						left:'70%'
					},
					{
						text: '终端业务量TOP10',
						top:'top',
						left:'left'
					},
					{
						text: '终端正常工作天数TOP10',
						top:'middle',
						left:'left'
					},
				],
			tooltip : {
				// trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			toolbox: {
				show:false,
				feature: {
					// dataView: {readOnly: true},
					dataView : {
						show : true,
						title : '数据视图',
						readOnly: true,
						lang : ['数据视图', '关闭', '刷新'],
						// optionToContent: function(opt) {
						// 	var industryModellist = opt.industryModellist;
						// 	var table = '<div style="width:100%; height:100%; overflow:auto;"><table border="1px" align="left" cellspacing="0" cellpadding="0" style="width:600px;text-align:center;background:#ccccccc"><tbody><tr style="background:#1e90ff">'
						// 		+ '<td width="40px">No</td>'
						// 		+ '<td width="70px">终端类型</td>'
						// 		+ '<td width="70px">终端数量</td>'
						// 		+ '</tr>';
						// 	for (var i = 0, l = industryModellist.length; i < l; i++) {
						// 		table += '<tr>'
						// 			+ '<td>' + (i+1) + '</td>'
						// 			+ '<td>' + industryModellist[i].industry_code + '</td>'
						// 			+ '<td>' + industryModellist[i].cardinality + '</td>'
						// 			+ '</tr>';
						// 	}
						// 	table += '</tbody></table></div>';
						// 	return table;
						// }
					},
					saveAsImage: {}
				}
			},
			yAxis : [
				{
					type : 'category',

					axisTick : {show: false},
					inverse:true
				}
			],
			xAxis : [
				{
					type : 'value',
					position: 'top',
					// scale: true,
					splitLine: {
						lineStyle: {
							type: 'dashed'
						}
					}
				}
			],
			grid:[ 
				{
					left: '70%',
					width:'28%',
					containLabel: true
				},
				{
					left: '4%',
					top:'8%',
					height:'29%',
					width:'61%',
					containLabel: true
				},
				{
					left: '4%',
					top:'54%',
					height:'28%',
					width:'61%',
					containLabel: true
				},
			],
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
/**
 * 全市社保终端类型统计:混搭
 */
function getTerminalTypeMix(res) {
	var data=res.data;
	var timeLineOptions = [];
	var yearlist=[];
	// data.yearlist=[2010,2011,2012,2013,2014,2015];
	var fakenos=['自助终端','德生宝','M13','M4','M24D','M21DK','TSW-F4 M46DK','M32DK','M32D','M21'];
	// console.log(data);
	for(var index in data.yearlist) {
		var terminalModellist=data.datamap[data.yearlist[index]];
		var categorylist=[],datalist=[];
		var sum=0;
		for(var i = 0; i < fakenos.length; i++) {
		// for(var i = 0; i < terminalModellist.length; i++) {
			if(i<10) {
				categorylist.push(fakenos[i]);
				datalist.push(Math.round(Math.random()*(9-1)+1));
				// categorylist.push(terminalModellist[i].category);
				// datalist.push(terminalModellist[i].value);
				sum+=datalist[i];
			}else break;
		}
		datalist=datalist.sort(function (x,y) {return y-x;});
		var _max = Math.max.apply(null, datalist).toFixed(0) - 0;
		var spNum = _max+1;
		while (_max % spNum != 0){
			_max++;
		};
		var mainData = [];
		for(var i=0;i<datalist.length;i++){
			mainData.push({
				name: categorylist[i],
				value: datalist[i],
				hismax: _max
			});
		}
		yearlist.push(data.yearlist[index]+"年");
		timeLineOptions.push({
			title : [
				{text: yearlist[index]+'全市各终端类型数量分布'},
				{
					text: '各\n终\n端\n类\n型\n数\n量\n',
					top:'20%',
					right:'3%',
					textBaseline:'middle',
					textStyle: {
						// fontSize: 30,
						fontWeight:'lighter',
						color: 'gray'
					}
				},
				{
					text: '全市终端共'+sum+'台，包括'+datalist.length+'种类型'+'\n' +
					'类型数量前三分别为：\n1.'+categorylist[0]+'('+datalist[0]+'台)'+'2.'+categorylist[1]+'('+datalist[1]+'台)'+'3.'+categorylist[2]+'('+datalist[2]+'台)',
					top:'7%',
					left:'3%',
					textBaseline:'middle',
					textStyle: {
						// fontSize: 30,
						fontWeight:'lighter',
						color: 'gray'
					}
				}
			],
				legend: [
				{
					right: '7%',
					top:'10%',
					width:'6%',
					data: ['TOP1', 'TOP2','TOP3', 'TOP4','TOP5'],
				}
			],
			// color: ['#efbb1a', '#d77169', '#c14f60', '#953f61', '#72355f'],
			yAxis : [
				{
					gridIndex:0,
					type:"value",
					splitNumber: spNum,
					interval: _max / spNum,
					max: _max,
					splitLine: {
						lineStyle: {
							type: 'dashed'
						}
					}
					// axisTick: {show: false},
					// axisLine: {show: false},
					// axisLabel: {show: false}
				}
			],
			xAxis : [
				{
					gridIndex:0,
					type:'category',
					data: categorylist,
					axisLabel: {
						interval: 0,
						rotate: 20
					},
					// axisTick: {show: false},
					// axisLine: {show: false},
				}
			],
			grid: [
					{
						top:'13%',
						bottom:'13%',
					left: '3%',
					width:'65%',
					containLabel: true
					}
				],
			series: [
				{
					"name": "背景条",
					"type": "bar",
					"barWidth": "50%",
					"itemStyle": {
						"normal": {
							"color": "#BBBBBB",
							"barBorderRadius": 0,
							"label": {
								"show": false,
								"textStyle": {
									"color": "rgba(0,0,0,1)"
								},
								"position": "top",
								formatter : function(p) {
									return p.value > 0 ? (p.value) : '';
								}
							}
						}
					},
					tooltip : {
						trigger: 'item',
						show:false
					},
					data:datalist.map(function (item,index) {
						return _max;
					}),
				},
				{
					"name": "终端类型数量",
					"type": "bar",
					"stack": "收客",
					"barWidth": "50%",
					"barGap": "-100%",
					"itemStyle": {
						"normal": {
							"color": "#86D560",
							"barBorderRadius": 0,
							"label": {
								"show": true,
								"textStyle": {
									"color": "rgba(0,0,0,1)"
								},
								"position": "inside",
								formatter : function(p) {
									return p.value > 0 ? (p.value) : '';
								}
							}
						}
					},
					data:datalist,
				},
				{
					name:'TOP1',
					type: 'pie',
					center: [ '75%', '20%'],
					radius: ['18%', '23%'],
					label:  {
						normal: {
							position: 'center',
							formatter: function(params) {
								if (params.name == "other")
									return "";
								if(params.name.length>5)
									return params.value + '\n' + params.name.substr(0,3)+'\n'+params.name.substring(3);
								return params.value + '\n' + params.name;
							},
							textStyle: {
								fontStyle: 'normal',
								fontWeight: 'normal',
								fontSize: 18
							}
						}
					},
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							if (params.data.name == "other")
								return "";
							return  params.seriesName+ '<br>' + params.data.name+':'+params.data.value;
						},
					},
					data: [{
						name: 'other',
						value: mainData[0].hismax - mainData[0].value,
						itemStyle: {
							normal: {
								color: '#ccc'
							}
						}
					}, {
						name: mainData[0].name,
						value: mainData[0].value
					}]
				},
				{
					name:'TOP2',
					type: 'pie',
					center: [ '75%', '48%'],
					radius: ['18%', '23%'],
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							if (params.data.name == "other")
								return "";
							return  params.seriesName+ '<br>' + params.data.name+':'+params.data.value;
						},
					},
					label:  {
						normal: {
							position: 'center',
							formatter: function(params) {
								if (params.name == "other")
									return "";
								if(params.name.length>5)
								return params.value + '\n' + params.name.substr(0,3)+'\n'+params.name.substring(3);
								return params.value + '\n' + params.name;
							},
							textStyle: {
								fontStyle: 'normal',
								fontWeight: 'normal',
								fontSize: 18
							}
						}
					},
					data: [{
						name: 'other',
						value: mainData[1].hismax - mainData[1].value,
						itemStyle: {
							normal: {
								color: '#ccc'
							}
						}
					}, {
						name: mainData[1].name,
						value: mainData[1].value
					}]
				},
				{
					name:'TOP3',
					type: 'pie',
					center: [ '75%', '77%'],
					radius: ['18%', '23%'],
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							if (params.data.name == "other")
								return "";
							return  params.seriesName+ '<br>' + params.data.name+':'+params.data.value;
						},
					},
					label:  {
						normal: {
							position: 'center',
							formatter: function(params) {
								if (params.name == "other")
									return "";
								if(params.name.length>5)
									return params.value + '\n' + params.name.substr(0,3)+'\n'+params.name.substring(3);
								return params.value + '\n' + params.name;
							},
							textStyle: {
								fontStyle: 'normal',
								fontWeight: 'normal',
								fontSize: 18
							}
						}
					},
					data: [{
						name: 'other',
						value: mainData[2].hismax - mainData[2].value,
						itemStyle: {
							normal: {
								color: '#ccc'
							}
						}
					}, {
						name: mainData[2].name,
						value: mainData[2].value
					}]
				},
				{
					name:'TOP4',
					type: 'pie',
					center: [ '90%', '48%'],
					radius: ['18%', '23%'],
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							if (params.data.name == "other")
								return "";
							return  params.seriesName+ '<br>' + params.data.name+':'+params.data.value;
						},
					},
					label:  {
						normal: {
							position: 'center',
							formatter: function(params) {
								if (params.name == "other")
									return "";
								if(params.name.length>5)
									return params.value + '\n' + params.name.substr(0,3)+'\n'+params.name.substring(3);
								return params.value + '\n' + params.name;
							},
							textStyle: {
								fontStyle: 'normal',
								fontWeight: 'normal',
								fontSize: 18
							}
						}
					},
					data: [{
						name: 'other',
						value: mainData[3].hismax - mainData[3].value,
						itemStyle: {
							normal: {
								color: '#ccc'
							}
						}
					}, {
						name: mainData[3].name,
						value: mainData[3].value
					}]
				},
				{
					name:'TOP5',
					type: 'pie',
					center: [ '90%', '77%'],
					radius: ['18%', '23%'],
					tooltip : {
						trigger: 'item',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							if (params.data.name == "other")
								return "";
							return  params.seriesName+ '<br>' + params.data.name+':'+params.data.value;
						},
					},
					label:  {
						normal: {
							position: 'center',
							formatter: function(params) {
								if (params.name == "other")
									return "";
								if(params.name.length>5)
									return params.value + '\n' + params.name.substr(0,3)+'\n'+params.name.substring(3);
								return params.value + '\n' + params.name;
							},
							textStyle: {
								fontStyle: 'normal',
								fontWeight: 'normal',
								fontSize: 18
							}
						}
					},
					data: [{
						name: 'other',
						value: mainData[4].hismax - mainData[4].value,
						itemStyle: {
							normal: {
								color: '#ccc'
							}
						}
					}, {
						name: mainData[4].name,
						value: mainData[4].value
					}]
				}
			]
		});
	}


	var option = {
		baseOption: {
			timeline: {
				// show:false,
				axisType: 'category',
				autoPlay: true,
				playInterval: 3000,
				// orient: 'vertical',
				// inverse: true,
				left: 'center',
				top: 'bottom',
				width: '60%',
				data:yearlist
			},
			title: [
				{
				text: '终端类型TOP10统计'
				}
			],
			tooltip : {
				// trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				// formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}元'
			},
			toolbox: {
				show:false,
				feature: {
					// dataView: {readOnly: true},
					dataView : {
						show : true,
						title : '数据视图',
						readOnly: true,
						lang : ['数据视图', '关闭', '刷新'],
						// optionToContent: function(opt) {
						// 	var industryModellist = opt.industryModellist;
						// 	var table = '<div style="width:100%; height:100%; overflow:auto;"><table border="1px" align="left" cellspacing="0" cellpadding="0" style="width:600px;text-align:center;background:#ccccccc"><tbody><tr style="background:#1e90ff">'
						// 		+ '<td width="40px">No</td>'
						// 		+ '<td width="70px">终端类型</td>'
						// 		+ '<td width="70px">终端数量</td>'
						// 		+ '</tr>';
						// 	for (var i = 0, l = industryModellist.length; i < l; i++) {
						// 		table += '<tr>'
						// 			+ '<td>' + (i+1) + '</td>'
						// 			+ '<td>' + industryModellist[i].industry_code + '</td>'
						// 			+ '<td>' + industryModellist[i].cardinality + '</td>'
						// 			+ '</tr>';
						// 	}
						// 	table += '</tbody></table></div>';
						// 	return table;
						// }
					},
					saveAsImage: {}
				}
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
					scale: true,
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
/**
 * 全市社保终端的业务量按年统计:混搭
 */
function getTerminalBusinessNumMix(res) {
	var data=res.data;
	var timeLineOptions = [];
	var yearlist=[];
	// data.yearlist=[2010,2011,2012,2013,2014,2015];
	// console.log(data);
	// var fakenos=['055214DF000005B0','055214DF000005B1','055214DF000005B2','055214DF000005B3','055214DF000005B4',
	// 	'055214DF000005B5','055214DF000005B6','055214DF000005B7','055214DF000005B8','055214DF000005B9'];
	// console.log(data);
	for(var index in data.yearlist) {
		var terminalModellist=data.datamap[data.yearlist[index]];
		var categorylist=[],datalist=[];
		for(var i = 0; i < terminalModellist.length; i++) {
			if(i<10) {
				// categorylist.push(fakenos[i]);
				// datalist.push(Math.round(Math.random()*(100-10)+10));
				categorylist.push(terminalModellist[i].category);
				datalist.push(terminalModellist[i]);
			}else break;
		}
		// datalist=datalist.sort(function (x,y) {return y-x;})
		yearlist.push(data.yearlist[index]+"年");
		timeLineOptions.push({
			title : {text: yearlist[index]+'终端业务量TOP10'},
			xAxis : [
				{
					type : 'category',
					axisLabel: {
						interval: 0,
						rotate: 20
					},
					data : categorylist
				}
			],
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				// formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}'
				formatter: function (params, ticket, callback) {
					return  "网点名称："+params[0].data.branch_name +"<br>"
							+"终端类型："+params[0].data.device_type+"<br>"
							+"终端编号："+params[0].data.category+"<br>"
							+"业务数量:"+params[0].data.value;

				}
			},
			series: [
				{
					type: 'bar',
					name:'终端业务量',
					tooltip:{
						show:false
					},
					animation:false,
					barWidth:1.4,
					hoverAnimation:false,
					data:datalist,
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
					name:'终端业务量',
					smooth:true,
					symbolSize:10,
					animation:false,
					lineWidth:1.2,
					hoverAnimation:false,
					data:datalist,
					symbol:'circle',
					itemStyle:{
						normal:{
							color:'#f17a52',
							shadowBlur: 40,
							label:{
								show:true,
								position:'top',
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
				{
					name: "终端业务量",
					type: 'pie',
					// roseType : 'area',
					radius: ['10%', '30%'],
					center: ['80%', '22%'],
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					data: datalist.map(function (item,index) {
						return {
							name:'TOP'+(index+1),
							value:item.value
						}
					}),
				},
				// {
				// 	name:'终端业务量',
				// 	type:'funnel',
				// 	x: '62%',
				// 	y: '45%',
				// 	//x2: 80,
				// 	y2: 60,
				// 	width: '33%',
				// 	tooltip: {
				// 		trigger: 'item',
				// 		formatter: "{a} <br/>{b}: {c}"
				// 	},
				// 	sort : 'descending', // 'ascending', 'descending'
				// 	gap :0,
				// 	data:datalist.map(function (item,index) {
				// 		return {
				// 			name:'TOP'+(index+1),
				// 			value:item
				// 		}
				// 	}),
				// 	roseType: true,
				// 	label: {
				// 		normal: {
				// 			formatter: function (params) {
				// 				return params.name;// + ' ' + params.value;
				// 			},
				// 			// position: 'center'
				// 		}
				// 	},
				// 	itemStyle: {
				// 		normal: {
				// 			borderWidth: 0,
				// 			shadowBlur: 30,
				// 			shadowOffsetX: 0,
				// 			shadowOffsetY: 10,
				// 			shadowColor: 'rgba(0, 0, 0, 0.5)'
				// 		}
				// 	}
                //
				// }
			]
		});
	}


	var option = {
		baseOption: {
			timeline: {
				// show:false,
				axisType: 'category',
				autoPlay: true,
				playInterval: 3000,
				// orient: 'vertical',
				// inverse: true,
				left: 'center',
				top: 'bottom',
				width: '60%',
				data:yearlist
			},
			title: [{
				text: '终端类型TOP10统计'
			},{
				text: '终\n端\n业\n务\n量\n占\n比',
				top:'20%',
				left:'63%',
				textBaseline:'middle',
				textStyle: {
					// fontSize: 30,
					fontWeight:'lighter',
					color: 'gray'
				}
			},
			],
			toolbox: {
				show:false,
				feature: {
					// dataView: {readOnly: true},
					dataView : {
						show : true,
						title : '数据视图',
						readOnly: true,
						lang : ['数据视图', '关闭', '刷新'],
						// optionToContent: function(opt) {
						// 	var industryModellist = opt.industryModellist;
						// 	var table = '<div style="width:100%; height:100%; overflow:auto;"><table border="1px" align="left" cellspacing="0" cellpadding="0" style="width:600px;text-align:center;background:#ccccccc"><tbody><tr style="background:#1e90ff">'
						// 		+ '<td width="40px">No</td>'
						// 		+ '<td width="70px">终端类型</td>'
						// 		+ '<td width="70px">终端数量</td>'
						// 		+ '</tr>';
						// 	for (var i = 0, l = industryModellist.length; i < l; i++) {
						// 		table += '<tr>'
						// 			+ '<td>' + (i+1) + '</td>'
						// 			+ '<td>' + industryModellist[i].industry_code + '</td>'
						// 			+ '<td>' + industryModellist[i].cardinality + '</td>'
						// 			+ '</tr>';
						// 	}
						// 	table += '</tbody></table></div>';
						// 	return table;
						// }
					},
					saveAsImage: {}
				}
			},
			xAxis : [
				{
					type : 'category',
					// axisTick : {show: false},
					// inverse:true
					// axisLabel:{
					//   interval:0,
					//    rotate:30
					// }
				}
			],
			yAxis : [
				{
					type : 'value',
					position: 'top',
					scale: true,
					splitLine: {
						lineStyle: {
							type: 'dashed'
						}
					}
				}
			],
			grid: {
				left: '4%',
				bottom: '20%',
				// height:'80%',
				// width:'58%',
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
/**
 * 全市社保终端工作状态统计:混搭
 */
function getTerminalStatusMix(res) {
	var data=res.data;
	var timeLineOptions = [];
	var yearlist=[];
	// data.yearlist=[2010,2011,2012,2013,2014,2015];
	// console.log(data);
	// var fakenos=['055214DF000005B0','055214DF000005B1','055214DF000005B2','055214DF000005B3','055214DF000005B4',
	// 	'055214DF000005B5','055214DF000005B6','055214DF000005B7','055214DF000005B8','055214DF000005B9'];

	for(var index in data.yearlist) {
		var terminalModellist=data.datamap[data.yearlist[index]];
		var categorylist=[],datalist=[];
		for(var i = 0; i < terminalModellist.length; i++) {
			if(i<10) {
				// categorylist.push(fakenos[i]);
				// datalist.push(Math.round(Math.random()*(365-100)+100) );
				categorylist.push(terminalModellist[i].category);
				datalist.push(terminalModellist[i]);
			}else break;
		}
		// datalist=datalist.sort(function (x,y) {return y-x;});
		yearlist.push(data.yearlist[index]+"年");
		timeLineOptions.push({
			title : {text: yearlist[index]+'终端工作状态TOP10'},
			legend: [
				{
					left: 'center',
					// top:'middle',
					data: ['正常', '异常'],
				}
			],
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				// formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}'
				formatter: function (params, ticket, callback) {
					return  "网点名称："+params[0].data.branch_name +"<br>"
						+"终端类型："+params[0].data.device_type+"<br>"
						+"终端编号："+params[0].data.category+"<br>"
					    +params[0].seriesName+"天数:"+params[0].data.value;

				}
			},
			xAxis:[
				{
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
							color:'#B2B2B2',
							fontSize:12,},		        },
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
								color:'#9D9EA0',fontSize: 12,
							},

						},
						data: categorylist,
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
								// color:'#9D9EA0',
								fontSize: 12,
								align:'center',
							},

						},
						data:categorylist
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
								color:'#9D9EA0',fontSize: 12,
							},

						},
						data:categorylist,
					},
				],
			grid:[
				{
				show:false,
				left:'4%',
				top:60,
				bottom:60,
				// containLabel: true,
				width:'49%',
					// height:'78%'
			},
				{
					show:false,
					left:'50.5%',
					top:80,
					bottom:60,
					width:'4%',
					// height:'78%'
				},
				{
					show:false,
					right:'4%',
					top:60,
					bottom:60,
					containLabel: true,
					width:'49%',
					// height:'78%'
				},
			],
			series: [
				// {
				// 	name: "终端类型数量",
				// 	type: 'pie',
				// 	radius: [0, '30%'],
				// 	center: ['75%', '25%'],
				// 	data: statuslist.map(function (item,index) {
				// 		return {
				// 			name:categorylist[index],
				// 			value:item
				// 		}
				// 	}),
				// },
				{
					name:'正常',
					type: 'bar',
					barGap: 20,
					barWidth: 20,
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
					data: datalist,
				},
				{
					name:'异常',
					type: 'bar',
					barGap: 20,
					barWidth:20,
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
					data:datalist.map(function (item) {
						var days;//某年(year)的天数
						if(item.year % 4 == 0 && item.year % 100 != 0 || item.year % 400 == 0){//闰年的判断规则
							days=366;
						}else {
							days = 365;
						}
						var result={};
						for (var key in item) {
							result[key] = item[key];
						}
						result.value = days-item.value;
						return result;
					}),
				},
			]
		});
	}


	var option = {
		baseOption: {
			timeline: {
				// show:false,
				axisType: 'category',
				autoPlay: true,
				playInterval: 3000,
				// orient: 'vertical',
				// inverse: true,
				left: 'center',
				top: 'bottom',
				width: '60%',
				data:yearlist
			},
			title: {
				text: '终端类型TOP10统计'
			},
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				// formatter: '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#5793f3;margin-right:5px;"></span>{a}<br/>{b} : {c}元'
			},
			toolbox: {
				show:false,
				feature: {
					// dataView: {readOnly: true},
					dataView : {
						show : true,
						title : '数据视图',
						readOnly: true,
						lang : ['数据视图', '关闭', '刷新'],
						// optionToContent: function(opt) {
						// 	var industryModellist = opt.industryModellist;
						// 	var table = '<div style="width:100%; height:100%; overflow:auto;"><table border="1px" align="left" cellspacing="0" cellpadding="0" style="width:600px;text-align:center;background:#ccccccc"><tbody><tr style="background:#1e90ff">'
						// 		+ '<td width="40px">No</td>'
						// 		+ '<td width="70px">终端类型</td>'
						// 		+ '<td width="70px">终端数量</td>'
						// 		+ '</tr>';
						// 	for (var i = 0, l = industryModellist.length; i < l; i++) {
						// 		table += '<tr>'
						// 			+ '<td>' + (i+1) + '</td>'
						// 			+ '<td>' + industryModellist[i].industry_code + '</td>'
						// 			+ '<td>' + industryModellist[i].cardinality + '</td>'
						// 			+ '</tr>';
						// 	}
						// 	table += '</tbody></table></div>';
						// 	return table;
						// }
					},
					saveAsImage: {}
				}
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
