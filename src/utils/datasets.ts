import { uid } from 'uid';

const MATH_OPERATIONS = [
  {
    value: 'x',
    func: (a: string, b: string) => parseInt(a, 10) * parseInt(b, 10),
  },
  {
    value: '/',
    func: (a: string, b: string) => parseInt(a, 10) / parseInt(b, 10),
  },
  {
    value: '+',
    func: (a: string, b: string) => parseInt(a, 10) + parseInt(b, 10),
  },
  {
    value: '-',
    func: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
];

export default MATH_OPERATIONS;

export const CONSTRUCTOR_ELEMENTS = [
  {
    id: uid(),
    component: 'Display',
    active: true,
  },
  {
    id: uid(),
    component: 'SettingsOperations',
    active: true,
  },
  {
    id: uid(),
    component: 'MathOperations',
    active: true,
  },
  {
    id: uid(),
    component: 'Numbers',
    active: true,
  },
  {
    id: uid(),
    component: 'Equal',
    active: true,
  },
];
