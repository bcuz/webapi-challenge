let app = new Vue({
  el: '#app',
  data: {
    title: 'Vue!',
    project: {
      name: '',
      description: ''
    },
    projects: [],
  },
  methods: {
    createProject() {      
    
      axios.post("http://localhost:5001/projects", this.project)
      .then(response => {
        
        this.fetchProjects()
        this.project.name = ''
        this.project.description = ''        
      })
    },
    fetchProjects() {
      axios.get("http://localhost:5001/projects")
      .then(response => {this.projects = response.data})
      // .then(response => {console.log(response) })

    }
  },
  mounted() {
    this.fetchProjects()
  }
})