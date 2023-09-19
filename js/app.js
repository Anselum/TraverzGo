const data = [
    {
        city: "New York",
        videos: ['7HaJArMDKgI', 'LQLJu-EpkeE', 'op95EHWKEgI']

    },
    {
        city: "Washington",
        videos: ['fkps18H3SXY', 'vOZ4TzhAmLs']
    },
    {
        city: "Boston",
        videos: ['zxz4pFSJugY', 'aVaQkKBEvzE', 'XHwtxqVkEKk']
    },
    {
        city: "San Francisco",
        videos: ['Uw2d52XQ1L8', 'buWK4MxH2zY', 'ZHCBN76g_dk']
    },
    {
        city: "San Jose",
        videos: ['vGacLYTaBD8', '72F3Ev8Ykxs']
    },
    {
        city: "Los Angeles",
        videos: [ 'ywNMGha7Cog']
    },
    {
        city: "San Diego",
        videos: ['TADtb4tTv4s', 'kVSxrucy7wo', 'JliviUdmmoY', 'oGjwx4EfRqU']
    },
    {
        city: "California",
        videos: ['u3_2gAuPjxM', 'i0fA2STL0DE', 'USUJa3N3TOM']
    },
    {
        city: "London",
        videos: ['mBG1wJLiWEQ', 'IWojm4W7wUY', '5me0b0vEtEA', 'Q4WST5TWeBQ']
    },
    {
        city: "Qatar",
        videos: ['ZApOrYZFsvs', 'lOFM_nqGXZs']
    },
    {
        city: "Dubai",
        videos: ['TE2tfavIo3E', 'y6Bi15Jditk', '4sGEKncZOIw']
    },
    {
        city: "Delhi",
        videos: ['Af0SUwah1bQ', 'u9S9IHRELAw', 'g-c3K8plBxo', 'RV2fhJTI810']
    },
    {
        city: "Mumbai",
        videos: ['_Wb1ASZ4rBA', 'zZrOxhH1u4k', 'j_lBv6BSrNo']
    },
    {
        city: "Shangai",
        videos: ['8T044v8EG5E', 'MAiltiE8tgI']
    },
    {
        city: "Tokyo",
        videos: ['qPgWV8Rxemo', '-F-hrZKXM-k']
    }
]

let video_Id;
let crnt_city;
let player;
let playing;
let locations_cont = document.getElementById('locations');
let play_pause_SVG = document.getElementById('play_pause_svg');
let pauseSvg = `<path d="M12.5 25.8333V0.166656H18.5V25.8333H12.5ZM0.5 25.8333V0.166656H6.5V25.8333H0.5Z"fill = "white" /> `;
let playSvg = `<path d="M20.625 13C20.6258 13.3183 20.5442 13.6314 20.3881 13.9088C20.232 14.1863 20.0068 14.4186 19.7344 14.5832L2.85 24.9121C2.56534 25.0864 2.2393 25.1816 1.90556 25.1878C1.57182 25.1939 1.24249 25.1109 0.951563 24.9473C0.66341 24.7862 0.423371 24.5512 0.25613 24.2666C0.0888884 23.9819 0.000481474 23.6579 0 23.3277V2.67227C0.000481474 2.34214 0.0888884 2.01809 0.25613 1.73345C0.423371 1.44881 0.66341 1.21385 0.951563 1.05274C1.24249 0.889085 1.57182 0.806061 1.90556 0.812242C2.2393 0.818422 2.56534 0.913583 2.85 1.0879L19.7344 11.4168C20.0068 11.5814 20.232 11.8137 20.3881 12.0912C20.5442 12.3686 20.6258 12.6817 20.625 13Z" fill="white"/>`;
let volume_slider = document.getElementById('volume_slider');



// Onload Functions


const rand = (num) => {
    return (Math.floor((Math.random() * num)));
}

locations_cont.innerHTML = "";
data.forEach((el) => {
    locations_cont.innerHTML += `<li>${el.city}</li>`;
});

const onLoad = () => {
    let rand_num_data = rand(data.length);
    crnt_city = data[rand_num_data];
    let rand_num_video = rand(data[rand_num_data].videos.length);
    video_Id = data[rand_num_data].videos[rand_num_video];
    locations_cont.childNodes[rand_num_data].classList.add('li_active');
};
onLoad();

// Iframe Functions
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: window.innerHeight * 1.1,
        width: window.innerHeight * 1.1 * (16 / 9),
        videoId: video_Id,
        playerVars: {
            'autoplay': 1,
            'playsinline': 1,
            'controls': 0,
            'mute': 0,
            'showinfo': 1,
            'enablejsapi': 1,
            'disablekb': 1,
            'origin': window.location.origin,
            'widger_referrer': window.location.href
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}


function onPlayerReady(event) {
    event.target.playVideo();
}


function onPlayerError(e) {
    console.log(video_Id)
    alert("There was an error playing the video!");
    locations_cont.childNodes.forEach((el) => { el.classList.remove('li_active'); });
    onLoad();
    loadNewVideo();
}


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        onLoad();
    }
    if (event.data == YT.PlayerState.PLAYING) {
        play_pause_SVG.innerHTML = pauseSvg;
        playing = true;
    } else {
        play_pause_SVG.innerHTML = playSvg;
        playing = false;
    }
}


// Player Functions

const getIndex = (city_name) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].city == city_name) return i;
    }
};

const loadNewVideo = () => {
    player.loadVideoById(video_Id);
};

const changeVideo = (index) => {
    crnt_city = data[index];
    let videos = data[index].videos;
    let video = videos[rand(videos.length)];
    video_Id = video;
    loadNewVideo();
}


locations_cont.childNodes.forEach((el) => {
    el.addEventListener('click', () => {
        locations_cont.childNodes.forEach((el) => { el.classList.remove('li_active'); });
        el.classList.add('li_active');
        changeVideo(getIndex(el.innerText));
    });
});


play_pause_SVG.addEventListener('click', () => {
    if (playing) {
        play_pause_SVG.innerHTML = playSvg;
        player.pauseVideo();
        playing = false;
    }
    else {
        play_pause_SVG.innerHTML = pauseSvg;
        player.playVideo();
        playing = true;
    }
});

window.addEventListener('keypress', (e) => {
    let key = e.key;
    if (key == 'k' || key == 'K' || key == ' ') {
        if (playing) {
            play_pause_SVG.innerHTML = playSvg;
            player.pauseVideo();
            playing = false;
        }
        else {
            play_pause_SVG.innerHTML = pauseSvg;
            player.playVideo();
            playing = true;
        }
    }
});


volume_slider.onchange = () => {
    player.setVolume(volume_slider.value);
};

// List Scrolling to the specified position

if (window.innerHeight > window.innerWidth) {
    alert("Please use Landscape mode for better experience");
}