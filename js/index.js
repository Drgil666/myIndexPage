const url = 'http://10.21.234.24:8080'
let user;
let userId = null;
let bookMarkList;

function getBookMark() {
    $.ajax({
        type: 'get',
        url: 'http://10.21.234.24:8080/api/bookmark',
        dataType: 'json',
        async: false,
        contentType: 'application/json;charset=utf-8',
        data: {
            'userId': localStorage.getItem("userId")
        },
        success: function (result) {
            console.log(result.data)
            bookMarkList = result.data;
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function onload() {
    // localStorage.removeItem("userId");
    userId = localStorage.getItem("userId");
    if (userId !== null) {
        getUser(userId);
    }
    setUserInfo();
    // localStorage.removeItem("bookmark");
    let img = localStorage.getItem('backImg');
    // console.log(img);
    if (img === null)
        img = '../image/background/background.jpg';
    // console.log(img);
    document.getElementsByTagName('body')[0].background = img;
}

function setUserInfo() {
    if (userId !== null) {
        document.getElementById("user_info_login_username").hidden = true;
        document.getElementById("user_info_login_password").hidden = true;
        document.getElementById("user_info_login").hidden = true;
        document.getElementById("user_info_logout").hidden = false;
        document.getElementById("user_info_username").hidden = false;
    } else {
        document.getElementById("user_info_login_username").hidden = false;
        document.getElementById("user_info_login_password").hidden = false;
        document.getElementById("user_info_login").hidden = false;
        document.getElementById("user_info_logout").hidden = true;
        document.getElementById("user_info_username").hidden = true;
    }
    console.log(userId);
    console.log(user)
    let img = document.getElementById("user_button");
    if (userId !== null && user.img !== null)
        img.style.backgroundImage = "url('" + user.img + "')";
    else {
        img.style.backgroundImage = "url('../image/ui/user_logo.png')";
    }
    let username = document.getElementById("user_info_username");
    if (userId !== null && user.username !== null) {
        username.innerHTML = user.username;
    }
    let nick = document.getElementById("user_info_nick");
    if (userId !== null && user.nick !== null) {
        nick.innerHTML = user.nick;
    }
}

function getBookMarkList() {
    if (localStorage.getItem("userId") !== null) {
        getBookMark();
        for (let index = 0; index < bookMarkList.bookMarkItemList.length; index++) {
            bookMarkList.bookMarkItemList[index].img = 'http://favicon.cccyun.cc/' + bookMarkList.bookMarkItemList[index].url;
        }
        // console.log(bookMarkList);
    }
    return bookMarkList;
}

function getUser() {
    $.ajax({
        type: 'get',
        url: url + '/api/user',
        dataType: 'json',
        async: false,
        contentType: 'application/json;charset=utf-8',
        data: {
            'userId': localStorage.getItem("userId")
        },
        success: function (result) {
            user = result.data
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function get_request_demo() {
    $.ajax({
        type: 'get',
        url: 'http://10.21.234.24:8080/api/user',
        dataType: 'json',
        async: false,
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

function post_request_demo() {
    $.ajax({
            type: 'post',
            url: 'http://10.21.234.24:8080/api/user',
            dataType: 'json',
            async: false,
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

function search() {
    let value = document.forms["search_form"]["search_select"].value;
    let keyword = document.forms["search_form"]["keyword"].value;
    if (keyword !== "") {
        console.log("value=" + value);
        console.log("keyword=" + keyword);
        window.event.returnValue = false;
        switch (value) {
            case "google": {
                window.location.href = "https://www.google.com/search?q=" + keyword;
                break;
            }
            case "baidu": {
                window.location.href = "https://www.baidu.com/s?wd=" + keyword;
                break;
            }
            case "google_trans": {
                window.location.href = "https://translate.google.com/#view=home&op=translate&sl=en&tl=zh-CN&text=" + keyword;
                break;
            }
            case "baidu_trans": {
                window.location.href = "https://fanyi.baidu.com/#en/zh/" + keyword;
                break;
            }
            case "github": {
                window.location.href = "https://github.com/search?q=" + keyword;
                break;
            }
            default: {
                alert("表单信息错误!");
                break;
            }
        }
    }
}

function login() {
    let username = document.getElementById("user_info_login_username").value;
    let password = document.getElementById("user_info_login_password").value;
    console.log(username);
    console.log(password);
    $.ajax({
            type: 'post',
            url: 'http://10.21.234.24:8080/api/user/login',
            dataType: 'json',
            async: false,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                'username': username,
                "password": password
            }),
            success: function (result) {
                console.log(result)
                if (result.code === 0) {
                    localStorage.setItem("userId", result.data);
                    alert("登录成功!");
                    location.reload();
                } else {
                    alert("用户名或密码错误!")
                }
            },
            error: function (e) {
                console.log(e)
                alert("连接失败!");
            }
        }
    )
}

function logout() {
    localStorage.removeItem("userId");
    location.reload();
}
