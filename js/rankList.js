function Lists(index) {
    $('.ran-list').html('')
    fetch(replaceHost('http://www.kuwo.cn/api/www/bang/bang/bangMenu?httpsStatus=1&reqId=7fbe3d70-e292-11ed-80ce-0752fda79b69')).then(res => res.json()).then((data) => {
        // console.log(data);

        data.data[index].list.forEach((v, i) => {

            $(`<div class="ran-item">
                <div class="pic ranList" id=${v.sourceid}>
                    <img src=${v.pic} alt="">
                </div>
                <div class="text">
                    <h3 class="ranList" id=${v.sourceid}>${v.name}</h3>
                    <p>${v.pub}</p>
                </div>
            </div>`).appendTo($('.ran-list'))


            const ranLists = document.getElementsByClassName('ranList')
            Array.from(ranLists).forEach((v, i) => {
                v.onclick = function () {
                    console.log(v.id);
                    singList(v.id)
                }
            })

        });
    })
}

Lists(0)

$('.title > .btn').on('click', function () {
    $('.title > .this').removeClass('this')
    $(this).addClass('this')
    Lists($(this).index())
})


let url = ''
function singList(id) {
    $('.song-body').html('')
    $('.msg-4').eq(0).html('')
    $('.msg-4').eq(1).html('')

    fetch(replaceHost(`http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=${id}&pn=1&rn=20&httpsStatus=1&reqId=eeae8560-e296-11ed-b1b0-13144da75633`)).then(res => res.json()).then((data) => {
        // console.log(data.data.musicList);

        data.data.musicList.forEach((v, i) => {
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

        })
    })


    // 热门评论
    fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_rec_comment&f=web&page=1&rows=5&digest=2&sid=${id}&uid=0&prod=newWeb&httpsStatus=1&reqId=eeae3740-e296-11ed-b1b0-13144da75633`)).then(res => res.json()).then((data) => {
        // console.log(data.rows);

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
    fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_comment&f=web&page=1&rows=5&digest=2&sid=${id}&uid=0&prod=newWeb&httpsStatus=1&reqId=eeca71d0-e296-11ed-b1b0-13144da75633`)).then(res => res.json()).then((data) => {
        // console.log(data.rows);

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


}

singList(93)


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

