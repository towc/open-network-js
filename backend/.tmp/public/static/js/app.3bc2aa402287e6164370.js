webpackJsonp([2],{106:function(t,e){},107:function(t,e){},108:function(t,e){},109:function(t,e){},110:function(t,e){},111:function(t,e){},112:function(t,e){},113:function(t,e){},115:function(t,e){},116:function(t,e){},124:function(t,e,s){function a(t){s(116)}var n=s(3)(s(49),s(139),a,null,null);t.exports=n.exports},125:function(t,e,s){function a(t){s(115)}var n=s(3)(s(51),s(138),a,"data-v-60237d87",null);t.exports=n.exports},126:function(t,e,s){function a(t){s(110)}var n=s(3)(s(52),s(133),a,"data-v-2328522c",null);t.exports=n.exports},127:function(t,e,s){function a(t){s(111)}var n=s(3)(s(53),s(134),a,null,null);t.exports=n.exports},128:function(t,e,s){function a(t){s(498)}var n=s(3)(s(54),s(137),a,"data-v-37e3fc7f",null);t.exports=n.exports},129:function(t,e,s){function a(t){s(107),s(108)}var n=s(3)(s(55),s(131),a,"data-v-040323ae",null);t.exports=n.exports},130:function(t,e,s){function a(t){s(109)}var n=s(3)(s(57),s(132),a,null,null);t.exports=n.exports},131:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"post-edit"},[t._m(0),t._v(" "),t.fullScreenInfoDisplaying?s("div",{staticClass:"layer layer2 fullscreen-info-message"},[t._v(" "+t._s(t.fullScreenInfoMessage))]):s("div",{staticClass:"layer layer-2"},[s("markdown-editor",{staticClass:"md-editor",attrs:{configs:t.mdConfigs},model:{value:t.markdownContent,callback:function(e){t.markdownContent=e},expression:"markdownContent"}}),t._v(" "),s("div",{staticClass:"container container-post"},[s("div",{staticClass:"layer layer-2-sub layer-2a"},[s("label",{staticClass:"label label-post-title"},[s("div",{staticClass:"form-label"},[t._v("Title")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.postTitle,expression:"postTitle"}],staticClass:"form-input form-input-post",attrs:{placeholder:"Insert..."},domProps:{value:t.postTitle},on:{input:function(e){e.target.composing||(t.postTitle=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"layer layer-2-sub layer-2b"},[s("label",{staticClass:"label label-post-id"},[s("div",{staticClass:"form-label form-label-post-id"},[s("span",[t._v("Post id")]),t._v(" "),s("Switcher",{staticClass:"sync-switch",attrs:{type:"post",names:"Sync|Type",initActiveIndex:t.TYPE},on:{change:t.switchSync}})],1),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.postIdTyped,expression:"postIdTyped"}],staticClass:"form-input form-input-post",class:{"form-input-agnostic":t.isPostIdSync},attrs:{placeholder:"Insert..."},domProps:{value:t.postIdTyped},on:{input:function(e){e.target.composing||(t.postIdTyped=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"preview-post-url"},[t._v("/post/"+t._s(t.currentUser.userName)+"/"+t._s(t.postId))])]),t._v(" "),s("div",{staticClass:"layer layer-2-sub layer-2c"},[s("label",{staticClass:"label label-post-keywords"},[s("div",{staticClass:"form-label"},[s("span",[t._v("Keywords")]),t._v(" "),s("span",{staticClass:"form-label-keywords-comma"},[t._v("key1, key2, key3...")])]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.postKeywords,expression:"postKeywords"}],staticClass:"form-input form-input-post",attrs:{placeholder:"Insert..."},domProps:{value:t.postKeywords},on:{input:function(e){e.target.composing||(t.postKeywords=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"layer layer-2-sub layer-2d"},[s("Switcher",{staticClass:"private-switch",attrs:{type:"post",names:"Private|Public",initActiveIndex:t.PUBLIC},on:{change:t.switchPrivate}})],1),t._v(" "),s("div",{staticClass:"layer layer-2-sub layer-2e"},[s("div",{staticClass:"form-info"},[t._v(t._s(t.infoMessage))]),t._v(" "),s("button",{staticClass:"form-button form-button-post",class:{"form-button-inverted":!t.isSaveable},on:{click:t.savePost}},[t._v("Save")]),t._v(" "),s("router-link",{staticClass:"form-button form-button-post",attrs:{to:"/post/"+t.currentUser.userName+"/"+t.postId}},[t._v("Go To Post")])],1),t._v(" "),s("div",{staticClass:"layer layer-2-sub layer-2f"},[s("button",{staticClass:"form-button form-button-danger",on:{click:t.deletePost}},[t._v("Delete")])])])],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"layer layer-1"},[s("h1",{staticClass:"title"},[t._v("Edit Post")])])}]}},132:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._v("User")])},staticRenderFns:[]}},133:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"navbar",class:t.customClass},[s("div",{staticClass:"left"},[s("router-link",{staticClass:"logo",attrs:{to:"/"}},[t._v("ONJS")])],1),t._v(" "),t.isAuthenticated?s("div",{staticClass:"right right-auth"},[s("router-link",{staticClass:"header-to-profile",attrs:{to:"/user/"+t.currentUser.userName}},[s("img",{staticClass:"avatar",attrs:{src:t.currentUser.profileAsset.path}}),t._v(" "),s("div",{staticClass:"header-username"},[t._v(t._s(t.currentUser.userName))])]),t._v(" "),s("div",{staticClass:"header-control-icons"},[s("svg",{staticClass:"icon icon-cog",on:{mouseenter:function(e){t.openControl("settings")},mouseleave:t.closeControl}},[s("use",{attrs:{"xlink:href":"#icon-cog"}})]),t._v(" "),s("svg",{staticClass:"icon icon-plus",on:{mouseenter:function(e){t.openControl("add")},mouseleave:t.closeControl}},[s("use",{attrs:{"xlink:href":"#icon-plus"}})]),t._v(" "),s("svg",{staticClass:"icon icon-alarm",on:{mouseenter:function(e){t.openControl("notifications")},mouseleave:t.closeControl}},[s("use",{attrs:{"xlink:href":"#icon-alarm"}})])])],1):s("div",{staticClass:"right right-no-auth"},[s("router-link",{staticClass:"auth-link-wrapper",attrs:{to:"/auth"}},[s("span",{staticClass:"auth-link"},[t._v("Sign Up")]),t._v(" or "),s("span",{staticClass:"auth-link"},[t._v("Log In")])])],1),t._v(" "),s("div",{staticClass:"header-control",class:{"header-control-open":t.areIconsHovered||t.areControlsHovered},on:{mouseenter:function(e){t.areControlsHovered=!0},mouseleave:function(e){t.areControlsHovered=!1}}},[s("div",{staticClass:"header-control-panel",class:{"header-control-panel-open":"settings"===t.whichOpen}},[t._v("\n        settings\n      ")]),t._v(" "),s("div",{staticClass:"header-control-panel",class:{"header-control-panel-open":"add"===t.whichOpen}},[s("div",{staticClass:"container container-agnostic"},[s("label",{staticClass:"label label-name-to-add"},[t._m(0),t._v(" "),s("span",{staticClass:"form-"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.nameToAdd,expression:"nameToAdd"}],staticClass:"form-input form-input-agnostic",attrs:{placeholder:"Insert..."},domProps:{value:t.nameToAdd},on:{input:function(e){e.target.composing||(t.nameToAdd=e.target.value)}}})])]),t._v(" "),s("button",{staticClass:"form-button form-button-post",class:{"form-button-inverted":!t.isNameToAddAcceptable},on:{click:t.addPost}},[t._v("Add Post")]),t._v(" "),s("button",{staticClass:"form-button form-button-asset",class:{"form-button-inverted":!t.isNameToAddAcceptable},on:{click:t.addAsset}},[t._v("Add Asset")])])]),t._v(" "),s("div",{staticClass:"header-control-panel",class:{"header-control-panel-open":"notifications"===t.whichOpen}},[t._v("\n        notifications\n      ")])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-label form-label-name-to-add"},[s("span",[t._v("Name to add")]),t._v(" "),s("span",{staticClass:"form-label-name-to-add-temp"},[t._v("temp")])])}]}},134:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._v("Home")])},staticRenderFns:[]}},135:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("svg",{staticStyle:{position:"absolute",width:"0",height:"0",overflow:"hidden"},attrs:{version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[s("defs",[s("symbol",{attrs:{id:"icon-cog",viewBox:"0 0 32 32"}},[s("title",[t._v("cog")]),t._v(" "),s("path",{attrs:{d:"M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"}})]),t._v(" "),s("symbol",{attrs:{id:"icon-plus",viewBox:"0 0 32 32"}},[s("title",[t._v("plus")]),t._v(" "),s("path",{attrs:{d:"M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"}})]),t._v(" "),s("symbol",{attrs:{id:"icon-alarm",viewBox:"0 0 32 32"}},[s("title",[t._v("alarm")]),t._v(" "),s("path",{attrs:{d:"M27 23h-22l-3 3v1l1 1h9c0 2.209 1.791 4 4 4s4-1.791 4-4h9l1-1v-1l-3-3zM26 15c0-4.1-2.47-7.618-6-9.162v-1.838c0-2.209-1.791-4-4-4s-4 1.791-4 4v1.838c-3.53 1.544-6 5.062-6 9.162v7h20v-7zM14 4c0-1.104 0.896-2 2-2s2 0.896 2 2h-4z"}})])])]),t._v(" "),s("Header"),t._v(" "),s("router-view")],1)},staticRenderFns:[]}},136:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:t.classObject},t._l(t.nameList,function(e,a){return s("button",{class:{"switch-item":!0,"switch-item-active":a===t.activeIndex},on:{click:function(e){t.change(a)}}},[t._v(t._s(e))])}))},staticRenderFns:[]}},137:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"post"},[s("div",{staticClass:"layer layer-1"},[s("h1",{staticClass:"post-title"},[t._v(t._s(t.postData.title))])]),t._v(" "),s("div",{staticClass:"layer layer-2"},[s("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.postContent)}})]),t._v(" "),s("div",{staticClass:"layer layer-3"},[s("div",{staticClass:"post-data post-views"},[t._v("views"),s("br"),t._v(t._s(t.postData.views))]),t._v(" "),s("div",{staticClass:"post-data post-appreciations"},[t._v("appreciations"),s("br"),t._v(t._s(t.postData.appreciations))]),t._v(" "),s("div",{staticClass:"post-data post-written-date"},[t._v("Written"),s("br"),t._v(t._s(t.postData.writtenDate))]),t._v(" "),s("div",{staticClass:"post-data post-edited-date"},[t._v("Edited"),s("br"),t._v(t._s(t.postData.editedDate))])]),t._v(" "),t.isAuthenticated?s("div",{staticClass:"layer layer-4"},[s("span",{staticClass:"form-info appreciation-info"},[t._v(t._s(t.appreciationInfo))]),t._v(" "),s("button",{staticClass:"form-button form-button-post appreciate-button",class:{"form-button-inverted":t.currentUserAppreciatesPost},on:{click:t.appreciatePost}},[t._v("\n      "+t._s(t.currentUserAppreciatesPost?"Appreciated":"Appreciate")+"\n    ")])]):t._e(),t._v(" "),s("div",{staticClass:"layer layer-5"},[s("router-link",{staticClass:"author-group",attrs:{to:"user/"+t.postData.owner.userName}},[s("img",{staticClass:"author-image",attrs:{src:t.postData.owner.profileAsset.path}}),t._v(" "),s("div",{staticClass:"author-info"},[s("div",{staticClass:"author-info-name"},[t._v(t._s(t.postData.owner.name))]),t._v(" "),s("div",{staticClass:"author-info-username"},[t._v(t._s(t.postData.owner.userName))])])]),t._v(" "),t.isAuthenticated?s("button",{staticClass:"form-button form-button-user follow-button",class:{"form-button-inverted":t.currentUserFollowsAuthor}},[t._v("\n      "+t._s(t.currentUserFollowsAuthor?"Following":"Follow")+"\n    ")]):t._e()],1)])},staticRenderFns:[]}},138:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container container-auth"},[s("Switcher",{staticClass:"main-switch",attrs:{type:"auth",names:"Sign Up|Log In",initActiveIndex:t.LOG_IN},on:{change:t.switchMethod}}),t._v(" "),s("div",{staticClass:"layer layer-1"},[s("label",{staticClass:"label label-username"},[s("div",{staticClass:"form-label"},[t._v("Username")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"form-input form-input-auth",attrs:{placeholder:"Insert..."},domProps:{value:t.userName},on:{input:[function(e){e.target.composing||(t.userName=e.target.value)},t.checkAuthenticationAvailability]}})]),t._v(" "),s("div",{staticClass:"intermediary"},[t._v("\n      "+t._s(t.methodIndex===t.LOG_IN?"or":"and")+"\n    ")]),t._v(" "),s("label",{staticClass:"label label-email"},[s("div",{staticClass:"form-label"},[t._v("Email")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-input form-input-auth",attrs:{placeholder:"Insert..."},domProps:{value:t.email},on:{input:[function(e){e.target.composing||(t.email=e.target.value)},t.checkAuthenticationAvailability]}})])]),t._v(" "),s("div",{staticClass:"layer layer-2"},[s("label",{staticClass:"label label-password"},[t._m(0),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-input form-input-auth",attrs:{type:"password",placeholder:"Insert..."},domProps:{value:t.password},on:{input:[function(e){e.target.composing||(t.password=e.target.value)},t.checkAuthenticationAvailability]}})])]),t._v(" "),s("div",{staticClass:"layer form-button-layer layer-3"},[s("button",{staticClass:"form-button form-button-auth",class:{"form-button-inverted":t.tryingToAuthenticate||!t.authenticationAvailable},on:{click:t.authenticate}},[t._v("Authenticate")]),t._v(" "),s("div",{ref:"info",staticClass:"form-info"})])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-label form-label-password"},[s("span",[t._v("Password")]),t._v(" "),s("span",{staticClass:"form-label-password-forgot",attrs:{title:"best solution right now is sending an email to matei@copot.eu about it"}},[t._v("forgot?")])])}]}},139:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"markdown-editor"},[s("textarea")])}]}},142:function(t,e){},44:function(t,e,s){function a(t){s(113)}var n=s(3)(s(56),s(136),a,"data-v-2a6726c0",null);t.exports=n.exports},45:function(t,e,s){"use strict";var a=s(14),n=s(140),i=s(127),o=s.n(i),r=s(125),c=s.n(r),l=s(130),u=s.n(l),d=s(128),p=s.n(d),h=s(129),v=s.n(h),m=s(497),f=s.n(m);a.a.use(n.a),e.a=new n.a({mode:"history",routes:[{path:"/",name:"Home",component:o.a},{path:"/auth",name:"Auth",component:c.a},{path:"/user/:username",name:"User",component:u.a},{path:"/post/:username/:postid",name:"Post",component:p.a},{path:"/post/:username/:postid/edit",name:"PostEdit",component:v.a},{path:"/asset/:username/:postid",component:f.a},{path:"/asset/:username/:postid/edit",component:f.a}]})},46:function(t,e,s){"use strict";var a=s(59),n=s.n(a),i=s(60),o=s.n(i),r=s(119),c=(s.n(r),s(14)),l=s(24);c.a.use(l.b);var u=new l.b.Store({state:{isAuthenticated:!1,pendingAuthentication:!0,currentUser:!1},mutations:{authenticate:function(t,e){t.isAuthenticated=e.isAuthenticated,t.pendingAuthentication=!1,e.isAuthenticated?(t.currentUser=e.userData,t.currentUser.profileAsset||(t.currentUser.profileAsset={path:"https://gravatar.com/avatar/6d552cd1dea552ad9ca12f745eead5c7?s=512&d=https://codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png",idName:"default"})):t.currentUser=!1}},actions:{populateAuthentication:function(t){var e=new XMLHttpRequest;e.open("GET","/api/user/status"),e.onload=function(){if(200===e.status){var s=JSON.parse(e.responseText);s.isAuthenticated?t.dispatch("setOwnUser",s):t.commit("authenticate",s)}},e.send()},setOwnUser:function(t,e){var s=new XMLHttpRequest;s.open("GET","/api/user/request/"+e.userName),s.onload=function(){200===s.status&&t.commit("authenticate",{isAuthenticated:!0,userData:JSON.parse(s.responseText)})},s.send()},authenticate:function(t,e){return new o.a(function(s,a){var i=new XMLHttpRequest;switch(e.method){case"login":i.open("POST","/api/user/login"),i.onload=function(){200===i.status&&t.dispatch("setOwnUser",{userName:e.userName}),s(i)},i.send(n()({username:e.userName,email:e.email,password:e.password}));break;case"signup":i.open("POST","/api/user/create"),i.onload=function(){200===i.status&&t.dispatch("authenticate",{userName:e.userName,password:e.password,method:"login"}),s(i)},i.send(n()({username:e.userName,email:e.email,password:e.password}))}})},createPost:function(t,e){return new o.a(function(t,s){var a=e.postName.replace(/ /g,"-").replace(/[\,\'\:]/g,"")+"-"+Math.random().toString().split(".")[1],i=new XMLHttpRequest;i.open("POST","/api/post/create"),i.onload=function(){200===i.status&&t(a)},i.send(n()({postname:e.postName,postid:a}))})},createAsset:function(t,e){return new o.a(function(t,s){var a=e.assetName.replace(" ","-").replace(/[\,\'\:]/g,"")+"-"+Math.random().toString().split(".")[1],i=new XMLHttpRequest;i.open("POST","/api/asset/create"),i.onload=function(){200===i.status&&t(a)},i.send(n()({assetname:e.assetName,assetid:a}))})},populatePost:function(t,e){return new o.a(function(t,s){var a=new XMLHttpRequest;a.open("GET","/api/post/"+e.userName+"/"+e.postId),a.onload=function(){if(200===a.status){var e=JSON.parse(a.responseText);return e.owner.profileAsset||(e.owner.profileAsset={path:"https://gravatar.com/avatar/6d552cd1dea552ad9ca12f745eead5c7?s=512&d=https://codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png",idName:"default"}),t(e)}s(a.responseText)},a.send()})},savePost:function(t,e){return new o.a(function(t,s){var a=new XMLHttpRequest;a.open("POST","/api/post/update"),a.onload=function(){var e=a.responseText;t(200===a.status?"":e.substring(1,e.length-1))},a.send(n()(e))})},deletePost:function(t,e){return new o.a(function(t,s){var a=new XMLHttpRequest;a.open("DELETE","/api/post/"+e.postId),a.onload=function(){t()},a.send()})},appreciatePost:function(t,e){return new o.a(function(t,s){var a=new XMLHttpRequest;a.open("GET","/api/post/appreciate/"+e.userName+"/"+e.postId),a.onload=function(){var e=a.responseText;t(200===a.status?"":e.substring(1,e.length-1))},a.send()})}}});e.a=u},47:function(t,e,s){function a(t){s(112)}var n=s(3)(s(50),s(135),a,null,null);t.exports=n.exports},49:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(26),n=s.n(a),i=s(122),o=s.n(i);e.default={name:"markdown-editor",props:{value:String,previewClass:String,customTheme:{type:Boolean,default:function(){return!1}},configs:{type:Object,default:function(){return{}}}},ready:function(){this.initialize(),this.syncValue()},mounted:function(){this.initialize()},methods:{initialize:function(){var t={};n()(t,this.configs),t.element=t.element||this.$el.firstElementChild,t.initialValue=t.initialValue||this.value,this.simplemde=new o.a(t),t.renderingConfig&&t.renderingConfig.codeSyntaxHighlighting&&s.e(0).then(function(){var e=t.renderingConfig.highlightingTheme||"default";window.hljs=s(145),s(146)("./"+e+".css")}.bind(null,s)).catch(s.oe),this.customTheme||s(106);var e=this.previewClass||"";this.addPreviewClass(e),this.bindingEvents()},bindingEvents:function(){var t=this;this.simplemde.codemirror.on("change",function(){t.$emit("input",t.simplemde.value())})},addPreviewClass:function(t){var e=this.simplemde.codemirror.getWrapperElement(),s=document.createElement("div");e.nextSibling.className+=" "+t,s.className="editor-preview "+t,e.appendChild(s)},syncValue:function(){var t=this;this.simplemde.codemirror.on("change",function(){t.value=t.simplemde.value()})}},destroyed:function(){this.simplemde=null},watch:{value:function(t){t!==this.simplemde.value()&&this.simplemde.value(t)}}}},497:function(t,e,s){var a=s(3)(null,null,null,null,null);t.exports=a.exports},498:function(t,e){},50:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(126),n=s.n(a);e.default={name:"app",components:{Header:n.a}}},51:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(44),n=s.n(a);e.default={name:"auth",data:function(){return{SIGN_UP:0,LOG_IN:1,methodIndex:1,tryingToAuthenticate:!1,authenticationAvailable:!1}},methods:{switchMethod:function(t){this.methodIndex=t,this.checkAuthenticationAvailability()},checkAuthenticationAvailability:function(){switch(this.methodIndex){case 1:this.userName||this.email?this.password?this.setInfo("",!0):this.setInfo("Please insert Password",!1):this.setInfo("Please insert Username or Email",!1);break;case 0:this.userName?this.email?this.password?this.setInfo("",!0):this.setInfo("Please insert Password",!1):this.setInfo("Please insert Email",!1):this.setInfo("Please insert Username",!1)}},setInfo:function(t,e){this.$refs.info.textContent=t,this.authenticationAvailable=e},authenticate:function(){var t=this;if(!this.authenticationAvailable)return!1;this.tryingToAuthenticate=!0,this.$store.dispatch("authenticate",{method:["signup","login"][this.methodIndex],userName:this.userName,email:this.email,password:this.password}).then(function(e){if(t.tryingToAuthenticate=!1,[400,401].indexOf(e.status)>-1)return t.setInfo(e.responseText.slice(1,e.responseText.length-1),!1);t.$router.push("/user/"+t.userName)})}},components:{Switcher:n.a}}},52:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(27),n=s.n(a),i=s(24),o={user:["user","users"],auth:["auth"],post:["post","posts"],asset:["asset","assets"]};e.default={name:"header",data:function(){return{areIconsHovered:!1,areControlsHovered:!1,whichOpen:!1,nameToAdd:"",hasNotifications:!1}},computed:n()({customClass:function(){for(var t=this.$route.fullPath.split("/"),e=!1,s=t.length-1;s>=0;--s){var a=t[s];for(var n in o){var i=o[n].indexOf(a);if(i>-1){e=o[n][i];break}}if(e)break}return e||(e="post"),"navbar-"+e},isNameToAddAcceptable:function(){return this.nameToAdd.length>0}},s.i(i.a)(["isAuthenticated","currentUser"])),methods:{openControl:function(t){this.whichOpen=t,this.areIconsHovered=!0},closeControl:function(){this.areIconsHovered=!1},addPost:function(){var t=this;this.$store.dispatch("createPost",{postName:this.nameToAdd}).then(function(e){t.$router.push("/post/"+t.currentUser.userName+"/"+e+"/edit")}),this.nameToAdd=""},addAsset:function(){var t=this;this.$store.dispatch("createAsset",{assetName:this.nameToAdd}).then(function(e){t.$router.push("/asset/"+t.currentUser.userName+"/"+e+"/edit")}),this.nameToAdd=""}}}},53:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"home"}},54:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(27),n=s.n(a),i=s(120),o=s.n(i),r=s(24);e.default={name:"post",beforeMount:function(){this.populatePost()},watch:{$route:function(){this.populatePost()}},data:function(){return{postContent:"",appreciationInfo:"",postData:{markdownContent:"",title:"Loading...",idTitle:"",views:0,appreciations:0,writtenDate:"",editedDate:"",keywords:[],owner:{profileAsset:{path:""},userName:"",name:"",description:"",privilegeStatus:""}}}},computed:n()({},s.i(r.a)(["currentUser","isAuthenticated"]),{currentUserAppreciatesPost:function(){var t=this;return this.currentUser.appreciatedPosts.find(function(e){return e.idTitle===t.postData.idTitle&&e.owner.userName===t.postData.owner.userName})},currentUserFollowsAuthor:function(){var t=this;return this.currentUser.follows.find(function(e){return e.userName===t.postData.owner.userName})}}),methods:{populatePost:function(){var t=this;this.$store.dispatch("populatePost",{userName:this.$route.params.username,postId:this.$route.params.postid}).then(function(e){var s=new Date(e.createdAt);e.writtenDate=[s.getDate(),s.getMonth()+1,s.getFullYear()].join("/");var a=new Date(e.editedAt);e.editedDate=[a.getDate(),a.getMonth()+1,a.getFullYear()].join("/"),t.postData=e,t.postContent=o()(t.postData.markdownContent)})},appreciatePost:function(){var t=this;if(console.log(this.currentUser),this.currentUserAppreciatesPost)return!1;this.$store.dispatch("appreciatePost",{postId:this.$route.params.postid,userName:this.$route.params.username}).then(function(e){if(e)return t.setAppreciationInfo(e);t.setAppreciationInfo("")})},setAppreciationInfo:function(t){this.appreciationInfo=t}}}},55:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(27),n=s.n(a),i=s(44),o=s.n(i),r=s(24);e.default={name:"post-edit",beforeMount:function(){this.getData()},watch:{$route:function(){this.getData()}},data:function(){return{PRIVATE:0,PUBLIC:1,TYPE:1,SYNC:0,infoMessage:"",fullScreenInfoDisplaying:!1,fullScreenInfoMessage:"",markdownContent:"",postTitle:"",postIdTyped:"",postIsPrivate:!1,postKeywords:"",isPostIdAvailable:!0,saved:{markdownContent:"",postTitle:"",postId:"",postKeywords:"",postIsPrivate:!1},mdConfigs:{autosave:{enabled:!1},spellChecker:!1},isPostIdSync:!1}},computed:n()({},s.i(r.a)(["isAuthenticated","pendingAuthentication","currentUser"]),{isSaveable:function(){return(this.markdownContent!==this.saved.markdownContent||this.postTitle!==this.saved.postTitle||this.postId!==this.saved.postId||this.parsedKeywords!==this.saved.postKeywords||this.postIsPrivate!==this.saved.postIsPrivate)&&this.isPostIdAvailable},parsedKeywords:function(){return this.postKeywords.split(",").map(function(t){return t.trim()}).join(",")},postId:function(){return(this.isPostIdSync?this.postTitle:this.postIdTyped).replace(/ /g,"-").replace(/[\,\'\:]/g,"")}}),methods:{getData:function(){var t=this,e=this.checkAuthAndGetPost(-1),s=0;if(!e)var a=window.setInterval(function(){(e=t.checkAuthAndGetPost(s++))&&window.clearInterval(a)},100)},checkAuthAndGetPost:function(t){if(console.log(t,this.pendingAuthentication),!this.isAuthenticated&&!this.pendingAuthentication)return this.setFullScreenInfo(!0,"Log In or Sign Up to edit a post");if(!this.isAuthenticated&&this.pendingAuthentication)this.setFullScreenInfo(!1);else{if(this.$route.params.username===this.currentUser.userName)return this.populatePostEdit(),!0;this.$router.replace("/post/"+this.$route.params.username+"/"+this.$route.params.postid)}return!1},switchSync:function(t){switch(t){case 1:this.isPostIdSync=!1;break;case 0:this.isPostIdSync=!0}},switchPrivate:function(t){switch(t){case 0:this.postIsPrivate=!0;break;case 1:this.postIsPrivate=!1}},populatePostEdit:function(){var t=this;this.$store.dispatch("populatePost",{userName:this.currentUser.userName,postId:this.$route.params.postid}).then(function(e){t.markdownContent=t.saved.markdownContent=e.markdownContent,t.postTitle=t.saved.postTitle=e.title,t.postIdTyped=t.saved.postId=e.idTitle,t.postIsPrivate=t.saved.postIsPrivate=e.isPrivate,t.postKeywords=t.saved.postKeywords=e.keywords.split(",").join(", "),t.setFullScreenInfo(!1)}).catch(function(e){switch(e){case'"user does not have post"':t.setFullScreenInfo(!0,"Post either doesn't exist or has been removed")}})},savePost:function(){var t=this;if(this.isSaveable){var e={postid:this.saved.postId};this.saved.markdownContent!==this.markdownContent&&(e.markdowncontent=this.saved.markdownContent=this.markdownContent),this.saved.postTitle!==this.postTitle&&(e.postname=this.saved.postTitle=this.postTitle),this.saved.postId!==this.postId&&(e.newpostid=this.saved.postId=this.postId),this.saved.postIsPrivate!==this.postIsPrivate&&(e.isprivate=this.saved.postIsPrivate=this.postIsPrivate),this.saved.postKeywords!==this.parsedKeywords&&(e.keywords=this.saved.postKeywords=this.parsedKeywords),this.$store.dispatch("savePost",e).then(function(e){if(e)return t.setInfo(e);t.setInfo(""),t.$router.replace("/post/"+t.currentUser.userName+"/"+t.postId+"/edit")})}},goToPost:function(){this.$router.push("/post/"+this.currentUser.userName+"/"+this.postId)},deletePost:function(){var t=this;this.$store.dispatch("deletePost",{postId:this.$route.params.postid}).then(function(){if(window.history.length>1)return t.$router.go(-1);t.$router.replace("/")})},setInfo:function(t){this.infoMessage=t},setFullScreenInfo:function(t,e){return this.fullScreenInfoMessage=e,this.fullScreenInfoDisplaying=t}},components:{Switcher:o.a}}},56:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"switcher",props:["type","names","initActiveIndex"],data:function(){return{activeIndex:0}},created:function(){this.activeIndex=+this.initActiveIndex},computed:{nameList:function(){return this.names.split("|")},classObject:function(){var t={switch:!0};return t["switch-"+this.type]=!0,t}},methods:{change:function(t){this.activeIndex=t,this.$emit("change",t)}}}},57:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"user"}},58:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(14),n=s(122),i=(s.n(n),s(48)),o=s.n(i),r=s(47),c=s.n(r),l=s(45),u=s(46),d=s(120);s.n(d).a.setOptions({sanitize:!0}),a.a.config.productionTip=!1,a.a.config.devtools=!0,a.a.use(o.a),new a.a({el:"#app",router:l.a,store:u.a,created:function(){this.$store.dispatch("populateAuthentication")},template:"<App/>",components:{App:c.a}})}},[58]);
//# sourceMappingURL=app.3bc2aa402287e6164370.js.map