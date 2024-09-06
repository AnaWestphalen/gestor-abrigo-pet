import { IonButton, IonInput } from "@ionic/react";
import { useState, type FC } from "react";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement login logic
  };

  return (
    <div>
      <IonInput
        type="email"
        placeholder="Email"
        value={email}
        onIonChange={(e: CustomEvent) => setEmail(e.detail.value!)}
      ></IonInput>
      <IonInput
        type="password"
        placeholder="Password"
        value={password}
        onIonChange={(e: CustomEvent) => setPassword(e.detail.value!)}
      ></IonInput>
      <IonButton expand="full" onClick={handleLogin}>
        Login
      </IonButton>
    </div>
  );
};

export default Login;
