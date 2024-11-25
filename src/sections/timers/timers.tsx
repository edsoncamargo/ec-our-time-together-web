import './timers.scss';

import { FaFaceKissWinkHeart, FaRing } from 'react-icons/fa6';

import Tag from '../../components/tag/tag';

export default function Timers() {
  return (
    <article className='ec-timers'>
      <h1 className='ec-timers__title ec-norican'>nosso tempo juntos.</h1>

      <Tag>
        <Tag.Header>
          <Tag.Title>
            DESDE O <br /> PRIMEIRO BEIJO
          </Tag.Title>

          <Tag.Icon>
            <FaFaceKissWinkHeart />
          </Tag.Icon>
        </Tag.Header>

        <Tag.Body startDate='2016-05-05T12:00:00-03:00' />
      </Tag>

      <Tag>
        <Tag.Header>
          <Tag.Title>
            DESDE O <br /> PEDIDO DE NAMORO
          </Tag.Title>

          <Tag.Icon>
            <FaRing />
          </Tag.Icon>
        </Tag.Header>

        <Tag.Body startDate='2016-09-04T14:00:00-03:00' />
      </Tag>
    </article>
  );
}
