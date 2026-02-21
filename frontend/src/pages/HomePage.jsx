import { useAuthStore } from "@/store/useAuthStore";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useWorkoutSessionStore } from "@/store/useWorkoutSessionStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { authUser } = useAuthStore();
  const { workoutSessions, isWorkoutSessionLoading, getWorkoutSessions } =
    useWorkoutSessionStore();
  const { workouts, isWorkoutsLoading, getWorkouts } = useWorkoutStore();
  const { exercises, isExercisesLoading, getExercises } = useExerciseStore();

  useEffect(() => {
    getWorkouts();
    getExercises();
    getWorkoutSessions();
  }, []);
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
            <div className="flex flex-col bg-green-400 p-5 h-1/2 overflow-scroll">
              {workouts.length > 0 ? (
                workouts.map((workout) => {
                  return <div key={workout._id}>{workout.name}</div>;
                })
              ) : (
                <p>No workouts yet.</p>
              )}
            </div>
            {/* Excercise container */}
            <div className="flex flex-col bg-yellow-400 p-5 h-1/2 overflow-scroll">
              {exercises.length > 0 ? (
                exercises.map((exercise) => {
                  return <div>{exercise.name}</div>;
                })
              ) : (
                <p>No exercises yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
