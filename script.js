const playpausebtn = document.getElementById('play-pause-btn');
const playbtn = document.getElementById('play-icon');
const pausebtn = document.getElementById('pause-icon');

const prevbtn = document.getElementById('prev-btn');
const nextbtn = document.getElementById('next-btn');
const shufflebtn = document.getElementById('shuffle-btn');
const repeatbtn = document.getElementById('repeat-btn');

const trackTitle = document.getElementById('track-title')
const trackArtist = document.getElementById('track-artist');

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const tracks = [
    { title: "Heeriye", artist: "Artist 1", src: "songs\_Heeriye_320(PagalWorld.com.sb).mp3" },
    { title: "Sajni Re", artist: "Artist 2", src: "songs\O Sajni Re_320(PagalWorld.com.sb).mp3" }
]

const audio = new Audio(tracks[currentTrackIndex].src); //extracting the audio

const loadTrack = (index) => {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
    trackArtist.textContent = tracks[index].artist;
}

const playTrack = () => {
    audio.play();
    isPlaying = true;
    playbtn.style.display = 'none';
    pausebtn.style.display = 'inline';

}

const pauseTrack = () => {
    audio.pause();
    isPlaying = false;
    playbtn.style.display = 'inline';
    pausebtn.style.display = 'none';
}

playpausebtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
})

prevbtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
})

nextbtn.addEventListener('click', () => {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    loadTrack(currentTrackIndex);
    playTrack();
})

shufflebtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    repeatbtn.classList.toggle('active');
})

repeatbtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatbtn.classList.toggle('active');
})

audio.addEventListener('ended', () => {
    if (isRepeat) {
        playTrack();
    } else {
        nextBtn.click();
    }
});

tracks.forEach((track, index) => {
    const song = document.createElement('song');
    song.textContent = track.title;
    song.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        playTrack();
    });
    playlist.appendChild(song);
})

loadTrack(currentTrackIndex);