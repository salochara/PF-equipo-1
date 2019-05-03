<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/chas.png" class="center-block login logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1 style="color: grey;">404</h1>
            <h4 style="color: grey;">This page doesn't exist.</h4>
            <router-link to="/">Go Back.</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>

<style>

</style>