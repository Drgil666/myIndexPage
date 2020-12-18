function onload() {
    getUser();
}

const url = 'http://10.21.234.24:8080'
let bookMarkList = null;
let user = null;

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

function getOptions() {
    return [{
        "name": "壁纸设置",
    }, {
        "name": "收藏夹设置"
    }, {
        "name": "用户设置"
    }
    ];
}

function updateUser() {
    $.ajax({
            type: 'post',
            url: url + '/api/user',
            dataType: 'json',
            async: false,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                'method': 'update',
                'data': user,
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

function updateBookMark(data) {
    $.ajax({
            type: 'post',
            url: url + '/api/bookmark',
            dataType: 'json',
            async: false,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                'method': 'update',
                'data': data,
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

function modeSelect(index) {
    // console.log(index);
    let optionList = document.getElementById("optionList");
    optionList.id = "optionList";
    optionList.innerHTML = "";
    if (index === 0) {
        modeBackImg();
    } else if (index === 1) {
        modeBookMark();
    } else if (index === 2) {
        modeInk();
    }
}

function modeBackImg() {
    let optionList = document.getElementById("optionList");
    optionList.innerHTML = "";
    let fileUpLoad = document.createElement("input");
    fileUpLoad.id = "fileUpLoad";
    fileUpLoad.name = "fileUpLoad";
    fileUpLoad.type = "file";
    fileUpLoad.accept = "image/*";
    fileUpLoad.hidden = "hidden";
    fileUpLoad.onchange = function () {
        let url = fileUpLoad.value;
        console.log(url);
        let file = fileUpLoad.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let base64Img = this.result;
            console.log(base64Img);
            localStorage.setItem("backImg", base64Img);
            alert("壁纸修改成功!");
        }
    }
    let uploadButton = document.createElement("button");
    uploadButton.id = "button";
    uploadButton.name = "button";
    uploadButton.style = "width:100px;height:50px";
    uploadButton.innerText = "文件上传";
    let clearButton = document.createElement("button");
    clearButton.id = "clearButton";
    clearButton.name = "clearButton";
    clearButton.style = "width:100px;height:50px";
    clearButton.innerText = "恢复默认设置";
    clearButton.onclick = function () {
        localStorage.removeItem("backImg");
        alert("恢复成功!");
    }
    optionList.appendChild(clearButton);
    optionList.appendChild(fileUpLoad);
    optionList.appendChild(uploadButton);
    document.getElementById("button").addEventListener("click", function () {
        fileUpLoad.click();
    });
}

function isValidUrl(url) {
    let urlRegex1 = "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$";
    let urlRegex2 = "^(?=^.{3,255}$)(http(s)?:\\/\\/)?(www\\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\\d+)*(\\/\\w+\\.\\w+)*$";
    let urlRegex3 = "^(?=^.{3,255}$)(http(s)?:\\/\\/)?(www\\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\\d+)*(\\/\\w+\\.\\w+)*([\\?&]\\w+=\\w*)*$";
    return (url.match(urlRegex1) || url.match(urlRegex2) || url.match(urlRegex3))
}

function modeBookMark() {
    let optionList = document.getElementById("optionList");
    optionList.innerHTML = "";
    getBookMark();
    // console.log(bookMarkList);
    let listDiv = document.createElement("div");
    listDiv.id = "listDiv";
    listDiv.name = "listDiv";
    listDiv.style.position = "relative";
    listDiv.style.width = "500px";
    listDiv.style.height = "auto";
    listDiv.style.top = "150px";
    listDiv.style.left = "100px";
    for (let i = 0; i < bookMarkList.bookMarkItemList.length; i++) {
        let bookmarkDiv = document.createElement("div");
        bookmarkDiv.id = "listItem-" + i;
        bookmarkDiv.name = "listItem-" + i;
        bookmarkDiv.style.position = "relative";
        bookmarkDiv.style.width = "500px";
        bookmarkDiv.style.height = "25px";
        let item_nick = document.createElement("input");
        item_nick.id = "item_nick-" + i;
        item_nick.name = "item_nick-" + i;
        item_nick.type = "text";
        item_nick.value = bookMarkList.bookMarkItemList[i].nick;
        item_nick.style.position = "relative";
        item_nick.style.left = "20px";
        item_nick.style.width = "100px";
        item_nick.style.fontSize = "18px";
        item_nick.style.fontFamily = "微软雅黑,serif";
        item_nick.style.background = "transparent";
        item_nick.style.border = "0.1px solid white";
        item_nick.style.borderRadius = "3px";
        item_nick.style.color = "white";
        item_nick.style.outline = "0px";
        item_nick.onchange = function () {
            console.log(item_nick.value);
            bookMarkList.bookMarkItemList[i].nick = item_nick.value;
            updateBookMark(bookMarkList);
        }
        let item_url = document.createElement("input");
        item_url.id = "item_url-" + i;
        item_url.name = "item_url-" + i;
        item_url.type = "text";
        item_url.value = bookMarkList.bookMarkItemList[i].url;
        item_url.style.position = "relative";
        item_url.style.left = "50px";
        item_url.style.width = "200px";
        item_url.style.fontSize = "18px";
        item_url.style.fontFamily = "微软雅黑,serif";
        item_url.style.background = "transparent";
        item_url.style.background = "transparent";
        item_url.style.border = "0.1px solid white";
        item_url.style.borderRadius = "3px";
        item_url.style.color = "white";
        item_url.style.outline = "0px";
        item_url.onchange = function () {
            console.log(item_url.value);
            if (isValidUrl(item_url.value)) {
                bookMarkList.bookMarkItemList[i].url = item_url.value;
                updateBookMark(bookMarkList);
            } else {
                alert("网站地址不合法!")
            }
        }
        let item_del_button = document.createElement("button");
        item_del_button.id = "item_del_button" + i;
        item_del_button.name = "item_del_button" + i;
        item_del_button.innerText = "删除";
        item_del_button.style.position = "relative";
        item_del_button.style.left = "80px";
        item_del_button.onclick = function () {
            if (confirm("确定要删除吗?")) {
                // this.parentNode.parentNode.removeChild(this.parentNode);
                console.log(i);
                bookMarkList.bookMarkItemList.splice(i, 1);
                updateBookMark(bookMarkList);
                modeBookMark();
            }
        }
        bookmarkDiv.appendChild(item_nick);
        bookmarkDiv.appendChild(item_url);
        bookmarkDiv.appendChild(item_del_button);
        listDiv.appendChild(bookmarkDiv);
    }
    let addButton = document.createElement("button");
    addButton.id = "add_button";
    addButton.name = "add_button";
    addButton.innerText = "+";
    addButton.onclick = function () {
        let bookmarkName = prompt("请输入您的书签名", "");
        if (bookmarkName) {
            let bookmarkUrl = prompt("请输入您的书签链接", "");
            if (bookmarkUrl) {
                if (isValidUrl(bookmarkUrl)) {
                    let bookmarkDiv = {};
                    bookmarkDiv.nick = bookmarkName;
                    bookmarkDiv.url = bookmarkUrl;
                    bookMarkList.bookMarkItemList.push(bookmarkDiv);
                    console.log(bookMarkList.bookMarkItemList);
                    updateBookMark(bookMarkList);
                    modeBookMark();
                    alert("添加成功!");
                } else {
                    alert("网址不符合格式!");
                }
            }
        }
    }
    listDiv.appendChild(addButton);
    optionList.appendChild(listDiv);
}

function modeInk() {
    let optionList = document.getElementById("optionList");
    optionList.innerHTML = "";
    let user_div = document.createElement("div");
    user_div.id = "user_div";
    user_div.name = "user_div";
    let label_username1 = document.createElement("label");
    label_username1.id = "label_username1";
    label_username1.name = "label_username1";
    label_username1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;用户名:&nbsp;&nbsp;";
    label_username1.style.fontSize = "20px";
    let label_username2 = document.createElement("label");
    label_username2.id = "label_username2";
    label_username2.name = "label_username2";
    label_username2.innerHTML = user.username;
    label_username2.style.fontSize = "20px";
    user_div.appendChild(label_username1);
    user_div.appendChild(label_username2);
    let nick_div = document.createElement("div");
    nick_div.id = "nick_div";
    nick_div.name = "nick_div";
    nick_div.top = "20px";
    let label_nick = document.createElement("label");
    label_nick.id = "label_id";
    label_nick.name = "label_id";
    label_nick.style.fontSize = "20px";
    label_nick.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称:&nbsp;&nbsp;";
    let text_nick = document.createElement("input");
    text_nick.id = "text_nick";
    text_nick.style.background = "transparent";
    text_nick.name = "text_nick";
    text_nick.type = "text";
    text_nick.style.fontSize = "20px";
    text_nick.style.borderRadius = "5px";
    text_nick.style.border = "1px solid white";
    text_nick.style.outline = "none";
    text_nick.value = user.nick;
    text_nick.style.color = "white";
    nick_div.appendChild(label_nick);
    nick_div.appendChild(text_nick);
    let password_div = document.createElement("div");
    password_div.id = "password_div";
    password_div.name = "password_div";
    password_div.top = "20px";
    let label_password = document.createElement("label");
    label_password.id = "label_password";
    label_password.name = "label_password";
    label_password.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码:&nbsp;&nbsp;";
    label_password.style.fontSize = "20px";
    let text_password = document.createElement("input");
    text_password.id = "text_password";
    text_password.name = "text_password";
    text_password.type = "password";
    text_password.style.fontSize = "20px";
    text_password.style.outline = "none";
    text_password.style.background = "transparent";
    text_password.style.color = "white";
    text_password.style.borderRadius = "5px";
    text_password.style.border = "1px solid white";
    text_password.style.outline = "none";
    password_div.appendChild(label_password);
    password_div.appendChild(text_password);
    let repeat_password_div = document.createElement("div");
    repeat_password_div.id = "repeat_password_div";
    repeat_password_div.name = "repeat_password_div";
    repeat_password_div.top = "20px";
    let label_repeat_password = document.createElement("label");
    label_repeat_password.id = "label_repeat_password";
    label_repeat_password.name = "label_repeat_password";
    label_repeat_password.innerHTML = "重复密码:&nbsp;&nbsp;";
    label_repeat_password.style.fontSize = "20px";
    let text_repeat_password = document.createElement("input");
    text_repeat_password.id = "text_repeat_password";
    text_repeat_password.name = "text_repeat_password";
    text_repeat_password.type = "password";
    text_repeat_password.style.fontSize = "20px";
    text_repeat_password.style.outline = "none";
    text_repeat_password.style.color = "white";
    text_repeat_password.style.background = "transparent";
    text_repeat_password.style.borderRadius = "5px";
    text_repeat_password.style.border = "1px solid white";
    text_repeat_password.style.outline = "none";
    repeat_password_div.appendChild(label_repeat_password);
    repeat_password_div.append(text_repeat_password);
    let submit_button = document.createElement("button");
    submit_button.id = "submit_button";
    submit_button.name = "submit_button";
    submit_button.innerText = "提交";
    submit_button.style.fontSize = "20px";
    submit_button.style.fontFamily = "微软雅黑,serif";
    submit_button.onclick = function () {
        let username = user.username;
        let password = text_password.value;
        let repeat_password = text_repeat_password.value;
        let nick = text_nick.value;
        console.log(username);
        console.log(password);
        console.log(repeat_password);
        console.log(nick);
        if (password === "") {
            alert("密码不能为空!");
        } else if (repeat_password === "") {
            alert("重复密码不能为空!");
        } else if (password !== repeat_password) {
            alert("两次密码不一致!");
        } else {
            user.password = password;
            user.nick = nick;
            updateUser();
        }
    }
    optionList.appendChild(user_div);
    optionList.appendChild(nick_div);
    optionList.appendChild(password_div);
    optionList.appendChild(repeat_password_div);
    optionList.appendChild(submit_button);
}