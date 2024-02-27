import express from 'express'
import dotenv from 'dotenv'
// import {path} from "path"
import connect from './db/connect.js'
import cors from "cors"
import table from './model/schooldata.table.js'
import fs from "fs"
// import insertData from './queries/Insert.queries.js';

import { upload } from './middleware/multer.middleware.js'
const app=express();
// app.use('/api/v1/schools', express.static('/Users/HP/Desktop/projects/Assignmnetsql/backend/public/schoolImages'));
app.use(express.json());
const corsOptions={
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 201
}
app.use(cors(corsOptions))
dotenv.config({
    path:'./public/.env'
})


const connectionDone = async (req, res) => {
    try {
        // Connect to MySQL database
        const db = await connect();
         console.log(db);
        // Create database if not exists
        db.query('CREATE DATABASE IF NOT EXISTS schooldata', (err) => {
            if (err) {
                console.error("Error creating database:", err);
                res.status(500).json({ message: 'Database creation failed' });
                return;
            }
            console.log("Database 'schooldata' is created");
            
            // Respond to the client once database creation is completed
            res.status(200).json({ message: 'Database creation successful' },db);
        });
    } catch (error) {
        console.error("Connection to database failed", error);
        res.status(500).json({ message: 'Connection to database failed' });
    }
};


app.get('/', async (req, res) => {
    try {
        await connectionDone(req, res);
        // If connectionDone completes successfully, this line will execute
        console.log("Connection done");
        // No need to send response here, it's already sent inside connectionDone
    } catch (error) {
        // If an error occurs during connectionDone, this block will execute
        console.error("Error in connection:", error);
        res.status(500).json({ message: "Error in connection" });
    }
});

//

app.post('/api/v1/upload', upload.single('photos'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { path, originalname } = req.file;

        
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        
        // Using fs.promises.rename to asynchronously rename the file
     fs.renameSync(path, newPath);

        // Sending the filename in the response
        res.json({ message: 'File uploaded successfully', filename: originalname });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file" });
    }
});



app.post('/api/v1/connect', async (req, res) => {
    try {
        const { school_name, school_address, school_city, school_state, school_contact_no, school_image, school_email_id } = req.body;

        // Establish connection to the MySQL database
        console.log(req.body);

        const db = await connect();
        // Create the necessary table
        await table(db); // Assuming table function correctly creates the table

        // Insert data into the school table
        // await insertData(school_id, school_name, school_address, school_city, school_state, school_contact_no, school_image, school_email_id);
        db.query(`INSERT INTO school (
            school_name, 
            school_address,
            school_city,
            school_state,
            school_contact_no,
            school_image,
            school_email_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [school_name, school_address, school_city, school_state, school_contact_no, school_image, school_email_id],
            (err, result) => {
                if (err) {
                    console.error("Error inserting data:", err);
                    throw err;
                }
                console.log("Inserted data successfully", result.insertId);
                res.status(200).json({ message: "Insert done " })
            });


    } catch (error) {
        console.error("Error in inserting data:", error);
        res.status(500).json({ message: "Error in inserting data" });
    }
});

  app.get('/api/v1/schools', async (req,res)=>{
    const db=await connect();
     db.query(`SELECT * FROM school`,(err, results) => {
        if (err) {
          console.error('Error fetching schools:', err);
          res.status(500).json({ error: 'Error fetching schools' });
        } else {
          console.log('All schools:', results);
          res.json(results);
        }
      })
  })

  

app.listen(process.env.PORT,()=>{
     console.log("Server is listening at",process.env.PORT);
})
