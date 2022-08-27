$(function() {
	const form = layui.form
	const layer = layui.layer
	form.verify({
		nickname:function(value) {
			if(value.length > 6) {
				return '你这长度必须在1 ~ 6个字符'
			}
		}
	})
	initUserInfo()
	function initUserInfo() {
		$.ajax({
			method:'GET',
			url:'/my/userinfo',
			success:function(res) {
				if(res.status !== 0) return layer.msg('获取用户信息失败')
				console.log(res.data)
				form.val('formUserInfo',res.data)
			}
		})
	}
	$('#btnReset').on('click', function(e) {
		e.preventDefault()
		initUserInfo()
	})
	$('.layui-form').on('submit', function(e) {
		e.preventDefault()
		$.ajax({
			method:'POST',
			url:'/my/userinfo',
			data:$(this).serialize(),
			success:function(res) {
				if(res.status !== 0) return layer.msg('获取用户信息失败')
				console.log(res)
				window.parent.getUserInfo()
			}
		})
	})
})	