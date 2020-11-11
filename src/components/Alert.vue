<template>
  <div class="alert" v-if="active">
    <div class="close-btn" @click="closeAlert">&times;</div>
    <div class="alert-message">
      <div class="message-title">
        {{alertMessage.title}}
      </div>
      <div class="message-context">
        {{alertMessage.context}}
      </div>
    </div>
    <div class="alert-icon">
      <img src="@/assets/icon_check-outline.svg" v-if="resData.status === 200">
      <img src="@/assets/icon_error-outline.svg" v-if="resData.status === 400">
    </div>
    <div class="alert-btn">
      <button class="btn" @click="closeAlert">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    resData: {
      default: {
        status: 400,
      },
    },
  },
  computed: {
    alertMessage() {
      const title = this.resData.status === 200 ? 'Success!' : 'Oops!';
      const successMsg = 'Have a nice trip :)';
      const errorMsg = this.resData.resMsg || 'Someing Error!';
      const context = this.resData.status === 200 ? successMsg : errorMsg;
      return { title, context };
    },
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('alert', false);
    },
  },
};
</script>

<style lang="scss">
  .alert {
    position: absolute;
    background-color: #F6F6F6;
    width: 628px;
    height: 395px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: #464646d0 0 0 16px;
    .close-btn {
      position: absolute;
      top: .5rem;
      right: .5rem;
      width: 2rem;
      height: 2rem;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .alert-message {
      padding: 1.875rem;
      .message-title {
        font-size: 1.875rem;
        margin-bottom: 0.9375rem;
      }
      .message-context {
        font-size: 1.25rem;
      }
    }
    .alert-icon {
      padding: 6px;
    }
    .alert-btn {
      margin-top: 1.5rem;
    }
  }
</style>
