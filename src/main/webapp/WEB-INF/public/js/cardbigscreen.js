var myChart = new Array(7);
var option;
//获取数据的REST风格URL，分别对应chart1,2,5,6,7,8
var urls = ['charts/netpoint/getOperationAmount','charts/netpoint/getWorkState','charts/netpoint/getTerminalAmount',
'charts/terminal/getBusinessOption','charts/terminal/getTypeOption','charts/terminal/getStatusOption'];		

var years;					//年份

// var netpoint = ['孝感市人社局社保大厅1楼','云梦县人社局社保大厅1楼','大悟县人社局三楼','孝南区人社局社保大厅1楼','孝昌县人社局社保大厅1楼',
// '安陆县人社局社保大厅1楼','汉川县人社局社保大厅1楼'];
// var address = ['孝感市人社局社保大厅1楼','云梦县人社局社保大厅1楼','大悟县人社局三楼','孝南区人社局社保大厅1楼','孝昌县人社局社保大厅1楼',
// '安陆县人社局社保大厅1楼','汉川县人社局社保大厅1楼'];

// 网点业务量
var chart1Data = [];

// 网点工作状态
var chart2Data = [];

// 网点终端数量
var chart5Data = [];

// 终端业务量
var chart6Data = [];

// 终端类型数量
var chart7Data = [];

// 终端工作状态
var chart8Data = [];

$(document).ready(function(){				
	$('.container-fluid').hide();	
	showLoading();	
	// 通过ajax请求获取数据,缓存获取的数据,包括所有图表的结论
	getData();	
	hideLoading();
	$('.container-fluid').show();
	// // 为所有ECharts图表准备有一定大小的DOM，初始化图表实例
	for(var i=0;i<8;i++){
		echarts.dispose(option);
		var id = 'chart'+(i+1);
		myChart[i] = echarts.init(document.getElementById(id)); 
	}	
	// // 绑定所有图表实例
	echarts.connect(myChart);	
	// // 初始化所有结论
	initConclusions();
	// // 配置ECharts图表option，并setOption	
	setOptions();

	myChart[4].on('timelineChanged',setConclusions);	
});

function getData(){
	$.ajaxSetup({
		async: false
	});
	for(var i=0;i<6;i++){
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urls[i],
			async: false,
			success: function(res) {					
				saveData(res,i+1);
			},
			error: function() {
				alert('获取数据错误');
			}
		});
	}
	$.ajaxSetup({
		async: true
	});
}

function setOptions(){
	option = getChart1(chart1Data);
	myChart[0].setOption(option);

	option = getChart2(chart2Data);
	myChart[1].setOption(option);

	option = getChart3(chart1Data);
	myChart[2].setOption(option);
	
	option = getChart4(chart5Data);	
	myChart[3].setOption(option);

	option = getChart5(chart5Data);	
	myChart[4].setOption(option);	

	option = getChart6(chart6Data);	
	myChart[5].setOption(option);

	option = getChart7(chart7Data);	
	myChart[6].setOption(option);

	option = getChart8(chart8Data);	
	myChart[7].setOption(option);
}

/**
* 初始结论
* @return {[type]} [description]
*/
function initConclusions(){
	// init title
	var t_year = document.getElementById('year');
	t_year.innerHTML = "2010";           
	//init chart1 conclusions
    var opTotal = document.getElementById('opTotal');
    var opAverage = document.getElementById('opAverage');
    opTotal.innerHTML = formatNum(sum(chart1Data[0]));
    opAverage.innerHTML = formatNum(average(chart1Data[0]));
    //init chart2 conclusions
    var worknp = document.getElementById('worknp');
    var notWorknp = document.getElementById('notWorknp');
    var work = document.getElementById('work');    
    var notWork = document.getElementById('notWork');
    notWorknp.innerHTML = chart2Data[0][0].name;
    worknp.innerHTML = chart2Data[0][chart2Data[0].length-1].name;
    notWork.innerHTML = chart2Data[0][0].work;
    work.innerHTML = chart2Data[0][chart2Data[0].length-1].notWork;

    // init chart3 conclusions
    var npName = document.getElementById('npName');
    var npOperation = document.getElementById('npOperation');
    var npPercent = document.getElementById('npPercent');   
    npName.innerHTML = chart1Data[0][0].name; 
    npOperation.innerHTML = formatNum(chart1Data[0][0].value); 
    npPercent.innerHTML = ((chart1Data[0][0].value / sum(chart1Data[0])) * 100).toFixed(2) + '%';
    
    // init chart4 conclusions
    var npTerName = document.getElementById('npTerName');
    var npTer = document.getElementById('npTer');
    var npTerPercent = document.getElementById('npTerPercent');   
    npTerName.innerHTML = chart5Data[0][0].name; 
    npTer.innerHTML = chart5Data[0][0].value; 
    npTerPercent.innerHTML = ((chart5Data[0][0].value / sum(chart5Data[0])) * 100).toFixed(2) + '%';

    // init chart5 conclusions
    var npAmount = document.getElementById('npAmount');
    var terminalAmount = document.getElementById('terminalAmount');
    var maxTerminalnp = document.getElementById('maxTerminalnp');
    var maxTerminal = document.getElementById('maxTerminal');
    npAmount.innerHTML = chart5Data[0].length;        
    terminalAmount.innerHTML = formatNum(sum(chart5Data[0]));
    maxTerminalnp.innerHTML = chart5Data[0][0].name;    
    maxTerminal.innerHTML = chart5Data[0][0].value;
    maxOperation.innerHTML = formatNum(getOperationByName(chart5Data[0][0].name,chart1Data[0]));

    // init chart6 conclusions
    var terminal_op = document.getElementById('terminal_op');
    var terminal_loc = document.getElementById('terminal_loc');
    terminal_op.innerHTML = formatNum(chart6Data[0][0].value);
    terminal_loc.innerHTML = chart6Data[0][0].branch_name;

    // init chart7 conclusions
    var type_top = document.getElementById('type_top');
    var top = document.getElementById('top');
    var type_low = document.getElementById('type_low');
    var low = document.getElementById('low');
    type_top.innerHTML = chart7Data[0][0].category;
    top.innerHTML = formatNum(chart7Data[0][0].value);
    type_low.innerHTML = chart7Data[0][chart7Data[0].length-1].category;
    low.innerHTML = formatNum(chart7Data[0][chart7Data[0].length-1].value);
    
    // init chart8 conclusions
    var notWork = 0;
    var notWork_ter = document.getElementById('terminal2_loc');
    var notWork_num = document.getElementById('notWork_num');	   
    var terminalModellist=chart8Data.data.datamap[years[0]].slice(0,1);        
    var model = terminalModellist[0];
    terminal2_loc.innerHTML = model.branch_name;
    if(checkLeapYear(years[0]) == true)
    	notWork_num.innerHTML = 366 - model.value; 
    else
    	notWork_num.innerHTML = 365 - model.value;           
}     

/**
* 结论联动
* @param {[type]} param [description]
*/
function setConclusions(param){
	var idx = param.currentIndex;
	var year = idx + 2010;
	//set title
	var t_year = document.getElementById('year');
	t_year.innerHTML = year;           

	// set chart1 conclusions
	var opTotal = document.getElementById('opTotal');
    var opAverage = document.getElementById('opAverage');
    opTotal.innerHTML = formatNum(sum(chart1Data[idx]));
    opAverage.innerHTML = formatNum(average(chart1Data[idx]));

	//set chart2 conclusions
	var worknp = document.getElementById('worknp');
    var notWorknp = document.getElementById('notWorknp');
    var work = document.getElementById('work');    
    var notWork = document.getElementById('notWork');
    notWorknp.innerHTML = chart2Data[idx][0].name;
    worknp.innerHTML = chart2Data[idx][chart2Data[idx].length-1].name;
    notWork.innerHTML = chart2Data[idx][0].notWork;
    work.innerHTML = chart2Data[idx][chart2Data[0].length-1].work;

    // set chart3 conclusions
    var npName = document.getElementById('npName');
    var npOperation = document.getElementById('npOperation');
    var npPercent = document.getElementById('npPercent');   
    npName.innerHTML = chart1Data[idx][0].name; 
    npOperation.innerHTML = formatNum(chart1Data[idx][0].value);
    npPercent.innerHTML = ((chart1Data[idx][0].value / sum(chart1Data[idx])) * 100).toFixed(2) + '%';

    // set chart4 conclusions
    var npTerName = document.getElementById('npTerName');
    var npTer = document.getElementById('npTer');
    var npTerPercent = document.getElementById('npTerPercent');   
    npTerName.innerHTML = chart5Data[idx][0].name; 
    npTer.innerHTML = formatNum(chart5Data[idx][0].value); 
    npTerPercent.innerHTML = ((chart5Data[idx][0].value / sum(chart5Data[idx])) * 100).toFixed(2) + '%';

	// set chart5 conclusions
	var npAmount = document.getElementById('npAmount');
    var terminalAmount = document.getElementById('terminalAmount');
    var maxTerminalnp = document.getElementById('maxTerminalnp');
    var maxTerminal = document.getElementById('maxTerminal');
    var maxOperation = document.getElementById('maxOperation');
    npAmount.innerHTML = chart5Data[idx].length;         
    terminalAmount.innerHTML = formatNum(sum(chart5Data[idx]));
    maxTerminalnp.innerHTML = chart5Data[idx][0].name;    
    maxTerminal.innerHTML = formatNum(chart5Data[idx][0].value);
    maxOperation.innerHTML = formatNum(getOperationByName(chart5Data[idx][0].name,chart1Data[idx]));

    // set chart6 conclusions
    var terminal_op = document.getElementById('terminal_op');
    var terminal_loc = document.getElementById('terminal_loc');
    terminal_op.innerHTML = formatNum(chart6Data[idx][0].value);
    terminal_loc.innerHTML = chart6Data[idx][0].branch_name;

    // set chart7 conclusions
    var type_top = document.getElementById('type_top');
    var top = document.getElementById('top');
    var type_low = document.getElementById('type_low');
    var low = document.getElementById('low');
    type_top.innerHTML = chart7Data[idx][0].category;
    top.innerHTML = formatNum(chart7Data[idx][0].value);
    type_low.innerHTML = chart7Data[idx][chart7Data[idx].length-1].category;
    low.innerHTML = formatNum(chart7Data[idx][chart7Data[idx].length-1].value);

    // set chart8 conclusions
    var notWork = 0;
    var notWork_ter = document.getElementById('terminal2_loc');
    var notWork_num = document.getElementById('notWork_num');	   
    var terminalModellist=chart8Data.data.datamap[years[idx]].slice(0,1);        
    var model = terminalModellist[0];
    terminal2_loc.innerHTML = model.branch_name;
    if(checkLeapYear(years[idx]) == true)
    	notWork_num.innerHTML = 366 - model.value; 
    else
    	notWork_num.innerHTML = 365 - model.value;    
}
          

function saveData(res,index){	
	switch(index){
		case 1:{
			years = res.years;   
			 for(var i=0;i<years.length;i++) {        
		        var dataItem = res[years[i]].sort(function(a,b){
		        	return b.value - a.value;
		        });          
		        chart1Data.push(dataItem);
		    };
		    break;
		};
		case 2:{
			years = res.years;   
			for(var i=0;i<years.length;i++) {        
			    var dataItem = res[years[i]].sort(function(a,b){
			    	return b.notWork - a.notWork;
			    });          
				chart2Data.push(dataItem);
			}			
			break;
		};
		case 3:{
			years = res.years;   
			for(var i=0;i<years.length;i++){
				var dataItem = res[years[i]].sort(function(a,b){
					return b.value - a.value;
				});
				chart5Data.push(dataItem);
			}	
			break;		
		};
		case 4:{
			var data=res.data;			
			years = data.yearlist.sort(function(a,b){
				return a - b;
			});						
			for(var i=0;i<years.length;i++){				
				var dataItem = data.datamap[years[i]].sort(function(a,b){
					return a - b;
				});
				chart6Data.push(dataItem);
			}
			break;
		};
		case 5:{
			var data=res.data;			
			years = data.yearlist.sort(function(a,b){
				return a - b;
			});								
			for(var i=0;i<years.length;i++){					
				var dataItem = data.datamap[years[i]].sort(function(a,b){
					return b.value - a.value;
				});
				chart7Data.push(dataItem);
			}
			break;
		};
		case 6:{
			var data=res.data;			
			years = data.yearlist.sort(function(a,b){
				return a - b;
			});	
			chart8Data = res;		
			break;
		}
	}
}

function sum(data){
	var sum = 0;
	for(var i=0;i<data.length;i++)
		sum += data[i].value;
	return sum;	
}

function average(data){
	var s = sum(data);
	return Math.round(s / data.length);
}

function formatNum(num){
	var result = '';
	var arr = [];
	while(num / 10 != 0){
		var digit = num % 10;
		num = Math.floor(num / 10);
		arr.push(digit);
	}
	for(var i=0;i<arr.length;i++){
		var digit = arr[i];
		if(i % 3 == 0 && i != 0)
			result = ',' + result;		
		result = digit + result;	
	}
	return result;
}

function getOperationByName(name,data){
	for(var i=0;i<data.length;i++){
		if(data[i].name == name)
			return data[i].value;
	}
}

// 判断闰年
function checkLeapYear(year) {		
	if(0 == year%400)
		return true;
	if(0 == year%4 && 0 != year%100)
		return true;
	return false;
}

/*** loading动画 ***/
//加载loading
function showLoading() {	
	$('.spinner').show();
}
//结束loading
function hideLoading() {
	$('.spinner').hide();
}
/*** 结束设置 ***/