(function(root){
const labels={base:'وسایل پایه',transport:'وسیلهٔ نقلیه',stay:'محل اقامت',activity:'فعالیت و مقصد',review:'بازبینی نهایی'};
function relevant(item,p){return item.scope==='base'||item.scope==='review'||(item.scope==='transport'&&p.transport.includes(item.tag))||(item.scope==='stay'&&p.stays.includes(item.tag))||(item.scope==='activity'&&p.activities.includes(item.tag));}
function restriction(item,p){
 const t=item.text; const flight=p.transport.includes('flight');
 if(item.scope==='review'||/^(تعیین تکلیف|خارج‌کردن)/.test(t))return {level:'normal',label:'اقدام پیش از سفر',note:'',place:'کیف دم‌دست'};
 if(flight && /سوخت|کپسول|هیزم|زغال/.test(t)) return {level:'blocked',label:'از پیشنهاد پرواز کنار گذاشته شد',note:'برای این قلم تأیید حمل لازم است؛ تا تأیید شرکت همراه نبر.',place:'بررسی تخصصی'};
 if(flight && /چاقو|ابزار چندکاره|چاقوی آشپزی/.test(t)) return {level:p.baggage==='checked'?'check':'blocked',label:p.baggage==='checked'?'بررسی برای بار تحویلی':'نامناسب برای سفر فقط با کابین',note:'این قلم برای کابین پیشنهاد نمی‌شود؛ شرایط دقیق نوع وسیله و بار تحویلی را بررسی کن.',place:'بار تحویلی؛ پس از تأیید'};
 if(flight && /پاوربانک|باتری‌های یدکی|باتری یدکی|باتری و شارژر دوربین/.test(t)) return {level:'check',label:'فقط کابین؛ بررسی ظرفیت',note:'ظرفیت، تعداد و شرایط استفاده را با شرکت بررسی کن. در بار تحویلی نگذار.',place:'کابین'};
 if(/بررسی حمل|بررسی ورود|بررسی مجوز|پهپاد|فندک|کبریت|آتش‌زنه|دخانیات|ویپ/.test(t)) return {level:'check',label:'نیازمند بررسی مقررات',note:'شرکت، مبدأ، ترانزیت و مقصد را برای این قلم بررسی کن.',place:'پس از بررسی'};
 return {level:'normal',label:'محدودیت ویژه در این فهرست ثبت نشده',note:'این برچسب تأیید قانونی حمل نیست.',place:'به انتخاب شما'};
}
function quantity(item,p){return item.quantity==='daily'?Math.min(Number(p.days)||1,p.laundry?4:10)+1:1;}
function suggested(item,p){if(!relevant(item,p)||restriction(item,p).level==='blocked')return false;if(p.baggage==='small'&&/چمدان|سه‌پایه|چندراهی|سیم‌سیار|پتوی|فلاسک|کفش دوم|ترازوی|لپ‌تاپ|تبلت/.test(item.text))return false;return true;}
const api={labels,relevant,restriction,quantity,suggested};if(typeof module!=='undefined')module.exports=api;else root.TravelCore=api;
})(typeof window!=='undefined'?window:globalThis);

