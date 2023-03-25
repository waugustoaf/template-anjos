import * as yup from 'yup';

export const clinicFormSchema = {
  basicData: yup.object().shape({
    fantasyName: yup.string().required('Nome fantasia é obrigatório'),
    name: yup.string().required('Nome completo é obrigatório'),
    document: yup.string().required('CPF/CNPJ é obrigatório'),
    birthDate: yup.string(),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    phone: yup.string().required('Celular é obrigatório'),
    city: yup.string(),
    state: yup.string(),
  }),
  contract: yup.object().shape({
    userAttendanceId: yup.string().required('Anjo é obrigatório'),
    startContract: yup.string().required('Início do contrato é obrigatório'),
    endContract: yup.string().required('Fim do contrato é obrigatório'),
    accumulativeTime: yup.string().required('Tempo acumulado é obrigatório'),
    projectTime: yup.string().required('Tempo do projeto é obrigatório'),
    // status: yup.string().required('Status do contrato é obrigatório'),
    categoryId: yup.string().required('Categoria é obrigatório'),
  }),
  billings: yup.object().shape({
    initialAverageRevenue: yup
      .string()
      .required('Faturamento médio inicial é obrigatório'),
    afterAverageRevenue: yup
      .string()
      .required('Faturamento máximo é obrigatório'),
    increaseRevenue: yup.string().required('Aumento faturamento é obrigatório'),
    growthRate: yup.string().required('Taxa de crescimento é obrigatório'),
    initialRevenue: yup.string().required('Faturamento inicial é obrigatório'),
    startValue: yup.string().required('Caixa inicial é obrigatório'),
  }),
};
