// src/components/ComicReader.js
import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './ComicReader.css';

const metadataURL = "https://loud-chocolate-cattle.myfilebase.com/ipfs/QmRN18co69RUmGEQ82yvpWM3U37kU8c5itrDDVuREYKWKx/metadata.json";

function ComicReader() {
  const [pages, setPages] = useState([]);
  const flipBook = useRef();

  useEffect(() => {
    const loadPages = async () => {
      try {
        const response = await fetch(metadataURL);
        const data = await response.json();

        const seen = new Set();
        const uniquePages = (data.pages || []).filter(page => {
          if (seen.has(page.image)) return false;
          seen.add(page.image);
          return true;
        });

        setPages(uniquePages);
      } catch (err) {
        console.error("Failed to load comic metadata:", err);
      }
    };

    loadPages();
  }, []);

  const toggleFullscreen = () => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const renderPage = (image, index) => (
    <div key={index} className="flip-page">
      <img src={image} alt={`Page ${index + 1}`} />
    </div>
  );

  const SocialShare = () => (
    <div className="social-share">
      <a
        href="https://x.com/intent/tweet?text=I just minted The Genesis Heist, a Bitcoin cosmic Treasure Hunt adventure! 🌀 https://thegenesisheist.app/"
        target="_blank" rel="noopener noreferrer"
      >
        Share on X
      </a>
      <a
        href="https://t.me/share/url?url=https://thegenesisheist.app/&text=Check out The Genesis Heist, a Bitcoin cosmic comic Treasure Hunt adventure! 🌀"
        target="_blank" rel="noopener noreferrer"
      >
        Share on Telegram
      </a>
    </div>
  );

  const Navigation = () => (
    <div className="nav-buttons">
      <button onClick={() => flipBook.current.pageFlip().flipPrev()}>⬅ Prev</button>
      <button onClick={toggleFullscreen}>🔍 Fullscreen</button>
      <button onClick={() => flipBook.current.pageFlip().flipNext()}>Next ➡</button>
    </div>
  );

  if (pages.length === 0) {
    return <div className="reader-container">Loading comic...</div>;
  }

  return (
    <div className="reader-container flipbook-container">
      <HTMLFlipBook
        width={350}
        height={500}
        size="stretch"
        minWidth={315}
        maxWidth={600}
        minHeight={420}
        maxHeight={800}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        ref={flipBook}
        className="flipbook"
      >
        {pages.map((page, index) => renderPage(page.image, index))}
      </HTMLFlipBook>

      <Navigation />
      <SocialShare />
    </div>
  );
}

export default ComicReader;
