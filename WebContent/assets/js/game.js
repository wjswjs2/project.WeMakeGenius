//게임 공통 요소 처리 모듈
var game = function(){

	//필요한 엘리먼트 캐싱
	var elem = {
		This : 			$('#page_games'),
		score : 		$('#score'),
		startMessge : 	$('#start_message'),
		gameHeader : 	$('.game-info-header'),
		timer : 		$('#timer'),
		progess : 		$('#timeline-progress')
	};

	//문제 풀이시 획득 포인트
	var acqPoint = 1000;

	var point = 0;
	var combo = 0;

	var limitSec = 60;
	
	var sycPoint = function(){
		elem.score.text(point+' Point');
	};

	//setTimer 객체들
	var setTimerArray = [];

	return {

		readyGo : function(callback){	//레디고 출력

			$('.page').hide();
		    $('#page_games').show();
		    $('#rank-scroll').hide();
		    
		    setTimerArray.push(setTimeout(function(){
		    	$("#start_message").html("<img src='assets/img/game/img_ready.png'></img>");
		    	
		    	setTimerArray.push(setTimeout(function(){
		    		$("#start_message").html("<img src='assets/img/game/img_go.png'></img>");
		    		
		    		setTimerArray.push(setTimeout(function(){
		        		$("#start_message").empty();
						$('.game-info-header').show();

		        		game.runTimer();
		        		callback && callback();

		        	}, 1000));
		    		
		    	}, 1500));
		    	
		    }, 500));
		},
		runTimer : function(){ //타이머 출력
			
			var duration = 1000 * limitSec;
			
			elem.progess.stop().width(0).animate({
				width: '600px',
			}, {
				duration: duration,
				specialEasing :{
					width: 'linear'
				},
				step: function(now, fx){
					currentTime = Math.round((now * duration) / 600);
					var nRemainTime =  parseInt(currentTime/1000);
					var curSec = limitSec - nRemainTime;
					elem.timer.text(curSec);
					//_elem.current.text(nRemainTime.toString());
				},
				complete: function(){
					console.log('complete!!');
				}

			});
		},
		solve : function(isCorrect){
			if(isCorrect){
				point = point + acqPoint;
			}else{
				point = point - acqPoint;
			}
			sycPoint();
		},
		clearGame : function(){
			combo = 0;
			point = 0;
			sycPoint();

			elem.gameHeader.hide();
			elem.progess.stop().width(0)
			elem.timer.text(10);

			$.each(setTimerArray, function(idx, item){
				item.clearTimeout();
			});
		}
	}
}();


//숫자 대소비교 게임 인스턴스
var game1 = function(){

	var _this = $('#game_g1');

	var elem = {
		question : _this.find('.question'),
		leftNum :  _this.find('.left-num'),
		rightNum :  _this.find('.right-num'),
		option : 	_this.find('.option'),
		title : 	$('#game_title')
	}

	return{
		init : function(){
			_this.show();
			elem.title.text('숫자대소비교');
		},
		playSet : function(){

		}
	}
}();