import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Login from "./components/Login";

const AuthPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Auth Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Auth Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
