$(function(){
	//点击单选按钮选中内容
	$('.up-radio').on('click',function(){
		$(this).addClass('up-radio-click')
			.siblings()
			.removeClass('up-radio-click');
	})
	
	//点击下拉框
	$('.up-input-select').on('click',function(){
		$(this).parents('.up-input-div')
			.children()
			.show();
		//选中内容
		$('.up-option').on('click',function(){
			$(this).siblings('.up-input-one')
				.children('.up-input')
				.val($(this).html());
			$('.up-option').hide();
		})
	})
})