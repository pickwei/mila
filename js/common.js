/**：页面加载完后，异步请求页头和页尾**/
$(function(){
    $('div#header').load('header.php', function(){
        //判断当前是否已经登录，修改欢迎消息
        var uname = sessionStorage['LoginName'];
        if(uname){
            $('#welcome').html('欢迎回来：'+'<a href="#">'+uname+'</a>'+'<a href="#" id="logout" >注销登录</a>');
        }


        //导航栏 隐藏盒子
        $('.nav_bar li').hover(function(){
            $(this).find('.nav_box').css({'display': ' block'});
            $(this).siblings().find('.nav_box').css({'display': 'none'})
        },function(){
            $(this).find('.nav_box').css({'display': 'none'});
        });
    });
    $('div#footer').load('footer.php');
});

$('#header').on('click','#logout',function(e){
    e.preventDefault();
    sessionStorage.removeItem('LoginName');
    location.href="login.html";
});

function navText(text){
    $("#nav .nav_bar>li").each(function(){
        var thisText=$(this).children("a:first-child").text();
        if(text==thisText){
            $(this).children("a:first-child").addClass("active");
        }
    });
}
//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}


document.onselectstart= function(event){return false}