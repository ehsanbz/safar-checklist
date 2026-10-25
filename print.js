(function(root){
'use strict';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fa=n=>Number(n).toLocaleString('fa-IR');
function create({items,entries,profile,catalogs,core,baggageLabel,date}){
 const selected=items.filter(i=>entries[i.id]?.selected),packed=selected.filter(i=>entries[i.id].packed).length;
 const groups=new Map();for(const i of selected){const key=core.labels[i.scope]+' / '+i.category;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(i);}
 const field=(label,value)=>`<div><b>${escape(label)}</b><span>${escape(value||'ثبت نشده')}</span></div>`;
 const meta=field('مدت اقامت',fa(profile.days)+' روز')+field('حمل‌ونقل',profile.transport.map(t=>catalogs.transports[t]).join('، '))+field('محل اقامت',profile.stays.map(t=>catalogs.stays[t]).join('، '))+field('نوع بار',baggageLabel)+field('فعالیت‌ها',profile.activities.map(t=>catalogs.activities[t]).join('، '))+field('امکان شست‌وشوی لباس',profile.laundry?'بله':'خیر')+(profile.dimensions?field('ابعاد مجاز بار',profile.dimensions):'')+(profile.weight?field('وزن مجاز بار',profile.weight+' کیلوگرم'):'');
 const html=`<div class="pdf-sheet" lang="fa" dir="rtl"><div class="pdf-heading"><div><span class="pdf-brand">همراه / فهرست نهایی سفر</span><h1>${escape(profile.tripName||'چک‌لیست سفر')}</h1></div><span class="pdf-date">${escape(date||new Date().toLocaleDateString('fa-IR'))}</span></div><div class="pdf-meta">${meta}</div><p class="pdf-stats">${fa(selected.length)} مورد انتخاب‌شده · ${fa(packed)} بسته‌شده · ${fa(selected.length-packed)} باقی‌مانده</p>${selected.length?'':'<p>هنوز وسیله‌ای انتخاب نشده است.</p>'}${[...groups].map(([title,list])=>`<section class="pdf-group"><h2>${escape(title)}</h2><table><thead><tr><th class="pdf-status">وضعیت</th><th>وسیله / اقدام</th><th class="pdf-qty">تعداد</th><th class="pdf-place">محل حمل</th></tr></thead><tbody>${list.map(i=>{const e=entries[i.id],r=core.restriction(i,profile);return `<tr><td class="pdf-status"><span class="pdf-box">${e.packed?'✓':''}</span><small>${e.packed?'بسته شد':'آماده شود'}</small></td><td>${escape(i.text)}${r.level!=='normal'?`<div class="pdf-warning">${escape(r.label)}: ${escape(r.note)}</div>`:''}</td><td class="pdf-qty">${fa(e.qty||core.quantity(i,profile))}</td><td class="pdf-place">${escape(e.place||r.place)}</td></tr>`;}).join('')}</tbody></table></section>`).join('')}<p class="pdf-footnote">فقط گزینه‌های انتخاب‌شده در این خروجی آمده‌اند؛ فیلتر نمایش روی خروجی اثری ندارد. مجازبودن حمل اقلام را مطابق مقررات شرکت و کشورهای مسیر بررسی کن.</p></div>`;
 return {html,count:selected.length,packed};
}
const api={create};if(typeof module!=='undefined')module.exports=api;else root.TravelPrint=api;
})(typeof window!=='undefined'?window:globalThis);
