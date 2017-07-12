<template>
  <div class="asset-edit">
    <div class="layer layer-1">
      <h1 class="title">Edit Asset</h1>
    </div>
    <div class="layer layer2 fullscreen-info-message"
      v-if=fullScreenInfoDisplaying> {{ fullScreenInfoMessage }}</div>
    <div class="layer layer-2"
      v-else >
      <img class="asset"
        :src=assetPath>
      <div class="container container-asset">
     
        <div class="layer layer-2-sub layer-2a">
          <label class="label label-asset-name">
            <div class="form-label">Name</div>
            <input class="form-input form-input-asset"
              v-model=assetName
              placeholder="Insert..." />
          </label>
        </div>
        <div class="layer layer-2-sub layer-2b">
          <label class="label label-asset-id">
            <div class="form-label form-label-asset-id">
              <span>Asset id</span>
              <Switcher class="sync-switch" 
                type=asset
                names="Sync|Type"
               :initActiveIndex=TYPE
               @change=switchSync />
            </div>
            <input class="form-input form-input-asset"
             :class="{ 'form-input-agnostic': isAssetIdSync }"
              v-model=assetIdTyped
              placeholder="Insert..." />
          </label>
          <div class="preview-asset-url">/asset/{{ currentUser.userName }}/{{ assetId }}</div>
        </div>
        <div class="layer layer-2-sub layer-2ba">
          <label class="label label-asset-path">
            <div class="form-label">Path</div>
            <input class="form-input form-input-asset"
              v-model=assetPath
              placeholder="Insert..." />
          </label>
        </div>
        <div class="layer layer-2-sub layer-2bb">
          <label class="label label-asset-description">
            <div class="form-label">Description</div>
            <textarea class="form-input form-input-asset"
              v-model=assetDescription
              placeholder="Insert..." />
          </label>
        </div>
        <div class="layer layer-2-sub layer-2c">
          <label class="label label-asset-keywords">
            <div class="form-label">
              <span>Keywords</span>
              <span class="form-label-keywords-comma">key1, key2, key3...</span>
            </div>
            <input class="form-input form-input-asset"
              v-model=assetKeywords
              placeholder="Insert..." />
          </label>
        </div>
        <div class="layer layer-2-sub layer-2d">
          <Switcher class="private-switch"
            type=asset
            names="Private|Public"
           @change=switchPrivate
            :initActiveIndex="assetIsPrivate ? PUBLIC : PRIVATE" />
        </div>
        <div class="layer layer-2-sub layer-2e">
          <div class="form-info">{{ infoMessage }}</div>
          <button class="form-button form-button-asset"
            :class="{ 'form-button-inverted': !isSaveable }"
            @click=saveAsset >Save</button>
          <router-link class="form-button form-button-asset"
            :to="`/asset/${ currentUser.userName }/${ assetId }`" >Go To Asset</router-link>
          <button class="form-button form-button-asset"
            :class="{ 'form-button-inverted': isAuthenticated && isProfileImage }"
            @click=setAsProfile>Set as Profile</button>
        </div>
        <div class="layer layer-2-sub layer-2f">
          <button class="form-button form-button-danger"
            @click=deleteAsset >Delete</button>
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
  name: 'asset-edit',

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

    assetName: '',
    assetIdTyped: '',
    assetIsPrivate: false,
    assetKeywords: '',
    assetDescription: '',
    assetPath: '',

    // FIXED by displaying backend message, but keep for later in case
    isAssetIdAvailable: true,

    saved: {
      assetName: '',
      assetId: '',
      assetDescription: '',
      assetPath: '',
      assetKeywords: '',
      assetIsPrivate: false,
    },

    mdConfigs: {
      autosave: { enabled: false },
      spellChecker: false
    },

    isAssetIdSync: false,
  }),

  computed: {
    ...mapState([ 'isAuthenticated', 'pendingAuthentication', 'currentUser' ]),
    isSaveable() {

      return ( this.assetDescription !== this.saved.assetDescription
            || this.assetPath !== this.saved.assetPath
            || this.assetName !== this.saved.assetName
            || this.assetId !== this.saved.assetId
            || this.parsedKeywords !== this.saved.assetKeywords
            || this.assetIsPrivate !== this.saved.assetIsPrivate )
            && this.isAssetIdAvailable;
    },
    parsedKeywords() {
      return this.assetKeywords.split(',').map( x => x.trim() ).join(',');
    },
    assetId() {

      return ( this.isAssetIdSync ? this.assetName : this.assetIdTyped )
                .replace( / /g, '-' )
                .replace( /[\,\'\:]/g, '' );
    },
    isProfileImage() {
      return this.currentUser.profileAsset.idName === this.$route.params.assetid;
    }
  },

  methods: {
    getData() {
    
      let found = this.checkAuthAndGetAsset( -1 ); 

      let round = 0;
      if( !found ) {
        const interval = window.setInterval( () => {
        
          found = this.checkAuthAndGetAsset( round++ );
          
          if( found )
            window.clearInterval( interval );
            
        }, 100 );
      }
    },
    checkAuthAndGetAsset( rounds ) {

      if( !this.isAuthenticated && !this.pendingAuthentication )
        return this.setFullScreenInfo( true, 'Log In or Sign Up to edit a asset')

      else if( !this.isAuthenticated && this.pendingAuthentication )
        this.setFullScreenInfo( false );

      else if( this.$route.params.username !== this.currentUser.userName ) 
        this.$router.replace( `/asset/${ this.$route.params.username }/${ this.$route.params.assetid}` );
      
      else {
        this.populateAssetEdit();
        return true;
      }

      return false;
    },
    switchSync( index ) {

      switch( index ) {
        case TYPE:
          this.isAssetIdSync = false;
          break;
        case SYNC:
          this.isAssetIdSync = true;
          break;
      }

    },
    switchPrivate( index ) {
    
      switch( index ) {
        case PRIVATE:
          this.assetIsPrivate = true;
          break;
        case PUBLIC:
          this.assetIsPrivate = false;
          break;
      }
    },
    populateAssetEdit() {
    
      this.$store.dispatch( 'populateAsset', {

        userName: this.currentUser.userName,
        assetId: this.$route.params.assetid 

      }).then( assetData => {

        this.assetName = this.saved.assetName = assetData.name;
        this.assetIdTyped = this.saved.assetId = assetData.idName;
        this.assetIsPrivate = this.saved.assetIsPrivate = assetData.isPrivate;
        this.assetPath = this.saved.assetPath = assetData.path;
        this.assetDescription = this.saved.assetDescription = assetData.description;
        this.assetKeywords = ( this.saved.assetKeywords = assetData.keywords ).split(',').join(', ');

        this.setFullScreenInfo( false );

      }).catch( error => {

        switch( error ) {
          case '"user does not have asset"':
            this.setFullScreenInfo( true, 'Asset either doesn\'t exist or has been removed' );
            break;
        }
      })
    },
    saveAsset() {
      
      if( !this.isSaveable )
        return;

      const changed = {
        assetid: this.saved.assetId
      };
      
      if( this.saved.assetName !== this.assetName )
        changed.assetname = this.saved.assetName = this.assetName;

      if( this.saved.assetId !== this.assetId )
        changed.newassetid = this.saved.assetId = this.assetId;

      if( this.saved.assetIsPrivate !== this.assetIsPrivate )
        changed.isprivate = this.saved.assetIsPrivate = this.assetIsPrivate;

      if( this.saved.assetKeywords !== this.parsedKeywords )
        changed.keywords = this.saved.assetKeywords = this.parsedKeywords;

      if( this.saved.assetDescription !== this.assetDescription )
        changed.description = this.saved.assetDescription = this.assetDescription;

      if( this.saved.assetPath !== this.assetPath )
        changed.assetpath = this.saved.assetPath = this.assetPath;


      this.$store.dispatch( 'saveAsset', changed ).then( ( errMessage ) => {
      
        if( errMessage )
          return this.setInfo( errMessage )

        this.setInfo( '' );
        this.$router.replace( `/asset/${ this.currentUser.userName }/${ this.assetId }/edit` );
      
      })

    },
    goToAsset() {
      
      this.$router.push( `/asset/${ this.currentUser.userName }/${ this.assetId }` );
    },
    deleteAsset() {
      this.$store.dispatch( 'deleteAsset', {

        assetId: this.$route.params.assetid

      }).then( () => {
      
        if( window.history.length > 1 )
          return this.$router.go(-1);

        this.$router.replace( '/' );
      });
    },
    setAsProfile() {

      if( this.isProfileImage )
        return false;

      this.$store.dispatch( 'setAssetAsProfile', {
      
        assetId: this.$route.params.assetid

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
  margin-bottom: 30px;
  margin-left: calc( 50% - 815px / 2 )
}
.fullscreen-info-message {
  height: 400px;
  line-height: 400px;
  font-size: 40px;
  text-align: center;
  color: #eee;
}
.asset {
  width: 465px;
  max-height: 800px;
  align-self: center;
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
.preview-asset-url {
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
