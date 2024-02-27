import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config(
    {
     path: './public/.env'  
    })

    // Considering single connection because I assume there is limited users and smiple query need to be executed

          
      
    const connect = () => {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: process.env.HOST_NAME,
                user: process.env.USER,
                password: process.env.PASSWORD
            });
    
            // Handling connection errors
            connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to MySQL:', err);
                    reject(err); // Reject the Promise with the error
                    return;
                }
                console.log('Connected to MySQL');
    
                // Execute the CREATE DATABASE statement
                connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`, (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                        reject(err); // Reject the Promise with the error
                        return;
                    }
                    console.log('Database created');
    
                    // Execute the USE statement to select the database
                    connection.query(`USE ${process.env.DATABASE}`, (err) => {
                        if (err) {
                            console.error('Error selecting database:', err);
                            reject(err); // Reject the Promise with the error
                            return;
                        }
                        console.log('Database selected');
                        resolve(connection); // Resolve the Promise with the connection object
                        
                    });
                });
            });
        });
    };
    
    
        
      export default connect;

  