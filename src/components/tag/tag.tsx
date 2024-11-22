import './tag.scss';

import Card from '../card/card';
import { ReactNode } from 'react';
import Timer from '../timer/timer';

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: Readonly<TagProps>) {
  return <div className='ec-tag'>{children}</div>;
}

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: Readonly<HeaderProps>) {
  return <Card>{children}</Card>;
}

interface BodyProps {
  startDate: string;
}

function Body({ startDate }: Readonly<BodyProps>) {
  return (
    <Card>
      <Timer startDate={startDate} />
    </Card>
  );
}

interface TitleProps {
  children: ReactNode;
}

function Title({ children }: Readonly<TitleProps>) {
  return <h2 className='ec-title'>{children}</h2>;
}

interface IconProps {
  children: ReactNode;
}

function Icon({ children }: Readonly<IconProps>) {
  return <div className='ec-icon'>{children}</div>;
}

Tag.Header = Header;
Tag.Body = Body;
Tag.Title = Title;
Tag.Icon = Icon;
export default Tag;
