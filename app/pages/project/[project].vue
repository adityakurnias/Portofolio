<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
import projectData from '~/contents/pages/projects.json';
const route = useRoute();
const projectSlug = route.params.project;

const projects = projectData.projects || [];

const foundProject = projects.find((p: any) =>
  p.slug === projectSlug
);

if (!foundProject) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project Not Found',
    fatal: true
  });
}

</script>

<style>

</style>