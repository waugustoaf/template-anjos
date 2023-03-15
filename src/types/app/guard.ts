import { Ability } from "@casl/ability";

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = string;
export type AppAbility = Ability<[Actions, Subjects]> | undefined;
export type ACLObj = {
  action: Actions;
  subject: string;
};
