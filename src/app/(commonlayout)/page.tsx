import { UserService } from "@/services/user.service";

export default async function Home() {

  const session = await UserService.getSession();
  console.log(session)
  return (
    <div>
      <small>hi, </small>

    </div>
  );
}
