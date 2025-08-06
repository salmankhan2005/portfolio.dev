import React, { useEffect, useRef, forwardRef } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = forwardRef(({ animationPath, loop = true, autoplay = true, onError }, ref) => {
  const containerRef = useRef(null);
  const animationInstanceRef = useRef(null);

  useEffect(() => {
    if (!animationPath) {
      console.error('No animation path provided');
      onError?.();
      return;
    }

    const loadAnimation = async () => {
      try {
        console.log('Loading animation from:', animationPath);
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Animation data loaded successfully');

        if (animationInstanceRef.current) {
          animationInstanceRef.current.destroy();
        }

        animationInstanceRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop,
          autoplay,
          animationData: data,
        });

        if (ref) {
          if (typeof ref === 'function') {
            ref(animationInstanceRef.current);
          } else {
            ref.current = animationInstanceRef.current;
          }
        }

        // Add error event listener
        animationInstanceRef.current.addEventListener('error', (error) => {
          console.error('Lottie animation error:', error);
          onError?.();
        });

      } catch (error) {
        console.error('Error loading animation:', error);
        onError?.();
      }
    };

    loadAnimation();

    return () => {
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }
    };
  }, [animationPath, loop, autoplay, ref, onError]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minWidth: '32px', minHeight: '32px' }}
    />
  );
});

LottieAnimation.displayName = 'LottieAnimation';

export default LottieAnimation; 