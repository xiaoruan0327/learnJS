	window.onload = function() {
		waterfall();
	}

	function waterfall() {
		var aBox = document.getElementById('main').getElementsByClassName('box');

		//计算整个页面显示的列数（页面宽/box宽)
		var aBoxW = aBox[0].offsetWidth;
		var cols = Math.floor(document.documentElement.clientWidth/aBoxW);

		//设置main的宽、居中
		// $('#main').css({
		// 	'width' : 'aBoxW *cols',
		// 	'margin': '0 auto'
		// });
		document.getElementById('main').style.cssText = 'width:'+aBoxW *cols + 'px;margin: 0 auto';

		var hArr = []; //存放每一列高度的数组
		for(var i=0;i<aBox.length;i++) {
			if (i<cols) {
				hArr.push(aBox[i].offsetHeight);
			}else {
				var minH = Math.min.apply(null,hArr);
				var index = getMinhIndex(hArr,minH);
				aBox[i].style.position = 'absolute';
				aBox[i].style.top = minH + 'px';
				aBox[i].style.left = aBoxW* index + 'px';
				hArr[index] += aBox[i].offsetHeight;
			}

		}
	}
		


	//模拟后台数据
	var dataInt = {'data':[{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'2.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'2.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'}]};

	//加载
	window.onscroll = function(){
		if(checkScroll) {
			var omain = document.getElementById('main'); //如果这里用JQuery方法，关注DOM对象和JQuery对象的区别


			//将数据块渲染到页面尾部
			for(var i=0;i<dataInt.data.length;i++) {   //dataInt的data的长度？？
				var newBox = document.createElement('div');
				newBox.className = 'box';
				omain.appendChild(newBox);

				var oPic = document.createElement('div');
				oPic.className = 'pic';
				newBox.appendChild(oPic);

				var oImg = document.createElement('img');
				oImg.src = "img/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall();
		}
		
	}

	//获取最小值的索引
	function getMinhIndex(arr,val) {
		for(var i in arr) {
			if(arr[i]==val) {
				return i;
			}
		}
	}

	//判断是否具备滚动加载条件
	function checkScroll(){
		var lastBox = $('.box:last-child');
		var lastBoxH = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var height = document.body.clientHeight || document.documentElement.clientHeight;
		return (lastBoxH< scrollTop+height)?true : false;
	}