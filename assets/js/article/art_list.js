$(function() {
	const layer = layui.layer
	const q = {
		pagenum: 1,//页码值
		pagesize:2,//每页显示几条数据
		cate_id:'',//文章分类id
		state:''//文章发布状态
	}
	function initTable() {
		$.ajax({
			method:'GET',
			url:'/my/article/list',
			data:q,
			success:function(res) {
				if(res.status !== 0) return layer.msg('失败')
				console.log(res)
					const htmlStr = template('tpl-table',res)
					$('tbody').html(htmlStr)
			}
		})
	}
	initTable()
})