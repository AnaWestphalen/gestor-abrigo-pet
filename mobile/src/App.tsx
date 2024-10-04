/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/utils.css";

import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import AuthPage from "src/domain/auth/AuthPage/AuthPage";
import { AuthServicesProvider } from "src/domain/auth/contexts/AuthServices/AuthServicesProvider";
import { DashboardPage } from "src/domain/dashboard/DashboardPage/DashboardPage";
import PetPage from "src/domain/pet/components/PetPage/PetPage";
import RegisterPet from "src/domain/pet/components/RegisterPet/RegisterPet";
import { PetServicesProvider } from "src/domain/pet/contexts/PetServices/PetServicesProvider";
import { PrivateRoute } from "src/domain/shared/Route/PrivateRoute";
import { ROUTES } from "src/domain/shared/Route/routes";
import { ToastProvider } from "src/domain/shared/ToastProvider/ToastProvider";
import RegisterShelter from "src/domain/shelter/components/RegisterShelter/RegisterShelter";
import ShelterPage from "src/domain/shelter/components/ShelterPage/ShelterPage";
import ShelterPetsPage from "src/domain/shelter/components/ShelterPetsPage/ShelterPetsPage";
import { ShelterServicesProvider } from "src/domain/shelter/contexts/ShelterServices/ShelterServicesProvider";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <ToastProvider>
          <AuthServicesProvider>
            <ShelterServicesProvider>
              <PetServicesProvider>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/dashboard" />}
                />
                <Route
                  exact
                  path={ROUTES.AUTH}
                  render={(props) => <AuthPage {...props} />}
                />
                <PrivateRoute
                  exact
                  path={ROUTES.DASHBOARD}
                  component={DashboardPage}
                />
                <PrivateRoute
                  exact
                  path={ROUTES.SHELTER_PETS}
                  component={ShelterPetsPage}
                />
                <PrivateRoute
                  exact
                  path={ROUTES.SHELTER}
                  component={ShelterPage}
                />
                <PrivateRoute
                  exact
                  path={ROUTES.SHELTERS}
                  component={RegisterShelter}
                />
                <PrivateRoute exact path={ROUTES.PET} component={PetPage} />
                <PrivateRoute
                  exact
                  path={ROUTES.CREATE_PET}
                  component={RegisterPet}
                />
                <Route path="*" render={() => <Redirect to="/dashboard" />} />
              </PetServicesProvider>
            </ShelterServicesProvider>
          </AuthServicesProvider>
        </ToastProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
