import { useAuthStore } from "@/store/useAuthStore";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useWorkoutSessionStore } from "@/store/useWorkoutSessionStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

export default function HomePage() {
  const { authUser } = useAuthStore();
  const { workoutSessions, isWorkoutSessionLoading, getWorkoutSessions } =
    useWorkoutSessionStore();
  const {
    workouts,
    isWorkoutsLoading,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout,
  } = useWorkoutStore();
  const {
    exercises,
    isExercisesLoading,
    getExercises,
    createExercise,
    deleteExercise,
  } = useExerciseStore();

  useEffect(() => {
    getWorkouts();
    getExercises();
    getWorkoutSessions();
  }, []);

  useEffect(() => {
    getExercises();
  }, [createExercise, deleteExercise]);

  useEffect(() => {
    getWorkouts();
  }, [createWorkout, deleteWorkout, updateWorkout]);

  return (
    <>
      <div className="w-screen h-screen px-20 py-10 flex flex-col gap-5">
        <h1 className="text-2xl">Welcome back, {authUser.email}</h1>
        <div className="flex justify-between gap-10">
          {/* Workout session container */}
          <div className="flex flex-col justify-between bg-red-400 h-96 w-1/2 p-5">
            <div className="flex flex-col overflow-scroll">
              {workoutSessions.length > 0 ? (
                workoutSessions.map((session) => {
                  return <div>{session.name}</div>;
                })
              ) : (
                <p>No sessions yet.</p>
              )}
            </div>
            <Link to="/workout-sessions/new">Create new session</Link>
          </div>
          <div className="flex flex-col justify-between w-1/2 h-96 gap-10">
            {/* Workout container */}
            <div className="flex flex-col justify-between bg-green-400 p-5 h-1/2 ">
              <div className="flex flex-col overflow-scroll">
                {workouts.length > 0 ? (
                  workouts.map((workout) => {
                    return (
                      <Link
                        to={`/workouts/${workout._id}`}
                        key={workout._id}
                        className="py-2 px-5 cursor-pointer hover:bg-green-500"
                      >
                        {workout.name}
                      </Link>
                    );
                  })
                ) : (
                  <p>No workouts yet.</p>
                )}
              </div>
              <Link to="/workouts/new">Add new workout</Link>
            </div>
            {/* Exercise container */}
            <div className="flex flex-col justify-between bg-yellow-400 p-5 h-1/2 ">
              <div className="flex flex-col overflow-scroll">
                {exercises.length > 0 ? (
                  exercises.map((exercise) => {
                    return (
                      <Link
                        to={`/exercises/${exercise._id}`}
                        key={exercise._id}
                        className="py-2 px-5 cursor-pointer hover:bg-yellow-500"
                      >
                        {exercise.name}
                      </Link>
                    );
                  })
                ) : (
                  <p>No exercises yet.</p>
                )}
              </div>
              <Link to="/exercises/new">Add new exercise</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
