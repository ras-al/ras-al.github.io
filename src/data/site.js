// Rasal Musthafa Portfolio Data Configuration
// Placeholders to be customized are explicitly marked with TODO comments.

export const PROFILE = {
  name: 'Rasal Musthafa',
  headline: 'Computer Science & Engineering Student | Robotics & Computer Vision | Full-Stack Development',
  summary: 'Computer Science & Engineering student exploring Robotics, Edge Computing, Computer Vision, Machine Learning, and Full-Stack Development. Interested in building practical projects, learning emerging technologies, and gaining experience in intelligent and autonomous systems.',
  email: 'rasalmusthafa.k@gmail.com',
  phone: '+91-8590918069',
  showPhone: false, // Phone number hidden unless explicitly enabled
  links: {
    github: 'https://github.com/ras-al',
    linkedin: 'https://linkedin.com/in/rasalmusthafa',
    leetcode: '#', // TODO: Add exact LeetCode profile URL
    resume: '/Rasal_Musthafa_Resume.pdf'
  }
};

export const EDUCATION = {
  school: 'T.K.M College of Engineering',
  place: 'Kollam, Kerala',
  degree: 'B.Tech in Computer Science & Engineering',
  cgpa: '9.48/10.0',
  years: '2024-2028',
  coursework: [
    'Data Structures & Algorithms',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
    'Computer Architecture'
  ]
};

export const EXPERIENCE = [
  {
    role: 'Web Master',
    org: 'IEEE Circuits and Systems Society Kerala Chapter',
    place: 'Kerala',
    dates: 'Mar 2026 - Present',
    bullets: [
      'Develop and maintain web platforms for the IEEE CASS Kerala Chapter, supporting technical events, member engagement, and organizational activities.',
      'Build responsive interfaces and automate web workflows to streamline event and content management.'
    ]
  },
  {
    role: 'Web Team Lead',
    org: 'IEEE SB TKMCE',
    place: 'Kollam',
    dates: 'Mar 2026 - Present',
    bullets: [
      'Lead the web team in developing and deploying responsive websites and digital platforms for IEEE student activities and events.',
      'Coordinate development workflows using Git and modern web technologies while reviewing and integrating team contributions.'
    ]
  },
  {
    role: 'Tech Head - Full Stack Developer',
    org: 'Produit Academy',
    place: 'Startup',
    dates: 'Oct 2025 - Present',
    bullets: [
      'Develop full-stack applications using React.js, Next.js, Django, Node.js, and PostgreSQL.',
      'Design REST APIs, database schemas, authentication flows, and deployment workflows for web applications.',
      'Collaborate on application architecture, feature development, debugging, and code quality.'
    ]
  },
  {
    role: 'Research Intern - Computer Vision & Robotics',
    org: 'AGCL Lab, Indian Institute of Technology Madras',
    place: 'Chennai, India',
    dates: 'May 20, 2026 - Jun 26, 2026',
    featured: true,
    bullets: [
      'Worked on computer vision, visual SLAM, and 3D scene reconstruction in a research-driven robotics environment.',
      'Explored and implemented research frameworks including SplaTAM and MonoGS for vision-based 3D reconstruction and SLAM.',
      'Gained practical experience with visual perception, camera-based localization, and reconstruction pipelines for robotic systems.'
    ]
  },
  {
    role: 'Reserve Software Team Member',
    org: 'DRONA TKMCE - SAE TKMCE',
    place: 'Kollam',
    dates: 'Jun 2025 - Apr 2026',
    bullets: [
      'Contributed to UAV software development for autonomous drone applications and competition systems.',
      'Developed computer vision pipelines using OpenCV and MediaPipe for real-time gesture recognition.',
      'Worked on deep-learning-based gesture classification for UAV control and search-and-rescue applications.'
    ]
  },
  {
    role: 'Network Technician',
    org: 'Keralavision Broadband Limited',
    place: 'Kannur',
    dates: 'Jul 2024 - Sep 2024',
    bullets: [
      'Assisted with broadband network installation, troubleshooting, and maintenance.',
      'Diagnosed connectivity issues and supported field-level network operations.'
    ]
  }
];

export const PROJECTS = [
  {
    title: 'Autonomous Warehouse Mapping Robot',
    featured: true,
    repo: 'https://github.com/ras-al', // TODO: Add exact repository URL
    stack: ['ROS2', 'Gazebo', 'SLAM Toolbox'],
    bullets: [
      'Developed an autonomous exploration and mapping pipeline for a differential-drive Romi robot using ROS2 and Gazebo.',
      'Implemented hybrid potential-field navigation with obstacle avoidance, novelty-based exploration, and autonomous recovery behaviors.',
      'Integrated LiDAR, IMU, wheel encoder, and RGB-D camera data using sensor fusion for localization and mapping.',
      'Generated synchronized RGB, depth, point-cloud, odometry, and ground-truth datasets for 3D reconstruction research.',
      'Built occupancy-grid maps using SLAM Toolbox and automated data collection for COLMAP and NeRF-based reconstruction workflows.'
    ]
  },
  {
    title: 'AI Gesture-Controlled Drone',
    repo: 'https://github.com/ras-al', // TODO: Add exact repository URL
    stack: ['MediaPipe', 'OpenCV', 'TensorFlow Lite', 'YOLO'],
    bullets: [
      'Engineered a real-time gesture recognition pipeline using MediaPipe Pose and skeletal feature extraction for drone control.',
      'Trained sequential deep-learning models to classify ICAO/IMO search-and-rescue gestures.',
      'Integrated lightweight object-detection models including EfficientDet-Lite and YOLOv3-Tiny for edge-oriented visual perception.'
    ]
  },
  {
    title: 'DonorLink - Smart Blood Bank System',
    repo: 'https://github.com/ras-al', // TODO: Add exact repository URL
    stack: ['React.js', 'Django', 'PostgreSQL'],
    bullets: [
      'Developed a full-stack platform connecting hospitals, organizations, and blood donors through a React frontend and Django backend.',
      'Implemented AI-assisted donor matching using geographic proximity and blood-group compatibility for emergency requests.',
      'Built role-based dashboards for donors, hospitals, and administrators with inventory and request management.',
      'Integrated OpenStreetMap-based location services to support geographically relevant donor matching.'
    ]
  }
];

export const SKILLS = {
  'Languages': ['Python', 'C++', 'Java', 'C', 'JavaScript', 'HTML/CSS'],
  'Frameworks & Backend': ['React.js', 'Next.js', 'Node.js', 'Django', 'REST APIs'],
  'Databases': ['PostgreSQL', 'Firebase Firestore', 'MongoDB'],
  'Robotics & Simulation': ['ROS2', 'Gazebo', 'SLAM Toolbox', 'Robot Localization', 'PyBullet'],
  'AI & Computer Vision': ['OpenCV', 'MediaPipe', 'TensorFlow Lite', 'YOLO', 'Machine Learning'],
  'Tools': ['Git', 'Linux'],
  'Core Areas': [
    'Data Structures & Algorithms',
    'Robotics',
    'Autonomous Navigation',
    'SLAM',
    'Computer Vision',
    'Machine Learning',
    'Full-Stack Development'
  ]
};

export const CERTIFICATIONS = [
  {
    title: 'Computer Architecture and Organization',
    issuer: 'NPTEL',
    date: 'Nov 2025'
  },
  {
    title: 'The Joy of Computing using Python',
    issuer: 'NPTEL',
    date: 'May 2025'
  },
  {
    title: 'Getting Started with Linux Fundamentals (RH104)',
    issuer: 'Red Hat',
    date: 'Jan 2025'
  },
  {
    title: 'The Basics of Google Cloud Compute',
    issuer: 'Google Cloud Skills Boost',
    date: 'Oct 2024'
  }
];

// Profile portrait path
export const PROFILE_IMAGE = '/images/rasal.jpg';
