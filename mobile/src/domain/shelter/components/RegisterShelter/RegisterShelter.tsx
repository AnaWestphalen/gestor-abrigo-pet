import { Geolocation } from "@capacitor/geolocation";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { heart, homeOutline, planetOutline } from "ionicons/icons";
import { type FC, useState } from "react";
import type { RouteComponentProps } from "react-router";

import { useToast } from "src/domain/shared/ToastProvider/useToast";
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";
import "./RegisterShelter.css";

const RegisterShelter: FC<RouteComponentProps> = ({ history }) => {
  const { createShelter } = useShelterServices();
  const [shelterName, setShelterName] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<{
    latitude: string;
    longitude: string;
  }>();
  const [selectedAnimals, setSelectedAnimals] = useState<Set<string>>(
    new Set()
  );
  const [contact, setContact] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { showToast } = useToast();

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString(),
      });
      console.log(
        `Localização: ${position.coords.latitude}, ${position.coords.longitude}`
      );
    } catch (error) {
      console.error("Erro obtendo a localização", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Criando abrigo...");
    const { error, success } = await createShelter({
      name: shelterName,
      state,
      city,
      contact,
      coordinates: location,
      accepts: Array.from(selectedAnimals),
      address,
      description,
    });

    if (success) {
      showToast({
        type: "success",
        message: "Abrigo cadastrado com sucesso!",
      });
      history.push("/dashboard");
    } else {
      showToast({
        type: "danger",
        message: "Erro ao cadastrar abrigo",
      });
      console.error("Erro ao criar abrigo:", error);
    }
  };

  const toggleAnimalSelection = (animal: string) => {
    setSelectedAnimals((prev) => {
      const updated = new Set(prev);
      if (updated.has(animal)) {
        updated.delete(animal);
      } else {
        updated.add(animal);
      }
      return updated;
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Meu Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="header-with-icon ion-align-items-center">
          <h1 className="ion-padding-horizontal">Cadastrar Abrigo</h1>
          <IonIcon
            icon={homeOutline}
            size="large"
            color="primary"
            style={{ transform: "translateY(4px)" }}
          />
        </div>

        <form className="ion-margin-top" onSubmit={handleSubmit}>
          <IonList className="form-list">
            <IonItem>
              <IonInput
                label="Nome do Abrigo"
                labelPlacement="floating"
                value={shelterName}
                onIonInput={(e: { detail: { value?: string | null } }) =>
                  setShelterName(e.detail.value!)
                }
                required
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Estado"
                labelPlacement="floating"
                value={state}
                onIonInput={(e: { detail: { value?: string | null } }) =>
                  setState(e.detail.value!)
                }
                required
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Cidade"
                labelPlacement="floating"
                value={city}
                onIonInput={(e: { detail: { value?: string | null } }) =>
                  setCity(e.detail.value!)
                }
                required
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Rua e número"
                labelPlacement="floating"
                value={address}
                onIonInput={(e: { detail: { value?: string | null } }) =>
                  setAddress(e.detail.value!)
                }
                required
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Localização"
                labelPlacement="stacked"
                value={
                  location ? `${location.latitude}, ${location.longitude}` : ""
                }
                readonly
                placeholder="Clique no ícone ao lado"
              />

              <IonButton
                className="ion-margin-top ion-icon-button"
                expand="block"
                fill="clear"
                slot="end"
                onClick={getCurrentLocation}
              >
                <IonIcon icon={planetOutline} size="large" />
              </IonButton>
            </IonItem>
          </IonList>

          <div className="animal-selection">
            <h2>Animais atendidos:</h2>
            <IonButton
              fill={selectedAnimals.has("Cachorro") ? "solid" : "outline"}
              onClick={() => toggleAnimalSelection("Cachorro")}
            >
              Cachorro
            </IonButton>
            <IonButton
              fill={selectedAnimals.has("Gato") ? "solid" : "outline"}
              onClick={() => toggleAnimalSelection("Gato")}
            >
              Gato
            </IonButton>
            <IonButton
              fill={selectedAnimals.has("Pássaro") ? "solid" : "outline"}
              onClick={() => toggleAnimalSelection("Pássaro")}
            >
              Pássaro
            </IonButton>
          </div>

          <IonItem>
            <IonTextarea
              label="Contato"
              labelPlacement="floating"
              value={contact}
              placeholder="Digite nome e telefone dos responsáveis pelo abrigo"
              onIonInput={(e: { detail: { value?: string | null } }) =>
                setContact(e.detail.value!)
              }
            />
          </IonItem>

          <IonItem>
            <IonTextarea
              label="Descrição"
              labelPlacement="floating"
              value={description}
              placeholder="Fale um pouco sobre o abrigo"
              onIonInput={(e: { detail: { value?: string | null } }) =>
                setDescription(e.detail.value!)
              }
            />
          </IonItem>

          <IonButton type="submit" expand="block" className="ion-padding">
            <IonIcon icon={heart} slot="start" />
            Começar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterShelter;
