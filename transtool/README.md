# Transtool

The best jQuery plugin ever.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/i5ting/toolbar/master/dist/transtool.min.js
[max]: https://raw.github.com/i5ting/toolbar/master/dist/transtool.js

In your web page:

	.en {
		display:none;
	}
	
	.zh {
		display:none;
	}
	
	.review {
		display:block;
		border: 1px solid lightblue;
		padding:25px;
	}
	
	.ok {
		display:block;
		border: 1px solid lightgreen;
		padding:5px;
	}
	
	.todo {
		display:block;
		border: 1px dashed red;
		padding:15px;
	}
	
```html
	<script src="jquery.js"></script>
	<script src="dist/transtool.min.js"></script>
	<script>
	jQuery(function($) {
	  $.transtool({
			
			states:{
		  	en:{
	  		
		  	},
				zh:{
				
				},
				review:{
				
				}
	  	}
		}); // "awesome"
	});
	</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

看demo目录

## Release History
_(Nothing yet)_
