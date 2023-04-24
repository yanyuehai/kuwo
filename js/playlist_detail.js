// http://www.kuwo.cn/api/www/playlist/playListInfo?pid=1082685104&pn=1&rn=20&httpsStatus=1&reqId=80eae560-e1c8-11ed-8e82-03a700c74c54
// 简介
fetch(replaceHost(`http://www.kuwo.cn/api/www/playlist/playListInfo?pid=${location.search.split('=')[1]}&pn=1&rn=20&httpsStatus=1&reqId=e8e2ecf0-e1cb-11ed-8e82-03a700c74c54`))
    .then(res => res.json()).then((data) => {


        // 歌单简介
        $(`            <div class="pic">
        <img src=${data.data.img300} alt="">
    </div>

    <div class="text">
        <h2>歌单简介</h2>
        <p class="rows-over-els">${data.data.info}</p>
    </div>

    <div class="btn">
        <a href="#">
            <i class="iconfont icon-xiazai"></i>
            下载该歌单
        </a>
    </div>
    `).appendTo($('.ku-intro'))

        $(` <h2>${data.data.name}</h2>
    <h3><img src=${data.data.uPic} alt="" class="u-pic">${data.data.userName}</h3>
    <div class="text">
        <p><span>${data.data.tag}</span></p>
    </div>
    `).appendTo($('.msg-1'))
        // console.log(data);
        // 歌曲列表
        data.data.musicList.forEach((v, i) => {
            $(`<tr>
            <td>${i + 1}</td>
            <td class="ku-sing" id=${v.rid}>${v.name}</td>
            <td>${v.artist}</td>
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


// 热门评论
fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_rec_comment&f=web&page=1&rows=5&digest=8&sid=${location.search.split('=')[1]}&uid=0&prod=newWeb&httpsStatus=1&reqId=7d754960-e246-11ed-84f7-e59944a18420`))
    .then(res => res.json()).then((data) => {
        // console.log(data);
        if (data.rows) {
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
        } else {
            $(`<h1>热门评论 <span class="msg4-count">0条</span></h1>`).appendTo($('.msg-4').eq(0))
            $('<div class="user-tit">暂无评论</div>').appendTo($('.msg-4').eq(0))
        }

    })


// 最新评论
fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_comment&f=web&page=1&rows=5&digest=8&sid=${location.search.split('=')[1]}&uid=0&prod=newWeb&httpsStatus=1&reqId=7d7d1190-e246-11ed-84f7-e59944a18420`))
    .then(res => res.json()).then((data) => {
        // console.log(data);
        if (data.rows) {
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
        } else {
            $(`<h1>最新评论 <span class="msg4-count">0条</span></h1>`).appendTo($('.msg-4').eq(1))
            $('<div class="user-tit">暂无评论</div>').appendTo($('.msg-4').eq(1))
        }
    })



    $('.ku-logo').on('click', function() {
        location.href = './index.html'
    })