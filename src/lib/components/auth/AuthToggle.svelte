<script lang="ts">
	export let isLogin: boolean;
	export let onToggle: () => void;
</script>

<div class="text-center">
	<button type="button" class="text-sm text-gray-400 hover:text-gray-300" on:click={onToggle}>
		{isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти'}
	</button>
</div>
