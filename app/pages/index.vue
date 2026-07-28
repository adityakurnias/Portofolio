<script setup lang="ts">
useSeoMeta({
  title: 'Aditya Kurnia Saputra — Front-End Developer & UI/UX Designer',
  description: 'Portfolio of Aditya Kurnia Saputra, a Front-End Developer & UI/UX Designer based in Indonesia specializing in Vue, Nuxt, TypeScript.',
  ogTitle: 'Aditya Kurnia Saputra — Front-End Developer & UI/UX Designer',
  ogDescription: 'Portfolio of Aditya Kurnia Saputra, a Front-End Developer & UI/UX Designer based in Indonesia specializing in Vue, Nuxt, TypeScript.',
  ogImage: 'https://kurnia.me/Images/og.webp',
  ogUrl: 'https://kurnia.me',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Aditya Kurnia Saputra — Front-End Developer & UI/UX Designer',
  twitterDescription: 'Portfolio of Aditya Kurnia Saputra, a Front-End Developer & UI/UX Designer based in Indonesia specializing in Vue, Nuxt, TypeScript.',
  twitterImage: 'https://kurnia.me/Images/og.webp',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://kurnia.me' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://kurnia.me/#person',
            'name': 'Aditya Kurnia Saputra',
            'jobTitle': 'Front-End Developer & UI/UX Designer',
            'url': 'https://kurnia.me',
            'image': 'https://kurnia.me/Images/Self.jpg',
            'sameAs': [
              'https://github.com/adityakurnias',
              'https://www.linkedin.com/in/aditya-kurnia-saputra',
              'https://www.instagram.com/dikrcy'
            ],
            'knowsAbout': ['Vue.js', 'Nuxt.js', 'JavaScript', 'TypeScript', 'UI/UX Design', 'Front-End Development']
          },
          {
            '@type': 'WebSite',
            '@id': 'https://kurnia.me/#website',
            'url': 'https://kurnia.me',
            'name': 'Aditya Kurnia Saputra Portfolio',
            'publisher': {
              '@id': 'https://kurnia.me/#person'
            }
          }
        ]
      })
    }
  ]
})
</script>

<template>
    <main>
        <header class="fixed top-0 left-0 right-0 z-50">
            <CommonTopBar />
        </header>

        <section id="home">
            <SectionHomepage />
        </section>

        <section id="about">
            <SectionAbout />
        </section>

        <section id="work">
            <SectionWork />
        </section>

        <section id="contact">
            <SectionContact />
        </section>

        <SectionFooter />
    </main>
</template>
