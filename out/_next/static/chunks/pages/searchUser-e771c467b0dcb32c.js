(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[781],{3026:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/searchUser",function(){return n(2370)}])},2397:function(e,r,n){"use strict";n.d(r,{Z:function(){return l}});var t=n(2010),i=n(614),c=n.n(i);function a(){var e,r,n=(e=["\n  width: 100%;\n  height: 80vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"],r||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}})));return a=function(){return n},n}var o=n(7821).ZP.div(a());function l(){return(0,t.jsx)(o,{children:(0,t.jsx)(c(),{type:"Oval",color:"#969696",height:30,width:30})})}},6181:function(e,r,n){"use strict";var t=n(2010),i=n(6687),c=n(265);r.Z=function(e){var r=e.contents,n=(0,i.useState)(null),a=n[0],o=n[1],l=Boolean(a),s=l?"simple-popover":void 0;return(0,t.jsxs)("div",{children:[(0,t.jsx)("button",{"aria-describedby":s,onClick:function(e){o(e.currentTarget)},className:"blueButton",children:"Detail"}),(0,t.jsx)(c.ZP,{id:s,open:l,anchorEl:a,onClose:function(){o(null)},anchorOrigin:{vertical:"top",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:r})]})}},2324:function(e,r,n){"use strict";var t=n(2010),i=n(7821);function c(e,r){return r||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}function a(){var e=c(["\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 20px;\n  padding: 1rem;\n"]);return a=function(){return e},e}function o(){var e=c([""]);return o=function(){return e},e}function l(){var e=c(["\n  text-align: center;\n"]);return l=function(){return e},e}function s(){var e=c(["\n  cursor: pointer;\n  background-color: ",";\n  padding: 8px 3px;\n  border-radius: 4px;\n  color: white;\n"]);return s=function(){return e},e}var u=i.ZP.table(a()),d=i.ZP.th(o()),f=i.ZP.td(l()),h=i.ZP.h1(s(),(function(e){return e.theme.blueColor}));r.Z=function(e){var r=e.scores,n=e.deleteScore,i=e.Admin;return(0,t.jsxs)(u,{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)(d,{children:"Score"}),(0,t.jsx)(d,{children:"Article"}),(0,t.jsx)(d,{children:"Date"}),(0,t.jsx)(d,{children:"Uploader"}),(0,t.jsx)(d,{children:"Detail"}),i&&(0,t.jsx)(d,{children:"Delete"})]})}),r.map((function(e){return(0,t.jsxs)("tr",{style:{marginTop:"0.5rem"},children:[(0,t.jsx)(f,{children:"Demerit"===e.type?-1*e.score:e.score}),(0,t.jsx)(f,{children:e.article}),(0,t.jsx)(f,{children:e.date.replace(/T.*/,"").split("-").join("-")}),(0,t.jsx)(f,{children:e.uploader}),(0,t.jsx)(f,{children:e.detail}),i&&(0,t.jsx)(f,{onClick:n,children:(0,t.jsx)(h,{id:e.id,children:"Delete"})})]},e.id)}))]})}},2370:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return g}});var t=n(9884),i=n.n(t),c=n(2010),a=n(637),o=n(6373),l=(n(6687),n(681)),s=n(2397),u=n(6181),d=n(2324),f=function(e){var r=e.user,n=e.totalScore,t=e.deleteScore,i=e.totalMerit;return(0,c.jsxs)("li",{className:"grid grid-cols-5 mt-6",children:[(0,c.jsx)("div",{className:"w-12 h-12 rounded-full overflow-hidden justify-self-center",children:(0,c.jsx)("img",{src:r.avatar,alt:"Profile Img",className:"min-w-full max-w-full"})}),(0,c.jsx)("h1",{className:"allCenter",children:r.username}),(0,c.jsx)("span",{className:"allCenter",children:n}),(0,c.jsx)("span",{className:"allCenter",children:i}),(0,c.jsx)(u.Z,{contents:(0,c.jsx)(c.Fragment,{children:r.scores.length>=1?(0,c.jsx)(d.Z,{scores:r.scores,deleteScore:t,Admin:!0}):(0,c.jsx)("h1",{children:"Nothing Here"})})})]},r.id)};function h(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function p(e,r,n,t,i,c,a){try{var o=e[c](a),l=o.value}catch(s){return void n(s)}o.done?r(l):Promise.resolve(l).then(t,i)}function m(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var t,i,c=[],a=!0,o=!1;try{for(n=n.call(e);!(a=(t=n.next()).done)&&(c.push(t.value),!r||c.length!==r);a=!0);}catch(l){o=!0,i=l}finally{try{a||null==n.return||n.return()}finally{if(o)throw i}}return c}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return h(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,r){return r||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}function x(){var e=v(["\n  query {\n    seeUsers {\n      id\n      username\n      avatar\n      type\n      totalScores\n      totalMerit\n      scores {\n        id\n        score\n        article\n        date\n        type\n        uploader\n        detail\n      }\n    }\n  }\n"]);return x=function(){return e},e}function j(){var e=v(["\n  mutation deleteScore($id: ID!) {\n    deleteScore(id: $id)\n  }\n"]);return j=function(){return e},e}var b=(0,o.gql)(x()),y=(0,o.gql)(j()),g=function(){var e=(0,a.useQuery)(b),r=e.data,n=e.loading,t=e.refetch,o=m((0,a.useMutation)(y),1)[0],u=function(){var e,r=(e=i().mark((function e(r){var n,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.prev=1,n=r.target.id,e.next=5,o({variables:{id:n}});case 5:e.sent.data&&(l.Am.success("Deleted"),t()),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),c=e.t0.message.replace("GraphQL","").replace("error","").replace(":",""),l.Am.error(c);case 14:case"end":return e.stop()}}),e,null,[[1,10]])})),function(){var r=this,n=arguments;return new Promise((function(t,i){var c=e.apply(r,n);function a(e){p(c,t,i,a,o,"next",e)}function o(e){p(c,t,i,a,o,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}();return(0,c.jsx)("div",{className:"min-h-screen",children:n?(0,c.jsx)(s.Z,{}):(0,c.jsxs)("ul",{className:"mb-20",children:[(0,c.jsxs)("div",{className:"mb-40 px-10",children:[(0,c.jsx)("h1",{className:"text-2xl font-semibold p-4 border-b border-black mt-4",children:"\uc194\ub85c\ubaac \uace0\uc704\ud5d8\uc790"}),r.seeUsers.map((function(e){if(e.totalScores<=-15)return(0,c.jsx)(f,{user:e,totalScore:e.totalScores,totalMerit:e.totalMerit,deleteScore:u})}))]}),(0,c.jsxs)("div",{className:"px-10",children:[(0,c.jsx)("h1",{className:"text-2xl font-semibold p-4 border-b border-black mt-4",children:"\uc804\uccb4 \ubcf4\uae30"}),r.seeUsers.map((function(e){if("Admin"!==e.username)return(0,c.jsx)(f,{user:e,totalScore:e.totalScores,totalMerit:e.totalMerit,deleteScore:u})}))]})]})})}}},function(e){e.O(0,[614,13,265,774,888,179],(function(){return r=3026,e(e.s=r);var r}));var r=e.O();_N_E=r}]);