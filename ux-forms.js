/* Shared sign-in and account-form usability enhancements. */
(()=>{'use strict';
function enhancePassword(input){
 if(input.dataset.khPasswordReady)return;
 input.dataset.khPasswordReady='1';
 const holder=document.createElement('div');
 holder.className='kh-password-field';
 input.parentNode.insertBefore(holder,input);
 holder.append(input);
 const toggle=document.createElement('button');
 toggle.type='button';toggle.className='kh-password-toggle';
 toggle.textContent='إظهار';toggle.setAttribute('aria-label','إظهار كلمة المرور');
 toggle.setAttribute('aria-pressed','false');
 toggle.addEventListener('click',()=>{
   const reveal=input.type==='password';
   input.type=reveal?'text':'password';
   toggle.textContent=reveal?'إخفاء':'إظهار';
   toggle.setAttribute('aria-pressed',String(reveal));
   toggle.setAttribute('aria-label',reveal?'إخفاء كلمة المرور':'إظهار كلمة المرور');
   input.focus({preventScroll:true});
 });
 holder.append(toggle);
}
function enhance(){
 for(const input of document.querySelectorAll('input[type="password"]'))enhancePassword(input);
 for(const form of document.querySelectorAll('form')){
   if(form.dataset.khFormReady)return;
   form.dataset.khFormReady='1';
   form.addEventListener('invalid',event=>{
      const field=event.target;
      if(!field||!field.matches?.('input,select,textarea'))return;
      field.setAttribute('aria-invalid','true');
   },true);
   form.addEventListener('input',event=>{
      const field=event.target;
      if(field?.hasAttribute?.('aria-invalid')&&field.validity?.valid)field.removeAttribute('aria-invalid');
   });
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});else enhance();
})();
