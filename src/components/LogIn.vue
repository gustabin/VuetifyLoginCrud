<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Login</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="login()" class="form-container">
                    <v-text-field v-model="user.email" type="email" name="email" id="email" label="Email" outlined required>
                    </v-text-field>
                    <v-text-field v-model="user.password" type="password" name="password" id="password" label="Password"
                        outlined required>
                    </v-text-field>
                    <v-card-actions>
                        <v-btn color="warning" class="mr-4" type="submit" dark>Login</v-btn>
                    </v-card-actions>
                </form>

                <v-alert v-if="errorMessageVisible" type="error" dismissible @click:close="resetError">
                    {{ errorMessage }}
                </v-alert>
                <router-link to="/signin">
                    <v-btn color="primary" dark>Sign In</v-btn>
                </router-link>
            </v-col>

        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'logIn',
    data() {
        return {
            user: {
                email: '',
                password: '',
                password_confirmation: '',
            },
            errorMessage: '',
            errorMessageVisible: false,
        };
    },
    methods: {
        login() {
            var router = this.$router;
            const formData = new FormData();
            formData.append('email', this.user.email);
            formData.append('password', this.user.password);
            formData.append('password_confirmation', this.user.password_confirmation);

            axios.post('http://localhost:8000/api/login', formData)
                .then((response) => {
                    if (response.data.status === 1) {
                        localStorage.setItem('authToken', response.data.access_token);
                        localStorage.setItem('user_id', response.data.user_id);
                        router.push('/list/' + response.data.user_id);
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
  