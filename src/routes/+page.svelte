<script lang="ts">
  import { onMount } from 'svelte';
  import Splash from './onboarding/splash.svelte';
  import Carousel from './onboarding/carousel.svelte';
  import { fade } from 'svelte/transition';
  
  let currentPage: 'splash' | 'carousel' = 'splash';
  const isAuthenticated = false;
  
  onMount(() => {
    // After 2 seconds, transition from splash to carousel
    setTimeout(() => {
      currentPage = 'carousel';
    }, 2000);
  });
</script>

{#if currentPage === 'splash'}
  <div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
    <Splash />
  </div>
{:else if !isAuthenticated}
  <div in:fade={{ duration: 300 }}>
    <Carousel />
  </div>
{/if}
