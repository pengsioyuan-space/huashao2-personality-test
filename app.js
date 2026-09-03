const PEOPLE={
  zheng:{name:"郑爽型",short:"郑爽",description:"你是郑爽型人格。你的情绪雷达非常敏锐，旅途中的细节和关系变化都逃不过你的眼睛。你不擅长假装没事，但真诚表达也让团队更容易看见彼此的感受。"},
  ning:{name:"宁静型",short:"宁静",description:"你是宁静型人格。你不喜欢拐弯抹角，有问题就要当场解决。你的气场很强，讨厌含糊和委屈求全，是团队里最敢把话挑明的人。"},
  yang:{name:"杨洋型",short:"杨洋",description:"你是杨洋型人格。你习惯先做事再说话，路线、行李和突发状况都会默默扛起来。虽然偶尔紧张或自责，但你的认真总能给团队带来可靠感。"},
  chen:{name:"陈意涵型",short:"陈意涵",description:"你是陈意涵型人格。你是团队里的小太阳，擅长用行动和笑容化解尴尬。只要你在，气氛就不会太僵，路线再乱也能被你跑成风景。"},
  jing:{name:"井柏然型",short:"井柏然",description:"你是井柏然型人格。你很会观察每个人的状态，也愿意在混乱时冷静分工、照顾情绪。你不抢镜，却常常是让团队重新稳下来的那个人。"}
};
const QUESTIONS=[
 {text:"伦敦塔桥打卡时，大家因为路线和拍照节奏产生分歧，你会？",options:[
  ["我不想扫兴，但我真的有点不开心，先表达自己的感受。","zheng"],
  ["直接说：“到底走不走？别磨叽了。”","ning"],
  ["默默查路线、安排时间，但越安排越紧张。","yang"],
  ["拉大家合照：“来都来了，先拍一张再说！”","chen"],
  ["观察谁情绪不对，先把人安抚住。","jing"]
 ]},
 {text:"杨洋走丢了，团队开始慌乱，你第一反应是？",options:[
  ["立刻自责：“是不是我刚刚没有注意到？”","zheng"],
  ["先冷静分工：“你打电话，你原地等，我去找。”","jing"],
  ["情绪上来：“怎么会这样？大家刚刚为什么不看好人？”","ning"],
  ["直接开找，不废话，边走边喊人。","yang"],
  ["一边找一边活跃气氛：“别慌，肯定就在附近。”","chen"]
 ]},
 {text:"房车大战爆发，大家对座位、空间、休息方式都有意见，你会？",options:[
  ["明确站出来说：“这个安排不合理，我不接受。”","ning"],
  ["觉得委屈但先忍着，之后找熟悉的人倾诉。","zheng"],
  ["努力协调所有人的需求，哪怕自己很累。","jing"],
  ["主动让一步：“我都可以，你们先选。”","yang"],
  ["像大姐一样拍板：“别吵了，就这么定。”","chen"]
 ]},
 {text:"毛阿敏倒戈式地改变立场，原本支持你的人突然站到另一边，你会？",options:[
  ["表面没事，心里非常受伤。","zheng"],
  ["直接问清楚：“你刚才不是这么说的吧？”","ning"],
  ["开始怀疑是不是自己哪里做得不好。","yang"],
  ["理解她可能是想顾全大局，不继续追究。","jing"],
  ["成年人本来就会根据局势调整，接受现实。","chen"]
 ]},
 {text:"沙漠谈话和解时，大家终于坐下来把话说开，你最可能说什么？",options:[
  ["“我不是故意针对谁，我只是当时真的很难过。”","zheng"],
  ["“有话就说开，别以后又翻旧账。”","ning"],
  ["“如果我之前做得不好，我可以改。”","yang"],
  ["“其实大家都是想把旅程过好，我们抱一下吧。”","chen"],
  ["“过去就过去了，后面大家互相照顾。”","jing"]
 ]}
];
const KEY="huashao2-records-v1";
let state={page:"home",index:0,answers:Array(5).fill(null),result:null};
const app=document.querySelector("#app");
function shell(content,extra=""){return `<div class="page ${extra}">${content}</div>`}
function header(back=false){return `<header class="header">${back?'<button class="back" aria-label="返回">‹</button>':""}<div class="header-title">花少2人格测试</div>${back?"<span></span>":""}</header>`}
function getRecords(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
function saveRecord(record){const list=getRecords();list.unshift(record);localStorage.setItem(KEY,JSON.stringify(list.slice(0,20)))}
function showHome(){state={page:"home",index:0,answers:Array(5).fill(null),result:null};app.innerHTML=shell(`<section class="home">${header()}<div class="season">TRAVEL TEST · SEASON 2</div><h1>测一测：你是《花少2》里的谁？</h1><p class="intro">五个高压旅行名场面，一秒照见你的团队人格：你会情绪外放、强势拍板、默默扛事，还是把大家重新拉回同一辆车？</p><button class="btn btn-dark" id="start">开始测试</button><button class="btn btn-light" id="records">查看我的测试记录</button><p class="disclaimer">本测试仅供娱乐，与节目官方无关</p></section>`,"home");document.querySelector("#start").onclick=()=>showQuestion(0);document.querySelector("#records").onclick=showRecords}
function showQuestion(index){state.page="test";state.index=index;const q=QUESTIONS[index],selected=state.answers[index];app.innerHTML=shell(`${header(true)}<div class="test-meta"><span>花少2 · 旅行人格</span><span>第 ${index+1} / 5 题</span></div><div class="progress"><span style="width:${(index+1)*20}%"></span></div><section class="question-card"><div class="number">${String(index+1).padStart(2,"0")}</div><h2>${q.text}</h2><div class="options">${q.options.map((o,i)=>`<button class="option ${selected===i?"selected":""}" data-index="${i}"><span class="radio"></span><span>${o[0]}</span></button>`).join("")}</div></section>`);document.querySelector(".back").onclick=()=>index?showQuestion(index-1):showHome();document.querySelectorAll(".option").forEach(b=>b.onclick=()=>choose(Number(b.dataset.index)))}
function choose(optionIndex){state.answers[state.index]=optionIndex;document.querySelectorAll(".option").forEach((b,i)=>b.classList.toggle("selected",i===optionIndex));setTimeout(()=>{if(state.index<4)showQuestion(state.index+1);else finish()},260)}
function finish(){const scores=Object.fromEntries(Object.keys(PEOPLE).map(k=>[k,0]));state.answers.forEach((answer,i)=>{const key=QUESTIONS[i].options[answer][1];scores[key]+=2});const winner=Object.keys(scores).sort((a,b)=>scores[b]-scores[a])[0];const record={id:Date.now(),winner,scores,date:new Date().toISOString()};saveRecord(record);state.result=record;showResult(record)}
function scoreText(scores){return Object.entries(scores).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${PEOPLE[k].short} ${v}分`).join(" · ")}
function formatDate(iso){const d=new Date(iso),p=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`}
function showResult(record){state.page="result";state.result=record;const p=PEOPLE[record.winner];app.innerHTML=shell(`${header(true)}<article class="result-card"><div class="result-kicker">YOUR TRAVEL PERSONA</div><h1>${p.name}</h1><p class="result-copy">${p.description}</p><div class="scoreline">${scoreText(record.scores)}</div><div class="result-date">${formatDate(record.date)}</div></article><div class="result-actions"><button class="btn btn-red" id="records">查看我的花少人格</button><button class="btn btn-ghost" id="again">重新测试</button></div><p class="footer-note">结果保存在当前浏览器，不会上传</p>`,"result-page");document.querySelector(".back").onclick=showHome;document.querySelector("#again").onclick=()=>showQuestion(0);document.querySelector("#records").onclick=showRecords}
function showRecords(){const records=getRecords();app.innerHTML=shell(`${header(true)}<section class="records"><h1>我的测试记录</h1><p>每一次旅行选择，都照见不一样的你。</p>${records.length?`<div class="record-list">${records.map((r,i)=>`<article class="record" data-index="${i}"><div class="record-top"><strong>${PEOPLE[r.winner].name}</strong><time>${formatDate(r.date)}</time></div><p>${scoreText(r.scores)}</p></article>`).join("")}</div>`:'<div class="empty">还没有测试记录，先去测一次吧。</div>'}<button class="btn btn-dark" id="new">开始新测试</button></section>`);document.querySelector(".back").onclick=showHome;document.querySelector("#new").onclick=()=>showQuestion(0);document.querySelectorAll(".record").forEach(x=>x.onclick=()=>showResult(records[Number(x.dataset.index)]))}
showHome();
