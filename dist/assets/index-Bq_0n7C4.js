(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();const O=document.querySelectorAll(".filter-btn"),z=document.querySelectorAll(".card[data-category]"),A=document.querySelector("#searchInput"),E=document.querySelector("#motionToggle"),x=document.querySelector("#metaToggle"),g={filter:"all",keyword:""},F={"--accent":"#2cb9c5","--accent-soft":"#7be2e8","--accent-deep":"#15747c","--motion-linear":"linear","--motion-ease-standard":"ease-in-out","--motion-ease-snappy":"cubic-bezier(0.42, 0, 0.58, 1)","--motion-ease-out":"ease-out","--motion-duration-xs":"0.9s","--motion-duration-sm":"1.1s","--motion-duration-md":"1.4s","--motion-duration-lg":"2.2s","--motion-duration-xl":"3.2s","--motion-duration-xxl":"5s"};function V(n){return n.replace(/var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/gi,(t,e,o)=>F[e]?F[e]:o?o.trim():e)}const R={loading:{scenario:"异步请求 / 首屏加载",token:"motion.loading"},motion:{scenario:"状态变化 / 数据强调",token:"motion.emphasis"},interactive:{scenario:"按钮反馈 / 引导操作",token:"motion.interactive"},transform:{scenario:"空间过渡 / 卡片转场",token:"motion.transform"},text:{scenario:"品牌标题 / 信息强调",token:"motion.typography"},background:{scenario:"页面氛围 / 空状态",token:"motion.background"}},H={加载脉冲:`.loader {
  border: 5px solid rgba(91, 209, 255, 0.25);
  border-top-color: #5bd1ff;
  animation: spin 1s linear infinite, pulse 1.4s ease-in-out infinite;
}`,跳动圆点:`.dots-loader span {
  animation: dotsBounce 0.9s ease-in-out infinite;
}
.dots-loader span:nth-child(2) { animation-delay: 0.15s; }`,频谱条形:`.bars-loader span {
  animation: barsScale 1s ease-in-out infinite;
}
.bars-loader span:nth-child(3) { animation-delay: 0.24s; }`,双环旋转:`.ring-loader { animation: spin 1.1s linear infinite; }
.ring-loader::after { animation: spinReverse 0.9s linear infinite; }`,骨架屏闪光:`.skeleton span {
  background-size: 180% 100%;
  animation: shimmer 1.3s linear infinite;
}`,进度滑条:`.progress-fill {
  width: 36%;
  animation: progressLoop 1.5s ease-in-out infinite;
}`,弹跳小球:`.ball {
  animation: bounce 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
}`,摆动钟锤:`.pendulum-line,
.pendulum-bob {
  transform-origin: top center;
  animation: pendulum 1.2s ease-in-out infinite;
}`,漂浮气泡:`.float-orb {
  animation: floatUp 2.3s ease-in-out infinite;
}`,波浪位移:`.wave-track span {
  animation: waveMove 1.3s ease-in-out infinite;
}`,轨道环绕:`.orbit span {
  transform-origin: 0 0;
  animation: orbitMove 2.2s linear infinite;
}`,心跳脉冲:`.heart {
  transform: rotate(-45deg);
  animation: heartbeat 1.2s ease-in-out infinite;
}`,渐变流动:`.cta {
  background-size: 220% 220%;
  animation: gradientShift 5s linear infinite;
}`,霓虹发光:`.cta-glow {
  animation: gradientShift 5s linear infinite, glowPulse 1.7s ease-in-out infinite;
}`,下划线滑入:`.link-btn::after {
  transform: scaleX(0);
  transition: transform 0.25s ease;
}
.link-btn:hover::after { transform: scaleX(1); }`,呼吸图标:`.icon-dot {
  box-shadow: 0 0 0 0 rgba(99, 216, 255, 0.55);
  animation: dotBreath 1.4s ease-in-out infinite;
}`,波纹点击:`.ripple-btn::after {
  transform: translate(-50%, -50%) scale(0.5);
}
.ripple-btn:hover::after { animation: rippleWave 0.9s ease-out; }`,磁吸悬停:`.magnet-btn:hover {
  transform: translateY(-3px) scale(1.03) rotate(-1deg);
  box-shadow: 0 10px 22px rgba(83, 144, 255, 0.38);
}`,翻转卡片:`.flip-card {
  transform-style: preserve-3d;
  animation: flip 3.2s ease-in-out infinite;
}`,旋转立方体:`.cube {
  transform-style: preserve-3d;
  animation: cubeSpin 4s linear infinite;
}`,倾斜面板:`.tilt-panel {
  transform-style: preserve-3d;
  animation: tiltLoop 2.8s ease-in-out infinite;
}`,折页翻开:`.fold-page {
  transform-origin: left center;
  animation: foldOpen 2.2s ease-in-out infinite;
}`,叠层翻牌:`.stack-wrap span {
  animation: stackFlip 2.2s ease-in-out infinite;
}`,棱柱旋转:`.prism {
  clip-path: polygon(50% 0, 100% 30%, 100% 70%, 50% 100%, 0 70%, 0 30%);
  animation: prismSpin 2.8s linear infinite;
}`,故障闪烁:`.glitch {
  animation: glitchSkew 1.4s steps(2, end) infinite;
}
.glitch::before,
.glitch::after { content: attr(data-text); }`,打字机:`.typing {
  width: 18ch;
  border-right: 2px solid #cfe5ff;
  animation: typing 3.2s steps(18) infinite, caret 0.9s step-end infinite;
}`,波浪字符:`.wave-text span {
  display: inline-block;
  animation: waveLetter 1.1s ease-in-out infinite;
}`,渐变流光字:`.gradient-text {
  color: transparent;
  background-clip: text;
  animation: textShine 2.8s linear infinite;
}`,极光流动:`.aurora {
  background: radial-gradient(circle at 25% 20%, rgba(81, 210, 255, 0.55), transparent 50%), #0f1930;
  animation: auroraFlow 6s ease-in-out infinite;
}`,星点闪烁:`.stars span {
  animation: twinkle 1.8s ease-in-out infinite;
}`,雷达扫描:`.radar::after {
  background: conic-gradient(from 20deg, rgba(103, 236, 255, 0.45), rgba(103, 236, 255, 0));
  animation: spin 2s linear infinite;
}`,网格扫光:`.grid-scan::after {
  transform: translateY(-100%);
  animation: scanLine 2.8s ease-in-out infinite;
}`,"Token 流式生成":`.ai-token-stream span {
  animation: tokenFlow 1.1s ease-in-out infinite;
}`,向量检索命中:`.ai-vector-hit {
  animation: radarSpin 3.2s linear infinite;
}
.ai-vector-hit span { animation: hitPulse 1.6s ease-in-out infinite; }`,数据管道吞吐:`.ai-pipeline span {
  animation: pipeFlow 1.8s linear infinite;
}`,模型置信度分布:`.ai-confidence span {
  animation: confidenceRise 1.3s ease-in-out infinite;
}`,异常告警脉冲:`.ai-anomaly span {
  animation: anomalyPulse 1.4s ease-in-out infinite;
}`,集群健康热力:`.ai-cluster span {
  animation: clusterBlink 1.8s ease-in-out infinite;
}`},Y={加载脉冲:["spin","pulse"],跳动圆点:["dotsBounce"],频谱条形:["barsScale"],双环旋转:["spin","spinReverse"],骨架屏闪光:["shimmer"],进度滑条:["progressLoop"],弹跳小球:["bounce","shadow"],摆动钟锤:["pendulum"],漂浮气泡:["floatUp"],波浪位移:["waveMove"],轨道环绕:["orbitMove"],心跳脉冲:["heartbeat"],渐变流动:["gradientShift"],霓虹发光:["gradientShift","glowPulse"],下划线滑入:[],呼吸图标:["dotBreath"],波纹点击:["rippleWave"],磁吸悬停:[],翻转卡片:["flip"],旋转立方体:["cubeSpin"],倾斜面板:["tiltLoop"],折页翻开:["foldOpen"],叠层翻牌:["stackFlip"],棱柱旋转:["prismSpin"],故障闪烁:["glitchSkew"],打字机:["typing","caret"],波浪字符:["waveLetter"],渐变流光字:["textShine"],极光流动:["auroraFlow"],星点闪烁:["twinkle"],雷达扫描:["spin"],网格扫光:["scanLine"],"Token 流式生成":["tokenFlow"],向量检索命中:["radarSpin","hitPulse"],数据管道吞吐:["pipeFlow"],模型置信度分布:["confidenceRise"],异常告警脉冲:["anomalyPulse"],集群健康热力:["clusterBlink"]};function j(){const n=new Map;for(const t of document.styleSheets){let e;try{e=t.cssRules}catch{continue}if(e)for(const o of e)o.type===CSSRule.KEYFRAMES_RULE&&n.set(o.name,o.cssText)}return n}function T(){const n=g.keyword.trim().toLowerCase(),t={loading:"加载反馈",motion:"运动效果",interactive:"交互按钮",transform:"3D 变换",text:"文字特效",background:"背景氛围"};z.forEach(e=>{var v,k,f;const o=e.dataset.category,i=e.querySelector("h2"),a=((v=i==null?void 0:i.textContent)==null?void 0:v.toLowerCase())||"",r=e.querySelector(".card-tag"),c=((k=r==null?void 0:r.textContent)==null?void 0:k.toLowerCase())||"",l=((f=t[o])==null?void 0:f.toLowerCase())||"",m=g.filter==="all"||o===g.filter,d=!n||a.includes(n)||c.includes(n)||l.includes(n),s=m&&d;e.hidden=!s,e.setAttribute("aria-hidden",String(!s))}),O.forEach(e=>{const o=e.dataset.filter===g.filter;e.classList.toggle("is-active",o),e.setAttribute("aria-pressed",String(o))})}function X(n){var e;if((e=navigator.clipboard)!=null&&e.writeText)return navigator.clipboard.writeText(n);const t=document.createElement("textarea");return t.value=n,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.append(t),t.select(),document.execCommand("copy"),t.remove(),Promise.resolve()}function _(n){const t=n.filter(e=>!(!(e instanceof HTMLElement)||e.matches(".card-tag")||e.matches("h2")));return t.length===0?"":t.map(e=>e.outerHTML).join(`
`)}function W(){const n=j();z.forEach(t=>{var B,q;if(t.querySelector(".card-inner"))return;const e=(q=(B=t.querySelector("h2"))==null?void 0:B.textContent)==null?void 0:q.trim();if(!e||!H[e])return;const o=[...t.childNodes],i=H[e],r=(Y[e]||[]).map(u=>n.get(u)).filter(Boolean).join(`

`),c=_(o),l=r?`${i}

${r}`:`${i}

/* 此效果主要依赖 transition/transform，无额外 keyframes */`,m=`${c}

${V(l)}`,d=document.createElement("div");d.className="card-inner";const s=document.createElement("div");s.className="card-face card-front",o.forEach(u=>{s.append(u)});const v=t.dataset.category||"loading",k=R[v]||R.loading,f=document.createElement("div");f.className="meta-row";const w=document.createElement("span");w.className="meta-badge",w.textContent=`场景: ${k.scenario}`,f.append(w);const h=document.createElement("button");h.className="snippet-toggle",h.type="button",h.textContent="代码片段";const S=document.createElement("div");S.className="card-face card-back";const L=document.createElement("div");L.className="snippet-top";const C=document.createElement("p");C.className="snippet-title",C.textContent=`${e} 代码`;const b=document.createElement("button");b.className="snippet-toggle snippet-toggle-inline",b.type="button",b.textContent="返回效果";const $=document.createElement("div");$.className="snippet-actions";const p=document.createElement("button");p.className="copy-btn",p.type="button",p.textContent="复制完整代码";const P=document.createElement("pre");P.className="snippet-code",P.textContent=m;const K=(u,U)=>{u.textContent=U,u.classList.add("is-copied"),setTimeout(()=>{u.classList.remove("is-copied"),u===p&&(u.textContent="复制完整代码")},1200)};p.addEventListener("click",async()=>{try{await X(m),K(p,"完整已复制")}catch{p.textContent="复制失败"}}),h.addEventListener("click",()=>{t.classList.add("is-flipped")}),b.addEventListener("click",()=>{t.classList.remove("is-flipped")}),L.append(C,b),$.append(p),S.append(L,$,P),s.append(f,h),t.replaceChildren(d),d.append(s,S)})}O.forEach(n=>{n.addEventListener("click",()=>{g.filter=n.dataset.filter||"all",T()})});A&&A.addEventListener("input",n=>{g.keyword=n.target.value||"",T()});E&&E.addEventListener("click",()=>{const n=document.body.classList.toggle("reduced-preview");E.setAttribute("aria-pressed",String(n)),E.textContent=n?"开启":"关闭"});x&&x.addEventListener("click",()=>{const n=document.body.classList.toggle("show-meta");x.setAttribute("aria-pressed",String(n)),x.textContent=n?"开启":"关闭"});const N=document.querySelectorAll(".theme-btn");N.forEach(n=>{n.addEventListener("click",()=>{var e;const t=n.dataset.theme;document.documentElement.setAttribute("data-theme",t),document.documentElement.style.removeProperty("--accent"),document.documentElement.style.removeProperty("--accent-rgb"),document.documentElement.style.removeProperty("--accent-2"),document.documentElement.style.removeProperty("--accent-2-rgb"),document.documentElement.style.removeProperty("--accent-soft"),document.documentElement.style.removeProperty("--accent-soft-rgb"),document.documentElement.style.removeProperty("--accent-deep"),document.documentElement.style.removeProperty("--accent-deep-rgb"),N.forEach(o=>{o.classList.toggle("is-active",o===n)}),(e=document.querySelector(".custom-color-wrapper"))==null||e.classList.remove("is-active")})});function G(n){const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function D(n,t,e){n/=255,t/=255,e/=255;const o=Math.max(n,t,e),i=Math.min(n,t,e);let a,r,c=(o+i)/2;if(o===i)a=r=0;else{const l=o-i;switch(r=c>.5?l/(2-o-i):l/(o+i),o){case n:a=((t-e)/l+(t<e?6:0))/6;break;case t:a=((e-n)/l+2)/6;break;case e:a=((n-t)/l+4)/6;break}}return{h:a*360,s:r*100,l:c*100}}function y(n,t,e){n/=360,t/=100,e/=100;let o,i,a;if(t===0)o=i=a=e;else{const r=(m,d,s)=>(s<0&&(s+=1),s>1&&(s-=1),s<.16666666666666666?m+(d-m)*6*s:s<.5?d:s<.6666666666666666?m+(d-m)*(.6666666666666666-s)*6:m),c=e<.5?e*(1+t):e+t-e*t,l=2*e-c;o=r(l,c,n+1/3),i=r(l,c,n),a=r(l,c,n-1/3)}return{r:Math.round(o*255),g:Math.round(i*255),b:Math.round(a*255)}}function J(n){const t=G(n);if(!t)return null;const e=D(t.r,t.g,t.b),o=y(e.h,e.s,Math.max(e.l-15,10)),i=y(e.h,Math.max(e.s-10,30),Math.min(e.l+20,85)),a=y(e.h,e.s,Math.max(e.l-25,5));return{accent:`${t.r}, ${t.g}, ${t.b}`,accent2:`${o.r}, ${o.g}, ${o.b}`,accentSoft:`${i.r}, ${i.g}, ${i.b}`,accentDeep:`${a.r}, ${a.g}, ${a.b}`}}const I=document.querySelector("#customColor"),M=document.querySelector(".custom-color-wrapper");I&&I.addEventListener("input",n=>{const t=n.target.value,e=J(t);if(e){document.documentElement.removeAttribute("data-theme"),document.documentElement.style.setProperty("--accent",t),document.documentElement.style.setProperty("--accent-rgb",e.accent),document.documentElement.style.setProperty("--accent-2-rgb",e.accent2),document.documentElement.style.setProperty("--accent-soft-rgb",e.accentSoft),document.documentElement.style.setProperty("--accent-deep-rgb",e.accentDeep);const o=D(...e.accent.split(", ").map(Number)),i=y(o.h,o.s,Math.max(o.l-15,10)),a=y(o.h,Math.max(o.s-10,30),Math.min(o.l+20,85)),r=y(o.h,o.s,Math.max(o.l-25,5));document.documentElement.style.setProperty("--accent-2",`rgb(${i.r}, ${i.g}, ${i.b})`),document.documentElement.style.setProperty("--accent-soft",`rgb(${a.r}, ${a.g}, ${a.b})`),document.documentElement.style.setProperty("--accent-deep",`rgb(${r.r}, ${r.g}, ${r.b})`),N.forEach(c=>{c.classList.remove("is-active")}),M==null||M.classList.add("is-active")}});W();T();document.body.classList.add("show-meta");
