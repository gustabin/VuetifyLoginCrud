<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Edit Form</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="saveTodo()" class="form-container">
                    <v-text-field v-model="todo.title" label="Title" outlined required></v-text-field>
                    <v-text-field v-model="todo.description" label="Description" outlined required></v-text-field>
                    <v-text-field v-model="todo.due_date" label="Due_date" type="date" outlined required></v-text-field>
                    <v-checkbox v-model="computedCompleted" label="Completed" outlined></v-checkbox>
                    <v-card-actions>
                        <v-btn color="warning" class="mr-4" type="submit">Save</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'editTodo',
    mounted() {
        this.id = this.$route.params.id;
        axios.get('http://localhost:8000/api/todo/' + this.id)
            .then(r => {
                this.todo = r.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    data() {
        return {
            id: null,
            todo: {
                title: '',
                description: '',
                due_date: '',
                completed: ''
            }
        }
    },
    computed: {
        computedCompleted: {
            get() {
                return this.todo.completed === 1;
            },
            set(value) {
                this.todo.completed = value ? 1 : 0;
            }
        }
    },
    methods: {
        saveTodo() {
            var router = this.$router;
            axios.put('http://localhost:8000/api/todo/' + this.id, this.todo)
                .then(function () {
                    router.push('/list');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>
  