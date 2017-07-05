<template>
  <div class="container container-auth">
    <Switcher class="main-switch"
      type=auth
      names="Sign Up|Log In"
      @change=switchMethod
      :initActiveIndex=LOG_IN />

    <div class="layer layer-1">
      <label class="label label-username">
        <div class="form-label">Username</div>
        <input class="form-input form-input-auth"
          v-model=userName
          @input=checkAuthenticationAvailability
          placeholder="Insert..." />
      </label>
      <div class="intermediary">
        {{ methodIndex === LOG_IN ? 'or' : 'and' }}
      </div>
      <label class="label label-email">
        <div class="form-label">Email</div>
        <input class="form-input form-input-auth"
          v-model=email
          @input=checkAuthenticationAvailability
          placeholder="Insert..." />
      </label>
    </div>
    <div class="layer layer-2">
      <label class="label label-password">
        <div class="form-label form-label-password">
          <span>Password</span>
          <span class="form-label-password-forgot"
            title="best solution right now is sending an email to matei@copot.eu about it">forgot?</span></div>
        <input type="password" class="form-input form-input-auth"
          v-model=password
          @input=checkAuthenticationAvailability
          placeholder="Insert..." />
      </label>
    </div>
    <div class="layer form-button-layer layer-3">
      <button class="form-button form-button-auth"
        :class="{ 'form-button-inverted': tryingToAuthenticate || !authenticationAvailable }"
        @click=authenticate >Authenticate</button>
      <div class="form-info" ref="info"></div>
    </div>
  </div>
</template>

<script>
import Switcher from '@/components/Switcher'

const [ SIGN_UP, LOG_IN ] = [ 0, 1 ];

export default {
  name: 'auth',
  data: () => ({
    SIGN_UP, LOG_IN,

    methodIndex: LOG_IN,
    tryingToAuthenticate: false,
    authenticationAvailable: false
  }),
  methods: {
    switchMethod( methodIndex ) {
      this.methodIndex = methodIndex;
      this.checkAuthenticationAvailability();
    },
    checkAuthenticationAvailability() {
      
      switch( this.methodIndex ) {
        case LOG_IN:
          if( !( this.userName || this.email ) ) {
            this.setInfo( 'Please insert Username or Email', false );
          } else if( !this.password ) {
            this.setInfo( 'Please insert Password', false );
          } else {
            this.setInfo( '', true );
          }
          break;
        case SIGN_UP:
          if( !this.userName ) {
            this.setInfo( 'Please insert Username', false );
          } else if( !this.email ) {
            this.setInfo( 'Please insert Email', false );
          } else if( !this.password ) {
            this.setInfo( 'Please insert Password', false );
          } else {
            this.setInfo( '', true );
          }
      }
    },
    setInfo( text, authenticationAvailable ) {
      this.$refs.info.textContent = text;
      this.authenticationAvailable = authenticationAvailable;
    },
    authenticate() {

      if( !this.authenticationAvailable )
        return false;

      this.tryingToAuthenticate = true;

      this.$store.dispatch( 'authenticate', {
        method: [ 'signup', 'login' ][ this.methodIndex ],
        userName: this.userName,
        email: this.email,
        password: this.password
      }).then( xhr => {
      
        this.tryingToAuthenticate = false;
        if( [ 400, 401 ].indexOf( xhr.status ) > -1 )
          return this.setInfo( xhr.responseText.slice( 1, xhr.responseText.length - 1 ), false );
        
       this.$router.push( '/user/' + this.userName );
      })
    },
  },


  components: {
    Switcher
  }
}
</script>

<style scoped>
.container {
  display: inline-block;
  margin-top: 50px;
  width: 460px;
  margin-left: calc( 50% - 230px );
  padding-bottom: 20px;
}
.main-switch {
  margin-left: calc( 50% - 103px );
  margin-top: 20px;
}

.form-input {
  width: 153px;
}

.layer {
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  justify-content: space-between;
}
.intermediary {
  color: #eee;
  font-size: 20px;
  margin-top: 13px;
}
.form-label-password-forgot {
  color: #aaa;
  font-size: 13px;
  margin-top: 5px;
}
</style>
