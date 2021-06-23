import dotenv from 'dotenv'
dotenv.config()

function getCnxStr() {
  return process.env.CNX_STR
}

function getMode() {
  return process.env.MODE || 'PROD'
}

export { getCnxStr, getMode }