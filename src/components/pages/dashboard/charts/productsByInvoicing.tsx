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
  subtitle: string
  value: string
  trend?: 'positive' | 'negative'
}

interface DataProductsByInvoicingProps {
  data: ProductsByInvoicingProps[] | undefined
}

interface ProductsByInvoicingProps {
  strategyId: string | undefined
  icon: string | undefined
  name: string | undefined
  value: number | undefined;
  quantity: number | undefined;
}

const ProductsByInvoicing = ({data}: DataProductsByInvoicingProps) => {


  const customData: DataType[] = []

  data?.map((item) => {
    customData.push({
      title: item.name ? item.name : '',
      value: item.value ? `R$ ${item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : '',
      subtitle: `${item.quantity ? `R$ ${item.quantity}` : '0'} vendas`,
    });
  });

  return (
    <Card>
      <CardHeader
        title='Top 3 em faturamento'
        subheader='Produtos com maior faturamento na campanha'
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <CardContent>
        {customData.map((item: DataType, index: number) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                '& img': { mr: 4 },
                alignItems: 'center',
                mb: index !== customData.length - 1 ? 4 : undefined
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

export default ProductsByInvoicing;
