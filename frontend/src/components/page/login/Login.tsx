import EntityContainer from "@/components/wrapper/EntityContainer";
import { SignInForm } from "./LoginForm";

export default function Login() {
  return (
    <EntityContainer>
      <div className="flex items-center justify-center ">
        <SignInForm />
      </div>
    </EntityContainer>
  );
}
