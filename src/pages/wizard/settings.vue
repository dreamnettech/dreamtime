<template>
  <div class="wizard-user">
    <PageHeader>
      <h2 class="title">
        <span class="icon"><font-awesome-icon icon="magic" /></span>
        <span>Setup Wizard</span>
      </h2>
    </PageHeader>

    <div class="user__content">
      <AppBox title="Basic settings" photo="settings__icon">
        <p>
          Before starting we recommend that you verify that the basic settings below are in order.
        </p>

        <p>
          You can change these (and many more) later in the settings.
        </p>

        <hr>

        <SettingsField field-id="app.trypophobiaMode" />

        <SettingsField field-id="app.showAds" />

        <SettingsField field-id="app.showTips" />
      </AppBox>

      <div class="wizard__footer">
        <button class="button button--xl button--primary" @click="next">
          Start!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { settings } from '~/modules/system'

export default {
  layout: 'wizard',

  middleware({ redirect, route }) {
    if (!route.query.forced) {
      if (settings.wizard.settings) {
        redirect('/')
      }
    }
  },

  methods: {
    next() {
      settings.wizard.settings = true
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.wizard-user {
  &::v-deep {
    .box__photo {
      height: 230px;
    }

    .settings__icon {
      background-image: url('~assets/images/undraw/undraw_personal_settings_kihd.svg')
    }
  }
}
</style>
