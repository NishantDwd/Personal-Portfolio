from fastapi import APIRouter
from models.portfolio import Portfolio, PersonalInfo, TechStack, Project, Education, Contact
from datetime import datetime

router = APIRouter()

# Get database connection
from ..server import db

@router.post("/init-portfolio")
async def initialize_portfolio():
    """Initialize portfolio with Nishant's data"""
    
    # Check if portfolio already exists
    existing_portfolio = await db.portfolio.find_one({"active": True})
    if existing_portfolio:
        return {"message": "Portfolio already exists"}
    
    # Create Nishant's portfolio data
    portfolio_data = {
        "id": "nishant_portfolio_2025",
        "active": True,
        "personal": {
            "name": "Nishant Kumar Dwivedi",
            "title": "Full Stack Developer",
            "location": "India",
            "bio": "I'm a passionate full-stack developer skilled in building scalable web applications using React, Node.js, MongoDB, Express.js, TailwindCSS, and more. I architect efficient backend systems, design intuitive UIs, and optimize performance for real-world impact. With hands-on experience in web development, AI, and RESTful APIs, I thrive on turning complex problems into clean, maintainable code. Tech isn't just my job—it's my playground.",
            "profile_image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            "hero_background": "https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg"
        },
        "tech_stack": {
            "languages": ["C++", "JavaScript", "SQL"],
            "frameworks": ["React.js", "Node.js", "Express.js", "Next.js", "TailwindCSS", "Vite", "Remix"],
            "tools": ["Socket.io", "REST APIs", "Git", "Docker", "Zustand"],
            "databases": ["MySQL", "MongoDB"]
        },
        "projects": [
            {
                "id": "wechat_project",
                "name": "WeChat",
                "description": "A full-stack chat app enabling secure, real-time messaging with dynamic sync across users",
                "details": "Engineered a responsive chat interface using React.js and Tailwind CSS, delivering intuitive UI/UX and improving user interaction time by 40%. Orchestrated real-time communication using Socket.IO, reducing message delivery latency to under 20ms. Constructed a scalable backend using Node.js, Express.js and MongoDB supporting 500+ concurrent users and securing access via JWT authentication, reducing unauthorized logins by 95%.",
                "technologies": ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "Tailwind CSS"],
                "live_link": "https://wechat-8o7y.onrender.com/",
                "github_link": "https://github.com/NishantDwd/WeChat",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmR8ZW58MHx8fHwxNzUyNTY4NDcxfDA&ixlib=rb-4.1.0&q=85",
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "id": "weathere_project",
                "name": "Weathere",
                "description": "A real-time weather app with a personalized dashboard and live global forecasts",
                "details": "Provides real-time features like temperature, wind speed, humidity, and feels-like, along with a 5-day forecast. Enhanced backend efficiency by 30% and added an interactive dashboard with charts and a blog section. Implemented a user-friendly UI/UX for seamless weather exploration, featuring live weather insights with 95% accuracy. The app also offers alerts, favorites and history management for a personalized experience.",
                "technologies": ["React.js", "Vite", "Node.js", "Express.js", "MySQL", "TailwindCSS"],
                "live_link": "https://weathere-1.onrender.com/",
                "github_link": "https://github.com/NishantDwd/Weathere",
                "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbnxlbnwwfHx8fDE3NTI1ODkxOTB8MA&ixlib=rb-4.1.0&q=85",
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "id": "dropcraft_project",
                "name": "DropCraft",
                "description": "A fast, modern drag-and-drop form builder web app",
                "details": "Developed with Remix, React, Zustand and TailwindCSS for creating custom multi-step forms using a drag-and-drop interface in 2 minutes. Facilitate live device preview, field validation, undo/redo and instant sharing via unique links with 100% data persisted in localStorage of user. Designed for rapid form creation, management, and response viewing, includes an admin dashboard and response analytics in a responsive user-friendly UI, improving productivity by 50%.",
                "technologies": ["Remix", "React", "Zustand", "TailwindCSS", "LocalStorage"],
                "live_link": "https://dropcraft.onrender.com/",
                "github_link": "https://github.com/NishantDwd/DropCraft",
                "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHx3ZWIlMjBhcHBsaWNhdGlvbnxlbnwwfHx8fDE3NTI1ODkxOTB8MA&ixlib=rb-4.1.0&q=85",
                "featured": True,
                "created_at": datetime.utcnow()
            }
        ],
        "education": [
            {
                "id": "jiit_education",
                "degree": "Bachelor of Technology in Computer Science",
                "institution": "Jaypee Institute of Information Technology",
                "graduation_year": "2026",
                "status": "Currently Pursuing",
                "created_at": datetime.utcnow()
            }
        ],
        "contact": {
            "email": "nishant.dwivedi237@gmail.com",
            "linkedin": "https://www.linkedin.com/in/nishant-dwivedi-0a2b2b226",
            "github": "https://github.com/NishantDwd"
        },
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    # Insert the portfolio data
    await db.portfolio.insert_one(portfolio_data)
    
    return {"message": "Portfolio initialized successfully", "portfolio_id": portfolio_data["id"]}