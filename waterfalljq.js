$(window).on('load',function(){
	waterfall();

	var dataInt = {'data':[{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'2.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'2.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'}]};

	$(window).on('scroll',function() {
		if(checkScroll) {
			$.each(dataInt.data,function(key,value) {
				var newBox = $('<div>').addClass('box').appendTo($('#main'));  //创建div
				var newPic = $('<div>').addClass('pic').appendTo($(newBox));
				var newImg = $('<img>').attr('src','img/'+$(value).attr('src'));
				newImg.appendTo($(newPic));
			})
			waterfall();
		}
	})
})

function waterfall() {

	var boxs = $('#main>div');
	var w = boxs.eq(0).outerWidth(); //列宽
	var cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');   //不需要单位px，设置宽
	
	var hArr = [];

	boxs.each(function(index,value) {  //value是DOM对象不能使用JQuery的任何方法
		var h = boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);  //getMinhIndex(),获取最小值索引
			$(value).css({  //用$转换成JQuery对象
				'position' : 'absolute',
				'top'      : minH + 'px',
				'left'     : minHIndex*w + 'px'
			})
			hArr[minHIndex] += boxs.eq(index).outerHeight();
		}
	})
	console.log(hArr);
}


function checkScroll() {
	var lastBox = $('#main>div').last();
	var lastBoxDis = lastBox.offset().top + Math.floor(lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return(lastBoxDis<scrollTop+documentH)?true:false;
}