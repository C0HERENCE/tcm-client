<template>
  <a-row>
    <a-col>
      <network ref="network" @click="clickNode" :nodes="nodes" :edges="edges" :options="options" style="height: 250px">
      </network>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Visualization',
  props: {
    related: {
      default: []
    },
    center: {
      default: ""
    },
    selectedItem: null
  },
  watch: {
    default() {
      this.update()
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    clickNode(e) {
      if (e.nodes.length > 0) {
        this.selectedNode = this.nodes.find(x => x.id === e.nodes[0]).item
        if (this.selectedNode.id !== this.center.id)
          window.open(this.selectedNode.url, "_blank", "")
      }
    },
    update() {
      this.nodes = [{id: 0, label: this.center.name, item: this.center}]
      this.edges = []
      for (let i = 0; i < this.related.length; i++) {
        let item = this.related[i]
        this.nodes.push({id: item.id, label: item.name, item: this.related[i]})
        console.log(this.nodes)
        this.edges.push({from: 0, to: item.id})
      }
    }
  },
  data() {
    return {
      nodes: [],
      edges: [],
      options: {
        nodes: {
          borderWidth: 4
        },
        edges: {
          color: 'lightgray'
        }
      }
    }
  },
}
</script>