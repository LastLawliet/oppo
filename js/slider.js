
//项目中有哪些类：轮播图
function Slider(
				$box,width,height,imgs,
				doudouSize,doudouColor,doudouHighColor,
				isCircle,direction,timeSpace){
	this.$box = $box;//轮播图的容器
	this.$imgs = null;//这是个jQuery对象，存储所有的img标签,
	this.$lis = null;//这是个jQuery对象,存储所有的li标签,
	this.width = width;
	this.height = height;
	this.imgs = imgs;//图片数组
	this.doudouSize = doudouSize;
	this.doudouColor = doudouColor;
	this.doudouHighColor = doudouHighColor;//高亮颜色
	this.isCircle = isCircle;
	
	this.direction = direction;//左还是右
	this.timeSpace = timeSpace;//每张图片直接的间隔,大于1000
	this.currOrd = 0;
	this.myTimer = null;
	
	
	this.createUI();
	this.addEvent();
	this.changeImg();
}

Slider.prototype.createUI= function(){
	this.$box.css({
		position:"relative",
		overflow:"hidden"
	});
	
	//1、创建所有的图片
	for(let i=0;i<this.imgs.length;i++){
		let $img = $("<img/>");
//		$img.attr("src",this.imgs[i]);
		$img.css({
			"position":"absolute",
			"background":"url("+this.imgs[i]+") 105% center",
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
			console.log(this.$imgs);
		}
	}
	
	//2、创建所有的豆豆
	//1)、豆豆的容器
	let $ul = $("<ul></ul>");
	$ul.css({
		position:"absolute",
		bottom:50,
		"list-style":"none",
		"z-index":2
	});
	this.$box.append($ul);
	
	//2)、豆豆
	for(let i=0;i<this.imgs.length;i++){
		let $li = $("<li></li>");
		$li.css({
			float:"left",
			"margin-left":"20px",
			width:this.doudouSize+"px",
			height:this.doudouSize+"px",
			backgroundColor:i==0?this.doudouHighColor:this.doudouColor,
			borderRadius:this.isCircle?"50%":0
		});

		$ul.append($li);
		this.$lis==null?this.$lis=$li:this.$lis=this.$lis.add($li);
	}
}

Slider.prototype.showImg = function(inOrd,outOrd){
	
	if(inOrd==outOrd){
		return;
	}
	
	//1)、滑入滑出前的准备工作
	this.$imgs.eq(inOrd).css({"left":this.width+"px"});
	
	//2）、滑入滑出效果
	this.$imgs.eq(inOrd).animate({
		left:0
	},300);
	this.$imgs.eq(outOrd).animate({
		left:-1*this.width
	},300);
}

Slider.prototype.showLi=function(){
	//    B、改豆豆		
	this.$lis.eq(this.currOrd)
	.css({"backgroundColor":this.doudouHighColor})
	.siblings()
	.css({"backgroundColor":this.doudouColor});
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
	
	//2）、外观：
	//A、改图片
	this.showImg(this.currOrd,outOrd);
	//B、改豆豆
	this.showLi();
}

Slider.prototype.addEvent = function(){	
	let obj = this;//this是Slider的对象
	
	this.$box.mouseover(function(){
		obj.stopChange();
	});
	
	this.$box.mouseout(function(){
		obj.changeImg();
	});
	
	this.$lis.click(function(){
		obj.goImg($(this).index());
	});
	
}