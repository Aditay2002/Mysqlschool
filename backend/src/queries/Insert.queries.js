import { connect } from "http2";
import mysql from "mysql2/promise"

// 

const insertData = (school_id, school_name, school_address, school_city, school_state, school_contact_no, school_image, school_email_id, connection,table) => {
    return new Promise((resolve, reject) => {
        // const db = connection();
        //           table();
       db.query(`INSERT INTO school (
            school_name, 
            school_address,
            school_city,
            school_state,
            school_contact_no,
            school_image,
            school_email_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [school_name, school_address, school_city, school_state, school_contact_no, school_image, school_email_id],
        (err, res) => {
            if (err) {
                console.error("Error inserting data:", err);
                reject(err); // Reject the promise if there's an error
                return;
            }
            console.log("Inserted data successfully");
            resolve(res); // Resolve the promise with the result
        });
    });
};

export default insertData;