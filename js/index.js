const url = '10.21.234.24:8080'

function onload() {
    // localStorage.removeItem("bookmark");
    let bookMarkList = JSON.parse(localStorage.getItem('bookmark'));
    if (bookMarkList === null || bookMarkList.length === 0) {
        bookMarkList = [
            {
                'url': 'www.baidu.com',
                'nick': '百度',
                'img': null
            },
            {
                'url': 'www.codeforces.com',
                'nick': 'CodeForces',
                'img': null
            },
            {
                'url': 'acm.hdu.edu.cn',
                'nick': '杭电oj',
                'img': null
            }
        ];
        localStorage.setItem('bookmark', JSON.stringify(bookMarkList));
    }
    let img = localStorage.getItem('backImg');
    if (img === null)
        img = '../image/background/background.jpg';
    // console.log(img);
    document.getElementsByTagName('body')[0].background = img;
}


function getBookMarkList() {
    let bookMarkList = JSON.parse(localStorage.getItem('bookmark'));
    for (let index = 0; index < bookMarkList.length; index++) {
        bookMarkList[index].img = 'http://favicon.cccyun.cc/' + bookMarkList[index].url;
    }
    return bookMarkList;
}

function test1() {
    $.ajax({
        type: 'get',
        url: 'http://10.21.234.24:8080/api/user',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: {
            'userId': 1
        },
        success: function (result) {
            console.log(result)
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function test2() {
    $.ajax({
            type: 'post',
            url: 'http://10.21.234.24:8080/api/user',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                'method': 'create',
                'data': {
                    'username': '1111',
                    'stuNo': '111',
                    'mail': '111@qq.com',
                    'nick': '111',
                    'photoId': '111',
                    'academy': 0,
                    'major': 0,
                    'school': 0
                },
                'key': []
            }),
            success: function (result) {
                console.log(result)
            },
            error: function (e) {
                console.log(e)
            }
        }
    )
}
