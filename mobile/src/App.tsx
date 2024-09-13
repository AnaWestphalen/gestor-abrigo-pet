import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRedirect,
  IonRoute,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { triangle } from "ionicons/icons";

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
import AuthPage from "src/domain/auth/AuthPage/AuthPage";

import { PrivateRoute } from "src/domain/shared/Route/PrivateRoute";
import { DashboardPage } from "src/domain/dashboard/DashboardPage/DashboardPage";
import { AuthServicesProvider } from "src/domain/auth/contexts/AuthServices/AuthServicesProvider";
import { Redirect, Route } from "react-router-dom";

setupIonicReact();

const App = () => (
  <IonApp>
    <AuthServicesProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route
              exact
              path="/auth"
              render={(props) => <AuthPage {...props} />}
            />
            <PrivateRoute exact path="/dashboard">
              <DashboardPage />
            </PrivateRoute>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="test" href="/auth">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>Test</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AuthServicesProvider>
  </IonApp>
);

export default App;
