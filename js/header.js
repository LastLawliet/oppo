
let isHover = false;
// 鼠标移上 span遮罩层出现 离开消失
$("header>nav>ul>li.first").hover(
	function(){
		isHover = true;
        $("header").css({"background": "white"});
		$("span.gray").css("display","block").animate({"opacity":1},300);
		$("#phone").css("display","block").animate({"opacity":1},300);
		$("body>header>nav>ul>li>a, body>header>nav>section>i, svg").css({"color":"black"});
	},
	function(e){
		let left1 = parseInt($(this).offset().left);
		let right1 = left1+$(this).width();
		let top1 = parseInt($(this).offset().top);
		if(e.pageX<right1 && e.pageX>left1 && e.pageY > top1){//从下面离开 即 进入 aside#phone

		}else{//隐藏
            $("header").css({"background": "transparent"});
            $("span.gray").animate({"opacity":0},300);
            $("#phone").animate({"opacity":0},300);
            setTimeout(function(){
                $("span.gray").css("dispaly","none");
                $("#phone").css("display","none");
                isHover = false;
            },300);
		}
	}
);
// 离开 #phone 显示 离开消失
$("#phone").mouseleave(function () {
	console.log("leave");

    $("header").css({"background": "transparent"});
    $("span.gray").animate({"opacity":0},300);
    $("#phone").animate({"opacity":0},300);
    setTimeout(function(){
        $("span.gray").css("dispaly","none");
        $("#phone").css("display","none");
        isHover = false;
    },300);
})

let isClick_iBag = false;

$("[class~=iBag]").click(function(){
	// 如果刚刚点击完图标 正在动画状态 禁用click事件
	if(isClick_iBag){
		return;
	}
	isClick_iBag = true;
	if($(this).siblings("em").css("display")== "none"){
		//先显示 然后 opacity 1
		$(this).siblings().css({"display":"block"}).animate({"opacity":1},300);
	}else{
		//动画完成后 消失
		$(this).siblings().animate({
			"opacity":0
		},300);
		setTimeout(()=>{
			$(this).siblings().css({"display":"none"});
		},300);
	}
	//动画完成后 可以点击
	setTimeout(function(){
		isClick_iBag = false;
	},300);
})
