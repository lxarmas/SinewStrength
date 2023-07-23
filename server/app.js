const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const app = express();
const demonstrationVideosRouter = require('./api/DemonstrationVideos');

module.exports = app;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

app.use('/api/demonstrationVideos', demonstrationVideosRouter);

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// byte range request handling for video streaming
app.get('/assets/videos/:videoName', function(req, res) {
    const videoPath = path.join(__dirname, '..', 'client/assets/SinewStrengthAlbum/DemonstrationVideos', req.params.videoName);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});