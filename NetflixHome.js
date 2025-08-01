import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import VideoPlayer from "./VideoPlayer";
import "./NetflixHome.css";

const categories = [
  {
    title: "Trending Now",
    videos: [
      {
        title: "Nature Documentary",
        poster:
          "https://tse3.mm.bing.net/th/id/OIP.4M-9nouZrTdCUed6SGg6EgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
        hlsUrl:
          "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      },
      {
        title: "City Time-lapse",
        poster:
          "https://tse1.explicit.bing.net/th/id/OIP.ptdWtNRno428xzvs-vFTPwHaD2?rs=1&pid=ImgDetMain&o=7&rm=3",
        hlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      },
      {
        title: "Space Walk",
        poster:
          "https://wallpapers.com/images/hd/sunshine-pictures-h9sr8m8bfo4chk63.jpg",
        hlsUrl: "https://ireplay.tv/test/blender.m3u8",
      },
      {
        title: "Ocean Dive",
        poster:
          "https://img.freepik.com/premium-photo/women-model-ramp-walk-fashion_1067450-515.jpg",
        hlsUrl:
          "https://fashiontv-fashiontv-1-eu.rakuten.wurl.tv/playlist.m3u8",
      },
    ],
  },
  {
    title: "Top Picks",
    videos: [
      {
        title: "Mountainscape",
        poster:
          "https://www.onthisday.com/images/photos/operation-desert-shield.jpg",
        hlsUrl: "https://test-streams.mux.dev/test_001/stream.m3u8",
      },
      {
        title: "Highway Ride",
        poster:
          "https://tse3.mm.bing.net/th/id/OIP.jEIE3bxvrgnymZQ3jOhceAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
        hlsUrl:
          "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8",
      },
      {
        title: "Time-Lapse Sky",
        poster:
          "https://tse1.mm.bing.net/th/id/OIP.5TPJuXeyWkFuLrIe_1H2-QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
        hlsUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
      {
        title: "Forest Morning",
        poster:
          "https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/geetha-e-pie-charts-01-1602836274.png",
        hlsUrl:
          "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
      },
    ],
  },
];

const NetflixHome = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.username) {
      setUsername(storedUser.username);
    }
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="netflix-home">
      <h2 className="welcome-message">👋 Welcome, {username}</h2>
      <h1 className="banner-title">🎬 Airtel Originals</h1>
      <p className="banner-subtitle">
        Watch stunning free videos powered by HLS technology
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {(() => {
        const filteredCategories = categories
          .map((category) => {
            const filteredVideos = category.videos.filter((video) =>
              video.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return { ...category, videos: filteredVideos };
          })
          .filter((category) => category.videos.length > 0);

        if (filteredCategories.length === 0) {
          return <p className="no-results">No results found</p>;
        }

        return filteredCategories.map((category, index) => (
          <div key={index} className="category">
            <h2>{category.title}</h2>
            <Slider {...sliderSettings}>
              {category.videos.map((video, idx) => (
                <div
                  key={idx}
                  className="video-card"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img src={video.poster} alt={video.title} />
                  <div className="card-overlay">
                    <h3>{video.title}</h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ));
      })()}

      {selectedVideo && (
        <div
          className="fullscreen-player"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="player-container"
            onClick={(e) => e.stopPropagation()}
          >
            <VideoPlayer
              src={selectedVideo.hlsUrl}
              onBack={() => setSelectedVideo(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NetflixHome;
