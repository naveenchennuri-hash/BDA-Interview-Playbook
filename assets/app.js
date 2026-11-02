(function(){
  var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  var KEY='bda-steps-done',N=4,cur='1';
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
  function save(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
  function show(n){
    cur=String(n);
    $$('.stage').forEach(function(s){s.hidden=s.dataset.step!==cur});
    $$('.stp').forEach(function(b){b.classList.toggle('on',b.dataset.go===cur)});
    var st=$('.stage[data-step="'+cur+'"]');
    if(st&&st.getBoundingClientRect().top<0)st.scrollIntoView({block:'start'});
  }
  function paint(){
    var d=load();
    $$('.stp').forEach(function(b){b.classList.toggle('done',d.indexOf(b.dataset.go)>-1)});
    $$('input[data-done]').forEach(function(i){i.checked=d.indexOf(i.dataset.done)>-1});
    var bar=$('#pbar');if(bar)bar.style.width=(d.length/N*100)+'%';
    var t=$('#ptext');if(t)t.textContent=d.length+' of '+N+' done';
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-go]');if(b){show(b.dataset.go);return}
    var t=e.target.closest('.subtab');
    if(t){var box=t.closest('.stage');
      box.querySelectorAll('.subtab').forEach(function(x){x.classList.toggle('on',x===t)});
      box.querySelectorAll('.subpanel').forEach(function(p){p.hidden=p.dataset.sub!==t.dataset.sub});}
  });
  document.addEventListener('change',function(e){
    var i=e.target.closest('input[data-done]');if(!i)return;
    var d=load().filter(function(x){return x!==i.dataset.done});
    if(i.checked)d.push(i.dataset.done);
    save(d);paint();
    if(i.checked&&+i.dataset.done<N)show(+i.dataset.done+1);
  });
  var r=$('#preset');if(r)r.addEventListener('click',function(){save([]);paint();show(1)});
  if($('.stage')){paint();show(1)}
})();
