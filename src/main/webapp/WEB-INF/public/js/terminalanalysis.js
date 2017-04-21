var myChart;
var myChart1;
var myChart2;
var myChart3;
var option;
var chartType;
var timer = null; //主要用于仪表盘等定时器的句柄，每当新的展示需要重置操作
var isInit = true; //用于初始化处理单独显示的div宽高获取不到的情况
var isAreaChange = false; //用于判断是否切换了地区

$(function() {
	hideLoading();

	myChart = echarts.init(document.getElementById('chartMain'));
	// myChart1 = echarts.init(document.getElementById('chart1'));
	// myChart2 = echarts.init(document.getElementById('chart2'));
	// myChart3 = echarts.init(document.getElementById('chart3'));
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
	$('.industry_wrap').hide();

	//主题点击
	// $('.item').on('click', function() {
	// 	//清除定时器
	// 	clearInterval(timer);
    //
	// 	$('.right-content .single').hide();
	// 	$('.right-content .multi').show();
	// 	$('.sub-item-wrap.active').removeClass('active');
	// 	var self = $(this);
	// 	if(!self.hasClass('active')) {
	// 		$('.sub-' + $('.item.active').data('index')).slideToggle();
	// 		$('.item.active').removeClass('active');
	// 		self.addClass('active');
	// 		$('.sub-' + self.data('index')).slideToggle();
	// 	}
    //
	// 	//	setMultiCharts();
	// });

	$(document).on('click', '.sub-item-wrap .type', function() {
		//清除定时器
		clearInterval(timer);
		myChart.dispose();
		myChart = echarts.init(document.getElementById('chartMain'));
		if(isInit) {
			//这样写是为了能够让echarts能够得到所设置的width，而不是使用默认的width。 设置完毕后进行hide隐藏掉
			$('.right-content .single').css('visibility','visible').hide();
		}

		showLoading();

		$('.sub-item-wrap.active').removeClass('active');
		$(this).parent().addClass('active');


		if(!$('.industry_wrap').is(':hidden')) {
			$('.industry_wrap').hide();
		}
		//加载数据,显示图表
		var url = $(this).data('url');
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'json',
			success: function(res) {
				handleCharts(res);
			},
			error: function(err) {
				alert('获取数据出错，错误为：' + err);
			}
		});
		if($(this).data('no-init')) {
			hideLoading();
			$('.industry_wrap').show();
		}

	});


	/*** 配置滚动条 ***/
	$(window).on("load",function(){
		$(".left-content").mCustomScrollbar({
			autoHideScrollbar:true,
			theme:"dark-thick"
		});

	});
	/*** 结束配置 ***/
});

/**
 * 用于展示echarts图表
 */
function handleCharts(data) {
	$('.right-content .single').show();

	chartType = data.type;

	option = getCharts(data);
	// console.log(option);
	// myChart1.setOption(option[0]);
	// myChart2.setOption(option[1]);
	// myChart3.setOption(option[2]);
	// echarts.connect([myChart1,myChart2,myChart3]);
	myChart.setOption(option[0]);
	myChart.on('timelinechanged', function (params) {
		// console.log(params);
		setConclusion(params.currentIndex,chartType);
	});
	// myChart.setOption(eval('('+ option+')'));

	hideLoading();
	
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