import {Task} from "../models/Tasks.js"

export const registerTask = async (req, res) => {
    const { title } = req.body;
    try {
        const task = new Task({ title, uid: req.uid });
        await task.save();
        return res.status(201).json("Tarea registrada exitosamente");
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: "Error de servidor" });
    }
  };

export const getTasks = async (req, res) => {
    try {
        const users = await Task.find({ uid: req.uid });
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const getTask = async (req, res) => {
    try {
      const userId = req.params.userId
        const user = await Task.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const {userId, title, completed}=req.body;
        const task = await Task.findById({ _id: userId });

        if (!task) return res.status(404).json({ error: "No existe el usuario" });
        if (!task.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id" });

        task.title = title;
        task.completed = completed;
        const updatedTask = await task.save();
        
        return res.status(201).json({ message: "Tarea actualizada con éxito", task: updatedTask });
    } catch (error) {
     console.log(error)
    }
};

export const deleteTask = async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'Se requiere un ID de usuario para eliminar.' });
      }

      const user = await Task.findByIdAndDelete(userId);
  
      res.status(201).json({ message: 'Usuario eliminado exitosamente.', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor. BACKENDDDD' });
    }
  };