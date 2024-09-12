import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonToast,
} from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';

const RegisterShelter: React.FC = () => {
  // State to hold the form values
  const [shelterName, setShelterName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);


  // Function to get the current geolocation
  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(`Localização: ${position.coords.latitude}, ${position.coords.longitude}`);
    } catch (error) {
      console.error('Erro obtendo a localização', error);
    }
  };


  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (shelterName && city && location) {
      // Here you would usually send this data to your backend or an API.
      console.log({
        shelterName,
        city,
        location,
      });

      // Show success message
      setShowToast(true);

      // Clear form fields after submission
      setShelterName('');
      setCity('');
      setLocation(null);
    } else {
      // Handle form validation (if fields are empty)
      alert('Por favor, preencha todos os campos do formulário.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastrar Abrigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nome do Abrigo</IonLabel>
              <IonInput
                value={shelterName}
                placeholder="Digite o nome do seu abrigo"
                onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setShelterName(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Cidade</IonLabel>
              <IonInput
                value={city}
                placeholder="Digite o nome da cidade"
                onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setCity(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Localização</IonLabel>
              <IonInput
                value={location ? `${location.lat}, ${location.lng}` : ''}
                placeholder="Digite as coordenadas ou clique no botão para usar sua localização atual"
                disabled
              />

                <IonButton expand="block" onClick={getCurrentLocation}>
                 Buscar localização atual
                </IonButton>
            </IonItem>

          </IonList>

          <IonButton type="submit" expand="full" className="ion-margin-top">
            Cadastrar
          </IonButton>
        </form>

        {/* Toast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Shelter registered successfully!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterShelter;
