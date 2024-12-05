import { defineStore } from "pinia";
import {api} from '@/GlobalURL'
import { ref } from "vue";
import {store} from '@/stores/user-store';


export const taskStore = defineStore("task", () => {
  const task = ref(null);
  const token = store();
  const expiresIn = ref(null);

const createNewTask= async (title)=>{
    try {
        const res=await api({
        url:"/auth/register-task",
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
        data:{
          title
        }
      });
      return res
      
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask= async (userId, title, completed)=>{
    try {
        const res=await api({
          url:"/auth/update-task",
        method:"PUT",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
        data:{
            userId,
            title,
            completed
        }
      });
      return res
    } catch (error) {
      console.log(error)
    }
  }
  

  const getTasks= async ()=>{
    try {
        const res=await api({
        url:"/auth/get-tasks",
        method:"GET",
        headers:{
          Authorization: "Bearer " + token.token,
        }
      });
     
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask= async (userId)=>{
    try {
        const res=await api({
        url:"/auth/delete-task",
        method:"DELETE",
        headers:{
          Authorization: "Bearer " + token.token,
        },
        data:{
          userId,
        }
      });
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  }

  const getTask= async (userId)=>{
    try {
        const res=await api({
          url: `/auth/get-task/${userId}`,
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
      });
     
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  }
return {
    task,
    expiresIn,
    createNewTask,
    getTasks,
    updateTask,
    getTask,
    deleteTask,
  };
});