import { useExerciseStore } from "@/store/useExerciseStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ExerciseDetailPage() {
  const navigate = useNavigate();

  const muscleGroups = [
    "biceps",
    "triceps",
    "back",
    "chest",
    "quads",
    "glutes",
    "shoulders",
  ];
  const {
    exerciseDetail,
    showExerciseDetails,
    isLoadingExerciseDetail,
    deleteExercise,
    updateExercise,
  } = useExerciseStore();

  const [formData, setFormData] = useState({
    name: "",
    muscleGroup: "",
  });

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) showExerciseDetails(id);
  }, [id]);

  useEffect(() => {
    if (exerciseDetail) {
      setFormData({
        name: exerciseDetail.name,
        muscleGroup: exerciseDetail.muscleGroup,
      });
    }
  }, [exerciseDetail]);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteExercise(exerciseDetail._id);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExercise(exerciseDetail._id, formData);
    navigate("/");
  };

  if (isLoadingExerciseDetail || !exerciseDetail) return <p>Loading...</p>;

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/">Go back</Link>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-md flex flex-col gap-3 bg-blue-200 p-6"
      >
        <h1 className="text-3xl py-6">Exercise details</h1>
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
          defaultValue={exerciseDetail.muscleGroup}
        >
          {muscleGroups.map((muscleGroup) => (
            <option value={muscleGroup}>{muscleGroup}</option> //TODO: KEY
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
