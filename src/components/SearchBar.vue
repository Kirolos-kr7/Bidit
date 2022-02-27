<script setup>
const text = $ref({
  search: {
    ar: 'بحث',
    en: 'Search',
  },
  placeholder: {
    ar: 'بحث المنتجات',
    en: 'Search products',
  },
})
</script>

<template>
  <div class="fixed left-1/2 z-20 mt-20 block w-[440px] -translate-x-1/2">
    <h1 class="mb-3 text-3xl font-bold">{{ $t(text.search) }}</h1>
    <input
      type="text"
      class="w-full rounded-sm border-0 bg-gradient-to-b from-[#00000020] to-transparent px-3 py-2.5 font-medium text-black outline-none"
      :placeholder="$t(text.placeholder)"
    />
  </div>
</template>
