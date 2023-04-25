//注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function () {
    var element = layui.element;

    //…
});


// 轮播图
let arr = [
    'https://kwimg1.kuwo.cn/star/upload/73/44/1677749209264_.png',
    'https://kwimg4.kuwo.cn/star/upload/63/45/1681374983571_.jpg',
    'https://kwimg1.kuwo.cn/star/upload/67/29/1681373487487_.jpg',
    'https://kwimg4.kuwo.cn/star/upload/74/13/1681372417997_.jpg',
    'https://kwimg2.kuwo.cn/star/upload/53/89/1681697677427_.jpg'
]

fetch(replaceHost('http://www.kuwo.cn/api/www/banner/index/bannerList?httpsStatus=1&reqId=9a7c8d40-e30c-11ed-bb90-f572078b677b')).then(res => res.json()).then((data) => {
    localStorage.setItem('data', JSON.stringify(data.data))
})

if (localStorage.getItem('data')) {
    JSON.parse(localStorage.getItem('data')).forEach((v, i) => {
        $(`<div><img src="${v.pic}" alt=""><div class="mack" style="background-image: url(${v.pic});"></div></div>`).appendTo($('.carousel-main'))
    })
}else{
    arr.forEach((v, i) => {
        $(`<div><img src="${v}" alt=""><div class="mack" style="background-image: url(${v});"></div></div>`).appendTo($('.carousel-main'))
        
    })
}


// 推荐歌单
let urls = [
    'http://www.kuwo.cn/api/www/rcm/index/playlist?id=rcm&pn=1&rn=5&httpsStatus=1&reqId=5b0df4f0-e109-11ed-8727-47900d59bf0e',
    'http://www.kuwo.cn/api/www/classify/playlist/getTagPlayList?id=1848&pn=1&rn=5&httpsStatus=1&reqId=8b879560-e108-11ed-8b71-933893b16136',
    'http://www.kuwo.cn/api/www/classify/playlist/getTagPlayList?id=621&pn=1&rn=5&httpsStatus=1&reqId=607c9d30-e10c-11ed-8727-47900d59bf0e',
    'http://www.kuwo.cn/api/www/classify/playlist/getTagPlayList?id=146&pn=1&rn=5&httpsStatus=1&reqId=977b94c0-e108-11ed-8b71-933893b16136',
    'http://www.kuwo.cn/api/www/classify/playlist/getTagPlayList?id=35&pn=1&rn=5&httpsStatus=1&reqId=9e1d1f10-e108-11ed-8b71-933893b16136'
]

playlist(urls[0], 0)

function playlist(url, index) {
    $('.playlist').eq(index).html('')
    fetch(replaceHost(url)).then(res => res.json()).then((data) => {

        if (index === 0) {
            $('.playlist').eq(index).html('')
            data.data.list.forEach((v, i) => {
                if (i < 5) {
                    $(`
                    <div class="playlist-item">
                    <div class="pic_out play-list" id=${v.id}>
                        <img src=${v.img}
                            alt="">
                        <div class="mack">
                            <span>
                                <i class="iconfont icon-bofang-01"></i>
                            </span>
                        </div>
                    </div>
                    <div class="text">
                        <h3 class="item-title play-list" id=${v.id} >${v.name}</h3>
                        <p><i class="iconfont icon-bofang"></i>${count(v.listencnt)}</p>
                    </div>
                </div>
                    `).appendTo($('.playlist').eq(index))
                }

            })

            // 歌单跳转
            let playList = document.getElementsByClassName('play-list')
            Array.from(playList).forEach((v, i) => {
                v.onclick = function () {
                    location.href = `./playlist_detail.html?id=${v.id}`
                }
            })

        } else {
            $('.playlist').eq(index).html('')
            data.data.data.forEach((v, i) => {
                $(`
                <div class="playlist-item">
                <div class="pic_out play-list" id=${v.id}>
                    <img src=${v.img}
                        alt="">
                    <div class="mack">
                        <span>
                            <i class="iconfont icon-bofang-01"></i>
                        </span>
                    </div>
                </div>
                <div class="text">
                    <h3 class="item-title play-list" id=${v.id} >${v.name}</h3>
                    <p><i class="iconfont icon-bofang"></i>${count(v.listencnt)}</p>
                </div>
            </div>
                `).appendTo($('.playlist')).eq(index)
            })


            // 歌单跳转
            let playList = document.getElementsByClassName('play-list')
            Array.from(playList).forEach((v, i) => {
                v.onclick = function () {
                    location.href = `./playlist_detail.html?id=${v.id}`
                }
            })


        }

    })



}


function count(num) {

    return parseInt(num / 10000) ? '' + parseInt(num / 10000) + '.' + parseInt(num % 10000 / 100) + '万' : num
}

$('.tab-playlist > li').on('click', function () {
    playlist(urls[$(this).index() - 1], $(this).index() - 1)
})



// 排行榜

let topurl = [
    'http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=16&pn=1&rn=20&httpsStatus=1&reqId=f8731300-e114-11ed-9eb3-99f92aee570a',
    'http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=17&pn=1&rn=20&httpsStatus=1&reqId=1977ae30-e115-11ed-9eb3-99f92aee570a',
    'http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=93&pn=1&rn=20&httpsStatus=1&reqId=2c904a90-e115-11ed-9eb3-99f92aee570a',
    'http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=284&pn=1&rn=20&httpsStatus=1&reqId=eed906c0-e1a4-11ed-80ca-ebf670af7ae6',
    'http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=26&pn=1&rn=20&httpsStatus=1&reqId=0cf91fa0-e1a5-11ed-80ca-ebf670af7ae6'
]
ranking()
function ranking() {

    for (let index = 0; index < 5; index++) {
        fetch(replaceHost(topurl[index])).then(res => res.json()).then((data) => {

            $(`
            <div class="bang-title" style="background-image: url(${data.data.musicList[0].albumpic});">
            <div class="tit" style="background-image: url(${data.data.img})"></div>
    
            <div class="mack"></div>
    
            <span><i class="iconfont icon-bofang-01"></i></span>
             </div>
            `).appendTo($('.bang').eq(index))

            data.data.musicList.forEach((v, i) => {
                if (i < 5) {
                    if (i < 3) {
                        $(`<ul>
                        <li>
                            <div class="index top${i + 1}"></div>
                            <div class="text">
                                <h4 class="over-els song" id=${v.rid}>${v.name}</h4>
                                <p class="over-els singers" id=${v.artistid}>${v.artist}</p>
                            </div>
                        </li>
                    </ul>`).appendTo($('.bang').eq(index))
                    } else {
                        $(`
                        <ul>
                        <li>
                            <div class="index">${i + 1}</div>
                            <div class="text">
                                <h4 class="over-els song" id=${v.rid} >${v.name}</h4>
                                <p class="over-els singers" id=${v.artistid} >${v.artist}</p>
                            </div>
                        </li>
                    </ul>
                        `).appendTo($('.bang').eq(index))
                    }

                }
            })


            // 歌曲跳转
            const songs = document.getElementsByClassName('song')
            Array.from(songs).forEach((v, i) => {
                v.onclick = function () {
                    location.href = `./play_detail.html?id=${v.id}`
                }
            })

            // 歌手跳转
            const singers = document.getElementsByClassName('singers')
            Array.from(singers).forEach((v, i) => {
                v.onclick = function () {
                    location.href = `./singer_detail.html?id=${v.id}`
                }
            })


        })

    }



}




// 推荐歌手
let singerUrl = [
    'http://www.kuwo.cn/api/www/artist/artistInfo?category=11&pn=1&rn=6&httpsStatus=1&reqId=04708900-e1a9-11ed-a0e2-3fef22538b0b',
    'http://www.kuwo.cn/api/www/artist/artistInfo?category=13&pn=1&rn=6&httpsStatus=1&reqId=17a7d0f0-e1a9-11ed-a0e2-3fef22538b0b',
    'http://www.kuwo.cn/api/www/artist/artistInfo?category=12&pn=1&rn=6&httpsStatus=1&reqId=1f7e31c0-e1a9-11ed-a0e2-3fef22538b0b',
    'http://www.kuwo.cn/api/www/artist/artistInfo?category=16&pn=1&rn=6&httpsStatus=1&reqId=27f42df0-e1a9-11ed-a0e2-3fef22538b0b'
]

singer(singerUrl[0], 0)

function singer(url, index) {
    $('.singer-list').eq(index).html('')
    $('.playlist').eq(index).html('')
    fetch(replaceHost(url)).then(res => res.json()).then((data) => {


        data.data.artistList.forEach((v, i) => {
            $(`
            <li>
                <div class="pic singers" id=${v.id}>
                <img src=${v.pic} alt="">
             </div>
            <div class="text">
                <h3 class="singers" id=${v.id}>${v.name}</h3>
                <p>
                    ${v.musicNum}首歌曲
                  </p>
                </div>
            </li>
            `).appendTo($('.singer-list').eq(index))
        })

        // 歌手跳转
        const singers = document.getElementsByClassName('singers')
        Array.from(singers).forEach((v, i) => {
            v.onclick = function () {
                location.href = `./singer_detail.html?id=${v.id}`
            }
        })

    })
}

$('.tab-singer > li').on('click', function () {
    singer(singerUrl[$(this).index() - 1], $(this).index() - 1)
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

layui.use('carousel', function () {
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
        elem: '#test1'
        , width: '100%' //设置容器宽度
        , arrow: 'hover' //始终显示箭头
        , autoplay: true

        // , anim: 'fade' //切换动画方式
    });
});


//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function () {
    var element = layui.element;

    //…
});


$('.ku-sings').on('click', function () {
    console.log($(this).index());
    if ($(this).index() === 6) {
        location.href = './playlists.html'
    } else if ($(this).index() === 1) {
        location.href = './rankList.html'
    } else if ($(this).index() === 5) {
        location.href = './singers.html'
    }
})