import { useEffect } from 'react';
import PropTypes from 'prop-types'; 
import Lenis from '@studio-freight/lenis';

const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
     
      // console.log({ scroll, limit, velocity, direction, progress });
    // });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
    };
  }, []);

  return <div>{children}</div>;
};


SmoothScrollWrapper.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default SmoothScrollWrapper;
