import sqlite3 from 'sqlite3'
const connection = sqlite3.verbose();
import moment from 'moment';
import { DB_PATH } from '$env/static/private';

const db = new connection.Database(DB_PATH);
  
const today = new Date();
const year = today.getFullYear();
let month: string | number = today.getMonth() + 1;
let day: string | number = today.getDate();
if (+month < 10) month = `0${month}`
if (+day < 10) day = +`0${day}`

const formattedDate = `${year}-${month}-${day}`

export const load = (async ({  }) => {

  // today
  const todayData = await getTodayData();
  let pingsToday: number = 0

  todayData.forEach(ping => {
    pingsToday += ping.pings;
  })  

  // last scan
  let previousScanPings: number = 0
  const previousScan = await getPrevScanData();
  previousScanPings = previousScan[previousScan.length - 1].pings;

  // previousScan.forEach(scan => {
  //   previousScanPings += scan.pings;
  // })

  // Most common issues
  let commonIssuesArr: string[] = []
  const commonIssues = await getCommonIssuesData();
  
  commonIssues.forEach(scan => {
    if (scan.status !== null && scan.status !== undefined) {
      commonIssuesArr.push(scan.status);
    }
  })
  
  const commonIssuesMap = commonIssuesArr.reduce(function(obj, b) {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});

  // This month
  const pingsThisMonth = previousScan.reduce((acc, val) => acc += val.pings, 0);

  // most recent pings
  const mostRecent = commonIssues.slice(0, 12)
  // console.log(mostRecent);

  // datatable
  const days = {}
  commonIssues.forEach(ping => {
    if (!days.hasOwnProperty(moment(ping.date).format("YYYY-MM-DD"))) {
      days[moment(ping.date).format("YYYY-MM-DD")] = 1;
    } else {
      days[moment(ping.date).format("YYYY-MM-DD")]++;
    }
  })

  return {
    pings: {
      today: pingsToday,
      lastScan: previousScanPings,
      thisMonth: pingsThisMonth,
      issues: commonIssuesMap,
    },
    days: days,
    salons: mostRecent
  }
})

async function getTodayData() {
  const sql = `SELECT * FROM Scans WHERE date(date) = ?`;
  const sqlData = [formattedDate];

  return new Promise(function(resolve,reject){
    db.all(sql, sqlData, function(err,rows){
      if(err){return reject(err);}
      resolve(rows);
    });
  });
}

async function getPrevScanData() {
  const sql = `SELECT * FROM Scans WHERE date(date) >= date(?) AND date(date) <= date(?)`;
  const sqlData = [`${year}-${month}-01`, formattedDate];

  return new Promise(function(resolve,reject){
    db.all(sql, sqlData, function(err,rows){
      if(err){return reject(err);}
      resolve(rows);
    });
  });
}

async function getCommonIssuesData() {
  const sql = `SELECT * FROM Pings WHERE date(date) >= date(?) AND date(date) <= date(?) ORDER BY date`;
  const sqlData = [`${year}-${month}-01`, formattedDate];

  return new Promise(function(resolve,reject){
    db.all(sql, sqlData, function(err,rows){
      if(err){return reject(err);}
      resolve(rows);
    });
  });
}
