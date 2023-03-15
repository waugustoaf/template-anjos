import { ReactNode } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';

interface FooterIllustrationsProp {
  image?: ReactNode;
}

const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  height: 260,
  width: '100%',
  position: 'absolute',
}));

export const FooterIllustrations = (props: FooterIllustrationsProp) => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));
  const { image } = props;

  if (!hidden) {
    return (
      <>
        {!image ? (
          <MaskImg
            alt='mask'
            src={`/images/pages/misc-mask-${theme.palette.mode}.png`}
          />
        ) : typeof image === 'string' ? (
          <MaskImg alt='mask' src={image} />
        ) : (
          image
        )}
      </>
    );
  } else {
    return null;
  }
};
