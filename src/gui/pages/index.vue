<template>
  <div class="home">
    <app-title>
      <h1 class="title">
        🏠 Welcome to {{ app.name }} <sup>v{{ app.version }}</sup>
      </h1>

      <h3 class="subtitle">
        #freedom #opensource #rule34
      </h3>
    </app-title>

    <div class="content-body">
      <div class="notification is-transparent">
        {{ app.name }} is a free project and we believe that anyone should be free to use it, all we ask is that you do not use {{ app.name }} for malicious purposes, just do not hurt the feelings of other people and everything will be fine. 💁‍♂️
      </div>
    </div>

    <div class="home-wip">
      <!-- Quick Upload -->
      <nudity-upload v-if="validCliDir && validCheckpointsDir" />

      <!-- No deeptools -->
      <div v-if="!deepToolsMissing" class="notification is-danger">
        <strong>❌ Hold on!</strong><br />
        It looks like you are not accessing this application from the electron app in dev mode.<br/>
        You need to make sure you run <code>yarn dev-gui</code> and access the server from the window that opens.<br/><br/>
        Join our Discord for more information.
      </div>
      <!-- CLI Dir -->
      <div v-if="!validCliDir" class="notification is-danger">
        <strong>❌ Hold on!</strong><br />
        We could not find the <strong>CLI</strong> folder!
        This can be caused by a corrupt installation, please make sure that the CLI folder exists in:
        <br><br>{{ cliDirPath }}<br><br>
        Join our Discord for more information.
      </div>

      <!-- Checkpoints CLI Dir -->
      <div v-if="!validCheckpointsDir" class="notification is-danger">
        <strong>❌ Hold on!</strong><br />
        We could not find the <strong>checkpoints</strong> folder!
        This folder is downloaded separately, please make sure that the checkpoints folder exists in:
        <br><br>{{ checkpointsDirPath }}<br><br>
        Join our Discord for more information.
      </div>
    </div>
  </div>
</template>

<script>
import path from 'path'

export default {
  data: () => ({
    cliDirPath: undefined,
    validCliDir: false,

    checkpointsDirPath: undefined,
    validCheckpointsDir: false
  }),

  created() {
    this.deepToolsMissing = false;
    if(!window.deepTools) {
      this.deepToolsMissing = true;
      return;
    }
    this.cliDirPath = window.deepTools.getCliDirPath()
    this.validCliDir = window.deepTools.fs.exists(this.cliDirPath)

    this.checkpointsDirPath = path.join(
      window.deepTools.getCliDirPath(),
      'checkpoints'
    )

    this.validCheckpointsDir = window.deepTools.fs.exists(
      this.checkpointsDirPath
    )
  }
}
</script>

<style lang="scss">
.home {
  .home-wip {
    @apply flex flex-col justify-center items-center;

    a {
      @apply text-primary underline;
    }
  }
}
</style>
