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
} from '@ionic/react';
import { cameraOutline, heartOutline, pawOutline } from 'ionicons/icons';
import { useState, FC } from "react";
import { useParams } from "react-router-dom";

import { usePetServices } from "src/domain/pet/contexts/PetServices/usePetServices";
import './RegisterPet.css';

const RegisterPet: FC = () => {
  const { id: shelterId } = useParams<{ id: string }>();
  const { addPet } = usePetServices();
  const [petData, setPetData] = useState({
    name: '',
    color: '',
    age: '',
    size: '',
    foundIn: '',
    description: '',
    tutorName: '',
    tutorContact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddPet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { success, error } = await addPet(shelterId, petData);
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
      <IonContent className="ion-padding">
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
              required
            />
          </IonItem>

          <IonLabel className="section-title">Tamanho</IonLabel>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" color="light" onClick={() => setPetData({ ...petData, size: 'pequeno' })}>
                  <IonIcon slot="icon-only" icon={pawOutline} />
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" color="medium" onClick={() => setPetData({ ...petData, size: 'médio' })}>
                  <IonIcon slot="icon-only" icon={pawOutline} />
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" color="light" onClick={() => setPetData({ ...petData, size: 'grande' })}>
                  <IonIcon slot="icon-only" icon={pawOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

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

          <IonLabel className="section-title">Tutor (se houver)</IonLabel>
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

          <IonButton expand="block" color="primary" className="save-button" type="submit">
            <IonIcon slot="start" icon={heartOutline} />
            Salvar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPet;
