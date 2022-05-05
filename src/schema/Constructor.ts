import { uid } from 'uid';
import * as Components from '@components/blocks';

class ConstructorElement {
  id: string;

  component: keyof typeof Components;

  active: boolean;

  parentId: string;

  constructor(component: keyof typeof Components, active: boolean, parentId: string) {
    this.id = uid();
    this.component = component;
    this.active = active;
    this.parentId = parentId;
  }
}

export default ConstructorElement;
