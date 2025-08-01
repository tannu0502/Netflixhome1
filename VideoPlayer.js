import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "./VideoPlayer.css";

const VideoPlayer = ({ src, onBack }) => {
  const videoRef = useRef(null);
  const hls = useRef(null);
  const [availableQualities, setAvailableQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("auto");

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      hls.current = new Hls({
        enableWorker: true,
        capLevelToPlayerSize: true,
        maxLoadingDelay: 4,
        manifestLoadingTimeOut: 20000,
        manifestLoadingMaxRetry: 4,
      });

      hls.current.attachMedia(video);
      hls.current.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.current.loadSource(src);
      });

      hls.current.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const levels = data.levels.map((level, index) => ({
          label: `${level.height}p`,
          index,
        }));
        setAvailableQualities([{ label: "Auto", index: -1 }, ...levels]);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      if (hls.current) {
        hls.current.destroy();
      }
    };
  }, [src]);

  const handleQualityChange = (event) => {
    const selected = parseInt(event.target.value);
    setSelectedQuality(selected === -1 ? "auto" : selected);

    if (hls.current) {
      hls.current.currentLevel = selected;
    }
  };

  return (
    <div className="video-player-wrapper">
      <div className="video-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        {availableQualities.length > 0 && (
          <select
            className="quality-dropdown"
            onChange={handleQualityChange}
            value={selectedQuality}
          >
            {availableQualities.map((q) => (
              <option key={q.index} value={q.index}>
                {q.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <video
        className="video-element"
        ref={videoRef}
        controls
        autoPlay
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
