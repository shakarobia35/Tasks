<template>
  <div class="detail">
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Intro from './Intro.vue'
import Course from './Course.vue'
import Contact from './Contact.vue'
import Upload from './Upload.vue'
import Manage from './Manage.vue'
import Draft from './Draft.vue'

const route = useRoute()

const componentMap = {
  intro: Intro,
  course: Course,
  contact: Contact,
  upload: Upload,
  manage: Manage,
  draft: Draft
}

const currentComponent = computed(() => {
  const id = route.params.id  
  return componentMap[id] || Intro
})
</script>