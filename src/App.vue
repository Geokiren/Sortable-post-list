<template>
  <main>
    <div class="clip"></div>

    <AlertsList />
    
    <LayoutContainer classes="py-8 relative z-10 flex flex-col md:flex-row justify-center gap-4 md:gap-8 xl:gap-32">
      <PostList />
      <ActionList />
    </LayoutContainer>
  </main>
</template>

<script setup lang="ts">
  import PostList from './components/posts/PostList.vue';
  import ActionList from './components/actions/ActionList.vue';
  import LayoutContainer from './components/shared/LayoutContainer.vue';
  import AlertsList from './components/shared/alerts/AlertsList.vue';
  
</script>

