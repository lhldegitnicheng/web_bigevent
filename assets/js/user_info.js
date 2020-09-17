$(function () {
    // 验证表单规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {//用户输入的值
            if (value.length > 6) {
                return ('请输入1~6个字符')
            }
        }
    })
    initUserInfo()
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res); 
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res)
                // 快速获取表单的值  除了基本款的serialize(),还有layui form中的 form.val()
                // form.val(给哪个表单赋值，需要赋值的数据对象) ，参数1中的给哪个表单赋值  必须指定lay-filter属性
                //    调用form.val()快速为表单赋值  该方法是layui里面的
                form.val('formUserInfo', res.data)

            }
        })
    }
    // 做的事情？ 用户点击重置按钮之后，不想修改表单内容，应该吧之前的信息还原回来 
    $('#btnReset').on('click', function (e) {
        // 阻止表单的重置默认行为
        e.preventDefalut()
        initUserInfo()
    }) 

    // 监听表单的提交事件
      $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
          method: 'POST',
          url: '/my/userinfo',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
              window.parent.getUserInfo()     
          }
        })
      })
})


