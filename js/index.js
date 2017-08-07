
/**：页面加载完后，异步请求页头和页尾**/
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
        navText('网站首页');

    });
    $('div#footer').load('footer.php');
});

$('#header').on('click','#logout',function(e){
    e.preventDefault();
    sessionStorage.removeItem('LoginName');
    location.href="login.html";
});


//菜单右边
$('#cate_box li').hover(function(){
     $(this).find('.sub_cate_items').css({'display':'block'})
}, function(){
     $(this).find('.sub_cate_items').css({'display':'none'})}
);


/*导航栏下的  大轮播图*/
$('.slider').slider();

//热门  排行  手风琴效果
$('.hot_sale_item h4').hover(
    function(){
        $(this).next().addClass('active')
               .parent()
               .siblings().find('div').removeClass('active');
    }
);

//为你推荐 遮罩层
$('.recommend_show').on("mouseover mouseout",'li',function(event){
    if(event.type == "mouseover"){
        //鼠标悬浮
        console.log(this);
        $(this).find('div').css({'height':'100%','padding-top':'60px',
                                  'transition':'all 0.3s ease '})
    }else if(event.type == "mouseout"){
        //鼠标离开
        $(this).find('div').css({'height':'45px','padding-top':'0'})
    }
});

//异步加载为你推荐展示橱
$.ajax({
    type:"GET",
    url:"data/11_recommend_show_list.php",
    success:function(d){
        var html='';
        $.each(d,function(i,p){
            html+=`
                   <li>
                        <a href="product_detail.html?pid=${p.pid}">
                            <img src="${p.pic}" alt=""/>
                            <div>
                                <h3>${p.pname}<b>￥</b>${p.price}</h3>
                                <p>${p.detail}</p>
                            </div>
                        </a>
                    </li>
                `;
        });
        $('.recommend_show').html(html);
    }
});
