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
function suggested(item,p){if(!relevant(item,p)||restriction(item,p).level==='blocked')return false;if(p.transport.includes('flight')&&['small','backpack'].includes(p.baggage)&&/چمدان|سه‌پایه|چندراهی|سیم‌سیار|پتوی|فلاسک|کفش دوم|ترازوی|لپ‌تاپ|تبلت/.test(item.text))return false;return true;}
const tripLabels={flight:'پرواز',train:'قطار',bus:'اتوبوس',car:'سفر جاده‌ای',rental:'خودروی کرایه‌ای',ferry:'کشتی',active:'دوچرخه / موتور / پیاده',hotel:'هتل',hostel:'هاستل',dorm:'خوابگاه',airbnb:'آپارتمان / Airbnb',family:'خانهٔ آشنا',camp:'کمپ / کمپر',cold:'سرما و باران',beach:'ساحل / استخر / ورزش',hike:'طبیعت‌گردی',work:'کار / عکاسی',event:'مراسم',child:'کودک / نیازهای دسترسی',pet:'حیوان همراه'};
function itemTags(item){
 const t=item.text;let trips=item.scope==='base'||item.scope==='review'?['همهٔ سفرها']:[tripLabels[item.tag]||'سفر شخصی'];
 if(item.scope==='base'){
  if(/گذرنامه|کارت اقامت|ویزا|ترانزیت|سیم‌کارت|eSIM|رومینگ|تبدیل دوشاخه/.test(t))trips=['سفر بین‌المللی'];
  else if(/گواهینامه/.test(t))trips=['سفر با رانندگی'];
  else if(/مدارک اداری/.test(t))trips=['سفر اداری / بین‌المللی'];
  else if(/عطر|ادکلن|آرایشی|اصلاح|ریش‌تراش|زیورآلات/.test(t))trips=['اقامت شبانه','مراسم / نیاز شخصی'];
  else if(/لباس خواب|راحتی|حوله|شامپو|نرم‌کننده|شویندهٔ بدن|لباس چرک/.test(t))trips=['اقامت شبانه','سفر کوتاه و بلند'];
  else if(/چای|قهوه|ماته|فلاسک|قاشق|چاقو|لیوان/.test(t))trips=['سفر جاده‌ای','اقامت با آشپزخانه / طبیعت'];
  else if(/پشتیبان فایل|کتاب|بازی|قلم|دفترچه/.test(t))trips=['مسیر طولانی','کار / اوقات فراغت'];
 }
 const duration=/شویندهٔ لباس|آویز لباس|خشک‌کردن|شست‌وشو|اقامت طولانی/.test(t)||item.tag==='dorm'?'سفر بلند':'سفر کوتاه و بلند';
 if(!trips.includes(duration))trips.push(duration);
 let priority='optional',priorityLabel='اختیاری';
 if(/کارت شناسایی معتبر|گذرنامه برای|کارت اقامت و|ویزا،|داروهای مصرفی شخصی|نسخه یا گواهی لازم دارو|وسایل پزشکی شخصی|مدارک خودرو|بیمهٔ معتبر|مدارک و مجوزهای لازم حیوان|مدارک کودک|صندلی کودک|کلاه ایمنی|جلیقهٔ شبرنگ/.test(t)||/^(بلیت،|بلیت‌ها|گواهینامه و|مدارک و بیمهٔ موتور)/.test(t)){priority='essential';priorityLabel='ضروری در شرایط مربوط';}
 else if(item.scope==='review'||/حوله|شامپو|صابون|نخ دندان|مسواک|خمیردندان|لباس زیر|جوراب|کفش راحت|شارژر|تلفن همراه|پول نقد|کارت بانکی|قمقمه|آب متناسب|ضدآفتاب|دستمال|ملحفه|روبالشی|کیسه‌خواب|زیرانداز عایق|اطلاعات رزرو|تأیید رزرو|تماس اضطراری|کلید خانه|لنز|عینک طبی|محصولات قاعدگی/.test(t)){priority='needed';priorityLabel='موردنیاز';}
 return {trips,priority,priorityLabel};
}
const api={labels,relevant,restriction,quantity,suggested,itemTags};if(typeof module!=='undefined')module.exports=api;else root.TravelCore=api;
})(typeof window!=='undefined'?window:globalThis);


