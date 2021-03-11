<template>
  <div class="box" @click="$emit('click')">
    <!-- Header -->
    <div v-if="showHeader" class="box__header">
      <slot name="header">
        <h2 class="title">
          {{ title }}
        </h2>
        <h3 v-if="subtitle" class="subtitle">
          {{ subtitle }}
        </h3>
      </slot>
    </div>

    <!-- Photo -->
    <div v-if="showPhoto" class="box__photo">
      <slot name="photo">
        <div class="box__photo__preview" :class="photo" />
      </slot>
    </div>

    <!-- Content -->
    <div v-if="content" class="box__content" v-html="prettyContent" />

    <div v-else class="box__content">
      <slot />
    </div>

    <!-- Footer -->
    <slot name="footer" />
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
  props: {
    photo: {
      type: [String, Array],
      default: null,
    },

    title: {
      type: String,
      default: null,
    },

    subtitle: {
      type: String,
      default: null,
    },

    content: {
      type: String,
      default: null,
    },
  },

  computed: {
    showPhoto() {
      return this.photo || this.$slots.photo
    },

    showHeader() {
      return this.title || this.$slots.header
    },

    prettyContent() {
      return md.render(this.content)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
