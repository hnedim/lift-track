import { useExerciseStore } from "@/store/useExerciseStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NewWorkoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    exercises: [],
  });
  const { createWorkout, isCreatingWorkout } = useWorkoutStore();
  const { exercises, getExercises } = useExerciseStore();
  const navigate = useNavigate();

  useEffect(() => {
    getExercises();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createWorkout(formData);
    navigate("/");
  };

  const handleChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setFormData({ ...formData, exercises: values });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/">Go back</Link>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-md flex flex-col gap-3 bg-blue-200 p-6"
      >
        <h1 className="text-3xl py-6">Add new workout</h1>
        <label htmlFor="email">Workout name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label htmlFor="muscleGroup">Exercises</label>
        <select
          value={formData.exercises}
          name="exercises"
          id="exercises"
          multiple={true}
          onChange={handleChange}
        >
          {exercises.map((exercise) => (
            <option key={exercise._id} value={exercise._id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
