// ** MUI Imports
import { AvatarProps } from '@mui/material/Avatar'

// ** Types
import { ThemeColor } from '@/types/app/layout';

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor
  skin?: 'filled' | 'light' | 'light-static'
}
