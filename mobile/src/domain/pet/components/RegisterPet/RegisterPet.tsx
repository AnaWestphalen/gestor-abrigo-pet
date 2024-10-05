import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
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
import { type ChangeEvent, type FC, useState } from "react";
import { useParams } from "react-router-dom";

import { RegisterPetParams } from "src/core/shelter/types";
import { usePetServices } from "src/domain/pet/contexts/PetServices/usePetServices";
import { useStorage } from "src/domain/shared/StorageProvider/useStorage";
import { useToast } from "src/domain/shared/ToastProvider/useToast";

import "./RegisterPet.css";

const RegisterPet: FC = () => {
  const { shelterId } = useParams<{ shelterId: string }>();
  const { addPet } = usePetServices();
  const { showToast } = useToast();
  const { storage } = useStorage();
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
    species: "cachorro",
    tutorName: "",
    tutorContact: "",
  });

  const handleChange = (e: unknown) => {
    const { name, value } = (e as ChangeEvent<HTMLInputElement>).target;
    setPetData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (petData.img) savePicture(petData.img);
      const { success, error } = await addPet(Number(shelterId), petData);

      if (success) {
        showToast({
          type: "success",
          message: "Animal adicionado com sucesso",
        });
        console.log("Animal adicionado com sucesso");
      } else {
        showToast({
          type: "warning",
          message: "Falha ao adicionar animal",
        });
        console.error("Falha ao adicionar animal:", error);
      }
    } catch (error) {
      showToast({
        type: "danger",
        message: "Erro ao adicionar animal",
      });
      console.error("Erro ao adicionar animal:", error);
    }
  };

  const selectPetSpecies = (animal: "cachorro" | "gato" | "outro") => {
    setPetData((prevState) => ({ ...prevState, species: animal }));
  };

  const [photo, setPhoto] = useState<string | null>(null);

  const savePicture = async (photo: string) => {
    const fileName = `${shelterId}-${petData.name}.jpeg`;
    await storage?.set(fileName, photo);
  };

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      console.log("Imagem tirada:", image);
      if (image.dataUrl) {
        setPetData((prevState) => ({
          ...prevState,
          img: image.dataUrl,
        }));
        setPhoto(image.dataUrl);
      }
    } catch (error) {
      showToast({
        type: "danger",
        message: "Erro ao tirar foto",
      });
      console.error("Erro ao tirar foto:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Adicionar Pet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <form onSubmit={handleAddPet}>
            {!petData.img ? (
              <IonButton
                onClick={() => takePicture()}
                expand="block"
                fill="outline"
                className="image-button"
              >
                <IonIcon slot="icon-only" icon={cameraOutline} />
              </IonButton>
            ) : (
              photo && <IonImg src={photo} />
            )}

            <IonItem>
              <IonLabel position="stacked">Nome</IonLabel>
              <IonInput
                name="name"
                value={petData.name}
                onIonInput={handleChange}
                placeholder="Bobby"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Cor Principal</IonLabel>
              <IonInput
                name="color"
                value={petData.color}
                onIonInput={handleChange}
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
                onIonInput={handleChange}
                placeholder="Digite a idade"
              />
            </IonItem>

            <IonLabel className="ion-padding section-title">
              Animais atendidos:
            </IonLabel>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    fill={petData.species === "cachorro" ? "solid" : "outline"}
                    onClick={() => selectPetSpecies("cachorro")}
                  >
                    Cachorro
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="block"
                    fill={petData.species === "gato" ? "solid" : "outline"}
                    onClick={() => selectPetSpecies("gato")}
                  >
                    Gato
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="block"
                    fill={petData.species === "outro" ? "solid" : "outline"}
                    onClick={() => selectPetSpecies("outro")}
                  >
                    Outro
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

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
                onIonInput={handleChange}
                placeholder="Digite o local"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Descrição</IonLabel>
              <IonTextarea
                name="description"
                value={petData.description}
                onIonInput={handleChange}
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
                onIonInput={handleChange}
                placeholder="Digite o nome do tutor"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Contato</IonLabel>
              <IonInput
                name="tutorContact"
                value={petData.tutorContact}
                onIonInput={handleChange}
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
