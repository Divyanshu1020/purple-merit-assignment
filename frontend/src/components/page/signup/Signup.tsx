import EntityContainer from "@/components/wrapper/EntityContainer";
import { SignUpForm } from "./SignupForm";

export default function Signup() {
  return (
    <EntityContainer>
      <div className="flex items-center justify-center ">
        <SignUpForm />
      </div>
    </EntityContainer>
  );
}
