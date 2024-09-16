import { IonButton, IonContent, IonPage } from "@ionic/react";
import type { FC } from "react";

import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";

export const DashboardPage: FC = () => {
  const { logout } = useAuthServices();
  return (
    <IonPage>
      <IonContent>
        <h1>Início</h1>
        <IonButton routerLink="/shelter/1">Abrigo 1</IonButton>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};
