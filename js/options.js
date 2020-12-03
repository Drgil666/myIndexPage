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
function modeSelect(index){
    let optionList=document.getElementById("optionList");
    if(index===0){
        let form=document.createElement("form");
        let fileUpLoad=document.createElement("input");
        fileUpLoad.type="file";
        fileUpLoad.accept="image/*";
        form=form.appendChild(fileUpLoad);
        optionList.appendChild(form);
    }
}