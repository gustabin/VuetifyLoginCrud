<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app>
      <v-btn to="/list" text>
        <v-toolbar-title>Home</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/logout" text>
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-btn to="/contact">
        <span>&copy; {{ new Date().getFullYear() }} Powered By Gustavo</span>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    }
  },
}
</script>