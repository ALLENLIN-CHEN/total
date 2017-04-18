var myChart = new Array(7);
var option;
var years = ['2010','2011','2012','2013','2014','2015'];					//年份

var netpoint = ['孝感市人社局社保大厅1楼','云梦县人社局社保大厅1楼','大悟县人社局三楼','孝南区人社局社保大厅1楼','孝昌县人社局社保大厅1楼',
'安陆县人社局社保大厅1楼','汉川县人社局社保大厅1楼'];
var address = ['孝感市人社局社保大厅1楼','云梦县人社局社保大厅1楼','大悟县人社局三楼','孝南区人社局社保大厅1楼','孝昌县人社局社保大厅1楼',
'安陆县人社局社保大厅1楼','汉川县人社局社保大厅1楼'];
// 网点业务量
var chart1YearData = [];
var chart1Data = [];

// 网点工作状态
var chart2YearData = [];
var chart2Data = [];

var chart5YearData = [];
var chart5Data = [];

var type6 = ['055214DF000005B0','0554AD16000003E9','0554AEEC00001D52','0554AF3B0000218F','0554608B0000002C','0554608B0000004C',
'0554608B0000005C','055214DF001105B0','0554608B0000004C','0554AD16001103E9'];
var chart6YearData = [];
var chart6Data = [];

var type7 = ['手机app','德生宝','微信','自助终端','网上办事大厅'];
var chart7YearData = [];
var chart7Data = [];

var type8 = ['055214DF000005B0','0554AD16000003E9','0554AEEC00001D52','0554AF3B0000218F','0554608B0000002C','0554608B0000004C',
'0554608B0000005C','055214DF001105B0','0554608B0000004C','0554AD16001103E9'];
var chart8YearData = [];
var chart8Data = [];

$(document).ready(function(){		
	// 模拟数据
	for(var i=0;i<6;i++){		
		chart1YearData = [];
		chart2YearData = [];
		chart5YearData = [];		
		chart6YearData = [];
		chart7YearData = [];
		chart8YearData = [];		
		for(var k=0;k<7;k++){
			var val1= Math.floor(Math.random()*100000);
			var record1 = {name:netpoint[k],value:val1};
			chart1YearData.push(record1);

			var val2_notWork = Math.floor(Math.random()*100);
			var val2_work = 365 - val2_notWork;
			chart2YearData.push({name:netpoint[k],work:val2_work,notWork:val2_notWork});

			var val5= Math.floor(Math.random()*4 + 1);
			var record5 = {name:netpoint[k],address:address[k],value:val5};
			chart5YearData.push(record5);			
		}
		for(var j=0;j<10;j++){			
			var val6= Math.floor(Math.random()*10000);
			var idx = Math.floor(Math.random()*6);					
			var record6 = {name:type6[j],address:address[idx],value:val6};
			chart6YearData.push(record6);		

			var val8_notWork = Math.floor(Math.random()*100);
			var val8_work = 365 - val8_notWork;
			chart8YearData.push({name:type8[j],address:address[idx],work:val8_work,notWork:val8_notWork});	
		}		
		for(var k=0;k<5;k++){			
			var val7 = Math.floor(Math.random()*10000000);
			var record7 = {name:type7[k],value:val7};
			chart7YearData.push(record7);
		}
		sortData();
		chart1Data.push(chart1YearData);
		chart2Data.push(chart2YearData);
		chart5Data.push(chart5YearData);
		chart6Data.push(chart6YearData);
		chart7Data.push(chart7YearData);
		chart8Data.push(chart8YearData);
	}
	
	hideLoading();	
	// showLoading();
	// 为所有ECharts图表准备有一定大小的DOM，初始化图表实例
	for(var i=0;i<8;i++){
		echarts.dispose(option);
		var id = 'chart'+(i+1);
		myChart[i] = echarts.init(document.getElementById(id)); 
	}	
	// 绑定所有图表实例
	echarts.connect(myChart);
	// 通过ajax请求获取数据	TODO
	// 缓存获取的数据，包括所有图表的结论
	// 初始化所有结论
	initConclusions();
	// 配置ECharts图表option，并setOption
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
	// $.ajax({
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	url: 'charts/terminal/getStatusOption',
	// 	async: true,
	// 	success: function(res) {					
	// 		option = getChart8(res);	
	// 		myChart[7].setOption(option);
	// 	},
	// 	error: function() {
	// 		alert('获取数据错误');
	// 	}
	// });

	myChart[4].on('timelineChanged',setConclusions);

	
});

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
    opTotal.innerHTML = sum(chart1Data[idx]);
    opAverage.innerHTML = average(chart1Data[idx]);

	//set chart2 conclusions
	var worknp = document.getElementById('worknp');
    var notWorknp = document.getElementById('notWorknp');
    var work = document.getElementById('work');    
    var notWork = document.getElementById('notWork');
    worknp.innerHTML = chart2Data[idx][0].name;
    notWorknp.innerHTML = chart2Data[idx][chart2Data[idx].length-1].name;
    work.innerHTML = chart2Data[idx][0].work;
    notWork.innerHTML = chart2Data[idx][chart2Data[0].length-1].notWork;

    // set chart3 conclusions
    var npName = document.getElementById('npName');
    var npOperation = document.getElementById('npOperation');
    var npPercent = document.getElementById('npPercent');   
    npName.innerHTML = chart1Data[idx][0].name; 
    npOperation.innerHTML = chart1Data[idx][0].value;
    npPercent.innerHTML = ((chart1Data[idx][0].value / sum(chart1Data[idx])) * 100).toFixed(2) + '%';

    // set chart4 conclusions
    var npTerName = document.getElementById('npTerName');
    var npTer = document.getElementById('npTer');
    var npTerPercent = document.getElementById('npTerPercent');   
    npTerName.innerHTML = chart5Data[idx][0].name; 
    npTer.innerHTML = chart5Data[idx][0].value; 
    npTerPercent.innerHTML = ((chart5Data[idx][0].value / sum(chart5Data[idx])) * 100).toFixed(2) + '%';

	// set chart5 conclusions
	var npAmount = document.getElementById('npAmount');
    var terminalAmount = document.getElementById('terminalAmount');
    var maxTerminalnp = document.getElementById('maxTerminalnp');
    var maxTerminal = document.getElementById('maxTerminal');
    var maxOperation = document.getElementById('maxOperation');
    npAmount.innerHTML = netpoint.length;        
    terminalAmount.innerHTML = sum(chart5Data[idx]);
    maxTerminalnp.innerHTML = chart5Data[idx][0].name;    
    maxTerminal.innerHTML = chart5Data[idx][0].value;
    maxOperation.innerHTML = getOperationByName(chart5Data[idx][0].name,chart1Data[idx]);

    // set chart6 conclusions
    var terminal_op = document.getElementById('terminal_op');
    var terminal_loc = document.getElementById('terminal_loc');
    terminal_op.innerHTML = chart6Data[idx][chart6Data[idx].length-1].value;
    terminal_loc.innerHTML = chart6Data[idx][chart6Data[idx].length-1].address;

    // set chart7 conclusions
    var type_top = document.getElementById('type_top');
    var top = document.getElementById('top');
    var type_low = document.getElementById('type_low');
    var low = document.getElementById('low');
    type_top.innerHTML = chart7Data[idx][0].name;
    top.innerHTML = chart7Data[idx][0].value;
    type_low.innerHTML = chart7Data[idx][chart7Data[idx].length-1].name;
    low.innerHTML = chart7Data[idx][chart7Data[idx].length-1].value;

    // set chart8 conclusions
    var notWork_ter = document.getElementById('terminal2_loc');
    var notWork_num = document.getElementById('notWork_num');
    terminal2_loc.innerHTML = chart8Data[idx][chart8Data[idx].length-1].address;
    notWork_num.innerHTML = chart8Data[idx][chart8Data[idx].length-1].notWork;
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
    opTotal.innerHTML = sum(chart1Data[0]);
    opAverage.innerHTML = average(chart1Data[0]);
    //init chart2 conclusions
    var worknp = document.getElementById('worknp');
    var notWorknp = document.getElementById('notWorknp');
    var work = document.getElementById('work');    
    var notWork = document.getElementById('notWork');
    worknp.innerHTML = chart2Data[0][0].name;
    notWorknp.innerHTML = chart2Data[0][chart2Data[0].length-1].name;
    work.innerHTML = chart2Data[0][0].work;
    notWork.innerHTML = chart2Data[0][chart2Data[0].length-1].notWork;

    // init chart3 conclusions
    var npName = document.getElementById('npName');
    var npOperation = document.getElementById('npOperation');
    var npPercent = document.getElementById('npPercent');   
    npName.innerHTML = chart1Data[0][0].name; 
    npOperation.innerHTML = chart1Data[0][0].value; 
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
    npAmount.innerHTML = netpoint.length;        
    terminalAmount.innerHTML = sum(chart5Data[0]);
    maxTerminalnp.innerHTML = chart5Data[0][0].name;    
    maxTerminal.innerHTML = chart5Data[0][0].value;
    maxOperation.innerHTML = getOperationByName(chart5Data[0][0].name,chart1Data[0]);

    // init chart6 conclusions
    var terminal_op = document.getElementById('terminal_op');
    var terminal_loc = document.getElementById('terminal_loc');
    terminal_op.innerHTML = chart6Data[0][0].value;
    terminal_loc.innerHTML = chart6Data[0][0].address;

    // init chart7 conclusions
    var type_top = document.getElementById('type_top');
    var top = document.getElementById('top');
    var type_low = document.getElementById('type_low');
    var low = document.getElementById('low');
    type_top.innerHTML = chart7Data[0][0].name;
    top.innerHTML = chart7Data[0][0].value;
    type_low.innerHTML = chart7Data[0][chart7Data[0].length-1].name;
    low.innerHTML = chart7Data[0][chart7Data[0].length-1].value;
    // init chart8 conclusions
    var notWork_ter = document.getElementById('terminal2_loc');
    var notWork_num = document.getElementById('notWork_num');
    terminal2_loc.innerHTML = chart8Data[0][chart8Data[0].length-1].address;
    notWork_num.innerHTML = chart8Data[0][chart8Data[0].length-1].notWork;
}              

function sortData(){	
	chart1YearData = chart1YearData.sort(function(a,b){
		return b.value - a.value;
	});		
	chart2YearData = chart2YearData.sort(function(a,b){
		return b.work - a.work;
	});
	chart5YearData = chart5YearData.sort(function(a,b){
		return b.value - a.value;
	});
	chart6YearData = chart6YearData.sort(function(a,b){
		return b.value - a.value;
	});
	chart7YearData = chart7YearData.sort(function(a,b){
		return b.value - a.value;
	});
	chart8YearData = chart8YearData.sort(function(a,b){
		return b.value - a.value;
	});
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

function getOperationByName(name,data){
	for(var i=0;i<data.length;i++){
		if(data[i].name == name)
			return data[i].value;
	}
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