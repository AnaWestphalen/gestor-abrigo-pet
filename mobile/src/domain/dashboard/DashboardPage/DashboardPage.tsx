import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, logOutOutline } from "ionicons/icons";
import type { FC } from "react";
import { useEffect } from "react";
import "./DashboardPage.css";

import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";
import { ROUTES } from "src/domain/shared/Route/routes";
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
      <IonContent className="shelter-list">
        <h1>Abrigos Registrados</h1>
        {shelters.length > 0 ? (
          shelters.map((shelter) => (
            <IonCard
              key={shelter.id}
              routerLink={ROUTES.SHELTER.replace(":id", `${shelter.id}`)}
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
          ))
        ) : (
          <p>Não há abrigos cadastrados ainda.</p>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              expand="block"
              routerLink={ROUTES.CREATE_SHELTER}
              className="last-buttons"
            >
              <IonIcon slot="start" icon={add} />
              Criar Abrigo
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton expand="block" onClick={logout} className="last-buttons">
              <IonIcon slot="start" icon={logOutOutline} />
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
