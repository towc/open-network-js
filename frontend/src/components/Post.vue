<template>
  <div class="post"
    v-if=postExists>
    <div class="layer layer-1">
      <h1 class="post-title">{{ postData.title }}</h1>
    </div>
    <div class="layer layer-2">
      <div class="post-content" v-html=postContent></div>
    </div>
    <div class="layer layer-3">
      <div class="post-data post-views">views<br>{{ postData.views }}</div>
      <div class="post-data post-appreciations">appreciations<br>{{ postData.appreciations }}</div>
      <div class="post-data post-written-date">Written<br>{{ postData.writtenDate }}</div>
      <div class="post-data post-edited-date">Edited<br>{{ postData.editedDate }}</div>
    </div>
    <div class="layer layer-4"
      v-if=isAuthenticated >
      <span class="form-info appreciation-info">{{ appreciationInfo }}</span>
      <button class="form-button form-button-post appreciate-button"
        :class="{ 'form-button-inverted': currentUserAppreciatesPost }"
        @click=appreciatePost >
        {{ currentUserAppreciatesPost ? 'Appreciated' : 'Appreciate' }}
      </button>
    </div>
    <div class="layer layer-5 container container-user">
      <router-link :to="`user/${ postData.owner.userName }`"
        class="author-group">
        <img class="author-image" :src=postData.owner.profileAsset.path />
        <div class="author-info">
          <div class="author-info-name">{{ postData.owner.name }}</div>
          <div class="author-info-username">{{ postData.owner.userName }}</div>
        </div>
      </router-link>
      <button class="form-button form-button-user follow-button"
        v-if=isAuthenticated
        :class="{ 'form-button-inverted': currentUserFollowsAuthor }">
        {{  currentUserFollowsAuthor ? 'Following' : 'Follow' }}
      </button>
    </div>
  </div>
  <div class="post post-error" v-else>{{ postError }}</div>
</template>

<script>
import marked from 'marked'
import { mapState } from 'vuex'

export default {
  name: 'post',

  beforeMount() {
  
    this.populatePost();
  },
  watch: {
    '$route'() {
      
      this.populatePost();
    }
  },

  data: () => ({

    postExists: true,
    postError: '',
    
    postContent: '',
    appreciationInfo: '',
    postData: {
      markdownContent: '',
      title: 'Loading...',
      idTitle: '',
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
        description: '',
        privilegeStatus: ''
      }
    }

  }),

  computed: {
    ...mapState([ 'currentUser', 'isAuthenticated' ]),
    
    currentUserAppreciatesPost() {
    
      return this.currentUser.appreciatedPosts.find( post =>
        post.idTitle === this.$route.params.postid &&
        post.owner.userName === this.$route.params.username );
    },
    currentUserFollowsAuthor() {
      return this.currentUser.follows.find( user =>
        user.userName === this.$route.params.username ) 
    }
  },


  methods: {
    populatePost() {
      
      this.$store.dispatch( 'populatePost', {
        userName: this.$route.params.username,
        postId: this.$route.params.postid

      }).then( postData => {

        console.log( postData );
        const createdDate = new Date( postData.createdAt );
        postData.writtenDate = [ createdDate.getDate(), createdDate.getMonth() + 1, createdDate.getFullYear() ].join('/');
        
        const editedDate = new Date( postData.editedAt );
        postData.editedDate = [ editedDate.getDate(), editedDate.getMonth() + 1, editedDate.getFullYear() ].join('/');

        this.postData = postData;
        this.postContent = marked( this.postData.markdownContent );

      }).catch( error => {

        this.postExists = false;
        this.postError = error;

      
      })
    },
    appreciatePost() {

      if( this.currentUserAppreciatesPost )
        return false;

      this.$store.dispatch( 'appreciatePost', {
        postId: this.$route.params.postid,
        userName: this.$route.params.username

      }).then( ( err ) => {
        
        if( err )
          return this.setAppreciationInfo( err );
  
        ++this.postData.appreciations;

        this.currentUser.appreciatedPosts.push( this.postData );
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

.post-error {
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
}
.post-title {
  text-align: center;
  color: #eee;
  margin: auto;
  font-size: 34px;
}
.post-content {
  padding: 18px;
  width: 612px;
  margin: auto;
  background-color: #f8f8f8;
}
.layer-3 {
  display: flex;
  width: 612px;
  margin-left: calc( 50% - 612px/2 );
  justify-content: space-around;
  text-align: center;
  color: #bbb;
  font-size: 13px;
}
.layer-4 {
  margin-top: 50px;
}
.form-info {
  display: block;
  text-align: center;
}
.appreciate-button {
  width: 450px;
  height: 50px;
  display: block;
}
.layer-5 {
  width: 320px; 
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 33px;
  justify-content: space-between;
}
.author-group {
  display: flex;
}
.author-image {
  width: 64px;
  height: 64px;
  border-radius: 100%;
}
.author-info {
  margin-top: 9px;
  margin-left: 13px;
}
.author-info-name {
  color: #bbb;
  font-size: 13px;
}
.author-info-username {
  color: #ccc;
  font-size: 24px;
}
.follow-button {
  width: 106px;
  margin-right: 0;
}
</style>
