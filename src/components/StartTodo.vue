<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"/>
            </v-col>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">TO-DO App</h1>
            </v-col>
        </v-row>
        <v-row class="text-center">           
            <v-col  class="mb-4">
                <h2 class="display-5 font-weight-bold mb-3">TO-DO</h2>
                <h2 class="display-5 font-weight-bold mb-3">Task</h2>
                <h2 class="display-5 font-weight-bold mb-3">Activities</h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'startTodo'
}
</script>