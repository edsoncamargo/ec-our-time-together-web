import './footer.scss';

export default function Footer() {
  return (
    <footer className='ec-footer'>
      <div className='ec-footer__content'>
        <p>Todos os direitos reservador - 2024.</p>
        <p>
          Desenvolvido pelo{' '}
          <a href='https://edsoncamargo.dev' target='_blank'>
            seu bem
          </a>
          {''}.
        </p>
      </div>
    </footer>
  );
}
