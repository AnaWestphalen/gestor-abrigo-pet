import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonList,
  IonToast,
  IonIcon,
  IonBackButton,
  IonChip,
  IonLabel as IonLabelChip,
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { personCircleOutline, homeOutline, heart } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./RegisterShelter.css";


const RegisterShelter: React.FC = () => {
  const [shelterName, setShelterName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
    const [selectedAnimals, setSelectedAnimals] = useState<Set<string>>(
    new Set()
  );
  const [contact, setContact] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const history = useHistory();

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(
        `Localização: ${position.coords.latitude}, ${position.coords.longitude}`
      );
    } catch (error) {
      console.error("Erro obtendo a localização", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (shelterName && city && location && contact && description) {
      // Here you would usually send this data to your backend or an API.
      console.log({
        shelterName,
        city,
        location,
        animals: Array.from(selectedAnimals),
        contact,
        description,
      });

      setShowToast(true);

      setShelterName("");
      setCity("");
      setLocation(null);
      setSelectedAnimals(new Set());
      setContact("");
      setDescription("");
  
    } else {
      alert("Por favor, preencha todos os campos do formulário.");
    }
  };

  const goToHome = () => {
    history.push("/home");
  };

  const goToAccount = () => {
    history.push("/account");
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
          <IonTitle className="centered-title">Meu Abrigo</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={goToAccount}>
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="header-with-icon">
          <h1 className="cadastro-abrigo">Cadastrar Abrigo</h1>
          <IonIcon icon={homeOutline} className="icon-right" />
        </div>

        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel className="large-label" position="stacked">
                Nome do Abrigo
              </IonLabel>
              <IonInput
                value={shelterName}
                placeholder="Digite o nome do seu abrigo"
                onIonChange={(e: {
                  detail: { value: React.SetStateAction<string> };
                }) => setShelterName(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel className="large-label" position="stacked">
                Cidade
              </IonLabel>
              <IonInput
                value={city}
                placeholder="Digite o nome da cidade"
                onIonChange={(e: {
                  detail: { value: React.SetStateAction<string> };
                }) => setCity(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel className="large-label" position="stacked">
                Localização
              </IonLabel>
              <IonInput
                value={location ? `${location.lat}, ${location.lng}` : ""}
                placeholder="Clique no botão para usar sua localização atual"
                disabled
              />
              <IonButton
                className="ion-margin-bottom"
                expand="block"
                onClick={getCurrentLocation}
              >
                Buscar localização atual
              </IonButton>
            </IonItem>
          </IonList>

          <div className="animal-selection">
            <h2>Animais Atendidos:</h2>
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
            <IonLabel className="large-label" position="stacked">
              Contatos
            </IonLabel>
            <IonTextarea
              value={contact}
              placeholder="Digite nome e telefone dos responsáveis pelo abrigo"
              onIonChange={(e: {
                detail: { value: React.SetStateAction<string> };
              }) => setContact(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel className="large-label" position="stacked">
              Descrição
            </IonLabel>
            <IonTextarea
              value={description}
              placeholder="Fale um pouco sobre o abrigo"
              onIonChange={(e: {
                detail: { value: React.SetStateAction<string> };
              }) => setDescription(e.detail.value!)}
              required
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
