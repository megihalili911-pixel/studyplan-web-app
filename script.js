function showSection(id){
 document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 localStorage.setItem("lastSection", id);
}
if(localStorage.getItem("lastSection"))
 showSection(localStorage.getItem("lastSection"));

// WEEK CALENDAR
const week=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const weekGrid=document.getElementById("weekGrid");
week.forEach(d=>{
 let div=document.createElement("div");
 div.innerHTML=`<h3>${d}</h3>`;
 div.ondrop=drop; div.ondragover=allowDrop;
 weekGrid.appendChild(div);
});

// MONTH
const monthGrid=document.getElementById("monthGrid");
for(let i=1;i<=30;i++){
 let div=document.createElement("div");
 div.innerHTML=`<h3>${i}</h3>`;
 div.ondrop=drop; div.ondragover=allowDrop;
 monthGrid.appendChild(div);
}

function switchCalendar(type){
 document.getElementById("weekly-calendar").classList.toggle("hidden",type!=="week");
 document.getElementById("monthly-calendar").classList.toggle("hidden",type!=="month");
}

// PLANNER
function addTask(){
 let name=document.getElementById("taskName").value;
 let duration=document.getElementById("taskDuration").value;
 if(!name||!duration)return;

 let block=document.createElement("div");
 block.className="draggable";
 block.draggable=true;
 block.innerText=`${name} • ${duration}min`;
 block.ondragstart=e=>e.dataTransfer.setData("text", block.innerText);

 document.getElementById("taskPool").appendChild(block);
 updateTaskCount();
}

function allowDrop(e){e.preventDefault()}
function drop(e){
 e.preventDefault();
 let data=e.dataTransfer.getData("text");
 let block=document.createElement("div");
 block.className="draggable";
 block.innerText=data;
 e.target.appendChild(block);
 updateTaskCount();
}

// PROJECTS
function addProject(){
 let t=document.getElementById("projectTitle").value;
 let d=document.getElementById("projectDesc").value;
 if(!t||!d)return;

 let div=document.createElement("div");
 div.className="project";
 div.innerHTML=`<h3>${t}</h3><p>${d}</p>`;
 document.getElementById("projectList").appendChild(div);
 updateProjectCount();
}

// TIMER
let timer; let timeLeft=1500;
function updateTimer(){
 let m=Math.floor(timeLeft/60),s=timeLeft%60;
 document.getElementById("timerDisplay").innerText=
 `${m<10?"0":""}${m}:${s<10?"0":""}${s}`;
}
function startTimer(){
 clearInterval(timer);
 timer=setInterval(()=>{
  if(timeLeft>0){timeLeft--;updateTimer()}
 },1000);
 localStorage.timer=(+localStorage.timer||0)+1;
 updateTimerCount();
}
function pauseTimer(){clearInterval(timer)}
function resetTimer(){clearInterval(timer);timeLeft=1500;updateTimer()}
updateTimer();

// DASHBOARD COUNTS
function updateTaskCount(){
 document.getElementById("taskCount").innerText=
 document.querySelectorAll(".draggable").length;
}
function updateProjectCount(){
 document.getElementById("projectCount").innerText=
 document.querySelectorAll(".project").length;
}
function updateTimerCount(){
 document.getElementById("timerCount").innerText=localStorage.timer||0;
}
updateTimerCount();
