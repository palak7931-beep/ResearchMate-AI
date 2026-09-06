from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Paper(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    summary = Column(Text, nullable=False)