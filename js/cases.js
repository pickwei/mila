
/**功能点1：页面加载完后，异步请求页头和页尾**/
$(function(){
    $('div#header').load('header.php', function(){
        //判断当前是否已经登录，修改欢迎消息
        var uname = sessionStorage['LoginName'];
        if(uname){
            $('#welcome').html('欢迎回来：'+'<a href="#">'+uname+'</a>'+'<a href="#" id="logout" >注销登录</a>');
        }

        $('.nav_bar li').hover(function(){
            $(this).find('.nav_box').css({'display': ' block'});
            $(this).siblings().find('.nav_box').css({'display': 'none'})
        },function(){
            $(this).find('.nav_box').css({'display': 'none'});
        });

        /*二级页面标题高亮*/
        navText('定制产品');

    });
    $('div#footer').load('footer.php');
});

$('#header').on('click','#logout',function(e){
    e.preventDefault();
    sessionStorage.removeItem('LoginName');
    location.href="login.html";
});

//异步加载  产品定制项目展示
$.ajax({
    type:"GET",
    url:"data/8_cases_detail_list.php",
    data: {'pageNum': 0},
    success:function(list){
        var html='';
        $.each(list,function(i,pro){
            html+=`
                 <li>
                    <a href=""><img src="${pro.img}" alt=""/></a>
                    <div class="cases_detail">
                        <a href="#">${pro.title}</a>
                        <p>${pro.detail}</p>
                    </div>
                </li>`;
        });
        $(".cases_list ul").html(html);
    }
});
