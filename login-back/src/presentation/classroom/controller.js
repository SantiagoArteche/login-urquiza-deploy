import { asignatureModel } from "../../data/models/asignature.model.js";
import { classRoomModel } from "../../data/models/classroom.model.js";
import { userModel } from "../../data/models/user.model.js";

export const getClassrooms = async (request, response) => {
  try {
    const classRooms = await classRoomModel.find();

    return response.json(classRooms);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const createClassroom = async (request, response) => {
  const { grade, asignature, teacher, students } = request.body;

  try {
    const findTeacher = await userModel.findById(teacher);

    const findAsignature = await asignatureModel.findById(asignature);

    if (!findAsignature)
      return response.json(`La asignatura con id ${id} no existe!`);

    if (findTeacher.role !== "docente")
      return response.json(`El usuario que esta asignando no es docente!`);

    students.forEach(async (student) => {
      const findStudent = await userModel.findById(student);

      console.log(findAsignature.career);
      if (!findAsignature.career.includes(findStudent.career))
        return response.json(
          `Estas intentando inscribir al alumno a una materia fuera de las carreras que cursa!`
        );

      if (findStudent.role !== "alumno")
        return response.json(`Uno de los usuarios no es alumno!`);
    });

    const newClassroom = await classRoomModel.create({
      grade,
      asignature,
      teacher,
      students,
    });

    return response.json(newClassroom);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const updateClassroom = async (request, response) => {
  const { id } = request.params;
  const { teacher, students } = request.body;

  try {
    const findClassroom = await classRoomModel.findById(id);

    const findAsignature = await asignatureModel.findById(
      findClassroom.asignature
    );

    if (!findAsignature)
      return response.json(`La asignatura con id ${id} no existe!`);

    if (!findClassroom) return response.json(`Classroom with ${id} not found`);

    const findTeacher = await userModel.findById(teacher);

    if (findTeacher.role !== "docente")
      return response.json(`El usuario que esta asignando no es docente!`);

    students.forEach(async (student) => {
      const findStudent = await userModel.findById(student);

      if (!findAsignature.career.includes(findStudent.career))
        return response.json(
          `Estas intentando inscribir al alumno a una materia fuera de las carreras que cursa!`
        );

      if (findStudent.role !== "alumno")
        return response.json(`Uno de los usuarios no es alumno!`);
    });

    const newClassroom = await classRoomModel.findByIdAndUpdate(id, {
      teacher: teacher && teacher,
      students: students && students,
    });

    return response.json({ ...newClassroom._doc, teacher, students });
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const deleteClassroom = async (request, response) => {
  const { id } = request.params;

  try {
    const findClassroom = await classRoomModel.findById(id);

    if (!findClassroom) return response.json(`Classroom with ${id} not found`);

    await classRoomModel.findByIdAndDelete(id);

    return response.json(`Classroom with id ${id} was deleted`);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};
