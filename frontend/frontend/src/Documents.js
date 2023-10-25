//importing React library, useState and useEffect hook
import React, { useState, useEffect } from 'react';
//used for making requests
import axios from 'axios';

//defining component 
function Documents() {
  const [documents, setDocuments] = useState([]);

  //useEffect hook for data fetching
  useEffect(() => {
    //using Axios to make GET request
    axios.get('http://localhost:8000/documents/')
      .then((response) => {
        //Transforms the data into format
        const formattedData = response.data.map((document) => ({
          uuid: document.uuid,
          document_name: document.document_name,
          created_at: document.created_at,
          description: document.description,
          expires_at: document.expires_at,
        }));
        // Set the formatted data in the state
        setDocuments(formattedData);
      })//if error with request then its logged to the console
      .catch((error) => {
        console.error('Error fetching documents:', error);
      });
  }, []);

  //returns what will appear on screen
  return (
      <ul style={{listStyleType: 'none'}}>
        {documents.map((document) => (
          <li key={document.id}>
            <pre>
                <code>
                    {JSON.stringify(document, null, 2)}
                </code>
            </pre>        
          </li>
        ))}
      </ul>
  );
}

export default Documents;

