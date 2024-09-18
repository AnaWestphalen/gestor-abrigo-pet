import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Pet } from "src/core/pet/types";
import { usePetServices } from "src/domain/pet/contexts/PetServices/usePetServices";

const PetPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { getPetDetails } = usePetServices();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      const { success, error } = await getPetDetails(Number(params.id));
      if (success) {
        setPet(success);
      } else {
        console.error("Falha ao buscar detalhes do pet:", error);
      }
    };

    console.log("Fetching shelter details for id: ", params);
    fetchPetDetails();
  }, [params.id, getPetDetails]);

  if (!pet) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Carregando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Carregando detalhes do pet...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pet.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{pet.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h2>Idade</h2>
                  <p>{pet.age}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Cor</h2>
                  <p>{pet.color}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Descrição</h2>
                  <p>{pet.description}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Encontrado em</h2>
                  <p>
                    {typeof pet.foundIn === "string"
                      ? pet.foundIn
                      : `${pet.foundIn?.latitude}, ${pet.foundIn?.longitude}`}
                  </p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Tamanho</h2>
                  <p>{pet.size}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Espécie</h2>
                  <p>{pet.species}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Nome do Tutor</h2>
                  <p>{pet.tutorName}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Contato do Tutor</h2>
                  <p>{pet.tutorContact}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Criado em</h2>
                  <p>{pet.createdAt}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>Criado por</h2>
                  <p>{pet.createdBy}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PetPage;
