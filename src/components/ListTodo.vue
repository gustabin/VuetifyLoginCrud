<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                    List of tasks
                </h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mb-1">
                <v-btn :to="{ name: 'createTodo' }" class="mx-2" fab dark color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col cols="12">
                <v-table fixed-header class="elevation-3">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center" style="background-color: blueviolet; color: aliceblue;">ID</th>
                                <th class="text-center" style="background-color: blueviolet; color: aliceblue;">Title</th>
                                <th class="text-center" style="background-color: blueviolet; color: aliceblue;">Description
                                </th>
                                <th class="text-center" style="background-color: blueviolet; color: aliceblue;">Due date
                                </th>
                                <th class="text-center" style="background-color: blueviolet; color: aliceblue;">Completed
                                </th>
                                <th class="text-center" style="background-color: blueviolet; color: aliceblue;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="todo in todos" :key="todo.id">
                                <td>{{ todo.id }}</td>
                                <td>{{ todo.title }}</td>
                                <td>{{ todo.description }}</td>
                                <td>{{ todo.due_date }}</td>
                                <td>{{ todo.completed }}</td>
                                <td>
                                    <v-btn :to="{ name: 'editTodo', params: { id: todo.id } }" fab small color="primary"
                                        style="margin-right: 10px;"><v-icon>mdi-pencil</v-icon></v-btn>
                                    <v-btn @click.stop="dialog = true" @click="id = todo.id" fab small
                                        color="error"><v-icon>mdi-delete</v-icon></v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-table>
            </v-col>
        </v-row>
        <!-- Confirmation windows for delete record -->
        <v-dialog v-model="dialog" max-width="350">
            <v-card>
                <v-card-title class="headline">Delete this record?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">Cancel</v-btn>
                    <v-btn @click="confirmDelete(id)" color="error">Accept</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- component snackbar for show delete message -->
        <v-snackbar v-model="snackbar" color="success"> {{ textsnack }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    name: 'listTodos',
    mounted() {
        this.getTodos();
    },
    data() {
        return {
            dialog: false,
            todos: null,
            id: null,
            snackbar: false,
            textsnack: '¡Register Deleted!'
        }
    },
    methods: {
        getTodos() {
            const user_id = localStorage.getItem('user_id');
            axios.get('http://localhost:8000/api/todos/' + user_id)
                .then(r => {
                    this.todos = r.data;
                })
                .catch(function (error) {
                    console.log(error);
                })

        },
        confirmDelete(id) {
            axios.delete('http://localhost:8000/api/todo/' + id)
                .then(() => {
                    this.getTodos();
                    this.dialog = false;
                    this.snackbar = true
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>