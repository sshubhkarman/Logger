import express, { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors'
const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());

app.post('/api/logs', (req: Request, res: Response) => {
  try{
    const logs: string[] = req.body.logs;
    console.log("entered nodejs")
    const today = new Date();
    const dateStamp = today.toISOString().slice(0, 10); // Get YYYY-MM-DD format

    const fileName = `logs_${dateStamp}.txt`;

    // Write logs to a new file for each day
    fs.appendFile(fileName, logs.join('\n') + '\n', (err) => {
      if (err) {
        console.error('Error writing logs:', err);
        res.status(500).send('Error writing logs');
      } else {
        console.log('Logs written to file:', fileName);
        res.status(200).send('Logs written to file');
      }
    });
  } catch(e) {
    console.log(e);
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
