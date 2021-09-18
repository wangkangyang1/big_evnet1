$(function() {
    $('#goreg').on('click', function() {
        $('.login').hide()
        $('.reg').show()
    })
    $('#goEntry').on('click', function() {
        $('.login').show()
        $('.reg').hide()
    })

    //  表单验证
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) { //value：表单的值、item：表单的DOM对象
            var pwd = $('#registry [name=password]').val()
                //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value !== pwd) {
                return '两次输入密码不一致';
            }
        }
    });



    //   用户注册

    $('#registry').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#registry [name=username]').val(),
            password: $('#registry [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                console.log(res);
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $('#goEntry').click()
        })
    })

    //   用户登录 
    $('#login').on('submit', function(e) {
        e.preventDefault()

        console.log($('#login').serialize());
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $('#login').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = '../../index.html'
            }
        })
    })


})