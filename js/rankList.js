let id = 93

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

                    id = v.id
                    layui.use('laypage', function () {
                        var laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'test1'
                            , count: 200
                            , prev: '<em class="iconfont icon-arrow-left"></em>'
                            , next: '<em class="iconfont icon-arrow-right"></em>'
                            , jump: function (obj, first) {

                                singList.apply(this, [id, obj.curr])

                            }
                        });

                    });
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
// 渲染数据
async function singList(id, index) {
    // 歌曲列表
    let f1 = fetch(replaceHost(myUrl(`http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=${id}&pn=1&rn=20&httpsStatus=1&reqId=eeae8560-e296-11ed-b1b0-13144da75633`, index)))
    let f2 = f1.then(res => res.json())
    let f3 = await f2.then((data) => {
        songList(data.data.musicList)
        return data.data.num
    })
    this.count = f3

    // 热门评论
    fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_rec_comment&f=web&page=1&rows=5&digest=2&sid=${id}&uid=0&prod=newWeb&httpsStatus=1&reqId=eeae3740-e296-11ed-b1b0-13144da75633`)).then(res => res.json()).then((data) => {
        hotRemark(data)
    })


    // 最新评论
    fetch(replaceHost(`http://www.kuwo.cn/comment?type=get_comment&f=web&page=1&rows=5&digest=2&sid=${id}&uid=0&prod=newWeb&httpsStatus=1&reqId=eeca71d0-e296-11ed-b1b0-13144da75633`)).then(res => res.json()).then((data) => {
        upRemark(data)
    })


}

// 歌曲列表渲染函数  singList
function songList(data) {
    $('.song-body').html('')
    data.forEach((v, i) => {
        $(`<tr>
        <td>${i + 1}</td>
        <td><img src=${v.albumpic} alt="" class="ku-sing" id=${v.rid}></td>
        <td class="ku-sing" id=${v.rid}> <div class="sing-icon">${v.name} <div class="ku-icon">
        ${v.online ? '<i class="iconfont icon-wusun-"></i>' : ''}
        ${v.hasmv ? '<i class="iconfont icon-mv"></i>' : ''}
        </div></div></td>
        <td class="singers" id=${v.artistid}>${v.album}</td>
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

        // 歌曲跳转
        const singers = document.getElementsByClassName('ku-sing')
        Array.from(singers).forEach((v, i) => {
            v.onclick = function () {
                location.href = `./play_detail.html?id=${v.id}`
            }
        })

        // 歌手跳转
        const singer = document.getElementsByClassName('singers')
        Array.from(singer).forEach((v, i) => {
            v.onclick = function () {
                location.href = `./singer_detail.html?id=${v.id}`
            }
        })


    })
}


// 热门评论渲染函数
function hotRemark(data) {
    $('.msg-4').eq(0).html('')
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
}



// 最新评论渲染函数
function upRemark(data) {
    $('.msg-4').eq(1).html('')
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
}



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

            singList.apply(this, [id, obj.curr])

        }
    });

});