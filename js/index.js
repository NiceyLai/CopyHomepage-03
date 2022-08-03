window.addEventListener("load", function () {
  // alert("1"); 测试window.load是否生效

  let arrowL = this.document.querySelector(".arrow-l");
  let arrowR = this.document.querySelector(".arrow-r");
  let focus = document.querySelector(".focus");
  let focusWidth = focus.offsetWidth;
  // 1. 鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。
  focus.addEventListener("mouseenter", function () {
    arrowL.style.display = "block";
    arrowR.style.display = "block";
    // 鼠标经过，轮播图模块， 自动播放停止。
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener("mouseleave", function () {
    arrowL.style.display = "none";
    arrowR.style.display = "none";
    timer = setInterval(function () {
      //   手动调用点击事件
      arrowR.click();
    }, 2000);
  });

  // 2. 动态生成小圆圈  核心思路：小圆圈的个数要跟图片张数一致
  let ul = focus.querySelector("ul");
  let ol = focus.querySelector(".circle");
  // a. 首先先得到ul里面图片的张数（图片放入li里面，所以就是li的个数）
  //   console.log(ul.children.length);
  // b. 利用循环动态生成小圆圈（这个小圆圈要放入ol里面）
  for (let i = 0; i < ul.children.length; i++) {
    // c. 创建节点 createElement(‘li’)
    let li = document.createElement("li");
    //   记录小圆圈的索引号
    li.setAttribute("index", i);
    // d. 插入节点 ol. appendChild(li)
    ol.appendChild(li);
    // 3. 小圆圈的排他思想
    li.addEventListener("click", function () {
      for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";

      // 4. 点击小圆圈，可以播放相应图片。
      // 滚动图片的核心算法： 点击某个小圆圈 ， 就让图片滚动小圆圈的索引号乘以图片的宽度做为ul移动距离
      // 在生成小圆圈的时候，给它设置一个自定义属性，点击的时候获取自定义属性。
      let index = this.getAttribute("index");
      num = index;
      circle = index;
      console.log(index);
      console.log(focusWidth);
      animate(ul, -index * focusWidth);
    });
  }
  // e. 第一个小圆圈需要添加 current 类
  ol.children[0].className = "current";

  // 5. 克隆第一张图片，放在ul最后面
  let first = ul.children[0].cloneNode(true);
  ul.appendChild(first);

  // 6. 点击右侧按钮一次，图片往左播放一张，以此类推， 左侧按钮同理。
  let num = 0;
  let circle = 0;
  // flag 节流阀
  var flag = true;
  arrowR.addEventListener("click", function () {
    // console.log(11);
    if (flag) {
      flag = false; // 关闭节流阀
      // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
      if (num === ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true; //  打开节流阀
      });

      // 7. 图片播放的同时，下面小圆圈模块跟随一起变化。
      circle++;
      if (circle === ol.children.length) {
        circle = 0;
      }
      for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      ol.children[circle].className = "current";
    }
  });
  arrowL.addEventListener("click", function () {
    // console.log(11);
    if (flag) {
      flag = false;
      if (num === 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      // 7. 图片播放的同时，下面小圆圈模块跟随一起变化。
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      ol.children[circle].className = "current";
    }
  });

  // 8. 自动播放轮播图
  let timer = setInterval(function () {
    //   手动调用点击事件
    arrowR.click();
  }, 2000);
});
