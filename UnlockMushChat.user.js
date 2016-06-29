// ==UserScript==
// @name         Unlock Mush Chat
// @namespace    http://mush.vg/
// @version      1.0
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

/*jshint multistr: true */

/*
@require        http://code.jquery.com/ui/1.11.4/jquery-ui.js
@resource       jqueryUiCss http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css
 */

//GM_registerMenuCommand("Draw astropad help", function() {drawAstropadHelp();});

/*function drawAstropadHelp() {
$('.talks').css("z-index", "0");
}*/
/*console.log("unsafeWindow.haxe ",unsafeWindow.haxe);
var oldFunction = unsafeWindow.Main.chooseSkill;
unsafeWindow.Main.chooseSkill = function (jq) {
if(Main.choosingSkills) return;
console.log("Main.choosingSkills ",Main.choosingSkills);
console.log("jq ",jq);
console.log("unsafeWindow.Tools ",unsafeWindow.Tools);
unsafeWindow.Tools.ping("/ws",function(resp) {
var skills = haxe.Unserializer.run(resp);
var dial = new js.JQuery(".cdSkillBox").clone().removeClass("cdTpl");
var rep = JqEx.ok(dial).find(".cdSkillRep");
var _g = 0;
while(_g < skills.length) {
var i = skills[_g];
++_g;
var jq1 = Main.j(new Tag("li").content(new Tag("img").attr("src",i.img).attr("onclick","Main.validateSkill( $(this), " + i.id + ");return false;").toString()).toString());
JqEx.tip(jq1,i.name,i.desc);
rep.append(jq1);
}
new js.JQuery("#floating_ui_start").prepend(dial);
});
Main.choosingSkills = true;
}*/
console.log("Main ", unsafeWindow.Main);

var unlockingG = GM_getValue(window.location.host + '_unlockingG', false);
if (unlockingG || unlockingG == 'true') {
    GM_registerMenuCommand("Stop Unlock General Chat", function () {
        stopUnlockGeneralChat();
    });
    unlockGeneralChat();
} else {
    GM_registerMenuCommand("Unlock General Chat", function () {
        unlockGeneralChat();
    });
}

function unlockGeneralChat() {
    GM_setValue(window.location.host + '_unlockingG', true);
    $('#localtab').after(
        '<li id="fav" data-tab="6" onclick="Main.selChat(6)" ondblclick="return false;" class="tab taboff"><img src="/img/icons/ui/fav.png" onmouseover="Main.showTip(this,\'<div class=\\\'tiptop\\\' ><div class=\\\'tipbottom\\\'><div class=\\\'tipbg\\\'><div class=\\\'tipcontent\\\'><h1>Favoris</h1><p>Votre sélection de sujets favoris.</p></div></div></div></div>\')" onmouseout=" Main.hideTip(); "><div class="hide tab_not_read" style="display: none;"><span class="cdNbNotRead">0</span></div></li>');
    $('#localtab').after(
        '<li id="walltab" data-tab="5" onclick="Main.selChat(5)" ondblclick="return false;" class="tab taboff"><img src="/img/icons/ui/wall.png" onmouseover="Main.showTip(this,\'<div class=\\\'tiptop\\\' ><div class=\\\'tipbottom\\\'><div class=\\\'tipbg\\\'><div class=\\\'tipcontent\\\'><h1>Discussion</h1><p>Le canal de Discussion est indispensable pour s\\\'organiser avec l\\\'équipage. </p><p>Pour participer vous devez posséder un <img src=&quot;/img/icons/ui/talkie.png&quot;/> <strong>talkie-walkie</strong>.</p></div></div></div></div>\')" onmouseout=" Main.hideTip(); "><div class="hide tab_not_read" style="display: none;"><span class="cdNbNotRead">0</span></div></li>');
    $("table.treereply tr.not_read.cdRepl").css("display", "table-row");
}

function stopUnlockGeneralChat() {
    GM_setValue(window.location.host + '_unlockingG', false);
    window.clearTimeout(timer);
    timer = window.setTimeout(reloading, 1000);
}

var unlockingM = GM_getValue(window.location.host + '_unlockingM', false);
if (unlockingM || unlockingM == 'true') {
    GM_registerMenuCommand("Stop Unlock Mush Chat", function () {
        stopUnlockMushChat();
    });
    unlockMushChat();
} else {
    GM_registerMenuCommand("Unlock Mush Chat", function () {
        unlockMushChat();
    });
}

function unlockMushChat() {
    GM_setValue(window.location.host + '_unlockingM', true);
    $('#localtab').after(
        '<li id="mushtab" data-tab="2" onclick="Main.selChat(2)" ondblclick="return false;" class="tab taboff"><img src="/img/icons/ui/mush.png" onmouseover="Main.showTip(this,\'<div class=\\\'tiptop\\\' ><div class=\\\'tipbottom\\\'><div class=\\\'tipbg\\\'><div class=\\\'tipcontent\\\'><h1>Mush Channel</h1>Ssshh, nobody can hear us here... The Mush channel is the <em>private channel</em> for those fighting for <strong>Mush Superiority</strong> <img src=&quot;/img/icons/ui/mush.png&quot;/>.</div></div></div></div>\')" onmouseout=" Main.hideTip(); "><div class="hide tab_not_read"><span class="cdNbNotRead">0</span></div></li>');
}

function stopUnlockMushChat() {
    GM_setValue(window.location.host + '_unlockingM', false);
    window.clearTimeout(timer);
    timer = window.setTimeout(reloading, 1000);
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
            newCss = null;
        }
        head = null;
    } catch (e) {
        console.error("Error in addCss", e);
    }
}

var myWindow;
function openWin(text) {
    myWindow = window.open("", "", "width=400 ,height=200");
    console.log("myWindow ", myWindow);
    if (myWindow) {
        var closetimer;
        var closefunc = function () {
            myWindow.close();
            myWindow = null;
        };
        myWindow.document.write("<html><head><script language='javascript'>function changeparent(){try{console.log('test');window.opener.external.comeback(this);}catch(e){var back = confirm(e);if(back) {_child.close();	myWindow=null;}}}</script></head><body>");
        myWindow.document.write("<form><input type=button onclick='javascript:changeparent()' value='Main'></form>");
        myWindow.document.write("<p id='textinfo' onclick='javascript:this.opener.focus()' >" + text + "</p>");
        myWindow.document.write("</body></html>");
        myWindow.document.title = text;
        try {
            closetimer = myWindow.setTimeout(closefunc, 15 * 1000);
        } catch (e) {
            console.error("closetimer error:", e);
        }
    } else {
        console.log("POPUP is blocked", myWindow);
    }
}

window.external.comeback = function (_child) {
    var back = confirm('Are you sure you want to comback?');
    if (back) {
        _child.close();
        myWindow = null;
    } else {
        _child.focus();
    }
};

console.log("window.location.host ", window.location.host);
var checking = GM_getValue(window.location.host + '_checking', false);
var joining = GM_getValue(window.location.host + '_joining', false);
var unreading = GM_getValue(window.location.host + '_unreading', false);
var timer;
var mCoinSound = new Audio("https://dl.dropbox.com/u/7079101/coin.mp3");
var mClickSound = new Audio("http://soundbible.com/grab.php?id=1705&type=mp3");
var persList = {
    Andie : {
        img : "andie_graham",
        name : "Andie Graham"
    },
    Chun : {
        img : "zhong_chun",
        name : "Zhong Chun"
    },
    Chao : {
        img : "wang_chao",
        name : "Wang Chao"
    },
    Derek : {
        img : "derek_hogan",
        name : "Derek Hogan"
    },
    Eleesha : {
        img : "eleesha_williams",
        name : "Eleesha Williams"
    },
    Finola : {
        img : "finola_keegan",
        name : "Finola Keegan"
    },
    Frieda : {
        img : "frieda_bergmann",
        name : "Frieda Bergmann"
    },
    Gioele : {
        img : "gioele_rinaldo",
        name : "Gioele Rinaldo"
    },
    Hua : {
        img : "jiang_hua",
        name : "Jiang Hua"
    },
    Ian : {
        img : "ian_soulton",
        name : "Ian Soulton"
    },
    Janice : {
        img : "janice_kent",
        name : "Janice Kent"
    },
    JinSu : {
        img : "kim_jin_su",
        name : "Kim Jin Su"
    },
    KuanTi : {
        img : "lai_kuan_ti",
        name : "Lai Kuan-Ti"
    },
    Paola : {
        img : "paola_rinaldo",
        name : "Paola Rinaldo"
    },
    Raluca : {
        img : "raluca_tomescu",
        name : "Raluca Tomescu"
    },
    Roland : {
        img : "roland_zuccali",
        name : "Roland Zuccali"
    },
    Stephen : {
        img : "stephen_seagull",
        name : "Stephen Seagull"
    },
    Terrence : {
        img : "terrence_archer",
        name : "Terrence Archer"
    }
};

if (checking || checking == 'true') {
    GM_registerMenuCommand("Stop Check complete crew", function () {
        stopCheckCompleteCrew();
    });
    checkCompleteCrew();
} else {
    GM_registerMenuCommand("Check complete crew", function () {
        checkCompleteCrew();
    });
}

function stopCheckCompleteCrew() {
    GM_setValue(window.location.host + '_checking', false);
    window.clearTimeout(timer);
    timer = window.setTimeout(reloading, 1000);
}

function checkCompleteCrew() {
    GM_setValue(window.location.host + '_checking', true);
    window.clearTimeout(timer);
    timer = window.setTimeout(searchAjax, 1000);
}

function reloading() {
    console.log("Reloading", checking, joining);
    if (!myWindow) {
        console.log("myWindow was never opened", checking, joining);
    } else {
        myWindow.close();
        myWindow = null;
    }
    mClickSound.play();
    location.reload();
}

var persChoosen = GM_getValue(window.location.host + '_persChoosen', persList.Chao);
if (joining || joining == 'true') {
    var _people = $('ul[class="people"]');
    //GM_registerMenuCommand("Stop Join as Paola", function() {stopJoinAs();});
    GM_registerMenuCommand("Stop Join as " + persChoosen.name, function () {
        stopJoinAs();
    });
    if (_people.length > 0) {
        _people = null;
        console.log("You already join a party!!!");
    } else {
        _people = null;
        joinAs(persChoosen);
    }
} else {
    //GM_registerMenuCommand("Join as Paola", function() {joinAs('paola_rinaldo');});
    GM_registerMenuCommand("Join as...", function () {
        beginJoinAs(persChoosen);
    });
}

function stopJoinAs() {
    GM_setValue(window.location.host + '_joining', false);
    window.clearTimeout(timer);
    timer = window.setTimeout(reloading, 1000);
}

function beginJoinAs() {
    $("body").append('\
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
                                        	');
    $('#character').css("color", "rgb(34, 75, 165)");
    $.each(persList, function (name, person) {
        console.log("#character", name, person);
        $('#character').append($('<option></option>').val(name).html(person.name));
        if (GM_getValue(window.location.host + '_persChoosen', persList.Chao).img == person.img) {
            $('#character').val(name);
        }
    });
    $('#bt_character').click(function () {
        var character = $("#character");
        persChoosen = persList[character.val()];
        console.log(persChoosen.name + " is the character choosen...", persChoosen);
        GM_setValue(window.location.host + '_persChoosen', persChoosen);
        joinAs(persChoosen);
    });
    $('#close_character').click(function () {
        $('#dialog-form').empty();
        $('#dialog-form').remove();
    });
}

function joinAs(someone) {
    GM_setValue(window.location.host + '_joining', true);
    try {
        var _people = $('table[class="choosehero2"]');
        if (_people.length > 0) {
            var _pers = $('img[src*="img/art/char/' + someone.img + '.jpg"]');
            console.log("Join As " + someone.name, _pers);
            if (_pers.length > 0) {
                var _charDiv = $('div[class*="charDiv"][onclick*="' + someone.name + '"]');
                openWin(someone.name + " is available!!!");
                console.log(someone.name + " is available!!!", _charDiv);
                document.title = someone.name + " is available!!!";
                if (_charDiv.length > 0) {
                    _charDiv.click();
                    mCoinSound.play();
                    if (!myWindow) {
                        console.log("myWindow was never opened", joining);
                    } else {
                        myWindow.focus();
                    }
                    var _Button = $('div[class*="cdChooseButton"]');
                    if (_Button.length > 0) {
                        console.log("_Button ", _Button);
                        _Button.click();
                    }
                    _Button = null;
                }
                window.clearTimeout(timer);
                _people = null;
                _pers = null;
                _charDiv = null;
                timer = window.setTimeout(reloading, 30 * 1000);
            } else {
                console.log(someone.name + " isn't available...", joining);
                document.title = someone.name + " isn't available...";
                window.clearTimeout(timer);
                _people = null;
                _pers = null;
                timer = window.setTimeout(reloading, 30 * 1000);
            }
        }
    } catch (e) {
        console.error("Error checkCompleteCrew", e);
    }
}

if (unreading || unreading == 'true') {
    GM_registerMenuCommand("Stop Check Unread", function () {
        stopCheckUnread();
    });
    checkUnread();
} else {
    GM_registerMenuCommand("Check Unread", function () {
        checkUnread();
    });
}

function stopCheckUnread() {
    GM_setValue(window.location.host + '_unreading', false);
    window.clearTimeout(timer);
    timer = window.setTimeout(reloading, 1000);
}
function checkUnread() {
    GM_setValue(window.location.host + '_unreading', true);
    window.clearTimeout(timer);
    timer = window.setTimeout(searchAjax, 1000);
}

function myAjax(page, params, cbError, cbSuccess) {
    try {

        params = {};
        //params.ajax = 1;

        $.ajax({
            url : page,
            type : 'GET',
            data : params,
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                cbError(XMLHttpRequest, textStatus, errorThrown);
            },

            success : function (data, textStatus, XMLHttpRequest) {
                console.log(2, "ajax", [data, textStatus, XMLHttpRequest]);
                cbSuccess(data, textStatus, XMLHttpRequest);
            }
        });

        return true;
    } catch (err) {
        console.error("ERROR in myAjax: " + err.stack);
        return false;
    }
}

function refreshing(_id, _text) {
    console.log("refreshing", _id);
    try {
        $(_id).html(_text);
    } catch (e) {
        console.error("Error refreshing", _id);
    }
}
function refresh(data) {
    if ($('#topinfo_bar', data).length > 0) {
        refreshing('#topinfo_bar', $('#topinfo_bar', data).html());
    }
    if ($('#chat_col', data).length > 0) {
        refreshing('#chat_col', $('#chat_col', data).html());
    }
    if ($('#research_module', data).length > 0) {
        refreshing('#cdInventory', $('#cdInventory', data).html());
    }
    if ($('#research_module', data).length > 0) {
        refreshing('#research_module', $('#research_module', data).html());
    }
    if ($('#cdModuleContent', data).length > 0) {
        refreshing('#cdModuleContent', $('#cdModuleContent', data).html());
    }
    if ($('div.explorelog', data).length > 0) {
        refreshing('div.explorelog', $('div.explorelog', data).html());
    }
    if ($('#char_col', data).length > 0) {
        refreshing('#char_col', $('#char_col', data).html());
    }
    $("table.treereply tr.not_read.cdRepl").css("display", "table-row");
}

function searchAjax() {

    function onError() {
        console.log("Unable to use ajax");
        timer = window.setTimeout(searchAjax, 20 * 1000);
    }

    function onSuccess(data) {
        try {
            var $data = $($.parseHTML(data));
            var d = new Date();
            var d2 = new Date();
            var n = d.toTimeString();
            var cycletime = $('p.cycletime').text().trim();
            if ($('ul.people', $data).length > 0) {
                var last_nb_mush = GM_getValue(window.location.host + '_nb_mush', 0);
                var nb_mush = $('img[src*="p_mush.png"]', $data).length;
                console.log("nb_mush", last_nb_mush, nb_mush);
                GM_setValue(window.location.host + '_nb_mush', nb_mush);
                if (last_nb_mush != nb_mush) {
                    window.clearTimeout(timer);
                    refresh($data);
                    mCoinSound.play();
                    var back = confirm(cycletime + " (" + n + "): Mush number altered!!! (" + last_nb_mush + " to " + nb_mush + ")");
                    if (back) {
                        mClickSound.play();
                    }
                    d2 = new Date();
                    if (((d2 - d) / 1000) > 60) {
                        timer = window.setTimeout(searchAjax, 1);
                    } else {
                        timer = window.setTimeout(searchAjax, 30 * 1000);
                    }
                }
            }

            unreading = GM_getValue(window.location.host + '_unreading', false);
            if (unreading || unreading == 'true') {
                var tot_unread = 0;
                var lastNbUnread = GM_getValue(window.location.host + '_lastNbUnread', 0);
                $('img[class*="recent"]', $data).each(function (_i, _e) {
                    tot_unread += 1;
                });
                GM_setValue(window.location.host + '_lastNbUnread', tot_unread);
                console.log("count:", tot_unread);
                if (tot_unread === 0) {
                    console.log("No unread message...", checking);
                    document.title = "No unread message...";
                    if (myWindow) {
                        myWindow.close();
                        myWindow = null;
                    }
                    window.clearTimeout(timer);
                    timer = window.setTimeout(searchAjax, 30 * 1000);
                } else {
                    var message = cycletime + " (" + n + "): " + tot_unread + " unread message!!!";
                    window.clearTimeout(timer);
                    refresh($data);
                    if (lastNbUnread < tot_unread) {
                        mCoinSound.play();
                        alert(message);
                    } else {
                        if (!myWindow) {
                            openWin(message);
                            console.log(message, tot_unread);
                            document.title = "Unread Message!!!";
                            mCoinSound.play();
                            if (!myWindow) {
                                console.log("myWindow was never opened", checking);
                            } else {
                                myWindow.focus();
                            }
                        } else {
                            myWindow.document.getElementById('textinfo').innerHTML = message;
                            myWindow.focus();
                        }
                    }
                    timer = window.setTimeout(searchAjax, 20 * 1000);
                }
            }
            checking = GM_getValue(window.location.host + '_checking', false);
            if (checking || checking == 'true') {
                try {
                    var _people = $('ul[class="people"]', $data);
                    if (_people.length > 0) {
                        var _cryo = $('img[src*="p_cryo.png"]', $data);
                        //console.log("Check complete crew",_cryo);
                        if (_cryo.length > 0) {
                            console.log("Still crew in cryo...", checking);
                            document.title = "Still crew in cryo...";
                            window.clearTimeout(timer);
                            _people = null;
                            _cryo = null;
                            timer = window.setTimeout(searchAjax, 30 * 1000);
                        } else {
                            var message_complete = cycletime + " (" + n + "): Complete Crew!!!";
                            if (!myWindow) {
                                openWin(message_complete);
                                console.log(message_complete, checking);
                                document.title = "Complete Crew!!!";
                                mCoinSound.play();
                                if (!myWindow) {
                                    console.log("myWindow was never opened", checking);
                                } else {
                                    myWindow.focus();
                                    myWindow.alert(message_complete);
                                }
                            } else {
                                myWindow.document.getElementById('textinfo').innerHTML = message_complete;
                                myWindow.focus();
                                myWindow.alert(message_complete);
                            }
                            window.clearTimeout(timer);
                            _people = null;
                            _cryo = null;
                            timer = window.setTimeout(searchAjax, 20 * 1000);
                        }
                    }
                } catch (e) {
                    console.error("Error checkCompleteCrew", e);
                }
            }
        } catch (e) {
            console.error("Error searchAjax.onSuccess", e);
        }
    }

    try {
        var params = {};
        myAjax('#', params, onError, onSuccess);
        return true;
    } catch (err) {
        console.error("ERROR in searchAjax : " + err);
        timer = window.setTimeout(searchAjax, 20 * 1000);
        return false;
    }
}
