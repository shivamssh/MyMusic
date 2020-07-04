// alert(6555);
document.addEventListener("deviceready",this.onDeviceReady, false);

function onDeviceReady(){
    // alert("ready");

    // alert("onDeviceReady");
        // var fileName = "/android_asset/www/cocktail.mp3 ";
        //Get our media file and stuff
        // init(fileName);
   

        init();
}
// *******************************************************************************//

var fileDur, theMedia, theTimer;

function init() {
  // alert("Init");
  // var fileName;
  // alert(fileName);
  for (var i=0;i<album.length;i++) {
// \''+code+'\',\''+name+'\'
      $("#lists").append('<li><a onclick="abc1(\''+ album[i].asset +'\',\''+ album[i].title +'\');" href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+'<h2>' + album[i].title + '</h2>'+'<p><strong>' + album[i].singer + '</strong></p>'+'<p class="ui-li-aside"><strong>' + album[i].time + '</strong></p></a></li>');
      // fileName = album[i].asset;
      // alert(album[i].asset);
      
  }
  // alert(fileName);
  //Create the media object we need to do everything we need here
  
  // theMedia1 = new Media(fileName1, onMediaSuccess, onMediaError, onMediaStatus);
  // theMedia2 = new Media(fileName2, onMediaSuccess, onMediaError, onMediaStatus);
  // alert("Got this far!");
  // alert(theMedia);
  //Update the UI with the track name
  // $('#track').html("<b>File:</b>" + );
  // $('#track').html("<b>File:</b> " + fileName);
  //Yes, I know I could easily convert this to minutes and seconds
  // $('#pos').html('Duration: ' + Math.round(theMedia.getDuration()) + ' seconds');
}

function abc1(fileName,titles){
  // alert("fileName:"+fileName+" "+titles);
  $("#audio_title").text(titles);
  theMedia = new Media(fileName, onMediaSuccess, onMediaError, onMediaStatus);
  // doPlay();
}

function onMediaSuccess() {
  // alert("onMediaSuccess");
  window.clearInterval(theTimer);
  theMedia.release();
  theTimer = null;
}

function onMediaError(e) {
  var msgText = "Media error: " + e.message + "(" + e.code + ")";
  // alert(msgText);
  navigator.notification.alert(msgText, null, "Media Error");
}

function onMediaStatus(statusCode) {
  // alert(statusCode);
  // alert("Status: " + statusCode);
  
  if (statusCode == 4) {
    $(".ui-grid-b").html('<div class="ui-block-a"><a data-role="button" data-theme="a" id="play" href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">P L A Y</span></a></div><div class="ui-block-b"><a data-role="button" data-theme="a" id="stop"  href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">S T O P</span></a></div><div class="ui-block-c"><p style="text-align: center;" id="position_time">00:00/00:00</p><div id="track"></div><div id="pos"></div></div>');
  }
}

function doPlay() {
  if(theMedia) {
    // alert("doPlay");
    clearInterval(theMedia);
      theTimer = null;
    //Start the media file playing
    theMedia.play();
    // theMedia.release();
   
    //fire off a timer to update the UI every second as it plays
    theTimer = setInterval(updateUI, 1000);
  } else {
    alert("No media file to play");
    $(".ui-grid-b").html('<div class="ui-block-a"><a data-role="button" data-theme="a" id="play" href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">P L A Y</span></a></div><div class="ui-block-b"><a data-role="button" data-theme="a" id="stop"  href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">S T O P</span></a></div><div class="ui-block-c"><p style="text-align: center;" id="position_time">00:00/00:00</p><div id="track"></div><div id="pos"></div></div>');
  }
}


$(document).ready(function() {
  $(document).on("click","#play",function() {
    // alert("Play");
    $(".ui-grid-b").html('<div class="ui-block-a"><a data-role="button" data-theme="a" id="pauses" href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">P A U S E</span></a></div><div class="ui-block-b"><a data-role="button" data-theme="a" id="stop"  href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">S T O P</span></a></div><div class="ui-block-c"><p style="text-align: center;" id="position_time">00:00/00:00</p><div id="track"></div><div id="pos"></div></div>');
     doPlay();
  });

  $(document).on("click","#pauses",function() {
     $(".ui-grid-b").html('<div class="ui-block-a"><a data-role="button" data-theme="a" id="play" href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">P L A Y</span></a></div><div class="ui-block-b"><a data-role="button" data-theme="a" id="stop"  href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">S T O P</span></a></div><div class="ui-block-c"><p style="text-align: center;" id="position_time">00:00/00:00</p><div id="track"></div><div id="pos"></div></div>');
        doPause();
  });

  $(document).on("click","#stop",function() {
    $(".ui-grid-b").html('<div class="ui-block-a"><a data-role="button" data-theme="a" id="play" href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">P L A Y</span></a></div><div class="ui-block-b"><a data-role="button" data-theme="a" id="stop"  href="#" class="ui-link ui-btn ui-btn-a ui-shadow ui-corner-all"><span class="ui-btn-text">S T O P</span></a></div><div class="ui-block-c"><p style="text-align: center;" id="position_time">00:00/00:00</p><div id="track"></div><div id="pos"></div></div>');
      doStop();      
  });
});
// Set audio volume
        //
  function setVolume(volume) {
      if (theMedia) {
          theMedia.setVolume(volume);
      }
  }

// Pause
function doPause() {
  if(theMedia) {
    // alert("doPause");
    // $('#play .ui-btn-text').text("P L A Y");
    //Pause media play
    theMedia.pause();
    window.clearInterval(theTimer);
  }
}
// Stop playing
function doStop() {
  if(theMedia) {
    // alert("doStop");
    // $('#play .ui-btn-text').text("P L A Y");
    //Kill the timer we have running
    theTimer = null;
    //Then stop playing the audio clip
    theMedia.stop();
    theMedia.release();
    clearInterval(theMedia);
      
  }
}


function updateUI() {
  // alert("updateUI");
  theMedia.getCurrentPosition(onGetPosition, onMediaError);
}
// get play time
function onGetPosition(filePos) {
  // alert("onGetPosition");
  var mdur = theMedia.getDuration();
  var tsecs = Math.round(mdur % 60);
  var tmins = Math.round((mdur-tsecs) / 60);
  var mpos = filePos;
  var psecs = Math.round(mpos % 60);
  var pmins = Math.round((mpos-psecs) / 60);
  document.getElementById('position_time').innerHTML = pmins + ':' + psecs + '/' + tmins + ':' + tsecs + '.';
  $('#audio_position').attr("min", 0);
  $('#audio_position').attr("max", theMedia.getDuration());
  $('#audio_position').val(filePos);
  $('#audio_position').slider('refresh');
  // $('#pos').html('Time: ' + Math.floor(filePos) + ' of ' + theMedia.getDuration() + ' seconds');
}



// ****************************************************************************** //


  