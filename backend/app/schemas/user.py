from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    
    class Config:
        from_attributes = True