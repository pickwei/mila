<?php
header('Content-Type: text/html;charset=UTF-8');
?>
<div id="top">
    <div class="container">
        <a href="#" >收藏本站</a>
        <div class="top_tips rt">
            <ul>
                <li id='welcome'>您好，欢迎来到琥珀蜜蜡商城！<a href="login.html" >[登录]</a><a href="register.html" >[免费注册]</a></li>
                <li><b></b><a href="cart.html" id='myorder'>我的购物车</a></li>
            </ul>
        </div>
    </div>
</div>
<!--导航栏-->
<div id="nav">
    <div class="container">
          <!--logo-->
          <a  href="index.html"><img src="img/logo.png" alt=""/></a>
          <!--导航条-->
          <ul class="nav_bar">
                <li ><a  href="index.html">网站首页</a></li>
                <li>
                    <a href="about.html">关于蜜蜡</a>
                    <div class="nav_box">

                        <p><i></i></p>
                        <ul>
                            <li><a href="#">公司简介</a></li>
                            <li><a href="#">在线留言</a></li>
                            <li><a href="#">在线反馈</a></li>
                            <li><a href="#">联系我们</a></li>
                        </ul>
                        <div class="nav_box_img">
                            <img src="img/nav_box_1.png" alt=""/>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="news.html">蜜蜡新闻</a>
                    <div class="nav_box">
                        <p><i></i></p>
                        <ul>
                            <li><a href="#">公司动态</a></li>
                            <li><a href="#">业界资讯</a></li>
                        </ul>
                        <div class="nav_box_img">
                            <img src="img/nav_box_2.png" alt=""/>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="product.html">蜜蜡首饰</a>
                    <div class="nav_box">
                        <p><i></i></p>
                        <ul>
                            <li><a href="#">蜜蜡项坠</a></li>
                            <li><a href="#">蜜蜡珠串</a></li>
                            <li><a href="#">蜜蜡戒指</a></li>
                            <li><a href="#">蜜蜡雕件</a></li>
                            <li><a href="#">蜜蜡耳饰</a></li>
                        </ul>
                        <div class="nav_box_img">
                            <img src="img/nav_box_3.png" alt=""/>
                        </div>
                    </div>
                </li>
                <li><a href="cases.html">定制产品</a></li>
                <li><a href="#">加入蜜蜡</a></li>
          </ul>
          <!--搜索框-->
          <div class="search">
              <form method="get" name="myform1" action="" target="_blank">
                  <input type="hidden" name="lang" value="cn">
                  <input type="hidden" name="searchtype" value="0">
                  <input type="text" name="searchword" size="30" placeholder="请输入搜索关键词！">
                  <button type="submit" name="submit" value="">搜索</button>
              </form>
          </div>
    </div>
</div>