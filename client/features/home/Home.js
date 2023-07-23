import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import logo from '../../assets/MyLogo.svg'
import pictureOne from "../../assets/SinewStrengthAlbum/pictures/img_3608.jpg"
import pictureTwo from "../../assets/SinewStrengthAlbum/pictures/IMG_3605.jpg"

const Home = () => {
  const username = useSelector((state) => state.auth.me.username);
  const hpImageRef = useRef(null);
  const dynamicImageRefs = [useRef(null), useRef(null)];
  const videoRef = useRef(null);

  useEffect(() => {
    const hpImage = hpImageRef.current;
    const dynamicImages = dynamicImageRefs.map((ref) => ref.current);
    const video = videoRef.current;

    const handleScroll = () => {
      const boundingRectHp = hpImage.getBoundingClientRect();
      const boundingRectDynamics = dynamicImages.map((img) => img.getBoundingClientRect());
      const boundingRectVideo = video.getBoundingClientRect();

      const isVisibleHp = boundingRectHp.top < window.innerHeight;
      const isVisibleDynamics = boundingRectDynamics.map((rect) => rect.top < window.innerHeight);
      const isVisibleVideo = boundingRectVideo.top < window.innerHeight;

      if (isVisibleHp) {
        hpImage.classList.add('show');
      }

      isVisibleDynamics.forEach((isVisible, index) => {
        if (isVisible) {
          dynamicImages[index].classList.add('show');
        }
      });

      if (isVisibleVideo) {
        video.play();
      } else {
        video.pause();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="HPcontainer">
        <h3 style={{ textAlign: 'center',fontFamily: `palatino  bold `}}>
            Welcome to Sinew Strength Training, <span style={{ textTransform: 'uppercase' }}>{username}</span>!
         </h3>
      </div>

      <div className="HPimageContainer">
         <div className="sloganContainerLeft">
            <h2 className="HPsloganOne">Train like a champion, become unstoppable....</h2>
         </div>

         <div className="HPimageWrapper">
            <img
               className="HPimage"
               ref={hpImageRef}
               src={pictureOne}
               alt="Image Description"
            />
         </div>

         <div className="HPlogoContainer">
            <img src={logo} alt='logo' className="HPlogo" />
         </div>

         <div className="HPimageWrapper">
            <img
               className="HPimage"
               ref={hpImageRef}
               src={pictureTwo}
               alt="Image Description"
            />
         </div>

         <div className="sloganContainerRight">
            <h2 className="HPsloganTwo">Train with purpose, achieve with passion</h2>
         </div>
      </div>

      <div className="dynamicImageContainer">
        <div className="dynamicImageWrapper">
          <img
            className="dynamicImage"
            ref={dynamicImageRefs[0]}
            src="https://www.muscleandfitness.com/wp-content/uploads/2019/06/Twenty-Five-Percent-Growth-Strength.jpg?quality=86&strip=all"
            alt="Image Description"
          />
        </div>

        <div className="dynamicImageTextContainer">
          <h2>Unlock Your Potential</h2>
          <h1>Experience Strength Transformation</h1>
        </div>

        <div className="dynamicImageWrapper">
          <img
            className="dynamicImage"
            ref={dynamicImageRefs[1]}
            src="https://www.bodybuilding.com/fun/images/2015/beginners-guide-to-resistance-training-tablet-960x540.jpg"
            alt="Image Description"
          />
        </div>
      </div>

     

      {/* Digital Ticker */}
      <div className="tickerContainer">
        <div className="tickerContent">
          <ul className="tickerList">
            <li></li>
            <li>Sinew Strength Training!!</li>
            <li>Sinew Strength Training!!</li>
            <li>Sinew Strength Training!!</li>
            <li>Sinew Strength Training!!</li>
            <li>Sinew Strength Training!!</li>
            <li>Sinew Strength Training!!</li>
            <li>Sinew Strength Training!!</li>
          </ul>
        </div>
      </div>
      
      <div className="HPwomanDumbBellImage">
        <div className='HPwomanDumbellText'>
          <h3> "As a fitness coach, I'm always on the lookout for quality resources to recommend to my clients.
            This strength training website is hands down one of the best I've come across. The variety of workout
            plans caters to my demands, and the attention to detail in exercise explanations ensures that
            users get the most out of every workout. It's an invaluable tool for both beginners and experienced fitness
            enthusiasts alike."
            </h3>
           <h3 className='HPwomanDumbellQuote'>  Emily S. - Long-time Gym Goer</h3>
          
        </div>
      
        <img
          className="HPwomanDumbBellImage"
          ref={dynamicImageRefs[1]}
          src="https://www.byrdie.com/thmb/OrNyxtm_DhFfasz3iQuzpen6O_4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1289416088-351bf8ecc9c846be9419657522b625c6.jpg"
          alt="Image Description"
        />
        <video
          className="HPvideo"
          ref={videoRef}
          controls
          src="/videos/weightlift.mp4" // Replace this with your video URL or local path
          type="video/mp4"
        />
         <div className='HPwomanDumbellTextRight'>
          <h3>"I've tried numerous fitness websites, but none compare to the effectiveness and user-friendliness
            of this strength training platform. The workout routines are well-designed and target different muscle
            groups effectively. Thanks to this website, I've seen incredible gains in my strength and overall fitness
            level. Highly recommended!"
          </h3>
          <h3 className='HPwomanDumbellQuote'> Mike T. - Busy Professional and Fitness Novice</h3>
           
          
        </div>
      </div>
    </div>
  );
};

export default Home;
