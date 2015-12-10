// ==UserScript==
// @name         Unlock Mush Chat
// @namespace    http://mush.vg/
// @version      0.2
// @description  Unlock Mush Chat 
// @author       BonbonsDealer
// @downloadURL https://raw.githubusercontent.com/Bonbons/Unlock-Mush-Chat/master/UnlockMushChat.user.js
// @match        http://mush.vg/*
// @match        http://mush.twinoid.com/*
// @require        http://code.jquery.com/jquery-1.9.1.js
// @grant		GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @grant		GM_addStyle
// @grant		GM_getResourceText 
// ==/UserScript==
/*
 @require        http://code.jquery.com/ui/1.11.4/jquery-ui.js
 @resource       jqueryUiCss http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css
*/


//GM_registerMenuCommand("Draw astropad help", function() {drawAstropadHelp();});

/*function drawAstropadHelp() {
    $('.talks').css("z-index", "0");
}*/

var unlockingG = GM_getValue(window.location.host+'_unlockingG',false);	
if (unlockingG||unlockingG=='true') {
    GM_registerMenuCommand("Stop Unlock General Chat", function() {stopUnlockGeneralChat();});
    unlockGeneralChat();
} else {
    GM_registerMenuCommand("Unlock General Chat", function() {unlockGeneralChat();});
}		

function unlockGeneralChat() {
    GM_setValue(window.location.host+'_unlockingG',true);
    $('#localtab').after(
'<li id="fav" data-tab="6" onclick="Main.selChat(6)" ondblclick="return false;" class="tab taboff"><img src="/img/icons/ui/fav.png" onmouseover="Main.showTip(this,\'<div class=\\\'tiptop\\\' ><div class=\\\'tipbottom\\\'><div class=\\\'tipbg\\\'><div class=\\\'tipcontent\\\'><h1>Favoris</h1><p>Votre sélection de sujets favoris.</p></div></div></div></div>\')" onmouseout=" Main.hideTip(); "><div class="hide tab_not_read" style="display: none;"><span class="cdNbNotRead">0</span></div></li>'
        );
    $('#localtab').after(
'<li id="walltab" data-tab="5" onclick="Main.selChat(5)" ondblclick="return false;" class="tab taboff"><img src="/img/icons/ui/wall.png" onmouseover="Main.showTip(this,\'<div class=\\\'tiptop\\\' ><div class=\\\'tipbottom\\\'><div class=\\\'tipbg\\\'><div class=\\\'tipcontent\\\'><h1>Discussion</h1><p>Le canal de Discussion est indispensable pour s\\\'organiser avec l\\\'équipage. </p><p>Pour participer vous devez posséder un <img src=&quot;/img/icons/ui/talkie.png&quot;/> <strong>talkie-walkie</strong>.</p></div></div></div></div>\')" onmouseout=" Main.hideTip(); "><div class="hide tab_not_read" style="display: none;"><span class="cdNbNotRead">0</span></div></li>'
        );
}

function stopUnlockGeneralChat() {
    GM_setValue(window.location.host+'_unlockingG',false);
    window.clearTimeout(timer);
    timer=window.setTimeout(reloading,1000);
}

var unlockingM = GM_getValue(window.location.host+'_unlockingM',false);	
if (unlockingM||unlockingM=='true') {
    GM_registerMenuCommand("Stop Unlock Mush Chat", function() {stopUnlockMushChat();});
    unlockMushChat();
} else {
    GM_registerMenuCommand("Unlock Mush Chat", function() {unlockMushChat();});
}

function unlockMushChat() {
    GM_setValue(window.location.host+'_unlockingM',true);
	$('#localtab').after(
'<li id="mushtab" data-tab="2" onclick="Main.selChat(2)" ondblclick="return false;" class="tab taboff"><img src="/img/icons/ui/mush.png" onmouseover="Main.showTip(this,\'<div class=\\\'tiptop\\\' ><div class=\\\'tipbottom\\\'><div class=\\\'tipbg\\\'><div class=\\\'tipcontent\\\'><h1>Mush Channel</h1>Ssshh, nobody can hear us here... The Mush channel is the <em>private channel</em> for those fighting for <strong>Mush Superiority</strong> <img src=&quot;/img/icons/ui/mush.png&quot;/>.</div></div></div></div>\')" onmouseout=" Main.hideTip(); "><div class="hide tab_not_read"><span class="cdNbNotRead">0</span></div></li>'
	);
}

function stopUnlockMushChat() {
    GM_setValue(window.location.host+'_unlockingM',false);
    window.clearTimeout(timer);
    timer=window.setTimeout(reloading,1000);
}

function addCss(cssString) { 
    try {
        var head = document.getElementsByTagName('head')[0]; 
        //return unless head; 
        if (head) {
            var newCss = document.createElement('style'); 
            newCss.type = "text/css"; 
            newCss.innerHTML = cssString; 
            head.appendChild(newCss); 
			newCss=null;
        }
		head=null;
    } catch (e) {
        console.error("Error in addCss",e);
    }
};

var myWindow;
function openWin(text) {
    myWindow = window.open("", "", "width=400 ,height=200");
	console.log("myWindow ",myWindow); 
	if (myWindow) {
		myWindow.document.write("<p>"+text+"</p>");
		myWindow.document.title = text;
	} else {
		console.log("POPUP is blocked",myWindow); 
	}
}


console.log("window.location.host ",window.location.host);  
var checking = GM_getValue(window.location.host+'_checking',false);
var joining = GM_getValue(window.location.host+'_joining',false);
var unreading = GM_getValue(window.location.host+'_unreading',false);
var timer;
var mCoinSound = new Audio("https://dl.dropbox.com/u/7079101/coin.mp3");
var mClickSound = new Audio("http://soundbible.com/grab.php?id=1705&type=mp3");
var persList = {
	
	Andie: {
		img:"andie_graham",
		name:"Andie Graham"
		},
	Chun: {
		img:"zhong_chun",
		name:"Zhong Chun"
		},
	Chao: {
		img:"wang_chao",
		name:"Wang Chao"
		},
	Derek: {
		img:"derek_hogan",
		name:"Derek Hogan"
		},
	Eleesha: {
		img:"eleesha_williams",
		name:"Eleesha Williams"
		},
	Finola: {
		img:"finola_keegan",
		name:"Finola Keegan"
		},
	Frieda: {
		img:"frieda_bergmann",
		name:"Frieda Bergmann"
		},
	Gioele: {
		img:"gioele_rinaldo",
		name:"Gioele Rinaldo"
		},
	Hua: {
		img:"jiang_hua",
		name:"Jiang Hua"
		},
	Ian: {
		img:"ian_soulton",
		name:"Ian Soulton"
		},
	Janice: {
		img:"janice_kent",
		name:"Janice Kent"
		},
	JinSu: {
		img:"kim_jin_su",
		name:"Kim Jin Su"
		},
	KuanTi: {
		img:"lai_kuan_ti",
		name:"Lai Kuan-Ti"
		},
	Paola: {
		img:"paola_rinaldo",
		name:"Paola Rinaldo"
		},
	Raluca: {
		img:"raluca_tomescu",
		name:"Raluca Tomescu"
		},
	Roland: {
		img:"roland_zuccali",
		name:"Roland Zuccali"
		},
	Stephen: {
		img:"stephen_seagull",
		name:"Stephen Seagull"
		},
	Terrence: {
		img:"terrence_archer",
		name:"Terrence Archer"
		}
	
};

		
if (checking||checking=='true') {
    GM_registerMenuCommand("Stop Check complete crew", function() {stopCheckCompleteCrew();});
    checkCompleteCrew();
} else {
    GM_registerMenuCommand("Check complete crew", function() {checkCompleteCrew();});
}


function stopCheckCompleteCrew() {
    GM_setValue(window.location.host+'_checking',false);
    window.clearTimeout(timer);
    timer=window.setTimeout(reloading,1000);
}

function checkCompleteCrew() {
    GM_setValue(window.location.host+'_checking',true);
    try {
        var _people=$('ul[class="people"]');    
        if (_people.length>0) {	
			
			var _cryo=$('img[src*="p_cryo.png"]');
			
			console.log("Check complete crew",_cryo);    
			if (_cryo.length>0) {
				console.log("Still crew in cryo...",checking);  
				document.title = "Still crew in cryo...";
				window.clearTimeout(timer);
				_people=null;
				_cryo=null;
				timer=window.setTimeout(reloading,30*1000);
			} else {
				openWin("Complete Crew!!!");
				console.log("Complete Crew!!!",checking);  
				document.title = "Complete Crew!!!";
				mCoinSound.play();
				if (!myWindow) {
					console.log("myWindow was never opened",checking); 
				} else {
					myWindow.focus();
				}
				window.clearTimeout(timer);
				_people=null;
				_cryo=null;
				timer=window.setTimeout(reloading,20*1000);
			}
		}
    } catch (e) {
        console.error("Error checkCompleteCrew",e);        
    }
}

function reloading() {
    console.log("Reloading",checking,joining); 
    if (!myWindow) {
        console.log("myWindow was never opened",checking,joining); 
    } else {
        myWindow.close();
    }
    mClickSound.play();
    location.reload();
}

var persChoosen = GM_getValue(window.location.host+'_persChoosen',persList.Chao);
if (joining||joining=='true') {
    var _people=$('ul[class="people"]');    
    //GM_registerMenuCommand("Stop Join as Paola", function() {stopJoinAs();});
    GM_registerMenuCommand("Stop Join as "+persChoosen.name, function() {stopJoinAs();});
	if (_people.length>0) {	
		_people=null;
		console.log("You already join a party!!!"); 
	} else {
		_people=null;
		joinAs(persChoosen);
	}
} else {
    //GM_registerMenuCommand("Join as Paola", function() {joinAs('paola_rinaldo');});
    GM_registerMenuCommand("Join as...", function() {beginJoinAs(persChoosen);});
}

function stopJoinAs() {
    GM_setValue(window.location.host+'_joining',false);
    window.clearTimeout(timer);
    timer=window.setTimeout(reloading,1000);
}


function beginJoinAs() { 
	$("body").append ( '\
	<div id="dialog-form" title="Choose character" class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable" tabindex="-1" role="dialog" aria-labelledby="ui-id-1" style="outline: 0px; z-index: 1004; position: absolute; height: auto; width: auto; top: 10%; left: 30%; display: block;">\
	<div><button id="close_character" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick">close</span></button></div>\
	<form>\
	<fieldset>\
	<label for="name">Select a character</label><select name="character" id="character"></select>\
	<button id="bt_character" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text">Go!</span></button>\
	<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">\
	</fieldset>\
	</form>\
	</div>\                                                                  \
	' );
	$('#character').css("color","rgb(34, 75, 165)")
	$.each(persList, function(name, person) {
			console.log("#character",name,person);  
			$('#character').append( $('<option></option>').val(name).html(person.name) );
			if (GM_getValue(window.location.host+'_persChoosen',persList.Chao).img==person.img) {
				$('#character').val(name);
			}
		}); 
	$('#bt_character').click(function() {
		var character = $( "#character" );
		persChoosen=persList[character.val()];
		console.log(persChoosen.name+" is the character choosen...",persChoosen);  
		GM_setValue(window.location.host+'_persChoosen',persChoosen);
		joinAs(persChoosen);
	});
	$('#close_character').click(function() {
		$('#dialog-form').empty();
		$('#dialog-form').remove();
	});	
}

function joinAs(someone) {
    GM_setValue(window.location.host+'_joining',true);
    try {
        var _people=$('table[class="choosehero2"]');    
        if (_people.length>0) {	
			
			var _pers=$('img[src*="img/art/char/'+someone.img+'.jpg"]');
			
			console.log("Join As "+someone.name,_pers);    
			if (_pers.length>0) {
				var _charDiv=$('div[class*="charDiv"][onclick*="'+someone.name+'"]');
				openWin(someone.name+" is available!!!");
				console.log(someone.name+" is available!!!",_charDiv);  
				document.title = someone.name+" is available!!!";
				if (_charDiv.length>0) {
					_charDiv.click();
					mCoinSound.play();
					if (!myWindow) {
						console.log("myWindow was never opened",joining); 
					} else {
						myWindow.focus();
					}
					var _Button=$('div[class*="cdChooseButton"]');
					if (_Button.length>0) {
						console.log("_Button ",_Button);  
						_Button.click();
					}
				}
				window.clearTimeout(timer);
				_people=null;
				_pers=null;
				_charDiv=null;
				_Button=null;
				timer=window.setTimeout(reloading,30*1000);
			} else {
				console.log(someone.name+" isn't available...",joining);  
				document.title = someone.name+" isn't available...";
				window.clearTimeout(timer);
				_people=null;
				_pers=null;
				timer=window.setTimeout(reloading,30*1000);
			}
		}
    } catch (e) {
        console.error("Error checkCompleteCrew",e);        
    }
}

if (unreading||unreading=='true') {
    GM_registerMenuCommand("Stop Check Unread", function() {stopCheckUnread();});
    checkUnread();
} else {
    GM_registerMenuCommand("Check Unread", function() {checkUnread();});
} 

function stopCheckUnread() {
    GM_setValue(window.location.host+'_unreading',false);
    window.clearTimeout(timer);
    timer=window.setTimeout(reloading,1000);
}
function checkUnread() {
    GM_setValue(window.location.host+'_unreading',true);
    try {
        var tot_unread=0;
        $('span[class*="cdNbNotRead"]').each(function(_i, _e) {
            var nb_tab=eval($(_e).text());
            console.log("count:",_i,nb_tab); 
            tot_unread+=nb_tab;            
        });  
		if (tot_unread==0) {
			console.log("No unread message...",checking);  
			document.title = "No unread message...";
			window.clearTimeout(timer);
			_people=null;
			_cryo=null;
			timer=window.setTimeout(reloading,30*1000);
		} else {
			openWin(tot_unread+" unread message!!!");
			console.log(tot_unread+" unread message!!!",tot_unread);  
			document.title = "Unread Message!!!";
			mCoinSound.play();
			if (!myWindow) {
				console.log("myWindow was never opened",checking); 
			} else {
					myWindow.focus();
			}
			window.clearTimeout(timer);
			_people=null;
			_cryo=null;
			timer=window.setTimeout(reloading,20*1000);
		}
    } catch (e) {
        console.error("Error checkUnread",e);        
    }
}
