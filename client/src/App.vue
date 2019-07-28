<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'App',
    data() {
      return {

      }
    },
    computed: {
        ...mapState({
            web3: state => state.api.web3,
            accountContract: state => state.api.accountContract,            })
    },
    // async beforeCreate() {
    //   console.log(this.web3)
    //   if(!this.web3.web3Instance) {
    //       await this.$store.dispatch('initWeb3');
    //       await this.$store.dispatch('initContract');
    //   }
    // },
    created() {
      if(!this.web3.web3Instance) {
           this.$store.dispatch('initWeb3');
           this.$store.dispatch('initContract');
      }
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
