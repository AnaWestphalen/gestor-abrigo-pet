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
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { heart, homeOutline, planetOutline } from "ionicons/icons";
import { type FC, useState } from "react";

// import { useHistory } from "react-router-dom";
import "./RegisterShelter.css";
import { useShelterServices } from "src/domain/shelter/contexts/ShelterServices/useShelterServices";

const RegisterShelter: FC = () => {
  const { createShelter } = useShelterServices();
  const [shelterName, setShelterName] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [selectedAnimals, setSelectedAnimals] = useState<Set<string>>(
    new Set()
  );
  const [contact, setContact] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  // const history = useHistory();

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
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
    await createShelter({
      name: shelterName,
      state,
      city,
      contact,
      coordinates: location,
      accepts: Array.from(selectedAnimals),
      address,
      description,
    });
  };

  // const goToAccount = () => {
  //   history.push("/account");
  // };

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
          {/* <IonButtons slot="end">
            <IonButton onClick={goToAccount}>
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons> */}
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
                onIonChange={(e: { detail: { value: string } }) =>
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
                onIonChange={(e: { detail: { value: string } }) =>
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
                onIonChange={(e: { detail: { value: string } }) =>
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
                onIonChange={(e: { detail: { value: string } }) =>
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
              onIonChange={(e: { detail: { value: string } }) =>
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
              onIonChange={(e: { detail: { value: string } }) =>
                setDescription(e.detail.value!)
              }
            />
          </IonItem>

          <IonButton type="submit" expand="block" className="ion-padding">
            <IonIcon icon={heart} slot="start" />
            Começar
          </IonButton>
        </form>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Abrigo cadastrado com sucesso!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterShelter;
