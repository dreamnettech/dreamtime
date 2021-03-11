<template>
  <div id="queuebar" class="queue">
    <section class="queue__section queue__section--running">
      <div class="queue__header">
        <p class="title">
          <span class="icon"><font-awesome-icon icon="running" /></span>
          <span>Queue</span>
          <span class="separator">·</span>
          <span>{{ $nudify.waiting.length }}</span>
        </p>

        <div v-show="$nudify.waiting.length > 0" class="queue__section__actions">
          <button
            v-tooltip="{placement: 'bottom', content: 'Remove all'}"
            class="button button--danger button--xs"
            @click.prevent="$nudify.forgetAll('waiting')">
            <font-awesome-icon icon="trash-alt" />
          </button>

          <button
            v-tooltip="{placement: 'bottom', content: 'Cancel all' }"
            class="button button--xs"
            @click.prevent="$nudify.cancelAll('waiting')">
            <font-awesome-icon icon="sign-out-alt" />
          </button>
        </div>
      </div>

      <div class="queue__content">
        <QueuePhoto
          v-for="(photo, index) of $nudify.waiting"
          :key="index"
          :photo="photo" />
      </div>
    </section>

    <section class="queue__section queue__section--pending">
      <div class="queue__header">
        <p class="title">
          <span class="icon"><font-awesome-icon icon="clipboard-list" /></span>
          <span>Pending</span>
          <span class="separator">·</span>
          <span>{{ $nudify.pending.length }}</span>
        </p>

        <div v-show="$nudify.pending.length > 0" class="queue__section__actions">
          <button
            v-tooltip="'Remove all'"
            class="button button--danger button--xs"
            @click.prevent="$nudify.forgetAll()">
            <font-awesome-icon icon="trash-alt" />
          </button>

          <button
            v-tooltip="'Start all'"
            class="button button--success button--xs"
            @click.prevent="$nudify.addAll()">
            <font-awesome-icon icon="play" />
          </button>
        </div>
      </div>

      <div class="queue__content">
        <QueuePhoto
          v-for="(photo, index) of $nudify.pending"
          :key="index"
          :photo="photo" />
      </div>
    </section>

    <section class="queue__section queue__section--finished">
      <div class="queue__header">
        <p class="title">
          <span class="icon"><font-awesome-icon icon="clipboard-check" /></span>
          <span>Finished</span>
          <span class="separator">·</span>
          <span>{{ $nudify.finished.length }}</span>
        </p>

        <div v-show="$nudify.finished.length > 0" class="queue_section__actions">
          <button
            v-tooltip="'Remove all'"
            class="button button--danger button--xs"
            @click.prevent="$nudify.forgetAll('finished')">
            <font-awesome-icon icon="trash-alt" />
          </button>

          <button
            v-tooltip="'Rerun all'"
            class="button button--info button--xs"
            @click.prevent="$nudify.addAll('finished')">
            <font-awesome-icon icon="retweet" />
          </button>
        </div>
      </div>

      <div class="queue__content">
        <QueuePhoto
          v-for="(photo, index) of $nudify.finished"
          :key="index"
          :photo="photo" />
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.queue {
  @apply bg-menus relative;
  background-image: url('~@/assets/images/carbon-fibre-v2.png');
}

.queue__section {
  @apply flex flex-col;
  height: calc((100vh - 80px) / 3);

  &.queue__section--running {
  }

  &.queue__section--pending {
  }

  &.queue__section--finished {
  }
}

.queue__header {
  @apply flex items-center p-3;

  .title {
    @apply flex-1 text-sm font-bold;
  }

  .icon {
    @apply mr-2;
  }

  .separator {
    @apply mx-2;
  }
}

.queue__section__actions {
  @apply flex justify-end ml-2 z-10;

  .button {
    @apply ml-2;
  }
}

.queue__content {
  @apply flex-1;
  @apply flex flex-wrap;
  @apply overflow-y-auto whitespace-no-wrap;

  .photo {
    @apply w-1/2;
    height: 200px;
  }
}
</style>
