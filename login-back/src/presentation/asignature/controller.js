import { asignatureModel } from "../../data/models/asignature.model.js";

export const getAsignatures = async (request, response) => {
  try {
    const asignatures = await asignatureModel.find();

    return response.json(asignatures);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const createAsignature = async (request, response) => {
  const { name, career } = request.body;

  try {
    const findAsignature = await asignatureModel.findOne({ name });

    if (findAsignature)
      return response.json(`Asignature with name ${name} already exists`);

    const newAsignature = await asignatureModel.create({ name, career });

    return response.json(newAsignature);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const updateAsignature = async (request, response) => {
  const { id } = request.params;
  const { name, career } = request.body;

  try {
    const findAsignature = await asignatureModel.findById(id);

    if (!findAsignature)
      return response.json(`Asignature with id ${id} not found`);

    const updatedAsignature = await asignatureModel.findByIdAndUpdate(id, {
      name,
      career,
    });

    return response.json({ _id: updatedAsignature.id, name });
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const deleteAsignature = async (request, response) => {
  const { id } = request.params;

  try {
    const findAsignature = await asignatureModel.findById(id);

    if (!findAsignature)
      return response.json(`Asignature with id ${id} not found`);

    await asignatureModel.findByIdAndDelete(id);

    return response.json(`Asignature with id ${id} was deleted`);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};
