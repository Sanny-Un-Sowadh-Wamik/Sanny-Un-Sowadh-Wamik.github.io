// Initial data for the portfolio - can be modified via admin dashboard

export const initialData = {
  profile: {
    name: "Sanny Un Sowadh Wamik",
    title: "Data Scientist",
    tagline: "A data scientist by day, problem-solver by night!",
    bio: "I'm a Data Science student at RMIT University, passionate about turning raw data into meaningful insights. My focus lies in machine learning, statistical analysis, and data visualization.",
    about: `I'm a dedicated Data Science student at RMIT University, passionate about harnessing the power of data to solve real-world challenges. My approach blends technical skills with creative problem-solving, always seeking efficient, data-driven solutions.

With a strong foundation in Python and R, I specialize in building predictive models and extracting insights from complex datasets. My interests span machine learning, statistical analysis, and data visualization—constantly exploring new techniques to push the boundaries of what's possible.

I thrive in collaborative environments, valuing both teamwork and individual contributions. Whether it's refining algorithms or crafting compelling visualizations, I'm committed to delivering impactful solutions.`,
    email: "sannyunsowadh01@gmail.com",
    location: "Melbourne, Victoria, Australia",
    resumeLink: "/Sanny-Un-Sowadh.pdf",
    social: {
      github: "https://github.com/Sanny-Un-Sowadh-Wamik",
      linkedin: "https://linkedin.com/in/sanny-un-sowadh-wamik",
    },
    superpower: "Transforming raw data into actionable insights!",
  },

  skills: [
    { id: 1, name: "Python", category: "Language", icon: "FaPython" },
    { id: 2, name: "R", category: "Language", icon: "SiR" },
    { id: 3, name: "Pandas", category: "Library", icon: "SiPandas" },
    { id: 4, name: "NumPy", category: "Library", icon: "SiNumpy" },
    { id: 5, name: "Matplotlib", category: "Library", icon: "SiPlotly" },
    { id: 6, name: "ggplot2", category: "Library", icon: "SiR" },
    { id: 7, name: "dplyr", category: "Library", icon: "SiR" },
    { id: 8, name: "SQL", category: "Tool", icon: "SiMysql" },
    { id: 9, name: "Jupyter Notebook", category: "Tool", icon: "SiJupyter" },
    { id: 10, name: "RStudio", category: "Tool", icon: "SiRstudio" },
    { id: 11, name: "Git", category: "Tool", icon: "FaGitAlt" },
    { id: 12, name: "PyCharm", category: "Tool", icon: "SiPycharm" },
    { id: 13, name: "VS Code", category: "Tool", icon: "SiVisualstudiocode" },
    { id: 14, name: "Machine Learning", category: "Domain", icon: "FaBrain" },
    { id: 15, name: "Statistical Analysis", category: "Domain", icon: "FaChartBar" },
    { id: 16, name: "Data Protection", category: "Domain", icon: "FaShieldAlt" },
  ],

  projects: [
    {
      id: 1,
      title: "Music Bot",
      description: "A Discord bot that streams music with advanced queue management, supporting multiple audio sources and seamless playback.",
      role: "Team Lead",
      technologies: ["Python", "Wavelink API", "Lavalink", "Discord.py"],
      github: "https://github.com/Sanny-Un-Sowadh-Wamik/music-bot",
      gradient: "from-purple-500 to-pink-500",
      featured: true,
    },
    {
      id: 2,
      title: "Depression Prediction",
      description: "2024 Kaggle Playground Series competition entry, predicting depression likelihood using machine learning. Achieved ROC-AUC: 0.94125.",
      role: "Solo Project",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "LightGBM"],
      kaggle: true,
      gradient: "from-blue-500 to-cyan-500",
      featured: true,
    },
    {
      id: 3,
      title: "Data Preprocessing Pipeline",
      description: "Comprehensive data preprocessing pipeline for e-commerce clothing reviews, featuring data cleaning, transformation, and XML parsing.",
      role: "RMIT Project",
      technologies: ["Python", "Pandas", "ElementTree", "Data Wrangling"],
      gradient: "from-green-500 to-emerald-500",
      featured: true,
    },
    {
      id: 4,
      title: "Titanic - ML from Disaster",
      description: "Classic Kaggle competition predicting passenger survival on the Titanic. Achieved 76.794% accuracy using ensemble methods.",
      role: "Solo Project",
      technologies: ["Python", "Random Forest", "Logistic Regression", "Cross-validation"],
      kaggle: true,
      gradient: "from-orange-500 to-red-500",
      featured: true,
    },
    {
      id: 5,
      title: "House Prices Prediction",
      description: "Advanced regression techniques on the Ames Housing dataset with 79 features. Achieved RMSE: 0.12099 using ensemble learning.",
      role: "Solo Project",
      technologies: ["Python", "Ensemble Learning", "XGBoost", "LightGBM"],
      kaggle: true,
      gradient: "from-violet-500 to-purple-500",
      featured: true,
      wide: true,
    },
  ],

  education: [
    {
      id: 1,
      degree: "Bachelor of Data Science",
      institution: "RMIT University",
      period: "Expected June 2027",
      description: "Focusing on machine learning, statistical analysis, and data visualization.",
      coursework: [
        "Practical Data Science",
        "Advanced Programming",
        "Data Visualization",
        "AI Foundations",
        "Statistics for Data Science",
        "Object-Oriented Programming",
      ],
      current: true,
    },
  ],

  activities: [
    {
      id: 1,
      title: "RMIT CSIT Society",
      role: "Member",
      period: "August 2024 - Present",
      description: "Active member participating in tech events and networking with industry professionals.",
    },
    {
      id: 2,
      title: "Notre Dame International Understanding Club",
      role: "Organizer",
      period: "2021 - 2023",
      description: "Led cultural exchange initiatives and organized international events fostering global understanding.",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Coming Soon",
      role: "Future Collaborator",
      content: "Testimonials from collaborators and mentors will appear here.",
      avatar: null,
    },
  ],

  stats: {
    projectsCompleted: 5,
    skillsLearned: 16,
    githubRepos: 10,
    yearsLearning: 2,
  },
};

export default initialData;
