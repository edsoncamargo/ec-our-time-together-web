import './card.scss';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: Readonly<CardProps>) {
  return <div className='ec-card'>{children}</div>;
}
