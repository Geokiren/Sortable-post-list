<template>
  <div id="alerts -list" v-if="alerts.length" class="alerts flex flex-col gap-1 justify-center items-end p-4" >
    <AlertMessage v-for="alert in alerts" :key="alert.id" :message="alert.message" :variant="alert.type" />
  </div>
</template>

<script setup lang="ts">
  import AlertMessage from './AlertMessage.vue';
  import { usePostsStore } from '@/stores/posts';
  import type { AlertsType } from '@/types/alerts';

  const { alerts }: { alerts: AlertsType } = usePostsStore();
</script>