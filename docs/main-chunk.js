(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(t,c,a){"use strict";(function(o){a.d(c,"a",function(){return n});var t=["news","newest","ask","show","jobs","item/:key","user:/key"],e=t.reduce(function(t,e){return t[e]=function(n){return function(t){var e=n.split("/")[0];return"https://api.hnpwa.com/v0/".concat(e,"/").concat(t,".json")}}(e),t},{}),n={getComments:function(n){return function(e){return function(t){n.state.prev=n.state.route,n.state.route=e,n.data[e]?n.data[e]:n.data[e]={data:[]},n.reqs.http(n)(n.reqs.urls["item/:key"](t))(e)}}},getData:function(n){return function(t){n.state.showComment=!1,n.state.comment={},n.state.route=t;var e=n.getPath(t);n.data[t]?n.data[t]:n.data[t]={data:[]},n.reqs.http(n)(n.reqs.urls[e](n.state.page))(t)}},routes:t,getPath:function(t){return t.split("/")[1]},reqs:{urls:e,http:function(n){return function(t){return function(e){return o.request({url:t,method:"GET"}).then(function(t){return n.data[e].data=t,n})}}}},data:{},state:{key:"",url:"",route:"",page:1,profile:"",tabsShowing:!1,title:"",comment:{},showModal:!1},toggleComments:function(t){var e=t.model,n=t.key,o=t.level;return e.state.comment["".concat(n,"-").concat(o)]?e.state.comment["".concat(n,"-").concat(o)]=!e.state.comment["".concat(n,"-").concat(o)]:e.state.comment["".concat(n,"-").concat(o)]=!0},toggleModal:function(t){return t.state.showModal=!t.state.showModal}}}).call(this,a(0))},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){"use strict";n.r(e);var m=n(0),o=n(1);var a=function(t){var e=t.dom;e.style.opacity=0,e.classList.toggle("slideRight"),e.style.opacity=1},r=function(t){var e=t.dom;e.style.opacity=0,e.classList.toggle("expandOpen"),e.style.opacity=1},c=function(t){var e=t.dom;e.style.opacity=0,e.classList.toggle("slideLeft"),e.style.opacity=1},u=function(n){return function(t){var e=t.dom;e.style.opacity=0,setTimeout(function(){e.classList.toggle(n),e.style.opacity=1},200)}},i=n(7),l={view:function(t){var e=t.attrs,n=e.title,o=e.model;return Object(m.default)(".modal-header",[Object(m.default)("h4.title",n),Object(m.default)("button.closeBtn",{onclick:function(){return o.toggleModal(o)}},"X")])}},d={view:function(t){var e=t.children;return Object(m.default)(".modal-contents",e)}},s={view:function(t){var e=t.children;return Object(m.default)(".modal-footer",e)}},f={view:function(t){var e=t.attrs,n=e.title,o=e.contents,c=e.footer,a=e.model;return Object(m.default)("section.modalContainer",Object(m.default)(".modal",{oncreate:r},[Object(m.default)(l,{title:n,model:a}),Object(m.default)(d,o),Object(m.default)(s,c)]))}};function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=Object(m.default)("path",{d:"M31.716,13.5C31.699,6.47,25.974,0.755,18.94,0.755c-7.045,0-12.777,5.732-12.777,12.777\n\t\t\tc0,0.022,0.004,0.043,0.004,0.065C2.477,15.84,0,19.887,0,24.511c0,7.046,5.731,12.777,12.777,12.777\n\t\t\tc2.268,0,4.395-0.601,6.244-1.642c1.849,1.041,3.977,1.642,6.245,1.642c7.046,0,12.777-5.732,12.777-12.777\n\t\t\tC38.043,19.82,35.495,15.722,31.716,13.5z M19.021,32.961c-2.312-1.713-3.906-4.341-4.22-7.352c1.3,0.448,2.689,0.702,4.139,0.702\n\t\t\tc1.514,0,2.96-0.278,4.307-0.764C22.949,28.584,21.349,31.236,19.021,32.961z M8.517,14.898c1.303-0.579,2.743-0.909,4.26-0.909\n\t\t\tc1.475,0,2.879,0.307,4.154,0.858c-2.114,1.826-3.629,4.325-4.195,7.167C10.473,20.352,8.898,17.814,8.517,14.898z M18.94,24.055\n\t\t\tc-1.457,0-2.846-0.298-4.109-0.837c0.361-2.928,1.929-5.482,4.19-7.157c2.243,1.662,3.802,4.187,4.18,7.085\n\t\t\tC21.897,23.727,20.457,24.055,18.94,24.055z M21.111,14.846c1.275-0.55,2.679-0.858,4.154-0.858c1.457,0,2.846,0.298,4.11,0.837\n\t\t\tc-0.356,2.885-1.883,5.404-4.089,7.082C24.704,19.108,23.199,16.65,21.111,14.846z M18.94,3.01c5.432,0,9.915,4.137,10.466,9.425\n\t\t\tc-1.3-0.447-2.689-0.702-4.14-0.702c-2.268,0-4.396,0.601-6.245,1.642c-1.848-1.041-3.975-1.642-6.244-1.642\n\t\t\tc-1.514,0-2.96,0.278-4.307,0.763C8.993,7.179,13.488,3.01,18.94,3.01z M12.777,35.034c-5.803,0-10.523-4.72-10.523-10.523\n\t\t\tc0-3.418,1.645-6.451,4.177-8.375c0.744,3.581,2.999,6.607,6.059,8.408c0.011,3.847,1.735,7.293,4.442,9.631\n\t\t\tC15.656,34.727,14.253,35.034,12.777,35.034z M25.266,35.034c-1.475,0-2.879-0.307-4.154-0.858\n\t\t\tc2.715-2.345,4.444-5.804,4.444-9.664c0-0.022-0.004-0.044-0.004-0.065c3.007-1.829,5.209-4.852,5.918-8.416\n\t\t\tc2.613,1.917,4.319,4.999,4.319,8.48C35.788,30.313,31.068,35.034,25.266,35.034z",style:{fill:"#000000"}}),v={title:"About",contents:[Object(m.default)("p","built with ",Object(m.default)("a",{href:"https://mithril.js.org"}," Mithril.JS")," and webpack"),Object(m.default)("p","source code: ",Object(m.default)("a",{href:"https://github.com/boazblake/mithril-hn-pwa"},"can be found here"))],footer:[Object(m.default)("p","made by @boazblake")]},j=function(t){var c=t.attrs.key;return{oncreate:a,view:function(t){var e=t.attrs,n=e.tab,o=e.isActive;return Object(m.default)("a.tab.".concat(o?"bold":""),{key:c,id:"".concat(n),href:"/".concat(n),oncreate:m.default.route.link},n)}}},O=function(t){var e=t.attrs.model,n=Object.keys(e.reqs.urls),o=Object(i.a)(["item/:key","user:/key"],n);return{oncreate:a,view:function(t){var n=t.attrs.model;return Object(m.default)(".header",{id:"header"},[Object(m.default)("svg.brand",{onclick:function(){return n.toggleModal(n)}},h),o.map(function(t,e){return Object(m.default)(j,{key:e,isActive:n.state.route=="/".concat(t),tab:t})}),n.state.showModal?Object(m.default)(f,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(t){b(e,t,n[t])})}return e}({},v,{model:n})):""])}}},p={oncreate:u("slideRight"),view:function(){return Object(m.default)("footer.footer",{oncreate:c,id:"footer"},"content served from https://api.hnpwa.com/")}},g={oncreate:u("slideLeft"),view:function(t){var e=t.attrs.children;return Object(m.default)("section.content",{id:"content"},e)}},w=function(t){var n=t.attrs.model;return{view:function(t){var e=t.children;return Object(m.default)("section.layout",{id:"layout"},e?[Object(m.default)(O,{model:n}),Object(m.default)(g,{model:n,children:e}),Object(m.default)(p,{model:n})]:[])}}},y=Object(m.default)(".holder",[Object(m.default)(".preloader",[Object(m.default)("div"),Object(m.default)("div"),Object(m.default)("div"),Object(m.default)("div"),Object(m.default)("div"),Object(m.default)("div"),Object(m.default)("div")])]),k={view:function(t){var e=t.attrs,n=e.showItem,o=e.post,c=o.comments_count,a=o.domain,r=o.id,u=o.points,i=o.time_ago,l=o.title,d=o.url,s=o.user;return Object(m.default)(".postContainer",{id:"".concat(r)},[Object(m.default)(".top",[Object(m.default)("h1.title",l),Object(m.default)("code.subTitle"," from ",Object(m.default)("a.",{target:"_blank",href:d},"".concat(a)))]),Object(m.default)(".bottom",[Object(m.default)(".left",[Object(m.default)("a.top.highlight"," by ".concat(s)),Object(m.default)("code.bottom","".concat(i))]),Object(m.default)(".right",[Object(m.default)("code.highlight.top","".concat(u," points")),function(o){return function(n){return function(t,e){return o?Object(m.default)("a.bottom",{oncreate:m.default.route.link,target:"_blank",href:"/item/".concat(t),onclick:function(){return n(t,e)}},"".concat(o," comments")):"".concat(o," comments")}}}(c)(n)(r,l)])])])}},C={view:function(t){var e=t.attrs,n=e.key,o=e.model,c=e.comment,a=c.comments,r=c.comments_count,u=c.id,i=c.time_ago,l=c.content,d=c.level,s=c.user,f={showComments:o.state.comment["".concat(n,"-").concat(d)]||!1};return Object(m.default)(".commentContainer",{id:"".concat(u)},[Object(m.default)(".",[Object(m.default)("a.highlight","".concat(s," ")),Object(m.default)("code"," ".concat(i))]),Object(m.default)(".nudgeRight",[Object(m.default)("code",m.default.trust(l)),r?Object(m.default)("button.commentBtn",{onclick:function(){return o.toggleComments({model:o,key:n,level:d})}},[Object(m.default)("svg.toggleCommentSvg",function(){return 0<arguments.length&&void 0!==arguments[0]&&arguments[0]?Object(m.default)("path",{style:{fill:"#ff6600"},d:"M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"}):Object(m.default)("path",{style:{fill:"#ff6600"},d:"M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"})}(f.showComments)),"".concat(r," comments")]):"",f.showComments?a.map(function(t,e){return Object(m.default)(C,{key:e,comment:t,model:o})}):""])])}},M=function(){return{view:function(t){var n=t.attrs.model,e=n.state.route,o=n.data[e].data,c=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";n.state.title=e,n.state.id=t,n.state.showComment=!n.state.showComment};return Object(m.default)("section.component",{id:"component",route:n.state.route,onscroll:function(c){return function(t){var e=c.state.route,n=c.data[e].data.length,o=10*n*c.state.scrollPos;t.target.scrollTop-c.state.scrollPos>=o&&(c.state.scrollPos++,t.target.scrollTop,n<c.data[e].limit&&c.getData(c)(e))}}(n)},function(t){return 0==t.length}(o)?Object(m.default)(".loader",y):function(t){return t.map}(o)?o.map(function(t,e){return Object(m.default)(k,{key:e,post:t,model:n,showItem:c})}):function(t){return t.comments.map}(o)?[Object(m.default)("h1.title",o.title),o.comments.map(function(t,e){return Object(m.default)(C,{key:e,comment:t,model:n})})]:"")}}},z=function(n){return{onmatch:function(t,e){return function(o){return function(t){o.state.page=1;var e=t.split("/")[2],n=t.split("/")[1];return e?o.getComments(o)(n)(e):o.getData(o)(t)}}(n)(e)},render:function(){return Object(m.default)(w,{model:n},Object(m.default)(M,{model:n}))}}},P=(n(2),n(3),n(4),document.body);function q(t){return t<668?"phone":t<920?"tablet":"desktop"}var L,S,W=window.innerWidth;o.a.state.profile=q(W),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("./service-worker.js").then(function(t){console.log("🧟 SW registered: ",t)}).catch(function(t){console.log("⚙️ SW registration failed: ",t)})}),function t(){var e=window.innerWidth;if(W!==e){W=e;var n=o.a.state.profile;o.a.state.profile=q(e),n!=o.a.state.profile&&m.default.redraw()}requestAnimationFrame(t)}(),m.default.route(P,"/news",(S=o.a).routes.reduce((L=S,function(n){return function(t,e){return t["/".concat(e)]=n(L),t}}(z)),{}))}],[[5,1,2]]]);
//# sourceMappingURL=main-chunk.js.map