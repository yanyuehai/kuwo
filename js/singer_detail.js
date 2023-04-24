fetch(replaceHost(`http://www.kuwo.cn/api/www/artist/artist?artistid=${location.search.split('=')[1]}&httpsStatus=1&reqId=879eb330-e24c-11ed-a8ee-394a395caef0`)).then(res => res.json()).then((data) => {
    // console.log(data);
    $(` <div class="pic">
    <img src=${data.data.pic300} alt="">
</div>

<div class="text">
    <h1>${data.data.name}</h1>
    <p class="count">单曲: <span>${data.data.musicNum}</span> 专辑: <span>${data.data.albumNum}</span> MV: <span>${data.data.mvNum} 粉丝: <span>${data.data.artistFans}</span></span></p>
    <p class="msg">英文名: <span>${data.data.birthday ? data.data.birthday : '-'}</span> 国籍: <span>${data.data.country}</span> 语言: <span>${data.data.language}</span> 出生地: <span>${data.data.birthplace}</span> 星座: <span>${data.data.constellation}</span></p>
    <div class="msg-btn">
        <div class="btn"><i class="iconfont icon-bofang"></i>播放全部歌曲</div>
        <div class="btn"><i class="iconfont icon-shoucang"></i>收藏</div>
        <div class="btn"><i class="iconfont icon-diannao"></i>使用客户端查看歌手</div>
    </div>
</div>`).appendTo($('.singers'))

})


// 列表
fetch(replaceHost(`http://www.kuwo.cn/api/www/artist/artistMusic?artistid=${location.search.split('=')[1]}&pn=1&rn=20&httpsStatus=1&reqId=8e4b1420-e266-11ed-912c-253c1ee079d6`)).then(res => res.json()).then((data) => {
    // console.log(data);

    data.data.list.forEach((v, i) => {

        $(`<tr>
    <td>${i + 1}</td>
    <td><img src=${v.albumpic} alt="" class="ku-sing" id=${v.rid}></td>
    <td class="ku-sing" id=${v.rid}>${v.name}</td>
    <td>${v.album}</td>
    <td>${v.songTimeMinutes}</td>
    <td class="tab">
        <div>
            <i class="iconfont icon-bofang"></i>
            <i class="iconfont icon-tianjia"></i>
            <i class="iconfont icon-shoucang"></i>
            <i class="iconfont icon-xiazai"></i>
        </div>
    </td>
    </tr>`).appendTo($('.song-body'))


    const singers = document.getElementsByClassName('ku-sing')
        Array.from(singers).forEach((v, i) => {
            v.onclick = function () {
                location.href = `./play_detail.html?id=${v.id}`
            }
        })
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