"use strict";

(() => {

	// update this const with the url of the server hosting the audio
	const FILE_PATH = 'http://localhost:8080/';

	let currentlyPlaying = null;

	// JQ Dom elements
	const playerTime = $("#playertime");
	const playerTitle = $("#playertitle");
	const playerLabel = $("#playerlabel");
	const artworkThumb = $("#artworkthumb");
	const actionBtn = $("#action-btn");

	function formatTime(totalSeconds) {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.round(totalSeconds % 60);

		if (seconds < 10) {
			const secondsStr = `0${seconds}`;
			return `${minutes}:${secondsStr}`
		}

		return `${minutes}:${seconds}`
	}

	function renderPlayerTime() {
		if (currentlyPlaying !== null && currentlyPlaying.playing()) {
			const currentTime = formatTime(currentlyPlaying.seek());
			const totalTime = formatTime(currentlyPlaying.duration());

			playerTime.text(`${currentTime} / ${totalTime}`);
			actionBtn.addClass("playing");
			window.requestAnimationFrame(renderPlayerTime);
		} else {
			actionBtn.removeClass("playing");
		}
	}

	// Mapping from button ID to audio clip file
	const audioClips = {
		artist_spotlight: {
			file: `${FILE_PATH}audio/artist_spotlight.mp3`,
			title: "Artist Spotlight",
			label: "Podcast",
			image: "images/spotlight.png"
		},
		story: {
			file: `${FILE_PATH}audio/Story.mp3`,
			title: "Embarassing Story",
			label: "Podcast",
			image: "images/story.png"
		},
		fitbit: {
			file: `${FILE_PATH}audio/fitbit.mp3`,
			title: "Fitbit",
			label: "Commercial",
			image: "images/fitbit.png"
		},
		food_truck: {
			file: `${FILE_PATH}audio/food_truck_fridays.mp3`,
			title: "Food Truck Fridays",
			label: "Interview",
			image: "images/foodtruck.png"
		},
		live_segment: {
			file: `${FILE_PATH}audio/live_segment.mp3`,
			title: "Live Segment",
			label: "Collab Podcast",
			image: "images/live.png"
		},
		music_in_film: {
			file: `${FILE_PATH}audio/music_in_film.mp3`,
			title: "Music in Film",
			label: "Podcast",
			image: "images/musicfilm.png"
		},
		snorkling: {
			file: `${FILE_PATH}audio/snorkling_story.mp3`,
			title: "Snorkling Story",
			label: "Podcast",
			image: "images/snorkling.png"
		},
		starbucks: {
			file: `${FILE_PATH}audio/starbucks.mp3`,
			title: "Starbucks",
			label: "Commercial",
			image: "images/starbucks.png"
		},
		travels:{
			file: `${FILE_PATH}audio/travels.mp3`,
			title: "Travels",
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
		const audioInfo = audioClips[key];

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
