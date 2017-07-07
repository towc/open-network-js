<template>
<nav class="navbar" :class=customClass >
    <div class="left">
      <router-link to="/" class="logo">ONJS</router-link>
    </div>
    <div v-if=isAuthenticated class="right right-auth">
      <router-link class="header-to-profile" :to="'/user/' + currentUser.userName"> 
        <img class="avatar" :src=currentUser.profileAsset.path />
        <div class="header-username" >{{ currentUser.userName }}</div>
      </router-link>
      <div class="header-control-icons">
        <svg class="icon icon-cog"
             @mouseenter="openControl('settings')"
             @mouseleave=closeControl>
          <use xlink:href="#icon-cog"></use>
        </svg>
        <svg class="icon icon-plus"
             @mouseenter="openControl('add')"
             @mouseleave=closeControl>
          <use xlink:href="#icon-plus">
          </use>
        </svg>
        <svg class="icon icon-alarm"
             @mouseenter="openControl('notifications')"
             @mouseleave=closeControl>
          <use xlink:href="#icon-alarm"></use>
        </svg>
      </div>
    </div>
    <div v-else class="right right-no-auth">
      <router-link to=/auth class="auth-link-wrapper" ><span class="auth-link">Sign Up</span> or <span class="auth-link">Log In</span></router-link>
    </div>
    <div class="header-control"
        :class="{ 'header-control-open': areIconsHovered || areControlsHovered }"
        @mouseenter="areControlsHovered = true"
        @mouseleave="areControlsHovered = false">
      <div class="header-control-panel"
          :class="{ 'header-control-panel-open': whichOpen === 'settings' }">
        settings
      </div>
      <div class="header-control-panel"
          :class="{ 'header-control-panel-open': whichOpen === 'add' }">
        <div class="container container-agnostic">
          <label class="label label-name-to-add">
            <div class="form-label form-label-name-to-add">
              <span>Name to add</span>
              <span class="form-label-name-to-add-temp">temp</span>
            </div>
            <span class="form-">
            <input class="form-input form-input-agnostic"
                   v-model=nameToAdd
                   placeholder="Insert..." />
          </label>
          <button class="form-button form-button-post"
                 :class="{ 'form-button-inverted': !isNameToAddAcceptable }"
                 @click=addPost>Add Post</button>
          <button class="form-button form-button-asset"
                 :class="{ 'form-button-inverted': !isNameToAddAcceptable }"
                 @click=addAsset>Add Asset</button>
        </div>
      </div>  
      <div class="header-control-panel"
           :class="{ 'header-control-panel-open': whichOpen === 'notifications' }">
        notifications
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

const keys = {
  'user': [ 'user', 'users' ],
  'auth': [ 'auth' ],
  'post': [ 'post', 'posts' ],
  'asset': [ 'asset', 'assets' ]
};

export default {
  name: 'header',

  data: () => ({
    areIconsHovered: false,
    areControlsHovered: false,

    whichOpen: false,

    nameToAdd: '',

    hasNotifications: false,
  }),

  computed: {
    customClass() {
      const keywords = this.$route.fullPath.split('/'); 

      let found = false;
      for( let i = keywords.length - 1; i >= 0; --i ){
        let keyword = keywords[ i ];
        for( let key in keys ) {
          let index = keys[ key ].indexOf( keyword );
          if( index > -1 ) {
            found = keys[ key ][ index ]
            break;
          }
        }

        if( found )
          break;

      }

      if( !found )
        found = 'post';

      return 'navbar-' + found;
    
    },
    isNameToAddAcceptable() {
      return this.nameToAdd.length > 0;
    },
    ...mapState([ 'isAuthenticated', 'currentUser' ])
  },

  methods: {
    openControl( type ) {
      this.whichOpen = type;
      this.areIconsHovered = true;
    },
    closeControl() {
      this.areIconsHovered = false;
    },

    addPost() {

      if( !this.isNameToAddAcceptable )
        return false;
      
      this.$store.dispatch( 'createPost', { postName: this.nameToAdd } )
        .then( postId => {
      
          this.$router.push( '/post/' + this.currentUser.userName + '/' + postId + '/edit' );
      });
      this.nameToAdd = '';
    },
    addAsset() {
      
      if( !this.isNameToAddAcceptable )
        return false;
      
      this.$store.dispatch( 'createAsset', { assetName: this.nameToAdd } )
        .then( assetId => {
      
          this.$router.push( '/asset/' + this.currentUser.userName + '/' + assetId + '/edit' );
      });
      this.nameToAdd = '';
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #555; 
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1.2px solid transparent;
  transition: border-color .1s;
}
.navbar-auth {
  border-color: #2CA6AB;
}
.navbar-user {
  border-color: #8D7E27;
}
.navbar-post {
  border-color: #37E86E; 
}
.navbar-asset {
  border-color: #7241EE;
}
.left {
  margin-left: 30px;
}
.right-no-auth {
  margin-right: 30px;
}
.logo {
  display: inline-block;
  height: 100%;
  line-height: 60px;
  font-size: 32px;
  color: #aaa;
}
.auth-link-wrapper {
  display: inline-block;
  height: 100%;
  line-height: 60px;
  font-size: 23px;
  color: #aaa;
}
.auth-link {
  color: #ccc;
}

.right-auth {
  display: flex;
  justify-content: space-between;
  width: 256px;
}
.header-to-profile {
  height: 42px;
  display: flex;
  margin-top: 8px;
}
.header-username {
  height: 42px;
  line-height: 42px;
  margin-left: 10px;
  color: #eee;
  font-size: 17px;
}

.icon {
  cursor: pointer;
  color: #aaa;
  width: 20px;
  height: 100%;
  padding: 0 5px;
}
.header-control {
  position: absolute;
  display: none;
  opacity: 0;
  right: 0;
  top: 60px;
  background-color: #333;
}
.header-control-icons {
  margin-right: 10px;
}
.header-control-open {
  animation: .3s display-panel;
  display: inline-block;
  opacity: 1;
}
.header-control-panel {
  width: 245px;
  display: none;
}
.header-control-panel-open {
  display: inline-block;
}
@keyframes display-panel {
  from { opacity: 0; }
  to { opacity: 1; }
}

.container {
  padding: 20px;
}
.form-label-name-to-add {
  display: flex;
  justify-content: space-between;
}
.form-label-name-to-add-temp {
  color: #aaa;
  font-size: 13px;
  margin-top: 5px;
}
.form-button {
  margin-top: 14px;
}
.form-button-post {
  margin-top: 25px;
}
</style>
