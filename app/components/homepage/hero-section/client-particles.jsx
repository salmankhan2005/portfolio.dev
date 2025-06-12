'use client';

import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { useCallback, useMemo } from "react";

const ClientParticles = () => {
  const options = useMemo(() => {
    return {
      background: {
        color: "#0d1224",
      },
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 10,
          },
          repulse: {
            distance: 100,
          },
        },
      },
      particles: {
        links: {
          enable: true,
          distance: 150,
          color: "#1a1443", // Darker lines to match background
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: 1,
        },
        color: {
          value: "#1a1443", // Darker particles to match background
        },
      },
    };
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
};

export default ClientParticles; 