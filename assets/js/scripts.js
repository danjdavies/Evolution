var DD = {}
 
DD.carousel = function(){

	var slides				= $('.slides'),
		slidesLi 			= $('.slides li'),
		slidesLength 		= slidesLi.length,
		carouselWidth		= $('.carousel').width(), 
		carouselLength		= slidesLength * carouselWidth,
		current				= 1;

		slides.css("width", carouselLength + "px");
		slidesLi.css("width", carouselWidth + "px");

		var slideWidth = slidesLi.css("width", carouselWidth + "px");

		console.log(carouselWidth);
		console.log(current);
		console.log(slidesLi);

		$('.carousel-nav').show().find('button').on('click', function(){
			var direction =$(this).data('dir');
			loc = slidesLi;

			(direction === 'next') ? current += 1 : current -= 1;

			if (current === 0){
				current = slidesLength;
				direction === 'next';
			} else if (current - 1 === slidesLength){
				current = 1;
				loc = 0;
			}

			transition(slides, loc, direction);		
		});

		function transition( container, loc, direction){
			container.animate({
				'margin-left': 'slideWidth'
			})
		}

};
 
DD.carousel();