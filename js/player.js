"use strict";

(() => {

	var currentlyPlaying = null;

	let audioClips = {
		artist_spotlight: "audio/Artist Spotlight.mp3",
		emberassing_story: "audio/Embarassing Story.mp3",
		fitbit: "audio/Fitbit.mp3",
		food_truck: "audio/Food Truck Fridays.mp3",
		live_segment: "audio/Live Segment.mp3",
		music_in_film: "audio/Music In Film.mp3",
		snorkling: "Snorkling Story.mp3",
		starbucks: "audio/Starbucks.mp3",
		travels: "audio/Travels.mp3"
	}

	let ids = Object.keys(audioClips).forEach((key) => {

		$(`#${key}`).click(() => {

			if (currentlyPlaying !== null) {
				currentlyPlaying.stop();
			}

			currentlyPlaying = 	new Howl({
				src: audioClips[key],
				html5: true
			})
			currentlyPlaying.play()
		});

	});

})();
