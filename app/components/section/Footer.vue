<template>
    <footer class="w-full bg-black text-neutral-200 border-t border-white/10 py-12 px-6 lg:px-16 selection:bg-white selection:text-black">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono text-xs text-neutral-500 tracking-widest uppercase">
            
            <div>
                <span class="block text-neutral-400">LOCATION</span>
                <span class="text-neutral-300">INDONESIA (UTC+7)</span>
            </div>

            <div class="text-left md:text-center">
                <span class="block text-neutral-300">&copy; {{ currentYear }} ADITYA KURNIA SAPUTRA</span>
                <span class="text-neutral-600 text-[10px]">DESIGNED & DEVELOPED WITH PASSION</span>
            </div>

            <button @click="scrollToTop" 
                    type="button"
                    class="group inline-flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <span>BACK TO TOP</span>
                <span class="text-sm font-bold group-hover:-translate-y-1 transition-transform duration-300">↑</span>
            </button>

        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();

const scrollToTop = () => {
    window.lenis.scrollTo('#home', { smooth: true });
};
</script>