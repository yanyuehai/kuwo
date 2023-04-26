let url = 'http://www.kuwo.cn/api/www/music/mvList?pid=236682871&pn=1&rn=20&httpsStatus=1&reqId=f9c9ab90-e283-11ed-80ce-0752fda79b69'
let count = 300
// mv
async function mvs(url) {
    let f1 = fetch(replaceHost(url))
    let f2 = f1.then(res => res.json())
    let f3 = await f2.then((data) => {
        mvList(data.data.mvlist)
        return data.data.total
    })
    this.count = f3
}

// mv列表渲染函数
function mvList(data) {
    $('.list').html('')
    data.forEach((v, i) => {
        $(`<div class="mv-item">
        <div class="pic">
            <img src=${v.pic} alt="">

            <div class="mack">
                <span><i class="iconfont icon-bofang-01"></i></span>
            </div>
            <div class="msg">
                <p><i class="iconfont icon-bofang"></i> ${v.mvPlayCnt}</p>
                <p>${v.songTimeMinutes}</p>
            </div>
            <div class="shadow"></div>
        </div>
        <div class="text">
            <h3>${v.name}</h3>
            <p>${v.artist}</p>
        </div>
    </div>`).appendTo($('.list'))
    });
}



// 分类点击事件
$('.btn').on('click', function () {
    $('.title > .this').removeClass('this')
    $(this).addClass('this')

    url = `http://www.kuwo.cn/api/www/music/mvList?pid=${$(this).attr('id')}&pn=1&rn=20&httpsStatus=1&reqId=f9c9ab90-e283-11ed-80ce-0752fda79b69`
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1'
            , count: 200
            , jump: function (obj, first) {
                mvs.apply(this, [myUrl(url, obj.curr)])

            }
        });

    });
})


// 导航栏点击
$('.ku-nav > li').eq(0).on('click', function () {
    location.href = './index.html'
})

$('.ku-nav > li').eq(1).on('click', function () {
    location.href = './rankList.html'
})

$('.ku-nav > li').eq(2).on('click', function () {
    location.href = './singers.html'
})

$('.ku-nav > li').eq(3).on('click', function () {
    location.href = './playlists.html'
})

$('.ku-nav > li').eq(4).on('click', function () {
    location.href = './mvs.html'
})

$('.ku-logo').on('click', function () {
    location.href = './index.html'
})

// 分页
layui.use('laypage', function () {
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
        elem: 'test1'
        , count: 200
        , limit: 20
        , prev: '<em class="iconfont icon-arrow-left"></em>'
        , next: '<em class="iconfont icon-arrow-right"></em>'
        , jump: function (obj, first) {
            mvs.apply(this, [myUrl(url, obj.curr)])

        }
    });

});

