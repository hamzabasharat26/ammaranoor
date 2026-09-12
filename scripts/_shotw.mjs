import fs from "node:fs";import puppeteer from "puppeteer-core";
const OUT=process.argv[2];const CHROME=["C:/Program Files/Google/Chrome/Application/chrome.exe"].find(p=>fs.existsSync(p));
fs.mkdirSync(OUT,{recursive:true});
const b=await puppeteer.launch({executablePath:CHROME,headless:"new"});
const p=await b.newPage();const sleep=ms=>new Promise(r=>setTimeout(r,ms));
for (const [w,h,name] of [[768,1024,"tablet"],[1920,1080,"wide"],[360,740,"small"]]){
  await p.setViewport({width:w,height:h});
  await p.goto("http://localhost:3110/",{waitUntil:"networkidle0"});await sleep(1500);
  await p.screenshot({path:`${OUT}/${name}-top.png`});
  await p.evaluate(()=>document.querySelector("#leadership")?.scrollIntoView({block:"start"}));await sleep(1200);
  await p.screenshot({path:`${OUT}/${name}-leadership.png`});
  console.log("shot",name);
}
await b.close();
