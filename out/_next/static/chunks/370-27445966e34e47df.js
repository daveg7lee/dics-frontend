"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[370],{8370:function(e,r,t){t.d(r,{cI:function(){return Oe}});var n=t(6687),s=e=>"checkbox"===e.type,c=e=>null==e;const u=e=>"object"===typeof e;var i=e=>!c(e)&&!Array.isArray(e)&&u(e)&&!(e instanceof Date),a=e=>e.substring(0,e.search(/.\d/))||e,l=(e,r)=>[...e].some((e=>a(r)===e)),o=e=>e.filter(Boolean),f=e=>void 0===e,d=(e={},r,t)=>{const n=o(r.split(/[,[\].]+?/)).reduce(((e,r)=>c(e)?e:e[r]),e);return f(n)||n===e?f(e[r])?t:e[r]:n};const b="blur",y="onBlur",g="onChange",m="onSubmit",h="onTouched",v="all",O="undefined",p="max",j="min",k="maxLength",V="minLength",_="pattern",A="required",w="validate";var x=(e,r)=>{const t=Object.assign({},e);return delete t[r],t};const R=n.createContext(null);R.displayName="RHFContext";var D=(e,r,t,n,s=!0)=>e?new Proxy(r,{get:(e,r)=>{if(r in e)return t.current[r]!==v&&(t.current[r]=!s||v),n&&(n.current[r]=!0),e[r]}}):r,S=e=>i(e)&&!Object.keys(e).length,C=(e,r,t)=>{const n=x(e,"name");return S(n)||Object.keys(n).length>=Object.keys(r).length||Object.keys(n).find((e=>r[e]===(!t||v)))},F=e=>Array.isArray(e)?e:[e],E=typeof window!==O&&typeof window.HTMLElement!==O&&typeof document!==O;const N=E?"Proxy"in window:typeof Proxy!==O;var B=(e,r,t,n,s)=>r?Object.assign(Object.assign({},t[e]),{types:Object.assign(Object.assign({},t[e]&&t[e].types?t[e].types:{}),{[n]:s||!0})}):{},M=e=>/^\w*$/.test(e),T=e=>o(e.replace(/["|']|\]/g,"").split(/\.|\[/));function L(e,r,t){let n=-1;const s=M(r)?[r]:T(r),c=s.length,u=c-1;for(;++n<c;){const r=s[n];let c=t;if(n!==u){const t=e[r];c=i(t)||Array.isArray(t)?t:isNaN(+s[n+1])?{}:[]}e[r]=c,e=e[r]}return e}const I=(e,r,t)=>{for(const n of t||Object.keys(e)){const t=d(e,n);if(t){const e=t._f,n=x(t,"_f");if(e&&r(e.name)){if(e.ref.focus&&f(e.ref.focus()))break;if(e.refs){e.refs[0].focus();break}}else i(n)&&I(n,r)}}},P=(e,r,t={})=>{for(const n in e.current){const s=e.current[n];if(s){const e=s._f,c=x(s,"_f");L(t,n,e&&e.ref?e.ref.disabled||e.refs&&e.refs.every((e=>e.disabled))?void 0:e.value:Array.isArray(s)?[]:{}),c&&P({current:c},r,t[n])}}return t};var q=e=>c(e)||!u(e);function H(e,r,t){if(q(e)||q(r)||e instanceof Date||r instanceof Date)return e===r;if(!n.isValidElement(e)){const n=Object.keys(e),s=Object.keys(r);if(n.length!==s.length)return!1;for(const c of n){const n=e[c];if(!t||"ref"!==c){const e=r[c];if((i(n)||Array.isArray(n))&&(i(e)||Array.isArray(e))?!H(n,e,t):n!==e)return!1}}}return!0}function U(e,r){if(q(e)||q(r))return r;for(const n in r){const s=e[n],c=r[n];try{e[n]=i(s)&&i(c)||Array.isArray(s)&&Array.isArray(c)?U(s,c):c}catch(t){}}return e}function $(e,r,t,n,s){let c=-1;for(;++c<e.length;){for(const n in e[c])Array.isArray(e[c][n])?(!t[c]&&(t[c]={}),t[c][n]=[],$(e[c][n],d(r[c]||{},n,[]),t[c][n],t[c],n)):H(d(r[c]||{},n),e[c][n])?L(t[c]||{},n):t[c]=Object.assign(Object.assign({},t[c]),{[n]:!0});n&&!t.length&&delete n[s]}return t}var W=(e,r,t)=>U($(e,r,t.slice(0,e.length)),$(r,e,t.slice(0,e.length)));var z=e=>"string"===typeof e;var G=e=>"boolean"===typeof e;function J(e,r){const t=M(r)?[r]:T(r),n=1==t.length?e:function(e,r){const t=r.slice(0,-1).length;let n=0;for(;n<t;)e=f(e)?n++:e[r[n++]];return e}(e,t),s=t[t.length-1];let c;n&&delete n[s];for(let u=0;u<t.slice(0,-1).length;u++){let r,n=-1;const s=t.slice(0,-(u+1)),a=s.length-1;for(u>0&&(c=e);++n<s.length;){const t=s[n];r=r?r[t]:e[t],a===n&&(i(r)&&S(r)||Array.isArray(r)&&!r.filter((e=>i(e)&&!S(e)||G(e))).length)&&(c?delete c[t]:delete e[t]),c=r}}return e}function K(e,r){const t={};for(const n of e){const e=d(r,n);e&&(M(n)?t[n]=e._f:L(t,n,e._f))}return t}var Q=e=>"file"===e.type,X=e=>"select-multiple"===e.type,Y=e=>"radio"===e.type;const Z={value:!1,isValid:!1},ee={value:!0,isValid:!0};var re=e=>{if(Array.isArray(e)){if(e.length>1){const r=e.filter((e=>e&&e.checked&&!e.disabled)).map((e=>e.value));return{value:r,isValid:!!r.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!f(e[0].attributes.value)?f(e[0].value)||""===e[0].value?ee:{value:e[0].value,isValid:!0}:ee:Z}return Z},te=(e,{valueAsNumber:r,valueAsDate:t,setValueAs:n})=>r?""===e?NaN:+e:t?new Date(e):n?n(e):e;const ne={isValid:!1,value:null};var se=e=>Array.isArray(e)?e.reduce(((e,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:e),ne):ne;function ce(e){if(e&&e._f){const t=e._f.ref;if(t.disabled)return;return Q(t)?t.files:Y(t)?se(e._f.refs).value:X(t)?(r=t.options,[...r].filter((({selected:e})=>e)).map((({value:e})=>e))):s(t)?re(e._f.refs).value:te(f(t.value)?e._f.ref.value:t.value,e._f)}var r}var ue=(e,r)=>e&&r&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate),ie=e=>"function"===typeof e,ae=e=>z(e)||n.isValidElement(e),le=e=>e instanceof RegExp;function oe(e,r,t="validate"){if(ae(e)||Array.isArray(e)&&e.every(ae)||G(e)&&!e)return{type:t,message:ae(e)?e:"",ref:r}}var fe=e=>i(e)&&!le(e)?e:{value:e,message:""},de=async({_f:{ref:e,refs:r,required:t,maxLength:n,minLength:u,min:a,max:l,pattern:o,validate:f,name:d,value:b,valueAsNumber:y,mount:g}},m)=>{if(!g)return{};const h={},v=Y(e),O=s(e),x=v||O,R=(y||Q(e))&&!e.value||""===b||Array.isArray(b)&&!b.length,D=B.bind(null,d,m,h),C=(r,t,n,s=k,c=V)=>{const u=r?t:n;h[d]=Object.assign({type:r?s:c,message:u,ref:e},D(r?s:c,u))};if(t&&(!v&&!O&&(R||c(b))||G(b)&&!b||O&&!re(r).isValid||v&&!se(r).isValid)){const{value:n,message:s}=ae(t)?{value:!!t,message:t}:fe(t);if(n&&(h[d]=Object.assign({type:A,message:s,ref:x?(r||[])[0]||{}:e},D(A,s)),!m))return h}if((!c(a)||!c(l))&&""!==b){let r,t;const n=fe(l),s=fe(a);if(isNaN(b)){const c=e.valueAsDate||new Date(b);z(n.value)&&(r=c>new Date(n.value)),z(s.value)&&(t=c<new Date(s.value))}else{const u=e.valueAsNumber||parseFloat(b);c(n.value)||(r=u>n.value),c(s.value)||(t=u<s.value)}if((r||t)&&(C(!!r,n.message,s.message,p,j),!m))return h}if(z(b)&&!R&&(n||u)){const e=fe(n),r=fe(u),t=!c(e.value)&&b.length>e.value,s=!c(r.value)&&b.length<r.value;if((t||s)&&(C(t,e.message,r.message),!m))return h}if(z(b)&&o&&!R){const{value:r,message:t}=fe(o);if(le(r)&&!b.match(r)&&(h[d]=Object.assign({type:_,message:t,ref:e},D(_,t)),!m))return h}if(f){const t=x&&r?r[0]:e;if(ie(f)){const e=oe(await f(b),t);if(e&&(h[d]=Object.assign(Object.assign({},e),D(w,e.message)),!m))return h}else if(i(f)){let e={};for(const[r,n]of Object.entries(f)){if(!S(e)&&!m)break;const s=oe(await n(b),t,r);s&&(e=Object.assign(Object.assign({},s),D(r,s.message)),m&&(h[d]=e))}if(!S(e)&&(h[d]=Object.assign({ref:t},e),!m))return h}}return h},be=e=>({isOnSubmit:!e||e===m,isOnBlur:e===y,isOnChange:e===g,isOnAll:e===v,isOnTouch:e===h}),ye=e=>e instanceof HTMLElement;class ge{constructor(){this.tearDowns=[]}add(e){this.tearDowns.push(e)}unsubscribe(){for(const e of this.tearDowns)e();this.tearDowns=[]}}class me{constructor(e,r){this.observer=e,this.closed=!1,r.add((()=>this.closed=!0))}next(e){this.closed||this.observer.next(e)}}class he{constructor(){this.observers=[]}next(e){for(const r of this.observers)r.next(e)}subscribe(e){const r=new ge,t=new me(e,r);return this.observers.push(t),r}unsubscribe(){this.observers=[]}}const ve=typeof window===O;function Oe({mode:e=m,reValidateMode:r=g,resolver:t,context:u,defaultValues:y={},shouldFocusError:h=!0,shouldUnregister:O,criteriaMode:p}={}){const j=n.useRef({}),k=n.useRef(new Set),V=n.useRef(new he),_=n.useRef(new Set),A=n.useRef(new he),w=n.useRef(new he),R=n.useRef(new he),B=n.useRef({}),M=n.useRef(!1),T=n.useRef(new Set),U=n.useRef(!1),$=n.useRef({}),G=n.useRef({}),Z=n.useRef(y),ee=n.useRef(!1),re=n.useRef(u),ne=n.useRef(t),se=n.useRef(new Set),ae=be(e),le=p===v,[oe,fe]=n.useState({isDirty:!1,isValidating:!1,dirtyFields:{},isSubmitted:!1,submitCount:0,touchedFields:{},isSubmitting:!1,isSubmitSuccessful:!1,isValid:!ae.isOnSubmit,errors:{}}),ge=n.useRef({isDirty:!N,dirtyFields:!N,touchedFields:!N,isValidating:!N,isValid:!N,errors:!N}),me=n.useRef(oe);re.current=u,ne.current=t;const Oe=()=>me.current.isValid=H(G.current,$.current)&&S(me.current.errors),pe=n.useCallback(((e,r,t=!1,n={},s,u)=>{const i=d(me.current.errors,e);let a=t||!H(i,r,!0)||ge.current.isValid&&f(r)&&d($.current,e)&&!d(G.current,e);if(r?(J(G.current,e),a=a||!i||!H(i,r,!0),L(me.current.errors,e,r)):((d($.current,e)||ne.current)&&(L(G.current,e,!0),a=a||i),J(me.current.errors,e)),a&&!c(t)||!S(n)||u){const r=Object.assign(Object.assign({},n),{isValid:ne.current?!!s:Oe(),errors:me.current.errors,name:e});me.current=Object.assign(Object.assign({},me.current),r),V.current.next(u?{name:e}:r)}V.current.next({isValidating:!1})}),[]),je=n.useCallback(((e,r,t={},n,u)=>{u&&Me(e);const i=d(j.current,e,{})._f;if(i){const u=E&&ye(i.ref)&&c(r)?"":r;if(i.value=te(r,i),Y(i.ref)?(i.refs||[]).forEach((e=>e.checked=e.value===u)):Q(i.ref)&&!z(u)?i.ref.files=u:X(i.ref)?[...i.ref.options].forEach((e=>e.selected=u.includes(e.value))):s(i.ref)&&i.refs?i.refs.length>1?i.refs.forEach((e=>e.checked=Array.isArray(u)?!!u.find((r=>r===e.value)):u===e.value)):i.refs[0].checked=!!u:i.ref.value=u,n){const t=P(j);L(t,e,r),w.current.next({values:Object.assign(Object.assign({},Z.current),t),name:e})}t.shouldDirty&&Ve(e,u),t.shouldValidate&&xe(e)}}),[]),ke=n.useCallback(((e,r)=>{const t=P(j);return e&&r&&L(t,e,r),!H(t,Z.current)}),[]),Ve=n.useCallback(((e,r,t=!0)=>{if(ge.current.isDirty||ge.current.dirtyFields){const n=!H(d(Z.current,e),r),s=d(me.current.dirtyFields,e),c=me.current.isDirty;n?L(me.current.dirtyFields,e,!0):J(me.current.dirtyFields,e),me.current.isDirty=ke();const u={isDirty:me.current.isDirty,dirtyFields:me.current.dirtyFields,name:e},i=ge.current.isDirty&&c!==u.isDirty||ge.current.dirtyFields&&s!==d(me.current.dirtyFields,e);return i&&t&&V.current.next(u),i?u:{}}return{}}),[]),_e=n.useCallback((async(e,r)=>{const t=(await de(d(j.current,e),le))[e];return pe(e,t,r),f(t)}),[le]),Ae=n.useCallback((async(e,r=[])=>{const{errors:t}=await ne.current(P(j),re.current,{criteriaMode:p,names:r,fields:K(k.current,j.current)});for(const n of e){const e=d(t,n);e?L(me.current.errors,n,e):J(me.current.errors,n)}return t}),[p]),we=async e=>{let r=!0;for(const t in e){const n=e[t];if(n){const e=n._f,t=x(n,"_f");if(e){const t=await de(n,le);t[e.name]?(r=!1,L(me.current.errors,e.name,t[e.name]),J(G.current,e.name)):d($.current,e.name)&&(L(G.current,e.name,!0),J(me.current.errors,e.name))}t&&await we(t)}}return r},xe=n.useCallback((async e=>{const r=f(e)?Object.keys(j.current):F(e);let t,n={};return V.current.next({isValidating:!0}),ne.current?(n=await Ae(r,f(e)?void 0:r),t=r.every((e=>!d(n,e)))):t=f(e)?await we(j.current):(await Promise.all(r.filter((e=>d(j.current,e))).map((async e=>await _e(e,null))))).every(Boolean),V.current.next(Object.assign(Object.assign({},z(e)?{name:e}:{}),{errors:me.current.errors,isValidating:!1,isValid:ne.current?S(n):Oe()})),t}),[Ae,_e]),Re=n.useCallback(((e,r,t)=>Object.entries(r).forEach((([r,n])=>{const s=`${e}.${r}`,c=d(j.current,s);se.current.has(e)||c&&!c._f?Re(s,n,t):je(s,n,t,!0,!c)}))),[xe]),De=e=>ee.current||T.current.has(e)||T.current.has((e.match(/\w+/)||[])[0]),Se=(e,r,t,n)=>{const s=d(j.current,e),c=f(s._f.value)?d(Z.current,e):s._f.value;return s&&!f(c)&&(t&&t.defaultChecked?s._f.value=ce(s):l(se.current,e)?s._f.value=c:je(e,c)),(!f(c)||n)&&ue(r,s._f.mount)&&!ae.isOnSubmit&&s&&ge.current.isValid&&de(s,le).then((r=>{S(r)?L(G.current,e,!0):J(G.current,e),me.current.isValid!==Oe()&&fe(Object.assign(Object.assign({},me.current),{isValid:Oe()}))})),c},Ce=n.useCallback((async({type:e,target:t,target:{value:n,type:c}})=>{let u,i,l=t.name;const o=d(j.current,l);if(o){let y=c?ce(o):void 0;y=f(y)?n:y;const g=e===b,{isOnBlur:m,isOnChange:h}=be(r),v=!ue(o._f,o._f.mount)&&!ne.current&&!d(me.current.errors,l)||(({isOnBlur:e,isOnChange:r,isOnTouch:t,isTouched:n,isReValidateOnBlur:s,isReValidateOnChange:c,isBlurEvent:u,isSubmitted:i,isOnAll:a})=>!a&&(!i&&t?!(n||u):(i?s:e)?!u:!(i?c:r)||u))(Object.assign({isBlurEvent:g,isTouched:!!d(me.current.touchedFields,l),isSubmitted:me.current.isSubmitted,isReValidateOnBlur:m,isReValidateOnChange:h},ae)),O=!g&&De(l);f(y)||(o._f.value=y);const k=Ve(l,o._f.value,!1);g&&!d(me.current.touchedFields,l)&&(L(me.current.touchedFields,l,!0),ge.current.touchedFields&&(k.touchedFields=me.current.touchedFields));let _=!S(k)||O;if(v)return!g&&A.current.next({name:l,type:e,value:y}),_&&V.current.next(O?{name:l}:Object.assign(Object.assign({},k),{name:l}));if(V.current.next({isValidating:!0}),ne.current){const{errors:e}=await ne.current(P(j),re.current,{criteriaMode:p,fields:K([l],j.current),names:[l]}),r=me.current.isValid;if(u=d(e,l),s(t)&&!u){const r=a(l),t=d(e,r,{});t.type&&t.message&&(u=t),(t||d(me.current.errors,r))&&(l=r)}i=S(e),r!==i&&(_=!0)}else u=(await de(o,le))[l];!g&&A.current.next({name:l,type:e,value:y}),pe(l,u,_,k,i,O)}}),[]),Fe=n.useCallback((async(e={})=>{const r=me.current.isValid;if(t){const{errors:r}=await ne.current(Object.assign(Object.assign({},P(j)),e),re.current,{criteriaMode:p,fields:K(k.current,j.current)});me.current.isValid=S(r)}else Oe();r!==me.current.isValid&&V.current.next({isValid:me.current.isValid})}),[p]),Ee=n.useCallback(((e,r,t)=>{const n=Array.isArray(e),s=U.current?Object.assign(Object.assign({},Z.current),P(j)):f(r)?Z.current:n?r||{}:{[e]:r};if(f(e))return t&&(ee.current=!0),s;const c=[];for(const u of F(e))t&&T.current.add(u),c.push(d(s,u));return n?c:c[0]}),[]),Ne=(e,r={})=>{for(const t of e?F(e):Object.keys(k.current))k.current.delete(t),se.current.delete(t),d(j.current,t)&&(r.keepIsValid||(J($.current,t),J(G.current,t)),!r.keepError&&J(me.current.errors,t),!r.keepValue&&J(j.current,t),!r.keepDirty&&J(me.current.dirtyFields,t),!r.keepTouched&&J(me.current.touchedFields,t),!O&&!r.keepDefaultValue&&J(Z.current,t),A.current.next({name:t}));V.current.next(Object.assign(Object.assign(Object.assign({},me.current),r.keepDirty?{isDirty:ke()}:{}),ne.current?{}:{isValid:Oe()})),!r.keepIsValid&&Fe()},Be=(e,r,t)=>{Me(e,t);let n=d(j.current,e);const c=(e=>Y(e)||s(e))(r);if(r===n._f.ref||E&&ye(n._f.ref)&&!ye(r)||c&&Array.isArray(n._f.refs)&&o(n._f.refs).find((e=>e===r)))return;n={_f:c?Object.assign(Object.assign({},n._f),{refs:[...o(n._f.refs||[]).filter((e=>ye(e)&&document.contains(e))),r],ref:{type:r.type,name:e}}):Object.assign(Object.assign({},n._f),{ref:r})},L(j.current,e,n);const u=Se(e,t,r,!0);(c&&Array.isArray(u)?!H(d(j.current,e)._f.value,u):f(d(j.current,e)._f.value))&&(d(j.current,e)._f.value=ce(d(j.current,e)))},Me=n.useCallback(((e,r)=>{const t=!d(j.current,e);return L(j.current,e,{_f:Object.assign(Object.assign(Object.assign({},t?{ref:{name:e}}:Object.assign({ref:(d(j.current,e)._f||{}).ref},d(j.current,e)._f)),{name:e,mount:!0}),r)}),ue(r,!0)&&L($.current,e,!0),k.current.add(e),t&&Se(e,r),ve?{name:e}:{name:e,onChange:Ce,onBlur:Ce,ref:t=>{if(t)Be(e,t,r);else{const t=d(j.current,e),n=O||r&&r.shouldUnregister;t&&(t._f.mount=!1),E&&(l(se.current,e)?n&&!M.current:n)&&_.current.add(e)}}}}),[Z.current]),Te=n.useCallback(((e,r)=>async t=>{t&&(t.preventDefault&&t.preventDefault(),t.persist&&t.persist());let n=!0,s=P(j);V.current.next({isSubmitting:!0});try{if(ne.current){const{errors:e,values:r}=await ne.current(s,re.current,{criteriaMode:p,fields:K(k.current,j.current)});me.current.errors=e,s=r}else await we(j.current);S(me.current.errors)&&Object.keys(me.current.errors).every((e=>d(s,e)))?(V.current.next({errors:{},isSubmitting:!0}),await e(s,t)):(r&&await r(me.current.errors,t),h&&I(j.current,(e=>d(me.current.errors,e)),k.current))}catch(c){n=!1}finally{me.current.isSubmitted=!0,V.current.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:S(me.current.errors)&&n,submitCount:me.current.submitCount+1,errors:me.current.errors})}}),[h,le,p]),Le=n.useCallback((({keepErrors:e,keepDirty:r,keepIsSubmitted:t,keepTouched:n,keepDefaultValues:s,keepIsValid:c,keepSubmitCount:u},i)=>{c||(G.current={},$.current={}),T.current=new Set,ee.current=!1,V.current.next({submitCount:u?me.current.submitCount:0,isDirty:r?me.current.isDirty:!!s&&H(i,Z.current),isSubmitted:!!t&&me.current.isSubmitted,isValid:c?me.current.isValid:!!Fe(i),dirtyFields:r?me.current.dirtyFields:{},touchedFields:n?me.current.touchedFields:{},errors:e?me.current.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})}),[]),Ie=(e,r="")=>{if(!d(j.current,r)&&(q(e)||E&&(e instanceof File||e instanceof Date))&&L(j.current,r,{_f:{ref:{name:r,value:e},value:e,name:r}}),Array.isArray(e)||i(e)){r&&!d(j.current,r)&&L(j.current,r,Array.isArray(e)?[]:{});for(const t in e)Ie(e[t],r+(r?".":"")+t)}};return n.useEffect((()=>{Ie(Z.current);const e=V.current.subscribe({next(e){C(e,ge.current,!0)&&(me.current=Object.assign(Object.assign({},me.current),e),fe(me.current))}}),r=R.current.subscribe({next(e){if(e.fields&&e.name&&ge.current.isValid){const r=P(j);L(r,e.name,e.fields),Fe(r)}}});return ne.current&&ge.current.isValid&&Fe(),()=>{A.current.unsubscribe(),e.unsubscribe(),r.unsubscribe()}}),[]),n.useEffect((()=>{const e=e=>!ye(e)||!document.contains(e);U.current=!0;for(const r of _.current){const t=d(j.current,r);t&&(t._f.refs?t._f.refs.every(e):e(t._f.ref))&&Ne(r)}_.current=new Set})),{control:n.useMemo((()=>({register:Me,isWatchAllRef:ee,inFieldArrayActionRef:M,watchFieldsRef:T,getIsDirty:ke,formStateSubjectRef:V,fieldArraySubjectRef:R,controllerSubjectRef:w,watchSubjectRef:A,watchInternal:Ee,fieldsRef:j,validFieldsRef:G,fieldsWithValidationRef:$,fieldArrayNamesRef:se,readFormStateRef:ge,formStateRef:me,defaultValuesRef:Z,fieldArrayDefaultValuesRef:B,unregister:Ne,shouldUnmount:O})),[]),formState:D(N,oe,ge),trigger:xe,register:Me,handleSubmit:Te,watch:n.useCallback(((e,r)=>ie(e)?A.current.subscribe({next:t=>e(Ee(void 0,r),t)}):Ee(e,r,!0)),[]),setValue:n.useCallback(((e,r,t={})=>{const n=d(j.current,e),s=se.current.has(e);s&&(R.current.next({fields:r,name:e,isReset:!0}),(ge.current.isDirty||ge.current.dirtyFields)&&t.shouldDirty&&(L(me.current.dirtyFields,e,W(r,d(Z.current,e,[]),d(me.current.dirtyFields,e,[]))),V.current.next({name:e,dirtyFields:me.current.dirtyFields,isDirty:ke(e,r)})),!r.length&&L(j.current,e,[])&&L(B.current,e,[])),n&&!n._f||s?Re(e,r,s?{}:t):je(e,r,t,!0,!n),De(e)&&V.current.next({}),A.current.next({name:e,value:r})}),[Re]),getValues:n.useCallback((e=>{const r=Object.assign(Object.assign({},Z.current),P(j));return f(e)?r:z(e)?d(r,e):e.map((e=>d(r,e)))}),[]),reset:n.useCallback(((e,r={})=>{const t=e||Z.current;if(E&&!r.keepValues)for(const s of k.current){const e=d(j.current,s);if(e&&e._f){const r=Array.isArray(e._f.refs)?e._f.refs[0]:e._f.ref;try{ye(r)&&r.closest("form").reset();break}catch(n){}}}!r.keepDefaultValues&&(Z.current=Object.assign({},t)),r.keepValues||(j.current={},w.current.next({values:Object.assign({},t)}),A.current.next({value:Object.assign({},t)}),R.current.next({fields:Object.assign({},t),isReset:!0})),!r.keepDefaultValues&&Ie(Object.assign({},t)),Le(r,e)}),[]),clearErrors:n.useCallback((e=>{e?F(e).forEach((e=>J(me.current.errors,e))):me.current.errors={},V.current.next({errors:me.current.errors})}),[]),unregister:n.useCallback(Ne,[]),setError:n.useCallback(((e,r,t)=>{const n=((d(j.current,e)||{_f:{}})._f||{}).ref;L(me.current.errors,e,Object.assign(Object.assign({},r),{ref:n})),V.current.next({name:e,errors:me.current.errors,isValid:!1}),t&&t.shouldFocus&&n&&n.focus&&n.focus()}),[]),setFocus:n.useCallback((e=>d(j.current,e)._f.ref.focus()),[])}}}}]);