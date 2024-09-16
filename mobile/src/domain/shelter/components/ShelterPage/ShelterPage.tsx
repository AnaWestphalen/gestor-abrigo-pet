import {
  IonBackButton,
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
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";

const ShelterPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { getShelterDetails } = useShelterServices();
  const [shelter, setShelter] = useState<Shelter | null>(null);

  useEffect(() => {
    const fetchShelterDetails = async () => {
      const { success, error } = await getShelterDetails(params.id);
      if (success) {
        setShelter(success);
      } else {
        console.error("Failed to fetch shelter details:", error);
      }
    };

    console.log("Fetching shelter details for id: ", params);
    fetchShelterDetails();
  }, [params.id, getShelterDetails]);

  if (!shelter) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonBackButton />
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Loading shelter details...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonImg src={shelter.img} alt={shelter.name} />
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
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ShelterPage;
