
/**功能点1：页面加载完后，异步请求页头和页尾**/
$(function(){
    $('div#header').load('header.php', function(){
        //判断当前是否已经登录，修改欢迎消息
        var uname = sessionStorage['LoginName'];
        if(uname){
            $('#welcome').html('欢迎回来：'+'<a href="#">'+uname+'</a>'+'<a href="#" id="logout" >注销登录</a>');
        }

        //$('#nav').on('click','ul>li>a',function(){
        //    $(this).addClass('active')
        //        .parent().siblings()
        //        .find('a').removeClass('active');
        //});

        //导航栏 隐藏盒子
        $('.nav_bar li').hover(function(){
            $(this).find('.nav_box').css({'display': ' block'});
            $(this).siblings().find('.nav_box').css({'display': 'none'})
        },function(){
            $(this).find('.nav_box').css({'display': 'none'});
        });

        /*二级页面标题高亮*/
        navText('关于蜜蜡');

    });
    $('div#footer').load('footer.php');
});

$('#header').on('click','#logout',function(e){
    e.preventDefault();
    sessionStorage.removeItem('LoginName');
    location.href="login.html";
});



$('#main .menu_top ul li').click(function(){
        $(this).find('.accordion_menu').addClass('active');
        $(this).siblings().find('.accordion_menu')
                          .removeClass('active');
});