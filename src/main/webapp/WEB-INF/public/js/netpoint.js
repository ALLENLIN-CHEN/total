 var myChart;
 var option;
 var chartType;
 var timer = null; //主要用于仪表盘等定时器的句柄，每当新的展示需要重置操作
 var isInit = true; //用于初始化处理单独显示的div宽高获取不到的情况
 var isAreaChange = false; //用于判断是否切换了地区
 var yearIndex = 0;
 var hasBrushed = false;

// name:网点名称，address:网点地址，value：网点的终端数量
 /*var data = 
 [ [
         {name: "应城市人社局社保大厅1楼",address: "应城市人社局社保大厅1楼", value: 4},
         {name: "云梦县人社局社保大厅1楼",address: "云梦县人社局社保大厅1楼", value: 2},
         {name: "大悟县人社局三楼",address: "大悟县人社局三楼", value: 1},
         {name: "孝南区人社局社保大厅1楼",address: "孝南区人社局社保大厅1楼", value: 3},
         {name: "孝昌县人社局社保大厅1楼",address: "孝昌县人社局社保大厅1楼", value: 4},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 5},
         {name: "汉川县人社局社保大厅1楼",address: "汉川县人社局社保大厅1楼", value: 1}       
 ],[
         {name: "应城市人社局社保大厅1楼",address: "应城市人社局社保大厅1楼", value: 1},
         {name: "云梦县人社局社保大厅1楼",address: "云梦县人社局社保大厅1楼", value: 2},
         {name: "大悟县人社局三楼",address: "大悟县人社局三楼", value: 4},
         {name: "孝南区人社局社保大厅1楼",address: "孝南区人社局社保大厅1楼", value: 3},
         {name: "孝昌县人社局社保大厅1楼",address: "孝昌县人社局社保大厅1楼", value: 1},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 5},
         {name: "汉川县人社局社保大厅1楼",address: "汉川县人社局社保大厅1楼", value: 2}       
 ],[
         {name: "应城市人社局社保大厅1楼",adress:"应城市人社局社保大厅1楼", value: 1},
         {name: "云梦县人社局社保大厅1楼",address: "云梦县人社局社保大厅1楼", value: 2},
         {name: "大悟县人社局三楼",address: "大悟县人社局三楼", value: 3},
         {name: "孝南区人社局社保大厅1楼",address: "孝南区人社局社保大厅1楼", value: 4},
         {name: "孝昌县人社局社保大厅1楼",address: "孝昌县人社局社保大厅1楼", value: 5},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 3},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 1}       
 ],[
         {name: "应城市人社局社保大厅1楼",address: "应城市人社局社保大厅1楼", value: 4},
         {name: "云梦县人社局社保大厅1楼",address: "云梦县人社局社保大厅1楼", value: 2},
         {name: "大悟县人社局三楼",address: "大悟县人社局三楼", value: 1},
         {name: "孝南区人社局社保大厅1楼",address: "孝南区人社局社保大厅1楼", value: 3},
         {name: "孝昌县人社局社保大厅1楼",address: "孝昌县人社局社保大厅1楼", value: 4},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 5},
         {name: "汉川县人社局社保大厅1楼",address: "汉川县人社局社保大厅1楼", value: 1}       
 ],[
         {name: "应城市人社局社保大厅1楼",address: "应城市人社局社保大厅1楼", value: 1},
         {name: "云梦县人社局社保大厅1楼",address: "云梦县人社局社保大厅1楼", value: 2},
         {name: "大悟县人社局三楼",address: "大悟县人社局三楼", value: 4},
         {name: "孝南区人社局社保大厅1楼",address: "孝南区人社局社保大厅1楼", value: 3},
         {name: "孝昌县人社局社保大厅1楼",address: "孝昌县人社局社保大厅1楼", value: 1},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 5},
         {name: "汉川县人社局社保大厅1楼",address: "汉川县人社局社保大厅1楼", value: 2}       
 ],[
         {name: "应城市人社局社保大厅1楼",adress:"应城市人社局社保大厅1楼", value: 1},
         {name: "云梦县人社局社保大厅1楼",address: "云梦县人社局社保大厅1楼", value: 2},
         {name: "大悟县人社局三楼",address: "大悟县人社局三楼", value: 3},
         {name: "孝南区人社局社保大厅1楼",address: "孝南区人社局社保大厅1楼", value: 4},
         {name: "孝昌县人社局社保大厅1楼",address: "孝昌县人社局社保大厅1楼", value: 5},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 3},
         {name: "安陆县人社局社保大厅1楼",address: "安陆县人社局社保大厅1楼", value: 1}       
 ]]*/

//	测试第二个需求
/*var test2 = 
[ [
	{name:'大悟县人社局三楼',work:310,notWork:55},
	{name:'汉川县人社局社保大厅1楼',work:211,notWork:154},
	{name:'应城市人社局社保大厅1楼',work:320,notWork:45},
	{name:'孝南区人社局社保大厅1楼',work:350,notWork:15},
	{name:'孝昌县人社局社保大厅1楼',work:280,notWork:85},
	{name:'安陆县人社局社保大厅1楼',work:300,notWork:65},
	{name:'云梦县人社局社保大厅1楼',work:330,notWork:35}
],[
	{name:'安陆县人社局社保大厅1楼',work:310,notWork:55},
	{name:'汉川县人社局社保大厅1楼',work:211,notWork:154},
	{name:'孝南区人社局社保大厅1楼',work:320,notWork:45},
	{name:'大悟县人社局三楼',work:350,notWork:15},
	{name:'孝昌县人社局社保大厅1楼',work:280,notWork:85},
	{name:'应城市人社局社保大厅1楼',work:300,notWork:65},
	{name:'云梦县人社局社保大厅1楼',work:330,notWork:35}
],[
	{name:'大悟县人社局三楼',work:310,notWork:55},
	{name:'汉川县人社局社保大厅1楼',work:211,notWork:154},
	{name:'安陆县人社局社保大厅1楼',work:320,notWork:45},
	{name:'孝南区人社局社保大厅1楼',work:350,notWork:15},
	{name:'孝昌县人社局社保大厅1楼',work:280,notWork:85},
	{name:'应城市人社局社保大厅1楼',work:300,notWork:65},
	{name:'云梦县人社局社保大厅1楼',work:330,notWork:35}
],[
	{name:'云梦县人社局社保大厅1楼',work:310,notWork:55},
	{name:'大悟县人社局三楼',work:211,notWork:154},
	{name:'应城市人社局社保大厅1楼',work:320,notWork:45},
	{name:'汉川县人社局社保大厅1楼',work:350,notWork:15},
	{name:'孝昌县人社局社保大厅1楼',work:280,notWork:85},
	{name:'安陆县人社局社保大厅1楼',work:300,notWork:65},
	{name:'孝南区人社局社保大厅1楼',work:330,notWork:35}
],[
	{name:'大悟县人社局三楼',work:310,notWork:55},
	{name:'应城市人社局社保大厅1楼',work:211,notWork:154},
	{name:'汉川县人社局社保大厅1楼',work:320,notWork:45},
	{name:'孝南区人社局社保大厅1楼',work:350,notWork:15},
	{name:'云梦县人社局社保大厅1楼',work:280,notWork:85},
	{name:'安陆县人社局社保大厅1楼',work:300,notWork:65},
	{name:'孝昌县人社局社保大厅1楼',work:330,notWork:35}
],[
	{name:'汉川县人社局社保大厅1楼',work:310,notWork:55},
	{name:'孝南区人社局社保大厅1楼',work:211,notWork:154},
	{name:'应城市人社局社保大厅1楼',work:320,notWork:45},
	{name:'大悟县人社局三楼',work:350,notWork:15},
	{name:'孝昌县人社局社保大厅1楼',work:280,notWork:85},
	{name:'安陆县人社局社保大厅1楼',work:300,notWork:65},
	{name:'云梦县人社局社保大厅1楼',work:330,notWork:35}
]]*/

// 测试第三个需求
// var test3 = 
// [ 
// [
//     {name:'大悟县人社局三楼',value:491},
//     {name:'汉川县人社局社保大厅1楼',value:388},
//     {name:'应城市人社局社保大厅1楼',value:510},
//     {name:'孝南区人社局社保大厅1楼',value:299},
//     {name:'孝昌县人社局社保大厅1楼',value:312},
//     {name:'安陆县人社局社保大厅1楼',value:499},
//     {name:'云梦县人社局社保大厅1楼',value:190}
// ],
// [   
//     {name:'孝昌县人社局社保大厅1楼',value:491},
//     {name:'汉川县人社局社保大厅1楼',value:388},
//     {name:'应城市人社局社保大厅1楼',value:510},
//     {name:'孝南区人社局社保大厅1楼',value:499},
//     {name:'云梦县人社局社保大厅1楼',value:312},
//     {name:'安陆县人社局社保大厅1楼',value:299},
//     {name:'大悟县人社局三楼',value:190}
// ],
// [
//     {name:'云梦县人社局社保大厅1楼',value:491},
//     {name:'大悟县人社局三楼',value:312},
//     {name:'应城市人社局社保大厅1楼',value:388},
//     {name:'孝南区人社局社保大厅1楼',value:299},
//     {name:'汉川县人社局社保大厅1楼',value:510},
//     {name:'安陆县人社局社保大厅1楼',value:499},
//     {name:'孝昌县人社局社保大厅1楼',value:190}
// ],
// [
//     {name:'安陆县人社局社保大厅1楼',value:491},
//     {name:'汉川县人社局社保大厅1楼',value:388},
//     {name:'应城市人社局社保大厅1楼',value:510},
//     {name:'孝南区人社局社保大厅1楼',value:299},
//     {name:'孝昌县人社局社保大厅1楼',value:312},
//     {name:'大悟县人社局三楼',value:499},
//     {name:'云梦县人社局社保大厅1楼',value:190}
// ],
// [
//     {name:'云梦县人社局社保大厅1楼',value:299},
//     {name:'汉川县人社局社保大厅1楼',value:388},
//     {name:'应城市人社局社保大厅1楼',value:510},
//     {name:'大悟县人社局三楼',value:491},
//     {name:'孝昌县人社局社保大厅1楼',value:312},
//     {name:'安陆县人社局社保大厅1楼',value:499},
//     {name:'孝南区人社局社保大厅1楼',value:190}
// ],
// [
//     {name:'汉川县人社局社保大厅1楼',value:491},
//     {name:'安陆县人社局社保大厅1楼',value:388},
//     {name:'大悟县人社局三楼',value:510},
//     {name:'孝南区人社局社保大厅1楼',value:299},
//     {name:'应城市人社局社保大厅1楼',value:312},
//     {name:'孝昌县人社局社保大厅1楼',value:499},
//     {name:'云梦县人社局社保大厅1楼',value:190}
// ]
// ]

$(function() {
    hideLoading();    
/***********************************************************************************************************/   
    $(".tablesorter").tablesorter();

    //When page loads...
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content

    //On Click Event
    $("ul.tabs li").click(function() {

        $("ul.tabs li").removeClass("active ");//Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content

        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
    });

    $('.column').equalHeight();
/***********************************************************************************************************/
    
    //主题点击
    $('.item').on('click', function() {
        //清除定时器
        clearInterval(timer);
        
        $('.right-content .single').hide();
        $('.right-content .multi').show();
        $('.sub-item-wrap.active').removeClass('active');
        var self = $(this);
        if(!self.hasClass('active')) {
            $('.sub-' + $('.item.active').data('index')).slideToggle();
            $('.item.active').removeClass('active');
            self.addClass('active');
            $('.sub-' + self.data('index')).slideToggle();
        }    
    });

	$(".single").css('visibility','visible');
    $(".time_wrap").css('display','none');
    
	$("#distribute").click(function(){        
        showLoading();
        if(option){
            myChart.dispose();
        }        
        var result = [];
        var url = "/charts/netpoint/getTerminalAmount";        
        $.ajax({
             type: 'GET',
             url: url,
             dataType: 'json',
             success: function(res) {            	
                 showChart1(res);                
             },
             error: function(err) {
                 alert('获取数据出错，错误为：' + err);
             }
        });             
        hideLoading();                
    });	

    $("#state").click(function(){      
        showLoading();
        if(option){
            myChart.dispose();
        }    
        var result = [];
        var url = 'charts/netpoint/getWorkState';
        $.ajax({
             type: 'GET',
             url: url,
             dataType: 'json',
             success: function(res) {
            	 showChart2(res);
             },
             error: function(err) {
                 alert('获取数据出错，错误为：' + err);
             }
         });               
        hideLoading();    
    });

    $("#use").click(function(){        
        if(option){
            myChart.dispose();
        }            
        var result = [];
        var url = 'charts/netpoint/getOperationAmount';
        $.ajax({
             type: 'GET',
             url: url,
             dataType: 'json',
             success: function(res) {
            	 showChart3(res);
             },
             error: function(err) {
                 alert('获取数据出错，错误为：' + err);
             }
        });        
    });
});

/**
 * 渲染各图表
 * @returns
 */
function showChart1(res){
	myChart = echarts.init(document.getElementById('chartMain')); 
    option = getMap(res);          //获取option
    myChart.setOption(option);
}

function showChart2(res){
	myChart = echarts.init(document.getElementById('chartMain')); 
    option = getBar(res);          //获取option
    myChart.setOption(option);
}

function showChart3(res){
	myChart = echarts.init(document.getElementById('chartMain')); 
    option = getLine(res);          //获取option
    myChart.setOption(option);
}




// 处理刷选的点
/*function renderBrushed(params) {
    var mainSeries = params.batch[0].selected[0]; //选取第一系列

    var selectedItems = [];
    var categoryData = [];
    var barData = [];
    var maxBar = 30;
    var sum = 0;
    var count = 0;    
    if(mainSeries.dataIndex.length < 1)return;
    else hasBrushed = true;    	    
    //dataIndex是选中点的下标数组
    console.log(mainSeries.dataIndex.length);
    for (var i = 0; i < mainSeries.dataIndex.length; i++) {
        var rawIndex = mainSeries.dataIndex[i];
        var dataItem = convertData(data[yearIndex])[rawIndex];
        var pmValue = dataItem.value[2];

        sum += pmValue;
        count++;

        selectedItems.push(dataItem);		
    }

    selectedItems.sort(function (a, b) {
        return a.value[2] - b.value[2];
    });

    for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
        categoryData.push(selectedItems[i].name);
        barData.push(selectedItems[i].value[2]);

        console.log(selectedItems[i].name);
        console.log(selectedItems[i].value[2]);
    }
   	for(var i=0;i<barData.length;i++){
   		console.log(barData[i]);
   	}
   	console.log(this);
    this.setOption({        
        yAxis: {
            data: categoryData
        },
        xAxis: {
            axisLabel: {show: !!count}
        },       
        series: {
            id: 'bar',          
            data: barData
        }
    });    
}*/

// 根据时间获取数据
/*function reloadDataBytimeLine(timeLineData){		
    yearIndex = timeLineData.currentIndex;		//从0开始，获取年份需要改变                  
}*/




// /***********************************************************************************************************/	
// 	$(".tablesorter").tablesorter();

// 	//When page loads...
// 	$(".tab_content").hide(); //Hide all content
// 	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
// 	$(".tab_content:first").show(); //Show first tab content

// 	//On Click Event
// 	$("ul.tabs li").click(function() {

// 		$("ul.tabs li").removeClass("active ");//Remove any "active" class
// 		$(this).addClass("active"); //Add "active" class to selected tab
// 		$(".tab_content").hide(); //Hide all tab content

// 		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
// 		$(activeTab).fadeIn(); //Fade in the active ID content
// 		return false;
// 	});

// 	$('.column').equalHeight();

// 	/**
// 	 * 用于设定地区按钮的选择
// 	 */
// 	$(document).on('click', '.area-wrap .btn', function() {
// 		if(!$(this).hasClass('active')) {
// 			$('.area-wrap .btn.active').removeClass('active');
// 			$(this).addClass('active');
			
// 			isAreaChange = true;
// 		}
// 	});
	
// 	/**
// 	 * 绑定时间查询的确定按钮
// 	 */
// 	$(document).on('click', '.time_wrap .search', function() {
// 		showLoading();
		
// 		var startTime = $('.startTime').val() - 0;
// 		var endTime = $('.endTime').val() - 0;
// 		if(endTime < startTime) {
// 			alert('起始时间不能大于结束时间！');
// 			hideLoading();
// 			return;
// 		}
		
// 		var url = $('.sub-item-wrap.active .type').data('url');
// 		var params = {
// 				startTime: startTime,
// 				endTime: endTime
// 		}
				
// 		$.ajax({
// 			type: 'GET',
// 			url: url,
// 			dataType: 'json',
// 			data: params,
// 			success: function(res) {
// 				handleCharts(res);
// 			},
// 			error: function(err) {
// 				alert('获取数据出错，错误为：' + err);
// 			}
// 		});
// 	});
	
		
// 	/*** 配置滚动条 ***/
	$(window).on("load",function(){
		$(".left-content").mCustomScrollbar({
			autoHideScrollbar:true,
			theme:"dark-thick"
		});
		
	});
	/*** 结束配置 ***/
// });

/*** loading动画 ***/
// 加载loading
function showLoading() {
    $('.spinner').show();
}
//结束loading
function hideLoading() {
    $('.spinner').hide();
}
/*** 结束设置 ***/


// /**
//  * 用于展示echarts图表
//  */
// function handleCharts(data) {
// 	$('.right-content .single').show();
	
// 	chartType = data.type;
	
// 	option = getChart(data);
	
// 	myChart.setOption(option);

// 	hideLoading();
	
// 	myChart.off('timelinechanged',changeLegendShowByTimeLine);
	
// 	if(data.type === 'CLINIC_GAUGE') {
// 		var dataIndex = 1; //用于记录数据的展示索引
// 		var year = 2011;
// 		var area = $('.area-wrap .btn.active').html();
		
// 		timer = setInterval(function() {
// 			if(isAreaChange) {
// 				area = $('.area-wrap .btn.active').html();
// 				isAreaChange = !isAreaChange;
// 				dataIndex = 0;
// 				year = 2010;
// 			}
// 			if(dataIndex >= data.coverage[area].length) {
// 				dataIndex = 0;
// 			}
			
// 			if(year >= 2015) {
// 				year = 2010;
// 			}
			
// 			option.series[0].data[0] = {
// 				value : data.coverage[area][dataIndex],
// 				name : area
// 			};
// 			option.series[0].detail.formatter = year + "年覆盖率{value}%";
// 			dataIndex++;
// 			year++;
// 			myChart.setOption(option, true);
// 		}, 2000);
// 	} else if(data.type === 'CLINIC_FUNNEL') {
// 		myChart.on('timelinechanged',changeLegendShowByTimeLine);
// 	} else if(data.type === 'CLINIC_BAR_HOSPITAL_TOTAL') {
// 		myChart.on('timelinechanged',changeLegendShowByTimeLine);
// 	} else if(data.type === 'CLINIC_BAR_DEPARTMENT_TOTAL') {
// 		myChart.on('timelinechanged',changeLegendShowByTimeLine);
// 	} else if(data.type === 'CLINIC_BAR_DOCTOR_TOTAL') {
// 		myChart.on('timelinechanged',changeLegendShowByTimeLine);
// 	} 
// }

// /**
//  * 用于处理时间轴的为0的legend不显示的情况
//  */
// function changeLegendShowByTimeLine(timeLineData) {
// 	if(chartType === 'CLINIC_FUNNEL') {
// 		var legends = ['0-6岁（儿童）', '7-40（青少年）', '41-65（中年）', '66以上（老年）'];
// 		var setting = {};
// 		var index = timeLineData.currentIndex;
// 		var sData = option.options[index].series[0].data;
// 		for(var i = 0; i < sData.length; i++) {
// 			if(sData[i].value <= 0) {
// 				setting[sData[i].name] = false;
// 			}else {
// 				setting[sData[i].name] = true;
// 			}
// 		}
// 		option.baseOption.legend.selected = setting;
// 		myChart.setOption(option);
// 	} else if(chartType === 'CLINIC_BAR_HOSPITAL_TOTAL') {
// 		var legends = [];
// 		var index = timeLineData.currentIndex;
// 		legends = option.extended[2010 + index];
// 		option.baseOption.xAxis[0].data = legends;
// 		myChart.setOption(option);
// 	} else if(chartType == 'CLINIC_BAR_DEPARTMENT_TOTAL') {
// 		var legends = [];
// 		var index = timeLineData.currentIndex + 2010;		
// 		option.baseOption.tooltip.formatter = function(v) {
// 			var i = v[0].dataIndex;
// 			return option.extended.tipcontent[index][i];
// 		};
// 		myChart.setOption(option);
// 	} else if(chartType =='CLINIC_BAR_DOCTOR_TOTAL'){
// 		var legends = [];
// 		var index = timeLineData.currentIndex + 2010;		
// 		option.baseOption.tooltip.formatter = function(v) {
// 			var i = v[0].dataIndex;
// 			return option.extended.tipcontent[index][i];
// 		};
// 		myChart.setOption(option);
// 	}
// }



// /**
//  * 用于处理不同类型的图表
//  */
// function getChart(data) {
// 	if(data.type === 'CLINIC_BAR_X') {
// 		return getBar(data);
// 	}else if(data.type === 'CLINIC_LINE') {
// 		return getLine(data);
// 	} else if(data.type === 'CLINIC_GAUGE') {
// 		$('.area-wrap').show();
// 		return getGauge(data);
// 	} else if(data.type === 'CLINIC_FUNNEL') {
// 		return getFunnel(data);
// 	} else if(data.type === 'CLINIC_BAR_HOSPITAL_TOTAL') {
// 		return getHospitalTotal(data);
// 	} else if(data.type === 'CLINIC_BAR_DEPARTMENT_TOTAL') {
// 		return getDepartmentTotal(data);
// 	}  else if(data.type === 'CLINIC_BAR_DOCTOR_TOTAL') {
// 		return getDoctorTotal(data);
// 	}
// }
// /***********************************/
