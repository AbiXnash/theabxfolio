type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 120;
const MOUSE_DISTANCE = 100;

export function initializeParticles(canvas: HTMLCanvasElement | null): void {
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let animationFrameId = 0;
  const mouse: { x: number | null; y: number | null } = { x: null, y: null };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };

  const createParticle = (): Particle => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.2,
  });

  const drawParticle = (particle: Particle) => {
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 107, 53, ${particle.alpha})`;
    context.fill();
  };

  const drawConnection = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    alpha: number,
    lineWidth: number,
  ) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = `rgba(255, 107, 53, ${alpha})`;
    context.lineWidth = lineWidth;
    context.stroke();
  };

  const connectParticles = () => {
    for (let index = 0; index < particles.length; index += 1) {
      for (
        let comparisonIndex = index + 1;
        comparisonIndex < particles.length;
        comparisonIndex += 1
      ) {
        const firstParticle = particles[index];
        const secondParticle = particles[comparisonIndex];
        const dx = firstParticle.x - secondParticle.x;
        const dy = firstParticle.y - secondParticle.y;
        const distance = Math.hypot(dx, dy);

        if (distance < CONNECTION_DISTANCE) {
          const alpha = (1 - distance / CONNECTION_DISTANCE) * 0.15;
          drawConnection(
            firstParticle.x,
            firstParticle.y,
            secondParticle.x,
            secondParticle.y,
            alpha,
            0.5,
          );
        }
      }
    }
  };

  const connectToMouse = () => {
    if (mouse.x === null || mouse.y === null) {
      return;
    }

    for (const particle of particles) {
      const distance = Math.hypot(particle.x - mouse.x, particle.y - mouse.y);

      if (distance < MOUSE_DISTANCE) {
        const alpha = (1 - distance / MOUSE_DISTANCE) * 0.3;
        drawConnection(particle.x, particle.y, mouse.x, mouse.y, alpha, 0.8);
      }
    }
  };

  const update = () => {
    context.clearRect(0, 0, width, height);

    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
      }

      drawParticle(particle);
    }

    connectParticles();
    connectToMouse();
    animationFrameId = window.requestAnimationFrame(update);
  };

  const handleResize = () => {
    resize();
    particles = particles.filter((particle) => particle.x < width && particle.y < height);

    while (particles.length < PARTICLE_COUNT) {
      particles.push(createParticle());
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  };

  const handleMouseOut = () => {
    mouse.x = null;
    mouse.y = null;
  };

  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseout", handleMouseOut);

  update();

  window.addEventListener(
    "beforeunload",
    () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    },
    { once: true },
  );
}
