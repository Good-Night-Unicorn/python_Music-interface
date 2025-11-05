const base = {
    get() {
        return {
            url : "http://localhost:8080/djangomtj199wx/",
            name: "djangomtj199wx",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于python的音乐界面设计与实现"
        } 
    }
}
export default base
