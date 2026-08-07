import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { loginAction } from "../actions";

export const metadata = { title: "Admin login" };

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <form
        action={loginAction}
        className="card"
        style={{ width: "min(400px,100%)", padding: 34 }}
      >
        <div className="eyebrow">Karim Lazaar</div>
        <h1
          style={{
            fontFamily: "var(--sw-font-display)",
            fontWeight: 700,
            fontSize: "1.5rem",
            margin: "10px 0 22px",
          }}
        >
          Admin access
        </h1>
        {error && (
          <p style={{ color: "#f08080", fontSize: "0.9rem", margin: "0 0 16px" }}>
            Wrong password — try again.
          </p>
        )}
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="field"
          placeholder="••••••••••"
        />
        <button type="submit" className="btn btn-accent" style={{ width: "100%", marginTop: 20 }}>
          Sign in
        </button>
      </form>
    </main>
  );
}
