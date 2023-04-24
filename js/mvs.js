let url = 'http://www.kuwo.cn/api/www/music/mvList?pid=236682871&pn=1&rn=20&httpsStatus=1&reqId=f9c9ab90-e283-11ed-80ce-0752fda79b69'
function mvs(url) {
    $('.list').html('')
    fetch(replaceHost(url)).then(res => res.json()).then((data) => {
        data.data.mvlist.forEach((v, i) => {
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
    })
}


mvs(url)


$('.btn').on('click', function() {
    $('.title > .this').removeClass('this')
    $(this).addClass('this')

    url = `http://www.kuwo.cn/api/www/music/mvList?pid=${$(this).attr('id')}&pn=1&rn=20&httpsStatus=1&reqId=f9c9ab90-e283-11ed-80ce-0752fda79b69`
    mvs(url)
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