/*! Transtool - v1.0.0 - 2014-08-15
* https://github.com/i5ting/toolbar
* Copyright (c) 2014 ; Licensed MIT */
if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ) {

    var ToolBar = {
        init: function( options, elem ) {
            var self = this;
            self.elem = elem;
            self.$elem = $( elem );
            self.options = $.extend( {}, $.fn.toolbar.options, options );
            self.toolbar = $('<div class="tool-container gradient" />')
                .addClass('tool-'+self.options.position)
                .addClass('tool-rounded')
                .append('<div class="tool-items" />')
                .append('<div class="arrow" />')
                .appendTo('body')
                .css('opacity', 0)
                .hide();
            self.toolbar_arrow = self.toolbar.find('.arrow');
            self.initializeToolbar();
        },

        initializeToolbar: function() {
            var self = this;
            self.populateContent();
            self.setTrigger();
            self.toolbarWidth = self.toolbar.width();
        },

        setTrigger: function() {
            var self = this;

            self.$elem.on('click', function(event) {
                event.preventDefault();
                if(self.$elem.hasClass('pressed')) {
                    self.hide();
                } else {
                    self.show();
                }
            });

            if (self.options.hideOnClick) {
                $('html').on("click.toolbar", function ( event ) {
                    if (event.target != self.elem &&
                        self.$elem.has(event.target).length === 0 &&
                        self.toolbar.has(event.target).length === 0 &&
                        self.toolbar.is(":visible")) {
                        self.hide();
                    }
                });
            }

            $(window).resize(function( event ) {
                event.stopPropagation();
                if ( self.toolbar.is(":visible") ) {
                    self.toolbarCss = self.getCoordinates(self.options.position, 20);
                    self.collisionDetection();
                    self.toolbar.css( self.toolbarCss );
                    self.toolbar_arrow.css( self.arrowCss );
                }
            });
        },

        populateContent: function() {
            var self = this;
            var location = self.toolbar.find('.tool-items');
            var content = $(self.options.content).clone( true ).find('a').addClass('tool-item gradient');
            location.html(content);
            location.find('.tool-item').on('click', function(event) {
                event.preventDefault();
                self.$elem.trigger('toolbarItemClick', this);
            });
        },

        calculatePosition: function() {
            var self = this;
                self.arrowCss = {};
                self.toolbarCss = self.getCoordinates(self.options.position, 0);
                self.toolbarCss.position = 'absolute';
                self.toolbarCss.zIndex = self.options.zIndex;
                self.collisionDetection();
                self.toolbar.css(self.toolbarCss);
                self.toolbar_arrow.css(self.arrowCss);
        },

        getCoordinates: function( position, adjustment ) {
            var self = this;
            self.coordinates = self.$elem.offset();

            if (self.options.adjustment && self.options.adjustment[self.options.position]) {
                adjustment = self.options.adjustment[self.options.position] + adjustment;
            }

            switch(self.options.position) {
                case 'top':
                    return {
                        left: self.coordinates.left-(self.toolbar.width()/2)+(self.$elem.outerWidth()/2),
                        top: self.coordinates.top-self.$elem.height()-adjustment,
                        right: 'auto'
                    };
                case 'left':
                    return {
                        left: self.coordinates.left-(self.toolbar.width()/2)-(self.$elem.width()/2)-adjustment,
                        top: self.coordinates.top-(self.toolbar.height()/2)+(self.$elem.outerHeight()/2),
                        right: 'auto'
                    };
                case 'right':
                    return {
                        left: self.coordinates.left+(self.toolbar.width()/2)+(self.$elem.width()/3)+adjustment,
                        top: self.coordinates.top-(self.toolbar.height()/2)+(self.$elem.outerHeight()/2),
                        right: 'auto'
                    };
                case 'bottom':
                    return {
                        left: self.coordinates.left-(self.toolbar.width()/2)+(self.$elem.outerWidth()/2),
                        top: self.coordinates.top+self.$elem.height()+adjustment,
                        right: 'auto'
                    };
            }
        },

        collisionDetection: function() {
            var self = this;
            var edgeOffset = 20;
            if(self.options.position == 'top' || self.options.position == 'bottom') {
                self.arrowCss = {left: '50%', right: '50%'};
                if( self.toolbarCss.left < edgeOffset ) {
                    self.toolbarCss.left = edgeOffset;
                    self.arrowCss.left = self.$elem.offset().left + self.$elem.width()/2-(edgeOffset);
                }
                else if(($(window).width() - (self.toolbarCss.left + self.toolbarWidth)) < edgeOffset) {
                    self.toolbarCss.right = edgeOffset;
                    self.toolbarCss.left = 'auto';
                    self.arrowCss.left = 'auto';
                    self.arrowCss.right = ($(window).width()-self.$elem.offset().left)-(self.$elem.width()/2)-(edgeOffset)-5;
                }
            }
        },

        show: function() {
            var self = this;
            var animation = {'opacity': 1};

            self.$elem.addClass('pressed');
            self.calculatePosition();

            switch(self.options.position) {
                case 'top':
                    animation.top = '-=20';
                    break;
                case 'left':
                    animation.left = '-=20';
                    break;
                case 'right':
                    animation.left = '+=20';
                    break;
                case 'bottom':
                    animation.top = '+=20';
                    break;
            }

            self.toolbar.show().animate(animation, 200 );
            self.$elem.trigger('toolbarShown');
        },

        hide: function() {
            var self = this;
            var animation = {'opacity': 0};

            self.$elem.removeClass('pressed');

            switch(self.options.position) {
                case 'top':
                    animation.top = '+=20';
                    break;
                case 'left':
                    animation.left = '+=20';
                    break;
                case 'right':
                    animation.left = '-=20';
                    break;
                case 'bottom':
                    animation.top = '-=20';
                    break;
            }

            self.toolbar.animate(animation, 200, function() {
                self.toolbar.hide();
            });

            self.$elem.trigger('toolbarHidden');
        },

        getToolbarElement: function () {
            return this.toolbar.find('.tool-items');
        }
    };

    $.fn.toolbar = function( options ) {
        if ($.isPlainObject( options )) {
            return this.each(function() {
                var toolbarObj = Object.create( ToolBar );
                toolbarObj.init( options, this );
                $(this).data('toolbarObj', toolbarObj);
            });
        } else if ( typeof options === 'string' && options.indexOf('_') !== 0 ) {
            var toolbarObj = $(this).data('toolbarObj');
            var method = toolbarObj[options];
            return method.apply(toolbarObj, $.makeArray(arguments).slice(1));
        }
    };

    $.fn.toolbar.options = {
        content: '#myContent',
        position: 'top',
        hideOnClick: false,
        zIndex: 120
    };

}) ( jQuery, window, document );

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
