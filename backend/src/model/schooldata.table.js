


const table =  (connection) => {
   return new Promise ((resolve,reject)=>{
    connection.query( `CREATE TABLE IF NOT EXISTS school (
        school_id INT AUTO_INCREMENT PRIMARY KEY,
        school_name VARCHAR(255),
        school_address VARCHAR(255),
        school_city VARCHAR(100),
        school_state VARCHAR(100),
        school_contact_no VARCHAR(15),
        school_image TEXT,
        school_email_id VARCHAR(255)
      )`,((err,res)=>{
        if(err) return reject(err);
        console.log('Table is created')
        return resolve(res);
      })
    );
   })
};

export default table;
