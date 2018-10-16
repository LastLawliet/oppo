
//项目中有哪些类：轮播图
function Slider(
				$box,width,height,imgs,
				doudouSize,doudouColor,doudouHighColor,
				isCircle,direction,timeSpace){
	this.$box = $box;//轮播图的容器
	this.$imgs = null;//这是个jQuery对象，存储所有的img标签,
	this.$lis = null;//这是个jQuery对象,存储所有的li标签,
	
	this.$sections = null;
	this.timeLong = 1000;
	this.liMarginR = 30;
	this.liBorder = 2;
	this.colors = ["#fff","#fff","#1a1a1a","#1a1a1a","#fff","#1a1a1a"];
	this.colors_h3 = ["#fff","#fff","#666","#666","#fff","#666"];
	this.bgColors_a = ["#05B570","#05B570","#05B570","#05B570","#fff","#05B570"];
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
	this.isActive = false;
	
	this.width = this.$box.width();
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
			"background":"url("+this.imgs[i]+") 46.5% center",
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
			"color":this.colors[i],
			"position":"absolute"
		});
		let $h2 = $("<h2></h2>");
		$h2.text(this.text[i].h2);
		$h2.css({
			
		});
		let $h3 = $("<h3></h3>");
		$h3.text(this.text[i].h3);
		$h3.css({
			"color":this.colors_h3[i]
		});
		let $a = $("<a href='#'></a>");
		$a.text(this.text[i].a);
		$a.css({
			"color":i==4?"#333":"#fff",
			"backgroundColor":this.bgColors_a[i]
		});
		
		$section.append($h2);
		$section.append($h3);
		$section.append($a);
		$img.append($section);
		
		this.$sections= this.$sections==null? $section : this.$sections.add($section);
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
			backgroundColor:this.colors[i],
			opacity:i==0?this.doudouHighColor:this.doudouColor,
			borderRadius:this.isCircle?"50%":0
		});

		$ul.append($li);
		this.$lis = this.$lis==null ? $li : this.$lis.add($li);
	}
}

//动画 改图片

Slider.prototype.showImg = function(inOrd,outOrd){
	
	if(inOrd==outOrd){
		return;
	}
	this.isActive = true;
	
	//1)、滑入滑出前的准备工作
	this.$imgs.eq(inOrd).css({"left":-this.dir*this.width+"px","z-index":2});
	this.$imgs.eq(outOrd).css({"z-index":1});
	
	let sec_left = this.$sections.css("left");
	this.$sections.eq(inOrd).css({"left":parseInt(sec_left)+this.width*-this.dir,"z-index":2,"opacity":0});
	this.$sections.eq(outOrd).css({"z-index":1});
	
	//2）、滑入滑出效果div
	this.$imgs.eq(inOrd).animate({
		left:0
	},this.timeLong);
	this.$imgs.eq(outOrd).animate({
		left:this.dir*this.width*0.7
	},this.timeLong);
	
	setTimeout(()=>{
		this.$imgs.eq(outOrd).css({"z-index":0});
		this.isActive = false;
	},this.timeLong)
	
	//2）、滑入滑出效果文本section
	this.$sections.eq(inOrd).delay(200).animate({
		left:sec_left,
		"opacity":1
	},this.timeLong);
	this.$sections.eq(outOrd).delay(200).animate({
		left:this.dir*sec_left
	},this.timeLong);
	
	setTimeout(()=>{
		this.$sections.eq(outOrd).css({"z-index":0});
	},this.timeLong+200)
	
}

Slider.prototype.showLi=function(){
	//    B、改豆豆
	this.$lis.eq(this.currOrd)
	.css({//高亮豆豆
		"margin-left":-this.liBorder,
		"margin-bottom":-this.liBorder,
		"backgroundColor":"transparent",
		"border":this.liBorder +"px solid "+this.colors[this.currOrd],
		"opacity":this.doudouHighColor
	})
	.siblings()
	.css({//其他豆豆
		"margin-left":this.liBorder,
		"margin-bottom":0,
		"backgroundColor":this.colors[this.currOrd],
		"opacity":this.doudouColor,
		border:""
	});
	
	//改变导航栏的字体颜色（class)
	let color_header = this.colors[this.currOrd].slice(1);
	//导航栏hover变色 js（因为有banner改色 css的hover失效）
	if(!isHover){
        $("body>header>nav>ul>li>a,body>header>nav>section>i,svg").css("color",this.colors[this.currOrd]);
    }
	$("body>header>nav>ul>li>a,body>header>nav>section>i").hover(
		function(){
			$(this).css("opacity",0.6);
		},
		function(){
			$(this).css("opacity","");
		}
	);
}

//1、自动播放图片
Slider.prototype.changeImg=function(){
	if(this.myTimer){return};
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
	this.myTimer = null;
}

//4、跳转到指定的图片
Slider.prototype.goImg=function(transOrd){//1
	if(this.isActive){return;}//如果正在运动就 返回
	//1）、数据：把transOrd赋给当前图片序号
	let outOrd = this.currOrd;
	this.currOrd = transOrd;
	
	if(this.currOrd < outOrd){
		this.dir = 1;
		setTimeout(()=>{this.dir = -1;},this.timeLong);
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

	//当 父盒子改变大小是 更新 轮播图大小
	$(window).resize(()=>{
        obj.width = obj.$box.width();
        obj.height = obj.$box.height();
        obj.$imgs.css({
            "width": obj.width,
			"height": obj.height,
			"background-size":"cover",
			"background-position":"46.5% center"
		});
        obj.$sections.css({
            "left": "58.5%"
		});
	});
	
	this.$lis.click(function(){
		obj.goImg($(this).index());
		obj.stopChange();
		setTimeout(function(){
			obj.changeImg();
		},obj.timeSpace);
		
	});
	
	this.$lis.hover(
		function(){
			if($(this).css("border")==""){
				return;
			}
			$(this).css({
				"opacity":obj.doudouColor/2
			});
		},
		function(){
			if($(this).css("border")==""){
				return;
			}
			$(this).css({
				"opacity":obj.doudouColor
			});
		}
	);
}

