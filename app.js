(function() {
  var vm = new Vue({
    el: '#app',
    data: {
      time:null,
      timeMax:null,
      timerOn:false,
      setTimer:null,
      setHour:0,
      setMin:1,
      setSec:0,
      longClick:null,
      timerShow:false,
      hoverShow:true,
      vh:(window.innerHeight * 0.01),
    },
    methods: {
      resize(){
        this.vh = window.innerHeight * 0.01;
      },
      count_down(){
        if (this.time > 0) {
          this.time--;
        }
      },
      timer(){
        if(this.timerShow == false){
          this.time = (this.setHour*60*60)+(this.setMin*60)+this.setSec;
          this.timeMax = this.time;
        }
        if(this.timerOn == false && this.time != 0){
          this.timerShow = true;
          this.timerOn = true;
          this.setTimer = setInterval(this.count_down, 1000);
        }else{
          this.timerOn = false;
          clearInterval(this.setTimer);
        }
      },
      cancel(){
        this.timerShow = false;
        this.timerOn = false;
        clearInterval(this.setTimer);
        document.title = "Timer";
      },
      updown(i){
        if(i == "+h"){
          this.setHour++;
          this.longClick = setInterval(()=>{this.setHour++;}, 500);
        }
        if(i == "-h"){
          if(this.setHour>0) this.setHour--;
          this.longClick = setInterval(()=>{
            if(this.setHour>0) this.setHour--;
          }, 500);
        }
        if(i == "+m"){
          this.setMin++;
          this.longClick = setInterval(()=>{this.setMin++;}, 150);
        }
        if(i == "-m"){
          if(this.setMin>0) this.setMin--;
          this.longClick = setInterval(()=>{
            if(this.setMin>0) this.setMin--;
          }, 150);
        }
        if(i == "+s"){
          this.setSec += 10;
          this.longClick = setInterval(()=>{this.setSec += 10;}, 500);
        }
        if(i == "-s"){
          if(this.setSec>0) this.setSec -= 10;
          this.longClick = setInterval(()=>{
            if(this.setSec>0) this.setSec -= 10;
          }, 500);
          if(this.setSec<0) this.setSec = 0;
        }
        if(i == "stop"){
          clearInterval(this.longClick);
        }
      },
      validation(e){
        e.target.value = e.target.value.replace(/[^0-9]+/i,'');
        if(e.target.value.length == e.target.maxLength){
          e.target.blur();
        }
      },
      editFocus(e){
        e.target.value = null;
      },
      hover(e){
        if(e == "over") this.hoverShow = true;
        if(e == "leave") this.hoverShow = false;
      }
    },
    computed:{
      styles(){
        return ({
          '--vh': `${this.vh}px` , 
          '--ow': `${this.timeMax}s`,
          '--aps':this.running
        });
      },
      timerHour(){
        if((Math.floor(this.time / (60*60))) > 0) return (("00"+(Math.floor(this.time / (60*60)))).slice( -2 )+":");
        return "";
      },
      timerMin(){
        if(Math.floor(this.time / 60) >= 60) return ("00"+(Math.floor((this.time / 60)-((Math.floor(this.time / (60*60)))*60)))).slice( -2 );
        if(Math.floor(this.time / 60) < 60) return ("00"+(Math.floor(this.time / 60))).slice( -2 );
      },
      timerSec(){
        return ("00"+(this.time % 60)).slice( -2 );
      },
      running(){
        if(this.timerOn == true) return "running";
        if(this.timerOn == false) return "paused";
      },
      btn(){
        if(this.timerOn == false) return "Start";
        if(this.timerOn == true) return "Stop";
      }
    },
    mounted: function () {
      window.addEventListener('resize', this.resize);
    },
    watch: {
      setHour: function () {
        if(!Number.isInteger(this.setHour)) this.setHour = null;
        if(this.setHour > 9) this.setHour = 9;
      },
      setMin: function () {
        if(!Number.isInteger(this.setMin)) this.setMin = null;
        if(this.setMin > 59) this.setMin = 59;
      },
      setSec: function () {
        if(!Number.isInteger(this.setSec)) this.setSec = null;
        if(this.setSec > 50) this.setSec = 50;
      },
      time: function (){
        document.title = this.timerHour+this.timerMin+":"+this.timerSec;
        if(this.time == 0) document.title = "Timer / over";
      }
    }
  });
})();
