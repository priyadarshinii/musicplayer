class Player {

    songs = ['hey', 'summer', 'ukulele'];

    constructor(options) {

        Object.assign(this, options);

        this.playBtn.addEventListener('click', () => {

            const isPlaying = this.musicContainer.classList.contains('play');
        
            if(isPlaying) {
                this.pauseSong();
            } else {
                this.playSong();
            }
        
        });

        this.prevBtn.addEventListener('click', this.prevSong.bind(this));
        this.nextBtn.addEventListener('click', this.nextSong.bind(this));

        this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
        this.audio.addEventListener('ended', this.nextSong.bind(this));

        this.progressContainer.addEventListener('click', this.setProgress.bind(this));

    }

    loadSong (songIndex = this.songIndex) {

        const song = this.songs[songIndex];

        this.title.innerText = song;
        this.audio.src = `music/${song}.mp3`;
        this.cover.src = `images/${song}.jpg`;
    }

    playSong () {

        this.musicContainer.classList.add('play');
        this.playBtn.querySelector('i.fas').classList.remove('fa-play');
        this.playBtn.querySelector('i.fas').classList.add('fa-pause');

        this.audio.play();

    }

    pauseSong () {

        this.musicContainer.classList.remove('play');
        this.playBtn.querySelector('i.fas').classList.remove('fa.pause');
        this.playBtn.querySelector('i.fas').classList.add('fa-play');

        this.audio.pause();
    }

    prevSong () {

        this.songIndex--;
        if(this.songIndex < 0) { 
            this.songIndex = this.songs.length - 1;
        }

        this.loadSong(this.songIndex);
        this.playSong();
    }

    nextSong ()  {

        this.songIndex++;
        if(this.songIndex >= this.songs.length) { 
            this.songIndex = 0;
        }

        this.loadSong(this.songIndex);
        this.playSong();
    }

    updateProgress (event) {

        const { duration, currentTime } = event.srcElement;
        const progress = ( currentTime / duration ) * 100;

        this.progressBar.style.width = `${progress}%`;

    }

    setProgress (event) {

        const width = event.srcElement.clientWidth;
        const clickX = event.offsetX;
        const duration = this.audio.duration;

        this.audio.currentTime = ( clickX / width ) * duration;

    }
    
}