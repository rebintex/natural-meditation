let app = () => {
    let song = document.querySelector('.song');
    let play = document.querySelector('.play');
    let outline = document.querySelector('.moving-outline circle');
    let video = document.querySelector('.vid-container video');

    //Sounds

    let sounds = document.querySelectorAll('.sound-picker button');
    //Time display
    let timeDisplay = document.querySelector('.time-display');
    let timeSelect = document.querySelectorAll('.time-select button');
    // outline length

    let outlineLength = outline.getTotalLength();
    //Duration 
    let fakeDuration = 30;
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    //Picking different sounds

    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            video.loop = true;
            checkPlaying(song);
        });
    });
    //playing
    play.addEventListener('click', () => {
        checkPlaying(song);
        sounds.classList.add('bgChange'); //my extra addition
    });
    //Select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`;
        });
        
    } );

    // function for a song (stop,pause,play)
    let checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
            sounds.classList.add('bgChange');
            
        }
    }
    // Circle animation 
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

         // Circle animation 2
     let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
     outline.style.strokeDashoffset = progress;
     // animation of the text
     timeDisplay.textContent = `${minutes}:${seconds}`;

     if(currentTime >= fakeDuration) {
         song.pause();
         song.currentTime = 0;
         play.src = './svg/play.svg';
         video.pause();
     }
    }

    
}


app();