var lotteryProject = function() {
	this.users = [];
	this.count = 0;
	this.history = {};
	this.userSize = 400;
	this.usernames = [];
	
	this.levels = ['幸运奖', '三等奖', '二等奖', '一等奖', '特等奖'];
	this.nowLevel = 0;
	
	this.winner = -1;
	
	this.nowIndex = 0;
	this.minSpeed = 400;
	this.maxSpeed = 40;
	this.acceleration = 80;
	this.speedMode = true;
	this.speed = this.minSpeed;
	this.runing = false;
	this.allowStop = false;

	this.init = function() {
		this.users = users;
		
		var winnerList = db.list();
		for(var i = 0, l = winnerList.length; i < l; i++) {
			this.winnerListAdd(winnerList[i]);
		}
		
		this.count = this.users.length;
		this.userSize = this.count;
	};

}

lotteryProject.prototype = {
	randUsers: function() {
		this.users.sort(function () { // 在取出用户前 先进行乱序排列，打乱顺序
			return 0.5 - Math.random();
		});
  	
		this.usernames = [];
		var keys = {}, k = 0, u = '', len = 0;
		this.usernames = this.users;

	},
		
	whirling: function() {
        	var mTwister = new MersenneTwister();
        	var number = ( Math.round( mTwister.random() * ( (this.count -1) - 0 ) ) + 0 );
        	this.nowIndex = number;
        	$('#sliderTV').trigger('move:jump', { to: this.nowIndex });		

		if(this.speedMode == true) { // 加速
			this.speed -= this.acceleration;
			if(this.speed < this.maxSpeed) {
				this.allowStop = true;
				this.speed = this.maxSpeed;
			}
		} else { // 减速
			this.speed += this.acceleration;
			if(this.speed > this.minSpeed) {
				this.winner = this.nowIndex;
			}
		}
		
		var _this = this;
		if(this.winner != -1) {
			setTimeout(function() {
				_this.showWinner();
			}, 1000);
			return false;
		}

		autoTime = setTimeout(function() {
			_this.whirling();
		}, this.speed);
		return false;
	},
	
	showWinner: function() {
		var i = 0, time = 0, _this = this;
		var s = "#item-"+this.winner;
		$("#cover_fire").show();

		_this.runing = false;
		var win = document.getElementById("iframe").contentWindow;  
		win.postMessage("winner-show","*"); 
		
		this.winnerListAdd({name:this.usernames[this.winner].姓名, level:this.nowLevel}, true);
		this.users.splice(this.winner, 1);
		this.count -= 1;
		this.userSize = this.count;
	},
	
	winnerListAdd: function(obj, saveToDb) {
		if( $("#winner_list .list div[name='"+obj.name+"']").length ) return;
		
		var html = '<tr><td name="'+obj.name+'">'
			+ obj.name
			+ '</td>'
			+ '<td><select name="level" class="level">';

		for(var i = 0, l = this.levels.length; i < l; i++) {
			var s = i == obj.level ? ' selected="selected"' : '';
			html += '<option value="'+i+'"'+s+'>'+this.levels[i]+'</option>';
		}

		html += '</select></td>'
			+ '<td><a href="javascript:;" class="del">删除</a>'
			+ '</td></tr>';

		$("#winner_list .list").prepend(html);
		
		saveToDb && db.set(obj.name, obj);
	},
		
	run: function() {
		if(this.runing) return;
		this.runing = true;
		
		this.acceleration = Math.floor( Math.random()*80+100 );
		this.speedMode = true;
		this.allowStop = false;
		this.winner = -1;
		this.speed = this.minSpeed;
		
		this.randUsers();

		$("#sliderTV").remove();

		var html = "<div id=\"sliderTV\" class=\"sliderTV\">"
		$('#wrapper-sliderTv').append(html);


		$.fn.sliderTV.defaults.animation.easing = 'linear';     // animation type
		$.fn.sliderTV.defaults.bullets.canShow = false;         // show bullet elements

		var m = this.count, k = 0;
		for(var i = 0; i < m -1; i++) {
			var s = this.usernames[i];
			var html = '<div id="item-' + i +'" class="sliderTV__item">'
				+ '<div class="sliderTV__item__caption">'
				+ '<h1>' +s.姓名 + '</h1>'
				+ '<p>工号：'+ s.员工编号 +'\n 部门：'+s.一级部门+'</p>'
				+ '</div>'
				+ '<div class="sliderTV__item__visual">'
				+ '<img src="uifaces/'+ s.姓名 +'.jpg" >'
				+ '</div>'
				+ '</div>';
			$('#sliderTV').append(html);
		}

		$('#sliderTV').sliderTV({ animation: { isVertical: true, duration: 0 } });

		this.whirling();
	},
	
	stop: function() {
		if(this.allowStop) {
			this.allowStop = false;
			this.speedMode = false;
			}
	}
};

// 本地 key-value 数据库操作
var localDatabase = function() {
	
	
}

localDatabase.prototype.item = function(k) {
	var val = localStorage.getItem(k);
	if(!val) return null;
	
	try{
		val = JSON.parse(val);
	} catch(e) {
		console.log(e);
		val = val;
	}
	
	return val;
};

localDatabase.prototype.set = function(k, val) {
	try{
		if(typeof(val) != 'string') val = JSON.stringify(val);
		
		localStorage.setItem(k, val);
	} catch(e) {
		console.log(e);
	}
};

localDatabase.prototype.list = function() {
	var k = '', val = null, rList = [];
	for(var i = 0, l = localStorage.length; i < l; i++) {
		k = localStorage.key(i);
		val = this.item(k);
		if(val) rList.push(val);
	}
	
	return rList;
};

localDatabase.prototype.clear = function() {
	localStorage.clear();
};

localDatabase.prototype.del = function(k) {
	localStorage.removeItem(k);
};
