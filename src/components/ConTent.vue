<template>
    <div class="home">
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <slot>hello world</slot>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    export default {
        name: 'ConTent',
    }
</script>

<style scoped>
    .container {
    margin-top: 20px;
  }
</style>