"use strict";
const $ = id => document.getElementById(id);
async function copyText(text,button){if(!text)return;try{await navigator.clipboard.writeText(text);const old=button.textContent;button.textContent="Copied ✓";setTimeout(()=>button.textContent=old,1500)}catch(e){button.textContent="Copy failed"}}
if($("charText")){
 const t=$("charText"),limit=$("limit"),meter=document.querySelector(".meter");
 function update(){const v=t.value,n=[...v].length,max=Math.max(1,Number(limit.value)||280),remaining=max-n;$("chars").textContent=n;$("nonspace").textContent=[...v.replace(/\s/gu,"")].length;$("words").textContent=v.trim()?v.trim().split(/\s+/u).length:0;$("lines").textContent=v.split(/\r?\n/).filter(x=>x.trim()).length;$("remaining").textContent=remaining>=0?`${remaining} characters remaining`:`${-remaining} characters over limit`;$("remaining").classList.toggle("over-limit",remaining<0);$("meterFill").style.width=`${Math.min(100,n/max*100)}%`;$("meterFill").classList.toggle("over-limit-bg",remaining<0);meter.setAttribute("aria-valuenow",Math.round(Math.min(100,n/max*100)))}
 t.addEventListener("input",update);limit.addEventListener("input",update);$("charClear").addEventListener("click",()=>{t.value="";update();t.focus()});$("charCopy").addEventListener("click",()=>copyText(t.value,$("charCopy")));update();
}
if($("caseText")){
 const t=$("caseText");document.querySelectorAll("[data-case]").forEach(b=>b.addEventListener("click",()=>{const type=b.dataset.case;let v=t.value;if(!v.trim()){$("caseStatus").textContent="Enter some text first.";return}if(type==="upper")v=v.toUpperCase();if(type==="lower")v=v.toLowerCase();if(type==="title")v=v.toLowerCase().replace(/\p{L}[\p{L}\p{M}]*/gu,w=>w.charAt(0).toUpperCase()+w.slice(1));if(type==="sentence"){v=v.toLowerCase().replace(/(^|[.!?]\s+)([^\p{L}]*)(\p{L})/gu,(_,a,b,c)=>a+b+c.toUpperCase())}t.value=v;$("caseStatus").textContent="Conversion applied. Review proper nouns and acronyms before using the result.";t.focus()}));$("caseClear").addEventListener("click",()=>{t.value="";$("caseStatus").textContent="Text cleared.";t.focus()});$("caseCopy").addEventListener("click",()=>copyText(t.value,$("caseCopy")));
}
