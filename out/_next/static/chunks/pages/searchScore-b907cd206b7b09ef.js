(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[639],{3333:function(e,n,t){"use strict";var r=t(9404),a=t(803),i=new Map,c=new Map,s=!0,l=!1;function u(e){return e.replace(/[\s,]+/g," ").trim()}function o(e){var n=new Set,t=[];return e.definitions.forEach((function(e){if("FragmentDefinition"===e.kind){var r=e.name.value,a=u((l=e.loc).source.body.substring(l.start,l.end)),i=c.get(r);i&&!i.has(a)?s&&console.warn("Warning: fragment with name "+r+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"):i||c.set(r,i=new Set),i.add(a),n.has(a)||(n.add(a),t.push(e))}else t.push(e);var l})),(0,r.pi)((0,r.pi)({},e),{definitions:t})}function f(e){var n=u(e);if(!i.has(n)){var t=(0,a.Qc)(e,{experimentalFragmentVariables:l,allowLegacyFragmentVariables:l});if(!t||"Document"!==t.kind)throw new Error("Not a valid GraphQL document.");i.set(n,function(e){var n=new Set(e.definitions);n.forEach((function(e){e.loc&&delete e.loc,Object.keys(e).forEach((function(t){var r=e[t];r&&"object"===typeof r&&n.add(r)}))}));var t=e.loc;return t&&(delete t.startToken,delete t.endToken),e}(o(t)))}return i.get(n)}function d(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];"string"===typeof e&&(e=[e]);var r=e[0];return n.forEach((function(n,t){n&&"Document"===n.kind?r+=n.loc.source.body:r+=n,r+=e[t+1]})),f(r)}var h,m=d,v=function(){i.clear(),c.clear()},p=function(){s=!1},g=function(){l=!0},x=function(){l=!1};(h=d||(d={})).gql=m,h.resetCaches=v,h.disableFragmentWarnings=p,h.enableExperimentalFragmentVariables=g,h.disableExperimentalFragmentVariables=x,d.default=d,n.ZP=d},8814:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/searchScore",function(){return t(4256)}])},2397:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var r=t(2010),a=t(614),i=t.n(a);function c(){var e,n,t=(e=["\n  width: 100%;\n  height: 80vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"],n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}})));return c=function(){return t},t}var s=t(7821).ZP.div(c());function l(){return(0,r.jsx)(s,{children:(0,r.jsx)(i(),{type:"Oval",color:"#969696",height:30,width:30})})}},4256:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return o}});var r=t(2010),a=t(637),i=t(3333),c=t(6687),s=t(2397);function l(){var e,n,t=(e=["\n  query searchScore($term: String!) {\n    searchScore(term: $term) {\n      id\n      uploader\n      date\n      score\n      article\n      user {\n        username\n      }\n    }\n  }\n"],n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}})));return l=function(){return t},t}var u=(0,i.ZP)(l()),o=function(){var e=function(e){var n=(0,c.useState)(e),t=n[0],r=n[1];return{value:t,onChange:function(e){var n=e.target.value;r(n)},setValue:r}}(""),n=(0,a.useQuery)(u,{variables:{term:e.value}}),t=n.data,i=n.loading,l=n.refetch,o=(0,c.useState)(t),f=o[0],d=o[1];return(0,r.jsxs)("div",{className:"min-h-screen",children:[(0,r.jsxs)("header",{className:"w-full flex flex-col justify-center items-center h-32",children:[(0,r.jsx)("input",{placeholder:"Uploader Name",value:e.value,onChange:function(n){e.onChange(n),n.preventDefault(),l(),d(t)},className:"input"}),(0,r.jsx)("input",{type:"month",onChange:function(e){var n=e.target.value;e.preventDefault();var r=t.searchScore.filter((function(e){return e.date.includes(n)}));d({searchScore:r})},className:"input"})]}),i?(0,r.jsx)(s.Z,{}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h1",{className:"text-xl font-semibold",children:"\uac80\uc0c9 \uacb0\uacfc"}),(0,r.jsx)("ul",{className:"mb-20",children:null===f||void 0===f?void 0:f.searchScore.map((function(e){return(0,r.jsxs)("li",{className:"w-full flex justify-between",children:[(0,r.jsx)("h1",{className:"text-center w-full",children:e.uploader}),(0,r.jsx)("h1",{className:"text-center w-full",children:e.user.username}),(0,r.jsx)("h2",{className:"text-center w-full",children:e.article}),(0,r.jsx)("span",{className:"text-center w-full",children:e.date})]},e.id)}))})]})]})}}},function(e){e.O(0,[614,774,888,179],(function(){return n=8814,e(e.s=n);var n}));var n=e.O();_N_E=n}]);