var myMedia = null;
var mediaUri = null;
var mediaTimer = null;
var actionByUser = false; // stopped by user or end of song
var mediaState = 0;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
        alert('deviceready');
    
    }

        for (var i=0;i<album.length;i++) {
            $("#lists").append("<li><a onclick=updatePlayAudio('"+ album[i].asset +"') href=#>"+"<h2>" + album[i].title + "</h2>"+"<p>" + album[i].singer + "</p>"+"<p class=ui-li-aside>" + album[i].time + "</p></a></li>");
        }
    
    function updateMedia (songUrl) {
        alert("updateMedia");
    	if(myMedia != null) {
            alert("songUrl:"+songUrl);
    		myMedia.release();
    	}
       	document.getElementById('audio_title').innerHTML = getTitleByUri(songUrl);
       	mediaUri = songUrl;
        alert("mediaUri:"+mediaUri);
    	myMedia = new Media(songUrl,onsuccess,onfail,mstatus);
    }

    function onsuccess(){

        alert("success");
    }

    function onfail(err){
        alert("Error:"+err.message+" "+err.code);
    }

    function mstatus(status)
    {
            alert("status: "+status);
            mediaState = status;
            if(status == Media.MEDIA_NONE) {
                alert("MEDIA_NONE");
            } else if(status == Media.MEDIA_STARTING) {
                alert("MEDIA_STARTING");
//                          document.getElementById('audio_position').innerHTML = 'loading';
//                          document.getElementById('play').innerHTML = "P A U S E";
                $('#play .ui-btn-text').text("P A U S E");
            } else if(status == Media.MEDIA_RUNNING) {
                alert("MEDIA_RUNNING");
//                          document.getElementById('play').innerHTML = "P A U S E";
                $('#play .ui-btn-text').text("P A U S E");
            } else if(status == Media.MEDIA_PAUSED) {
                alert("MEDIA_PAUSED");
//                          document.getElementById('play').innerHTML = "P L A Y";
                $('#play .ui-btn-text').text("P L A Y");
            } else if(status == Media.MEDIA_STOPPED) {
                alert("MEDIA_STOPPED");
//                          document.getElementById('audio_position').innerHTML = '<3';
//                          document.getElementById('play').innerHTML = "P L A Y";
                if(actionByUser == true) {
                    $('#play .ui-btn-text').text("P L A Y");
                }
                else {
                    alert("MEDIA_STOPPED_FALSE_ACTIONBYUSER");
                    if(isLastSongByUri(mediaUri)) {
                        $('#play .ui-btn-text').text("P L A Y");
                    }
                    else {
                        updateMedia(getNextSongByUri(mediaUri));
                        playAudio();
                    }
                }
            } else {
                alert("MEDIA_UNKNOWN");
            }
        
    }
    function updatePlayAudio(songUrl) {
    	alert("updatePlayAudio:"+songUrl);
        actionByUser = true;
    	updateMedia(songUrl);
    	playAudio();
    }

    function playAudio() {
        alert(1);
    	actionByUser = false;
    	if(myMedia == null) { 
            alert("Check:"+album[0].asset);// init without selecting song
    		this.updateMedia(album[0].asset);
    	}
        alert("mediaState hau :"+mediaState);
    	if(mediaState != Media.MEDIA_STARTING && mediaState != Media.MEDIA_RUNNING) {
            alert("mediaState1111 :"+mediaState);
            alert("mediaUri :"+mediaUri);
    		myMedia.play();
    		getIndexByUri(mediaUri);
    		// Update myMedia position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(updateUI,1000);
    	} else {
    		myMedia.pause();
    	}
    }


    function updateUI(){
         alert("get myMedia position");
        myMedia. getCurrentPosition(onGetPosition, onfail);
                    
    }

    function onGetPosition(position){
        alert("onGetPosition");
        if (mediaState == 2 && position > -1) {
            var mdur = myMedia.getDuration();
            var tsecs = Math.round(mdur % 60);
            var tmins = Math.round((mdur-tsecs) / 60);
            var mpos = position;
            var psecs = Math.round(mpos % 60);
            var pmins = Math.round((mpos-psecs) / 60);
            document.getElementById('position_time').innerHTML = pmins + ':' + psecs + '/' + tmins + ':' + tsecs + '.';
            $('#audio_position').attr("min", 0);
            $('#audio_position').attr("max", myMedia.getDuration());
            $('#audio_position').val(position);
            $('#audio_position').slider('refresh');
        }
    }

    function stopAudio() {
    	actionByUser = true;
    	$('#audio_position').attr("min", 0);
    	$('#audio_position').attr("max", myMedia.getDuration());
    	$('#audio_position').val(0);
    	$('#audio_position').slider('refresh');
    	myMedia.stop();
    	clearInterval(mediaTimer);
    	mediaTimer = null;
    }
    function getTitleByUri(uri) {
        alert("getTitleByUri")
    	var retval = '<3';
    	for (var i=0;i<album.length;i++) {
    		if(album[i].asset == uri) {
    			retval = album[i].title;
    			alert(i+"| getTitleByUri |"+album[i].title);
    			break;
    		}
    	}
    	return retval;
    }
    function getIndexByUri(uri) {
    	var retval = -1;
    	for (var i=0;i<album.length;i++) {
    		if(album[i].asset == uri) {
    			retval = i;
    			alert(i +"| getIndexByUri |"+album[i].title);
    			break;
    		}
    	}
    	return retval;
    }
    function isLastSongByUri(uri) {
    	var retval = false; // init/default
    	if(album[album.length-1].asset == uri) {
    		retval = true;
    	}
    	return retval;
    }
    function getNextSongByUri(uri) {
    	var retval = uri;
    	for (var i=0;i<album.length-1;i++) {
    		if(album[i].asset == uri) {
    			retval = album[i+1].asset;
    			alert(i+"|getNextSongByUri|"+album[i].title);
    			break;
    		}
    	}
    	return retval;
    }
    // Update DOM on a Received Event
    function receivedEvent(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        alert('Received Event: ' + id);
    }

