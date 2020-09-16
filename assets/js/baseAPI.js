// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);

    // 统一为有权限的接口  设置请求头 headers
    if (options.url.indexOf('/my/') !== -1) {
        // 如果要检索的字符串值没有出现，则该方法返回 -1
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    // 全局挂载 complate回调函数 (统一为有权限的接口太多 就是每次验证身份都要去调用，所以挂载这)
    options.complete = function (res) {
        // console.log(res);
        // 在complate回调函数中，
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1,强制清空token
            localStorage.removeItem('token')
            // 2,强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})




