<template>
    <div>
        <div class="sidebar">
            <router-link to="/dashboard" class="btn1">Home</router-link>
            <router-link to="/editlokasi" class="btn1">Edit Lokasi</router-link>
            <router-link to="/manage" class="active">Atur Jarak</router-link>
            <router-link to="/login" class="active1">Log Out</router-link>
        </div>
  
        <div class="content">
            <div>
                <label for="floor-filter">Filter by Floor:</label>
                <select v-model="selectedFloor" @change="filterNodesByFloor">
                    <option value="">All Floors</option>
                    <option v-for="floor in uniqueFloors" :key="floor" :value="floor">Lantai {{ floor }}</option>
                </select>
            </div>
            <div class="manage-nodes">
                <div v-for="node in filteredNodes" :key="node.id" class="node-card">
                    <h3>{{ node.name }} (Lantai {{ node.level }})</h3>
                    <div>
                        <h4>Edges:</h4>
                        <ul>
                            <li v-for="edge in getEdgesForNode(node.id)" :key="edge.relationID">
                                {{ getNodeName(edge.ID2) }}: {{ edge.weight }} meters
                                <button @click="deleteEdge(edge.ID1, edge.ID2)" class="delete-btn">Delete</button>
                            </li>
                        </ul>
                        <form @submit.prevent="addEdge(node.id)">
                            <label for="new-edge-name">New Edge to:</label>
                            <select v-model="newEdgeName" required>
                                <option v-for="n in filteredNodes" :key="n.id" :value="n.id">{{ n.name }}</option>
                            </select>
                            <label for="new-edge-weight">Distance (meters):</label>
                            <input type="number" v-model="newEdgeWeight" required />
                            <button type="submit" class="green-outline-btn">Add Edge</button>
                        </form>
                    </div>
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
            nodes: [],
            edges: [],
            filteredNodes: [],
            newEdgeName: '',
            newEdgeWeight: '',
            selectedFloor: ''
        };
    },
    methods: {
        fetchData() {
            http.get('/node')
                .then(response => {
                    this.nodes = response.data.data;
                    this.filteredNodes = this.nodes; // Initially display all nodes
                    console.log('Nodes:', this.nodes);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('Failed to fetch data. Please try again later.');
                });
  
            http.get('/edge')
                .then(response => {
                    this.edges = response.data.data;
                    console.log('Edges:', this.edges);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('Failed to fetch data. Please try again later.');
                });
        },
        getEdgesForNode(nodeId) {
            return this.edges.filter(edge => edge.ID1 === nodeId).map(edge => {
                return {
                    ID1: edge.ID1, // Assuming each edge has a unique id
                    relationID: this.generateRelationID(edge),
                    ID2: edge.ID1 === nodeId ? edge.ID2 : edge.ID1,
                    weight: edge.weight
                };
            });
        },
        getNodeName(nodeId) {
            const node = this.nodes.find(n => n.id === nodeId);
            return node ? node.name : 'Unknown';
        },
        addEdge(nodeId) {
            const newEdge = {
                ID1: nodeId,
                ID2: parseInt(this.newEdgeName),
                weight: parseInt(this.newEdgeWeight)
            };
            http.post('/edge', newEdge)
                .then(() => {
                    this.fetchData();
                })
                .catch(error => {
                    console.error('Error adding edge:', error);
                    alert('Failed to add edge. Please try again later.');
                });
            this.newEdgeName = '';
            this.newEdgeWeight = '';
        },
        deleteEdge(edgeId1, edgeId2) {
            http.delete(`/edge/${edgeId1}/${edgeId2}`)
                .then(() => {
                    this.fetchData();
                })
                .catch(error => {
                    console.error('Error deleting edge:', error);
                    alert('Failed to delete edge. Please try again later.');
                });
        },
        generateRelationID(edge) {
            return `${edge.ID1}-${edge.ID2}`;
        },
        filterNodesByFloor() {
            if (this.selectedFloor === '') {
                this.filteredNodes = this.nodes;
            } else {
                this.filteredNodes = this.nodes.filter(node => node.level === parseInt(this.selectedFloor));
            }
        }
    },
    computed: {
        uniqueFloors() {
            const floors = this.nodes.map(node => node.level);
            return [...new Set(floors)];
        }
    },
    created() {
        this.fetchData();
    }
  };
  </script>
  
  <style scoped>
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
    background-color: #fafafa;
    color: #333;
  }
  
  .manage-nodes {
    margin-top: 20px;
  }
  
  .node-card {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .green-outline-btn {
    background-color: white;
    color: green;
    border: 2px solid green;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .green-outline-btn:hover {
    background-color: green;
    color: white;
  }
  
  .delete-btn {
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .delete-btn:hover {
    background-color: darkred;
  }
  </style>
  