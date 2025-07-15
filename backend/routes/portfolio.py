from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models.portfolio import (
    Portfolio, PortfolioCreate, PortfolioUpdate,
    Project, ProjectCreate, Education, EducationCreate,
    ContactMessage, ContactMessageCreate
)
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter()

# Get database connection
from server import db

@router.get("/portfolio", response_model=Portfolio)
async def get_portfolio():
    """Get the main portfolio data"""
    portfolio = await db.portfolio.find_one({"active": True})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return Portfolio(**portfolio)

@router.post("/portfolio", response_model=Portfolio)
async def create_portfolio(portfolio_data: PortfolioCreate):
    """Create or update portfolio data"""
    # Check if portfolio already exists
    existing_portfolio = await db.portfolio.find_one({"active": True})
    
    if existing_portfolio:
        # Update existing portfolio
        portfolio_dict = portfolio_data.dict()
        portfolio_dict["updated_at"] = datetime.utcnow()
        await db.portfolio.update_one(
            {"active": True},
            {"$set": portfolio_dict}
        )
        updated_portfolio = await db.portfolio.find_one({"active": True})
        return Portfolio(**updated_portfolio)
    else:
        # Create new portfolio
        portfolio_dict = portfolio_data.dict()
        portfolio_obj = Portfolio(**portfolio_dict)
        portfolio_obj.active = True
        await db.portfolio.insert_one(portfolio_obj.dict())
        return portfolio_obj

@router.put("/portfolio", response_model=Portfolio)
async def update_portfolio(portfolio_update: PortfolioUpdate):
    """Update specific parts of portfolio"""
    existing_portfolio = await db.portfolio.find_one({"active": True})
    if not existing_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    
    update_data = portfolio_update.dict(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        await db.portfolio.update_one(
            {"active": True},
            {"$set": update_data}
        )
    
    updated_portfolio = await db.portfolio.find_one({"active": True})
    return Portfolio(**updated_portfolio)

@router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    portfolio = await db.portfolio.find_one({"active": True})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return [Project(**project) for project in portfolio.get("projects", [])]

@router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate):
    """Add a new project to portfolio"""
    portfolio = await db.portfolio.find_one({"active": True})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    
    project_obj = Project(**project_data.dict())
    await db.portfolio.update_one(
        {"active": True},
        {"$push": {"projects": project_obj.dict()}}
    )
    return project_obj

@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project"""
    portfolio = await db.portfolio.find_one({"active": True})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    
    for project in portfolio.get("projects", []):
        if project["id"] == project_id:
            return Project(**project)
    
    raise HTTPException(status_code=404, detail="Project not found")

@router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectCreate):
    """Update a specific project"""
    portfolio = await db.portfolio.find_one({"active": True})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    
    projects = portfolio.get("projects", [])
    project_index = None
    for i, project in enumerate(projects):
        if project["id"] == project_id:
            project_index = i
            break
    
    if project_index is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Update the project
    updated_project = Project(**project_update.dict())
    updated_project.id = project_id
    projects[project_index] = updated_project.dict()
    
    await db.portfolio.update_one(
        {"active": True},
        {"$set": {"projects": projects}}
    )
    
    return updated_project

@router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    """Delete a specific project"""
    portfolio = await db.portfolio.find_one({"active": True})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    
    projects = portfolio.get("projects", [])
    updated_projects = [p for p in projects if p["id"] != project_id]
    
    if len(updated_projects) == len(projects):
        raise HTTPException(status_code=404, detail="Project not found")
    
    await db.portfolio.update_one(
        {"active": True},
        {"$set": {"projects": updated_projects}}
    )
    
    return {"message": "Project deleted successfully"}

@router.post("/contact", response_model=ContactMessage)
async def send_contact_message(message_data: ContactMessageCreate):
    """Send a contact message"""
    message_obj = ContactMessage(**message_data.dict())
    await db.contact_messages.insert_one(message_obj.dict())
    return message_obj

@router.get("/contact-messages", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin only)"""
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
    return [ContactMessage(**message) for message in messages]

@router.put("/contact-messages/{message_id}/replied")
async def mark_message_replied(message_id: str):
    """Mark a message as replied"""
    result = await db.contact_messages.update_one(
        {"id": message_id},
        {"$set": {"replied": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Message marked as replied"}