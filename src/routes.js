import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const Routes = createAppContainer(createSwitchNavigator({ SignIn, SignUp, Main }));

export default Routes;
