<template>
  <div>
    <div class="sidebar">
      <router-link to="/dashboard" class="btn1">Home</router-link>
      <router-link to="/editlokasi" class="active">Edit Lokasi</router-link>
      <router-link to="/manage" class="btn3">Atur Jarak</router-link>
      <router-link to="/login" class="active1">Log Out</router-link>
    </div>

    <div class="content">
      <button @click="showAddForm = true" class="add-btn">Add Location</button>

      <div v-if="showAddForm || showEditForm" class="form-container">
        <h2>{{ showEditForm ? 'Edit Location' : 'Add Location' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="form.name" required />
          </div>
          <div>
            <label for="type">Type:</label>
            <select v-model="form.type" required>
              <option value="" disabled>Select type...</option>
              <option v-for="type in locationTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div>
            <label for="level">Level:</label>
            <input type="number" v-model="form.level" required />
          </div>
          <div>
            <label for="address">Address:</label>
            <input type="text" v-model="form.address" required />
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea v-model="form.description" required></textarea>
          </div>
          <div>
            <label for="photo">Photo URL:</label>
            <input type="text" v-model="form.photo" />
          </div>
          <div class="form-buttons">
            <button type="submit" class="update-btn">{{ showEditForm ? 'Update' : 'Add' }}</button>
            <button type="button" @click="cancelForm" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>

      <div class="filters">
        <label>Filter by Floor:</label>
        <select v-model="selectedFloor">
          <option value="">All Floors</option>
          <option v-for="floor in uniqueFloors" :key="floor" :value="floor">{{ floor }}</option>
        </select>

        <label>Filter by Type:</label>
        <select v-model="selectedType">
          <option value="">All Types</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
        </select>

        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Search locations..." />
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Level</th>
              <th>Address</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(location, index) in paginatedLocations" :key="location.id">
              <td>{{ location.name }}</td>
              <td>{{ location.type }}</td>
              <td>{{ location.level }}</td>
              <td>{{ location.address }}</td>
              <td>{{ location.description }}</td>
              <td>
                <button @click="editLocation(location)" class="edit-btn">Edit</button>
                <button @click="deleteLocation(location.id)" class="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
          <span>{{ currentPage }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/http';
export default {
  data() {
    return {
      locations: [],
      filteredLocations: [],
      searchQuery: '',
      selectedFloor: '',
      selectedType: '',
      showAddForm: false,
      showEditForm: false,
      form: {
        id: null,
        name: '',
        type: '',
        level: '',
        address: '',
        description: '',
        photo: ''
      },
      currentPage: 1,
      itemsPerPage: 10,
      locationTypes: [
        'Electronics',
        'Food & Beverage',
        'Coffee Shop',
        'Entertainment',
        'Sporting Goods',
        'Retail',
        'Facility',
        'Service'
      ]
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredLocations.length / this.itemsPerPage);
    },
    paginatedLocations() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      let filtered = this.filteredLocations;

      // Apply filters based on selected options
      if (this.selectedFloor) {
        filtered = filtered.filter(location => location.level === parseInt(this.selectedFloor));
      }
      if (this.selectedType) {
        filtered = filtered.filter(location => location.type === this.selectedType);
      }

      return filtered.slice(startIndex, startIndex + this.itemsPerPage);
    },
    uniqueFloors() {
      // Collect unique floor levels from locations
      return [...new Set(this.locations.map(location => location.level))];
    },
    uniqueTypes() {
      // Collect unique types from locations
      return [...new Set(this.locations.map(location => location.type))];
    }
  },
  methods: {
    fetchData() {
      http.get('/node')
        .then(response => {
          // Menggunakan .data untuk mengakses data dari respons Axios
          this.locations = response.data.data;
          this.filteredLocations = response.data.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('Failed to fetch data. Please try again later.');
        });
    },
    handleSubmit() {
      if (this.showEditForm) {
        // Update location
        const updatedLocation = { ...this.form };
        console.log('Updating location:', updatedLocation);

        // Kirim permintaan PUT ke backend menggunakan Axios
        http.put(`/node/${updatedLocation.id}`, updatedLocation)
          .then(() => {
            // Setelah berhasil mengupdate, panggil ulang fetchData() untuk memperbarui data
            console.log('Updating location:', updatedLocation);
            this.fetchData();
          })
          .catch(error => {
            console.error('Error updating location:', error);
            console.log('Updating location:', updatedLocation);
            alert('Failed to update location. Please try again later.');
          });
      } else {
        // Add new location
        const newLocation = { ...this.form};
        http.post('/node', newLocation)
          .then(() => {
            // Tambahkan newLocation ke array locations dan filteredLocations
            this.fetchData();
          })
          .catch(error => {
            console.error('Error adding location:', error);
            alert('Failed to add location. Please try again later.');
          });
      }
      this.resetForm();
    },
    editLocation(location) {
      this.form = { ...location };
      this.showEditForm = true;
      this.showAddForm = false;
    },
    deleteLocation(id) {
      // Kirim permintaan DELETE ke backend menggunakan Axios
      http.delete(`/node/${id}`)
        .then(() => {
          // Setelah berhasil menghapus, panggil ulang fetchData() untuk memperbarui data
          this.fetchData();
        })
        .catch(error => {
          console.error('Error deleting location:', error);
          alert('Failed to delete location. Please try again later.');
        });
    },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        type: '',
        level: '',
        address: '',
        description: '',
        photo: ''
      };
      this.showAddForm = false;
      this.showEditForm = false;
    },
    cancelForm() {
      this.resetForm();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    filterLocations() {
      let filtered = this.locations;

      // Apply search query filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(location =>
          location.name.toLowerCase().includes(query) ||
          location.type.toLowerCase().includes(query) ||
          location.address.toLowerCase().includes(query) ||
          location.description.toLowerCase().includes(query)
        );
      }

      // Store filtered data into filteredLocations
      this.filteredLocations = filtered;

      // Reset pagination to first page
      this.currentPage = 1;
    }
  },
  watch: {
    searchQuery(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterLocations();
      }
    },
    selectedFloor(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterLocations();
      }
    },
    selectedType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterLocations();
      }
    }
  },
  created() {
    this.fetchData(); // Call fetchData method when component is created
  }
};
</script>

<style scoped>
/* Styles for the main content and sidebar */
body {
  margin: 0;
  padding: 0;
  background: #fafafa;
  color: #fff;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #04aa6d;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

.sidebar a.active1 {
  background-color: #e04848;
  color: white;
}

.sidebar a:hover:not(.active1) {
  background-color: #555;
  color: white;
}

.content {
  margin-left: 200px;
  padding: 1px 16px;
  background-color: #4caf50; /* Green background color */
  position: relative;
}

.filters {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.filters label {
  margin-right: 10px;
}

.filters select,
.search-bar input {
  margin-left: 10px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 200px; /* Adjust as needed */
}

.search-bar {
  margin-left: auto; /* Push search bar to the right */
}

.table-container {
  padding: 16px;
  background-color: white;
  color: black;
  border-radius: 8px;
  margin: 16px;
}

.add-btn {
  background-color: #408543;
  color: white;
  padding: 10px;
  border: 1px solid #45a049; /* Green border */
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 16px;
}

.add-btn:hover {
  background-color: #3c723f;
}

.edit-btn {
  background-color: rgb(245, 245, 89);
  color: black;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #e6e600; /* Darker yellow */
}

.delete-btn {
  background-color: #f76a6a;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d33f3f; /* Darker red */
}

.cancel-btn {
  background-color: #e04848;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; /* Add margin for spacing */
}

.cancel-btn:hover {
  background-color: #d33f3f; /* Darker red */
}

.update-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-btn:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
}

th,
td {
  padding: 15px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.form-container {
  background-color: white;
  color: black;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 80%;
  max-width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 16px;
}

form label {
  display: block;
  margin-bottom: 8px;
}

form input,
form textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

form textarea {
  height: 100px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.pagination {
  margin-top: 16px;
  text-align: center;
}

.pagination button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
}

.pagination button:hover {
  background-color: #45a049;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>

