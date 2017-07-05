<template>
  <div class="post-edit">
    <div class="layer layer-1">
      <h1 class="title">Edit Post</h1>
    </div>
    <div class="layer layer-2">
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
            @click=save >Save</button>
          <button class="form-button form-button-post"
            @click=goToPost >Go To Post</button>
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
  
    if( this.isAuthenticated )
      return this.populatePostEdit();

    const interval = window.setInterval( () => {
    
      if( this.isAuthenticated ) {
        window.clearInterval( interval );
        this.populatePostEdit();
      }
        
    }, 100 );

  },

  data: () => ({
    PRIVATE, PUBLIC,
    TYPE, SYNC,

    infoMessage: '',

    markdownContent: '',
    postTitle: '',
    //postId: '', // replaced in computed
    postIdTyped: '',
    postIsPrivate: false,
    postKeywords: '',

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
    ...mapState([ 'isAuthenticated', 'currentUser' ]),
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
    
      this.$store.dispatch( 'populatePostEdit', { postId: this.$route.params.postid } )
        .then( postData => {

          this.markdownContent = this.saved.markdownContent = postData.markdownContent;
          this.postTitle = this.saved.postTitle = postData.title;
          this.postIdTyped = this.saved.postId = postData.idTitle;
          this.postIsPrivate = this.saved.postIsPrivate = postData.isPrivate;
          this.postKeywords = this.saved.postKeywords = postData.keywords.split(',').join(', ');
        })
    },
    save() {
      
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
        this.$router.push( `/post/${ this.currentUser.userName }/${ this.postId }/edit` );
      
      })

    },

    setInfo( message ) {
      this.infoMessage = message;
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
.private-switch {
  width: 264px;
}
.form-button {
  margin-top: 10px;
}
.layer-2e {
  margin-bottom: 20px;
}

.form-label-keywords-comma {
  color: #aaa;
  font-size: 13px;
  margin-top: 5px;
}
</style>
