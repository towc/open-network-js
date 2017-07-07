<template>
  <div class="post-edit">
    <div class="layer layer-1">
      <h1 class="title">Edit Post</h1>
    </div>
    <div class="layer layer2 fullscreen-info-message"
      v-if=fullScreenInfoDisplaying> {{ fullScreenInfoMessage }}</div>
    <div class="layer layer-2"
      v-else >
      <markdown-editor class="md-editor"
                       v-model=markdownContent
                       :configs=mdConfigs  />
      <div class="container container-post">
     
        <div class="layer layer-2-sub layer-2a">
          <label class="label label-post-title">
            <div class="form-label">Title</div>
            <input class="form-input form-input-post"
              v-model=postTitle
              placeholder="Insert..." />
          </label>
        </div>
        <div class="layer layer-2-sub layer-2b">
          <label class="label label-post-id">
            <div class="form-label form-label-post-id">
              <span>Post id</span>
              <Switcher class="sync-switch" 
                type=post
                names="Sync|Type"
               :initActiveIndex=TYPE
               @change=switchSync />
            </div>
            <input class="form-input form-input-post"
             :class="{ 'form-input-agnostic': isPostIdSync }"
              v-model=postIdTyped
              placeholder="Insert..." />
          </label>
          <div class="preview-post-url">/post/{{ currentUser.userName }}/{{ postId }}</div>
        </div>
        <div class="layer layer-2-sub layer-2c">
          <label class="label label-post-keywords">
            <div class="form-label">
              <span>Keywords</span>
              <span class="form-label-keywords-comma">key1, key2, key3...</span>
            </div>
            <input class="form-input form-input-post"
              v-model=postKeywords
              placeholder="Insert..." />
          </label>
        </div>
        <div class="layer layer-2-sub layer-2d">
          <Switcher class="private-switch"
            type=post
            names="Private|Public"
           @change=switchPrivate
           :initActiveIndex=PUBLIC />
        </div>
        <div class="layer layer-2-sub layer-2e">
          <div class="form-info">{{ infoMessage }}</div>
          <button class="form-button form-button-post"
            :class="{ 'form-button-inverted': !isSaveable }"
            @click=savePost >Save</button>
          <router-link class="form-button form-button-post"
            :to="`/post/${ currentUser.userName }/${ postId }`" >Go To Post</router-link>
        </div>
        <div class="layer layer-2-sub layer-2f">
          <button class="form-button form-button-danger"
            @click=deletePost >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Switcher from './Switcher';

import { mapState } from 'vuex';

const [ PRIVATE, PUBLIC ] = [ 0, 1 ]
    , [ TYPE, SYNC ] = [ 1, 0 ];

export default {
  name: 'post-edit',

  beforeMount() {

    this.getData();
  },
  watch: {
    '$route' () {
      this.getData();
    }
  },

  data: () => ({
    PRIVATE, PUBLIC,
    TYPE, SYNC,

    infoMessage: '',
    fullScreenInfoDisplaying: false,
    fullScreenInfoMessage: '',

    markdownContent: '',
    postTitle: '',
    postIdTyped: '',
    postIsPrivate: false,
    postKeywords: '',

    // FIXED by displaying backend message, but keep for later in case
    isPostIdAvailable: true,

    saved: {
      markdownContent: '',
      postTitle: '',
      postId: '',
      postKeywords: '',
      postIsPrivate: false,
    },

    mdConfigs: {
      autosave: { enabled: false },
      spellChecker: false
    },

    isPostIdSync: false,
  }),

  computed: {
    ...mapState([ 'isAuthenticated', 'pendingAuthentication', 'currentUser' ]),
    isSaveable() {
      return ( this.markdownContent !== this.saved.markdownContent
            || this.postTitle !== this.saved.postTitle
            || this.postId !== this.saved.postId
            || this.parsedKeywords !== this.saved.postKeywords
            || this.postIsPrivate !== this.saved.postIsPrivate )
            && this.isPostIdAvailable;
    },
    parsedKeywords() {
      return this.postKeywords.split(',').map( x => x.trim() ).join(',');
    },
    postId() {

      return ( this.isPostIdSync ? this.postTitle : this.postIdTyped )
                .replace( / /g, '-' )
                .replace( /[\,\'\:]/g, '' );
    }
  },

  methods: {
    getData() {
    
      let found = this.checkAuthAndGetPost( -1 ); 

      let round = 0;
      if( !found ) {
        const interval = window.setInterval( () => {
        
          found = this.checkAuthAndGetPost( round++ );
          
          if( found )
            window.clearInterval( interval );
            
        }, 100 );
      }
    },
    checkAuthAndGetPost( rounds ) {

      console.log( rounds, this.pendingAuthentication );
    
      if( !this.isAuthenticated && !this.pendingAuthentication )
        return this.setFullScreenInfo( true, 'Log In or Sign Up to edit a post')

      else if( !this.isAuthenticated && this.pendingAuthentication )
        this.setFullScreenInfo( false );

      else if( this.$route.params.username !== this.currentUser.userName ) 
        this.$router.replace( `/post/${ this.$route.params.username }/${ this.$route.params.postid}` );
      
      else {
        this.populatePostEdit();
        return true;
      }

      return false;
    },
    switchSync( index ) {

      switch( index ) {
        case TYPE:
          this.isPostIdSync = false;
          break;
        case SYNC:
          this.isPostIdSync = true;
          break;
      }

    },
    switchPrivate( index ) {
    
      switch( index ) {
        case PRIVATE:
          this.postIsPrivate = true;
          break;
        case PUBLIC:
          this.postIsPrivate = false;
          break;
      }
    },
    populatePostEdit() {
    
      this.$store.dispatch( 'populatePost', {

        userName: this.currentUser.userName,
        postId: this.$route.params.postid 

      }).then( postData => {

          this.markdownContent = this.saved.markdownContent = postData.markdownContent;
          this.postTitle = this.saved.postTitle = postData.title;
          this.postIdTyped = this.saved.postId = postData.idTitle;
          this.postIsPrivate = this.saved.postIsPrivate = postData.isPrivate;
          this.postKeywords = this.saved.postKeywords = postData.keywords.split(',').join(', ');

          this.setFullScreenInfo( false );

        }).catch( error => {

          console.log( err );
          switch( error ) {
            case '"user does not have post"':
              this.setFullScreenInfo( true, 'Post either doesn\'t exist or has been removed' );
              break;
          }
        })
    },
    savePost() {
      
      if( !this.isSaveable )
        return;

      const changed = {
        postid: this.saved.postId
      };
      
      if( this.saved.markdownContent !== this.markdownContent )
        changed.markdowncontent = this.saved.markdownContent = this.markdownContent;

      if( this.saved.postTitle !== this.postTitle )
        changed.postname = this.saved.postTitle = this.postTitle;

      if( this.saved.postId !== this.postId )
        changed.newpostid = this.saved.postId = this.postId;

      if( this.saved.postIsPrivate !== this.postIsPrivate )
        changed.isprivate = this.saved.postIsPrivate = this.postIsPrivate;

      if( this.saved.postKeywords !== this.parsedKeywords )
        changed.keywords = this.saved.postKeywords = this.parsedKeywords;


      this.$store.dispatch( 'savePost', changed ).then( ( errMessage ) => {
      
        if( errMessage )
          return this.setInfo( errMessage )

        this.setInfo( '' );
        this.$router.replace( `/post/${ this.currentUser.userName }/${ this.postId }/edit` );
      
      })

    },
    goToPost() {
      
      this.$router.push( `/post/${ this.currentUser.userName }/${ this.postId }` );
    },
    deletePost() {
      this.$store.dispatch( 'deletePost', {

        postId: this.$route.params.postid

      }).then( () => {
      
        if( window.history.length > 1 )
          return this.$router.go(-1);

        this.$router.replace( '/' );
      });
    },

    setInfo( message ) {
      this.infoMessage = message;
    },
    setFullScreenInfo( displaying, message ) {
    
      this.fullScreenInfoMessage = message;
      return this.fullScreenInfoDisplaying = displaying;
    }
  },

  components: {
    Switcher
  }
}
</script>

<style>
.editor-toolbar, .editor-toolbar:hover {
  opacity: .9;
}
.editor-toolbar {
  background-color: #fff;
}
</style>

<style scoped>
.title {
  text-align: center;
  font-size: 30px;
  color: #ccc;
}
.layer-2 {
  display: flex;
  width: 815px;
  margin-left: calc( 50% - 815px / 2 )
}
.fullscreen-info-message {
  height: 400px;
  line-height: 400px;
  font-size: 40px;
  text-align: center;
  color: #eee;
}
.md-editor {
  width: 465px;
  font: 13px Roboto;
  margin-right: 25px;
}
.container {
  width: 325px;
}
.layer-2-sub {
  margin-left: 30px;
  margin-top: 18px;
}
.form-input, .form-button {
  width: 264px;
}

.form-label {
  width: 264px;
}
.sync-switch {
  width: 160px;
}
.preview-post-url {
  color: #888;
  font-size: 10px;
  margin-top: 6px;
}
.form-label-keywords-comma {
  color: #aaa;
  font-size: 13px;
  margin-top: 5px;
}
.private-switch {
  width: 264px;
}
.form-button {
  margin-top: 10px;
}
.layer-2e {
  margin-bottom: 20px;
}
.layer-2f {
  margin-bottom: 20px;
}

</style>
