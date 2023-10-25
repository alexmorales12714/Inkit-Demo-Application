from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
import uuid
from datetime import datetime
from dateutil.relativedelta import relativedelta
from fastapi.middleware.cors import CORSMiddleware


#initialize FastAPI app
app = FastAPI()

#CORS middleware allows cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

#defines pydantic model named "Document" and data structure
class Document(BaseModel):
    uuid: str
    document_name: str
    created_at: datetime
    description: str
    expires_at:  datetime

#Allows the use of uuid in Pydantic model
class Config:
    arbitrary_types_allowed = True

#Sample data for the document
document_db = [
    Document(uuid = str(uuid.uuid4()),
             document_name = "My cool private document",
             created_at=datetime.now(),
             description="it's a secret document.",
             expires_at = datetime.now() + relativedelta(months = 1))
]


#retrieve documents
@app.get("/documents/", response_model=List[Document])
async def get_documents():
    return document_db

