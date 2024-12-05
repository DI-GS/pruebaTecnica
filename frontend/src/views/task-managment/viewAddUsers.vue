<template>
    <headerComponent></headerComponent>
    <title>Tareas</title>
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- DataTable -->
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css"
    />
    <!-- Bootstrap-->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    />
    <!-- Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <body>
    <div class="main-container content padding">
    <div><h1>Lista de tareas</h1></div>
    <div class="container my-5">
      <button class="btn btn-sm btn-success" @click="openModalRegisterTask()">Nueva tarea</button>
      <div class="row">
        <table id="example" class="table" style="width: 100%">
          <thead>
            <tr>
              <th>#</th>
              <th>Tarea</th>
              <th>Completada</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in data" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ task.title }}</td>
              <td>{{ task.completed ? "Tarea completada" : "Tarea pendiente" }}</td>
              <td>
                <button class="btn btn-sm btn-secondary" @click="openModal(task)">
                  <i class="fa-solid fa-pencil" ></i>
                </button>
                <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can" @click="deleteTask(task)"></i></button>
                <button
                class="btn btn-sm btn-info"
                @click="toggleTaskCompletion(task)">{{ task.completed ? "Marcar como pendiente" : "Marcar como completada" }}
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="modal_actualizar_tarea" class="modal">
    <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Actualizar tarea</h2>
        <div class="input-group">
            <label for="subject">Tarea:</label>
            <input type="text"  v-model="dataTask.title" required>
        </div>
        <button class="btn btn-sm btn-success" id="save-changes" @click="saveChanges">Guardar Cambios</button>
    </div>
</div>

<div id="modal_registrar_tarea" class="modal">
    <div class="modal-content">
        <span class="close" @click="closeModalRegisterTask">&times;</span>
        <h2>Registrar Tarea</h2>
        <div class="input-group">
            <label for="subject">Tarea:</label>
            <input type="text" v-model="title" required>
        </div>
        <button class="btn btn-sm btn-success" id="save-changes" @click="registerNewTask()">Registrar</button>
    </div>
</div>


  </div>
  </body>
  </template>


<script>
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import headerComponent from "@/components/header-component.vue";
import { ref, onMounted } from "vue";
import { taskStore } from "@/stores/task-store";
import Swal from 'sweetalert2';

export default {
  name: "viewSchedules",
  components: { headerComponent },
  setup() {
    const data = ref([]);
    const title = ref("");

    const dataTask = ref({
      title: "",
      completed: "",
    });
    const task_store = taskStore();
    const type = ref(null); 
    var taskId = ref("");

    const openModal = (task) => {
      getTask(task._id)
      const modal = document.getElementById('modal_actualizar_tarea');
      modal.style.display = 'block';
  };
   
    const closeModal = () => {
      const modal = document.getElementById('modal_actualizar_tarea');
      modal.style.display = "none";
    };

    const openModalRegisterTask = () => {
      const modal = document.getElementById('modal_registrar_tarea');
      modal.style.display = 'block';
  };

    const closeModalRegisterTask = () => {
      const modal = document.getElementById('modal_registrar_tarea');
      modal.style.display = "none";
    };

    // Evento clic para guardar los cambios y actualizar las celdas
    const saveChanges = async () => {
      updateTask();
      closeModal();
};
    
      const getTask = async (userId) => {
      try {
        taskId.value = userId
        dataTask.value = await task_store.getTask(userId);
      } catch (error) {
        console.error(error);
      }
    };

     const registerNewTask = async () => {
             // Validar que el campo 'title' no esté vacío
      if (!title.value || title.value.trim() === "") {
          return Swal.fire({
          icon: 'error',
          title: 'Campo vacío',
          text: 'El título de la tarea no puede estar vacío.',
            });
      }
      try {
          await task_store.createNewTask(title.value);
          title.value = "";

          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Tarea creada con éxito!',
          }).then(() => {
            closeModalRegisterTask();
            window.location.reload();
          });
      } catch (error) {
        console.log(error);
      }
}

    const getTasks = async () => {
      try {
        data.value = await task_store.getTasks();
      } catch (error) {
        console.error(error);
      }
    };

    const deleteTask = async (userId) => {
      try {
        await task_store.deleteTask(userId._id);
        data.value = data.value.filter(item => item._id !== userId._id);
      } catch (error) {
        console.error(error);
      }
    };


    const updateTask = async () => {
      const userId = taskId.value;
      if (!dataTask.value.title || dataTask.value.title.trim() === "") {
          return Swal.fire({
          icon: 'error',
          title: 'Campo vacío',
          text: 'El título de la tarea no puede estar vacío.',
            });
      }
      try {
        await task_store.updateTask(userId, dataTask.value.title, dataTask.value.completed );
        // actualizar la tabla de forma reactiva
        const taskIndex = data.value.findIndex(task => task._id === userId);
        if (taskIndex !== -1) {
          data.value[taskIndex] = { ...data.value[taskIndex], ...dataTask.value };
        }
      } catch (error) {
        console.log(error);
      }
  }

  const toggleTaskCompletion = async (userId) => {
  try {
    // Traer la información de title para evitar errores en la actualización de completed
    await getTask(userId._id);

    // Alternar el estado de completado de la tarea
    dataTask.value.completed = !dataTask.value.completed;

    // Llamar al método de la store para actualizar la tarea
    await task_store.updateTask(userId._id, dataTask.value.title, dataTask.value.completed);

    // Actualizar la tabla de forma reactiva
    const taskIndex = data.value.findIndex(t => t._id === userId._id);
    if (taskIndex !== -1) {
      data.value[taskIndex] = { ...data.value[taskIndex], ...dataTask.value };
    }

    Swal.fire({
      icon: 'success',
      title: 'Estado actualizado',
      text: `La tarea ahora está como "${dataTask.value.completed ? "Tarea completada" : "Tarea pendiente"}".`,
    });

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar el estado de la tarea.',
    });
  }
};

    const initDataTable = () => {
      let dataTableOptions = {
  dom: 'Bfrtilp',
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { searchable: false, targets:[0,2]},
  ],
  pageLength: 3,
  destroy: true,
  language: {
    processing: 'Procesando...',
    lengthMenu: 'Mostrar _MENU_ registros',
    zeroRecords: 'No se encontraron resultados',
    emptyTable: 'Ningún dato disponible en esta tabla',
    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
    infoFiltered: '(filtrado de un total de _MAX_ registros)',
    search: 'Buscar:',
    infoThousands: ',',
    loadingRecords: 'Cargando...',
    paginate: {
      first: 'Primero',
      last: 'Último',
      next: 'Siguiente',
      previous: 'Anterior',
    },
    aria: {
      sortAscending: ': Activar para ordenar la columna de manera ascendente',
      sortDescending: ': Activar para ordenar la columna de manera descendente',
    },

    autoFill: {
      cancel: 'Cancelar',
      fill: 'Rellene todas las celdas con <i>%d</i>',
      fillHorizontal: 'Rellenar celdas horizontalmente',
      fillVertical: 'Rellenar celdas verticalmentemente',
    },
    decimal: ',',
    searchBuilder: {
      add: 'Añadir condición',
      button: {
        0: 'Constructor de búsqueda',
        _: 'Constructor de búsqueda (%d)',
      },
      clearAll: 'Borrar todo',
      condition: 'Condición',
      conditions: {
        date: {
          after: 'Despues',
          before: 'Antes',
          between: 'Entre',
          empty: 'Vacío',
          equals: 'Igual a',
          notBetween: 'No entre',
          notEmpty: 'No Vacio',
          not: 'Diferente de',
        },
        number: {
          between: 'Entre',
          empty: 'Vacio',
          equals: 'Igual a',
          gt: 'Mayor a',
          gte: 'Mayor o igual a',
          lt: 'Menor que',
          lte: 'Menor o igual que',
          notBetween: 'No entre',
          notEmpty: 'No vacío',
          not: 'Diferente de',
        },
        string: {
          contains: 'Contiene',
          empty: 'Vacío',
          endsWith: 'Termina en',
          equals: 'Igual a',
          notEmpty: 'No Vacio',
          startsWith: 'Empieza con',
          not: 'Diferente de',
          notContains: 'No Contiene',
          notStartsWith: 'No empieza con',
          notEndsWith: 'No termina con',
        },
        array: {
          not: 'Diferente de',
          equals: 'Igual',
          empty: 'Vacío',
          contains: 'Contiene',
          notEmpty: 'No Vacío',
          without: 'Sin',
        },
      },
      data: 'Data',
      deleteTitle: 'Eliminar regla de filtrado',
      leftTitle: 'Criterios anulados',
      logicAnd: 'Y',
      logicOr: 'O',
      rightTitle: 'Criterios de sangría',
      title: {
        0: 'Constructor de búsqueda',
        _: 'Constructor de búsqueda (%d)',
      },
      value: 'Valor',
    },
    searchPanes: {
      clearMessage: 'Borrar todo',
      collapse: {
        0: 'Paneles de búsqueda',
        _: 'Paneles de búsqueda (%d)',
      },
      count: '{total}',
      countFiltered: '{shown} ({total})',
      emptyPanes: 'Sin paneles de búsqueda',
      loadMessage: 'Cargando paneles de búsqueda',
      title: 'Filtros Activos - %d',
      showMessage: 'Mostrar Todo',
      collapseMessage: 'Colapsar Todo',
    },
    select: {
      cells: {
        1: '1 celda seleccionada',
        _: '%d celdas seleccionadas',
      },
      columns: {
        1: '1 columna seleccionada',
        _: '%d columnas seleccionadas',
      },
      rows: {
        1: '1 fila seleccionada',
        _: '%d filas seleccionadas',
      },
    },
    thousands: '.',
    datetime: {
      previous: 'Anterior',
      next: 'Proximo',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
      unknown: '-',
      amPm: ['AM', 'PM'],
      months: {
        0: 'Enero',
        1: 'Febrero',
        10: 'Noviembre',
        11: 'Diciembre',
        2: 'Marzo',
        3: 'Abril',
        4: 'Mayo',
        5: 'Junio',
        6: 'Julio',
        7: 'Agosto',
        8: 'Septiembre',
        9: 'Octubre',
      },
      weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    },
    editor: {
      close: 'Cerrar',
      create: {
        button: 'Nuevo',
        title: 'Crear Nuevo Registro',
        submit: 'Crear',
      },
      edit: {
        button: 'Editar',
        title: 'Editar Registro',
        submit: 'Actualizar',
      },
      remove: {
        button: 'Eliminar',
        title: 'Eliminar Registro',
        submit: 'Eliminar',
        confirm: {
          _: '¿Está seguro que desea eliminar %d filas?',
          1: '¿Está seguro que desea eliminar 1 fila?',
        },
      },
      error: {
        system:
          'Ha ocurrido un error en el sistema (<a target="\\" rel="\\ nofollow" href="\\">Más información&lt;\\/a&gt;).</a>',
      },
      multi: {
        title: 'Múltiples Valores',
        info: 'Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.',
        restore: 'Deshacer Cambios',
        noMulti:
          'Este registro puede ser editado individualmente, pero no como parte de un grupo.',
      },
    },
    info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
    stateRestore: {
      creationModal: {
        button: 'Crear',
        name: 'Nombre:',
        order: 'Clasificación',
        paging: 'Paginación',
        search: 'Busqueda',
        select: 'Seleccionar',
        columns: {
          search: 'Búsqueda de Columna',
          visible: 'Visibilidad de Columna',
        },
        title: 'Crear Nuevo Estado',
        toggleLabel: 'Incluir:',
      },
      emptyError: 'El nombre no puede estar vacio',
      removeConfirm: '¿Seguro que quiere eliminar este %s?',
      removeError: 'Error al eliminar el registro',
      removeJoiner: 'y',
      removeSubmit: 'Eliminar',
      renameButton: 'Cambiar Nombre',
      renameLabel: 'Nuevo nombre para %s',
      duplicateError: 'Ya existe un Estado con este nombre.',
      emptyStates: 'No hay Estados guardados',
      removeTitle: 'Remover Estado',
      renameTitle: 'Cambiar Nombre Estado',
    },
  },
};
$('#example').DataTable(dataTableOptions);
    };

    onMounted(async () => {
      await getTasks();
      initDataTable();
    });

    return { 
      data,
      updateTask,
      getTasks,
      deleteTask,
      getTask,
      openModal,
      saveChanges,
      closeModal,
      dataTask,
      openModalRegisterTask,
      closeModalRegisterTask,
      registerNewTask,
      title,
      toggleTaskCompletion,
      type
   };
  },
};
</script>
<style src="@/assets/css/style.css"></style>