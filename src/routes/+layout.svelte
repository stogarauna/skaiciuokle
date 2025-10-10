
<nav class="w-full bg-white shadow-sm">
  <div class="max-w-md mx-auto px-4 py-3 flex gap-4 items-center">
	<a href="/" class="text-blue-600 font-medium">Home</a>
	<a href="/extra" class="text-gray-600 hover:text-blue-600">Extra</a>
  </div>
</nav>

<main class="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6" style="font-size: 1.8rem !important; line-height: 1 !important;">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-5">
		<slot />
	</div>

	<footer class="text-center text-gray-500 mt-6">
		LED Skaičiuoklė © 2025
	</footer>
</main>
