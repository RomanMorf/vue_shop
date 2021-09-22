<template>
  <div>
    <h1 class="center">This is an about page</h1>

    <Modal>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/modal/Modal'


export default {
  data() {
    return {
      showModal: true,
    }
  },
  components: {
    Modal,
  }
}
</script>
