
$(function () {
    // 进行表单密码验证（一共三个校验规则）
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return ('新旧密码不能一致')
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=rePwd]').val()) {
                return ('两次密码不一致')
            }
        }
    })
    // 发请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败')
                }
                layer.msg('更新密码成功！')
                // 重置密码(把jquery转换成原生的doc对象才能用reset)
                $('.layui-form')[0].reset()
            }

        })
    })

})