require('dotenv').config();
const sql = require('mssql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


const config = {
  user: 'VergAdmin',
  password: '*MudSkipper66',
  server: 'vergdb.cqxiqpvmioxd.us-east-1.rds.amazonaws.com',
  port: 1433, 
  database: 'VPF2-PrimaryServer',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

console.log("Starting...");

app.post('/api/updateChat', async (req, res) => {
  try {
    console.log("we are in! 1");
    //connects to the sql
    const pool = await sql.connect(config);
    console.log("we are in! 2");

    //use chat data from the request body
    const { userId, visitNum, startTime, conversationLogs, patientForm } = req.body;

    //check recent visit number 
    const result = await pool.request()
    .input('userID', sql.NVarChar, userId)
    .query(`SELECT MAX(VisitNum) AS MaxVisitNum FROM PatientPortal WHERE UserID = @userId`); //correct format to select the user? new or old users and determine 

    console.log("q1");
    //checks number of visits
    let curretVisits = 0;
    if (result.recordset.length > 0 && result.recordset[0].MaxVisitNum !== null) {
      newVisitNum = result.recordset[0].MaxVisitNum + 1;
    }

    //insert the chat data into the database ADJUST WITH VISITNUM INSTEAD 
    const checkExists = await pool.request()
      .input('userID', sql.NVarChar, userId)
      .input('visitNum', sql.Int, visitNum)
      .query(`SELECT COUNT(*) AS count FROM PatientPortal WHERE UserID = @userID`);

    if (checkExists.recordset[0].count > 0) {
      // If the record exists update 
      await pool.request()
        .input('userID', sql.NVarChar, userId)
        .input('visitNum', sql.Int, visitNum)
        .input('conversationLogs', sql.NVarChar(sql.MAX), conversationLogs) 
        .query(`UPDATE PatientPortal SET ConversationLogs = @conversationLogs WHERE UserID = @userID AND VisitNum = @visitNum`);
    } else {
      //if new user, add new row 
      await pool.request()
        .query(`INSERT INTO PatientPortal (UserID, VisitNum, StartTime, ConversationLogs) VALUES ('${userId}', ${visitNum}, '${startTime}', '${conversationLogs}')`);
    }
    //send a response back to the client
    res.status(200).json({ message: 'Chat log saved' });
  } catch (err) {
    console.error('Error processing', err);
    res.status(500).send(err.message);
  } finally {
    sql.close();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
