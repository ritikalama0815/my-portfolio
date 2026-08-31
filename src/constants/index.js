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
    plawnet, emotion, forestfire, assistant, dna, game2, group, money, prokaryotic, angular, PostgreSQL, aws
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: angular,
        name: "Angular",
        type: "Frontend",
    },
    {
        imageUrl: aws,
        name: "AWS",
        type: "Cloud computing",
    },
    {
        imageUrl: PostgreSQL,
        name: "PostgreSQL",
        type: "Database",
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
        title: "Machine Learning Researcher",
        company_name: "Computer Science Department",
        icon: ra,
        iconBg: "#accbe1",
        date: "Novemver 2023 - May 2026",
        points: [
            "I designed and implemented deep learning solutions for applied research projects and developed high-performing (high accuracy + low computational costs) neural networks while contributing to research publications and experimental studies.",
            "I build machine learning models using Python and PyTorch, design experiments, preprocess large datasets, tune hyperparameters, and evaluate model performance across multiple architectures.",
            "I contributed to technical documentation, literature reviews, research papers, and collaborate with other faculty and student researchers throughout the entire research lifecycle."        ],
    },
    {
        title: "Teacher's Assistant",
        company_name: "Truman State University",
        icon: ta,
        iconBg: "#fbc3bc",
        date: "Jan 2023 - May 2026",
        points: [
            "I support students in developing strong programming foundations and work closely with faculty to conduct lab sessions and provide academic support. ",
            "I led weekly laboratory sessions, provided one-on-one debugging assistance, and explained programming concepts including variables, functions, loops, object-oriented programming, and algorithmic thinking. ",
            "I assisted with grading assignments, providing feedback, and supporting exam reviews."
        ],
    },
    {
        title: "Resident Assistant",
        company_name: "Truman State University",
        icon: assistant,
        iconBg: "#b7e4c7",
        date: "May 2025 - July 2025",
        points: [
            "I supported the daily operations of university housing while ensuring a positive living environment for students and summer program participants.",
            "I served as the first point of contact for residents by addressing concerns even late nights, facilitating room transitions, assisting with check-in and check-out procedures, and coordinating accommodations during the Missouri Special Olympics housing program.",
            "I worked alongside Residence Life staff to coordinate housing logistics and provide exceptional resident support."
        ],
    },
    {
        title: "Office Assistant",
        company_name: "Truman State University",
        icon: oa,
        iconBg: "#b7e4c7",
        date: "Jan 2023 - Dec 2023",
        points: [
            "I supported daily administrative operations while serving as a resource for students, faculty, and visitors during my time as an office assistant in the Computer Science Department. ",
            "I organized departmental records, managed documentation, assisted students with administrative inquiries, and coordinated office operations to support faculty and staff activities.",
            "My responsibilities focused on maintaining efficient departmental workflows and ensuring timely communication across multiple people."
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
        name: 'Lung and Colon Cancer Detection Using Deep AI',
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
