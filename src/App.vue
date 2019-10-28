<template>
  <div id="app">
    <p>Время до смены светофора: {{time}} сек.</p>
    <router-view v-bind:style="styleRed" class="light"></router-view>
    <router-view v-bind:style="styleYellow" class="light"></router-view>
    <router-view v-bind:style="styleGreen" class="light"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      green: ((this.$route.name==="green" || this.$route.name==="yellow") ? true:false),
      yellow:  (this.$route.name==="yellow" ? true:false),
      red:  ((this.$route.name==="red" || this.$route.path==="/") ? true:false),
      styleRed: {
        backgroundColor: (this.$route.name==="red" ? 'rgba(255,0,0,1)':'rgba(255,0,0,0.5)')
      },
      styleGreen: {
         backgroundColor:(this.$route.name==="green" ? 'rgba(0,255,0,1)':'rgba(0,255,0,0.5)')
      },
      styleYellow: {
        backgroundColor: (this.$route.name==="yellow" ? 'rgba(255,255,0,1)':'rgba(255,255,0,0.5)')
      },
      time: 10,
    }
  },
  created (){
    this.trafficLight();
    var self = this;
    let timeId = setTimeout( function tick() {
      self.updateLight();
      timeId = setTimeout(tick, self.timer);
    },self.timer);
    setInterval(function(){
      self.time--;
    }, 1000);

  },

  methods: {
    trafficLight(){
      if(this.yellow){
        this.styleRed = {backgroundColor:'rgba(255,0,0,0.5)'};
        this.styleGreen = {backgroundColor:'rgba(0,255,0,0.5)'};
        this.styleYellow = {backgroundColor:'rgba(255,255,0,1)'};
        this.$router.push('yellow');
        this.time=3;
      } else{
        if(this.green){
          this.styleRed = {backgroundColor:'rgba(255,0,0,0.5)'};
          this.styleYellow = {backgroundColor:'rgba(255,255,0,0.5)'};
          this.styleGreen = {backgroundColor:'rgba(0,255,0,1)'};
          this.$router.push('green');
          this.time=15;
        }
        if(this.red){
          this.styleGreen = {backgroundColor:'rgba(0,255,0,0.5'};
          this.styleYellow = {backgroundColor:'rgba(255,255,0,0.5)'};
          this.styleRed = {backgroundColor:'rgba(255,0,0,1)'};
          this.$router.push('red');
          this.time=10;
        }
      }
    },
    updateLight(){
      if (this.yellow) {
        this.yellow = !this.yellow;
        this.green = !this.green;
        this.red = !this.red;
      } else {
        this.yellow = !this.yellow;
      }
      this.trafficLight();
    },
  },
  computed: {
    timer() {
      let time = 1000;
      if(this.yellow){
        time *= 3;
      } else if(this.green){
        time *= 15;
      } else {
        time *= 10;
      }
      return time;
    },
  } 
}

</script>

<style>
#app {
  align-content: center;
  width: 100vw;
  height: 100vh;
}


.light {
  border-radius: 50%;
  align-content: center;
  height: 30%;
  width: 15%;
  margin: 1% 0 1% 0;
}


</style>
