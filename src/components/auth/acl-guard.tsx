import { ReactNode, useState } from 'react';

import { useRouter } from 'next/router';
import { AbilityContext } from '@/context/ability';
import { Error401 } from '@/pages/401';
import { ACLObj, AppAbility } from '@/types/app/guard';
import { useAuth } from '@/hooks/useAuth';
import { BlankLayout } from '../layout/blank';
import { buildAbilityFor } from '@/config/acl';

interface AclGuardProps {
  children: ReactNode;
  guestGuard: boolean;
  aclAbilities: ACLObj;
}

export const AclGuard = (props: AclGuardProps) => {
  const { aclAbilities, children, guestGuard } = props;

  const [ability, setAbility] = useState<AppAbility | undefined>(undefined);

  const auth = useAuth();
  const router = useRouter();

  if (guestGuard || router.route === '/404' || router.route === '/500') {
    return <>{children}</>;
  }

  if (
    auth.user &&
    auth.user.user &&
    auth.user.user.grantType >= 90 &&
    !ability
  ) {
    setAbility(
      buildAbilityFor(
        auth.user.user && auth.user.user.grantType >= 90 ? 'admin' : 'client',
        aclAbilities.subject,
      ),
    );
  }

  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  return (
    <BlankLayout>
      <Error401 />
    </BlankLayout>
  );
};
