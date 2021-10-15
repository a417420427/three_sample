
import 'element-ui/lib/theme-chalk/index.css';

import { Button } from 'element-ui';


export const installPlugin = (app) => {
  app.component(Button.name, Button);
}
