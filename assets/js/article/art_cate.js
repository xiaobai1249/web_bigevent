$(function() {
	const layer = layui.layer
	let form = layui.form
	function initArtCateList() {
		$.ajax({
			method:'GET',
			url:'/my/article/cates',
			success:function(res) {
				if(res.status !== 0) return layer.msg('失败')
				layer.msg('成功')
				console.log(res)
				const htmlStr = template('tpl-table',res)
				$('tbody').html(htmlStr)
			}
		})
	}
	initArtCateList()
	let index = null
	$('#btnAdd').on('click', function(e) {
		 index = layer.open({
			type:1,
			area:['500px','250px'],
			title: '添加文章分类'
			,content: $('#dialog-add').html()
		});   

	})
	$('body').on('submit', '#form-add',function(e) {
		e.preventDefault()
		console.log($(this).serialize())
		$.ajax({	
			method:'POST',
			url:'/my/article/addcates',
			// data: {...$(this).serialize()},
			data: $(this).serialize(),
			success: (res)=> {
				
				if(res.status === 0){
					initArtCateList()
					layer.msg('新增分类成功！')
					layer.close(index)
				}else{
					layer.msg("失败")
				}
			}
		})
	})
	let indexEdit
	$('tbody').on('click','.btn-edit',function(e) {
		indexEdit = layer.open({
			type:1,
			area: ['500px', '250px'],
			title: '修改文章分类'
			,content: $('#dialog-edit').html()	
		});     
		const id = $(this).data('id')
		$.ajax({
			method:'GET',
			url:'/my/article/cates/' + id,
			success:function(res) {
				console.log(res.data)
				form.val('form-edit',res.data)
			}
		})
	})
	$('body').on('submit','#form-edit',function(e) {
		e.preventDefault()
		$.ajax({
			method:'POST',
			url:'/my/article/updatecate',
			data:$(this).serialize(),
			success:(res) => {
				if(res.status !== 0) return layer.msg('失败')
				layer.close(indexEdit)
				initArtCateList()
				console.log(11)
				console.log($(this).serialize())
				console.log(res)
				}
		})
	})
	$('tbody').on('click','.btn-delete',function (e) {
		const id = $(this).data('id')
			layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
				$.ajax({
					method:'GET',
					url:'/my/article/delete/' + id,
					success:(res) => {
						if(res.status !== 0) return layer.msg('失败')
						console.log(res)
		  			layer.close(index)
						initArtCateList()	
					}
				})
		})
	})
})