import { SignInButton, SignUpButton, useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

function Landing() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (isSignedIn) return <Navigate to="/recipes" replace />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-orange-50 px-6 text-center">
      <div className="text-6xl">🍲</div>
      <h1 className="text-4xl font-bold">Retseptlar sayti</h1>
      <p className="max-w-md text-gray-600">
        Sevimli taomlaringiz retseptlarini saqlang va qaysi taomni qachon
        pishirganingizni kuzatib boring.
      </p>
      <div className="flex gap-3">
        <SignInButton mode="modal" forceRedirectUrl="/recipes">
          <button className="rounded-xl border border-gray-300 bg-white px-6 py-2 font-medium">
            Kirish
          </button>
        </SignInButton>
        <SignUpButton mode="modal" forceRedirectUrl="/recipes">
          <button className="rounded-xl bg-orange-500 px-6 py-2 font-medium text-white">
            Ro'yxatdan o'tish
          </button>
        </SignUpButton>
      </div>
    </main>
  );
}

export default Landing;
