var currfolder;
var songs;
var currentsong = new Audio();

//  song play function

async function playsong(track, pause = false) {
  try {
    currentsong.src = `${currfolder}` + track;
    if (!pause) {
      await currentsong.play(); // Attempt to play audio
      play.src = "img/pause.svg";
    }

    // time and song info
    document.querySelector(".songinfo").innerHTML = track.replace(".mp3", "");
    document.querySelector(".time").innerHTML = "00:00/00:00";
  } catch (error) {
    console.error("Audio playback failed:", error);
  }
}

async function getsongs(folder) {
  currfolder = folder;
  let a = await fetch(`${folder}`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let As = div.getElementsByTagName("a");

  // Arrays to store song details and URLs
  const songNames = [];
  const artists = [];
  const urls = [];
  songs = [urls, songNames, artists];
  for (let i = 0; i < As.length; i++) {
    const element = As[i];

    const path = new URL(element).pathname;
    if (path.startsWith(`${folder}`) && path.includes(".mp3")) {
      const songDetails = decodeURIComponent(path.replace(`${folder}`, "")); // Decode URL and remove "/song/"
      const fileName = songDetails.replace(".mp3", ""); // Remove file extension
      const [songName, artist] = fileName.split(" - "); // Split into song name and artist

      // Store in respective arrays
      songNames.push(songName);
      artists.push(artist);
      urls.push(songDetails); // Store the relative URL (after /song)
    }
  }

  // return alldetail;

  // show all songs in the playlist
  let songname = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];

  songname.innerHTML = "";
  for (let i = 0; i < songs[0].length; i++) {
    songname.innerHTML =
      songname.innerHTML +
      `<li> <img src="img/music.svg" alt="">
              <div class="info">
                <p class="name">${songs[1][i]}</p>
                <p class="artist">${songs[2][i]}</p>
              </div>
              <p class="playnow">Play Now</p>
              <img class="pointer"   src="img/playsong2.svg" style="filter: invert(1);" alt="">
        </li>`;
  }

  // attach an event listner to each song
  let li = document.querySelector(".songlist").getElementsByTagName("li");
  Array.from(li).forEach((e) => {
    e.addEventListener("click", async () => {
      songname = e.querySelector(".info").firstElementChild.innerHTML;
      for (let i = 0; i < songs[0].length; i++) {
        let url = songs[0][i];
        if (url.split(" - ")[0] === songname) {
          playsong(url);
        }
      }
    });
  });
}

async function main() {
  // display all folders

  async function displayalbums() {
    let a = await fetch("https://github.com/Sachin-patware/spotify-web/tree/main/song/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let arr = Array.from(anchors);
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      if (e.href.includes("song/")) {
        let folder = e.href.split("/").splice(-1)[0];
        console.log(folder);

        // get the meta deta of the folder
        let b = await fetch(`https://github.com/Sachin-patware/spotify-web/tree/main/song/${folder}/info.json`);
        let response = await b.json();

        let cardContainer = document.querySelector(".cardContainer");
        cardContainer.innerHTML =
          cardContainer.innerHTML +
          `
            <div data-folder="${folder}" class="card bd-radius">
              <img src="song/${folder}/coverimg.jpeg" alt="happy hits " />
              <div class="play">
                <img src="img/play.svg" alt="playbutton"/>
          </div>
              <h2> ${response.title}</h2>
              <p> ${response.description}</p>
            </div>`;
      }
    }

    // load the playlist whenever card is clicked
    
    card = document.getElementsByClassName("card");
    Array.from(card).forEach((e) => {
      e.addEventListener("click", async (item) => {
        await getsongs(`https://github.com/Sachin-patware/spotify-web/tree/main/song/${item.currentTarget.dataset.folder}/`);
        playsong(songs[0][0], true);
      });
    });
  }

  displayalbums();

  // list of all songs in first folder
  await getsongs("https://github.com/Sachin-patware/spotify-web/tree/main//song/all/");
  playsong(songs[0][0], true);

  // add event listener to play,

  play.addEventListener("click", (e) => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "img/pause.svg";
    } else {
      currentsong.pause();
      play.src = "img/playsong.svg";
    }
  });
  // listner time update
  currentsong.addEventListener("timeupdate", (a) => {
    document.querySelector(".time").innerHTML = `${formatSeconds(
      currentsong.currentTime
    )}/${formatSeconds(currentsong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });
  // event on seekbar
  let seekbar = document.querySelector(".seekbar");
  seekbar.addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });

  // next
  next.addEventListener("click", (e) => {
    let index = songs[0].indexOf(
      currentsong.src.split("/").slice(-1)[0].replaceAll("%20", " ")
    );
    if (index + 1 < songs[0].length) {
      playsong(songs[0][index + 1]);
    }
  });
  //  previous
  previous.addEventListener("click", (e) => {
    let index = songs[0].indexOf(
      currentsong.src.split("/").slice(-1)[0].replaceAll("%20", " ")
    );
    if (index - 1 >= 0) {
      playsong(songs[0][index - 1]);
    }
  });
  // time conversation
  function formatSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Ensure both minutes and seconds are always two digits
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  //  add an event listner for hamburger
  document.querySelector("#list").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0%";
  });
  //  add an event listner for columnRuleStyle:
  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-140%";
  });
  // event to volume range
  let input = document.querySelector(".range").getElementsByTagName("input")[0];
  input.addEventListener("change", (e) => {
    currentsong.volume = parseInt(e.target.value) / 100;

    if (currentsong.volume == 0) {
      sound.src = "img/mute.svg";
    } else {
      sound.src = "img/sound.svg";
    }
  });
  // add event on sound
  sound.addEventListener("click", () => {
    if (currentsong.volume == 0) {
      sound.src = "img/sound.svg";
      currentsong.volume = 0.7;
      input.value = 50;
    } else {
      sound.src = "img/mute.svg";
      currentsong.volume = 0;
    }
  });
}
main();
