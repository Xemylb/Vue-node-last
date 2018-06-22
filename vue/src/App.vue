<template>
  <div id="app">
    <customHeader/>
    <div class="main-content">
      <router-view/>
    </div>

    <customFooter/>
  </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import 'bootstrap-vue/dist/bootstrap-vue.js'
    import customHeader from './components/header'
    import customFooter from './components/footer'
export default {
  name: 'App',
    components:{
        customHeader,customFooter
    }
}
</script>

<style lang="sass">

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

.main-content
  min-height: 900px
  padding: 30px 0
</style>
