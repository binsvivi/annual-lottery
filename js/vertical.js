

$(function () {
    /*
     * Example for a vertical slider for Smart TV apps using jQuery plugin SliderTV.
     */



    // you can optionally change sliderTV plugin defaults here
    //$.fn.sliderTV.defaults.animation.isVertical = true;   // animation direction
 //   $.fn.sliderTV.defaults.animation.duration = 50;        // animation duration
    $.fn.sliderTV.defaults.animation.easing = 'linear';     // animation type
    $.fn.sliderTV.defaults.bullets.canShow = true;         // show bullet elements

	var m = 12, k = 0;
	for(var i = 10; i <= m; i++) {
	var html = '<div id="item-' + i +'" class="sliderTV__item">'
	+ '<div class="sliderTV__item__caption">'
	+ '<h1>Amélie</h1>'
	+ '<p>Amélie is a story about a girl named Amélie whose childhood was suppressed by her Father\'s mistaken concerns of a heart defect. With these concerns Amélie gets hardly any real life contact with other people. This leads Amélie to resort to her own fantastical world and dreams of love and beauty. She later on becomes a young woman and moves to the central part of Paris as a waitress. After finding a lost treasure belonging to the former occupant of her apartment, she decides to return it to him.</p>'
	+ '</div>'
	+ '<div class="sliderTV__item__visual">'
	+ '<img src="assets/amelie.jpg">'
	+ '</div>'
	+ '</div>';
	//			+ obj.name
	//			+ '</td>'
	//			+ '<td><select name="level" class="level">';

	$('#sliderTV').append(html);
	}


// let's initiate sliderTV plugin
    $('#sliderTV').sliderTV({ animation: { isVertical: true, duration: 100 } });

    // in your real world smart tv application you can listen to events from remote control,
    // in this demo we just listen to keypad arrow left and right
    $('body').keydown(function (e) {
        switch (e.keyCode) {
            case 38:
                // keypad arrow up
                $('#sliderTV').trigger('move:prev');
                break;
            case 40:
                // keypad arrow down
                $('#sliderTV').trigger('move:next');
                break;
        }
    });

    // listen to click events for particular html elements,
    // as for example the navigation arrows (useful when implementing lg magic control)
    $('#sliderTV__mask-down').click(function () {
        // slide to next item
        $('#sliderTV').trigger('move:next');
    });
    $('#sliderTV__mask-up').click(function () {
        // slide to previous item
        $('#sliderTV').trigger('move:prev');
    });

    $('#help__input').change(function (event) {
        // slide to a specific item, useful to slide the carousel programmatically
        $('#sliderTV').trigger('move:jump', { to: parseInt(event.target.value) });
    });

    // listen to events emitted by sliderTV plugin,
    // in this code below, we are "listening" to whenever the sliding animation starts and ends
    $('#sliderTV').on('animation:start', function () {
        console.clear();
        console.log('sliderTV animation has started');
    });
    $('#sliderTV').on('animation:end', function () {
        console.clear();
        console.log('sliderTV animation has finished');
    });
});
