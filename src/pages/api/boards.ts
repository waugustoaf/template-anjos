import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    data: {
      message: {
        isEnabled: true,
        items: [
          {
            id: '123',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '123',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '234',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '345',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '456',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '567',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
        ],
      },
      conversation: {
        isEnabled: true,
        items: [
          {
            id: '123',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '123',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '234',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '345',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '456',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
          {
            id: '567',
            name: 'João da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
        ],
      },
      schedule: {
        isEnabled: true,
        items: [],
      },
      appointment: {
        isEnabled: true,
        items: [
          {
            id: '567',
            name: 'Jaqueline da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
        ],
      },
      sale: {
        isEnabled: true,
        items: [
          {
            id: '567',
            name: 'Jaqueline da Silva',
            phone: '11996498551',
            avatar: 'https://github.com/waugustoaf.png',
            email: 'joao@email.com',
          },
        ],
      },
    },
  });
}
