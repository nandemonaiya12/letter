$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
		console.log("Abrindo");
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
		console.log("fechando");
	}
});

document.addEventListener('DOMContentLoaded', (event) => {
    const bgMusic = document.getElementById('bg-music');
    const messageStateCheckbox = document.getElementById('messageState');
    const heart = document.querySelector('.heart'); // Assuming this is the clickable element

    // Attempt to play music automatically on page load (muted)
    bgMusic.play().catch(error => {
        // Autoplay was prevented. This is common if not muted or if strict policies are in place.
        console.log('Autoplay prevented:', error);
    });

    // When the heart is clicked (and the messageStateCheckbox changes)
    messageStateCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // When the message is shown (heart is clicked to open it)
            // Attempt to unmute the music
            if (bgMusic.muted) {
                bgMusic.muted = false;
                // You might want to play again just in case it stopped
                bgMusic.play().catch(error => {
                    console.log('Play on unmute prevented:', error);
                });
            }
        } else {
            // When the message is hidden (heart is clicked to close it)
            // You might choose to mute it again or pause, depending on desired behavior
            // For now, let's keep it playing if it was unmuted
        }
    });

    // Optional: Add an event listener to the heart div directly to ensure interaction
    heart.addEventListener('click', function() {
        // This click can also be used to ensure playback if autoplay failed initially
        if (bgMusic.paused && !messageStateCheckbox.checked) { // Only try to play if paused and not yet revealed
             bgMusic.play().catch(error => {
                console.log('Play on heart click prevented:', error);
            });
        }
    });

    // If you want to force unmute on the first interaction with the heart, regardless of initial autoplay
    heart.addEventListener('click', function() {
        if (bgMusic.muted) {
            bgMusic.muted = false;
        }
        if (bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log('Play on heart click after unmuting prevented:', error);
            });
        }
    });
});