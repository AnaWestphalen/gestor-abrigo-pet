import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { FC } from "react";
import { useEffect } from "react";
import "./DashboardPage.css";

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
        <h1>Abrigos Registrados</h1>
        {shelters.length > 0 ? (
          <IonList>
            {shelters.map((shelter) => (
              <IonCard
                key={shelter.id}
                routerLink={`/shelter/${shelter.id}`}
                className="custom-card"
              >
                <IonCardHeader className="custom-card-header">
                  <IonCardTitle className="shelter-list-title">
                    {shelter.name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="custom-card-content">
                  <p>{shelter.img}</p>
                  <p>
                    <strong>Endereço: </strong>
                    {shelter.address}
                  </p>
                  <p>
                    <strong>Criado por: </strong>
                    {shelter.createdBy}
                  </p>
                  <p>
                    <strong>Contato: </strong>
                    {shelter.contact}
                  </p>
                  <p>
                    <strong>Animais atendidos:</strong>{" "}
                    {shelter.accepts?.join(", ") ?? "Não informado"}
                  </p>

                  <IonButton
                    fill="outline"
                    color="primary"
                    className="details-button"
                  >
                    Ver Detalhes
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        ) : (
          <p>Não há abrigos cadastrados ainda.</p>
        )}

        <IonButton routerLink="/shelter/create" className="last-buttons">
          Criar Abrigo
        </IonButton>
        <IonButton onClick={logout} className="last-buttons">
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
