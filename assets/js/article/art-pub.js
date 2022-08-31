$(function() {
	// const layer = layui.layer
	// const form = layui.form
	const {layer, form} = layui
	function initCate() {
		$.ajax({
			method:'GET',
			url:'/my/article/cates',
			success:res => {
				const {status,message,data} = res
				if(status !== 0) return layer.msg(message)
				layer.msg(message)
				console.log(res)
				const htmlStr = template('tpl-cate',res)
				$('[name=cate_id]').html(htmlStr)
				form.render()
				//一定要记得调用form.render()方法！！！！
			}
		})
	}
	initCate()
	initEditor()
	// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
$('#btn-file').on('click', function (e) {
	$('#coverFile').click()
})
$('#coverFile').on('change',function(e) {
	const file = e.target.files[0]
	if(!file) return console.log('没有传入图片')
	const newImageURL = URL.createObjectURL(file)
	$image.cropper('destroy').attr('src', newImageURL).cropper(options)
})

let art_state = '已发布'

$('#btnSave2').on('click', function (e) {
	art_state = '草稿'
})
$('#form-pub').on('submit', function (e) {
	e.preventDefault()
	const fd = new FormData($(this)[0])
	fd.append('state',art_state)

	$image
	.cropper('getCroppedCanvas', {
		// 创建一个 Canvas 画布
		width: 400,
		height: 280
	})
	.toBlob(function(blob) {
		// 将 Canvas 画布上的内容，转化为文件对象
		// 得到文件对象后，进行后续的操作
		// 5. 将文件对象，存储到 fd 中
		fd.append('cover_img', blob)
		// 6. 发起 ajax 数据请求
	})
	publishArticle(fd)

})
function publishArticle(fd) {
	$.ajax({
		method:'POST',
		url:'/my/article/add',
		data:fd,
		contentType:false,
		processData:false,
		success:res => {
			console.log(res);
			if(res.status !== 0) return layer.msg('error', res.status)
			layer.msg('发布文章成功')
			// location.href = './article/art_list.html'
		}
	})
}
})