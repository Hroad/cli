/**
 * 翻页
 */
const main=()=>{    
     // 初始化调用
    var slider=new iENV.SliderPage({
      item:document.querySelectorAll('#container>section'), // 需要滑动的页面class类名（DOM对象）
      cur:0, // 可设置（初始化当前显示第几页)，一般为0。
      activeClass:'pageOpen', // 给当前项添加的类名
      loop:false, // 默认false 是否要循环
      effect:'vSlide', // 切换方式 另外几种是'vSlide',‘fade’,‘hSingleSlide’,‘vSingleSlide’
      init:function(){
          //TODO
      }
    });        
    slider.$on('sliderStart', function (i, n) {
      console.log('islide-sliderStartFn', i, n);
    });
    slider.$on('animateEnd', function (i, n) {
        console.log('islide-animateEndFn', i, n);
    });

    $('.container').on('swipeUp', function() {
			slider.SwipeNext(); // 传入e为阻止事件冒泡
		});
		$('.container').on('swipeDown', function() {
			slider.SwipePrev();
		});
}
	// 移除默认事件及阻止冒泡
	function removeDefaultEvt(e) {
		e.preventDefault();
	}
	// 移除默认document的touchmove，针对苹果手机
	function removeTouchMove() {
		document.body.addEventListener('touchmove', removeDefaultEvt, false);
	}
  /**
   * 侦听loader相关事件
   */
 window.loader.$on('loaded',()=>{
    console.log("$loaded------已经触发！！");
    main();
    removeTouchMove();   
  });

  if(module.hot) {
    // accept update of dependency
    module.hot.accept();
  }

 