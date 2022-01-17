import bodyParser from 'body-parser';
import { ExecException, exec } from 'child_process';
import express from 'express';
import { JobParameters } from './data';

require('dotenv').config()

const app = express()
const port = 8081

app.use(express.raw())

app.post('/start', bodyParser.json(), (req, res) => {
  const params: JobParameters = req.body
  console.log("Executing")
  const s = JSON.stringify(params)
  console.log(s)
  const cmd = `export JOB_PARAMETERS='${s}';npm --prefix ${process.env.JOB_PATH} run start`
  console.log(cmd)
  exec(cmd, logChildProcess)
  res.status(200).send()
})

app.listen(port, () => console.log(`Running on port ${port}`))

function logChildProcess(error: ExecException | null, stdout: string, stderr: string): void {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
}
if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
}
console.log(`stdout: ${stdout}`);
}