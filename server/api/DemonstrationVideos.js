const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  const videos = [
    {
      id: 1,
      title: 'Squat',
      filename: 'Squat.mp4',
      description: 'Before diving into squats, it is essential to warm up your body adequately. Engage in light cardiovascular activity, such as jogging or jumping jacks, to increase blood flow to your muscles. Follow it up with dynamic stretches for your hips, legs, and lower back.'
    },
    {
      id: 2,
      title: 'Bench Press',
      filename: 'BenchPress.mp4',
      description:'Begin the squat by bending at your hips and knees simultaneously. Lower your body in a controlled manner, as if you are sitting back on an imaginary chair. Keep your chest up, back straight, and maintain a neutral spine throughout the movement.Aim to lower yourself until your thighs are at least parallel to the ground. Going deeper, known as "breaking parallel," can increase muscle activation but should only be attempted if you have the flexibility and strength to maintain proper form.'
    
    
    
    },
    {
      id: 3,
      title: 'Deadlift',
      filename: 'Deadlift.mp4',
      description:'Bend at your hips and knees to grip the barbell with both hands. You can use either a double overhand grip (both palms facing you) or a mixed grip (one palm facing you, the other facing away). Ensure a secure grip without over-gripping the bar.Lower your hips and position your shins against the barbell. Your back should remain straight, with your chest lifted and shoulders back. Engage your core to stabilize your spine.'
    },
    {
       id: 4,
       title: 'Bad Spotter Example',
      filename: 'BadSpotterExample.mp4',
       description:'Having a reliable spotter during weightlifting exercises is essential for ensuring safety, maximizing performance, and building confidence in the gym. A spotter provides assistance and support, especially during heavy lifts, helping to prevent injuries and allowing the lifter to push their limits. However, being a spotter is a responsibility that requires knowledge and attentiveness.'
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