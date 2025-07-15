#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Nishant's Portfolio Application
Tests all portfolio, projects, contact, and initialization endpoints
"""

import requests
import json
import uuid
from datetime import datetime
import sys
import os

# Get backend URL from environment
BACKEND_URL = "https://906d9b3f-8f52-47e2-b6f1-9722c53d6f5f.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "message": message,
            "response_data": response_data
        })
        
    def test_api_health(self):
        """Test basic API health"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                self.log_test("API Health Check", True, f"API is running: {data.get('message', 'OK')}")
                return True
            else:
                self.log_test("API Health Check", False, f"API returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Health Check", False, f"Connection failed: {str(e)}")
            return False
    
    def test_portfolio_initialization(self):
        """Test portfolio initialization with Nishant's data"""
        try:
            response = self.session.post(f"{self.base_url}/init-portfolio")
            
            if response.status_code == 200:
                data = response.json()
                if "Portfolio initialized successfully" in data.get("message", ""):
                    self.log_test("Portfolio Initialization", True, "Portfolio initialized with Nishant's data")
                    return True
                elif "Portfolio already exists" in data.get("message", ""):
                    self.log_test("Portfolio Initialization", True, "Portfolio already exists (expected)")
                    return True
                else:
                    self.log_test("Portfolio Initialization", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Portfolio Initialization", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("Portfolio Initialization", False, f"Error: {str(e)}")
            return False
    
    def test_get_portfolio(self):
        """Test GET /api/portfolio endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio")
            
            if response.status_code == 200:
                data = response.json()
                
                # Verify all required fields are present
                required_fields = ["id", "personal", "tech_stack", "projects", "education", "contact"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("GET Portfolio", False, f"Missing fields: {missing_fields}")
                    return False
                
                # Verify personal info
                personal = data.get("personal", {})
                if personal.get("name") == "Nishant Kumar Dwivedi":
                    self.log_test("GET Portfolio", True, "Portfolio data retrieved successfully with correct personal info")
                    return data
                else:
                    self.log_test("GET Portfolio", False, f"Incorrect personal data: {personal}")
                    return False
            else:
                self.log_test("GET Portfolio", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("GET Portfolio", False, f"Error: {str(e)}")
            return False
    
    def test_get_projects(self):
        """Test GET /api/projects endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/projects")
            
            if response.status_code == 200:
                projects = response.json()
                
                if isinstance(projects, list) and len(projects) > 0:
                    # Check if Nishant's projects are present
                    project_names = [p.get("name", "") for p in projects]
                    expected_projects = ["WeChat", "Weathere", "DropCraft"]
                    
                    found_projects = [name for name in expected_projects if name in project_names]
                    
                    if len(found_projects) >= 2:  # At least 2 of the expected projects
                        self.log_test("GET Projects", True, f"Retrieved {len(projects)} projects including: {found_projects}")
                        return projects
                    else:
                        self.log_test("GET Projects", False, f"Expected projects not found. Got: {project_names}")
                        return False
                else:
                    self.log_test("GET Projects", False, "No projects returned or invalid format")
                    return False
            else:
                self.log_test("GET Projects", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("GET Projects", False, f"Error: {str(e)}")
            return False
    
    def test_get_specific_project(self, projects):
        """Test GET /api/projects/{project_id} endpoint"""
        if not projects:
            self.log_test("GET Specific Project", False, "No projects available for testing")
            return False
            
        try:
            # Test with first project
            project_id = projects[0].get("id")
            response = self.session.get(f"{self.base_url}/projects/{project_id}")
            
            if response.status_code == 200:
                project = response.json()
                if project.get("id") == project_id:
                    self.log_test("GET Specific Project", True, f"Retrieved project: {project.get('name')}")
                    return True
                else:
                    self.log_test("GET Specific Project", False, "Project ID mismatch")
                    return False
            else:
                self.log_test("GET Specific Project", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("GET Specific Project", False, f"Error: {str(e)}")
            return False
    
    def test_create_project(self):
        """Test POST /api/projects endpoint"""
        try:
            new_project = {
                "name": "Test Portfolio API Project",
                "description": "A test project created via API testing",
                "details": "This project was created during comprehensive API testing to verify the POST /api/projects endpoint functionality.",
                "technologies": ["Python", "FastAPI", "MongoDB", "Testing"],
                "live_link": "https://example.com/test-project",
                "github_link": "https://github.com/test/test-project",
                "featured": False
            }
            
            response = self.session.post(f"{self.base_url}/projects", json=new_project)
            
            if response.status_code == 200:
                project = response.json()
                if project.get("name") == new_project["name"]:
                    self.log_test("POST Project", True, f"Created project: {project.get('name')}")
                    return project.get("id")
                else:
                    self.log_test("POST Project", False, "Project creation response mismatch")
                    return False
            else:
                self.log_test("POST Project", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST Project", False, f"Error: {str(e)}")
            return False
    
    def test_update_project(self, project_id):
        """Test PUT /api/projects/{project_id} endpoint"""
        if not project_id:
            self.log_test("PUT Project", False, "No project ID available for testing")
            return False
            
        try:
            updated_project = {
                "name": "Updated Test Portfolio API Project",
                "description": "An updated test project via API testing",
                "details": "This project was updated during comprehensive API testing to verify the PUT /api/projects/{id} endpoint functionality.",
                "technologies": ["Python", "FastAPI", "MongoDB", "Testing", "Updated"],
                "live_link": "https://example.com/updated-test-project",
                "github_link": "https://github.com/test/updated-test-project",
                "featured": True
            }
            
            response = self.session.put(f"{self.base_url}/projects/{project_id}", json=updated_project)
            
            if response.status_code == 200:
                project = response.json()
                if project.get("name") == updated_project["name"]:
                    self.log_test("PUT Project", True, f"Updated project: {project.get('name')}")
                    return True
                else:
                    self.log_test("PUT Project", False, "Project update response mismatch")
                    return False
            else:
                self.log_test("PUT Project", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("PUT Project", False, f"Error: {str(e)}")
            return False
    
    def test_delete_project(self, project_id):
        """Test DELETE /api/projects/{project_id} endpoint"""
        if not project_id:
            self.log_test("DELETE Project", False, "No project ID available for testing")
            return False
            
        try:
            response = self.session.delete(f"{self.base_url}/projects/{project_id}")
            
            if response.status_code == 200:
                data = response.json()
                if "deleted successfully" in data.get("message", "").lower():
                    self.log_test("DELETE Project", True, "Project deleted successfully")
                    return True
                else:
                    self.log_test("DELETE Project", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("DELETE Project", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("DELETE Project", False, f"Error: {str(e)}")
            return False
    
    def test_send_contact_message(self):
        """Test POST /api/contact endpoint"""
        try:
            contact_message = {
                "name": "John Smith",
                "email": "john.smith@example.com",
                "message": "Hello Nishant! I'm impressed by your portfolio and would like to discuss potential collaboration opportunities. Your work on WeChat and Weathere applications shows excellent technical skills."
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=contact_message)
            
            if response.status_code == 200:
                message = response.json()
                if message.get("email") == contact_message["email"]:
                    self.log_test("POST Contact Message", True, f"Contact message sent from: {message.get('name')}")
                    return message.get("id")
                else:
                    self.log_test("POST Contact Message", False, "Contact message response mismatch")
                    return False
            else:
                self.log_test("POST Contact Message", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST Contact Message", False, f"Error: {str(e)}")
            return False
    
    def test_get_contact_messages(self):
        """Test GET /api/contact-messages endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/contact-messages")
            
            if response.status_code == 200:
                messages = response.json()
                if isinstance(messages, list):
                    self.log_test("GET Contact Messages", True, f"Retrieved {len(messages)} contact messages")
                    return messages
                else:
                    self.log_test("GET Contact Messages", False, "Invalid response format")
                    return False
            else:
                self.log_test("GET Contact Messages", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("GET Contact Messages", False, f"Error: {str(e)}")
            return False
    
    def test_mark_message_replied(self, message_id):
        """Test PUT /api/contact-messages/{message_id}/replied endpoint"""
        if not message_id:
            self.log_test("PUT Message Replied", False, "No message ID available for testing")
            return False
            
        try:
            response = self.session.put(f"{self.base_url}/contact-messages/{message_id}/replied")
            
            if response.status_code == 200:
                data = response.json()
                if "replied" in data.get("message", "").lower():
                    self.log_test("PUT Message Replied", True, "Message marked as replied")
                    return True
                else:
                    self.log_test("PUT Message Replied", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("PUT Message Replied", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("PUT Message Replied", False, f"Error: {str(e)}")
            return False
    
    def test_error_handling(self):
        """Test error handling for non-existent resources"""
        try:
            # Test 404 for non-existent project
            fake_id = str(uuid.uuid4())
            response = self.session.get(f"{self.base_url}/projects/{fake_id}")
            
            if response.status_code == 404:
                self.log_test("404 Error Handling", True, "Correctly returns 404 for non-existent project")
            else:
                self.log_test("404 Error Handling", False, f"Expected 404, got {response.status_code}")
                
            # Test invalid email validation
            invalid_contact = {
                "name": "Test User",
                "email": "invalid-email",
                "message": "Test message"
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=invalid_contact)
            
            if response.status_code == 422:  # Validation error
                self.log_test("Email Validation", True, "Correctly validates email format")
            else:
                self.log_test("Email Validation", False, f"Expected 422 validation error, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Error Handling Tests", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run comprehensive API tests"""
        print("🚀 Starting Comprehensive Portfolio Backend API Tests")
        print("=" * 60)
        
        # Test API health first
        if not self.test_api_health():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Initialize portfolio
        self.test_portfolio_initialization()
        
        # Test portfolio data retrieval
        portfolio_data = self.test_get_portfolio()
        
        # Test projects endpoints
        projects = self.test_get_projects()
        if projects:
            self.test_get_specific_project(projects)
        
        # Test project CRUD operations
        new_project_id = self.test_create_project()
        if new_project_id:
            self.test_update_project(new_project_id)
            self.test_delete_project(new_project_id)
        
        # Test contact endpoints
        message_id = self.test_send_contact_message()
        messages = self.test_get_contact_messages()
        if message_id:
            self.test_mark_message_replied(message_id)
        
        # Test error handling
        self.test_error_handling()
        
        # Print summary
        self.print_summary()
        
        return True
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['message']}")
        
        print("\n✅ CRITICAL FUNCTIONALITY STATUS:")
        critical_tests = [
            "API Health Check",
            "Portfolio Initialization", 
            "GET Portfolio",
            "GET Projects",
            "POST Contact Message"
        ]
        
        for test_name in critical_tests:
            result = next((r for r in self.test_results if r["test"] == test_name), None)
            if result:
                status = "✅" if result["success"] else "❌"
                print(f"  {status} {test_name}")

if __name__ == "__main__":
    tester = PortfolioAPITester()
    tester.run_all_tests()