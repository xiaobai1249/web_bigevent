$(function() {
	// 1.1 获取裁剪区域的 DOM 元素
	const layer = layui.layer
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
$('#btnChooseImage').on('click',function(e)  {
	$('#file').click()
})
$('#file').on('change',function(e) {
	// console.log(e.target.files[0].name)
	if(e.target.files.length === 0) return layer.msg('请选择照片')
	const imgURL = URL.createObjectURL(e.target.files[0])
	$image.cropper('destroy').prop('src',imgURL).cropper(options)
})
$('#btnUpperLoad').on('click',function(e) {
	var dataURL = $image.cropper('getCroppedCanvas', {
		width:100,
		innerHeight:100
	}).toDataURL('image.png')
	$.ajax({
		method:'POST',
		url:'/my/update/avatar',
		data:{
			avatar:dataURL
		},
		success:function(res) {
			if(res.status !== 0) return layer.msg('失败')
			layer.msg('成功')
			window.parent.getUserInfo()
		}
	})
})
})