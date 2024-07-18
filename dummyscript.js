const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playlist = document.getElementById('playlist');

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const tracks = [
    { title: "Track 1", artist: "Artist 1", src: "music/track1.mp3" },
    { title: "Track 2", artist: "Artist 2", src: "music/track2.mp3" },
    { title: "Track 3", artist: "Artist 3", src: "music/track3.mp3" }
];

const audio = new Audio(tracks[currentTrackIndex].src);

const loadTrack = (index) => {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
    trackArtist.textContent = tracks[index].artist;
};

const playTrack = () => {
    audio.play();
    isPlaying = true;
    playIcon.style.display = 'none';   // Hide the play icon
    pauseIcon.style.display = 'inline'; // Show the pause icon
};

const pauseTrack = () => {
    audio.pause();
    isPlaying = false;
    playIcon.style.display = 'inline'; // Show the play icon
    pauseIcon.style.display = 'none';  // Hide the pause icon
};

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

nextBtn.addEventListener('click', () => {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    loadTrack(currentTrackIndex);
    playTrack();
});

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
});

audio.addEventListener('ended', () => {
    if (isRepeat) {
        playTrack();
    } else {
        nextBtn.click();
    }
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value / 100;
});

tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.title;
    li.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        playTrack();
    });
    playlist.appendChild(li);
});

loadTrack(currentTrackIndex);
