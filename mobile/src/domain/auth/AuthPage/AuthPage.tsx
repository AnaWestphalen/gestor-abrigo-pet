import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { type FC, useEffect, useState } from "react";
import { type RouteComponentProps } from "react-router-dom";

import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";

import "./AuthPage.css";

const AuthPage: FC<RouteComponentProps> = ({ history }) => {
  const { currentUser, login, register } = useAuthServices();
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    if (currentUser) {
      history.push("/dashboard");
    }
  }, [currentUser]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Meu Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="logo-container">
          <IonIcon
            className="logo ion-padding"
            src={"icons/shelter-icon.svg"}
            color="primary"
          />
        </div>
        {mode === "login" ? (
          <div>
            <h1>Tem conta?</h1>
            <form
              className="form-gap"
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
              <IonInput
                name="email"
                label="Email"
                labelPlacement="floating"
                fill="solid"
              />
              <IonInput
                name="password"
                label="Senha"
                labelPlacement="floating"
                fill="solid"
                type="password"
              />
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
              className="form-gap"
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.target as HTMLFormElement);
                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const phone = formData.get("phone") as string;
                const role = formData.get("role") as string;
                const response = await register({
                  name,
                  email,
                  password,
                  phone,
                  role,
                });
                if (response.success) {
                  console.log("Registro realizado com sucesso");
                  (event.target as HTMLFormElement).reset();
                  setMode("login");
                }
              }}
            >
              <IonInput fill="solid" name="name" placeholder="Nome" />
              <IonInput
                type="email"
                fill="solid"
                name="email"
                placeholder="Email"
              />
              <IonInput
                fill="solid"
                name="password"
                type="password"
                placeholder="Senha"
              />
              <IonInput fill="solid" name="phone" placeholder="Celular" />
              <IonSelect label="Função" name="role">
                <IonSelectOption value="voluntario">Voluntário</IonSelectOption>
                <IonSelectOption value="gestor">
                  Gestor de Abrigo
                </IonSelectOption>
              </IonSelect>
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
