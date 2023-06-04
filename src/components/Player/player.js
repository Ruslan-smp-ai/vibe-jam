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

  const [titleCurrent, setTitleCurrent] = useState(title);
  const [authorCurrent, setAuthorCurrent] = useState(author);
  const [imagePathCurrent, setImagePathCurrent] = useState(imagePath);
  const [musicPathCurrent, setMusicPathCurrent] = useState(musicPath);
  const [cardIndexCurrent, setCardIndexCurrent] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [testElem, setTestElem] = useState(cardIndex);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  const [cardIndexBuff, setCardIndexBuff] = useState(cardIndex);
  const [idBuff, setIdBuff] = useState(ID);

  const [usedIndexes, setUsedIndexes] = useState([]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [nextClicked, setnextClicked] = useState(false);
  const [whereClicked, setWhereClicked] = useState(null);
  const [whereClickedID, setWhereClickedID] = useState(null);

  const [isOrderClicked, setIsOrderClicked] = useState(true);

  const playIcon = isPlaying ? pause : play;
  const shuffleIcon = isShuffle ? shuffleActive : shuffle;
  const likeIcon = isLiked ? likeActive : likeInactive;

  const [volume, setVolume] = useState(20);

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

  useEffect(() => {
    setTestElem(cardIndex);
  }, [cardIndex]);

  useEffect(() => {
    if (isEnded === true) {

      if (!isPlayerActive) {
        return;
      }

      if (repeatModeImage === repeatOne) {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = musicData[cardIndexCurrent].musicPath;
        audioPlayer.play();
        setIsPlaying(true);
        setIsEnded(false);
        return;
      }

      if (cardIndexCurrent < musicData.length - 1) {
        const audioPlayer = document.getElementById('audio-player');
        const nextCardIndex = cardIndexCurrent + 1;
        const nextMusic = musicData[nextCardIndex];

        setTitleCurrent(nextMusic.title);
        setAuthorCurrent(nextMusic.author);
        setImagePathCurrent(nextMusic.imagePath);
        setMusicPathCurrent(nextMusic.musicPath);
        setCardIndexCurrent(nextCardIndex);

        audioPlayer.src = nextMusic.musicPath;
        audioPlayer.play();
        setIsPlaying(true);

        setWhereClickedID(ID);
        setWhereClicked(nextCardIndex);
        handleNextCardClick(nextCardIndex, ID);
        setnextClicked(true);
        setCardIndexBuff(null);
        console.log(cardIndex);
      } else {
        const audioPlayer = document.getElementById('audio-player');
        if (repeatModeImage === repeat) {
          audioPlayer.pause();
          setIsPlaying(false);
        } else {
          const localCardIndex = 0;
          const localMusic = musicData[localCardIndex];
          setTitleCurrent(localMusic.title);
          setAuthorCurrent(localMusic.author);
          setImagePathCurrent(localMusic.imagePath);
          setMusicPathCurrent(localMusic.musicPath);
          setCardIndexCurrent(localCardIndex);

          audioPlayer.src = localMusic.musicPath;
          audioPlayer.play();
          setIsPlaying(true);

          setWhereClickedID(ID);
          setWhereClicked(localCardIndex);
          handleNextCardClick(localCardIndex, ID);
          setnextClicked(true);
          setCardIndexBuff(null);
          console.log(cardIndex);
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
    if (musicPathCurrent !== null) {
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
    audioPlayer.play();
    setIsPlaying(true);
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

        setTitleCurrent(nextMusic.title);
        setAuthorCurrent(nextMusic.author);
        setImagePathCurrent(nextMusic.imagePath);
        setMusicPathCurrent(nextMusic.musicPath);
        setCardIndexCurrent(randomIndex);

        audioPlayer.src = nextMusic.musicPath;
        audioPlayer.play();
        setIsPlaying(true);

        setUsedIndexes([...usedIndexes, randomIndex]);
        setWhereClickedID(ID);
        setWhereClicked(randomIndex);
        handleNextCardClick(randomIndex, ID);
        setnextClicked(true);
        setCardIndexBuff(null);
      }
    } else {
      if (cardIndexCurrent < musicData.length - 1) {
        const nextCardIndex = cardIndexCurrent + 1;
        const nextMusic = musicData[nextCardIndex];

        setTitleCurrent(nextMusic.title);
        setAuthorCurrent(nextMusic.author);
        setImagePathCurrent(nextMusic.imagePath);
        setMusicPathCurrent(nextMusic.musicPath);
        setCardIndexCurrent(nextCardIndex);

        audioPlayer.src = nextMusic.musicPath;
        audioPlayer.play();
        setIsPlaying(true);

        setWhereClickedID(ID);
        setWhereClicked(nextCardIndex);
        handleNextCardClick(nextCardIndex, ID);
        setnextClicked(true);
        setCardIndexBuff(null);
        console.log(cardIndex);
      }
    }
  };

  const handlePreviousClick = () => {
    setIsEnded(false);
    if (cardIndexCurrent > 0) {
      setTitleCurrent(musicData[cardIndexCurrent - 1].title);
      setAuthorCurrent(musicData[cardIndexCurrent - 1].author);
      setImagePathCurrent(musicData[cardIndexCurrent - 1].imagePath);
      const newMusicPath = musicData[cardIndexCurrent - 1].musicPath;
      setMusicPathCurrent(newMusicPath);
      setCardIndexCurrent(cardIndexCurrent - 1);

      if (isPlayerActive) {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = newMusicPath;
        audioPlayer.play();
        setIsPlaying(true);
        audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
        audioPlayer.addEventListener('loadedmetadata', handleDurationChange);
      }
      setWhereClickedID(ID);
      setWhereClicked(cardIndexCurrent - 1);
      handlePreviousCardClick(cardIndexCurrent - 1, ID);
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

  }, [musicPath, isPlayerActive, isOrderTrue, isOrderClicked]);

  useEffect(() => {
    setTitleCurrent(title);
    setAuthorCurrent(author);
    setImagePathCurrent(imagePath);
    setCardIndexCurrent(cardIndex);
    setMusicPathCurrent(musicPath);
    setTestElem(cardIndex);
  }, [isPlayerActive]);

  useEffect(() => {
    setIsEnded(false);
    setAuthorCurrent(author);
    setImagePathCurrent(imagePath);
    setCardIndexCurrent(cardIndex);
    setMusicPathCurrent(musicPath);
    setTitleCurrent(title);
    setnextClicked(false);
    setUsedIndexes([]);
    setUsedIndexes(prevIndexes => [...prevIndexes, cardIndex]);
    if (isPlayerActive) {
      if (cardIndexBuff != cardIndex || idBuff != ID) {
        if (cardIndexBuff === null && nextClicked === true && whereClicked === cardIndex && whereClickedID === ID) {
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
        audioPlayer.play();
        setIsPlaying(true);
      } else {
        handlePlayPause();
      }

    }
    setCardIndexBuff(cardIndex);
    setIdBuff(ID);
  }, [isPaused, toggle, ID, isOrderTrue]);

  return (
    <div className={playerClassName}>

      <MusicCard title={titleCurrent} author={authorCurrent} imagePath={imagePathCurrent} musicPath={musicPathCurrent} small={true} showOverlay={false}>
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