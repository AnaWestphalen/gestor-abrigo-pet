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
import { useEffect, useState } from "react";

import type { User } from "src/core/auth/types";
import type { Shelter } from "src/core/shelter/types";
import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";

export const DashboardPage: FC = () => {
  const { logout, currentUser } = useAuthServices();
  const { getShelterDetails } = useShelterServices();
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    const fetchShelters = async (currentUser?: User) => {
      if (!currentUser?.allowedIn?.length) {
        return;
      }

      const details = await Promise.all(
        currentUser.allowedIn.map((shelterId) => getShelterDetails(shelterId))
      );

      const shelters = details.map(
        (detail) => "success" in detail && detail.success
      );
      setShelters(shelters.filter((shelter): shelter is Shelter => !!shelter));
    };

    fetchShelters(currentUser);
  }, [currentUser]);

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
              <IonItem key={shelter.id} routerLink={`/shelter/${shelter.id}`}>
                <IonLabel>{shelter.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <p>Não há abrigos cadastrados ainda.</p>
        )}
        <IonButton routerLink="/shelter/create">Criar Abrigo</IonButton>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};
