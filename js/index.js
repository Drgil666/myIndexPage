const url = "10.21.234.24:8080"

function get() {
    let bookMarkList = [
        {
            "url": "www.baidu.com",
            "nick": "百度",
            "img": null
        },
        {
            "url": "www.codeforces.com",
            "nick": "CodeForces",
            "img": null
        },
        {
            "url": "www.baidu.com",
            "nick": "百度",
            "img": null
        },
        {
            "url": "www.codeforces.com",
            "nick": "CodeForces",
            "img": null
        }
    ];
    for (let index = 0; index < bookMarkList.length; index++) {
        bookMarkList[index].img = "https://www.google.com/s2/favicons?domain=" + bookMarkList[index].url;
    }
    return bookMarkList
}