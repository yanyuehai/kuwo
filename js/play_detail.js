// http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=261696407&httpsStatus=1&reqId=154033e0-e1b6-11ed-b76d-9975feaa3373
// http://www.kuwo.cn/api/www/music/musicInfo?mid=261696407&httpsStatus=1&reqId=15270690-e1b6-11ed-b76d-9975feaa3373
// http://www.kuwo.cn/comment?type=get_rec_comment&f=web&page=1&rows=5&digest=15&sid=261696407&uid=0&prod=newWeb&httpsStatus=1&reqId=1555
// http://www.kuwo.cn/comment?type=get_comment&f=web&page=1&rows=5&digest=15&sid=261696407&uid=0&prod=newWeb&httpsStatus=1&reqId=15680730-e1b6-11ed-b76d-9975feaa3373


// 简介
fetch(replaceHost(`http://www.kuwo.cn/api/www/music/musicInfo?mid=${location.search.split('=')[1]}&httpsStatus=1&reqId=15270690-e1b6-11ed-b76d-9975feaa3373`))
    .then(res => res.json()).then((data) => {
        console.log(data);
        $(`            <div class="pic">
        <img src=${data.data.pic} alt="">
    </div>

    <div class="text">
        <h2>专辑简介</h2>
        <p class="rows-over-els">${data.data.albuminfo}</p>
    </div>

    <div class="btn">
        <a href="#">
            <i class="iconfont icon-xiazai"></i>
            下载这首歌
        </a>
    </div>
    `).appendTo($('.ku-intro'))

        $(` <h2>${data.data.name}</h2>
    <h3 class="singers" id=${data.data.artistid}>${data.data.artist}</h3>
    <div class="text">
        <p>专辑: <span>${data.data.name}</span></p>
        <p>发行时间: <span>${data.data.releaseDate}</span></p>
    </div>
    `).appendTo($('.msg-1'))

        // 歌手跳转
        const singer = document.getElementsByClassName('singers')
        Array.from(singer).forEach((v, i) => {
            v.onclick = function () {
                location.href = `./singer_detail.html?id=${v.id}`
            }
        })

    })


// 歌曲信息
fetch(replaceHost(`http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${location.search.split('=')[1]}&httpsStatus=1&reqId=164cd700-e1b8-11ed-99eb-aba8831e46ea`))
    .then(res => res.json()).then((data) => {
        // console.log(data.data.lrclist);

        data.data.lrclist.forEach((v, i) => {
            $(`
            <p>${v.lineLyric}</p>
            `).appendTo($('.msg-3 > .text'))
        });

    })


// 热门评论
fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_rec_comment&f=web&page=1&rows=5&digest=15&sid=${location.search.split('=')[1]}&uid=0&prod=newWeb&httpsStatus=1&reqId=43758240-e1b8-11ed-9a01-c9b1eb2c1a77`))
    .then(res => res.json()).then((data) => {

        $(`<h1>热门评论 <span class="msg4-count">${data.total}条</span></h1>`).appendTo($('.msg-4').eq(0))
        data.rows.forEach((v, i) => {
            $(`<div class="user-msg">
            <div class="pic">
                <img src=${v.u_pic} alt="">
            </div>
            <div class="text">
                <h5 class="tit">${v.u_name}</h5>
                <p>${v.msg}</p>
                <p class="time">
                   ${v.time}
                  </p>
            </div>
        </div>`).appendTo($('.msg-4').eq(0))
        })
    })


// 最新评论
fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_comment&f=web&page=1&rows=5&digest=15&sid=${location.search.split('=')[1]}&uid=0&prod=newWeb&httpsStatus=1&reqId=4389cd90-e1b8-11ed-9a01-c9b1eb2c1a77`))
    .then(res => res.json()).then((data) => {
        // console.log(data);
        $(`<h1>最新评论 <span class="msg4-count">${data.total}条</span></h1>`).appendTo($('.msg-4').eq(1))
        data.rows.forEach((v, i) => {
            $(`<div class="user-msg">
            <div class="pic">
                <img src=${v.u_pic} alt="">
            </div>
            <div class="text">
                <h5 class="tit">${v.u_name}</h5>
                <p>${v.msg}</p>
                <p class="time">
                   ${v.time}
                  </p>
            </div>
        </div>`).appendTo($('.msg-4').eq(1))
        })
    })




// 歌词展开
$('.msg3-btn').on('click', function () {
    if ($('.msg3-btn > span').html() === '展开') {
        $('.msg-3 > .text').css("height", '100%')
        $('.msg3-btn > span').html('收起')
        $('.msg3-btn > i').removeClass('icon-arrow-down').addClass('icon-arrow-up')
    } else {
        $('.msg-3 > .text').css("height", '380px')
        $('.msg3-btn > span').html('展开')
        $('.msg3-btn > i').removeClass('icon-arrow-up').addClass('icon-arrow-down')
    }

})



$('.ku-logo').on('click', function () {
    location.href = './index.html'
})