import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cameraOutline, heartOutline, pawOutline } from "ionicons/icons";
import { type FC, useState } from "react";
import { useParams } from "react-router-dom";

import { RegisterPetParams } from "src/core/shelter/types";
import { usePetServices } from "src/domain/pet/contexts/PetServices/usePetServices";
import "./RegisterPet.css";

const RegisterPet: FC = () => {
  const { shelterId } = useParams<{ shelterId: string }>();
  const { addPet } = usePetServices();
  const [petData, setPetData] = useState<RegisterPetParams>({
    name: "",
    color: "",
    age: "",
    size: "pequeno",
    foundIn: "",
    description: "",
    shelterId: Number(shelterId),
    img: "",
    receivedAt: new Date(),
    leftAt: undefined,
    species: "",
    tutorName: "",
    tutorContact: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPetData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { success, error } = await addPet(Number(shelterId), petData);
      if (success) {
        console.log("Animal adicionado com sucesso");
      } else {
        console.error("Falha ao adicionar animal:", error);
      }
    } catch (error) {
      console.error("Erro ao adicionar animal:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Adicionar Pet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <form onSubmit={handleAddPet}>
            <IonButton expand="block" fill="outline" className="image-button">
              <IonIcon slot="icon-only" icon={cameraOutline} />
            </IonButton>

            <IonItem>
              <IonLabel position="stacked">Nome</IonLabel>
              <IonInput
                name="name"
                value={petData.name}
                onIonChange={handleChange}
                placeholder="Bobby"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Cor Principal</IonLabel>
              <IonInput
                name="color"
                value={petData.color}
                onIonChange={handleChange}
                placeholder="Preto"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Idade Aproximada</IonLabel>
              <IonInput
                name="age"
                type="number"
                value={petData.age}
                onIonChange={handleChange}
                placeholder="Digite a idade"
              />
            </IonItem>

            <div className="ion-padding">
              <IonLabel className="section-title">Tamanho</IonLabel>
              <IonGrid>
                <IonRow style={{ alignItems: "flex-end" }}>
                  <IonCol>
                    <IonButton
                      expand="block"
                      size="small"
                      color={petData.size === "pequeno" ? "primary" : "light"}
                      onClick={() =>
                        setPetData({ ...petData, size: "pequeno" })
                      }
                    >
                      <IonIcon
                        slot="icon-only"
                        size="small"
                        icon={pawOutline}
                      />
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      expand="block"
                      size="default"
                      color={petData.size === "médio" ? "primary" : "light"}
                      onClick={() => setPetData({ ...petData, size: "médio" })}
                    >
                      <IonIcon
                        slot="icon-only"
                        size="medium"
                        icon={pawOutline}
                      />
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      expand="block"
                      size="large"
                      color={petData.size === "grande" ? "primary" : "light"}
                      onClick={() => setPetData({ ...petData, size: "grande" })}
                    >
                      <IonIcon
                        slot="icon-only"
                        size="large"
                        icon={pawOutline}
                      />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <IonItem>
              <IonLabel position="stacked">Onde foi encontrado</IonLabel>
              <IonInput
                name="foundIn"
                value={petData.foundIn}
                onIonChange={handleChange}
                placeholder="Digite o local"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Descrição</IonLabel>
              <IonTextarea
                name="description"
                value={petData.description}
                onIonChange={handleChange}
                placeholder="Escreva aqui todos os detalhes do animal"
                required
              />
            </IonItem>

            <div className="ion-padding">
              <IonLabel className="section-title">Tutor (se houver)</IonLabel>
            </div>

            <IonItem>
              <IonLabel position="stacked">Nome</IonLabel>
              <IonInput
                name="tutorName"
                value={petData.tutorName}
                onIonChange={handleChange}
                placeholder="Digite o nome do tutor"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Contato</IonLabel>
              <IonInput
                name="tutorContact"
                value={petData.tutorContact}
                onIonChange={handleChange}
                placeholder="Digite o contato"
              />
            </IonItem>

            <IonButton
              expand="block"
              color="primary"
              className="save-button"
              type="submit"
            >
              <IonIcon slot="start" icon={heartOutline} />
              Salvar
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPet;
