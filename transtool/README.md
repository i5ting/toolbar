# Transtool

The best jQuery plugin ever.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/i5ting/toolbar/master/dist/transtool.min.js
[max]: https://raw.github.com/i5ting/toolbar/master/dist/transtool.js

In your web page:

	.en {
		display:block;
	}
	
	.zh {
		display:none;
	}

	
```html
	<script src="jquery.js"></script>
	<script src="dist/transtool.min.js"></script>
	<script>
	jQuery(function($) {
		
		$.transtool({
			toolbarselector:"#normal-button",
			content: '#user-options', 
			position: 'top',
			states:[
				{
					'zh':{
						'icon':'icon-edit',
						click:function(){
							alert('zh111');
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
		});
		
	});
	</script>
```

## Documentation




## Examples
_(Coming soon)_

看demo目录

## Release History
_(Nothing yet)_



- v0.1.0
	- 把toolbar.js和transtool打包在一起,增加使用文档。
