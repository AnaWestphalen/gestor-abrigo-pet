import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Login from "./components/Login";

import "./AuthPage.css";

const AuthPage: React.FC = () => {
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
        <h1>Tem conta?</h1>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
