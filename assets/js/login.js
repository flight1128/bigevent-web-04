$(function () {
    var form = layui.form
    var layer = layui.layer
    // 登录注册切换
    $('#link_reg').on('click', () => {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click', () => {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    // 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: (value) => {
            var pwd = $('.reg_box input[name=password]').val()
            if (value !== pwd) return '两次密码输入不一致'
        }
    })
    // 注册
    $('#form_reg').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return alayer.msg(res.message)
                layer.msg('注册成功,请登录')
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录
    $('#form_login').on('submit', (res) => {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('恭喜!成功')
                localStorage.setItem('token', res.token)
                // location.href = '/index.html'
            }
        })
    })
})