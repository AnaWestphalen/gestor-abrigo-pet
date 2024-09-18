import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Pet, PetLog } from "src/core/pet/types";
import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";
import { usePetServices } from "src/domain/pet/contexts/PetServices/usePetServices";

const PetPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { currentUser } = useAuthServices();
  const { getPetDetails, getPetLogs, addPetLog } = usePetServices();
  const [pet, setPet] = useState<Pet | null>(null);
  const [petLogs, setPetLogs] = useState<PetLog[] | null>(null);

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

  useEffect(() => {
    const fetchPetLogs = async () => {
      const { success, error } = await getPetLogs(Number(params.id));
      if (success) {
        setPetLogs(success);
      } else {
        console.error("Falha ao buscar logs do pet:", error);
      }
    };

    console.log("Buscando logs para o pet de id: ", params);
    fetchPetLogs();
  }, [params.id, getPetLogs]);

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

  const handleAddPetLog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const content = formData.get("content") as string;
    console.log("Criando atividade no feed do pet com o conteúdo: ", content);
    try {
      const { success } = await addPetLog(Number(params.id), {
        content,
        currentUser: currentUser!.name || currentUser!.email,
      });
      console.log("Atividade adicionada com sucesso? ", success);
      if (success) {
        const { success, error } = await getPetLogs(Number(params.id));
        console.log("Buscando logs para o pet de id: ", params);
        if (success) {
          console.log("Logs do pet atualizados: ", success);
          setPetLogs(success);
        } else {
          console.error("Falha ao buscar logs do pet:", error);
        }
      }
      form.reset();
    } catch (error) {
      console.error("Falha ao adicionar log para o pet:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{pet.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonImg src={pet.img || "https://via.placeholder.com/150"} />
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

        <div>
          <h2 className="ion-padding">Atividades</h2>
          <div>
            <IonCard>
              <form onSubmit={handleAddPetLog}>
                <IonCardContent>
                  <IonTextarea
                    name="content"
                    label="Atividade"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Descreva qual a novidade..."
                    required
                  />
                </IonCardContent>

                <IonGrid>
                  <IonRow className="ion-padding-bottom ion-justify-content-center">
                    <IonButton type="submit" fill="clear" inputMode="text">
                      <IonIcon icon={addOutline} slot="start" /> Adicionar
                    </IonButton>
                  </IonRow>
                </IonGrid>
              </form>
            </IonCard>
          </div>
          {!!petLogs?.length &&
            petLogs.map((log) => {
              const createdDate = new Date(log.createdAt);
              const dateString = `${createdDate.toLocaleDateString("pt-br")} - ${createdDate.toLocaleTimeString("pt-br")}`;
              return (
                <IonCard key={`${log.id}-${log.createdAt}`}>
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{log.createdBy}</span>
                        <span>{dateString}</span>
                      </div>
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{log.content}</p>
                  </IonCardContent>
                </IonCard>
              );
            })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PetPage;
