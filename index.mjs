export default {
  async fetch(request, env, ctx) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hello World</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #05060f;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    background: var(--bg);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }

  .scene {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
  }

  /* Floating gradient orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.55;
    animation: float 14s ease-in-out infinite;
    will-change: transform;
  }
  .orb.a { width: 420px; height: 420px; background: #7b2ff7; top: 8%; left: 10%; animation-delay: 0s; }
  .orb.b { width: 360px; height: 360px; background: #f72f8e; bottom: 6%; right: 12%; animation-delay: -4s; }
  .orb.c { width: 300px; height: 300px; background: #2fd0f7; top: 40%; right: 30%; animation-delay: -8s; }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(40px, -50px) scale(1.1); }
    66% { transform: translate(-30px, 30px) scale(0.95); }
  }

  /* Grid backdrop */
  .grid {
    position: absolute;
    inset: -50%;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: rotateX(60deg);
    animation: gridMove 20s linear infinite;
    pointer-events: none;
  }
  @keyframes gridMove {
    from { background-position: 0 0; }
    to { background-position: 0 50px; }
  }

  .content {
    position: relative;
    z-index: 2;
    text-align: center;
    transform-style: preserve-3d;
    transition: transform 0.2s ease-out;
  }

  h1 {
    font-size: clamp(3rem, 14vw, 9rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    background: linear-gradient(120deg, #fff, #b388ff, #69f0ff, #fff);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 6s ease infinite, riseIn 1s ease both;
    text-shadow: 0 0 60px rgba(150, 120, 255, 0.3);
  }
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes riseIn {
    from { opacity: 0; transform: translateY(40px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  p.sub {
    margin-top: 1.5rem;
    font-size: clamp(1rem, 3vw, 1.4rem);
    color: rgba(255,255,255,0.6);
    letter-spacing: 0.4em;
    text-transform: uppercase;
    animation: riseIn 1s ease 0.3s both;
  }

  .cta {
    margin-top: 2.5rem;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 999px;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.05em;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    animation: riseIn 1s ease 0.6s both;
  }
  .cta:hover {
    background: rgba(255,255,255,0.14);
    border-color: rgba(255,255,255,0.4);
    transform: translateY(-3px);
    box-shadow: 0 10px 40px rgba(123, 47, 247, 0.4);
  }

  /* Vignette */
  .vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%);
    z-index: 1;
  }
</style>
</head>
<body>
  <div class="scene">
    <div class="grid"></div>
    <div class="orb a"></div>
    <div class="orb b"></div>
    <div class="orb c"></div>
    <div class="content" id="content">
      <h1>Hello, World</h1>
      <p class="sub">Welcome to the void</p>
      <a href="#" class="cta" id="cta">Say Hi ✨</a>
    </div>
  </div>
  <div class="vignette"></div>

<script>
  const content = document.getElementById('content');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    content.style.transform = 'rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg)';
  });

  const greetings = ['Hello, World', 'Bonjour', 'こんにちは', 'Hola', 'Olá', 'Ciao', 'नमस्ते', 'Привет'];
  let i = 0;
  const h1 = document.querySelector('h1');
  document.getElementById('cta').addEventListener('click', (e) => {
    e.preventDefault();
    i = (i + 1) % greetings.length;
    h1.style.animation = 'none';
    void h1.offsetWidth;
    h1.textContent = greetings[i];
    h1.style.animation = 'shimmer 6s ease infinite, riseIn 0.6s ease both';
  });
</script>
</body>
</html>`;
    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};