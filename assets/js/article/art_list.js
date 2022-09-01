$(function() {
	const {form,layer,laypage} = layui
	//定义美化时间的过滤器
	template.defaults.imports.dataFormat = function(date) {
		const dt = new Date(date)

		let y = dt.getFullYear()
		let m = padZero(dt.getMonth() + 1)
		let d = padZero(dt.getDate())
		let hh = padZero(dt.getHours())
		let mm = padZero(dt.getMinutes())
		let ss = padZero(dt.getSeconds())
		
		return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
	}
	function padZero(n) {
		return n = n < 10 ? '0' + n : n
	}

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
					//渲染分页
					renderPage(res.total)
			}
		})

	}
	initTable()

	//初始化文章分类的方法
	function initCate() {
		// console.log(1)
		$.ajax({
			method:'GET',
			url:'/my/article/cates',
			success:res => {
				if(res.status !== 0) return layer.msg('失败')
				const htmlStr = template('tpl-cate',res)
				$('[name="cate_id"]').html(htmlStr)
				form.render()
			}
		})
		// console.log(2)

	}
	initCate()
	$('#form-search').on('submit', e => {
		e.preventDefault()
		const cate_id = $('[name="cate_id"]').val()
		const state = $('[name="state"]').val()
		q.cate_id = cate_id
		q.state = state
		initTable()
	})

	function renderPage(total) {
		// console.log(total)
		laypage.render({
			elem:'pageBox',//分页容器id
			// count:total,//总数据条数
			count:10,//总数据条数
			limit:q.pagesize,//每页显示几条数据
			curr:q.pagenum,//默认选中哪一页
			//jump分页发生切换的时候出发该函数
			//出发jump回掉的方式有两种
			//1.点击页码的时候，会触发jump回掉
			//2.只要调用了laypage。render（）就会触发jump回掉
			jump:(obj,first) => {
				console.log(obj.curr)
				console.log(first)
				q.pagenum = obj.curr
				//吧最新的条目数赋值到q这个查询参数对象的pagesize属性中
				q.pagesize = obj.limit
				if(!first) {
						initTable()
				}

			},
			layout:['count','limit','prev', 'page','next','skip'],
			limits:[2,4,6,8,10]
		})	
	}
	$('tbody').on('click','.btn-delete', function() {
		const id = $(this).data('id')
		//获取删除按钮的个数
		const lengths = $('.btn-delete').length
		//eg1
layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		method:'GET',
		url:'/my/article/delete/' + id	,
		success:res => {
			if(res.status !== 0) return layer.msg('删除失败')
			layer.msg('删除成功')
			if(lengths === 1) {
				q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
		}
		initTable()
	}
	})
  layer.close(index);
});
	})
})