 var myChart;
 var option;
 var chartType;
 var timer = null; //主要用于仪表盘等定时器的句柄，每当新的展示需要重置操作
 var isInit = true; //用于初始化处理单独显示的div宽高获取不到的情况
 var isAreaChange = false; //用于判断是否切换了地区
 var yearIndex = 0;
 var hasBrushed = false;

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
        
    //  setMultiCharts();       
    });

	$(".single").css('visibility','visible');
    $(".time_wrap").css('display','none');
    
	$("#distribute").click(function(){        
        showLoading();
        if(option){
            myChart.dispose();
        }        
        var result = [];
        var url = "charts/netpoint/getTerminalAmount";        
        $.ajax({
             type: 'GET',
             url: url,
             dataType: 'json',
             success: function(res) {            	                
                showChart1(res);          
                hideLoading();      
             },
             error: function(err) {
                 alert('获取数据出错，错误为：' + err);
             }
        });                                   
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
                 hideLoading();
             },
             error: function(err) {
                 alert('获取数据出错，错误为：' + err);
             }
         });                       
    });

    $("#use").click(function(){        
        showLoading();
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
                 hideLoading();
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

/*** 配置滚动条 ***/
$(window).on("load",function(){
    $(".left-content").mCustomScrollbar({
        autoHideScrollbar:true,
        theme:"dark-thick"
    });        
});
/*** 结束配置 ***/

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
