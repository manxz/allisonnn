"use strict";

(() => {

	// Currently playing howler
	var currentlyPlaying = null;

	// Dom elements
	let playerTime = $("#playertime");
	let playerTitle = $("#playertitle");
	let playerLabel = $("#playerlabel");
	let artworkThumb = $("#artworkthumb");
	let actionBtn = $("#action-btn");

	function formatTime(totalSeconds) {
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.round(totalSeconds % 60);
		let secondsStr;
		if (seconds < 10) {
			secondsStr = `0${seconds}`;
		} else {
			secondsStr = seconds;
		}
		return `${minutes}:${secondsStr}`
	}

	function renderPlayerTime() {
		if (currentlyPlaying !== null && currentlyPlaying.playing()) {
			let currentTime = formatTime(currentlyPlaying.seek());
			let totalTime = formatTime(currentlyPlaying.duration());
			playerTime.text(`${currentTime} / ${totalTime}`);

			actionBtn.addClass("playing");
			window.requestAnimationFrame(renderPlayerTime);
		} 
		// No longer playing 
		else {
			actionBtn.removeClass("playing");
		}
	}

	// Mapping from button ID to audio clip file
	let audioClips = {
		artist_spotlight: {
			file: "audio/Artist Spotlight.mp3",
			title: "Artist Spotlight",
			label: "Podcast",
			image: "images/spotlight.png"
		},
		story: {
			file: "audio/Story.mp3",
			title: "Embarassing Story",
			label: "Podcast",
			image: "images/story.png"
		},
		fitbit: {
			file: "audio/Fitbit.mp3",
			title: "Fitbit",
			label: "Commercial",
			image: "images/fitbit.png"
		},
		food_truck: {
			file: "audio/Food Truck Fridays.mp3",
			title: "Food Truck Fridays",
			label: "Interview",
			image: "images/foodtruck.png"
		},
		live_segment: {
			file: "audio/Live Segment.mp3",
			title: "Live Segment",
			label: "Collab Podcast",
			image: "images/live.png"
		},
		music_in_film: {
			file: "audio/Music in Film.mp3",
			title: "Music in Film",
			label: "Podcast",
			image: "images/musicfilm.png"
		},
		snorkling: {
			file: "audio/Snorkling Story.mp3",
			title: "Snorkling Story",
			label: "Podcast",
			image: "images/snorkling.png"
		},
		starbucks: {
			file: "audio/Starbucks.mp3",
			title: "Starbucks",
			label: "Commercial",
			image: "images/starbucks.png"
		},
		travels:{
			file: "audio/Travels.mp3",
			title: "Travles",
			label: "Podcast",
			image: "images/travels.png"
		}
	};

	actionBtn.click(() => {
		if(currentlyPlaying !== null) {
			if(currentlyPlaying.playing()) {
				currentlyPlaying.pause();
			} else {
				currentlyPlaying.play();
			}
		}
	});

	// Set all click events on each play button
	Object.keys(audioClips).forEach((key) => {

		let audioInfo = audioClips[key];
		// Click on each play button
		$(`#${key}`).click(() => {

			// Stop playing and unload the current clip if there is one
			if (currentlyPlaying !== null) {
				currentlyPlaying.stop();
				currentlyPlaying.unload();
			}

			// Set new current playing
			currentlyPlaying = 	new Howl({
				src: audioInfo.file,
				onplay: () => {
					window.requestAnimationFrame(renderPlayerTime)
				}
			})
			// Start playing the file
			currentlyPlaying.play()

			// Set title
			playerTitle.text(audioInfo.title);
			playerLabel.text(audioInfo.label);
			artworkThumb.attr("src", audioInfo.image);
		});

	});

})();
