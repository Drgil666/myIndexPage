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
    optionList.innerHTML="";
    if (index === 0) {
        let form = document.createElement("form");
        form.id = "form";
        let fileUpLoad = document.createElement("input");
        fileUpLoad.id = "fileUpLoad"
        fileUpLoad.type = "file";
        fileUpLoad.accept = "image/*";
        fileUpLoad.hidden = "hidden";
        let button = document.createElement("button");
        button.id = "button";
        button.style = "width:200px;height:200px";
        button.value = "上传图片";
        // button.onclick="javascript:$('#fileUpLoad').click()";
        form.appendChild(fileUpLoad);
        optionList.appendChild(form);
        optionList.appendChild(button);
    }
}