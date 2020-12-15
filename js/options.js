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
//TODO:编辑单条收藏夹内容
function modeBookMark() {
    let optionList = document.getElementById("optionList");
    optionList.innerHTML = "";
    let bookmarkList = JSON.parse(localStorage.getItem('bookmark'));
    let listDiv = document.createElement("div");
    listDiv.id = "listDiv";
    listDiv.name = "listDiv";
    for (let i = 0; i < bookmarkList.length; i++) {
        let bookmarkItem = document.createElement("div");
        bookmarkItem.id = "listItem-" + i;
        bookmarkItem.name = "listItem-" + i;
        bookmarkItem.innerText = bookmarkList[i].nick + " " + bookmarkList[i].url;
        let item_del_button = document.createElement("button");
        item_del_button.id = "item_del_button" + i;
        item_del_button.name = "item_del_button" + i;
        item_del_button.innerText = "删除";
        item_del_button.onclick = function () {
            if (confirm("确定要删除吗?")) {
                // this.parentNode.parentNode.removeChild(this.parentNode);
                console.log(i);
                bookmarkList.splice(i, 1);
                localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
                modeBookMark();
            }
        }
        bookmarkItem.appendChild(item_del_button);
        listDiv.appendChild(bookmarkItem);
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
                let urlRegex1 = "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$";
                let urlRegex2 = "^(?=^.{3,255}$)(http(s)?:\\/\\/)?(www\\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\\d+)*(\\/\\w+\\.\\w+)*$";
                let urlRegex3 = "^(?=^.{3,255}$)(http(s)?:\\/\\/)?(www\\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\\d+)*(\\/\\w+\\.\\w+)*([\\?&]\\w+=\\w*)*$";
                if (bookmarkUrl.match(urlRegex1) || bookmarkUrl.match(urlRegex2) || bookmarkUrl.match(urlRegex3)) {
                    let bookmarkItem = {};
                    bookmarkItem.nick = bookmarkName;
                    bookmarkItem.url = bookmarkUrl;
                    bookmarkList.push(bookmarkItem);
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
    optionList.appendChild(addButton);
    optionList.appendChild(listDiv);
}