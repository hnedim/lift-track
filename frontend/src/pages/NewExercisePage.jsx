import { useExerciseStore } from "@/store/useExerciseStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NewExercisePage() {
  const muscleGroups = [
    "biceps",
    "triceps",
    "back",
    "chest",
    "quads",
    "glutes",
    "shoulders",
  ];

  const [formData, setFormData] = useState({
    name: "",
    muscleGroup: muscleGroups[0],
  });
  const { createExercise, isCreatingExercise } = useExerciseStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createExercise(formData);
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/">Go back</Link>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-md flex flex-col gap-3 bg-blue-200 p-6"
      >
        <h1 className="text-3xl py-6">Add new exercise</h1>
        <label htmlFor="email">Exercise name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label htmlFor="muscleGroup">Muscle group</label>
        <select
          name="muscleGroup"
          id="muscleGroup"
          onChange={(e) =>
            setFormData({ ...formData, muscleGroup: e.target.value })
          }
        >
          {muscleGroups.map((muscleGroup) => (
            <option value={muscleGroup}>{muscleGroup}</option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
