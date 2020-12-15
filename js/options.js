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
        modeBack();
    } else if (index === 1) {
        modeBookMark();
    }
}

function modeBack() {
    let optionList = document.getElementById("optionList");
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

function modeBookMark() {
    let optionList = document.getElementById("optionList");
    let bookmarkList = JSON.parse(localStorage.getItem('bookmark'));
    let listDiv = document.createElement("div");
    listDiv.id = "listDiv";
    listDiv.name = "listDiv";
    for (let i = 0; i < bookmarkList.length; i++) {
        let bookmarkItem = document.createElement("div");
        bookmarkItem.id = "listItem-" + i;
        bookmarkItem.name = "listItem-" + i;
        bookmarkItem.innerText = bookmarkList[i].url;
        console.log(bookmarkItem.innerText);
        // TODO:功能待完善
        listDiv.appendChild(bookmarkItem);
    }
    optionList.appendChild(listDiv);
}