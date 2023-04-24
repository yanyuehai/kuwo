let tab1 = ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
let tab2 = ['全部', '华语男', '华语女', '华语组合', '日韩男', '日韩女', '日韩组合', '欧美男', '欧美女', '欧美组合', '其他']
let url = `http://www.kuwo.cn/api/www/artist/artistInfo?category=0&pn=1&rn=60&httpsStatus=1&reqId=370244e0-e275-11ed-a76c-8f2cdca77afe`

tab1.forEach((v, i) => {
    if (i === 0) {
        $(`<div class="this">${v}</div>`).appendTo($('.ku-tab1'))
    } else {
        $(`<div>${v}</div>`).appendTo($('.ku-tab1'))
    }
})

$('.ku-tab1 div').on('click', function () {
    $('.ku-tab1 > .this').removeClass('this')
    $(this).addClass('this')
 
    if($('.ku-tab2 > .this').index() === 0){
        url = `http://www.kuwo.cn/api/www/artist/artistInfo?category=0&prefix=${$(this).html()}&pn=1&rn=60&httpsStatus=1&reqId=ba4edeb0-e277-11ed-8a5b-0fea4f38a8be`
    }else{
        url = `http://www.kuwo.cn/api/www/artist/artistInfo?category=${$('.ku-tab2 > .this').index()}&prefix=${$(this).html()}&pn=1&rn=60&httpsStatus=1&reqId=f03e0200-e275-11ed-a76c-8f2cdca77afe`

    }
    singer(url)
})

tab2.forEach((v, i) => {
    if (i === 0) {
        $(`<div class="this">${v}</div>`).appendTo($('.ku-tab2'))
    } else {
        $(`<div>${v}</div>`).appendTo($('.ku-tab2'))
    }
})
$('.ku-tab2 div').on('click', function () {
    $('.ku-tab2 > .this').removeClass('this')
    $(this).addClass('this')

    if($('.ku-tab1 > .this').html() === '热门'){
        console.log(11);
       url = `http://www.kuwo.cn/api/www/artist/artistInfo?category=${$(this).index()}&prefix=&pn=1&rn=60&httpsStatus=1&reqId=cbf765c0-e276-11ed-9466-817cc3d6ce6f`
    }else{
        url = `http://www.kuwo.cn/api/www/artist/artistInfo?category=${$(this).index()}&prefix=${$('.ku-tab1 > .this').html()}&pn=1&rn=60&httpsStatus=1&reqId=f03e0200-e275-11ed-a76c-8f2cdca77afe`

    }
    singer(url)
})


singer(url)
function singer(url) {
    $('.max-list').html('')
    $('.min-list').html('')
    fetch(replaceHost(url)).then(res => res.json()).then((data) => {
        // console.log(data.data.artistList); 
        data.data.artistList.forEach((v, i) => {
            if (i < 12) {
                $(`<div class="max">
    <div class="pic on-singer" id=${v.id}>
        <img src=${v.pic} alt="">
    </div>
    <div class="text">
        <h4 class="on-singer" id=${v.id}>${v.name}</h4>
        <p>${v.musicNum}首歌曲</p>
    </div>
</div>`).appendTo($('.max-list'))
            } else {
                $(`<div class="min">
            <div class="pic on-singer" id=${v.id}>
                <img src=${v.pic} alt="">
            </div>
            <p class="on-singer" id=${v.id}>${v.name}</p>
        </div>`).appendTo($('.min-list'))
            }

            const onsingers = document.getElementsByClassName('on-singer')
            Array.from(onsingers).forEach((v, i) => {
                v.onclick = function () {
                    location.href = `./singer_detail.html?id=${v.id}`
                }
            })

        })
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


  $('.ku-logo').on('click', function() {
    location.href = './index.html'
})