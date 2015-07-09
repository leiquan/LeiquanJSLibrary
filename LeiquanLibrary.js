//This library is built by Leiquan during learning and working.

//You Should Use These Method After Create A New Object By These Classes!

//计算天数差的函数，通用  
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式

	var  aDate,  oDate1,  oDate2,  iDays;

	aDate  =  sDate1.split("-");
	oDate1  =  new  Date(aDate[0]  ,  aDate[1]  ,  aDate[2]);//转换为12-18-2002格式
	aDate  =  sDate2.split("-");
	oDate2  =  new  Date(aDate[0] ,    aDate[1]  ,    aDate[2]);

	iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);//把相差的毫秒数转换为天数
	return  iDays+1;
}

//ClassSwitchTool
var ClassSwitchTool = function(oSwitchBox, aImgUrls) {
	
	var self = this;

	

	this.switchBox = oSwitchBox;
	this.imgUrls = aImgUrls;
	this.imgList = [];
	this.btnList = [];
	this.nowImg = 0;
	this.timer = null;
	this.moveCallback = null;
	
	this.autoPlayFlag = false;
	this.btnFlag = false;
	this.preNextFlag = false;


	this.width = "500px";
	this.height = "300px";

	this.init = function() {
		this.switchBox.style.width = this.width;
		this.switchBox.style.height = this.height;
		this.switchBox.style.backgroundColor = this.backgroundColor;
		this.switchBox.style.position = "relative";
		this.switchBox.style.overflow = "hidden";

		for (var i = 0; i < aImgUrls.length; i++) {
			var img = new Image();
			img.src = this.imgUrls[i];
			img.style.position = "absolute";
			img.style.display = "none";
			img.style.top = "0px";
			img.style.left = "0px";
			img.style.width = this.width;
			img.style.height = this.height;
			this.imgList.push(img);
			this.switchBox.appendChild(this.imgList[i]);
		}
		this.imgList[0].style.display = "block";

	}
	this.init();

	this.move = function(target) {

		console.log("目前图片" + self.nowImg + "目标图片" + target);

		clearInterval(self.timer);

		this.imgList[target].style.left = "500px";
		this.imgList[target].style.display = "block";

		var timer = setInterval(function() {
			if (self.imgList[self.nowImg].style.left == "-500px") {
				console.log("滑动到头，停止");
				clearInterval(timer);
				self.imgList[self.nowImg].style.display = "none";
				self.nowImg = target;
				self.timer = setInterval(self.moveCallback, 3000);
				//alert("恢复");
			} else {

				if (self.btnFlag == true) {
					//清空按钮色
					for (var i = 0; i < self.btnList.length; i++) {
						self.btnList[i].style.backgroundColor = "green";
					}
					self.btnList[target].style.backgroundColor = "yellow";
				}

				//移动自身
				self.imgList[self.nowImg].style.left = (self.imgList[self.nowImg].offsetLeft - 10) + "px";
				//移动目标
				self.imgList[target].style.left = (self.imgList[target].offsetLeft - 10) + "px";
			}
		}, 20);

		console.log("正在播放" + this.nowImg + "，这里是从0开始");
	}

	this.addPreNext = function(width, height, imgPre, imgNext) {

		var pre = null;
		var next = null;

		if (imgPre != null && imgNext != null) {
			pre = document.createElement("img");
			pre.style.width = width;
			pre.style.height = height;

			pre.src = imgPre;

			next = document.createElement("img");
			next.style.width = width;
			next.style.height = height;

			next.src = imgNext;
		} else {
			pre = document.createElement("div");
			pre.style.width = width;
			pre.style.height = height;
			pre.style.backgroundColor = "red";

			next = document.createElement("div");
			next.style.width = width;
			next.style.height = height;
			next.style.backgroundColor = "red";

		}
		pre.style.position = "absolute";
		pre.style.left = "50px";
		next.style.position = "absolute";
		next.style.right = "50px";
		this.switchBox.appendChild(pre);
		this.switchBox.appendChild(next);
		pre.addEventListener("click", function() {
			
			if(self.nowImg!=0){
				self.move(self.nowImg - 1);
			}else{
					self.move(self.imgList.length-1);
			}

			
		}, false);
		next.addEventListener("click", function() {
			if(self.nowImg!=(self.imgList.length-1)){
				self.move(self.nowImg +1);
			}else{
					self.move(0);
			}
		}, false);



	}

	this.addBtn = function() {
		this.btnFlag = true;

		var btnContent = document.createElement("div");
		btnContent.style.width = this.width;
		btnContent.style.height = "50px";
		btnContent.style.position = "absolute";
		btnContent.style.top = "250px";
		btnContent.style.opacity = "0.5";
		btnContent.style.backgroundColor = "red";

		this.switchBox.appendChild(btnContent);

		for (var i = 0; i < this.imgList.length; i++) {

			var btn = document.createElement("div");
			btn.style.width = "20px";
			btn.style.height = "20px";
			btn.style.backgroundColor = "green";
			btn.style.styleFloat = "left";
			btn.style.cursor = "pointer";
			btn.style.margin = "15px 10px";
			btn.index = i;
			btn.className = "switchBtn";
			this.btnList.push(btn);

			btnContent.appendChild(btn);

		}

		this.btnList[0].style.backgroundColor = "yellow";

		btnContent.addEventListener("click", function(e) {

			if (self.imgList[self.nowImg].offsetLeft % 500 == 0) {

				if (e.target.className == "switchBtn") {

					if (e.target.index != self.nowImg) {

						//clearInterval(self.timer);

						self.move(e.target.index);
					}

				}

			}

		}, false);


	}

	this.autoPlay = function() {
		this.autoPlayFlag = true;

		this.moveCallback = function() {

			if (self.nowImg == (self.imgList.length - 1)) {
				self.move(0);
			} else {
				self.move(self.nowImg + 1);
			}

		}

		self.timer = setInterval(self.moveCallback, 3000);
	}

}



//ClassDialogBase
var ClassDialogBase = function() {

	var self = this;

	this.dialogBase = document.createElement("div");
	this.dialogBase.style.width = "350px";
	this.dialogBase.style.height = "200px";
	this.dialogBase.style.backgroundColor = "#DDD";
	this.dialogBase.style.borderRadius = "10px";
	this.dialogBase.style.position = "absolute";
	this.dialogBase.style.zIndex = "100";
	this.dialogBase.style.left = (new ClassScreenTool().getNowWidth() - 350) / 2 + "px";

	this.show = function() {
		document.body.appendChild(this.dialogBase);
	}

	this.hide = function() {
		document.body.removeChild(this.dialogBase);
	}

}

//ClassDialogPrompt
var ClassDialogPrompt = function() {

	var self = this;

	this.temp = ClassDialogBase;
	this.temp();
	delete this.temp;



	this.trueBtn = document.createElement("input");
	this.trueBtn.type = "button";
	this.trueBtn.value = "Yes";
	this.trueBtn.style.width = "100px";
	this.trueBtn.style.height = "50px";
	this.trueBtn.style.border = "none";
	this.trueBtn.style.backgroundColor = "#CCC";
	this.trueBtn.style.borderRadius = "5px";
	this.trueBtn.style.position = "absolute";
	this.trueBtn.style.left = "50px";
	this.trueBtn.style.top = "140px";

	this.falseBtn = document.createElement("input");
	this.falseBtn.type = "button";
	this.falseBtn.value = "No";
	this.falseBtn.style.width = "100px";
	this.falseBtn.style.border = "none";
	this.falseBtn.style.height = "50px";
	this.falseBtn.style.backgroundColor = "#CCC";
	this.falseBtn.style.borderRadius = "5px";
	this.falseBtn.style.position = "absolute";
	this.falseBtn.style.left = "200px";
	this.falseBtn.style.top = "140px";

	this.dialogBase.appendChild(this.trueBtn);
	this.dialogBase.appendChild(this.falseBtn);

	this.tureCallback = function(tureCallback) {
		self.trueBtn.addEventListener("click", function() {
			tureCallback();
		}, false);
	}

	this.falseCallback = function(falseCallback) {
		self.falseBtn.addEventListener("click", function() {
			falseCallback();
		}, false);
	}

}

var ClassDialogFile = function() {

	var self = this;

	this.temp = ClassDialogPrompt;
	this.temp();
	delete this.temp;

	this.fileInput = document.createElement("input");
	this.fileInput.type = "file";
	this.fileInput.style.width = "300px";
	this.fileInput.style.height = "30px";
	this.fileInput.style.backgroundColor = "#CCC";
	this.fileInput.style.position = "absolute";
	this.fileInput.style.left = "25px";
	this.fileInput.style.top = "60px";

	this.dialogBase.appendChild(this.fileInput);



}

var ClassPainter = function(canvasId) {

	this.context = document.getElementById(canvasId).getContext("2d");

	this.sector = function(x, y, radius, sDeg, eDeg, color) {

		var sDeg = Math.PI / 180 * sDeg;
		var eDeg = Math.PI / 180 * eDeg;

		// 保存
		this.context.save();

		// 位移到目标点.
		this.context.translate(x, y);
		this.context.beginPath();

		// 画出圆弧
		this.context.arc(0, 0, radius, sDeg, eDeg);

		// 再次保存以备旋转
		this.context.save();

		// 旋转至起始角度
		this.context.rotate(eDeg);

		// 移动到终点，准备连接终点与圆心
		this.context.moveTo(radius, 0);

		// 连接到圆心
		this.context.lineTo(0, 0);

		// 还原
		this.context.restore();

		// 旋转至起点角度
		this.context.rotate(sDeg);

		// 从圆心连接到起点
		this.context.lineTo(radius, 0);
		this.context.closePath();

		// 还原到最初保存的状态
		this.context.restore();

		this.context.fillStyle = color;
		this.context.fill();
	}




}

//Class RequireTool
var ClassRequireTool = function() {
	this.require = function(sPath, fnCallback) {
		//ajax得到代码，插入代码，那怎么解决依赖问题呢？加载完毕后就可以执行fnCallback了不是吗？
		//格式约定
		//若是通过<script>来加载，那么就能立即执行，只需要指定回掉函数就行。
		//思路:
		//1 首先载入代码，这个代码需要遵循jsonP格式，格式定义：被require的代码必须写在回掉函数的参数内
		//2 代码载入后，就会自动运行calaback，以此来实现依赖注入

		var script = document.createElement("script");
		if (sPath) { //这里判断下结尾是不是.js，不是的就自动加上，先不写

			//首先添加执行回掉
			var callbackFunctionScript = document.createElement("script");

			//callbackFunctionScript.innerHTML+="function "+sPath+"(){";
			//要在这里去掉匿名函数fnCallback的首位才可以正常运行
			//正则表达式替换
			//var re=/^function()/;

			//alert(fnCallback.toString());

			callbackFunctionScript.innerHTML += fnCallback;

			//callbackFunctionScript.innerHTML+="}";

			document.body.appendChild(callbackFunctionScript);

			script.src = sPath + ".js";
			document.body.appendChild(script);

		}

	}
}


//AnimationTool
var ClassAnimationTool = function() {
	this.numberGrow = function(oDiv, iNumber) {
		var start = iNumber - 20;
		var timer = setInterval(function() {
			start++;
			if (start == iNumber) {
				clearInterval(timer);
			} else {
				oDiv.innerHTML = start;
			}

		}, 50);
	}
	this.move = function(oDiv, sProperty, sValue, iTime, iStep) {

		//oDiv.style.sProperty

		//定时器

		var timer = setInterval(function() {
			//这里渐变，并且需要缓冲运动
		}, iTime / iStep);

	}
}

//RegExp Tool
var ClassRegExpTool = function() {
	this.isEmail = function(s) {
		var reg = /^\w+@[a-z0-9]+\.[a-z0-9]{2,4}$/; //注意要对行首和行尾做判断！

		if (reg.test(s)) {
			alert("正确");
		} else {
			alert("cuowu");
		}
	}
}


//Operating Tool
var ClassOperatingTool = function() {
	this.setDrag = function(oDiv) {
		oDiv.addEventListener("mousedown", function(ev) {
			var oEvent = ev || event;
			//偏移量
			var disX = oEvent.clientX - oDiv.offsetLeft;
			var disY = oEvent.clientY - oDiv.offsetTop;

			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				oDiv.style.left = oEvent.clientX - disX + "px";
				oDiv.style.top = oEvent.clientY - disY + "px";
			}

			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			}


		}, false);
	}

	this.scrollUpOrDown = function(oDiv, fnUp, fnDown) {
		window.onmousewheel = function(ev) {
			var oEvent = ev || event;
			alert(oEvent.wheelDelta);
		}
	}


	this.addCover = function(oDiv) {
		var width = oDiv.offsetWidth;
		var height = oDiv.offsetHeight;

		console.log("width" + width);
		console.log("height" + height);

		var cover = document.createElement("div");
		cover.style.width = width + "px";
		cover.style.height = height + "px";
		cover.style.backgroundColor = "#000";
		cover.style.opacity = "0.5";

		if (oDiv.style.position == "absolute" || oDiv.style.position == "relative") {
			cover.style.position = "absolute";
			cover.style.top = -height + "px";
			//cover.style.left=-width+"px";
		} else {
			oDiv.style.position = "relative";
			cover.style.position = "absolute";
			cover.style.top = "0px";
			console.log(-height);
			cover.style.left = "0px";
		}

		oDiv.appendChild(cover);

	}



	this.runInTo = function(oDiv1, oDiv2) {

		oDiv1.addEventListener("mousedown", function(ev) {

			var oEvent = ev || event;
			var disX = oEvent.clientX - oDiv1.offsetLeft;
			var disY = oEvent.clientY - oDiv1.offsetTop;

			document.onmousemove = function(ev) {

				//odiv1,odiv2 必须是可拖拽的
				var l1 = oDiv1.offsetLeft;
				var r1 = oDiv1.offsetLeft + oDiv1.offsetWidth;
				var t1 = oDiv1.offsetTop;
				var b1 = oDiv1.offsetTop + oDiv1.offsetHeight;

				var l2 = oDiv2.offsetLeft;
				var r2 = oDiv2.offsetLeft + oDiv2.offsetWidth;
				var t2 = oDiv2.offsetTop;
				var b2 = oDiv2.offsetTop + oDiv2.offsetHeight;

				var oEvent = ev || event;
				oDiv1.style.left = oEvent.clientX - disX + "px";
				oDiv1.style.top = oEvent.clientY - disY + "px";

				if (r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2) {
					console.log("碰不上" + r1 + ":" + l2);
				} else {
					console.log("碰上");
				}

			}

			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			}



		}, false);
	}

}

var ClassScreenTool = function() {
	this.getNowWidth = function() {

		var winWidth = 0;

		if (window.innerWidth) {
			winWidth = window.innerWidth;
		} else if ((document.body) && (document.body.clientWidth)) {
			winWidth = document.body.clientWidth;
		}



		if (document.documentElement && document.documentElement.clientWidth) {
			winWidth = document.documentElement.clientWidth;
		}
		return winWidth;
	}
	this.getNowHeight = function() {

		var winHeight = 0;

		if (window.innerHeight) {
			winHeight = window.innerHeight;
		} else if ((document.body) && (document.body.clientHeight)) {
			winHeight = document.body.clientHeight;
		}

		if (document.documentElement && document.documentElement.clientHeight) {
			winHeight = document.documentElement.clientHeight;
		}
		return winHeight;
	}
}

//geolocationTool
var ClassGeolocationTool = function() {
	this.getDistance = function(latitude1, longitude1, latitude2, longitude2) {
		// R is the radius of the earth in kilometers 地球半径 
		var R = 6371;
		var deltaLatitude = toRadians(latitude2 - latitude1);
		var deltaLongitude = toRadians(longitude2 - longitude1);
		latitude1 = toRadians(latitude1);
		latitude2 = toRadians(latitude2);
		var a = Math.sin(deltaLatitude / 2) *
			Math.sin(deltaLatitude / 2) +
			Math.cos(latitude1) *
			Math.cos(latitude2) *
			Math.sin(deltaLongitude / 2) *
			Math.sin(deltaLongitude / 2);
		var c = 2 * Math.atan2(Math.sqrt(a),
			Math.sqrt(1 - a));
		var d = R * c;
		return d;
	}
}

//pictureViewer
var ClassPictureViewerTool = function() {
	this.view = function(pictureFile, imgElement) {
		//通过file.size可以取得图片大小
		var reader = new FileReader();
		reader.readAsDataURL(pictureFile);
		reader.onload = function(evt) {
			imgElement.src = evt.target.result;
		}

	}
}

//webCamera
var ClassWebCameraTool = function(sVideoElementId, sCanvasElementId, sButtonElementId) {
	var video = document.getElementById(sVideoElementId);
	//video config
	var videoConfig = {
		"video": true,
		"audio": true
	};
	var canvas = document.getElementById(sCanvasElementId);
	var context = canvas.getContext("2d");
	var button = document.getElementById(sButtonElementId);
	//errorCallback
	var errorCallback = function(error) {
		console.log("Video capture error: ", error.code);
	};
	//start the camera 
	this.start = function() {
		if (navigator.getUserMedia) { // Standard
			navigator.getUserMedia(videoConfig, function(stream) {
				video.src = stream;
				video.play();
			}, errorCallback);
		} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
			navigator.webkitGetUserMedia(videoConfig, function(stream) {
				video.src = window.webkitURL.createObjectURL(stream);
				video.play();
			}, errorCallback);
		} else if (navigator.mozGetUserMedia) { // Firefox-prefixed
			navigator.mozGetUserMedia(videoConfig, function(stream) {
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, errorCallback);
		}
		button.addEventListener("click", function() {
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
		}, false);
	}
}


//widget
var ClassWidgetTool = function() {
	this.toast = function(text, time) {
		var toast = document.createElement("div");
		toast.style.width = window.screen.width / 2 + "px";
		toast.style.height = window.screen.height / 10 + "px";
		toast.style.lineHeight = window.screen.height / 10 + "px";
		toast.style.backgroundColor = "#31b0d5";
		toast.style.borderColor = "#269abc";
		toast.style.position = "absolute";
		toast.style.left = window.screen.width / 4 + "px";
		toast.style.top = window.screen.height * 6 / 10 + "px";
		toast.style.textAlign = "center";
		toast.style.fontSize = "20px";
		toast.innerHTML = text;
		toast.style.zIndex = "10000";
		toast.style.borderRadius = "6px";
		toast.style.opacity = "0.6";
		document.body.appendChild(toast);
		window.setTimeout(function() {
			document.body.removeChild(toast);
		}, time);
	}
}

//ajax
var ClassAJAXTool = function() {
	this.get = function(sUrl, fnSucceed, fnFaild) {
		//1.创建AJAX对象
		var oAjax = null;
		if (window.XMLHttpRequest) { //将XMLHttpRequest对象作为全局属性，不会报错
			oAjax = new XMLHttpRequest(); //IE6以上
		} else {
			oAjax = new ActiveXObject("Microsoft.XMLHTTP"); //IE6
		}
		//2.连接服务器
		//open参数：String 方法, String URL, Bollean 是否异步, String 用户名, String密码
		oAjax.open("GET", sUrl, true);
		//3.发送请求
		oAjax.send();
		//4.接受服务器的返回
		oAjax.onreadystatechange = function() {
			//readyState状态：0，1，2，3，4
			if (oAjax.readyState == 4) {
				if (oAjax.status == 200 || oAjax.status == 0) { //200为成功，0为本地请求成功
					fnSucceed(oAjax.responseText); //将返回值赋给成功函数
					//alert(oAjax.responseText);
				} else {
					if (fnFaild) {
						fnFaild();
					}
				}
			}
		}
	}
	this.post = function(sUrl, sPostData, fnSucceed, fnFaild) {
		var oAjax = null;
		if (window.XMLHttpRequest) {
			oAjax = new XMLHttpRequest();
		} else {
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}

		oAjax.open("POST", sUrl, true);
		oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		oAjax.send(sPostData)

		//4.接受服务器的返回
		oAjax.onreadystatechange = function() {
			//readyState状态：0，1，2，3，4
			if (oAjax.readyState == 4) {
				if (oAjax.status == 200 || oAjax.status == 0) { //200为成功，0为本地请求成功
					fnSucceed(oAjax.responseText); //将返回值赋给成功函数
				} else {
					if (fnFaild) {
						fnFaild();
					}
				}
			}
		}
	}
}

//CSSTool
var ClassCSSTool = function() {
	this.CSS = function(oDiv, sAttr, sValue) {
		if (arguments.length == 2) { //获取CSS样式，注意，style只能获取行间样式，这个需要注意，写在头部和写在外部的CSS央视没法获取到
			if (oDiv.currentStyle) { //IE currentStyle
				return oDiv.currentStyle[sAttr];
			} else { //firefox getComputedStyle
				return oDiv.getComputedStyle(oDiv, false)[sAttr];
			}
		} else if (arguments.length == 3) { //设置
			oDiv.style[sAttr] = sValue;
		}
	}
	this.getElementByClassName = function(node, classname) {
		if (node.getElementsByClassName) { // use native implementation if available
			return node.getElementsByClassName(classname);
		} else {
			return (function getElementsByClass(searchClass, node) {
				if (node == null)
					node = document;
				var classElements = [],
					els = node.getElementsByTagName("*"),
					elsLen = els.length,
					pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"),
					i, j; //也可以用单词边界：只要两边是\b就可以了，说明这个单词是独立的

				for (i = 0, j = 0; i < elsLen; i++) {
					if (pattern.test(els[i].className)) {
						classElements[j] = els[i];
						j++;
					}
				}
				return classElements;
			})(classname, node);
		}
	}

}

//arrayTool
var ClassArrayTool = function() {
	this.orderByMin = function(aArray) {
		aArray.sort(function(num1, num2) {
			return num1 - num2;
		});
	}
	this.oderByMax = function(aArray) {
		aArray.sort(function(num1, num2) {
			return num2 - num1;
		});
	}
}

//cookieTool
var ClassCookieTool = function() {
	this.setCookie = function(sName, value, iExpireDays) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + iExpireDays);
		document.cookie = sName + "=" + value + ";expires=" + oDate;
	}
	this.getCookie = function(sName) {
		var arr = document.cookie.split("; ");
		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split("=");
			if (arr2[0] == sName) {
				return arr2[1];
			}
		}
		return "";
	}
	this.removeCookie = function(sName) {
		this.setCookie(sName, "", -1);
	}
}

//eventTool
var ClassEventTool = function() {
	this.addEvent = function(obj, sEvent, fn) {
		if (obj.attachEvent) {
			obj.attachEvent("on" + sEvent, fn);
		} else {
			obj.addEventListener(sEvent, fn, false);
		}
	}
}

//math
var ClassMathTool = function() {

	this.isRelative = function(iA, iB) {

		var flag = 0;

		var min = iA < iB ? iA : iB;
		var max = iA > iB ? iA : iB;

		for (var i = 2; i < (min + 1); i++) {
			if ((min % i == 0) & (max % i == 0)) {
				flag++;
			}
		}

		if (flag > 0) {
			alert("不互质");
		} else {
			alert("互质");
		}

	}

}

//storage
var ClassStorageTool = function() {
	var storage = window.localStorage;
	if (storage) {
		console.log('This browser supports localStorage');
	} else {
		alert('This browser does NOT support localStorage');
	}
	this.showStorage = function() {
		var result = [];
		for (var i = 0; i < storage.length; i++) {
			console.log(storage.key(i) + " : " + storage.getItem(storage.key(i)) + "<br>");
			result.push(storage.getItem(storage.key(i)));
		}
		return result;
	}
	this.addStorage = function(sValueQueue) {
		var arr = sValueQueue.split(",");
		for (var i = 0; i < storage.length; i++) {
			var ar = storage.getItem(storage.key(i)).split(",");
			if (ar[1] == arr[1] && ar[2] == arr[2]) {
				console.log(ar[1]);
				console.log(ar[2]);
				console.log(arr[1]);
				console.log(arr[2]);
				return; //停止执行，不添加这个值
			}
		}
		storage.setItem(storage.length + 1, sValueQueue);
	}
	this.clearStorage = function() {
		storage.clear();
	}
	this.getLength = function() {
		return storage.length;
	}
	this.getItem = function(index) {
		return storage.getItem(storage.key(index));
	}
}

//indexedDB
var ClassIndexedDbTool = function(sDBName, iVersion) {
	var db;
	var ta;
	if ("indexedDB" in window) {
		var openRequest = window.indexedDB.open(sDBName, iVersion);
		openRequest.onsuccess = function(e) {
			console.log("ClassIndexedDb.Success!");
			db = e.target.result;
		}
		openRequest.onupgradeneeded = function(e) {
			console.log("ClassIndexedDb.Upgrading...");
		}
		openRequest.onerror = function(e) {
			console.log("ClassIndexedDb.Error");
			console.dir(e);
		}

	} else {
		alert("您的浏览器不支持IndexedDB！");
	}
	this.createObjectStore = function(sStoreName) {
		if (!db.objectStoreNames.contains(sStoreName)) {
			db.createObjectStore(sStoreName);
		} else {
			alert(sStoreName + "已经存在，无法创建！");
		}
	}

}
