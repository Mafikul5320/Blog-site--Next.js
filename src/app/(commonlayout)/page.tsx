import { cookies } from "next/headers";

export default async function Home() {
  const cokkeStore = await cookies()
  const res = await fetch("http://localhost:4000/api/auth/get-session", {
    headers: {
      cookie: cokkeStore.toString()
    },
    cache: "no-store"


  });
  console.log(await res.json())
  return (
    <div>
      <small>hi, {res.status}</small>

    </div>
  );
}
