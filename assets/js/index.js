$(function() {
	getUserInfo()
	const layer = layui.layer
	$('#btnLogout').on('click', function() {

		layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
			//do something
			localStorage.removeItem('token')
			location.href = './login.html'
 			layer.close(index);
		});
	})
})
const layer = layui.layer
function getUserInfo() {
	$.ajax({
		method:'GET',
		url:'/my/userinfo',
		headers:{
			// Authorization:localStorage.getItem('token') || ''
			// headers
		},
		success: function(res) {
			if(res.status !== 0)return  layer.msg(res.message)
			layer.msg(res.message)
			console.log(res)
			renderAvatar(res.data)
		},
		// complete:function(res) {
		// 	if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
		// 		localStorage.removeItem('token')
		// 		location.href = 'login.html'
		// 	}
		// }
	})
}
function renderAvatar(user) {
	const name = user.nickname || user.username
	$('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
	if(user.user_pic !== null) {
		$('.layui-nav-img').attr('src',user.user_pic).show()
		$('.text-avatar').hide()
	}else {
		$('.layui-nav-img').hide()
		const first = name[0].toUpperCase()
		$('.text-avatar').html(first).show()
	}
}