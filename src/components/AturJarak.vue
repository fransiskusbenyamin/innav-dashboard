<template>
    <div>
      <div class="sidebar">
        <router-link to="/dashboard" class="btn1">Home</router-link>
        <router-link to="/editlokasi" class="btn1">Edit Lokasi</router-link>
        <router-link to="/manage" class="active">Atur Jarak</router-link>
        <router-link to="/login" class="active1">Log Out</router-link>
      </div>
  
      <div class="content">
        <div class="manage-nodes">
          <div v-for="node in nodes" :key="node.id" class="node-card">
            <h3>{{ node.name }} (Lantai {{ node.level }})</h3>
            <div>
              <h4>Edges:</h4>
              <ul>
                <li v-for="edge in getEdgesForNode(node.id)" :key="edge.relationID">
                  {{ getNodeName(edge.ID2) }}: {{ edge.weight }} meters
                </li>
              </ul>
              <form @submit.prevent="addEdge(node.id)">
                <label for="new-edge-name">New Edge to:</label>
                <select v-model="newEdgeName" required>
                  <option v-for="n in nodes" :key="n.id" :value="n.id">{{ n.name }}</option>
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
  export default {
    data() {
      return {
        nodes: [],
        edges: [],
        newEdgeName: '',
        newEdgeWeight: ''
      };
    },
    methods: {
      fetchData() {
        fetch('/dummy-data.json')
          .then(response => response.json())
          .then(data => {
            this.nodes = data.nodes;
          });
  
        fetch('/dummy-edges.json')
          .then(response => response.json())
          .then(data => {
            this.edges = data.edges;
          });
      },
      getEdgesForNode(nodeId) {
        return this.edges.filter(edge => edge.ID1 === nodeId || edge.ID2 === nodeId).map(edge => {
          return {
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
        this.edges.push(newEdge);
        this.newEdgeName = '';
        this.newEdgeWeight = '';
      },
      generateRelationID(edge) {
        return `${edge.ID1}-${edge.ID2}`;
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
  </style>
  