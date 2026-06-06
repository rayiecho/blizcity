// Universal inline player for BLIZCITY
// Inject this into all pages

const playerCSS = `
<style id="blizcity-player-styles">
.bc-modal{position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:none;align-items:center;justify-content:center;padding:1rem;}
.bc-modal.active{display:flex;}
.bc-modal-inner{position:relative;width:100%;max-width:900px;}
.bc-modal-close{position:absolute;top:-3rem;right:0;background:rgba(212,168,75,0.2);border:1px solid rgba(212,168,75,0.4);color:#D4A84B;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.2rem;z-index:1;}
.bc-modal-close:hover{background:#D4A84B;color:#0F0800;}
.bc-video-wrap{width:100%;aspect-ratio:16/9;background:#000;}
.bc-video-wrap iframe{width:100%;height:100%;border:none;}
.bc-music-modal{background:#1A0F00;border:1px solid rgba(212,168,75,0.15);border-radius:8px;padding:2rem;width:100%;max-width:600px;}
.bc-music-modal h3{font-family:'Anton',sans-serif;font-size:1.5rem;color:#FDFAF5;letter-spacing:1px;margin-bottom:0.5rem;}
.bc-music-modal p{font-size:0.85rem;color:#8A7A60;margin-bottom:1.5rem;}
.bc-stream-btns{display:flex;flex-direction:column;gap:0.75rem;}
.bc-stream-btn{display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;border:1px solid rgba(212,168,75,0.15);border-radius:6px;color:#F5ECD7;text-decoration:none;font-size:0.9rem;font-weight:600;transition:all 0.2s;background:rgba(212,168,75,0.05);}
.bc-stream-btn:hover{border-color:#D4A84B;color:#D4A84B;}
.bc-stream-btn svg{width:24px;height:24px;fill:currentColor;flex-shrink:0;}
.bc-spotify-embed{margin-top:1rem;}
</style>`;

const playerHTML = `
<div class="bc-modal" id="bc-video-modal" onclick="if(event.target===this)closeBCModal('bc-video-modal')">
  <div class="bc-modal-inner">
    <div class="bc-modal-close" onclick="closeBCModal('bc-video-modal')">&times;</div>
    <div class="bc-video-wrap"><iframe id="bc-video-frame" src="" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
  </div>
</div>
<div class="bc-modal" id="bc-music-modal" onclick="if(event.target===this)closeBCModal('bc-music-modal')">
  <div class="bc-music-modal">
    <div class="bc-modal-close" onclick="closeBCModal('bc-music-modal')" style="position:relative;top:0;right:0;margin-left:auto;margin-bottom:1rem;">&times;</div>
    <h3 id="bc-song-title">Song Title</h3>
    <p id="bc-song-meta">MoonkhidMusic</p>
    <div class="bc-spotify-embed" id="bc-spotify-embed"></div>
    <div class="bc-stream-btns" id="bc-stream-btns"></div>
  </div>
</div>`;

// Functions
window.openVideoModal = function(youtubeId) {
  document.getElementById('bc-video-frame').src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  document.getElementById('bc-video-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.openMusicModal = function(title, artist, streamLink, spotifyId) {
  document.getElementById('bc-song-title').textContent = title;
  document.getElementById('bc-song-meta').textContent = artist + ' · Click a platform to listen';
  const spotifyEmbed = document.getElementById('bc-spotify-embed');
  if (spotifyId) {
    spotifyEmbed.innerHTML = `<iframe style="border-radius:4px;width:100%;margin-bottom:1rem;" src="https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  } else {
    spotifyEmbed.innerHTML = '';
  }
  const btns = document.getElementById('bc-stream-btns');
  btns.innerHTML = `
    <a href="${streamLink}" target="_blank" class="bc-stream-btn">
      <svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
      Stream on Spotify
    </a>
    <a href="https://music.apple.com/us/song/sincere/6767625063" target="_blank" class="bc-stream-btn">
      <svg viewBox="0 0 24 24"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.007 1.572-.053.527-.045 1.045-.14 1.545-.328 1.31-.506 2.24-1.403 2.78-2.705.192-.456.29-.935.363-1.417.056-.392.088-.785.1-1.18V6.935c-.002-.27-.01-.54-.02-.812zM12 16.8c-2.652 0-4.8-2.148-4.8-4.8S9.348 7.2 12 7.2s4.8 2.148 4.8 4.8-2.148 4.8-4.8 4.8zm4.965-8.772a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM12 9.6a2.4 2.4 0 100 4.8 2.4 2.4 0 000-4.8z"/></svg>
      Stream on Apple Music
    </a>
    <a href="https://link.deezer.com/s/33tji6q3Zt48Fg0rOnbXr" target="_blank" class="bc-stream-btn">
      <svg viewBox="0 0 24 24"><path d="M18.944 19.297h4.403v-1.37h-4.403zM18.944 16.429h4.403v-1.37h-4.403zM18.944 13.56h4.403v-1.37h-4.403zM13.258 19.297h4.403v-1.37h-4.403zM13.258 16.429h4.403v-1.37h-4.403zM7.571 19.297h4.403v-1.37H7.571zM7.571 16.429h4.403v-1.37H7.571zM1.885 19.297h4.403v-1.37H1.885z"/></svg>
      Stream on Deezer
    </a>
    <a href="https://distrokid.com/hyperfollow/moonkhidmusic/sincere" target="_blank" class="bc-stream-btn">
      <svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm4.8 16.8l-6-3.6V7.2l6 3.6v6z"/></svg>
      All Platforms
    </a>`;
  document.getElementById('bc-music-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeBCModal = function(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
  if (id === 'bc-video-modal') {
    document.getElementById('bc-video-frame').src = '';
  }
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeBCModal('bc-video-modal');
    closeBCModal('bc-music-modal');
  }
});

// Inject HTML and CSS into page
document.head.insertAdjacentHTML('beforeend', playerCSS);
document.body.insertAdjacentHTML('beforeend', playerHTML);