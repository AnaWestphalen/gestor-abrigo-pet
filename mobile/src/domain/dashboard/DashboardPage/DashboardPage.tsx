import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { FC } from "react";
import { useEffect } from "react";

import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";

export const DashboardPage: FC = () => {
  const { logout } = useAuthServices();
  const { shelters, getShelters } = useShelterServices();

  useEffect(() => {
    getShelters();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Boas vindas!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Início</h1>
        {shelters.length > 0 ? (
          <IonList>
            {shelters.map((shelter) => (
              <IonItem key={shelter.id} routerLink={`/shelters/${shelter.id}`}>
                <IonLabel>{shelter.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <p>Não há abrigos cadastrados ainda.</p>
        )}
        <IonButton routerLink="/shelters">Criar Abrigo</IonButton>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};
