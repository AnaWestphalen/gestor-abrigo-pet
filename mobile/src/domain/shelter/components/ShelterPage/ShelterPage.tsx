import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Shelter } from "src/core/shelter/types";
import { ROUTES } from "src/domain/shared/Route/routes";
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";

const ShelterPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { getShelterDetails } = useShelterServices();
  const [shelter, setShelter] = useState<Shelter | null>(null);

  useEffect(() => {
    const fetchShelterDetails = async () => {
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        console.error("Invalid shelter id:", params.id);
        return;
      }
      const result = await getShelterDetails(id);
      if (result.success) {
        setShelter(result.success);
      } else {
        console.error("Failed to fetch shelter details:", result.error);
      }
    };

    console.log("Fetching shelter details for id: ", params);
    fetchShelterDetails();
  }, [params.id]);

  if (!shelter) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Carregando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Aguardando detalhes do abrigo...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <IonCard>
            {shelter.img && <IonImg src={shelter.img} alt={shelter.name} />}
            <IonCardHeader>
              <IonCardTitle>{shelter.name}</IonCardTitle>
              <IonCardSubtitle>{shelter.address}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h2>Contato</h2>
                    <p>{shelter.contact}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h2>Coordenadas</h2>
                    <p>
                      {shelter.coordinates?.latitude},{" "}
                      {shelter.coordinates?.longitude}
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h2>Aceita</h2>
                    <p>{shelter.accepts?.join(", ")}</p>
                  </IonLabel>
                </IonItem>
                {shelter.createdAt && (
                  <IonItem>
                    <IonLabel>
                      <h2>Criado em</h2>
                      <p>{shelter.createdAt}</p>
                    </IonLabel>
                  </IonItem>
                )}
                {shelter.createdBy && (
                  <IonItem>
                    <IonLabel>
                      <h2>Criado por</h2>
                      <p>{shelter.createdBy}</p>
                    </IonLabel>
                  </IonItem>
                )}
                {shelter.closedAt && (
                  <IonItem>
                    <IonLabel>
                      <h2>Encerrado em</h2>
                      <p>{shelter.closedAt}</p>
                    </IonLabel>
                  </IonItem>
                )}
              </IonList>
              <IonItem
                routerLink={ROUTES.SHELTER_PETS.replace(":id", `${shelter.id}`)}
                routerDirection="forward"
              >
                <IonLabel>
                  <h2>Pets no Abrigo</h2>
                  <p>Ver todos os pets no abrigo</p>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ShelterPage;
