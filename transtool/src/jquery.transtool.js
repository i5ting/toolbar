/*
 * transtool
 * https://github.com/i5ting/toolbar
 *
 * Copyright (c) 2014 alfred sang
 * Licensed under the MIT license.
 */

(function($) {
	
	/**
	 * 创建tooltip‘s options html
	 */ 
	function create_tip_opts(opts){
		//
		// <div id="user-options" class="toolbar-icons" style="display: none;">
		// 	<a href="#"><i class="icon-user"></i></a>
		// 	<a href="#"><i class="icon-star"></i></a>
		// 	<a href="#"><i class="icon-edit"></i></a>
		// 	<a href="#"><i class="icon-trash"></i></a>
		// 	<a href="#"><i class="icon-ban-circle"></i></a>
		// </div>
		
		var optsion_html = "<div id='user-options' class='toolbar-icons' style='display: none;'>";
		
		$.each(opts.states,function(){
			$.each(this,function(key,value){
					optsion_html += "<a id='" + key + "' href='#'><i class='" + value.icon + "'></i></a>";
					$('#'+key).on('click',value.click);
			});
			
		});
		
		optsion_html += "</div>";
		
		$('body').append(optsion_html);
		
		log(optsion_html);
	}
	
	function bind_click_event(opts){
		$.each(opts.states,function(){
			$.each(this,function(key,value){
					$('#'+key).on('click',value.click);
			});
		});
		
	}
	
	
	/**
	 * 创建tooltip‘s options html
	 */ 
	function render_tip_with_opts(opts){
		 
		$(opts.toolbarselector).toolbar(opts);
	}
	
  // Static method.
  $.transtool = function(options) {
    // Override default options with passed-in options.
    var opts = $.extend({},$.fn.toolbar.options, $.transtool.options, options);
    
		// 创建tooltip‘s options html
		create_tip_opts(opts);
		
		// 给每个tooltip上的按钮绑定click事件
		bind_click_event(opts);
		
		// 渲染tooltip
		render_tip_with_opts(opts);
  };


	
  // Static method default options.
  $.transtool.options = {
		debug: false,
		toolbarselector: "#user-toolbar",
    punctuation: '.',
		states:[
			{
				'zh':{
					'icon':'icon-edit',
					click:function(){
						alert('zh');
					}
				},
				'en':{
					'icon':'icon-user',
					click:function(){
						alert('en');
					}
				}
			}
		]
  };
	
	// $.fn.toolbar.options = {
	//       content: '#myContent',
	//       position: 'top',
	//       hideOnClick: false,
	//       zIndex: 120
	//   };
	//

	/**
	 * 日志方法
	 */
	function log(text){
		if($.transtool.options.debug === true){
			console.log(text);
		}
	}
	
  // Custom selector.
  $.expr[':'].transtool = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
