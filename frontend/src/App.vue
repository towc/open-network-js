<template>
  <div id="app">
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-cog" viewBox="0 0 32 32">
          <title>cog</title>
          <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
        </symbol>
        <symbol id="icon-plus" viewBox="0 0 32 32">
          <title>plus</title>
          <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
        </symbol>
        <symbol id="icon-alarm" viewBox="0 0 32 32">
          <title>alarm</title>
          <path d="M27 23h-22l-3 3v1l1 1h9c0 2.209 1.791 4 4 4s4-1.791 4-4h9l1-1v-1l-3-3zM26 15c0-4.1-2.47-7.618-6-9.162v-1.838c0-2.209-1.791-4-4-4s-4 1.791-4 4v1.838c-3.53 1.544-6 5.062-6 9.162v7h20v-7zM14 4c0-1.104 0.896-2 2-2s2 0.896 2 2h-4z"></path>
        </symbol>
      </defs>
    </svg>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    Header,
  }
}
</script>

<style>
@font-face {
  font-family: Roboto;
  src: url('./assets/Roboto-Regular.ttf')
}
body, button, input, textarea {
  font-family: Roboto;
  border: none;
}
button:focus, input:focus, textarea:focus {
  outline: none; }
body {
  margin: 0;
  background-color: #222;
}
a {
  color: inherit;
  text-decoration: none;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.container {
  background-color: #111;
  border-left-width: 4px;
  border-left-style: solid;
}
.container-auth {
  border-color: #2CA6AB;
}
.container-post {
  border-color: #2E9D51;
}
.container-asset {
  border-color: #7241EE;
}
.container-agnostic {
  border-color: #888;
}

.form-label {
  color: #eee;
  font-size: 18px;
  margin-bottom: 13px;
  display: flex;
  justify-content: space-between;
}

.form-input {
  background-color: transparent;
  font-size: 15px;
  color: #ccc;
  border-bottom: 1px solid;
  width: 200px;
}
.form-input-auth {
  border-bottom-color: #2CA6AB;
}
.form-input-post {
  border-bottom-color: #2E9D51;
}
.form-input-asset {
  border-bottom-color: #7241EE;
}
.form-input-agnostic {
  border-bottom-color: #888;
}

.form-button-layer {
  display: flex;
  flex-direction: column;
}
.form-button {
  width: 200px;
  height: 33px;
  color: #eee;
  font-size: 18px;
  cursor: pointer;
  margin: auto;

  transition: background-color .5s, border-color .5s;
}
a.form-button {
  display: inline-block;
  text-align: center;
  line-height: 33px;
}
.form-button-inverted.form-button-inverted {
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
}
.form-button-auth {
  background-color: #195D60;
  border-color: #195D60;
}
.form-button-post {
  background-color: #2E9D51;
  border-color: #2E9D51;
}
.form-button-asset {
  background-color: #5B34BE;
  border-color: #5B34BE;
}
.form-button-user {
  background-color: #8D7E27;
  border-color: #8D7E27;
}
.form-button-danger {
  background-color: #9E2E2E;
  border-color: #9E2E2E;
}

.form-info {
  padding-top: 9px;
  height: 20px;
  color: #ddd;
  margin: auto;
  font-size: 13px;
}

.avatar {
  border-radius: 100%;
  width: 42px;
  height: 42px;
}
</style>
