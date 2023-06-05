import React, { createContext, useState } from 'react';

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
    const [musicData, setMusicData] = useState({
        recentlyListened: [
            { title: 'Ну и что, что я вор', author: 'СЕРЕГА ПИРАТ', imagePath: '/jpg/Я ВОР.jpg', musicPath: '/mp3/НУ И ЧТО ЧТО Я ВОР.mp3' },
            { title: 'cristian death', author: 'EKKSTACY', imagePath: '/jpg/cristian death.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'for forever', author: 'EKKSTACY', imagePath: '/jpg/for forever.jpg', musicPath: '/mp3/test1.mp3' },
            { title: 'Kamikaze', author: 'Eminem', imagePath: '/jpg/Kamikaze.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'Godzilla', author: 'Eminem', imagePath: '/jpg/Godzilla.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'Lean with Me', author: 'Juice WRLD', imagePath: '/jpg/lean-with-me.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'Star Shopping', author: 'LIL PEEP', imagePath: '/jpg/star-shopping.jpg', musicPath: '/mp3/test.mp3' },
        ],
        sadVibes: [
            { title: 'На луне', author: 'СЕРЕГА ПИРАТ', imagePath: '/jpg/На луне.jpg', musicPath: '/mp3/на луне.mp3' },
            { title: 'Uncomparable', author: 'EKKSTACY', imagePath: '/jpg/Uncomparable.jpg', musicPath: '/mp3/Uncomparable.mp3' },
            { title: 'Маша', author: 'СЕРЕГА ПИРАТ', imagePath: '/jpg/Маша.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'XO tour Lif3', author: 'Lil Uzi Vert', imagePath: '/jpg/XO tour Lif3.jpg', musicPath: '/mp3/XO tour life.mp3' },
            { title: 'SkeletonRap', author: 'Bones', imagePath: '/jpg/SkeletonRap.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'Me, Myself & I', author: 'Oliver Tree', imagePath: '/jpg/Me, Myself & I.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'Skin', author: 'IVOXYGEN', imagePath: '/jpg/Skin.jpg', musicPath: '/mp3/test.mp3' },
            { title: 'Героинка', author: 'СЕРЕГА ПИРАТ', imagePath: '/jpg/Героинка.jpg', musicPath: '/mp3/Героинка.mp3' },
        ],
        searchResult: [
        ],
    });

    const [searchTerm, setSearchTerm] = useState('');

    const performSearch = () => {
        const searchResults = [];
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        Object.values(musicData).forEach((musicArray) => {
            musicArray.forEach((item) => {
                const lowerCaseTitle = item.title.toLowerCase();
                const lowerCaseAuthor = item.author.toLowerCase();

                if (lowerCaseTitle.includes(lowerCaseSearchTerm) || lowerCaseAuthor.includes(lowerCaseSearchTerm)) {
                    const isDuplicate = searchResults.find((result) => result.title === item.title);

                    if (!isDuplicate) {
                        searchResults.push(item);
                    }
                }
            });
        });

        setMusicData((prevMusicData) => ({
            ...prevMusicData,
            searchResult: searchResults,
        }));
    };
    return (
        <MusicDataContext.Provider value={{ musicData, setSearchTerm, performSearch }}>
            {children}
        </MusicDataContext.Provider>
    );
};