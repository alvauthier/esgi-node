<script setup>
const { onSubmit, initialValues } = defineProps({
  onSubmit: {
    type: Function,
    required: true
  },
  initialValues: {
    type: Object
  }
});
import { reactive, ref, watch } from 'vue';

const formData = reactive(
  initialValues || {
    lastname: '',
    firstname: '',
    email: '',
    password: ''
  }
);

watch(initialValues, (newInitialValues) => {
  Object.assign(formData, newInitialValues);
});

const errors = ref(null);

function handleSubmit(event) {
  onSubmit(formData)
    .then(() => {
      event.target.reset();
    })
    .catch((_errors) => {
      errors.value = _errors;
    });
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <label for="lastname">Lastname</label>
    <input
      :value="formData.lastname"
      @input="formData.lastname = $event.target.value"
      type="text"
      id="lastname"
      name="lastname"
    />
    <p v-if="errors?.lastname">{{ errors.lastname.join('\n') }}</p>
    <label for="firstname">Firstname</label>
    <input
      :value="formData.firstname"
      @input="formData.firstname = $event.target.value"
      type="text"
      id="firstname"
      name="firstname"
    />
    <p v-if="errors?.firstname">{{ errors.firstname.join('\n') }}</p>

    <label for="email">Email</label>
    <input
      :value="formData.email"
      @input="formData.email = $event.target.value"
      type="email"
      id="email"
      name="email"
    />
    <p v-if="errors?.email">{{ errors.email.join('\n') }}</p>

    <label for="password">Password</label>
    <input v-model="formData.password" type="password" id="password" name="password" />
    <p v-if="errors?.password">{{ errors.password.join('\n') }}</p>
    <input type="submit" value="Submit" />
  </form>
</template>

<style scoped>
label {
  color: green;
}
p {
  color: red;
}
</style>
