import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.phone.number("+## 91# ### ###"),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'expired']),
  role: sample([
    'Insumos',
    'Late checkout',
    'Bell boy',
    'Habitacion',
    'Room service',
    
  ]),
}));

export default users;
