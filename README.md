<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="140" viewBox="0 0 600 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="text-mask">
      <text x="50%" y="85" font-family="Poppins, sans-serif" font-size="64" font-weight="800" text-anchor="middle">
        Sanny Un Sowadh
      </text>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="600" height="140" fill="url(#bgGrad)"/>
  
  <!-- Particle Animation -->
  <g filter="url(#glow)">
    <circle cx="100" cy="30" r="3" fill="#00e5ff">
      <animate attributeName="cx" from="0" to="600" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="cy" from="140" to="0" dur="6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="300" cy="100" r="2" fill="#ff00e5">
      <animate attributeName="cx" from="600" to="0" dur="7s" repeatCount="indefinite"/>
      <animate attributeName="cy" from="0" to="140" dur="5s" repeatCount="indefinite"/>
    </circle>
    <!-- add more particles as desired -->
  </g>
  
  <!-- Scrolling Gradient -->
  <rect width="600" height="140" clip-path="url(#text-mask)" fill="url(#bgGrad)">
    <animate attributeName="x" from="-600" to="600" dur="5s" repeatCount="indefinite"/>
  </rect>
  
  <!-- Text -->
  <text x="50%" y="85" font-family="Poppins, sans-serif" font-size="64" font-weight="800" text-anchor="middle" fill="url(#bgGrad)" filter="url(#glow)">
    Sanny Un Sowadh
  </text>
</svg>


<!-- README.md -->

<!-- Animated SVG Header -->
<div align="center">
  <img src="assets/name-animation.svg" alt="Sanny Un Sowadh Wamik" width="600"/>
</div>

[![Typing SVG](https://readme-typing-svg.demolab.com/?lines=Data+Scientist+%7C+ML+%26+AI+Enthusiast;Building+Future+with+Data;Let%27s+Code+and+Create!&center=true&width=500&height=50&color=00ff99)](https://git.io/typing-svg)

---

<div align="center">
  <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" width="300" alt="Neon code animation"/>
</div>

---

## 🚀 About Me

🎓 Data Science Student @ **RMIT University, Melbourne**  
🛠️ Crafting: ML Models · Data Pipelines · Predictive Analytics  
🎯 Kaggle Competitor · Discord MusicBot Lead · Cybersecurity Explorer  
📫 Reach me: [sannyunsowadh01@gmail.com](mailto:sannyunsowadh01@gmail.com)

---

## 🛠️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white&animation=spin) 
![R](https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=r&logoColor=white&animation=spin) 
![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white&animation=spin) 
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white&animation=spin)  

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white&animation=spin) 
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white&animation=spin) 
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white&animation=spin)  

![Scikit-Learn](https://img.shields.io/badge/Scikit%20Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white&animation=spin) 
![LightGBM](https://img.shields.io/badge/LightGBM-8BC34A?style=for-the-badge&logo=lightgbm&logoColor=white&animation=spin)

---

## 🏆 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Sanny-Un-Sowadh-Wamik&show_icons=true&theme=radical&count_private=true&ring=FFFFFF" height="180px"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Sanny-Un-Sowadh-Wamik&layout=compact&theme=radical&hide_border=true" height="180px"/>
  <br/>
  <img src="https://streak-stats.demolab.com?user=Sanny-Un-Sowadh-Wamik&theme=radical&fire=00ff99" alt="GitHub Streak"/>
</div>

---

## 📚 Projects Showcase

<div align="center">
  <a href="https://github.com/Sanny-Un-Sowadh-Wamik/MusicBot" target="_blank" style="margin: 10px;">
    <img src="https://img.shields.io/badge/🎵 MusicBot-1DB954?style=for-the-badge&logo=discord&logoColor=white" alt="MusicBot"/>
  </a>
  <a href="https://www.kaggle.com/competitions/kaggle-playground-series-season-4/leaderboard" target="_blank" style="margin: 10px;">
    <img src="https://img.shields.io/badge/🧠 Depression+Prediction-F7931E?style=for-the-badge&logo=kaggle&logoColor=white" alt="Depression Prediction"/>
  </a>
  <a href="https://github.com/Sanny-Un-Sowadh-Wamik/Titanic-ML" target="_blank" style="margin: 10px;">
    <img src="https://img.shields.io/badge/🚢 Titanic+Predictor-0052CC?style=for-the-badge&logo=apache&logoColor=white" alt="Titanic Predictor"/>
  </a>
  <a href="https://github.com/Sanny-Un-Sowadh-Wamik/House-Prices" target="_blank" style="margin: 10px;">
    <img src="https://img.shields.io/badge/🏡 House+Prices-7B1FA2?style=for-the-badge&logo=homeassistant&logoColor=white" alt="House Prices"/>
  </a>
  <a href="https://github.com/Sanny-Un-Sowadh-Wamik/Data-Pipeline" target="_blank" style="margin: 10px;">
    <img src="https://img.shields.io/badge/🛒 E-commerce+Pipeline-009688?style=for-the-badge&logo=python&logoColor=white" alt="E-commerce Pipeline"/>
  </a>
</div>

---

## 📫 Connect With Me

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sanny-un-sowadh-wamik)  
[![GitHub](https://img.shields.io/badge/-GitHub-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sanny-Un-Sowadh-Wamik)  

---

🌟 _Let’s make data dance!_ 🌟  
