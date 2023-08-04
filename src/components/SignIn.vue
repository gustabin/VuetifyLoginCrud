<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Sign In</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="signin()" class="form-container">
                    <v-text-field v-model="user.name" type="text" name="name" id="name" label="Name" outlined required>
                    </v-text-field>
                    <v-text-field v-model="user.email" type="email" name="email" id="email" label="Email" outlined required>
                    </v-text-field>
                    <v-text-field v-model="user.password" type="password" name="password" id="password" label="Password"
                        outlined required>
                    </v-text-field>
                    <v-text-field v-model="user.password_confirmation" type="password" name="password_confirmation"
                        id="password_confirmation" label="Password confirmation" outlined required>
                    </v-text-field>
                    <v-card-actions>
                        <v-btn color="warning" class="mr-4" type="submit" dark>Sign In</v-btn>
                    </v-card-actions>
                </form>

                <v-alert v-if="errorMessageVisible" type="error" dismissible @click:close="resetError">
                    {{ errorMessage }}
                </v-alert>
                <router-link to="/login">
                    <v-btn color="primary" dark>Login</v-btn>
                </router-link>
            </v-col>

        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'signIn',
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            errorMessage: '',
            errorMessageVisible: false,
        };
    },
    methods: {
        signin() {
            var router = this.$router;
            const formData = new FormData();
            formData.append('name', this.user.name);
            formData.append('email', this.user.email);
            formData.append('password', this.user.password);
            formData.append('password_confirmation', this.user.password_confirmation);

            axios.post('http://localhost:8000/api/signin', formData)
                .then((response) => {
                    if (response.data.status === 1) {
                        router.push('/login');
                    } else {
                        console.log(response.data.msg);
                        this.errorMessage = response.data.msg;
                        this.errorMessageVisible = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.errorMessage = 'Request failed. Try again later.';
                    this.errorMessageVisible = true;
                });
        },
        resetError() {
            this.errorMessage = '';
            this.errorMessageVisible = false;
        },
    },
};
</script>
  