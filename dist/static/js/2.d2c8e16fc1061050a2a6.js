webpackJsonp([2],{"V2/t":function(e,n,a){var t=a("txUt");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a("rjj0")("7c1ea96c",t,!0,{})},cafJ:function(e,n,a){"use strict";function t(e){a("V2/t")}Object.defineProperty(n,"__esModule",{value:!0});var i=a("6kxu"),r=a("PPEA"),o=a("gyMJ"),A=a("mw3O"),d=a.n(A),l=a("DpJg"),c=(i.a,r.a,{name:"WelfareExchange",components:{WCard:i.a,WMerchantItem:r.a},data:function(){return{selected:"",list:[]}},computed:{welfareList:function(){return this.list.map(function(e){e=e.merchant,e.desc="签到5天，即享"+e.total_receive+"瓶啤酒";var n={filename:e.store_avatar,type:"avatar"};return e.store_avatar=l.a+"v1/files/download?"+d.a.stringify(n),e})}},created:function(){this.initExchage()},methods:{initExchage:function(){var e=this;Object(o.f)().then(function(n){var a=n.data;e.list=a})},handleSelect:function(e){this.selected=e},handleExchange:function(){var e=this,n={merchant_id:this.selected};Object(o.d)(n).then(function(n){var a=n.res;e.$vux.toast.show({type:"text",text:a.message}),e.initExchage()})}}}),s=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"welfare-exchange"},[a("ul",{staticClass:"list"},e._l(e.welfareList,function(n){return a("li",{key:n.id,on:{click:function(a){return e.handleSelect(n.id)}}},[a("w-card",{staticClass:"item"},[a("div",{staticClass:"item-content"},[a("input",{staticClass:"w-radio",attrs:{type:"radio",name:"select",id:n.id},domProps:{checked:n.id===e.selected}}),e._v(" "),a("label",{staticClass:"w-radio-next",attrs:{for:n.id}},[a("span",{class:["radio-box",{checked:n.id===e.selected}]}),e._v(" "),a("w-merchant-item",{attrs:{name:n.store_name,address:n.address,desc:n.desc,logo:n.store_avatar}})],1)])])],1)}),0),e._v(" "),a("footer",[a("x-button",{attrs:{type:"primary",disabled:!e.selected},nativeOn:{click:function(n){return e.handleExchange(n)}}},[e._v("领取福利")])],1)])},b=[],g={render:s,staticRenderFns:b},f=g,x=a("VU/8"),C=t,p=x(c,f,!1,C,"data-v-6eb19ef2",null);n.default=p.exports},kxFB:function(e,n){e.exports=function(e){return"string"!=typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}},txUt:function(e,n,a){var t=a("kxFB");n=e.exports=a("FZ+f")(!0),n.push([e.i,"\n.linear-gradient-horizontal[data-v-6eb19ef2] {\n  background: -webkit-linear-gradient(left, #FF9800 0%, #FF5F00 100%);\n  background: linear-gradient(90deg, #FF9800 0%, #FF5F00 100%);\n}\n.linear-gradient-horizontal-opacity[data-v-6eb19ef2] {\n  background: -webkit-linear-gradient(left, rgba(255, 152, 0, 0.5) 0%, rgba(255, 95, 0, 0.5) 100%);\n  background: linear-gradient(90deg, rgba(255, 152, 0, 0.5) 0%, rgba(255, 95, 0, 0.5) 100%);\n}\n.linear-gradient-vertical[data-v-6eb19ef2] {\n  background: -webkit-linear-gradient(315deg, #FF9800 0%, #FF5F00 100%);\n  background: linear-gradient(135deg, #FF9800 0%, #FF5F00 100%);\n}\n.primary-box-shadow[data-v-6eb19ef2] {\n  box-shadow: 0 5px 10px 0 rgba(255, 141, 0, 0.3);\n}\n.welfare-exchange[data-v-6eb19ef2] {\n  background: #f6f6f6;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n}\n.list[data-v-6eb19ef2] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  overflow: auto;\n  padding: 16px;\n}\n.list > li + li[data-v-6eb19ef2] {\n  margin-top: 12px;\n}\n.item[data-v-6eb19ef2] {\n  padding: 12px;\n  background: #fff;\n}\n.item-content[data-v-6eb19ef2] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.w-radio[data-v-6eb19ef2] {\n  margin-left: 6px;\n  height: 20px;\n  opacity: 0;\n  margin-right: 8px;\n}\n.w-radio-next[data-v-6eb19ef2] {\n  position: relative;\n}\n.w-radio-next > .radio-box[data-v-6eb19ef2] {\n  position: absolute;\n  top: 35px;\n  left: -28px;\n  width: 20px;\n  height: 20px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 20px;\n}\n.w-radio-next > .radio-box.checked[data-v-6eb19ef2] {\n  border-width: 0;\n  background: -webkit-linear-gradient(left, #FF9800 0%, #FF5F00 100%);\n  background: linear-gradient(90deg, #FF9800 0%, #FF5F00 100%);\n  box-shadow: 0px 0px 3px 3px rgba(255, 141, 0, 0.4);\n}\n.w-radio-next > .radio-box.checked[data-v-6eb19ef2]::before {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: url("+t(a("TeOC"))+");\n  background-position: center;\n  background-size: 60%;\n  background-repeat: no-repeat;\n}\nfooter[data-v-6eb19ef2] {\n  height: 46px;\n  padding: 10px 16px;\n  background: #fafafa;\n}\n","",{version:3,sources:["/Users/lex/Works/CheckIn/user_side/src/views/WelfareExchange.vue"],names:[],mappings:";AACA;EACE,oEAAoE;EACpE,6DAA6D;CAC9D;AACD;EACE,iGAAiG;EACjG,0FAA0F;CAC3F;AACD;EACE,sEAAsE;EACtE,8DAA8D;CAC/D;AACD;EACE,gDAAgD;CACjD;AACD;EACE,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,6BAA6B;EAC7B,8BAA8B;EAC9B,+BAA+B;UACvB,uBAAuB;EAC/B,cAAc;EACd,iBAAiB;CAClB;AACD;EACE,oBAAoB;EACpB,gBAAgB;UACR,QAAQ;EAChB,eAAe;EACf,cAAc;CACf;AACD;EACE,iBAAiB;CAClB;AACD;EACE,cAAc;EACd,iBAAiB;CAClB;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,0BAA0B;EAC1B,4BAA4B;UACpB,oBAAoB;CAC7B;AACD;EACE,iBAAiB;EACjB,aAAa;EACb,WAAW;EACX,kBAAkB;CACnB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,UAAU;EACV,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,qCAAqC;EACrC,oBAAoB;CACrB;AACD;EACE,gBAAgB;EAChB,oEAAoE;EACpE,6DAA6D;EAC7D,mDAAmD;CACpD;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,UAAU;EACV,QAAQ;EACR,YAAY;EACZ,aAAa;EACb,0CAA4C;EAC5C,4BAA4B;EAC5B,qBAAqB;EACrB,6BAA6B;CAC9B;AACD;EACE,aAAa;EACb,mBAAmB;EACnB,oBAAoB;CACrB",file:"WelfareExchange.vue",sourcesContent:["\n.linear-gradient-horizontal[data-v-6eb19ef2] {\n  background: -webkit-linear-gradient(left, #FF9800 0%, #FF5F00 100%);\n  background: linear-gradient(90deg, #FF9800 0%, #FF5F00 100%);\n}\n.linear-gradient-horizontal-opacity[data-v-6eb19ef2] {\n  background: -webkit-linear-gradient(left, rgba(255, 152, 0, 0.5) 0%, rgba(255, 95, 0, 0.5) 100%);\n  background: linear-gradient(90deg, rgba(255, 152, 0, 0.5) 0%, rgba(255, 95, 0, 0.5) 100%);\n}\n.linear-gradient-vertical[data-v-6eb19ef2] {\n  background: -webkit-linear-gradient(315deg, #FF9800 0%, #FF5F00 100%);\n  background: linear-gradient(135deg, #FF9800 0%, #FF5F00 100%);\n}\n.primary-box-shadow[data-v-6eb19ef2] {\n  box-shadow: 0 5px 10px 0 rgba(255, 141, 0, 0.3);\n}\n.welfare-exchange[data-v-6eb19ef2] {\n  background: #f6f6f6;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n}\n.list[data-v-6eb19ef2] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  overflow: auto;\n  padding: 16px;\n}\n.list > li + li[data-v-6eb19ef2] {\n  margin-top: 12px;\n}\n.item[data-v-6eb19ef2] {\n  padding: 12px;\n  background: #fff;\n}\n.item-content[data-v-6eb19ef2] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.w-radio[data-v-6eb19ef2] {\n  margin-left: 6px;\n  height: 20px;\n  opacity: 0;\n  margin-right: 8px;\n}\n.w-radio-next[data-v-6eb19ef2] {\n  position: relative;\n}\n.w-radio-next > .radio-box[data-v-6eb19ef2] {\n  position: absolute;\n  top: 35px;\n  left: -28px;\n  width: 20px;\n  height: 20px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 20px;\n}\n.w-radio-next > .radio-box.checked[data-v-6eb19ef2] {\n  border-width: 0;\n  background: -webkit-linear-gradient(left, #FF9800 0%, #FF5F00 100%);\n  background: linear-gradient(90deg, #FF9800 0%, #FF5F00 100%);\n  box-shadow: 0px 0px 3px 3px rgba(255, 141, 0, 0.4);\n}\n.w-radio-next > .radio-box.checked[data-v-6eb19ef2]::before {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: url('../assets/sign_right.png');\n  background-position: center;\n  background-size: 60%;\n  background-repeat: no-repeat;\n}\nfooter[data-v-6eb19ef2] {\n  height: 46px;\n  padding: 10px 16px;\n  background: #fafafa;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=2.d2c8e16fc1061050a2a6.js.map