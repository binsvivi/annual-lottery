var db = new localDatabase();
var lottery = new lotteryProject();
lottery.init();
var time = 0;

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

    $('#sliderTV__mask-down').click(function () {
        $('#sliderTV').trigger('move:next');
    });
    $('#sliderTV__mask-up').click(function () {
        $('#sliderTV').trigger('move:prev');
    });

    $('#help__input').change(function (event) {
        $('#sliderTV').trigger('move:jump', { to: parseInt(event.target.value) });
    });

       $('#sliderTV').on('animation:start', function () {
        console.clear();
    });
    $('#sliderTV').on('animation:end', function () {
        console.clear();
    });



$(function() {
	$("#iframe").click(function() {
		$("#cover_fire").hide();	
		return false;
	});


	$("#stop_button").click(function() {
		if(lottery.allowStop) {
			var stop_button = document.getElementById('stop_button');
			stop_button.src = "images/start_button_s.png";
			lottery.stop();
		} else if(!lottery.runing) {
			var stop_button = document.getElementById('stop_button');
			stop_button.src = "images/stop_button_s.png";		
			lottery.run();
		}
		$("#winner_list").show();
		
		return false;
	});
	
	$("#clear").click(function() {
		$(this).miniConfirm({
			msg:"确认清空名单吗?",
			callback: function() {
				db.clear();
				$("#winner_list .winner_table tbody").empty();
				$.fn.closePublicBox(0);
			}
		});
	});
	
	$("#winner_list a.del").live('click', function() {
		var $this = $(this);
		
		$this.miniConfirm({
			msg:"确认删除获奖者吗?",
			callback: function() {
				var n = $this.parents("tr").find("td:eq(0)").attr("name");
				
				db.del(n);
				$this.parents("tr").remove();
				$.fn.closePublicBox(0);
			}
		});
		
		return false;
	});
	
	$("select.level").live("change", function() {
		var n = $(this).parents("tr").find("td:eq(0)").attr("name"),
				l = $(this).val();

		db.set(n, {name:n, level:l});
	});
	
	$("#winner_list .winner_title").click(function() {
		var tab = $("#winner_list .winner_table"),
				$this = $(this);
		
		if(tab.is(":visible")) {
			$("#cover_fire").hide();
			tab.slideUp(200, function() {
				$this.animate({"left":"0px"}, 300);
				$("#winner_list").animate({"right":"-180px"}, 300);
			});
		} else {
			$this.animate({"left":"90px"}, 300);
			$("#winner_list").animate({"right":"20px"}, 300, function() {
				tab.slideDown(200);
			});
		}
	});

	$(".animate").on("click", function(){
		clearInterval(time);

		$("#cover_up").animate({"opacity":"0.0"}, 500, function() {
			$("#stop_button").trigger("click");
			$("#cover_up").hide();
		});
	})
	
	initCover();
	$("#cover_fire").hide();
	$("#winner_list").hide();

//	$(window).resize(function() {
//		launchIntoFullscreen(document.documentElement); // the whole page	
//		if($("#cover_up").is(":visible")) initCover();
//	});
});

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

var page = 0;

function initCover() {
	var winWidth = $(window).width(), winHeight = $(window).height();
	
	var h = winHeight;
	var gridWidth = winWidth * 0.8;
	var gridHeight = winHeight * 0.5;
	$("#cover_up").css({"width": winWidth+"px", "height":h+"px"});
	console.log("*****w= "+gridWidth+"   h= "+gridHeight);	
	var images = "", count = (gridWidth/120) * (gridHeight/120);
	for(var i = 0; i < count; i++){
		var s = this.users[i];
		images += '<img src="uifaces/'+s.姓名+'.jpg" />';
		}
	$(".grid").append(images);
	if (time > 0)
		return;
	time = setInterval(function() {
			page++;
			if (page > 1)
				page = 0;
			//fading out the thumbnails with style
			$("img").each(function(){
					d = Math.random()*1000; //1ms to 1000ms delay
					$(this).delay(d).animate({opacity: 0}, {
					step: function(n){
						s = 1-n; //scale - will animate from 0 to 1
						$(this).css("transform", "scale("+s+")");
					}, 
					duration: 1000, 
					})
					}).promise().done(function(){
						//after *promising* and *doing* the fadeout animation we will bring the images back
						storm();
						})

			}, 10000);

}

//bringing back the images with style
function storm()
{
	var winWidth = $(window).width(), winHeight = $(window).height();
	
	var gridWidth = winWidth * 0.8;
	var gridHeight = winHeight * 0.5;
	$(".grid").empty();
	var images = "", count = (gridWidth/120) * (gridHeight/120);
	for(var i = 0; i < count; i++){
		var s = this.users[i+50*page];
		images += '<img style="opacity:0.0" src="uifaces/'+s.姓名+'.jpg" />';
		}
	//appending the images to .grid
	$(".grid").append(images);
	$("img").each(function(){
		d = Math.random()*1000;
		$(this).delay(d).animate({opacity: 1}, {
			step: function(n){
				//rotating the images on the Y axis from 360deg to 0deg
				ry = (1-n)*360;
				//translating the images from 1000px to 0px
				tz = (1-n)*1000;
				//applying the transformation
				$(this).css("transform", "rotateY("+ry+"deg) translateZ("+tz+"px)");
			}, 
			duration: 3000, 
			//some easing fun. Comes from the jquery easing plugin.
			easing: 'easeOutQuint', 
		})
	})
}

function dechex(num) {
	var r = Math.round(num).toString(16);
	return r.length == 1 ? '0'+r : r;
}

