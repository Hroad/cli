<template>
    <div  class="home"> 
      <div class="home__wrap">        
         <div class="tip-text">演示进入</div>
      </div>
    </div>
</template>
 <script>
 // SH 赵起  演示-占位
 export default {
   name:'home-view'
 }
 </script>
 <style lang="less" scoped>
 .home{
   width: 100%;
   height: 100%;
   position: relative;
   color: #000;
    &__wrap{
      position:relative;
      left: 0;
      top: 0;
      width:100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tip-text{
        width: 100%;
        line-height: 32px;
        font-size: 14px;
        text-align: center;
      }
    }
 }
 
 </style>
 
 