<template>
  <body>
    <div class="container-form loging">
      <div class="information">
        <div class="info-childs">
          <img src="@/assets/images/LOGO.png" alt="Menu" id="sidebarOpen" style="width: 180px; height: 40px;">
          <p>
            Si aún no has creado una cuenta, te invitamos a presionar el botón
            de registro.
          </p>
          <router-link :to="{name: 'formulario_i'}" class="btn-1 login-btn custom-buttom2">Registrarse</router-link>
        </div>
      </div>
      <div class="form-information">
        <div class="form-information-childs">
          <h2>Iniciar Sesión</h2>
          <div class="icons">
            <form class="form" @submit.prevent="handleSubmit">
              <label class="input-label">
                <i class='bx bx-envelope'></i>
                <input
                  type="email"
                  v-model="email"
                  placeholder="Correo Electrónico"
                  class="input-field"
                />
              </label>
              <label class="input-label">
                <i class='bx bx-lock'></i>
                <input
                  type="password"
                  v-model="password"
                  placeholder="Contraseña"
                  class="input-field"
                />
              </label>
              <input
                type="submit"
                value="Iniciar Sesión"
                class="submit-button"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>


import { ref } from 'vue';
import { store } from "@/stores/user-store";
import { useRouter } from "vue-router";
export default {

setup() {
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const userStore = store();


  const handleSubmit = async () => {
  try {
    localStorage.setItem('userEmail', email.value);
     await userStore.access(email.value, password.value);
      email.value = "";
      password.value = "";
      router.push({name:'Viewtasks'});
   
  } catch (error) {
    console.log("desde loginComponents: ", error);
  }
};

  return {
    email,
    password,
    handleSubmit,
  };
},
};
</script>

<style scoped>
  /* Estilos específicos del componente aquí como consumir una api axes en vue */

  /* También puedes importar estilos desde un archivo externo */
  @import url('@/assets/css/login-register.css');
</style>
