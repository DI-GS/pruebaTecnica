<template>
  <body>

    <!-- navbar -->
    <nav class="navbar">
      <div class="logo_item">
        <img src="@/assets/images/LOGO.png" alt="Menu" id="sidebarOpen" style="width: 180px; height: 40px;">
      </div>
      <div class="logout_item">
        <img  src="@/assets/images/cerrar-sesion.png" @click="salir" class="logout-icon"/>
      </div>
    </nav>

  </body>
</template>

<script>
import { store } from "@/stores/user-store";
import { useRouter } from "vue-router";
export default {
  name: "headerComponent",


  setup() {
    const userStore = store();
    const router = useRouter();

   const salir=()=>{
      userStore.logout()
      router.push("/");
    }

    return{
      salir,
    }
    
  },


};
</script>

<style src="@/assets/css/style.css"></style>
