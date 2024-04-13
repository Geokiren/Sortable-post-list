<template>
  <div class="container" :class="classes">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    classes?: string
  }>();
</script>