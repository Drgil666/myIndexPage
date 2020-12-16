function onload() {

}

function getOptions() {
    return [{
        "name": "壁纸设置",
    }, {
        "name": "收藏夹设置"
    }
    ];
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

//TODO:编辑单条收藏夹内容
function modeBookMark() {
    let optionList = document.getElementById("optionList");
    optionList.innerHTML = "";
    let bookmarkList = JSON.parse(localStorage.getItem('bookmark'));
    let listDiv = document.createElement("div");
    listDiv.id = "listDiv";
    listDiv.name = "listDiv";
    listDiv.style.position = "relative";
    listDiv.style.width = "500px";
    listDiv.style.height = "auto";
    listDiv.style.top = "150px";
    listDiv.style.left = "100px";
    for (let i = 0; i < bookmarkList.length; i++) {
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
        item_nick.value = bookmarkList[i].nick;
        item_nick.style.position = "relative";
        item_nick.style.left = "20px";
        item_nick.style.width = "100px";
        item_nick.style.fontFamily = "微软雅黑,serif";
        item_nick.style.background = "transparent";
        item_nick.style.border = "0.1px solid white";
        item_nick.style.borderRadius = "3px";
        item_nick.style.color = "white";
        item_nick.style.outline = "0px";
        item_nick.onchange = function () {
            alert("修改名字成功!");
        }
        let item_url = document.createElement("input");
        item_url.id = "item_url-" + i;
        item_url.name = "item_url-" + i;
        item_url.type = "text";
        item_url.value = bookmarkList[i].url;
        item_url.style.position = "relative";
        item_url.style.left = "50px";
        item_url.style.width = "200px";
        item_url.style.fontFamily = "微软雅黑,serif";
        item_url.style.background = "transparent";
        item_url.style.background = "transparent";
        item_url.style.border = "0.1px solid white";
        item_url.style.borderRadius = "3px";
        item_url.style.color = "white";
        item_url.style.outline = "0px";
        item_url.onchange = function () {
            alert("修改链接成功!")
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
                bookmarkList.splice(i, 1);
                localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
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
                    bookmarkList.push(bookmarkDiv);
                    console.log(bookmarkList);
                    localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
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