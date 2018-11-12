//此处修改为http://dynamic.cloud.vip.xunlei.com/user_task?userid=XXXXXXXX&st=0中的XXXXXXXX
var G_USERID = getCookie('lx_sessionid');
var a = location.href;
var DOMAIN_LIXIAN = a.replace(/(.+\/).*$/g, '$1');
var INTERFACE_URL = ".";
//
window.onerror=function(){
    var errorMsg = '';
    for(var i=0;i<arguments.length;i++){
        var reportString='';
        arguments[i]=arguments[i].toString();
        var errorInfo=arguments[i].split('/');
        reportString = errorInfo[errorInfo.length-1];
        errorMsg+='_'+encodeURIComponent(reportString);
    }
    try{
        send_stats("http://lixian.xunlei.com/func/jserr","reason="+errorMsg);
    }catch(e){}
    window.onerror=function(){return true;};
    return true;
}

isUndef  = function(a){ return typeof a == "undefined";};
isNull   = function(a){ return typeof a == "object" && !a; };
var isFF=(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1);
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var isChrome = (navigator.userAgent.indexOf("Chrome") != -1) ? true : false;
var isSafari = (navigator.userAgent.indexOf("Safari") != -1) ? true : false;
var VIP_SPACE_ARY = new Array(0,3,5,8,15,30,100);
var gold2silver = 1000;

String.prototype.trim = function(){return this.replace(new RegExp("(^[\\s]*)|([\\s]*$)", "g"), "");};
$PU = function(parameter, url)
{
    url = isUndef(url) ? location.href : url;
    var result = url.match(new RegExp("[\#|\?]([^#]*)[\#|\?]?"));
    url = "&" + (isNull(result) ? "" : result[1]);
    result = url.match(new RegExp("&"+parameter+"=", "i"));
    return isNull(result) ? undefined : url.substr(result.index+1).split("&")[0].split("=")[1];
};
//var G_USERID = "<?php include 'vars.php'; echo $ui; ?>";
var G_STATUS = $PU("st");
var G_PAGENUM = $PU("p");
if( isUndef(G_STATUS) ) G_STATUS = 0;
if( isUndef(G_PAGENUM) ) G_PAGENUM = 1;
  var a = location.href;
var b = a.replace(/(.+\/).*$/g, '$1');
//var DOMAIN_LIXIAN = b;
//alert(b);
var TASK_BASE = DOMAIN_LIXIAN+"index.php?userid="+G_USERID;
var TASK_HOME = DOMAIN_LIXIAN+"index.php?userid="+G_USERID+"&st=0";
var TASK_PAGE = DOMAIN_LIXIAN+"index.php?userid="+G_USERID+"&st="+G_STATUS+"&p="+G_PAGENUM;
var HISTORY_HOME = DOMAIN_LIXIAN+"user_history?userid="+G_USERID;
var EXPIRE_HOME = DOMAIN_LIXIAN+"user_history?type=1&userid="+G_USERID;
var HISTORY_PAGE = DOMAIN_LIXIAN+"user_history?userid="+G_USERID+"&p="+G_PAGENUM;
var APPLY_HOME = DOMAIN_LIXIAN+"user_apply?userid="+G_USERID;
var APPLY_PAGE = DOMAIN_LIXIAN+"user_apply?userid="+G_USERID+"&p="+G_PAGENUM;
var LOGIN_URL = DOMAIN_LIXIAN+"login";
//var INTERFACE_URL = DOMAIN_LIXIAN+"interface";

var C_VIPLEVEL = 0;
var C_VIPSPACE = 0;

function setXlCookie(name,value,sec){
    if(arguments.length>2){
        var expireDate=new Date(new Date().getTime()+sec*1000);
        document.cookie = name + "=" + escape(value) + "; path=/; domain=xunlei.com; expires=" + expireDate.toGMTString() ;
    }else
    document.cookie = name + "=" + escape(value) + "; path=/; domain=xunlei.com";
}
function setGdCookie(name,value,sec){
    if(arguments.length>2){
        var expireDate=new Date(new Date().getTime()+sec*1000);
        document.cookie = name + "=" + escape(value) + "; path=/; domain=vip.xunlei.com; expires=" + expireDate.toGMTString() ;
    }else
    document.cookie = name + "=" + escape(value) + "; path=/; domain=vip.xunlei.com";
}

function getCookie(name){
    return (document.cookie.match(new RegExp("(^"+name+"| "+name+")=([^;]*)"))==null)?"":RegExp.$2;
}

function JSONscriptRequest(fullUrl)
{
    this.fullUrl = fullUrl;
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    this.headLoc = document.getElementsByTagName("head").item(0);
    this.scriptId = 'JscriptId' + JSONscriptRequest.scriptCounter++;
}

var in_xl = getCookie('in_xl');
try {
    var C_VIPLEVEL = parseInt(getCookie("isvip"));
    var C_VIPSPACE = VIP_SPACE_ARY[C_VIPLEVEL];
} catch (e) {}

JSONscriptRequest.scriptCounter = 1;
JSONscriptRequest.prototype.buildScriptTag = function ()
{
    this.scriptObj = document.createElement("script");
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
};
JSONscriptRequest.prototype.removeScriptTag = function () {
    this.headLoc.removeChild(this.scriptObj);
};
JSONscriptRequest.prototype.addScriptTag = function () {
    this.headLoc.appendChild(this.scriptObj);
};

function set_dynamic_status(f) {
    
}

function format_size(spare_size)
{
    var spare_str;
    var spare_left;
    if( spare_size >= 1024*1024*1024  )
    {
        spare_left = Math.floor(spare_size/(1024*1024*1024)*10);
        spare_str = (spare_left/10).toString()+"GB";
    }else if( spare_size >= 1024*1024 ){
        spare_left = (Math.floor(spare_size*100/(1024*1024)))/100;
        spare_str = spare_left.toString()+"MB";
    }
    else if(spare_size >= 1024){
        spare_left = Math.floor(spare_size/1024);
        spare_str = spare_left.toString()+"KB";
    }
    else{
        spare_str = spare_size + "B";
    }

    return spare_str;
}

function format_size_gb(size){
    var r = new Number(size/(1024*1024*1024)).toFixed(2).toString() + 'GB';
    return r;
}

// 空间转换为金豆
function format_size_goldbean(spare_size) {
    spare_left = Math.floor(spare_size/(1024*1024*1024)*10);
    spare_str = parseInt((spare_left/10));
    return spare_str;
}

// 空间转换为银豆
function format_size_silverbean(spare_size) {
    spare_left = Math.floor(spare_size/(1024*1024)*10);
    spare_str = Math.ceil((spare_left/10));
    spare_str = spare_str%1024;
    return spare_str;
}

// 金豆换空间
function goldbean_size(a) {
    return silverbean_size(a*gold2silver);
}

// 银豆转换空间
function silverbean_size(a) {
    return a*1024*1024*1.024;
}

function set_tab_status(st){
    if (st == '12') {
        window.open(APPLY_HOME);
    } else if (st == '11') {
        top.location = HISTORY_HOME;
    } else if(st == '13') {
        top.location = EXPIRE_HOME;
    }
    else {
        top.location = TASK_BASE+"&st="+st;
    }       
}



function user_authrity()
{
    var gdriveid = getCookie("gdriveid");
    var vip_level = getCookie("vip_level");
    var cookie_str = _$('cok').value;

    var leave_time = 3600*24*7;
    setGdCookie("gdriveid",cookie_str,leave_time);
}

function show_notice() {
    
}

function hide_notice() {
    $('body').className = '';
    $('common_notice_layer').className = "";
    $('common_notice_layer').innerHTML = "";
    $('common_notice_layer').style.display = 'none';
}

submouseOver = function (index) {
    var topindex = 'navigater_'+index;
    if($(topindex) && $(topindex).className != "selected") $(topindex).className = "onhover";

    if($('navigater_ul')) {
        var allsubs = $('navigater_ul').getElementsByTagName('UL');
        for(var i in allsubs) {
            if(allsubs[i].style)
            allsubs[i].style.display = 'none';
        }
    }
    var subul = 'sub'+index;
    if($(subul)) $(subul).style.display = 'block';
}
submouseout = function (e, o, index) {
    var select_li = '';
    if($('navigater_ul')) select_li = $('navigater_ul').getAttribute('selectedli');
    if(index == select_li)  return ;

    var topindex = 'navigater_'+index;
    var subul = 'sub'+index;
    if($(topindex)) $(topindex).className = "";
    if($(subul)) $(subul).style.display = 'none';

    var selected_subul = 'sub'+select_li;
    if($(selected_subul)) $(selected_subul).style.display = 'block';
}

function word_suggest(){
    var n_hour = new Date().getHours();
    var h_suggest = "";
    if( n_hour > 0 && n_hour < 6 ) h_suggest = "凌晨好";
    else if( n_hour >=6 && n_hour < 12 ) h_suggest = "上午好";
    else if( n_hour >=12 && n_hour <18 ) h_suggest = "下午好";
    else h_suggest = "晚上好";
    return h_suggest;
}

function lixian_wait() {
    $("#layer_wait").css('display', "block");
}

function close_layer(d) {
    $("#"+d).hide();
}

function show_taskadd(f){
    if($("f_taskadd").style.display == "none"){
        show_taskadd_layer();
    } else {
        close_taskadd_layer();
    }
}
function show_taskadd_layer(){
    $("#f_taskadd").show();
}
function close_taskadd_layer(){
    $("#f_taskadd").hide();
    $("#b_taskadd").removeClass();
}
function close_rightmenu_layer(){
    $("#rightmenu").hide();
}

function showLayer(ob){$(ob).show();}

function show_message(msg) {
    $("layer_message_info").innerHTML = msg;
    setDivPosition('layer_message');
    $("layer_message").className = "layerbox hslayerbox";
    $("layer_message").style.display = "";
}

function setDivPosition(d) {
    $(d).style.display="";
    var divHeight = document.getElementById(d).offsetHeight;
    var divWidth = document.getElementById(d).offsetWidth;
    //$(d).style.display="none";
    var divLeft = parseInt((document.documentElement.clientWidth-divWidth)/2);
    var divTop = parseInt(document.documentElement.scrollTop+((document.documentElement.clientHeight-divHeight)/2))-100;
    if (divTop<100) {
        divTop = 100;
    }
    document.getElementById(d).style.left = divLeft + "px";
    document.getElementById(d).style.top = divTop + "px";
}

function go_new(index){
    window.top.location=g_static_urls['domain']+g_static_urls[index]+"?cachetime="+new Date().getTime();
}
function go_new1(index,pos){
    var param = "";
    if( !isUndef(pos) )
    param = "referfrom=" + pos+"&";
    window.top.location=g_dynamic_urls['domain']+g_dynamic_urls[index]+"?"+param+"cachetime="+new Date().getTime();
}

function go_new1_np(index,pos){
    var param = "";
    if( !isUndef(pos) ) param = "referfrom=" + pos+"&";
    window.open(g_dynamic_urls['domain']+g_dynamic_urls[index]+"?"+param+"cachetime="+new Date().getTime());
}

function go_url(url) {
    var refer = getCookie('lx_referfrom');
    var ucid =  getCookie('ucid');
    if(ucid!='') {
        if (url.indexOf("?")!=-1) {
            url = url+"&referfrom=union&ucid=" + ucid;
        } else {
            url = url+"?referfrom=union&ucid=" + ucid;
        }
    } else if(refer!='') {
        if (url.indexOf("?")!=-1) {
            url = url+"&referfrom="+refer;
        } else {
            url = url+"?referfrom="+refer;
        }
    }
    if (in_xl==1) {
        window.open('http://jump.xunlei.com/sessionid/?sessionid='+getCookie("sessionid")+'&u1='+encodeURI(url));
    } else {
        window.open(url);
    }
}

function jump_url(url){
    var refer = getCookie('lx_referfrom');
    var ucid =  getCookie('ucid');
    if(ucid!='') {
        if (url.indexOf("?")!=-1) {
            url = url+"&referfrom=union&ucid=" + ucid;
        } else {
            url = url+"?referfrom=union&ucid=" + ucid;
        }
    } else if(refer!='') {
        if (url.indexOf("?")!=-1) {
            url = url+"&referfrom="+refer;
        } else {
            url = url+"?referfrom="+refer;
        }
    }

    //http://jump.xunlei.com/jump/?jump_key=F535496182A9FEFD3906D3BA74B00EF6F79622146B590684856CF0F2849B10AF47B2F94324A84AC1601F2F687BA24B3EE5469E87389CDFE65C07CA06FEEE4839B0287BB81B543A6B1D4E2332E04D3FA4&u1=http://lixian.vip.xunlei.com/xunlei_task.html
    window.open('http://jump.xunlei.com/sessionid/?sessionid='+getCookie("sessionid")+'&u1='+encodeURI(url));
    //window.open('http://jump.xunlei.com/jump/?jump_key='+getCookie("jumpkey")+'&u1='+encodeURI(url));
}

function go_refer_url(url) {
    var refer = getCookie('lx_referfrom');
    if(refer!='') {
        if (url.indexOf("?")!=-1) {
            url = url+"&referfrom="+refer;
        } else {
            url = url+"?referfrom="+refer;
        }
    }
    window.open(url);
}

function go_union_url(url) {
    var ucid = getCookie("ucid");
    if( !isUndef(ucid) && ucid != "" )  {
        var param = "ucid=" + ucid;
    } else {
        var param = "";
    }
    if(param!='') {
        if (url.indexOf("?")!=-1) {
            url = url+"&"+param;
        } else {
            url = url+"?"+param;
        }
    }
    window.open(url);
}

function set_lx_refer() {
    var referfrom = $PU("referfrom");
    var ucid =  $PU("ucid");
    if (!isUndef(referfrom) && referfrom!='') {
        setGdCookie("lx_referfrom",referfrom);
    } else {
        setGdCookie("lx_referfrom",'');
    }
    if (!isUndef(ucid) && ucid!='') {
        setGdCookie("ucid",ucid);
    } else {
        setGdCookie("ucid",'');
    }
}

function get_icons(filename) {
    var ext = filename.substring(filename.lastIndexOf(".")+1).trim();
    if (ext == '') {
        return 'other.png';
    } else if (in_array(ext, ['jpg','bmp','png','gif'])) {
        return 'images.png';
    } else if (in_array(ext, ['exe'])) {
        return 'exe.png';
    } else if (in_array(ext, ['rmvb','avi','mkv','wmv','mp4','rm','mpg','swf','flv','3gp','vob','mov','m2ts'])) {
        return 'videos.png';
    } else if (in_array(ext, ['rar','zip','iso','7z'])) {
        return 'archive.png';
    } else if (in_array(ext, ['mp3','ape','wav','flac','wma'])) {
        return 'videos.png';
    } else if (in_array(ext, ['pdf','txt','ass','srt','doc','htm','mht'])) {
        return 'txt.png';
    } else if (in_array(ext, ['torrent'])) {
        return 'torrent.png';
    } else {
        return 'other.png';
    }
}

function in_array(v, ary) {
    for(i=0;i <ary.length;i++) {
        if(ary[i]==v){
            return true;
        }
        return false; 
    }
}

var g_static_urls={
    domain: ("http://vip.xunlei.com/"),
    index :("index.html"),
    my_freedom_index:("my_freedom/level.html"),
    freedom_set:("freedom/index.html"),
    score_improve:("freedom/score_improve.html"),
    exclusive_skin:("freedom/exclusive_skin.html"),
    freedom_skinad:("freedom/freedom_skinad.html"),
    nickname:("freedom/nickname.html"),
    gamegift:("freedom/game_present.html"),
    bluestone:("freedom/blue_stone.html"),
    help:("help/index.html"),
    yuanxun:("team/yuanxun.html"),
    discount:("freedom/vip_discount.html"),
    forums:("freedom/vip_forums.html"),
    server:("freedom/exclusive_server.html"),
    safesrv:("freedom/safety_service.html"),
    mygrown:("my_freedom/mygrown.html"),
    yxrank:("yuanxun/rank.html"),
    yxintro:("yuanxun/introduce.html"),
    sjtuiding:("help/tuiding.html")
};

var g_dynamic_urls={
    domain: ("http://dynamic.vip.xunlei.com/"),
    kaitong :("paycenter/index/"),
    kaitong_zfb :("paycenter/index/payway/zfb"),
    sendvip :("paycenter/send"),
    my_mycenter_index :("my/my_mycenter_index"),
    my_mycenter_myfun:("my/my_mycenter_myfun"),
    my_mycenter_mylevel:("my/my_mycenter_mylevel"),
    xufei :("paycenter/index"),
    payinfo:("paycenter/orderlist"),
    tuiding:("my/my_mycenter_tuiding"),
    game_act:("game/act"),
    vipmovie:("movie/"),
    qyuanxun:("yuanxun/yuanxun/query")
    //kaitong :("my/my_mycenter_myfun")
};

function escapeHtml(s){
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeQ(s){
    return String(s).replace(/"/g, '\\"').replace(/'/g, "\\'");
}

function send_stats(){
    try{
        xl_pvManually.apply(this,arguments);
    }
    catch(e){}
}

function send_stats2(){
    try{
        xl_pvManually2.apply(this,arguments);
    }
    catch(e){}
}


jQuery.fn.extend({
    tpl:function(tpl,data){
        this.html(TrimPath.processDOMTemplate(tpl,data));
        return this;
    }
});

Array.prototype.remove = function(b) {
    var a = 0;
    for(; a<this.length; a++)
    {
        if( this[a] == b )
        break;
    }

    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};

function _$(id){
    return document.getElementById(id);
}

jQuery.extend(String.prototype,{
    revert: function(){
        var temp = this;
        temp = temp.replace(/&apos;/ig, "\'");
        temp = temp.replace(/&quot;/ig, "\"");
        temp = temp.replace(/&gt;/ig, ">");
        temp = temp.replace(/&lt;/ig, "<");
        temp = temp.replace(/&nbsp;/ig, " ");
        temp = temp.replace(/&amp;/ig, "&");
        temp = temp.replace(/<br.*?>|<\/p><p(\s*|\s+.+?)>/ig, "\n").replace(/<\/?p(\s*|\s+.+?)>/ig,"");
        return temp;
    }
});
jQuery.fn.extend({
    showInputTips: function(strTips){
        if(this.length==0) return;
        this._tips = strTips;
        if (this.val()=="" || this.val().trim() == "") {
            this.val(strTips);
            this.css("color", "gray");
        }
        
        this.focus($.proxy(function(){
            if (this.val().trim() == this._tips) {
                this.css("color", "black");
                this.val("");
            }
        }, this));
        this.blur($.proxy(function(){
            if (this.val().trim() == "") {
                this.css("color", "gray");
                this.val(this._tips);
            }
        }, this));
    }
});

//2011-04-12 add by guoyu
function SerializeJsonToStr(oJson)
{
    if( oJson == null )
        return "null";
    if( typeof(oJson) == typeof(0) )
        return oJson.toString();
    if( typeof(oJson) == typeof('') ||
        oJson instanceof String )
        {
        oJson = oJson.toString();
        oJson = oJson.replace( /\r\n/, '\\r\\n');
        oJson = oJson.replace( /\n/, '\\n');
        oJson = oJson.replace( /\"/, '\\"');
        return '"' + oJson + '"';
    }
    if( oJson instanceof Array )
    {
        var strRet = "[";
        for( var i = 0; i < oJson.length; i++)
        {
            if( strRet.length > 1 )
                strRet += ",";
            strRet += SerializeJsonToStr(oJson[i]);
        }
        strRet += "]";
        return strRet;
    }
    if( typeof(oJson) == typeof({}) )
    {
        var strRet = "{";
        for( var p in oJson )
        {
            if( strRet.length > 1 )
                strRet += ",";
            strRet += '"'+p.toString() + '":' + SerializeJsonToStr(oJson[p]);
        }
        strRet += "}";
        return strRet;
    }
}

function filter_name(str)
{
    str = str.replace(/\&/g, '_');
    str = str.replace(/\</g, '_');
    str = str.replace(/\>/g, '_');
    str = str.replace(/\:/g, '_');
    str = str.replace(/\"/g, '_');
    str = str.replace(/\|/g, '_');
    str = str.replace(/\*/g, '_');
    str = str.replace(/\?/g, '_');
    str = str.replace(/\//g, '_');
    str = str.replace(/\\/g, '_');
    return str;
}