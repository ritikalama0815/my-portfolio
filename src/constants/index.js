import {ta, oa, ra } from "../assets/images";
import {
    contact,
    css,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    java,
    sql,
    nextjs,
    nodejs,
    c,
    r,
    c1,
    react,
    python,
    vscode,
    tailwindcss,
    book,
    game,
    person,
    research, ai_interviewer,
    inventory,
    plawnet, emotion, forestfire, assistant, dna, game2, group, money, prokaryotic
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: c1,
        name: "C",
        type: "Development",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: vscode,
        name: "Visual Studio Code",
        type: "Development Tool",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Development",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Development",
    },
    {
        imageUrl: sql,
        name: "SQL",
        type: "Database",
    },
    {
        imageUrl: c,
        name: "C++/C",
        type: "Frontend",
    },
    {
        imageUrl: r,
        name: "R",
        type: "Data Science",
    },
];

export const experiences = [
    {
        title: "Researcher",
        company_name: "Computer Science Dept, Truman State University",
        icon: ra,
        iconBg: "#accbe1",
        date: "Novemver 2023 - May 2026",
        points: [
            "Designed, analyzed, and implemented the deep learning and neural network architecture",
            "Performed the data collection of more than 30000 images and used them to train and test the model.",
            "Participated in research meetings, presentation, and contributed to ideas for further development.",
            "Contributed to documentation of journals, papers, and reports.",
        ],
    },
    {
        title: "Teacher's Assistant",
        company_name: "Truman State University",
        icon: ta,
        iconBg: "#fbc3bc",
        date: "Jan 2023 - May 2026",
        points: [
            "Assisted more than 20 students with lectures, course materials, and assignments for Python and C++.",
            "Evaluated, and graded more than 50 coding assignments and projects.",
            "Assisted students with code debugging and understanding error messages.",
            "Participating in code reviews and providing constructive feedback to students.",
        ],
    },
    {
        title: "Summer RA",
        company_name: "Truman State University",
        icon: assistant,
        iconBg: "#b7e4c7",
        date: "May 2025 - July 2025",
        points: [
            "Provided support and guidance to residents during the summer session.",
            "Volunteered in Missouri Summer Special Olympics.",
            "Responded to emergencies and provided assistance to residents.",
            "Collaborated with other staff members to ensure the safety and well-being of residents.",
        ],
    },
    {
        title: "Office Assistant",
        company_name: "Truman State University",
        icon: oa,
        iconBg: "#b7e4c7",
        date: "Jan 2023 - dec 2023",
        points: [
            "Managed correspondence, scheduled meetings, and maintained the calenders in the department.",
            "Handled student inquiries and paperworks.",
            "Maintained the department website and bulletin boards.",
            "Provided technical support and coordinate with IT department.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/ritikalama0815',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/ritika-lama-b2605b2a4/',
    }
];

export const projects = [
    {
        iconUrl: research,
        theme: 'btn-back-yellow',
        name: 'Lung and Colon Cancer Research',
        description: 'A deep learning model used to train and test the LC25000 dataset and improved it to achieve 100% accuracy on lung and colon cancer detection.',
        link: 'https://www.mdpi.com/2072-6694/16/22/3879',
    },
    {
        iconUrl: inventory,
        theme: 'btn-back-red',
        name: 'Inventory Management System',
        description: 'A web application that helps users, specifically U&I services at Truman State University to manage and keep track of the items in the inventory.',
        link: 'https://github.com/shibampokerail/InventoryManagementSystem',
    },
    {
        iconUrl: forestfire,
        theme: 'btn-back-red',
        name: 'Wildfire Prediction',
        description: 'A deep learning model used to predict the wildfire based on satellite imagery utilizing EfficientNet-b0 backbone',
        link: 'https://github.com/ritikalama0815/wildfire-detection',
    },
    {
        iconUrl: group,
        theme: 'btn-back-blue',
        name: 'CoLab',
        description: 'A webapp that allows to track how much each student contributed in a group assignment. This is a Hackathon project for theme "AI to solve student\'s problem" (won Special Mention in Developer\'s category).',
        link: 'https://github.com/ritikalama0815/CoLab',
    },
    {
        iconUrl: person,
        theme: 'btn-back-yellow',
        name: 'My Portfolio',
        description: 'You\'re currently looking at this project. It sums up my skills and projects while showcasing the 3D rendering of objects.',
        link: 'https://github.com/ritikalama0815/3d-objects',
    },
    {
        iconUrl: money,
        theme: 'btn-back-red',
        name: 'Currency Converter',
        description: 'A web application that allows users to convert currency from one to another using real-time exchange rates (this is java and API practice project).',
        link: 'https://github.com/ritikalama0815/curr-converter',
    },
    {
        iconUrl: dna,
        theme: 'btn-back-blue',
        name: 'Bioinformatics Sequence Analysis',
        description: 'This project focuses on analysis of DNA and protein sequences to calculate transversion ratio and transmembrane region predictor.',
        link: 'https://github.com/ritikalama0815/bioinformatics',
    },
    {
        iconUrl: plawnet,
        theme: 'btn-back-red',
        name: 'Plawnet',
        description: 'An e-commerce application for buying and selling of sustainable products. Hackathon project on theme "Sustainability" (won 1st place in beginner category).',
        link: 'https://github.com/ritikalama0815/Plawnet_truhacks',
    },
    {
        iconUrl: ai_interviewer,
        theme: 'btn-back-pink',
        name: 'AI Interviewer',
        description: 'A web application that helps users to prepare for the interview in various tech companies and in various positions and giving them feedback based on their answers.',
        link: 'https://github.com/ritikalama0815/interview-prep',
    },
    {
        iconUrl: game,
        theme: 'btn-back-green',
        name: 'Arena Game',
        description: 'A simple web game that allows user to move freely within the arena to collect some "coins" that helps users to get the points',
        link: 'https://github.com/ritikalama0815/arena-game',
    },
    {
        iconUrl: emotion,
        theme: 'btn-back-black',
        name: 'Emotion Detection',
        description: 'A website that detects the emotion of a user based on their facial expression and gives them the feedback.',
        link: 'https://github.com/ritikalama0815/CS480---Final-Project',
    }, 
    {
        iconUrl: prokaryotic,
        theme: 'btn-back-blue',
        name: 'Prokaryotic Promoter Finder',
        description: 'This project focuses on finding the promoter region in the prokaryotic DNA sequence.',
        link: 'https://github.com/ritikalama0815/prokaryotic-promoter-finder',
    },
    {
        iconUrl: game2,
        theme: 'btn-back-blue',
        name: 'Analysis of Player\'s Behavior',
        description: 'This project examines how player activity and engagement relate to in-game spending (one of my data science projects).',
        link: 'https://github.com/ritikalama0815/Analysis-of-Player-s-Behavior',
    },
    {
        iconUrl: book,
        theme: 'btn-back-blue',
        name: 'Recipe Book',
        description: 'A book that has recipes of everything users ask for.',
        link: 'https://github.com/ritikalama0815/Recipe',
    },
];
