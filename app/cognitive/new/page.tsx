import { CognitiveGoalForm } from "@/components/cognitive/CognitiveGoalForm";

export default function NewCognitiveMapPage() {
  return (
    <div>
      <h1 className="mb-6 font-bricolage text-2xl font-bold text-white">
        Generate cognitive map
      </h1>
      <CognitiveGoalForm />
    </div>
  );
}
