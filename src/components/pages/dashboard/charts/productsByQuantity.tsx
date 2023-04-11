// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import { Icon } from '@/components/icon';

interface DataType {
  title: string
  imgSrc: string
  subtitle: string
  value: string
  trend?: 'positive' | 'negative'
}

const data: DataType[] = [
  {
    title: 'Limpeza de pele',
    subtitle: '150',
    value: 'R$ 3.000,00',
    imgSrc: '/images/cards/india.png'
  },
  {
    title: 'Pacote Emagrece',
    value: '10',
    subtitle: 'R$ 45.000,00',
    imgSrc: '/images/cards/us.png'
  },
  {
    title: 'Lipoescultura gessada',
    trend: 'positive',
    value: '2',
    subtitle: 'R$ 3.000,00',
    imgSrc: '/images/cards/brazil.png'
  },
]

const ProductsBySalesQuantity = () => {
  return (
    <Card>
      <CardHeader
        title='Top 3 mais vendidos'
        subheader='Produtos com maior saída na campanha'
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <CardContent>
        {data.map((item: DataType, index: number) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                '& img': { mr: 4 },
                alignItems: 'center',
                mb: index !== data.length - 1 ? 4 : undefined
              }}
            >
              {/* <img width={34} src={item.imgSrc} alt={item.subtitle} /> */}

              <Box
                sx={{
                  rowGap: 1,
                  columnGap: 4,
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    {item.subtitle}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    '& svg': { mr: 1 },
                    alignItems: 'center',
                    '& > *': { color: 'primary.main' }
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>{`${item.value}`}</Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default ProductsBySalesQuantity
