<template>
    <div>
      <button :class="styles.button" @click="increment">Increment</button>
      <div class="count">Count: {{ count }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import * as styles from './style.module.css'

  const count = ref(0);
  const increment = () => {
    count.value++;
    console.log(styles);

  };

</script>
  
<style scoped>
.count {
  color: red;
}
</style>