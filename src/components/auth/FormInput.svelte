<script lang="ts">
  export let id: string;
  export let type: string = "text";
  export let label: string;
  export let value: string;
  export let placeholder: string;
</script>

<div class="space-y-2">
  <label for={id} class="block text-sm text-gray-300">{label}</label>
  <input
    {type}
    {id}
    bind:value
    class="form-input w-full rounded-xl border-none bg-background-secondary p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary"
    {placeholder}
  />
</div> 