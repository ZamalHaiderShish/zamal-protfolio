/* Shared by index.html, bio.html and goals.html.
   1) SITE holds the links you may need to edit (email, LinkedIn, resume file). Edit it here, once, for every page.
   2) Everything below it is behavior used on every page: mobile menu, header shadow on scroll,
      active-section highlight (home page only), gentle fade-in. */

/* ===== EDIT HERE: site links ===== */
const SITE={
 email:"zamalhaider1@gmail.com",
 linkedin:"https://www.linkedin.com/in/zamal-haider-shish-1a040a1b7/",
 resume:"Zamal-Haider-Shish-Resume.pdf", // REPLACE: put the PDF next to index.html
 testimonials:[] // {name,role,org,quote,photo}. The section stays hidden while this is empty.
};
/* ===== END EDIT ===== */

(()=>{
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const run=()=>{
/* footer links (the footer is the same on every page) */
const fe=$("#fe"),fl=$("#fl2");
if(fe)fe.href="mailto:"+SITE.email;
if(fl)fl.href=SITE.linkedin.startsWith("http")?SITE.linkedin:($("#home")?"#contact":"index.html#contact");

/* mobile menu */
const mb=$("#mb"),menu=$("#menu"),nav=$("#nav");
if(mb&&menu){
 const close=()=>{menu.classList.remove("open");mb.setAttribute("aria-expanded",false)};
 mb.onclick=()=>{const o=menu.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
 menu.onclick=close;
 addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("open")){close();mb.focus()}});
}

/* header gets a shadow once the page scrolls, and a thin gold bar shows how far down the page you are */
const bar=document.createElement("div");bar.className="prog";bar.setAttribute("aria-hidden","true");document.body.appendChild(bar);
let tk=0;const sc=()=>{tk=0;if(nav)nav.classList.toggle("sc",scrollY>8);const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform="scaleX("+(h>0?Math.min(1,scrollY/h):0)+")"};
addEventListener("scroll",()=>{if(!tk)tk=requestAnimationFrame(sc)},{passive:true});addEventListener("resize",sc);sc();

/* the header "View Resume" button opens the PDF directly */
$$(".hcta").forEach(a=>{a.href=SITE.resume;a.target="_blank";a.rel="noopener"});

/* active-section highlight: only the home page has in-page (#...) menu links; Bio and Goal Statement mark themselves with aria-current */
const spy=[...$$('#menu a[href^="#"]')],io="IntersectionObserver"in window;
if(spy.length&&io){
 const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)spy.forEach(a=>a.classList.toggle("on",a.hash==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
 $$("section[id]").forEach(s=>o.observe(s));
}

/* gentle fade-in for cards: cards in the same row appear one after another */
const r=io?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add("in");r.unobserve(t);setTimeout(()=>t.style.setProperty("--d","0s"),1200)}}),{threshold:.1}):null;
window.REVEAL=els=>[...els].forEach(x=>{const sib=[...x.parentNode.children].filter(c=>c.classList.contains("rv"));x.style.setProperty("--d",(sib.indexOf(x)%4)*90+"ms");r?r.observe(x):x.classList.add("in")});
REVEAL($$(".rv"));
};
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",run):run();
})();
