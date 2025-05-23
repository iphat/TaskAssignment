const express = require('express');
const app = express();
const mysql = require('mysql2');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'internAssign'
});

//INSERT data 
app.post("/api/addSchool", (req,res) => {
    const {name, address, latitude, longitude} = req.body;
    if(!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if(err) {
            // console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
    });
});

//GET data
app.get("/api/getSchools", (req,res) => {
    const query = "SELECT * FROM schools";
    db.query(query, (err, result) => {
        if(err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(result);
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});