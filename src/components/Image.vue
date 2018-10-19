<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="260px" viewBox="0 0 350 275" preserveAspectRatio="xMidYMid meet">
      <line v-if="strikes > 0" x1="80" y1="257" x2="260" y2="257" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 0" x1="100" y1="257" x2="100" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 0" x1="100" y1="40" x2="230" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 0" x1="100" y1="80" x2="130" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 0" x1="230" y1="40" x2="230" y2="80" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <circle v-if="strikes > 1" cx="230" cy="90" style="fill:khaki;stroke:yellow;stroke-width:2px;" r="20" />
      <line v-if="strikes > 1" x1="230" y1="110" x2="230" y2="170" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 2" x1="230" y1="140" x2="250" y2="120" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 3" x1="230" y1="140" x2="210" y2="120" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 4" x1="230" y1="170" x2="250" y2="200" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 5" x1="230" y1="170" x2="210" y2="200" style="stroke:yellow;fill:none;stroke-width:2px;" />
      <image v-if="strikes > 1 && strikes < 6" xlink:href="https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg" x="205" y="65" height="50px" width="50px"/>
      <image v-if="strikes > 1 && strikes < 6" xlink:href="https://i.pinimg.com/originals/53/e7/44/53e7441a38f57786fd8db6f01f93c06b.jpg" x="205" y="95" height="100px" width="50px"/>
      <image v-if="strikes > 2 && strikes < 6" xlink:href="https://en.pimg.jp/012/423/521/1/12423521.jpg" x="160" y="80" height="50px" width="50px"/>
      <image v-if="strikes > 3 && strikes < 6" xlink:href="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/3/2/8/6/1216823-1-eng-GB/Truly-exciting-Probiotic-may-increase-muscle-mass-energy-performance.jpg" x="250" y="95" height="50px" width="50px"/>
      <image v-if="strikes > 4 && strikes < 6" xlink:href="http://www.ghostride.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/B/P/BP_LEGS-M-LEFT.jpg" x="185" y="179" height="50px" width="50px"/>
      <image v-if="strikes > 5 && strikes < 6" xlink:href="http://www.ghostride.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/B/P/BP_LEGS-F-LEFT.jpg" x="220" y="179" height="50px" width="50px"/>
    </svg> 
  </div>
</template>

<script>
  export default {
    name: 'Image',
    props: ['strikes']
  }
</script>

<style>
  
</style>