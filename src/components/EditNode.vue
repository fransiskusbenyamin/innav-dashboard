<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Edit Node</h2>

    <!-- Form untuk mengedit node -->
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="nodeName" class="block text-gray-700 text-sm font-bold mb-2">Nama Node:</label>
        <input type="text" v-model="nodeName" id="nodeName" required 
               class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div class="mb-4">
        <label for="nodeImage" class="block text-gray-700 text-sm font-bold mb-2">Gambar Node:</label>
        <input type="file" v-on="nodeImage" id="nodeImage" accept="image/*"
               class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div class="mb-4">
        <label for="nodeDescription" class="block text-gray-700 text-sm font-bold mb-2">Deskripsi Node:</label>
        <textarea v-model="nodeDescription" id="nodeDescription" rows="4"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodeName: '',
      nodeImage: null,
      nodeDescription: ''
    };
  },
  methods: {
    handleSubmit() {
      // Lakukan penyimpanan atau pengiriman data ke backend
      console.log('Data yang akan disimpan:', {
        name: this.nodeName,
        image: this.nodeImage,
        description: this.nodeDescription
      });

      // Redirect atau lakukan operasi sesuai kebutuhan
      // Misalnya menggunakan router untuk navigasi ke halaman lain
      // this.$router.push('/some-path'); // Sesuaikan dengan path yang sesuai
    }
  }
};
</script>

<style scoped>
/* Styling untuk komponen EditNode.vue */
</style>
