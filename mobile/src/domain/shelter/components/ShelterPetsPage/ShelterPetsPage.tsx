import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, pawOutline } from "ionicons/icons";
import { type FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import dog from "/src/assets/icons/dog.svg";

import "./ShelterPetsPage.css";

import type { Pet } from "src/core/pet/types";
import { ROUTES } from "src/domain/shared/Route/routes";
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";

const ShelterPetsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getShelterPets } = useShelterServices();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShelterPets = async () => {
      setLoading(true);
      const { success, error } = await getShelterPets(Number(id));
      if (success) {
        setPets(success);
      } else {
        console.error("Failed to fetch shelter pets:", error);
      }
      setLoading(false);
    };

    if (!loading) fetchShelterPets();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Pets no Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          {pets.length > 0 ? (
            <IonGrid>
              <IonRow>
                {pets.map((pet) => (
                  <IonCol size="6" key={pet.id}>
                    <IonCard
                      routerLink={ROUTES.PET.replace(":shelterId", id).replace(
                        ":id",
                        `${pet.id}`
                      )}
                    >
                      <IonImg
                        className="shelter-pet-avatar"
                        src={pet.img || "https://via.placeholder.com/150"}
                      />
                      <IonCardHeader className="flex-row space-between">
                        <IonCardTitle>
                          {pet.name}, {pet.age}
                        </IonCardTitle>
                        <IonIcon src={dog} size="small" />
                      </IonCardHeader>
                      <IonCardContent>
                        <p>{pet.description}</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          ) : (
            <IonCard className="ion-padding no-pets">
              <IonIcon style={{ fontSize: "44px" }} icon={pawOutline} />
              <IonCardTitle>Nenhum pet encontrado</IonCardTitle>
            </IonCard>
          )}
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            routerLink={ROUTES.CREATE_PET.replace(":shelterId", id)}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ShelterPetsPage;
