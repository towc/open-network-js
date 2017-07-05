<template>
  <div :class=classObject >
    <button v-for="(name, i) in nameList" :class="{ 'switch-item': true, 'switch-item-active': i === activeIndex }" @click=change(i)>{{ name }}</button>
  </div>
</template>

<script>
export default {
  name: 'switcher',
  props: [ 'type', 'names', 'initActiveIndex' ],

  data: () => ({
    activeIndex: 0    
  }),

  created() {
    this.activeIndex = +this.initActiveIndex;
  },

  computed: {
    nameList() {
      return this.names.split('|');
    },
    classObject() {
      const obj = { switch: true };
      obj[ 'switch-' + this.type ] = true;
      return obj
    }
  },

  methods: {
    change( index ) {
      this.activeIndex = index;
      this.$emit( 'change', index );
    } 
  }
}
</script>

<style scoped>
.switch {
  display: flex;
  width: 206px;
}
.switch-item {
  flex: 1;
  font-size: 13px;
  height: 26px;
  color: #bbb; 
  text-align: center;
  padding: 0;
  cursor: pointer;
  transition: background-color .1s, color .1s;
}
.switch-item:first-child {
  border-radius: 5px 0 0 5px;
}
.switch-item:last-child {
  border-radius: 0 5px 5px 0;
}
.switch-item:not(:last-child) {
  border-right: 1px #000 solid;
}
.switch-item-active {
  color: #eee;
}
.switch-auth > .switch-item {
  background-color: #124244;
}
.switch-auth > .switch-item-active {
  background-color: #1F7478;
}
.switch-post > .switch-item {
  background-color: #1C5E31;
}
.switch-post > .switch-item-active {
  background-color: #2E9D51;
}
</style>
