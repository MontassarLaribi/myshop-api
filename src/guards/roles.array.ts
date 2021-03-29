import * as rolesObjects from './roles.enum';

// Flatten roles objects into one array containing all the roles as strings
const rolesArray: string[] = [];

for (const [, value] of Object.entries(rolesObjects)) {
  if (value instanceof Object)
    for (const [, role] of Object.entries(value)) if (typeof role === 'string') rolesArray.push(role);
}

export const roles = rolesArray;
