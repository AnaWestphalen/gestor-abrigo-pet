import { IonButton, IonContent, IonPage } from "@ionic/react";
import type { FC } from "react";
import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";

export const DashboardPage: FC = () => {
  const { logout } = useAuthServices();
  return (
    <IonPage>
      <IonContent>
        <h1>Nada aqui ainda, mas você está logado.</h1>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};
