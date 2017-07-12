<template>
  <div class="asset"
    v-if=assetExists>
    <div class="layer layer-1">
      <h1 class="title">{{ assetData.name }}</h1>
    </div>
    <div class="layer layer-2">
      <img class="asset-image" :src=assetData.path />
    </div>
    <div class="layer layer-3 container container-asset asset-info">
      <div>
        <h1 class="asset-name">{{ assetData.name }}</h1>
        <a :href="`/asset/fetch/${ this.$route.params.username }/${ this.$route.params.assetid }`"
          class="asset-url"
          target="_blank">/asset/fetch/{{ $route.params.username }}/{{ $route.params.assetid }}</a>
        <p class="asset-description">{{ assetData.description }}</p>
      </div>
      <div>
        <div class="asset-date">Created on<br>{{ assetData.createdDate }}</div>
        <div class="asset-date">Edited on<br>{{ assetData.editedDate }}</div>
      </div>
    </div>
    <div class="layer layer-5 container container-user">
      <router-link :to="`user/${ assetData.owner.userName }`"
        class="owner-group">
        <img class="owner-image" :src=assetData.owner.profileAsset.path />
        <div class="owner-info">
          <div class="owner-info-name">{{ assetData.owner.name }}</div>
          <div class="owner-info-username">{{ assetData.owner.userName }}</div>
        </div>
      </router-link>
      <button class="form-button form-button-user follow-button"
        v-if=isAuthenticated
        :class="{ 'form-button-inverted': currentUserFollowsAuthor }">
        {{  currentUserFollowsAuthor ? 'Following' : 'Follow' }}
      </button>
    </div>
  </div>
  <div class="asset asset-error" v-else>{{ assetError }}</div>
</template>

<script>
import marked from 'marked'
import { mapState } from 'vuex'

export default {
  name: 'asset',

  beforeMount() {
  
    this.populateAsset();
  },
  watch: {
    '$route'() {
      
      this.populateAsset();
    }
  },

  data: () => ({

    assetExists: true,
    assetError: '',
    
    assetContent: '',
    appreciationInfo: '',
    assetData: {
      markdownContent: '',
      name: 'Loading...',
      idName: '',
      views: 0,
      appreciations: 0,
      writtenDate: '',
      editedDate: '',
      keywords: [],
      
      owner: {
        profileAsset: {
          path: ''
        },
        userName: '',
        name: '',
        privilegeStatus: ''
      }
    }

  }),

  computed: {
    ...mapState([ 'currentUser', 'isAuthenticated' ]),
    
    currentUserFollowsAuthor() {
      return this.currentUser.follows.find( user =>
        user.userName === this.$route.params.username ) 
    }
  },


  methods: {
    populateAsset() {
      
      this.$store.dispatch( 'populateAsset', {
        userName: this.$route.params.username,
        assetId: this.$route.params.assetid

      }).then( assetData => {

        console.log( assetData );
        const createdDate = new Date( assetData.createdAt );
        assetData.createdDate = [ createdDate.getDate(), createdDate.getMonth() + 1, createdDate.getFullYear() ].join('/');
        
        const editedDate = new Date( assetData.editedAt );
        assetData.editedDate = [ editedDate.getDate(), editedDate.getMonth() + 1, editedDate.getFullYear() ].join('/');

        this.assetData = assetData;

      }).catch( error => {

        this.assetExists = false;
        this.assetError = error;

      
      })
    },
    appreciateAsset() {

      if( this.currentUserAppreciatesAsset )
        return false;

      this.$store.dispatch( 'appreciateAsset', {
        assetId: this.$route.params.assetid,
        userName: this.$route.params.username

      }).then( ( err ) => {
        
        if( err )
          return this.setAppreciationInfo( err );
  
        this.currentUser.appreciatedAssets.push( this.assetData );
        this.setAppreciationInfo( '' );
      });
    },
    setAppreciationInfo( message ) {
      
      this.appreciationInfo = message;

    }
  }
}
</script>

<style scoped>

.asset-error {
  font-size: 20px;
  color: #ccc;
  text-align: center;
  width: 100%;
  margin-top: 40px;
}
.layer {
  margin-top: 20px;
}
.layer-1 {
  margin-top: 50px;
  color: #
}
.title {
  text-align: center;
  font-size: 30px;
  color: #ccc;
}
.asset-image {
  max-width: 480px;
  display: block;
  margin: auto;
}
.layer-3 {
  display: flex;
  margin-left: calc( 50% - 480px/2 );
  justify-content: space-between;
  color: #bbb;
  font-size: 13px;
}
.asset-info {
  width: 450px;
  padding: 15px;
}
.asset-name {
  color: #ccc;
  font-size: 22px;
  margin-bottom: 0;
}
.asset-url {
  color: #888;
  font-size: 11px;
}
.asset-description {
  color: #aaa;
  font-size: 15px;
}
.asset-date {
  margin-top: 10px;
}
.layer-4 {
  margin-top: 50px;
}
.form-info {
  display: block;
  text-align: center;
}
.appreciate-button {
  width: 350px;
  display: block;
}
.layer-5 {
  width: 320px; 
  padding: 33px;
  justify-content: space-between;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-bottom: 30px;
}
.owner-group {
  display: flex;
}
.owner-image {
  width: 64px;
  height: 64px;
  border-radius: 100%;
}
.owner-info {
  margin-top: 9px;
  margin-left: 13px;
}
.owner-info-name {
  color: #bbb;
  font-size: 13px;
}
.owner-info-username {
  color: #ccc;
  font-size: 24px;
}
.follow-button {
  width: 106px;
  margin-right: 0;
}
</style>
