const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const sideTitle = document.getElementById("sideTitle");
const sideArtist = document.getElementById("sideArtist");

const playlist = document.getElementById("playlist");
const albumCover = document.getElementById("albumCover");


// ======================================
// YOUR 5 SONGS
// ======================================

const songs = [

    {
        title: "Yesu Nagula Kaata Meedha",
        artist: "The Paradise",
        src: "paradise-song.mp3"
    },

    {
        title: " Irumudi kaattu Song",
        artist: "Artist 2",
        src: "irumudi kattu song.mp3"
    },

    {
        title: "Mallepolla pallaki Song",
        artist: "Artist 3",
        src: "mallepoola pallaki song.mp3"
    },

    {
        title: "Yaalo yaalo",
        artist: "Artist 4",
        src: "yaalo yaalo.mp3"
    },

    {
        title: "boom boom songs",
        artist: "Artist 5",
        src: "boom boom .mp3"
    },
    
    {
        title: "Bagundu po songs",
        artist: "Artist 5",
        src: "bagundu po.mp3"
    }

];


let currentSong = 0;


// ======================================
// LOAD SONG
// ======================================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.src;

    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    sideTitle.textContent = song.title;
    sideArtist.textContent = song.artist;

    progress.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    displayPlaylist();

}


// ======================================
// PLAY
// ======================================

function playSong() {

    audio.play()
        .then(() => {

            playBtn.textContent = "⏸";

            albumCover.classList.add("playing");

        })
        .catch(() => {

            alert(
                "Song could not be played. " +
                "Make sure the audio file is in the same folder as index.html."
            );

        });

}


// ======================================
// PAUSE
// ======================================

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

    albumCover.classList.remove("playing");

}


// ======================================
// PLAY / PAUSE BUTTON
// ======================================

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ======================================
// NEXT SONG
// ======================================

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// PREVIOUS SONG
// ======================================

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// SONG DURATION
// ======================================

audio.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(audio.duration);

    progress.max = audio.duration;

});


// ======================================
// UPDATE PROGRESS
// ======================================

audio.addEventListener("timeupdate", () => {

    progress.value = audio.currentTime;

    currentTime.textContent =
        formatTime(audio.currentTime);

});


// ======================================
// SEEK SONG
// ======================================

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});


// ======================================
// VOLUME
// ======================================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// ======================================
// SONG FINISHED
// ======================================

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// FORMAT TIME
// ======================================

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return minutes + ":" +
        seconds.toString().padStart(2, "0");

}


// ======================================
// DISPLAY PLAYLIST
// ======================================

function displayPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const item =
            document.createElement("div");

        item.classList.add("song-item");

        if (index === currentSong) {

            item.classList.add("active");

        }


        item.innerHTML = `

            <div class="song-number">
                ${index + 1}
            </div>

            <div class="song-icon">
                🎵
            </div>

            <div class="song-info">

                <h3>
                    ${song.title}
                </h3>

                <p>
                    ${song.artist}
                </p>

            </div>

            ${
                index === currentSong
                ? '<div class="playing-dot">● PLAYING</div>'
                : ''
            }

        `;


        item.addEventListener("click", () => {

            loadSong(index);

            playSong();

        });


        playlist.appendChild(item);

    });

}


// ======================================
// START PLAYER
// ======================================

audio.volume = 0.8;

loadSong(0);