webpackJsonp([3],{e2oU:function(t,e,i){"use strict";function s(t){i("eDlF")}Object.defineProperty(e,"__esModule",{value:!0});var n=i("6kxu"),a=i("PPEA"),o=i("gyMJ"),r=i("mw3O"),c=i.n(r),l=i("DpJg"),d=(n.a,a.a,{name:"StoreList",components:{WCard:n.a,WMerchantItem:a.a},created:function(){this.initStores()},data:function(){return{page_no:1,page_size:10,total:0,list:[],busy:!1}},computed:{storeList:function(){return this.list.map(function(t){t.desc="签到"+t.checkin_days+"天，即享"+t.checkin_num+"瓶啤酒";var e={filename:t.store_avatar,type:"avatar"};return t.store_avatar=l.a+"v1/files/download?"+c.a.stringify(e),t})}},methods:{initStores:function(){this.getList()},getList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i={page_no:this.page_no,page_size:this.page_size};this.busy=!0,Object(o.i)(i).then(function(i){var s=i.data,n=i.res;t.busy=!1,t.total=n.total,t.list=e?t.list.concat(s):s})},loadMore:function(){this.page_no<this.total?(this.page_no+=1,this.getList(!0)):this.busy=!0}}}),u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"store-list",attrs:{"infinite-scroll-disabled":"busy","infinite-scroll-distance":"10","infinite-scroll-immediate-check":"false"}},t._l(t.storeList,function(t){return i("li",{key:t.id},[i("w-card",{staticClass:"item"},[i("w-merchant-item",{attrs:{name:t.store_name,address:t.address,desc:t.desc,logo:t.store_avatar}})],1)],1)}),0)},p=[],f={render:u,staticRenderFns:p},v=f,m=i("VU/8"),g=s,h=m(d,v,!1,g,"data-v-5d79c8c2",null);e.default=h.exports},eDlF:function(t,e,i){var s=i("u2Jv");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("3c0e46ed",s,!0,{})},u2Jv:function(t,e,i){e=t.exports=i("FZ+f")(!0),e.push([t.i,"\n.store-list[data-v-5d79c8c2] {\n  padding: 16px;\n}\n.store-list > li + li[data-v-5d79c8c2] {\n  margin-top: 12px;\n}\n.item[data-v-5d79c8c2] {\n  padding: 12px;\n}\n","",{version:3,sources:["/Users/lex/Works/CheckIn/user_side/src/views/StoreList.vue"],names:[],mappings:";AACA;EACE,cAAc;CACf;AACD;EACE,iBAAiB;CAClB;AACD;EACE,cAAc;CACf",file:"StoreList.vue",sourcesContent:["\n.store-list[data-v-5d79c8c2] {\n  padding: 16px;\n}\n.store-list > li + li[data-v-5d79c8c2] {\n  margin-top: 12px;\n}\n.item[data-v-5d79c8c2] {\n  padding: 12px;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=3.e1962ce08faa35e9e531.js.map