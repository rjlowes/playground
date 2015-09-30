/*
 * 5. Putting it all together
 * ---------------------------------------------------------------
 * I've put together this little starfield animation to demo how it all fits together. You 
 * don't need to write the code. Just look through it and run the html.
 */

if (typeof Object.create !== 'function') {	//our (inheritance) helper
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

BTFRESCA = {};		//(top level namespace)

//Module for general reusable utilities (advanced singleton)
BTFRESCA.util = (function() {
	return {
		random: function(max) {
			return Math.round( Math.random() * max );
		},
		
		randomRange: function(min, max) {
			return Math.floor( Math.random() * ( 1 + max - min )) + min;
		},
		
		isNumber: function(value) {		//checks if the value is an actual number and not NaN
			return typeof value === 'number' && isFinite(value);
		}
	};
}());

BTFRESCA.starfield = {}		//our (application namespace)

BTFRESCA.starfield.ui = {	//(basic singleton)
	star: {
		imageSrcs: ['images/spark.png', 'images/spark2.png', 'images/spark3.png', 'images/spark4.png'],
		
		init: function() {
			
			var that = this;
			var src = this.imageSrcs[BTFRESCA.util.random( this.imageSrcs.length - 1 )];
			this.el = $('<img />', {
				src: src
			});
			
			this.setSpeed().setPoint().display().setPoint().animate();
		},
		
		setSpeed: function() {
			this.speed = (BTFRESCA.util.random(10) + 5) * 1100;
			return this;
		},
		
		setPoint: function() {
			this.pointX = BTFRESCA.util.randomRange( window.innerWidth / 4 , ( window.innerWidth / 2 ) + ( window.innerWidth / 4) );
			this.pointY = BTFRESCA.util.randomRange( window.innerHeight / 4 , ( window.innerHeight / 2 ) + ( window.innerHeight / 4) );
			return this;
		},
		
		display: function() {
			
			this.el.css({
				position: 'absolute',
				top: this.pointY,
				left: this.pointX
			});
			
			$(document.body).append(this.el);
			return this;
		},
		
		animate: function() {
			
			var that = this;
			
			this.el.animate({
				top: this.pointY,
				left: this.pointX
			}, this.speed, 'linear', function() {
				that.setSpeed().setPoint().animate();
			});
		}
	}
};


$(function() {
	var numberStars = 30;
	for(var i = 0; i < numberStars; i++) {
		//create a new star object then start it up
		var star = Object.create( BTFRESCA.starfield.ui.star );		//(inheritance)
		star.init();
	}
});
