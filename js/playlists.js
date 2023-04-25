let url = 'http://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList?pn=1&rn=20&order=new&httpsStatus=1&reqId=1e1f0b70-e360-11ed-b6bd-bbf4def6f09a'


// 渲染列表
async function playList(url) {

    $('.list').html('')
    let f1 = fetch(replaceHost(url))
    let f2 = f1.then(res => res.json())
    let f3 = await f2.then((data) => {
        // console.log(data);
        data.data.data.forEach((v, i) => {
            $(`            <div class="playlist-item">
            <div class="pic_out play-list" id=${v.id}>
                <img src=${v.img} alt="">
                <div class="mack">
                    <span>
                        <i class="iconfont icon-bofang-01"></i>
                    </span>
                </div>
            </div>
            <div class="text">
                <h3 class="item-title play-list" id=${v.id}>${v.name}</h3>
                <p><i class="iconfont icon-bofang"></i>${count(v.listencnt)}</p>
            </div>
            </div>`).appendTo($('.list'))
        });

        // 歌单跳转
        let playList = document.getElementsByClassName('play-list')
        Array.from(playList).forEach((v, i) => {
            v.onclick = function () {
                location.href = `./playlist_detail.html?id=${v.id}`
            }
        })
        return data.data.total
    })

    this.count = f3
}

// 格式化粉丝
function count(num) {

    return parseInt(num / 10000) ? '' + parseInt(num / 10000) + '.' + parseInt(num % 10000 / 100) + '万' : num
}


// 点击事件
$('.title > p').on('click', function () {
    $('.title > .this').removeClass('this')
    $(this).addClass('this')

    if ($(this).index() === 2) {
        url = 'http://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList?pn=1&rn=20&order=hot&httpsStatus=1&reqId=7143f870-e27e-11ed-80ce-0752fda79b69'
    } else {
        url = 'http://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList?pn=1&rn=20&order=new&httpsStatus=1&reqId=3d1338e0-e27e-11ed-80ce-0752fda79b69'
    }
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1'
            , count: 200
            ,prev: '<em class="iconfont icon-arrow-left"></em>'
            ,next: '<em class="iconfont icon-arrow-right"></em>'
            , jump: function (obj, first) {
                console.log(obj.curr);
                playList.apply(this, [myUrl(url, obj.curr)])
                console.log(this.count);
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
  $('.ku-logo').on('click', function() {
    location.href = './index.html'
})


layui.use('laypage', function () {
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
        elem: 'test1'
        , count: 200
        ,limit : 20
        ,prev: '<em class="iconfont icon-arrow-left"></em>'
        ,next: '<em class="iconfont icon-arrow-right"></em>'
        , jump: function (obj, first) {
            playList.apply(this, [myUrl(url, obj.curr)])
        }
    });

});