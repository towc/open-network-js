import MC from 'maptor-consumer';
const I = x => x;

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    pendingAuthentication: true,
    currentUser: false,
  },

  mutations: {
    authenticate( state, payload ) {
    
      state.isAuthenticated = payload.isAuthenticated;
      state.pendingAuthentication = false;

      if( payload.isAuthenticated ) {
        state.currentUser = payload.userData; 
        if( !state.currentUser.profileAsset )
          state.currentUser.profileAsset = {
            path: 'https://gravatar.com/avatar/6d552cd1dea552ad9ca12f745eead5c7?s=512&d=https://codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png',
            idName: 'default'
          }

      } else state.currentUser = false;
    }
  },
  actions: {
    populateAuthentication( context ) {
      
      const xhr = new XMLHttpRequest;

      xhr.open( 'GET', '/api/user/status' );
      xhr.onload = () => {
      
        if( xhr.status === 200 ) {

          const userData = JSON.parse( xhr.responseText );

          if( userData.isAuthenticated )
            context.dispatch( 'setOwnUser', userData );
          else
            context.commit( 'authenticate', userData );
        }
      };
      xhr.send();
    },

    setOwnUser( context, payload ){

      const xhr = new XMLHttpRequest;

      xhr.open( 'GET', '/api/user/request/' + payload.userName );
      xhr.onload = () => {
      
        if( xhr.status === 200 )
          context.commit( 'authenticate', {
            isAuthenticated: true,
            userData: JSON.parse( xhr.responseText )
          });
      };

      xhr.send();
    },
    authenticate( context, payload ) {
    
      return new Promise( ( resolve, reject ) => {
        const xhr = new XMLHttpRequest;

        switch( payload.method ) {
          
          case 'login':
            xhr.open( 'POST', '/api/user/login' );
            xhr.onload = () => {

              if( xhr.status === 200 )
                context.dispatch( 'setOwnUser', { userName: payload.userName });
          
              resolve( xhr );
            };

            xhr.send(JSON.stringify({
              username: payload.userName,
              email: payload.email,
              password: payload.password }));

            break;
          case 'signup':
            xhr.open( 'POST', '/api/user/create' );
            xhr.onload = () => {

              if( xhr.status === 200 )
                context.dispatch( 'authenticate', {
                  userName: payload.userName,
                  password: payload.password,
                  method: 'login' } );

              resolve( xhr );
            };

            xhr.send(JSON.stringify({
              username: payload.userName,
              email: payload.email,
              password: payload.password }));

            break;
        }
      });
    },
    
    createPost( context, payload ) {
      
      return new Promise( ( resolve, reject ) => {
        let postId = payload.postName
          .replace( / /g, '-' )
          .replace( /[\,\'\:]/g, '' )
          + '-' + Math.random().toString().split('.')[1];

        const xhr = new XMLHttpRequest;
        xhr.open( 'POST', '/api/post/create' );
        xhr.onload = () => {

          if( xhr.status === 200 ) {
            
            resolve( postId );
          }
        };
        xhr.send(JSON.stringify({
          postname: payload.postName,
          postid: postId
        }));
      });
    },
    createAsset( context, payload ) {
      
      return new Promise( ( resolve, reject ) => {
        let assetId = payload.assetName
          .replace( ' ', '-' )
          .replace( /[\,\'\:]/g, '' )
          + '-' + Math.random().toString().split('.')[1];

        const xhr = new XMLHttpRequest;
        xhr.open( 'POST', '/api/asset/create' );
        xhr.onload = () => {
        
          if( xhr.status === 200 ) {
            
            resolve( assetId );
          }
        };
        xhr.send(JSON.stringify({
          assetname: payload.assetName,
          assetid: assetId
        }));
      });
    },

    populatePost( context, payload ) {
    
      return new Promise( ( resolve, reject ) => {
      
        const xhr = new XMLHttpRequest;
        xhr.open( 'GET', `/api/post/${ payload.userName }/${ payload.postId }` );
        xhr.onload = () => {
        
          if( xhr.status === 200 ) {
            let response = JSON.parse( xhr.responseText );

            if( !response.owner.profileAsset )
              response.owner.profileAsset = {
                path: 'https://gravatar.com/avatar/6d552cd1dea552ad9ca12f745eead5c7?s=512&d=https://codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png',
                idName: 'default'
              }

            return resolve( response );
          }

          const text = xhr.responseText;
          reject( text.substring( 1, text.length - 1 ) );

        };
        xhr.send();
      })
    },
    populateAsset( context, payload ) {
    
      return new Promise( ( resolve, reject ) => {
      
        const xhr = new XMLHttpRequest;
        xhr.open( 'GET', `/api/asset/${ payload.userName }/${ payload.postId }` );
        xhr.onload = () => {
        
          if( xhr.status === 200 ) {
            let response = JSON.parse( xhr.responseText );

            if( !response.owner.profileAsset )
              response.owner.profileAsset = {
                path: 'https://gravatar.com/avatar/6d552cd1dea552ad9ca12f745eead5c7?s=512&d=https://codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png',
                idName: 'default'
              }

            return resolve( response );
          }

          const text = xhr.responseText;
          reject( text.substring( 1, text.length - 1 ) );

        };
        xhr.send();
      })
    },
    savePost( context, payload ) {
    
      return new Promise( ( resolve, reject ) => {
      
        const xhr = new XMLHttpRequest;
        xhr.open( 'POST', '/api/post/update' );

        xhr.onload = () => {
        
          let text = xhr.responseText;
          resolve( xhr.status === 200 ? '' : text.substring( 1, text.length - 1 ) );

        };
        xhr.send( JSON.stringify( payload ) );
      })
    },
    deletePost( context, payload ) {

      return new Promise( ( resolve, reject ) => {
      
        const xhr = new XMLHttpRequest;
        xhr.open( 'DELETE', `/api/post/${ payload.postId }` );

        xhr.onload = () => {
        
          resolve();
        };
        xhr.send();
      })
    },
    appreciatePost( context, payload ) {
    
      return new Promise( ( resolve, reject ) => {
      
        const xhr = new XMLHttpRequest;
        xhr.open( 'GET', `/api/post/appreciate/${ payload.userName }/${ payload.postId }` );

        xhr.onload = () => {
        
          let text = xhr.responseText;
          resolve( xhr.status === 200 ? '' : text.substring( 1, text.length - 1 ) );

        };
        xhr.send();
      })
    }
  }
});

export default store;
