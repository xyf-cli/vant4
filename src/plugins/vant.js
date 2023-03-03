import 'vant/lib/index.css';

import { Button, Toast, Field, CellGroup } from 'vant';

export function setupVant(app) {
  app.use(Button);
  app.use(Toast);
  app.use(Field);
  app.use(CellGroup);
}
