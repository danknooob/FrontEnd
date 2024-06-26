import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';

const Profile = () => {
  const comp = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useLayoutEffect(() => {
    const t1 = gsap.timeline();

    t1.from("#intro-slider", {
      xPercent: "-100",
      duration: 1.3,
      delay: 0.3,
    })
      .from("#title-1", {
        opacity: 0,
        y: "+=30",
        duration: 0.5,
        stagger: 0.1,
      })
      .from("#title-2", {
        opacity: 0,
        y: "+=30",
        duration: 0.5,
        stagger: 0.1,
      })
      .from("#title-3", {
        opacity: 0,
        y: "+=30",
        duration: 0.5,
        stagger: 0.1,
      })
      .to(["#title-1", "#title-2", "#title-3"], {
        opacity: 0,
        y: "-=30",
        delay: 0.3,
        stagger: 0.5,
      })
      .to("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
      })
      .from("#welcome", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Blinking animation loop
          gsap.to("#welcome", { opacity: 0, duration: 0.5, delay: 0.5, yoyo: true, repeat: -1 });
          // Show the button after the welcome message starts blinking
          setShowButton(true);
        },
      });

    return () => t1.kill();
  }, []);

  useLayoutEffect(() => {
    if (showButton) {
      gsap.fromTo("#btn", 
        { x: '-100vw', opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.3, ease: 'power1.out', rotation: 360, }
      );
    }
  }, [showButton]);

  return (
    <div className="relative" ref={comp}>
      <div
        id="intro-slider"
        className="h-screen p-10 bg-blue-400 text-white absolute top-0 left-0 font-spaceGrotesk z-10 w-full flex flex-col gap-10 tracking-tight"
      >
        <h1 className="text-9xl" id="title-1">
          Connect
        </h1>
        <h1 className="text-9xl" id="title-2">
          Create
        </h1>
        <h1 className="text-9xl" id="title-3">
          Conquer
        </h1>
      </div>
      <div className="h-screen flex flex-col bg-yellow-200 justify-center items-center space-y-6">
        <h1
          id="welcome"
          className="text-9xl font-bold text-red-400 font-spaceGrotesk"
        >
          Looking for Saas Solution, you are the best place!
        </h1>
        {showButton && (
          <button className="text-2xl btn btn-outline btn-secondary" id="btn">
            ClickBate
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;