import { ACLObj, AppAbility } from '@/types/app/guard';
import { AbilityBuilder, Ability } from '@casl/ability';

export const AppAbilityConst = Ability as any;

const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbilityConst);

  if (role === 'admin') {
    can('manage', 'all');
  } else if (role === 'client') {
    can(['read'], 'acl-page');
  } else {
    can(['read', 'create', 'update', 'delete'], subject);
  }

  return rules;
};

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbilityConst(defineRulesFor(role, subject), {
    detectSubjectType: (object: any) => object!.type,
  });
};

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all',
};

export default defineRulesFor;
