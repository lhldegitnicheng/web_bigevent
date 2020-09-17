$(function () {
    // 点击去登陆页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去取注册页面
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 自定义校验规则
    // 1，先获取layui中的form属性

    // 3,然后在结构中进行校验
    var form = layui.form
    var layer = layui.layer
    // 2，调用form.verify()进行校正
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //     // 校验两次密码是否一致
        //     // 先拿到用户第一次输入的密码内容
        // 然后和再次确认密码进行 等号的判断（看两次密码是否一致）
        repwd: function (value) {//value指的是用户第一次输入密码的内容
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '密码不一致，请重新输入'
            }
        }
    })
    // 监听注册表单事件  
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // 发起ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message); 
                return layer.msg(res.message)
            }
            // console.log('注册成功');
            layer.msg('注册成功，请登录！')
            // 模拟人的行为，注册好之后自动跳转登录页面
            $('#link_login').click()
        })
    })

    // 监听登录表单事件  
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val(),
        }
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 将登录成功得到的token（值，也就是令牌）字符串，保存到本地存起来  localStorage
                localStorage.setItem('token', res.token)
                // console.log(res.token);
                location.href = '/index.html'
            }
        })
    })

})