(this["webpackJsonppocket-somm"]=this["webpackJsonppocket-somm"]||[]).push([[0],{24:function(e,t,n){},26:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),s=n(8),a=n.n(s),r=(n(24),n(12)),l=n.n(r),o=n(14),d=n(6),j=(n.p,n(26),n(38)),b=n(37),p=n(36),h=n(35),u=n(39),x=(n(27),n(1));var O=function(e){return Object(x.jsx)("div",{className:"hoverable clickable",style:{padding:10,margin:20,display:"inline-block",backgroundColor:e.selected?"#ffb0bf":"#ebebeb",borderRadius:"50%",width:e.size,height:e.size,left:0,top:0},children:Object(x.jsx)("img",{style:{filter:e.selected?"":"grayscale(1)"},src:"icons/".concat(e.image,".png"),width:e.imgsize,height:e.imgsize})})},g=n(15),f=n.n(g),m=n(34),y=function(e){var t=e.loading,n=e.component,i=e.className;e.style;return Object(x.jsxs)("div",{className:"Loadable",children:[Object(x.jsx)("div",{style:{display:t?"none":""},children:n}),Object(x.jsx)("div",{className:i,style:{display:t?"flex":"none",justifyContent:"center"},children:Object(x.jsx)(m.a,{as:"span",animation:"border",role:"status","aria-hidden":"true"})})]})};y.defaultProps={style:{marginTop:"0px",width:"10px",height:"10px"}};var v=y,k=["appetizer","main","dessert"],w={bodied:"Bodied",tannic:"Tannic",sweet:"Sweet",dry:"Dry",acid:"Acidic"};var S=function(){var e=Object(i.useState)(""),t=Object(d.a)(e,2),n=t[0],c=t[1],s=Object(i.useState)([]),a=Object(d.a)(s,2),r=a[0],g=a[1],m=Object(i.useState)(""),y=Object(d.a)(m,2),S=y[0],z=y[1],C=Object(i.useState)(""),A=Object(d.a)(C,2),N=A[0],L=A[1],B=Object(i.useState)(!1),T=Object(d.a)(B,2),R=T[0],_=T[1],E=Object(i.useState)(!1),F=Object(d.a)(E,2),P=F[0],D=F[1],M=Object(i.useState)(!0),W=Object(d.a)(M,2),I=W[0],H=W[1],J=Object(i.useState)(!0),G=Object(d.a)(J,2),U=G[0],X=G[1],Y=Object(i.useState)(!0),q=Object(d.a)(Y,2),K=q[0],Q=q[1],V=Object(i.useState)(!0),Z=Object(d.a)(V,2),$=Z[0],ee=Z[1],te=Object(i.useState)(!0),ne=Object(d.a)(te,2),ie=ne[0],ce=ne[1];Object(i.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){var t,n,i,c,s,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/Roznavene-project-demo/data/frontend_data.csv");case 2:return t=e.sent,n=t.body.getReader(),e.next=6,n.read();case 6:i=e.sent,c=new TextDecoder("utf-8"),s=c.decode(i.value),a=f.a.parse(s,{header:!0}),r=a.data,console.log(r),g(r);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var se=function(){return P?100:30},ae=function(e){var t=e.split("/")[5],n=e.split("/")[6];return"https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/".concat(t,"/").concat(n,".jpg")};function re(){return Object(x.jsx)("div",{className:"no-scrollbar",id:"wine-display",children:r.filter((function(e){return e.pair===N})).map((function(e){return function(e){var t,n,c,s=Object(i.useState)(!1),a=Object(d.a)(s,2),r=a[0],l=a[1];return Object(x.jsx)(j.a,{onMouseEnter:function(e){l(!0)},onMouseLeave:function(e){l(!1)},onClick:function(t){console.log(e)},border:r?"lightgray":"light",bg:"light",style:{width:"95%",margin:"10px"},children:Object(x.jsxs)(j.a.Body,{style:{padding:"15px"},children:[Object(x.jsxs)("div",{style:{height:"80px",marginBottom:"10px"},children:[Object(x.jsx)("img",{style:{float:"left",transform:r?"scale(1.1)":"",transition:"transform 0.3s"},src:ae(e.link),height:"80px"}),Object(x.jsxs)("div",{style:{float:"left",marginLeft:"20px",position:"relative"},children:[Object(x.jsx)("span",{style:{display:"block",textOverflow:"ellipsis",width:"250px",fontSize:"14px",textAlign:"start"},children:Object(x.jsx)("b",{children:(n=e.name.replaceAll("-"," "),c=100,n.length>c?n.substr(0,c-1)+"...":n)})}),Object(x.jsxs)("div",{style:{color:"gray",left:"0px",position:"absolute"},children:[Object(x.jsx)("span",{style:{display:"block",textAlign:"start",fontSize:"14px"},children:(t=e.type,t.charAt(0).toUpperCase()+t.slice(1))}),Object(x.jsxs)("span",{style:{display:"block",textAlign:"start",fontSize:"14px"},children:[e.ALCOHOL,"%"]})]})]})]}),Object(x.jsx)("div",{style:{width:"100%"},children:Object.keys(w).map((function(t){return Object(x.jsxs)("div",{style:{float:"left",width:"20%"},children:[Object(x.jsx)("span",{style:{fontSize:"13px",textAlign:"center",padding:"4px"},children:e[t]>1?Object(x.jsx)("b",{children:w[t]}):w[t]}),Object(x.jsx)("img",{style:{transform:"scale(-1, 1)",display:"block",margin:"auto"},src:"/Roznavene-project-demo/icons/intensity_pie_".concat(e[t],".svg"),width:"20px"})]})}))})]})})}(e)}))})}return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)("div",{style:{minHeight:"730px",width:"400px",textAlign:"center",margin:"auto",marginTop:"100px"},children:Object(x.jsxs)(j.a,{style:{width:"500px"},children:[Object(x.jsxs)(j.a.Body,{children:[Object(x.jsxs)("div",{style:{height:"80px"},children:[Object(x.jsx)("b",{style:{fontSize:"23px"},children:"PocketSomm"}),Object(x.jsx)("br",{})]}),Object(x.jsxs)("div",{id:"meal-select",style:{display:"none"},children:[k.map((function(e){return Object(x.jsx)("span",{onClick:function(t){return function(e){c(n===e?"":e)}(e)},children:Object(x.jsx)(O,{image:e,size:80,imgsize:50,selected:n===e})})})),Object(x.jsx)("h4",{style:{color:n?"black":"gray"},className:"mt-2 mb-4",children:k.includes(n)?{appetizer:"appetizer",main:"main course",dessert:"dessert"}[n]:"select a course"})]}),Object(x.jsxs)(b.a.Group,{children:[Object(x.jsx)(b.a.Label,{style:{width:"79%",textAlign:"start",fontSize:"17px"},children:"What are you eating?"}),Object(x.jsx)(b.a.Control,{style:{width:"80%",margin:"auto",marginBottom:"10px"},placeholder:"enter a recipe link",onChange:function(e){return z(e.target.value)}})]}),N&&!R?Object(x.jsxs)("div",{className:"animated",style:{width:"80%",margin:"auto",height:"".concat(se(),"px")},children:[Object(x.jsx)("a",{style:{color:"gray",fontSize:"13px"},href:"#",onClick:function(e){D(!P)},children:"Adjust preference"}),Object(x.jsx)(p.a,{in:P,children:Object(x.jsxs)("div",{style:{width:"90%",margin:"auto"},children:[Object(x.jsx)("h4",{style:{textAlign:"left",fontSize:"20px"},children:"Wine types"}),Object(x.jsxs)(h.a,{size:"sm",className:"mt-3",children:[Object(x.jsx)(u.a,{onClick:function(e){H(!I)},active:I,variant:"outline-danger",children:"White"}),Object(x.jsx)(u.a,{onClick:function(e){X(!U)},active:U,variant:"outline-danger",children:"Red"}),Object(x.jsx)(u.a,{onClick:function(e){Q(!K)},active:K,variant:"outline-danger",children:"Sparkling"}),Object(x.jsx)(u.a,{onClick:function(e){ee(!$)},active:$,variant:"outline-danger",children:"Rose"}),Object(x.jsx)(u.a,{onClick:function(e){ce(!ie)},active:ie,variant:"outline-danger",children:"Dessert"})]})]})})]}):null,Object(x.jsx)("div",{id:"winelist",className:"animated",style:{width:"90%",margin:"auto",height:N&&!R?"".concat(500-se(),"px"):"25px",overflowY:"auto",overflowX:"hidden"},children:N&&!R?Object(x.jsx)(re,{}):null}),Object(x.jsx)("div",{id:"foot",style:{position:"relative",height:"5px"},children:Object(x.jsx)("span",{style:{right:"0px",position:"absolute",fontSize:"13px",color:"gray"},children:"powered by PocketSomm\u2122"})})]}),Object(x.jsx)(j.a.Footer,{children:Object(x.jsx)(u.a,{disabled:!S,onClick:function(){L(S),_(!0),setTimeout((function(){_(!1)}),1e3)},variant:"danger",style:{width:"95%",height:"50px"},children:Object(x.jsx)(v,{loading:R,component:Object(x.jsx)("span",{children:"WINE ME "})})})})]})})})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),i(e),c(e),s(e),a(e)}))};a.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(S,{})}),document.getElementById("root")),z()}},[[32,1,2]]]);
//# sourceMappingURL=main.3c83af70.chunk.js.map