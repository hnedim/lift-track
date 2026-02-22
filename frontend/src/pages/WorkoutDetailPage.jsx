import { useExerciseStore } from "@/store/useExerciseStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function WorkoutDetailPage() {
  const navigate = useNavigate();

  const { exercises } = useExerciseStore();

  const {
    showWorkoutDetails,
    workoutDetail,
    isLoading,
    updateWorkout,
    deleteWorkout,
  } = useWorkoutStore();

  const [formData, setFormData] = useState({
    name: "",
    exercises: [],
  });

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) showWorkoutDetails(id);
  }, [id]);

  useEffect(() => {
    if (workoutDetail) {
      setFormData({
        name: workoutDetail.name,
        exercises: workoutDetail.exercises,
      });
    }
  }, [workoutDetail]);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteWorkout(workoutDetail._id);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWorkout(workoutDetail._id, formData);
    navigate("/");
  };

  const handleChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setFormData({ ...formData, exercises: values });
  };

  if (isLoading || !workoutDetail) return <p>Loading...</p>;

  //TODO: set the default selected value of the exercises
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/">Go back</Link>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-md flex flex-col gap-3 bg-blue-200 p-6"
      >
        <h1 className="text-3xl py-6">Workout details</h1>
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
          name="exercises"
          multiple={true}
          id="exercises"
          onChange={handleChange}
          defaultValue={workoutDetail.exercises}
        >
          {exercises.map((ex) => (
            <option key={ex._id} value={ex._id}>
              {ex.name}
            </option>
          ))}
        </select>

        <div className="flex justify-between">
          <button className="p-1">Submit</button>
          <button className="bg-red-600 p-1" onClick={(e) => handleDelete(e)}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
