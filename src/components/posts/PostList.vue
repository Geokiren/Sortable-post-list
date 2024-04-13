<template>
  <section id="post-list" class="flex flex-col gap-4 w-full md:w-1/2">
    <h2 class="text-2xl md:text-3xl font-bold text-post-title mb-2 sm:mb-5 tracking-wide">Sortable Post List</h2>
    
    <TransitionGroup name="post-list" tag="div" class="transition-group-posts" data-test="transition-group-posts">
      <PostItem v-for="(post, index) in posts" :key="post.id" :id="post.id" :index="index" :size="posts.length" />
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
  import { usePostsStore } from '@/stores/posts';
  import type { IPosts } from '@/types/posts';
  import { onMounted } from 'vue';
  import PostItem from './PostItem.vue';

  const { posts, fetchPosts }: { posts: IPosts, fetchPosts: () => void } = usePostsStore();

  onMounted(() => {
    fetchPosts();
  });
</script>

<style scoped>
  .post-list-move {
    transition: all 0.5s;
  }
</style>