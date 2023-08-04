<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Create Form</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="saveTodo()" class="form-container">
                    <v-text-field v-model="todo.title" label="Title" outlined required>
                    </v-text-field>
                    <v-text-field v-model="todo.description" label="Description" outlined required>
                    </v-text-field>
                    <v-text-field v-model="todo.due_date" label="Due date" type="date" outlined required></v-text-field>
                    <v-checkbox v-model="todo.completed" label="Completed" outlined></v-checkbox>
                    <v-card-actions>
                        <v-btn color="warning" class="mr-4" type="submit" dark>Save</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    name: 'saveTodo',
    data() {
        return {
            todo: {
                title: '',
                description: '',
                due_date: '',
                completed: false
            }
        };
    },
    methods: {
        saveTodo() {
            this.todo.completed = this.todo.completed ? 1 : 0;
            var router = this.$router;
            const formData = new FormData();
            formData.append('title', this.todo.title);
            formData.append('description', this.todo.description);
            formData.append('due_date', this.todo.due_date);
            formData.append('completed', this.todo.completed);

            const user_id = localStorage.getItem('user_id');

            axios.post('http://localhost:8000/api/todo/' + user_id, formData)
                .then(() => {
                    router.push('/list');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>