<script lang="ts">
  import NavBar from '../../components/NavBar.svelte';
</script>

<div class="min-h-screen bg-[#1A1B1F] text-white pb-20">
  <!-- Header -->
  <header class="p-4 flex items-center justify-between">
    <h1 class="text-xl font-semibold">Kim Benson 🔥</h1>
    <button class="p-2">
      <span class="material-icons">notifications_none</span>
    </button>
  </header>

  <!-- Main Content -->
  <main class="p-4">
    <!-- Add your main content here -->
    <div class="space-y-4">
      <!-- Example content cards -->
      {#each Array(5) as _, i}
        <div class="bg-[#25262B] rounded-lg p-4">
          <h2>Content Card {i + 1}</h2>
          <p class="text-gray-400">Sample content goes here...</p>
        </div>
      {/each}
    </div>
  </main>

  <NavBar />
</div>
