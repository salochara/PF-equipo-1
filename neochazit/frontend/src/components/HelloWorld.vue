<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>API message: {{ apiMessage }} </h2>
  </div>
</template>

<script>
const config = require('../config');

export default {
  name: 'HelloWorld',
  data: function () {
    return {
      apiMessage: 'Unable to connect to backend...',
    }
  },
  props: {
    msg: String
  },
  created: async function () {
    try {
      const res = await fetch(`${config.apiUrl}/api/`);
      const data = await res.json();
      this.apiMessage = data.message;
    } catch (error) {
      throw error;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
