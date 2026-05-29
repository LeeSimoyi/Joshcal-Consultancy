
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',function(){
  if(window.scrollY>60){navbar.classList.remove('top');navbar.classList.add('scrolled');}
  else{navbar.classList.add('top');navbar.classList.remove('scrolled');}
},{passive:true});

const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobile-menu');
function closeMobileMenu(){mobileMenu.classList.remove('open');hamburger.classList.remove('open');hamburger.setAttribute('aria-expanded','false');}
hamburger.addEventListener('click',function(){
  const isOpen=mobileMenu.classList.contains('open');
  if(isOpen){closeMobileMenu();}else{mobileMenu.classList.add('open');hamburger.classList.add('open');hamburger.setAttribute('aria-expanded','true');}
});
document.addEventListener('click',function(e){if(!hamburger.contains(e.target)&&!mobileMenu.contains(e.target)){closeMobileMenu();}});

function switchSvc(idx){
  for(let i=0;i<6;i++){
    const p=document.getElementById('panel-'+i);
    if(p){p.classList.toggle('active',i===idx);}
  }
  document.querySelectorAll('.svc-tab').forEach((t,i)=>{
    t.classList.toggle('active',i===idx);
    t.setAttribute('aria-selected',i===idx);
  });
}

const revealEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
},{threshold:0.1,rootMargin:'0px 0px -60px 0px'});
revealEls.forEach(el=>revealObserver.observe(el));

document.querySelectorAll('.gallery-item,.industry-card').forEach((el,i)=>{
  el.style.transitionDelay=(i*0.07)+'s';
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='none';obs.unobserve(e.target);}});
  },{threshold:0.1});
  el.style.opacity='0';el.style.transform='translateY(20px)';el.style.transition='opacity 0.6s ease, transform 0.6s ease';
  obs.observe(el);
});

const backTop=document.getElementById('back-top');
window.addEventListener('scroll',function(){backTop.classList.toggle('visible',window.scrollY>700);},{passive:true});

function submitForm(){
  const btn=document.getElementById('form-submit');
  const fname=document.getElementById('fname').value.trim();
  const email=document.getElementById('email').value.trim();
  if(!fname||!email){
    btn.textContent='Please fill required fields';btn.style.background='#b91c1c';
    setTimeout(()=>{btn.textContent='Send Enquiry →';btn.style.background='';},2500);return;
  }
  btn.textContent='Sending…';btn.disabled=true;
  setTimeout(()=>{
    btn.textContent='Enquiry Sent! We\'ll be in touch soon ✓';
    btn.classList.add('success');btn.style.letterSpacing='0.5px';
  },1200);
}

const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-link');
window.addEventListener('scroll',function(){
  let current='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-130){current=s.id;}});
  navLinks.forEach(l=>{
    const isActive=l.getAttribute('href')==='#'+current;
    l.style.color=isActive?'var(--gold)':'rgba(255,255,255,0.75)';
  });
},{passive:true});

const heroImg=document.querySelector('.hero-right img');
if(heroImg){
  window.addEventListener('scroll',function(){
    const scroll=window.scrollY;
    if(scroll<window.innerHeight){heroImg.style.transform='translateY('+scroll*0.15+'px)';}
  },{passive:true});
}