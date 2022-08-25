$(function() {
	function render() {
		$(this).parent().parent().parent().hide().siblings().show()
		// $(this).parent().parent().siblings().show()
	}
	$('#link_reg').on('click', render)
	$('#link_login').on('click', render)

	const form = layui.form
	const layer = layui.layer
	form.verify({
		pwd:[/^[\S]{6,12}$/
			,'密码必须6到12位，且不能出现空格'
		],
		repwd:function(value) {
			const pwd = $('.reg-box [name=password]').val() 
			if(pwd !== value) return `两次不一致 请重新输入`
		}
	})

	$('#form_reg').on('submit',(e) => {
		e.preventDefault()
		$.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res) {
			if(res.status !== 0)return layer.msg(res.message)
			layer.msg(res.message)
			$('#link_login').click()
		})
	})

	$('#form_login').on('submit',(e) => {
		e.preventDefault()
		$.ajax({
			url:'/api/login',
			method:'POST',
			data:{username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()},
			// data:$(this).serialize(),
			success:function(res) {
				if(res.status !== 0)return layer.msg('登陆失败')
				layer.msg('登陆成功！')
				// console.log(res.token)
				// console.log($('#form_login').serialize())
				localStorage.setItem('token',res.token)
				location.href = './index.html'
			}
		})
		// $.post('/api/login',{username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()},function(res) {
		// 	if(res.status !== 0) return layer.msg('登陆失败')
		// 		layer.msg('登陆成功！')
		// 		console.log(res.token)
		// })
	})
})           