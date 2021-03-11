<template>
  <div class="wizard-user">
    <PageHeader>
      <h2 class="title">
        <span class="icon"><font-awesome-icon icon="magic" /></span>
        <span>Setup Wizard</span>
      </h2>

      <h3 class="subtitle">
        Telemetry
      </h3>
    </PageHeader>

    <div class="user__content">
      <div class="notification">
        <span class="icon"><font-awesome-icon icon="info-circle" /></span>
        <span>Changing this options needs a restart to take effect.</span>
      </div>

      <AppBox title="Privacy" class="telemetry__notice" photo="telemetry__privacy">
        <p>
          DreamNet respects your privacy, <strong>the photos you generate with DreamTime will not leave your computer in any way</strong>.
        </p>

        <p>
          Below you can see the information we send to our servers and the option to change this.
        </p>
      </AppBox>

      <div class="telemetry__boxes">
        <AppBox title="Analytics" subtitle="Information to generate anonymous statistics.">
          <ul class="mb-3">
            <li>Operating system.</li>
            <li>CPU, RAM and GPU.</li>
            <li>Country.</li>
            <li>Important events.</li>
          </ul>

          <SettingsField field-id="user" readonly />
        </AppBox>

        <AppBox>
          <SettingsField field-id="telemetry.bugs" />

          <template #footer>
            <div class="box__footer">
              <a href="https://i.gyazo.com/30972dbc8c2396b58928b5100a016e2d.png"
                 target="_blank"
                 class="button button--info">Example</a>
            </div>
          </template>
        </AppBox>

        <AppBox>
          <SettingsField field-id="telemetry.dom" />

          <p>
            This information helps us make the application more accessible, easy to use and provides additional data to fix errors.
          </p>

          <template #footer>
            <div class="box__footer">
              <a href="https://link.dreamnet.tech/ipfs/QmaUaQafgSGVZzEncJnuQRhN6iugbbrVhnpSfSW4CqWL5q"
                 target="_blank"
                 class="button button--info">Example</a>
            </div>
          </template>
        </AppBox>
      </div>

      <div class="wizard__footer">
        <button class="button button--xl button--primary" @click="next">
          Continue
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
      if (settings.wizard.telemetry) {
        redirect('/wizard/settings')
      }
    }
  },

  methods: {
    next() {
      settings.wizard.telemetry = true
      this.$router.push('/wizard/settings')
    },
  },
}
</script>

<style lang="scss" scoped>
.wizard-user {
  @apply pb-6;

  &::v-deep {
    .box__photo {
      height: 230px;
    }

    .telemetry__privacy {
      background-image: url('~assets/images/undraw/undraw_privacy_protection_nlwy.svg')
    }
  }
}

.telemetry__notice {
  p {
    @apply text-lg;

    &:not(:last-child) {
      @apply mb-4;
    }
  }
}

.telemetry__boxes {
  ul {
    @apply list-disc ml-6;
  }
}
</style>
