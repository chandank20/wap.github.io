let sessionId = "0";

loadView();

function loadView() {
  // Get saved data from sessionStorage
  sessionId = sessionStorage.getItem("sessionId");

  if (sessionId == "0" || sessionId == null) {  //No login
    document.getElementById("section-login").style.display = "flex";
    document.getElementById("hero").style.display = "flex";
    document.getElementById("heroCarousel").style.display = "flex";
    document.getElementById("section-logout").style.display = "none";
    document.getElementById("div-search").style.display = "none";
    document.getElementById("main").style.display = "none";
    document.getElementById("audio-player").style.display = "none";
  } else {
    document.getElementById("section-login").style.display = "none";
    document.getElementById("hero").style.display = "none";
    document.getElementById("heroCarousel").style.display = "none";
    document.getElementById("section-logout").style.display = "block";
    document.getElementById("div-search").style.display = "flex";
    document.getElementById("main").style.display = "block";
    document.getElementById("audio-player").style.display = "block";
    
    getAllSongs();
    getLogUserSongs();
  }
}
// sessionId = 1234;
document.getElementById("btn-logout").addEventListener("click", (event) => {
  // Remove saved data from sessionStorage
  sessionStorage.removeItem("sessionId");
  stopPlayback();
  loadView();
});

document.getElementById("section-login").addEventListener("submit", function (e) {
  e.preventDefault();
  fetch("http://localhost:5500/users/auth", {
    method: "POST",
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.sessionId == "Invalid") {
        document.getElementById("error-message").textContent = "Invalid User.";
        document.getElementById("error-message").style.display = "block";
        setTimeout(function(){
          document.getElementById("error-message").textContent = "";
        }, 3000);
        // alert("Invalid authentication.");
      } else {
        console.log("Login successful");
        sessionId = res.sessionId;
        sessionStorage.setItem("sessionId", sessionId);
        loadView();
      }
    })
    .catch((err) => {
      alert(err);
    });
});

const playFromHere = function (songId) {  
  startPlayingFromHere(songId);
};

function refreshSongListEvent() {
  let btns = document.getElementsByClassName("addSong");
  Array.prototype.forEach.call(btns, function addClickListener(btn) {
    btn.addEventListener("click", function (event) {
      addSongPlayList(this.getAttribute("tag"));
    });
  });
}

//function to refresh the event binding of play list
function refreshPlayListEvent() {
  let btns = document.getElementsByClassName("removeSong");
  Array.prototype.forEach.call(btns, function addClickListener(btn) {
    btn.addEventListener("click", function (event) {
      removeSongPlayList(this.getAttribute("tag"));
    });
  });
}

//function to refresh the event binding of play list for playing
function refreshPlayListForPlayerEvent() {  
  let btns = document.getElementsByClassName("playHere");
  Array.prototype.forEach.call(btns, function addClickListener(btn) {
    btn.addEventListener("click", function (event) {
      playFromHere(this.getAttribute("tag"));
    });
  });
}

//add song in playlist
const addSongPlayList = function (songId) {
  fetch("http://localhost:5500/users/addSong/", {
    method: "POST",
    body: JSON.stringify({
      sessionId: sessionId,
      songId: parseInt(songId),
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      showPlayListData(res);
      refreshPlayListEvent();
    });
};

//delete song in playlist
const removeSongPlayList = function (songId) {
  fetch("http://localhost:5500/users/removeSong/", {
    method: "POST",
    body: JSON.stringify({
      sessionId: sessionId,
      songId: parseInt(songId),
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      showPlayListData(res);
      refreshPlayListEvent();
    });
};

//function to fetch the songs by session user id
function getLogUserSongs() {
  fetch("http://localhost:5500/songs/userSong/" + sessionId)
    .then((res) => res.json())
    .then((res) => {
      showPlayListData(res);
      refreshPlayListForPlayerEvent();
      refreshPlayListEvent();
      loadSongsInPlayer(res);
    });
}

//function to fetch the songs
function getAllSongs() {
  fetch("http://localhost:5500/songs")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      showSiteSongsData(res);
      refreshSongListEvent();
    });
}

// document.getElementById("search").addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//       document.getElementById("btnSearch").click();
//     }
//   });

// search song
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let searchval = document.getElementById("search").value;
      // document.getElementById("heroCarousel").style.display = "flex";
      document.getElementById("interest").style.display = "none";
      document.getElementById("search-title").style.display = "block";
      document.getElementById("search-data").textContent = searchval;
  fetch("http://localhost:5500/songs/search?title=" + searchval)
    .then((res) => res.json())
    .then((res) => {      
        showSiteSongsData(res);
         refreshSongListEvent();
    });
});

//function to refresh the data in the playlist
const showSiteSongsData = function (data) {
  let html = "";
  data.forEach((x) => {
    html += `<tr>
    <td>${x.songId}</td>
    <td>${x.title}</td>    
    <td>${x.reliseDate}</td>
    <td style="text-align:center;"><span><i tag="${x.songId}" class="fa fa-plus addSong"></i></span></td>
    </tr>`;
  });
  document.getElementById("songList").innerHTML = html;
};

//function to refresh the data in the playlist
const showPlayListData = function (data) {
  let html = "";
  if (data != null) {
    data.forEach((x) => {
      html += ` <tr>
    <td>${x.songId}</td>
    <td>${x.title}</td>
    <td>${x.reliseDate}</td>
    <td style="text-align:center;"><span><i tag=${x.songId} class="fa fa-minus removeSong"></i></span> | <span><i tag=${x.songId} class="fa fa-play playHere"></i></span></td>
    </tr>`;
    });
    document.getElementById("userPlayList").innerHTML = html;
  }
};