import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./AuthPage.css";
import { useState } from "react";
import { checkmark } from "ionicons/icons";
import { useAuthServices } from "src/domain/auth/hooks/useAuthServices/useAuthServices";

const AuthPage: React.FC = () => {
  const { login, register } = useAuthServices();
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meu Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonIcon
          className="logo ion-padding"
          src={"icons/shelter-icon.svg"}
          color="primary"
        />
        {mode === "login" ? (
          <div>
            <h1>Tem conta?</h1>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.target as HTMLFormElement);
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const response = await login({ email, password });
                if (response.success) {
                  console.log("Login realizado com sucesso");
                }
              }}
            >
              <IonInput type="email" placeholder="Email" />
              <IonInput type="password" placeholder="Password" />
              <IonButton type="submit" expand="full">
                Login
              </IonButton>
            </form>
            <div>
              <p>
                Não tem conta?{" "}
                <a href="#" onClick={() => setMode("register")}>
                  Crie uma agora
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h1>Crie sua conta</h1>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.target as HTMLFormElement);
                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const phone = formData.get("phone") as string;
                const response = await register({
                  // name,
                  email,
                  password,
                  phone,
                });
                if (response.success) {
                  console.log("Registro realizado com sucesso");
                }
              }}
            >
              <IonInput name="name" placeholder="Nome" />
              <IonInput name="email" placeholder="Email" />
              <IonInput name="password" type="password" placeholder="Senha" />
              <IonInput name="phone" placeholder="Celular" />
              <IonButton type="submit">
                <IonIcon color="white" slot="start" icon={checkmark} />
                Começar
              </IonButton>
            </form>
            <div>
              <p>
                Já tem conta?{" "}
                <a
                  onClick={(event) => {
                    event.preventDefault();
                    setMode("login");
                  }}
                >
                  Faça login
                </a>
              </p>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
