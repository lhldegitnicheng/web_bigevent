$(function () {
    // 调用用户的基本信息 （渲染用户的头像和昵称，所以要发请求）
    getUserInfo()
})
var layer = layui.layer
$('#btnLogout').on('click', function () {
    // 提示用户是否退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        //  2，清除本地存储的token（令牌）
        localStorage.removeItem('token')

        // 3,重新跳转到登录页面
        location.href = '/login.html'

        layer.close(index);
    });
})
 
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象  因为是有权限的接口所以要加请求头
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // console.log(layer.msg('获取成功'));
            // 获取用户信息成功的话就渲染头像和昵称
            // renderAvater(res.data);
            renderAvatar(res.data)
        },
        // 无论成功还是失败,最终都会发起complate函数回调，可以使用res.responseJSON拿到服务器返回来的数据
        // complete: function (res) {
        //     // console.log(res);
        //     // 在complate回调函数中，
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1,强制清空token
        //         localStorage.removeItem('token')
        //         // 2,强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // },
    })
}
// 渲染用户头像和昵称
function renderAvatar(user) {
    //1， 先获取用户输入的昵称（有昵称先获取昵称，没有昵称在获取登录的首字母）
    var name = user.nickname || user.username
    //2， 设置欢迎词
    $('#welcome').html('欢迎&nbsp;' + name);
    //3,按需渲染用户头像（有头像先渲染头像，没有就渲染文本）
    if (user.user_pic !== null) {
        // 不等于空说明有头像，
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.text-avatar').hide()

    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}


