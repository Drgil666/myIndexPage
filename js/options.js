function getOptions() {
    let optionList = [
        {
            "name": "壁纸设置",
        },
        {
            "name": "导航页设置",
        },
        {
            "name": "收藏夹设置"
        }
    ]
    return optionList;
}
function modeSelect(index) {
    console.log(index);
    let optionList = document.getElementById("optionList");
    optionList.id = "optionList";
    optionList.innerHTML = "";
    if (index === 0) {
        let fileUpLoad = document.createElement("input");
        fileUpLoad.id = "fileUpLoad";
        fileUpLoad.name = "fileUpLoad";
        fileUpLoad.type = "file";
        fileUpLoad.accept = "image/*";
        fileUpLoad.hidden = "hidden";
        let button = document.createElement("button");
        button.id = "button";
        button.name = "button";
        button.style = "width:100px;height:50px";
        button.innerText="文件上传";
        optionList.appendChild(fileUpLoad);
        optionList.appendChild(button);
        document.getElementById("button").addEventListener("click",function () {
            fileUpLoad.click();
        });
    }
}