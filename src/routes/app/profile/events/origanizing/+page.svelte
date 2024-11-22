<script lang="ts">
  import { goto } from '$app/navigation';
  import { EventStatus, EventType } from '$lib/types';
  
  let view: 'list' | 'calendar' = 'list';
  
  const events = [
    {
      title: 'Встреча владельцев BMW',
      status: EventStatus.COMPLETED,
      participants: 50,
      participantsLimit: 50,
      type: EventType.PUBLIC,
      date: '12/19',
      bgColor: 'bg-purple-500',
      progressColor: 'bg-purple-400'
    },
    { id: 2, name: 'OpenMind', date: '5/20', bgColor: 'bg-green-500', progressColor: 'bg-green-400' },
    { id: 3, name: 'Unity Dashboard', date: '12/19', bgColor: 'bg-teal-500', progressColor: 'bg-teal-400' },
    { id: 4, name: 'Instagram Shots', date: '5/20', bgColor: 'bg-blue-500', progressColor: 'bg-blue-400' }
  ];

  const currentMonth = 'Дек 2024';
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleBack = () => {
    goto('/profile', { replaceState: true });
  };
</script>

<div class="min-h-screen bg-black text-white p-4">
  <!-- Add back button -->
  <button 
    on:click={handleBack}
    class="mb-4 text-gray-400 flex items-center"
  >
    <span class="mr-2">←</span> Назад
  </button>

  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-2xl font-semibold mb-6">Участвую</h1>
    
    <!-- View Toggle -->
    <div class="flex space-x-2 mb-6">
      <button 
        class="px-4 py-2 rounded-full {view === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500'}"
        on:click={() => view = 'list'}>
        Обзор
      </button>
      <button 
        class="px-4 py-2 rounded-full {view === 'calendar' ? 'bg-blue-500 text-white' : 'text-gray-500'}"
        on:click={() => view = 'calendar'}>
        Календарь
      </button>
    </div>
  </div>

  {#if view === 'list'}
    <!-- Events Grid -->
    <div class="grid grid-cols-2 gap-4">
      {#each events as event}
        <div class="rounded-xl p-4 {event.bgColor} bg-opacity-10">
          <div class="flex flex-col h-full">
            <div class="flex-grow">
              <h3 class="text-lg font-medium mb-2">{event.name}</h3>
              <div class="w-full h-1 bg-gray-700 rounded-full">
                <div class="w-1/3 h-full {event.progressColor} rounded-full"></div>
              </div>
            </div>
            <span class="text-sm text-gray-400 mt-2">{event.date}</span>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- Calendar View -->
    <div class="bg-gray-900 rounded-xl p-4">
      <div class="flex justify-between items-center mb-6">
        <button class="text-gray-400">←</button>
        <span>{currentMonth}</span>
        <button class="text-gray-400">→</button>
      </div>
      
      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-2 text-center">
        <div class="text-gray-500 text-sm">П</div>
        <div class="text-gray-500 text-sm">В</div>
        <div class="text-gray-500 text-sm">С</div>
        <div class="text-gray-500 text-sm">Ч</div>
        <div class="text-gray-500 text-sm">П</div>
        <div class="text-gray-500 text-sm">С</div>
        <div class="text-gray-500 text-sm">В</div>
        
        {#each days as day}
          <div class="h-8 w-8 flex items-center justify-center rounded-full
            {day === 12 ? 'bg-blue-500' : 'hover:bg-gray-800'}">
            {day}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
