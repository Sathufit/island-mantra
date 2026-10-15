"use client";

import { useState } from "react";
import Link from "next/link";
import { useCustomer } from "@/src/store/customer";
import SunsetLoader from "@/src/components/ui/SunsetLoader";

type Tab = "signin" | "register";

function AuthForms() {
  const { login, register } = useCustomer();
  const [tab, setTab] = useState<Tab>("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (tab === "signin") {
        await login(form.email, form.password);
      } else {
        await register(form.email, form.password, form.firstName, form.lastName);
      }
    } catch {
      setError(
        tab === "signin"
          ? "Incorrect email or password."
          : "Couldn't create your account. That email may already be in use."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6">
      <div className="text-center mb-10">
        <h1 className="tagline text-4xl text-ink">My Account</h1>
      </div>

      <div className="flex border-b border-line mb-8">
        {(["signin", "register"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setError(null);
            }}
            className={`flex-1 py-3 font-sans text-xs caps transition-colors ${
              tab === t
                ? "text-ink border-b-2 border-ink"
                : "text-ink/40"
            }`}
          >
            {t === "signin" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {tab === "register" && (
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              placeholder="First name"
              value={form.firstName}
              onChange={update("firstName")}
              className="field-box"
            />
            <input
              required
              placeholder="Last name"
              value={form.lastName}
              onChange={update("lastName")}
              className="field-box"
            />
          </div>
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={update("email")}
          className="w-full field-box"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={update("password")}
          className="w-full field-box"
        />

        {error && <p className="font-sans text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-solid w-full"
        >
          {loading
            ? "Please wait…"
            : tab === "signin"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="font-sans text-xs text-ink caps underline underline-offset-2 hover:text-lagoon transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

function AccountDashboard() {
  const { customer, updateProfile, logout } = useCustomer();
  const [form, setForm] = useState({
    firstName: customer?.first_name ?? "",
    lastName: customer?.last_name ?? "",
    phone: customer?.phone ?? "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-6">
      <div className="text-center mb-10">
        <h1 className="tagline text-4xl text-ink">My Account</h1>
        <p className="font-sans text-sm text-ink/60 mt-2">
          {customer?.email}
        </p>
      </div>

      <div className="flex gap-3 mb-10">
        <Link
          href="/account/orders"
          className="flex-1 text-center border border-line py-4 font-sans text-xs caps text-ink hover:border-ink transition-colors"
        >
          Order History
        </Link>
        <Link
          href="/account/addresses"
          className="flex-1 text-center border border-line py-4 font-sans text-xs caps text-ink hover:border-ink transition-colors"
        >
          Addresses
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <h2 className="font-sans text-xs caps text-ink">
          Profile
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            className="field-box"
          />
          <input
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            className="field-box"
          />
        </div>
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full field-box"
        />
        <button
          type="submit"
          className="w-full border border-ink text-ink font-sans text-xs caps py-3 hover:bg-ink hover:text-white transition-colors"
        >
          {saved ? "Saved" : "Save Changes"}
        </button>
      </form>

      <button
        onClick={logout}
        className="w-full mt-8 font-sans text-xs caps text-ink/50 hover:text-ink transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}

export default function AccountPage() {
  const { hasHydrated, token, isLoggedIn } = useCustomer();

  // Wait for zustand's localStorage rehydration, then — if a token turns out
  // to exist — wait for the customer fetch too, instead of flashing the
  // sign-in form before either resolves.
  if (!hasHydrated || (token && !isLoggedIn)) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <SunsetLoader />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {isLoggedIn ? <AccountDashboard /> : <AuthForms />}
    </div>
  );
}
