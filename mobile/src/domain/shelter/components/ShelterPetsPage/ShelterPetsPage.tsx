import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Pet } from "src/core/pet/types";
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";

const ShelterPetsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getShelterPets } = useShelterServices();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchShelterPets = async () => {
      const { success, error } = await getShelterPets(Number(id));
      if (success) {
        setPets(success);
      } else {
        console.error("Failed to fetch shelter pets:", error);
      }
    };

    fetchShelterPets();
  }, [id, getShelterPets]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/shelter/${id}`} />
          </IonButtons>
          <IonTitle>Pets no Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {pets.map((pet) => (
              <IonCol size="6" key={pet.id}>
                <IonCard>
                  <IonImg src={pet.img || "https://via.placeholder.com/100"} />
                  <IonCardHeader>
                    <IonCardTitle>{pet.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{pet.description}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ShelterPetsPage;
