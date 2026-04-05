import { resolve } from "path";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // throw new Error("Somthing is wrong...");
  return (
    <div>Blog page</div>
  );
}