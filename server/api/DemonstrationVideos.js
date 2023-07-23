const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  const videos = [
    {
      id: 1,
      title: 'Squat',
      filename: 'Squat.mp4',
    },
    {
      id: 2,
      title: 'Bench Press',
      filename: 'BenchPress.mp4',
    },
    {
      id: 3,
      title: 'Deadlift',
      filename: 'Deadlift.mp4',
    },
    {
       id: 4,
       title: 'Bad Spotter Example',
       filename: 'BadSpotterExample.mp4',
      },
  ];

  const videosWithUrls = videos.map((video) => {
    const videoUrl = `${req.protocol}://${req.get('host')}/assets/videos/${encodeURIComponent(video.filename)}`;
    console.log(`Serving video at: ${videoUrl}`);
    return {
      ...video,
      url: videoUrl,
    };
  });

  res.json(videosWithUrls);
});

module.exports = router;