(function() {

  return {
    events: {
      'app.activated':'getInfo',
      'getRecordingURL.done':'this.showInfo',
      'getRecordingURL.fail':'this.showError'
    },

    requests: {
    	getRecordingURL: function() {
    		return {
		      url: '/api/v2/channels/voice/greetings.json',
		      type:'GET',
		      dataType: 'json'
	    	};
	  	}
    },

    getInfo: function() {
    	this.ajax('getRecordingURL');
    },

    showInfo: function(data) {
    	var g = {
    		recordings: []
    	};

    	var isChrome = false;

			//Check to see if current browser is Chrome. If not Chrome, download link will open in a new tab
			if (navigator.vendor === 'Google Inc.') {
				isChrome = true;
			}

    	for (var i = 0; i < data.greetings.length; i++) {
    		var voicemail = false, available = false, wait = false, hold = false, ivr = false;
				var category = data.greetings[i].category_id;
				if (category == 1) {
					voicemail = true;
				} else if (category == 2) {
					available = true;
				} else if (category == 3) {
					wait = true;
				} else if (category == 4) {
					hold = true;
				} else if (category == 5) {
					ivr = true;
				}

    		if (data.greetings[i].audio_url != null) {
    			var temp = {
    				url: data.greetings[i].audio_url,
    				name: data.greetings[i].name,
    				v: voicemail,
    				a: available,
    				w: wait,
    				h: hold,
    				i: ivr,
    				chrome: isChrome
    			}
    			g.recordings.push(temp);
    		}
    	}
    	this.switchTo('display_recordings', g);
    },

    //Switches to 'error' template when the request fails
    showError: function() {
    	this.switchTo('error');
    }

  };

}());
