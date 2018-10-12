
//项目中有哪些类：轮播图
function Slider(
				$box,width,height,imgs,
				doudouSize,doudouColor,doudouHighColor,
				isCircle,direction,timeSpace){
	this.$box = $box;//轮播图的容器
	this.$imgs = null;//这是个jQuery对象，存储所有的img标签,
	this.$lis = null;//这是个jQuery对象,存储所有的li标签,
	
	this.$sections = null;
	this.timeLong = 500;
	this.liMarginR = 30;
	this.liBorder = 2;
	this.colors = ["255,255,255","255,255,255","26,26,26","26,26,26","255,255,255","26,26,26"];
	this.text = [
		{
			"h2":" K1 新品上市",
			"h3":"   骁龙 660，前置 2500 万，¥1599 起。",
			"a": "立即预定"
		},{
			"h2":"Find X 兰博基尼版",
			"h3":"   3 期免息，限量现货开售。",
			"a": "立即预定"
		},{
			"h2":"A7x 新配置上市",
			"h3":"   4G+64G ，10 点新品开售。",
			"a": "立即预定"
		},{
			"h2":"OPPO R17",
			"h3":"   水滴屏，购机享 6 期免息。",
			"a": "立即预定"
		},{
			"h2":"Find X 未来旗舰",
			"h3":"   曲面全景屏 ，购机享 6 期免息。",
			"a": "立即预定"
		},{
			"h2":"以旧换新",
			"h3":"   最高加价10%，换新成功加赠永生花。",
			"a": "立即预定"//#05B570
		}
	];
	
	this.width = width;
	this.height = height;
	this.imgs = imgs;//图片数组
	this.doudouSize = doudouSize;
	this.doudouColor = doudouColor;
	this.doudouHighColor = doudouHighColor;//高亮颜色
	this.isCircle = isCircle;
	
	this.dir = direction;//左还是右
	this.timeSpace = timeSpace;//每张图片直接的间隔,大于1000
	this.currOrd = 0;
	this.myTimer = null;
	
	
	this.createUI();
	this.addEvent();
	this.changeImg();
	this.showLi();
}

Slider.prototype.createUI= function(){
	this.$box.css({
		position:"relative",
		overflow:"hidden"
	});
	
	//1、创建所有的图片 和 section文本
	for(let i=0;i<this.imgs.length;i++){
		let $img = $("<div></div>");
//		$img.attr("src",this.imgs[i]);
		$img.css({
			"position":"absolute",
			"background":"url("+this.imgs[i]+") 107% center",
			"background-size":"cover",
			"top":"0px",
			width: this.width+"px",	
			height:this.height+"px",	
			left:i==0?"0px":this.width+"px"
		});
		this.$box.append($img);
		//this.imgDoms.push($img);//把创建的图片标签放入数组中
		//this.$imgs==null?this.$imgs=$img:this.$imgs.add($img);
		if(this.$imgs==null){
			this.$imgs=$img;
		}else{
			this.$imgs = this.$imgs.add($img);
		}
		
//		创建section文本
		let $section = $("<section></section>");
		$section.css({
			"color":"rbg("+this.colors[this.currOrd]+")",
			"z-index":3
		});
		let $h2 = $("<h2></h2>");
		$h2.text(this.text[this.currOrd].h2);
		$h2.css({
			
		});
		let $h3 = $("<h3></h3>");
		$h3.text(this.text[this.currOrd].h3);
		$h3.css({
			
		});
		let $a = $("<a href='#'></a>");
		$a.text(this.text[this.currOrd].a);
		$a.css({
			
		});
		
		$section.append($h2);
		$section.append($h3);
		$section.append($a);
		this.$box.append($section);
		
		this.$sections==null?this.$sections=$section:this.$sections.add($section);
		
//		if(this.$sections==null){
//			this.$imgs=$img;
//		}else{
//			this.$imgs = this.$imgs.add($img);
//		}
	}
	
	//2、创建所有的豆豆
	//1)、豆豆的容器
	let $ul = $("<ul></ul>");
	$ul.css({
		position:"absolute",
		"margin-left":-((this.doudouSize + this.liMarginR)*this.imgs.length)/2,
		left:"50%",
		bottom:"30px",
		"list-style":"none",
		"z-index":2
	});
	this.$box.append($ul);
	
	//2)、豆豆
	for(let i=0;i<this.imgs.length;i++){
		let $li = $("<li></li>");
		$li.css({
			display:"inline-block",
			cursor:"pointer",
			marginRight:this.liMarginR,
			width:this.doudouSize+"px",
			height:this.doudouSize+"px",
			backgroundColor:"rgba("+this.colors[this.currOrd]+","+ i==0?this.doudouHighColor:this.doudouColor +")",
			borderRadius:this.isCircle?"50%":0
		});

		$ul.append($li);
		this.$lis==null?this.$lis=$li:this.$lis=this.$lis.add($li);
	}
}

//动画 改图片
Slider.prototype.showImg = function(inOrd,outOrd){
	
	if(inOrd==outOrd){
		return;
	}
	//1)、滑入滑出前的准备工作
	this.$imgs.eq(inOrd).css({"left":-this.dir*this.width/2+"px","z-index":2});
	this.$imgs.eq(outOrd).css({"z-index":1});
	
	//2）、滑入滑出效果
	this.$imgs.eq(inOrd).animate({
		left:0
	},this.timeLong);
	this.$imgs.eq(outOrd).animate({
		left:this.dir*this.width/2
	},this.timeLong);
}

Slider.prototype.showLi=function(){
	//    B、改豆豆		
	this.$lis.eq(this.currOrd)
	.css({"margin-left":-this.liBorder,"margin-bottom":-this.liBorder,"backgroundColor":"rgba("+this.colors[this.currOrd]+",0)",border:this.liBorder +"px solid rgba("+this.colors[this.currOrd]+","+ this.doudouHighColor+")"})
	.siblings()
	.css({"margin-left":2,"margin-bottom":0,"backgroundColor":"rgba("+this.colors[this.currOrd]+","+this.doudouColor+")",border:""});
	
	//改变导航栏的字体颜色（class)
	$("body>header>nav *:not(aside,aside *)").css("color","rgb("+this.colors[this.currOrd]+")");
}

//1、自动播放图片
Slider.prototype.changeImg=function(){
	
	this.myTimer = setInterval(()=>{
		//1）、数据：改变图片的当前序号（加加），并考虑边界
		//currOrd = ++currOrd>4?0:currOrd;
		let outOrd = this.currOrd;
		this.currOrd++;
		if(this.currOrd>this.imgs.length-1){
			this.currOrd=0;
		}
		
		//2）、外观：
		//A、改图片
		this.showImg(this.currOrd,outOrd);
		//B、改豆豆
		this.showLi();

	},this.timeSpace);
}

//2、停止播放
Slider.prototype.stopChange=function(){
	//停止定时器
	window.clearInterval(this.myTimer);
}

//4、跳转到指定的图片
Slider.prototype.goImg=function(transOrd){//1
	//1）、数据：把transOrd赋给当前图片序号
	let outOrd = this.currOrd;
	this.currOrd = transOrd;
	
	if(inOrd < outOrd){
		this.dir = 1;
		setTimeout(function(){this.dir = -1;},this.timeSpace);
	}
	//2）、外观：
	//A、改图片
	this.showImg(this.currOrd,outOrd);
	//B、改豆豆
	this.showLi();
}

Slider.prototype.addEvent = function(){	
	let obj = this;//this是Slider的对象
	
//	this.$box.mouseover(function(){
//		obj.stopChange();
//	});
	
//	this.$box.mouseout(function(){
//		obj.changeImg();
//	});
	
	this.$lis.click(function(){
		obj.goImg($(this).index());
		obj.stopChange();
		setTimeout(function(){
			obj.changeImg();	
		},obj.timeSpace);
		
	});
	
}