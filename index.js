class picRotaion {
	constructor(elemId) {
		this.index = 0; // 图片计数器
		this.elem = $(elemId); 
		this.pic_ul = $(elemId + " .pic");
		this.pic_li = $(elemId + " .pic ul li");
		this.pic_width = this.pic_li.outerWidth(true); //获得图片宽度
		this.timer = null; // 一个对象封装一个定时器，初始化为null
		this.dots_ul = $(elemId + " .dots ul");
		this.prev = $(elemId + " .prev");
		this.next = $(elemId + " .next");
		this.init();
	}
	init() {
		// 克隆第一张图片
		let clone = this.pic_li.first().clone();
		// 将第一张图片的克隆版追加ul的后面
		this.pic_ul.append(clone);
		this.createDots();
		this.autoPlay();
		this.bindEvent();
	}
	createDots() { // 创建小圆点 ,以及相应的滑入事件
		for(let i = 0;i < this.pic_li.length;i++){
			this.dots_ul.append("<li></li>");
		}
		let dots_li = this.dots_ul.children();
		dots_li.first().addClass("active");
		for(let i = 0;i < dots_li.length;i++) {
			dots_li[i].onmouseover = function(){
				this.index = i;
				this.changeDots(i);
				this.changePic();
			}.bind(this);
		}
	}
	autoPlay() { //自动轮播
		this.setTimer();
	}
	bindEvent() { //绑定按钮事件
		this.elem.bind("mouseover",()=>{
			this.clearTimer();
		})
		this.elem.bind("mouseout",()=>{
			this.setTimer();
		})
		this.prev.bind("click",() => {
			this.index--;
			this.changePic();
		})
		this.next.bind("click",() => {
			this.index++;
			this.changePic();
		})
	}
	setTimer() { //设置定时器
		this.timer  = setInterval(() => {
			this.index++;
			this.changePic();
		},3000);
	}
	clearTimer() { //清除定时器
		clearInterval(this.timer);
	}
	changePic() { //切换图片
		if(this.index == this.pic_li.length) {
			this.changeDots(0);
		}
		if(this.index > this.pic_li.length) {
			this.pic_ul.css({left:0});
			this.index = 1;
		}
		if(this.index == -1) {
			this.pic_ul.css({left:-this.pic_li.length*this.pic_width});
			this.index = this.pic_li.length - 1;
		}
		this.changeLeft(-this.index*this.pic_width,1000);
		this.changeDots(this.index);		
	}
	changeLeft(left,time) { // 动画改变left的方法
		this.pic_ul.stop().animate({left:left},time);
	}
	changeDots(idx){ // 改变小圆点的状态
		this.dots_ul.children().eq(idx).addClass("active").siblings().removeClass("active");
	}

}
