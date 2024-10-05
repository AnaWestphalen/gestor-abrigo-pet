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
  IonText,
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
      <IonContent>
        <div className="container shelter-list">
          <h1>Abrigos Registrados</h1>
          {shelters.length > 0 ? (
            shelters.map((shelter) => (
              <IonCard
                key={shelter.id}
                className="custom-card"
                routerLink={ROUTES.SHELTER.replace(":id", `${shelter.id}`)}
              >
                <IonCardHeader className="custom-card-header">
                  <IonCardTitle className="shelter-list-title">
                    {shelter.name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText className="block">
                    <strong>Endereço: </strong>
                    {shelter.address} - {shelter.city}, {shelter.state}
                  </IonText>
                  <IonText className="block">
                    <strong>Criado por: </strong>
                    {shelter.createdBy}
                  </IonText>
                  <IonText className="block">
                    <strong>Contato: </strong>
                    {shelter.contact}
                  </IonText>
                  <IonText className="block">
                    <strong>Animais atendidos:</strong>{" "}
                    {shelter.accepts?.join(", ") ?? "Não informado"}
                  </IonText>
                </IonCardContent>
                <IonButton
                  fill="clear"
                  routerLink={ROUTES.SHELTER.replace(":id", `${shelter.id}`)}
                >
                  Ver Detalhes
                </IonButton>
              </IonCard>
            ))
          ) : (
            <IonText>Não há abrigos cadastrados ainda.</IonText>
          )}
        </div>
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
