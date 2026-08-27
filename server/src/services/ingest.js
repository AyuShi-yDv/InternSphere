require('dotenv').config()
const axios=require('axios');const {parse}=require('node-html-parser');const cron=require('node-cron');const connect=require('../config/db');const Internship=require('../models/Internship')
async function fetchAICTE(){
 if(process.env.ENABLE_EXTERNAL_INGEST!=='true')return console.log('External ingestion disabled.')
 const url=process.env.AICTE_SOURCE_URL
 // This adapter is intentionally generic. Verify current AICTE terms/robots/API permissions before enabling automated access.
 const html=(await axios.get(url,{timeout:20000,headers:{'User-Agent':'InternSphere/1.0'}})).data
 const root=parse(html);let count=0
 for(const card of root.querySelectorAll('a')){
   const title=card.text.trim().replace(/\s+/g,' ')
   if(!/internship/i.test(title)||title.length<10)continue
   const href=card.getAttribute('href')||url;const externalUrl=new URL(href,url).href
   await Internship.updateOne({externalId:externalUrl},{
     title:title.slice(0,200),companyName:'External source',category:'General',location:'Pan India',mode:'Remote',
     duration:'See source',stipend:'See source',openings:1,skills:[],description:'See original listing for full details.',
     eligibility:'See original listing.',applicationDeadline:new Date(Date.now()+86400000),applicationUrl:externalUrl,
     source:'AICTE',externalId:externalUrl
   },{upsert:true});count++
 }
 console.log(`External sync processed ${count} records`)
}
async function main(){await connect();await fetchAICTE();const minutes=Math.max(5,Number(process.env.EXTERNAL_SYNC_MINUTES)||30);cron.schedule(`*/${minutes} * * * *`,fetchAICTE)}
main().catch(e=>{console.error(e);process.exit(1)})
