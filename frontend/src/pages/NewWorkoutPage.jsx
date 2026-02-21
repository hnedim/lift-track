import { useExerciseStore } from "@/store/useExerciseStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NewWorkoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    exercises: [],
  });
  const { createWorkout, isCreatingWorkout } = useWorkoutStore();
  const { exercises } = useExerciseStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createWorkout(formData);
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
          name="exercises"
          id="exercises"
          multiple={true}
          onChange={(e) =>
            setFormData({
              ...formData,
              exercises: [...formData.exercises, e.target.value],
            })
          }
        >
          {exercises.map((exercise) => (
            <option value={exercise._id}>{exercise.name}</option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
