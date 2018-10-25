
let singlton = (function(){	
	class BigMirror{
		constructor(obj){
			//放大镜的dom元素
			this.mirrorDom=null;
				//显示放大效果的dom元素
			this.showDom=null;
			this.initData(obj);
		}
		
		initData(obj){
			let defaultObj = {
				//要放大的图片对应的dom元素
				bigBoxDom:null,
				//大图的src；要放大的效果的dom元素的背景图片
				bigImg:"",			
				//要放大图片的宽和高
				bigBoxWidth:0,
				bigBoxHeight:0,
				left:0,
				top:0,
				//放大镜的宽和高
				width:100,
				height:100,
				//放大倍数
				multiple:3,
				//放大镜的透明度
				opacity:0.4,
				bgColor:"pink"
			}
			for(let key in defaultObj){
				obj[key]&&(defaultObj[key]=obj[key]);
			}
			for(let key in defaultObj){
				this[key]=defaultObj[key];
			}
		}
		
		createUI(){
			this.bigBoxDom.style.position = "relative";
			//1、放大镜的dom
			this.mirrorDom = document.createElement("div");
			this.mirrorDom.style.cssText = "position: absolute;left:0px;top:0px";
			
			//2、放大效果的dom
			this.showDom = document.createElement("div");
			this.showDom.style.cssText = "position: absolute";
		}
		
		updateUI(){
			this.mirrorDom.style.width = this.width+"px";
			this.mirrorDom.style.height = this.height+"px";
			this.mirrorDom.style.opacity = this.opacity;
			this.mirrorDom.style.backgroundColor = this.bgColor;
			this.mirrorDom.style.display="block";
			
			this.showDom.style.backgroundImage = this.bigImg;
			this.showDom.style.zIndex = 99;
			this.showDom.style.left = this.bigBoxWidth+10+"px";
			this.showDom.style.top = "0px";
			this.showDom.style.width = this.width*this.multiple +"px";
			this.showDom.style.height = this.height*this.multiple+"px";
			this.showDom.style.backgroundSize = this.bigBoxWidth*this.multiple+"px "+this.bigBoxHeight*this.multiple+"px";
			this.showDom.style.backgroundPosition="0px 0px";
			this.showDom.style.display="block";
			
			//改变放大镜的dom和放大效果的dom的父元素
			this.bigBoxDom.appendChild(this.mirrorDom);
			this.bigBoxDom.appendChild(this.showDom);
		}
		
		scale(event){
				let evt = event || window.event;
			//1、数据（放大镜的left和top）
				instance.left = evt.pageX-instance.bigBoxDom.offsetLeft-instance.width/2;
				instance.top = evt.pageY-instance.bigBoxDom.offsetTop-instance.height/2;
				
				if(instance.left<0){
					instance.left=0;
				}else if(instance.left>instance.bigBoxWidth-instance.width){
					instance.left = instance.bigBoxWidth-instance.width;
				}
				
				if(instance.top<0){
					instance.top=0;
				}else if(instance.top>instance.bigBoxHeight-instance.height){
					instance.top = instance.bigBoxHeight-instance.height;
				}
				
				//2、外观
				instance.mirrorDom.style.left = instance.left+"px";
				instance.mirrorDom.style.top = instance.top+"px";
				
				instance.showDom.style.backgroundPosition = (-1*instance.multiple*instance.left)+"px "+(-1*instance.multiple*instance.top)+"px";
				
		}
		
		addEvent(){
			this.bigBoxDom.removeEventListener("mousemove",this.scale,false);
			this.bigBoxDom.addEventListener("mousemove",this.scale,false);
			this.bigBoxDom.onmouseleave=()=>{
				this.mirrorDom.style.display="none";
				this.showDom.style.display="none";
			}
		}
	}
	
	var instance ;
	
	return {
		getInstance:function(obj){
			if(!instance){
				instance=new BigMirror(obj);
				instance.createUI();
				instance.updateUI();
				instance.addEvent();
			}else{
				instance.initData(obj);
				instance.updateUI();
				instance.addEvent();
			}
			return instance;
		}
	}	
})();
