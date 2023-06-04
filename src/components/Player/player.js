import './player.css';
import React, { useState, useEffect, useContext } from 'react';
import likeInactive from '../../svg/like-order.svg'
import likeActive from '../../svg/liked.svg'
import previous from '../../svg/previous.svg'
import play from '../../svg/play-player.svg'
import pause from '../../svg/pause-player.svg'
import next from '../../svg/next.svg'
import repeat from '../../svg/repeat.svg'
import repeatActive from '../../svg/repeat-active.svg'
import repeatOne from '../../svg/repeat-active-one.svg'
import shuffle from '../../svg/shuffle.svg'
import shuffleActive from '../../svg/shuffle-active.svg'
import share from '../../svg/share.svg'
import MusicCard from '../Music-Card/music-card';
import order from '../../svg/order.svg'
import speaker from '../../svg/speaker.svg'
import speakerOff from '../../svg/speaker-off.svg'
import MusicTime from '../Music-Time/music-time'
import { MusicDataContext } from '../../contexts/MusicDataContext';

const Player = ({ title, author, imagePath, musicPath, isPlayerActive, isPaused, ID, cardIndex, toggle, handleOrderClick, isOrderTrue, handlePreviousCardClick, handleNextCardClick, isOrderActive }) => {
  const musicData = useContext(MusicDataContext)[ID];

  const [trackData, setTrackData] = useState({
    titleCurrent: title,
    authorCurrent: author,
    imagePathCurrent: imagePath,
    musicPathCurrent: musicPath,
    cardIndexCurrent: 0,
  });

  const [isEnded, setIsEnded] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  const [cardIndexBuff, setCardIndexBuff] = useState(cardIndex);
  const [idBuff, setIdBuff] = useState(ID);

  const [usedIndexes, setUsedIndexes] = useState([]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [nextClicked, setnextClicked] = useState(false);

  const [trackPosition, setTrackPosition] = useState({
    indexPosition: null,
    idPosition: null,
  });

  const [isOrderClicked, setIsOrderClicked] = useState(true);

  const playIcon = isPlaying ? pause : play;
  const shuffleIcon = isShuffle ? shuffleActive : shuffle;
  const likeIcon = isLiked ? likeActive : likeInactive;

  const [volume, setVolume] = useState(50);

  const playerClassName = `player ${isPlayerActive ? 'player-is-active' : ''}`;

  const [repeatModeImage, setRepeatModeImage] = useState(repeat);

  const handleRepeatModeClick = () => {
    if (repeatModeImage === repeat) {
      setRepeatModeImage(repeatActive);
    } else if (repeatModeImage === repeatActive) {
      setRepeatModeImage(repeatOne);
    } else {
      setRepeatModeImage(repeat);
    }
  };

  const doPlay = () => {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.play();
    setIsPlaying(true);
  }

  const doPause = () => {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.pause();
    setIsPlaying(false);
  }


  const toNextTrack = () => {
    const audioPlayer = document.getElementById('audio-player');
    const nextCardIndex = trackData.cardIndexCurrent + 1;
    const nextMusic = musicData[nextCardIndex];

    setTrackData({
      titleCurrent: nextMusic.title,
      authorCurrent: nextMusic.author,
      imagePathCurrent: nextMusic.imagePath,
      musicPathCurrent: nextMusic.musicPath,
      cardIndexCurrent: nextCardIndex,
    });

    if (audioPlayer.src != nextMusic.musicPath) {
      audioPlayer.src = nextMusic.musicPath;
    }

    doPlay();

    setTrackPosition({
      indexPosition: nextCardIndex,
      idPosition: ID,
    });

    handleNextCardClick(nextCardIndex, ID);
    setnextClicked(true);
    setCardIndexBuff(null);
  }

  useEffect(() => {
    if (isEnded === true) {

      if (!isPlayerActive) {
        return;
      }

      if (repeatModeImage === repeatOne) {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = musicData[trackData.cardIndexCurrent].musicPath;
        doPlay();
        setIsEnded(false);
        return;
      }

      if (trackData.cardIndexCurrent < musicData.length - 1) {
        toNextTrack();
      } else {
        const audioPlayer = document.getElementById('audio-player');
        if (repeatModeImage === repeat) {
          doPause();
        } else {
          const localCardIndex = 0;
          const localMusic = musicData[localCardIndex];

          setTrackData({
            titleCurrent: localMusic.title,
            authorCurrent: localMusic.author,
            imagePathCurrent: localMusic.imagePath,
            musicPathCurrent: localMusic.musicPath,
            cardIndexCurrent: localCardIndex,
          });

          audioPlayer.src = localMusic.musicPath;
          doPlay();

          setTrackPosition({
            indexPosition: localCardIndex,
            idPosition: ID,
          });

          handleNextCardClick(localCardIndex, ID);
          setnextClicked(true);
          setCardIndexBuff(null);
        }
      }
      setIsEnded(false);
    }
  }, [isEnded]);

  const handleOrderBtnClicked = () => {
    handleOrderClick(isOrderClicked);
    setIsOrderClicked(!isOrderClicked);
  }

  const handlePlayPause = () => {
    const audioPlayer = document.getElementById('audio-player');
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (trackData.musicPathCurrent !== null) {
      const audioPlayer = document.getElementById('audio-player');
      setCurrentTime(audioPlayer.currentTime);

      if (Math.abs(audioPlayer.currentTime - audioPlayer.duration) <= 0.1) {
        setIsEnded(true);
      }
    }
  };

  const handleDurationChange = () => {
    const audioPlayer = document.getElementById('audio-player');
    setDuration(audioPlayer.duration);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  }

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  }

  const handleNextClick = () => {
    setIsEnded(false);
    if (!isPlayerActive) {
      return;
    }

    const audioPlayer = document.getElementById('audio-player');
    doPlay();
    audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
    audioPlayer.addEventListener('loadedmetadata', handleDurationChange);
    if (isShuffle) {
      const availableIndexes = musicData.reduce((indexes, _, index) => {
        if (!usedIndexes.includes(index)) {
          indexes.push(index);
        }
        return indexes;
      }, []);

      if (availableIndexes.length > 0) {
        const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        const nextMusic = musicData[randomIndex];

        setTrackData({
          titleCurrent: nextMusic.title,
          authorCurrent: nextMusic.author,
          imagePathCurrent: nextMusic.imagePath,
          musicPathCurrent: nextMusic.musicPath,
          cardIndexCurrent: randomIndex,
        });
        if (audioPlayer.src != nextMusic.musicPath) {
          audioPlayer.src = nextMusic.musicPath;
        }
        doPlay();

        setUsedIndexes([...usedIndexes, randomIndex]);

        setTrackPosition({
          indexPosition: randomIndex,
          idPosition: ID,
        });

        handleNextCardClick(randomIndex, ID);
        setnextClicked(true);
        setCardIndexBuff(null);
      }
    } else {
      if (trackData.cardIndexCurrent < musicData.length - 1) {
        toNextTrack();
      }
    }
  };

  const handlePreviousClick = () => {
    setIsEnded(false);
    if (trackData.cardIndexCurrent > 0) {

      const newMusicPath = musicData[trackData.cardIndexCurrent - 1].musicPath;

      setTrackData({
        titleCurrent: musicData[trackData.cardIndexCurrent - 1].title,
        authorCurrent: musicData[trackData.cardIndexCurrent - 1].author,
        imagePathCurrent: musicData[trackData.cardIndexCurrent - 1].imagePath,
        musicPathCurrent: newMusicPath,
        cardIndexCurrent: trackData.cardIndexCurrent - 1
      });

      if (isPlayerActive) {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = newMusicPath;
        doPlay();
        audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
        audioPlayer.addEventListener('loadedmetadata', handleDurationChange);
      }

      setTrackPosition({
        indexPosition: trackData.cardIndexCurrent - 1,
        idPosition: ID,
      });
      handlePreviousCardClick(trackData.cardIndexCurrent - 1, ID);
      setnextClicked(true);
      setCardIndexBuff(null);
    }
  };

  const handleTimeSliderChange = (event) => {
    const audioPlayer = document.getElementById('audio-player');
    const time = parseFloat(event.target.value);
    setCurrentTime(time);
    audioPlayer.currentTime = time;
  };

  const handleVolumeSliderChange = (event) => {
    const audioPlayer = document.getElementById('audio-player');
    const volumeLevel = parseFloat(event.target.value);
    setVolume(volumeLevel);
    audioPlayer.volume = volumeLevel / 100;
  };

  useEffect(() => {
    setTrackData({
      titleCurrent: title,
      authorCurrent: author,
      imagePathCurrent: imagePath,
      musicPathCurrent: musicPath,
      cardIndexCurrent: cardIndex,
    });
  }, [isPlayerActive]);
  useEffect(() => {
    setIsEnded(false);
    setTrackData({
      titleCurrent: title,
      authorCurrent: author,
      imagePathCurrent: imagePath,
      musicPathCurrent: musicPath,
      cardIndexCurrent: cardIndex,
    });
    setnextClicked(false);
    setUsedIndexes([]);
    setUsedIndexes(prevIndexes => [...prevIndexes, cardIndex]);
    if (isPlayerActive) {
      if (cardIndexBuff != cardIndex || idBuff != ID) {
        if (cardIndexBuff === null && nextClicked === true && trackPosition.indexPosition === cardIndex && trackPosition.idPosition === ID) {
          handlePlayPause();
          setCardIndexBuff(cardIndex);
          setIdBuff(ID);
          return;
        }
        const audioPlayer = document.getElementById('audio-player');
        if (musicPath !== audioPlayer.src) {
          audioPlayer.src = musicPath;
          audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
          audioPlayer.addEventListener('loadedmetadata', handleDurationChange);
        }
        doPlay();
      } else {
        handlePlayPause();
      }

    }
    setCardIndexBuff(cardIndex);
    setIdBuff(ID);
  }, [isPaused, toggle, ID, isOrderTrue]);

  return (
    <div className={playerClassName}>

      <MusicCard title={trackData.titleCurrent} author={trackData.authorCurrent} imagePath={trackData.imagePathCurrent} musicPath={trackData.musicPathCurrent} small={true} showOverlay={false}>
        <img className='like-icon like-btn' onClick={handleLike} src={likeIcon} alt="Like" />
      </MusicCard>

      <div className={'primary-control'}>

        <MusicTime time={`${formatTime(currentTime)} / ${formatTime(duration)}`}></MusicTime>

        <img className='previousbtn' src={previous} onClick={handlePreviousClick} alt="Previous" />
        <img className='play-music' src={playIcon} alt="Play" onClick={handlePlayPause} />
        <img className='nextbtn' onClick={handleNextClick} src={next} alt="Next" />

        <div className='secondary-control'>

          <img className='repeat-btn' src={repeatModeImage} alt='Repeat' onClick={handleRepeatModeClick} />
          <img className='shuffle-btn' onClick={handleShuffle} src={shuffleIcon} alt="Shuffle" />
          <img className='share-btn' src={share} alt="Share" />

        </div>
      </div>

      <audio id='audio-player' src={musicPath}></audio>

      <div className='voice-control'>

        <img className='order-btn' onClick={handleOrderBtnClicked} src={order} alt="Order" />
        <img className='speaker-ico' src={speaker} alt="Speaker" />

        <input type='range' min={0} max={100} value={volume} className='volume-slider' onChange={handleVolumeSliderChange}></input>

      </div>
      <input
        type='range'
        min={0}
        max={duration}
        value={currentTime}
        className='time-slider'
        onChange={handleTimeSliderChange}
      ></input>
    </div>
  );
};

export default Player;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}