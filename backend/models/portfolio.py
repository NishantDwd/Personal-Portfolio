from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Portfolio Data Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    location: str
    bio: str
    profile_image: Optional[str] = None
    hero_background: Optional[str] = None

class TechStack(BaseModel):
    languages: List[str]
    frameworks: List[str]
    tools: List[str]
    databases: List[str]

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    details: str
    technologies: List[str]
    live_link: Optional[str] = None
    github_link: Optional[str] = None
    image: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    name: str
    description: str
    details: str
    technologies: List[str]
    live_link: Optional[str] = None
    github_link: Optional[str] = None
    image: Optional[str] = None
    featured: bool = False

class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    institution: str
    graduation_year: str
    status: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class EducationCreate(BaseModel):
    degree: str
    institution: str
    graduation_year: str
    status: str

class Contact(BaseModel):
    email: EmailStr
    linkedin: Optional[str] = None
    github: Optional[str] = None

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    replied: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class Portfolio(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal: PersonalInfo
    tech_stack: TechStack
    projects: List[Project]
    education: List[Education]
    contact: Contact
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PortfolioCreate(BaseModel):
    personal: PersonalInfo
    tech_stack: TechStack
    projects: List[ProjectCreate]
    education: List[EducationCreate]
    contact: Contact

class PortfolioUpdate(BaseModel):
    personal: Optional[PersonalInfo] = None
    tech_stack: Optional[TechStack] = None
    contact: Optional[Contact] = None