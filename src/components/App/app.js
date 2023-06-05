import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '../Container/container';
import Order from '../Order/order'
import Menu from '../Menu/menu';
import Content from '../Content/content';
import { BrowserRouter } from 'react-router-dom';
import Player from '../Player/player';
import Head from '../Head/head';
import MoreBtn from '../More-Btn/more-btn';
import Icons from '../Icons/icons';
import MusicCardContainer from '../Music-Card-Container/music-card-container';
import { MusicDataProvider } from '../../contexts/MusicDataContext';
import Search from '../Search-Container/search-container';
import './app.css';
function App() {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isPlaying, setIsPlay] = useState(false);
  const [playerData, setPlayerData] = useState({
    title: '',
    author: '',
    imagePath: '',
    musicPath: '',
    isPaused: false,
    toggle: false,
  });
  const [activeCard, setActiveCard] = useState({
    cardIndex: null,
    containerIndex: "recentlyListened",
  });

  const [isPlayerActive, setIsPlayerActive] = useState(false);

  const [isOrderActive, setIsOrderActive] = useState(false);

  const [isOrderTrue, setIsOrderTrue] = useState(false);

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  const handleClick = (iconId) => {
    setActiveIcon(iconId);
    if (iconId === 2) {
      setIsSearchActive(!isSearchActive);
    } else {
      setIsSearchActive(false);
    }
  };

  const handleOrderClick = (value) => {
    setIsOrderActive(value);
  }

  const handleOrderCardClicked = () => {
    setIsOrderTrue(true);
  }

  const handleOverlayClick = (title, author, imagePath, musicPath, isPaused, toggle) => {
    setPlayerData({ title, author, imagePath, musicPath, isPaused, toggle });
    setIsPlayerActive(true);
  };

  const handleCardClick = (cardIndex, title, author, imagePath, musicPath, containerIndex, isPaused, toggle) => {
    handleOverlayClick(title, author, imagePath, musicPath, isPaused, toggle);
    setActiveCard({ cardIndex, containerIndex });
    setIsPlayerActive(true);
  };

  const handleNextCardClick = (cardIndex, containerIndex) => {
    setActiveCard({ cardIndex, containerIndex });
  }

  const handlePreviousCardClick = (cardIndex, containerIndex) => {
    setActiveCard({ cardIndex, containerIndex });
  }

  return (
    <MusicDataProvider>
      <BrowserRouter>
        <div className="app">
          <Container onContextMenu={handleContextMenu}>
            <Menu
              activeIcon={activeIcon}
              handleClick={handleClick}
              isSearchActive={isSearchActive}
              setIsSearchActive={setIsSearchActive}
              handleCardClick={handleCardClick}
              isPlayerActive={isPlayerActive}
            />
            <Content isPlayerActive={isPlayerActive} isOrderActive={isOrderActive}>
              <Head>
                <Icons />
              </Head>
              <Routes>
                <Route exact path="/" element={<>
                  <MusicCardContainer
                    ID="recentlyListened"
                    title="Recently Listened"
                    slice={6}
                    handleCardClick={handleCardClick}
                    activeCard={activeCard}
                    path="/recently-listened"
                  >
                  </MusicCardContainer>

                  <MusicCardContainer
                    ID="sadVibes"
                    title="Sad vibes"
                    slice={6}
                    handleCardClick={handleCardClick}
                    activeCard={activeCard}
                    path="/sad-vibes"
                  >
                  </MusicCardContainer>
                  </>}>
                </Route>
                <Route path="/recently-listened" element={
                  <MusicCardContainer
                    ID="recentlyListened"
                    title="Recently Listened"
                    slice={undefined}
                    handleCardClick={handleCardClick}
                    activeCard={activeCard}
                    isMoreActive
                  >
                  </MusicCardContainer>}>
                </Route>
                <Route path="/search-results" element={                  
                <MusicCardContainer
                    ID="searchResult"
                    title="Search Results"
                    slice={undefined}
                    handleCardClick={handleCardClick}
                    activeCard={activeCard}
                    isMoreActive
                  >
                  </MusicCardContainer>
                  }>
                </Route>
                <Route path="/sad-vibes" element={
                  <MusicCardContainer
                    ID="sadVibes"
                    title="Sad Vibes"
                    slice={undefined}
                    handleCardClick={handleCardClick}
                    activeCard={activeCard}
                   isMoreActive
                  />}>
                </Route>
              </Routes>
              <Search
                activeIcon={activeIcon}
                handleClick={handleClick}
                isSearchActive={isSearchActive}
                setIsSearchActive={setIsSearchActive}
                isOrderActive={isOrderActive}
              />
            </Content>
            <Player
              title={playerData.title}
              author={playerData.author}
              imagePath={playerData.imagePath}
              musicPath={playerData.musicPath}
              isPaused={playerData.isPaused}
              isPlayerActive={isPlayerActive}
              setIsPlay={setIsPlay}
              handleOrderClick={handleOrderClick}
              ID={activeCard.containerIndex}
              cardIndex={activeCard.cardIndex}
              toggle={playerData.toggle}
              isOrderTrue={isOrderTrue}
              isOrderActive={isOrderActive}
              handlePreviousCardClick={handlePreviousCardClick}
              handleNextCardClick={handleNextCardClick}
            />
            <Order
              isOrderActive={isOrderActive}
              handleCardClick={handleCardClick}
              handleOrderCardClicked={handleOrderCardClicked}
              activeCard={activeCard}
              ID={activeCard.containerIndex}
            >
              <MusicCardContainer
                ID={activeCard.containerIndex}
                title="In order"
                slice={undefined}
                activeCard={activeCard}
                handleCardClick={handleCardClick}
                isOrder
                isMoreActive
              >
              </MusicCardContainer>
            </Order>
          </Container>
        </div>
      </BrowserRouter>
    </MusicDataProvider>
  );
}

export default App;