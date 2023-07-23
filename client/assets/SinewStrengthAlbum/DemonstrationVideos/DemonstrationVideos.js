import React, { useEffect, useState } from 'react';
import styles from './DemonstrationVideos.module.css'; // Import CSS module

const DemonstrationVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/demonstrationVideos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Demonstration Videos</h1>
      <div className={styles.videoGrid}>
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={index % 2 === 0 ? styles.videoCardLeft : styles.videoCardRight}
          >
            <video controls className={styles.videoPlayer}>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className={styles.videoInfo}>
              <h2 className={styles.videoTitle}>{video.title}</h2>
              <p className={styles.videoDescription}>{video.description}</p>
           
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemonstrationVideos;
