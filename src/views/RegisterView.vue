<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="registerUser">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <br>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SHA256 } from 'crypto-js';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        registerUser() {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('user', this.encodeEmailToUUID(user.email));
                console.log(user);
                window.location.href = '/';
            })
            .catch((error) => {
                console.error(error);
            });
        },
        encodeEmailToUUID(email) {
            const hashedEmail = SHA256(email).toString();
            const uuid = hashedEmail.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
            return uuid;
        }
    }
};
</script>

<style scoped>
</style>